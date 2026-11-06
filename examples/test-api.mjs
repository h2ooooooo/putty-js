import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {PuttyProfileSource} from '@jalsoedesign/putty-core';

const files = {
    "sessions.reg": "Windows Registry Editor Version 5.00\n\n[HKEY_CURRENT_USER\\Software\\SimonTatham\\PuTTY\\Sessions\\Demo]\n\"HostName\"=\"127.0.0.1\"\n\"UserName\"=\"deploy\"\n\"PortNumber\"=dword:00000016\n\"PublicKeyFile\"=\"C:\\\\keys\\\\example.ppk\"\n"
};
const directory = await mkdtemp(path.join(tmpdir(), 'profile-api-demo-'));

try {
    for (const [name, contents] of Object.entries(files)) {
        const target = path.join(directory, name);

        await mkdir(path.dirname(target), {recursive: true});
        await writeFile(target, contents);
    }

    const source = await PuttyProfileSource.fromFile(path.join(directory, 'sessions.reg'));
    const profiles = source.list();

    assert.ok(profiles.length > 0);

    for (const profile of profiles) {
        const connections = profile.connections.map(connection => ({
            protocol: connection.protocol,
            host: connection.endpoint?.host ?? null,
        }));

        console.log(JSON.stringify({path: profile.path, connections}));
    }

    const selected = source.get(profiles[0].path);
    const matches = source.search('127.0.0.1', {fields: 'all'});

    assert.equal(selected.path, profiles[0].path);
    assert.ok(matches.length > 0);
    console.log('Exact selection:', selected.path);
    console.log('Host matches:', matches.length);
    console.log('Metadata only; no remote connection.');
} finally {
    await rm(directory, {recursive: true, force: true});
    console.log('Temporary files removed.');
}
