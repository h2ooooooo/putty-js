# Read KiTTY sessions

PuTTY and KiTTY use the same library and `putty-js` command. Select the variant explicitly when reading a KiTTY export or supported Sessions directory.

## Try a portable directory

Install `@jalsoedesign/putty-core`, follow [language setup](/guide/examples), and save the <a href="/examples/fixtures/Sessions/Demo" download="Demo"><code>synthetic Sessions/Demo file</code></a>. The program reads that directory on the host. The stored private-key path also belongs to the host; no key file is opened.

::: code-group

```ts [TypeScript]
// read-kitty.ts
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
```

```js [JavaScript]
// read-kitty.js
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
```

```js [MJS]
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
```

```js [CommonJS]
// read-kitty.cjs
async function main() {
    const {PuttyProfileSource} = await import('@jalsoedesign/putty-core');

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
npx tsx read-kitty.ts
```

```sh [JavaScript]
node read-kitty.js
```

```sh [MJS]
node read-kitty.mjs
```

```sh [CommonJS]
node read-kitty.cjs
```

:::

### Output

```text
Variant: kitty
Session: Demo
Terminal type: xterm-256color
Private key on the host: C:\keys\example.ppk
Metadata only: key contents are not loaded.
```

Download: <a href="/examples/read-kitty.ts" download="read-kitty.ts">TypeScript</a> · <a href="/examples/read-kitty.js" download="read-kitty.js">JavaScript</a> · <a href="/examples/read-kitty.mjs" download="read-kitty.mjs">MJS</a> · <a href="/examples/read-kitty.cjs" download="read-kitty.cjs">CommonJS</a>

## Query the same fixture from the CLI

```sh
putty-js list --variant kitty --directory ./Sessions --json
```

For a KiTTY registry export use `--variant kitty --file ./kitty.reg`. The [fixture guide](/guide/fixtures) provides both forms.

## Native options and supported changes

`getNativeSettings` exposes the selected session's stored values, including terminal and KiTTY-specific options. Read selected known fields rather than logging the entire native record, which can contain sensitive data. Normalized writing supports the documented SSH subset and preserves unrelated native values; it does not expose setters for every PuTTY/KiTTY preference.

Encrypted `savemode=file` snapshots and unknown fork formats remain unsupported. See [storage and discovery](/guide/storage) and [safeguards](/guide/limitations).
