// read-kitty.mjs
import {PuttyProfileSource} from '@jalsoedesign/putty-core';

const source = await PuttyProfileSource.fromDirectory(process.argv[2] ?? './Sessions', 'kitty');
const selected = source.get('Demo');

if (!selected) {
    throw new Error('The demo KiTTY session is missing');
}

const native = source.getNativeSettings('Demo');
const key = selected.connections[0]?.authentication.find(method => method.type === 'private-key');

console.log('Variant: ' + source.source.application);
console.log('Session: ' + selected.path);
console.log('Terminal type: ' + native?.TerminalType);
console.log('Private key on the host: ' + (key?.type === 'private-key' ? key.path?.value : 'none'));
console.log('Metadata only: key contents are not loaded.');
