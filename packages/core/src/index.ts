import path from 'node:path';
import {readdir} from 'node:fs/promises';
import type {ConnectionDefinition, SourceReference} from '@jalsoedesign/portline-abstract';
import {
    NativeProfileSource, credential, decodeName, discoverNativeSources, exists, fileSource,
    nativeProfile, parseIni, parseRegistryExport, port, privateKey, readText, registrySource,
    requireSource, text, windowsRegistry,
} from '@jalsoedesign/portline-platform';
import type {NativeDiscoveryOptions, NativeSession, NativeSettings, RegistryReader} from '@jalsoedesign/portline-platform';

export interface PuttyOptions extends NativeDiscoveryOptions {
    readonly variant?: 'putty' | 'kitty';
}
const keys = {
    putty: 'HKCU\\Software\\SimonTatham\\PuTTY\\Sessions',
    kitty: 'HKCU\\Software\\9bis.com\\KiTTY\\Sessions',
};

/** KiTTY directory sessions use Key\value\ lines, including literal backslashes in values. */
export function parseKittySession(contents: string): NativeSettings {
    const settings: Record<string, string> = Object.create(null);

    for (const line of contents.split(/\r?\n/)) {
        const separator = line.indexOf('\\');

        if (separator > 0 && line.endsWith('\\')) {
            settings[line.slice(0, separator)] = decodeName(line.slice(separator + 1, -1));
        }
    }

    return settings;
}

export class PuttyProfileSource extends NativeProfileSource {
    public static fromSessions(source: SourceReference, sessions: readonly NativeSession[]): PuttyProfileSource {
        const native = sessions.map(session => ({
            name: decodeName(session.name),
            settings: session.settings,
        }));
        const profiles = native.filter(session => text(session.settings, 'HostName')).map(session => {
            const settings = session.settings;
            const protocol = text(settings, 'Protocol', 'ssh').toLowerCase();
            const connection: ConnectionDefinition = {
                id: 'connection',
                ...(protocol === 'ssh' ? {kind: 'ssh' as const, protocol: 'ssh' as const} : {kind: 'unsupported' as const, protocol}),
                endpoint: {
                    host: text(settings, 'HostName'),
                    port: port(text(settings, 'PortNumber'), protocol === 'telnet' ? 23 : 22),
                    username: text(settings, 'UserName'),
                },
                authentication: [
                    ...privateKey(text(settings, 'PublicKeyFile')),
                    {type: 'password', credential: credential(source, session.name,
                        text(settings, 'Password') ? 'unsupported' : 'not-stored')},
                    ...(text(settings, 'TryAgent', '1') !== '0' ? [{type: 'agent' as const}] : []),
                ],
            };
            const profile = nativeProfile(source, session.name, [connection]);

            return {
                ...profile,
                diagnostics: [
                    ...(protocol !== 'ssh' ? [{
                        code: 'unsupported-protocol',
                        severity: 'warning' as const,
                        message: 'Native protocol is preserved; no SSH projection is available',
                    }] : []),
                    ...(text(settings, 'ProxyMethod', '0') !== '0' ? [{
                        code: 'native-proxy',
                        severity: 'warning' as const,
                        message: 'Proxy settings are preserved in native settings and require application-specific handling',
                    }] : []),
                ],
            };
        });

        return new PuttyProfileSource(source, profiles, native);
    }

    public static async fromFile(filename: string, variant: 'putty' | 'kitty' = 'putty') {
        const contents = await readText(filename);
        const source = fileSource(variant, filename);
        let sessions: NativeSession[];

        if (/^\s*(Windows Registry Editor|REGEDIT4)/.test(contents)) {
            sessions = parseRegistryExport(contents, keys[variant]);
        } else if (variant === 'kitty' && !contents.trimStart().startsWith('[')) {
            sessions = [{name: path.basename(filename), settings: parseKittySession(contents)}];
        } else {
            sessions = parseIni(contents)
                .filter(section => /^(?:Sessions?[:\\\/]|HKEY_.*\\Sessions\\)/i.test(section.name))
                .map(section => ({...section, name: section.name.replace(/^.*?Sessions?[:\\\/]/i, '')}));
        }

        return PuttyProfileSource.fromSessions(source, sessions);
    }

