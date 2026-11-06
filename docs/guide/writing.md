# Preview, review and apply

Read operations and previews do not change settings. Apply is a separate explicit operation with revision, application/lock checks and recovery backups.

## Run a preview safely

Install `@jalsoedesign/putty-core`, follow [language setup](/guide/examples) and save the [synthetic settings](/guide/fixtures). This program plans a new profile in those files but deliberately does not apply the plan. Source and destination profile paths identify saved records, not server directories.

::: code-group

```ts [TypeScript]
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
```

```js [JavaScript]
// preview-profile.js
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
```

```js [MJS]
// preview-profile.mjs
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
```

```js [CommonJS]
// preview-profile.cjs
async function main() {
    const {PuttyProfileSource, createPuttyWriter} = await import('@jalsoedesign/putty-core');

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
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
```

:::

### Run it

::: code-group

```sh [TypeScript]
npx tsx preview-profile.ts
```

```sh [JavaScript]
node preview-profile.js
```

```sh [MJS]
node preview-profile.mjs
```

```sh [CommonJS]
node preview-profile.cjs
```

:::

### Output

```text
Source profile: Demo
Destination profile: Imported
Planned operations: create
Native settings written: no
```

Download: <a href="/examples/preview-profile.ts" download="preview-profile.ts">TypeScript</a> · <a href="/examples/preview-profile.js" download="preview-profile.js">JavaScript</a> · <a href="/examples/preview-profile.mjs" download="preview-profile.mjs">MJS</a> · <a href="/examples/preview-profile.cjs" download="preview-profile.cjs">CommonJS</a>

The printed operations are stable; detailed inspection and diagnostics can vary with platform and application availability. Preview output contains sanitized intent rather than stored credentials or native settings bytes.

## Apply only after review

The following recipe continues the program above. Review the full preview first, close the application and other settings writers, and keep the same destination and policies. Applying changes is Windows-only with the built-in backend; this step is not part of the runnable preview test.

::: code-group

```ts [TypeScript]
await writer.apply(preview);

console.log(writer.backupPaths);
```

```js [JavaScript]
await writer.apply(preview);

console.log(writer.backupPaths);
```

```js [MJS]
await writer.apply(preview);

console.log(writer.backupPaths);
```

```js [CommonJS]
await writer.apply(preview);

console.log(writer.backupPaths);
```

:::

The default mode is `create`. Existing paths are refused; updates/upserts require an explicit mode used consistently for preview and apply. Changed settings or edited serialized previews require replanning. See [CLI write commands](/cli/writing) for saved preview files and [writer contracts](/reference/api) for importing a serialized plan.

## One-way sync

Install the source application's adapter alongside the destination CLI. Use `sync --help` for source-specific selectors. A source with multiple connections requires explicit `--connection`; this is especially relevant to database sessions with SSH tunnels. Sync never infers that a database endpoint is an SSH server, and never prunes unrelated target profiles.

Only supported direct SSH connection fields are projected. Unrelated terminal and KiTTY settings are preserved; this is not an editor for every native preference.

See [safeguards and limitations](/guide/limitations) for backups, secrets and registry policies.
