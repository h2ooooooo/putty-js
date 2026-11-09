import assert from 'node:assert/strict';
import {createDocklineBridge} from '@jalsoedesign/portline-dockline';
import {PuttyProfileSource} from '../packages/core/dist/index.js';

const source = PuttyProfileSource.fromSessions({id: 'fixture', application: 'putty'}, [{
    name: 'site', settings: {HostName: 'ssh.example', UserName: 'alice', TryAgent: '0'},
}, {
    name: 'proxy', settings: {HostName: 'ssh.example', ProxyMethod: '3'},
}]);
const bridge = createDocklineBridge({source});
const options = {password: 'fixture-password', hostFingerprint: 'SHA256:' + 'A'.repeat(43)};
const config = await bridge.toSshConfig(source.get('site'), options);
assert.equal(config.host, 'ssh.example');
assert.equal(config.username, 'alice');
await assert.rejects(bridge.toSshConfig('proxy', options), /ProxyMethod|unsupported/i);
console.log('PuTTY/KiTTY profile prepared through the shared SSH bridge; native proxy refused.');