    public static async fromDirectory(directory: string, variant: 'putty' | 'kitty' = 'kitty') {
        const sessions: NativeSession[] = [];
        const root = await exists(path.join(directory, 'Sessions')) ? path.join(directory, 'Sessions') : directory;

        async function visit(folder: string, prefix: string, depth: number): Promise<void> {
            if (depth > 32) {
                throw new Error('Session directory nesting exceeds 32 levels');
            }

            for (const entry of await readdir(folder, {withFileTypes: true})) {
                const target = path.join(folder, entry.name);
                const name = prefix + entry.name;

                if (entry.isDirectory()) {
                    await visit(target, name + '/', depth + 1);
                } else if (entry.isFile()) {
                    const contents = await readText(target);
                    const settings = variant === 'kitty' ? parseKittySession(contents) :
                        parseIni(contents).find(section => section.name === '')?.settings ?? {};

                    sessions.push({name, settings});
                }
            }
        }

        await visit(root, '', 0);

        return PuttyProfileSource.fromSessions(fileSource(variant, directory, 'directory'), sessions);
    }

    public static async fromRegistry(
        key: string | undefined = undefined,
        variant: 'putty' | 'kitty' = 'putty',
        reader: RegistryReader = windowsRegistry,
        view: '32' | '64' | 'default' = 'default',
    ) {
        const source = registrySource(variant, key ?? keys[variant], view);

        return PuttyProfileSource.fromSessions(source, await reader.read(source.storage![0] as Parameters<RegistryReader['read']>[0]));
    }

    public static async discover(options: PuttyOptions = {}) {
        const variant = options.variant ?? 'putty';

        return discoverNativeSources({
            application: variant,
            registryKey: keys[variant],
            processNames: variant === 'kitty' ? ['kitty.exe', 'klink.exe'] : ['putty.exe', 'plink.exe'],
            portableNames: [],
            async forExecutable(executable, registry) {
                // Official PuTTY uses the registry; portable forks require explicit file selection.
                if (variant === 'putty') {
                    return registry;
                }

                const ini = process.env.KITTY_INI_FILE ?? path.join(path.dirname(executable.executablePath), 'kitty.ini');

                if (!await exists(ini)) {
                    return undefined;
                }

                const settings = parseIni(await readText(ini)).find(section => section.name.toLowerCase() === 'kitty')?.settings ?? {};
                const mode = text(settings, 'savemode').toLowerCase();

                if (mode === 'registry') {
                    return registry;
                }

                if (mode === 'dir') {
                    const directory = path.resolve(path.dirname(ini), text(settings, 'configdir', '.'));

                    return fileSource(variant, directory, 'directory');
                }

                return undefined;
            },
        }, options);
    }

    public static async open(options: PuttyOptions = {}) {
        const source = requireSource(await PuttyProfileSource.discover(options));
        const storage = source.storage![0];
        let result: PuttyProfileSource;

        if (storage.kind === 'registry') {
            result = await PuttyProfileSource.fromRegistry(
                storage.hive + '\\' + storage.key, options.variant, options.registryReader, storage.view,
            );
        } else if (storage.kind === 'directory') {
            result = await PuttyProfileSource.fromDirectory(storage.path, options.variant ?? 'putty');
        } else {
            result = await PuttyProfileSource.fromFile(storage.path, options.variant);
        }

        return new PuttyProfileSource(source, result.list().map(profile => ({...profile, source})), result.list().map(profile => ({
            name: profile.id,
            settings: result.getNativeSettings(profile.id)!,
        })));
    }
}
export {PuttyProfileSource as Putty};
export const discoverPuttySources = PuttyProfileSource.discover;

export * from './writing.js';
