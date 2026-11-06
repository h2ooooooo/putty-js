// preview-profile.ts
import {PuttyProfileSource, createPuttyWriter} from '@jalsoedesign/putty-core';

const source = await PuttyProfileSource.fromFile(process.argv[2] ?? './sessions.reg');
const selected = source.get('Demo');

if (!selected) {
    throw new Error('The demo profile is missing');
}

// Plan a new saved profile in the same synthetic settings; do not apply it.
const targetPath = 'Imported';
const writer = createPuttyWriter(source.source, {mode: 'create'});
const preview = await writer.plan([{
    ...selected,
    path: targetPath,
    name: 'Imported',
}]);

console.log('Source profile: ' + selected.path);
console.log('Destination profile: ' + targetPath);
console.log('Planned operations: ' + preview.changes.map(change => change.operation).join(', '));
console.log('Native settings written: no');
