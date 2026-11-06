# Storage and discovery

The recipes below use `PuttyProfileSource` imported from the library as in the [API quick start](/api/quick-start). These are contextual recipes for explicitly selected native storage, rather than independent runnable files.

PuTTY stores sessions in the Windows registry. Registry exports can be read from a file. KiTTY additionally supports known native Sessions directories and session files; select the variant explicitly. Unknown fork formats and encrypted `savemode=file` snapshots are refused.

## Discover before selecting

::: code-group

```ts [TypeScript]
import {PuttyProfileSource} from '@jalsoedesign/putty-core';

const discovery = await PuttyProfileSource.discover();
console.log(discovery.candidates, discovery.selectedSourceId, discovery.diagnostics);
```

```js [JavaScript]
import {PuttyProfileSource} from '@jalsoedesign/putty-core';

const discovery = await PuttyProfileSource.discover();
console.log(discovery.candidates, discovery.selectedSourceId, discovery.diagnostics);
```

```js [MJS]
import {PuttyProfileSource} from '@jalsoedesign/putty-core';

const discovery = await PuttyProfileSource.discover();
console.log(discovery.candidates, discovery.selectedSourceId, discovery.diagnostics);
```

```js [CommonJS]
const {PuttyProfileSource} = await import('@jalsoedesign/putty-core');

const discovery = await PuttyProfileSource.discover();
console.log(discovery.candidates, discovery.selectedSourceId, discovery.diagnostics);
```

:::

Candidates carry source identity, storage kind and location, registry view where relevant, and an executable/version when discovery actually establishes them. An absent selected source means the caller must choose; it does not mean all candidates should be merged.

~~~sh
putty-js sources --json
putty-js list --source <source-id> --json
~~~

Use `open(options)` to apply discovery and open the selected source. Explicit source options take priority. Do not infer active storage or application version from an arbitrary file path.

## Native data and projection

Unknown terminal, font, proxy, forwarding and KiTTY extension values remain available through the native settings API. They are preserved during supported profile updates, but are not all editable through the normalized writer. Saved command strings are data and are never executed.

`getNativeSettings(name)` is an explicit escape hatch for application-specific values. It can contain saved credentials and should not be serialized or logged as ordinary profile metadata.

## KiTTY

::: code-group

```ts [TypeScript]
const kitty = await PuttyProfileSource.fromDirectory('Sessions', 'kitty');
console.log(kitty.list().map(profile => profile.path));
```

```js [JavaScript]
const kitty = await PuttyProfileSource.fromDirectory('Sessions', 'kitty');
console.log(kitty.list().map(profile => profile.path));
```

```js [MJS]
const kitty = await PuttyProfileSource.fromDirectory('Sessions', 'kitty');
console.log(kitty.list().map(profile => profile.path));
```

```js [CommonJS]
const kitty = await PuttyProfileSource.fromDirectory('Sessions', 'kitty');
console.log(kitty.list().map(profile => profile.path));
```

:::

~~~sh
putty-js list --variant kitty --directory Sessions --json
~~~

The same library and executable support both variants. The selected source determines the writer variant; there is no separate KiTTY npm identity.


## Discovery and native-setting limits

Built-in live registry/process inspection requires Windows; explicit registry-export files and supported session directories can be read without Windows registry access. Discovery of official PuTTY selects its registry backend. Portable forks are not inferred from the PuTTY executable name; select a known file format explicitly.

KiTTY discovery reads `KITTY_INI_FILE` or kitty.ini beside the executable and recognizes `savemode=registry` and `savemode=dir`, using `configdir` for the latter. Missing/unsupported mode information leaves a running source unresolved. Encrypted `savemode=file` snapshots are not supported. An explicit file/directory/registry selection takes precedence.

Source executable/version metadata is reported only when the process reader actually established it. Passing an arbitrary `--executable` path does not prove its file version or that the application is running. Native access exposes a selected session's stored values, not every application-wide preference or an editor for every PuTTY/KiTTY option. Only direct SSH has the supported normalized write projection; other native protocols remain unsupported connection records.
