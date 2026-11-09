import assert from 'node:assert/strict';
import {test} from 'node:test';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

async function fixture(t) {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'portline fixtures '));
    t.after(() => rm(directory, {recursive: true, force: true}));

    return directory;
}
function cli(args) {
    return spawnSync(process.execPath, ['packages/cli/bin/cli.js', ...args], {encoding: 'utf8'});
}
import {PuttyProfileSource, parseKittySession} from '../packages/core/dist/index.js';

test('PuTTY registry export retains advanced settings and private key metadata', async t => {
    const directory = await fixture(t);
    const filename = path.join(directory, 'putty.reg');
    const contents = String.raw`Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\Sessions\work%20host]
"HostName"="ssh.example"
"PortNumber"=dword:000008ae
"UserName"="alice"
"PublicKeyFile"="C:\\keys\\id.ppk"
"Font"="Consolas"
"ProxyPassword"="raw-only-secret"
"UnknownForkSetting"=dword:00000001
`;
    await writeFile(filename, Buffer.concat([Buffer.from([255, 254]), Buffer.from(contents, 'utf16le')]));
    const source = await PuttyProfileSource.fromFile(filename);
    const profile = source.get('work host');

    assert.equal(profile.connections[0].endpoint.port, 2222);
    assert.equal(profile.connections[0].authentication[0].path.value, 'C:\\keys\\id.ppk');
    assert.equal(source.getNativeSettings('work host').Font, 'Consolas');
    assert.equal(source.getNativeSettings('work host').UnknownForkSetting, 1);
    assert.ok(!JSON.stringify(source.list()).includes('raw-only-secret'));
    assert.equal(source.search('ssh.example', {fields: 'all'}).length, 1);
    const result = cli(['get', 'work host', '--file', filename, '--json']);

    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).keyFile, 'C:\\keys\\id.ppk');
    assert.ok(!result.stdout.includes('raw-only-secret'));
});

test('KiTTY nested directory sessions decode names/values once and keep extensions', async t => {
    const directory = await fixture(t);
    await mkdir(path.join(directory, 'Sessions', 'folder'), {recursive: true});
    await writeFile(path.join(directory, 'Sessions', 'folder', '100%2520'), [
        'HostName\\kitty.example\\',
        'PublicKeyFile\\C:%5Ckeys%5Cid.ppk\\',
        'PortNumber\\22\\',
        'Reconnect\\1\\',
        'Password\\encoded-secret\\',
    ].join('\n'));
    const source = await PuttyProfileSource.fromDirectory(directory);
    const profile = source.get('folder/100%20');

    assert.ok(profile);
    assert.equal(profile.connections[0].authentication[0].path.value, 'C:\\keys\\id.ppk');
    assert.equal(profile.connections[0].authentication[1].credential.state, 'unsupported');
    assert.equal(parseKittySession('Extension\\a%5Cb\\').Extension, 'a\\b');
    const result = cli(['list', '--variant', 'kitty', '--directory', directory, '--json']);

    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout)[0].path, 'folder/100%20');
});

test('discovery reports active KiTTY storage and version with injectable registry/process readers', async t => {
    const directory = await fixture(t);
    const executablePath = path.join(directory, 'kitty.exe');
    await mkdir(path.join(directory, 'Sessions'));
    await writeFile(path.join(directory, 'kitty.ini'), '[KiTTY]\nsavemode=dir\nconfigdir=.');
    const result = await PuttyProfileSource.discover({
        variant: 'kitty',
        platform: 'win32',
        registryReader: {exists: async () => true, read: async () => []},
        processReader: {list: async () => [{executablePath, applicationVersion: '0.76', arguments: []}]},
    });

    assert.equal(result.selectedBy, 'running-application');
    const selected = result.candidates.find(item => item.id === result.selectedSourceId);

    assert.equal(selected.applicationVersion, '0.76');
    assert.equal(selected.storage[0].kind, 'directory');
    assert.equal(result.candidates.length, 2);
});

test('registry view and custom key are passed unchanged to the native provider', async () => {
    let requested;
    const source = await PuttyProfileSource.fromRegistry('HKLM\\Software\\Test', 'putty', {
        exists: async () => true,
        read: async storage => {
            requested = storage;
            return [{name: 'work', settings: {HostName: 'example'}}];
        },
    }, '32');

    assert.equal(requested.view, '32');
    assert.equal(requested.hive, 'HKLM');
    assert.equal(source.list().length, 1);
});

test('normalized SSH definitions mark proxy and saved remote commands as execution blockers', () => {
    const source = PuttyProfileSource.fromSessions({id: 'fixture', application: 'putty'}, [{
        name: 'proxy', settings: {
            HostName: 'ssh.example', ProxyMethod: '3', RemoteCommand: 'native-command',
            SSHManualHostKeys: 'native-pin',
        },
    }]);

    assert.deepEqual(source.get('proxy').connections[0].unsupportedOptions,
        ['ProxyMethod', 'RemoteCommand', 'SSHManualHostKeys']);
    assert.equal(source.get('proxy').connections[0].protocol, 'ssh');
});
