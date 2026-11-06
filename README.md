**[Read the documentation](https://h2ooooooo.github.io/putty-js/)**

# putty-js

Read PuTTY registry sessions and registry exports, plus supported KiTTY Sessions files and storage discovery. Official PuTTY has no portable file mode. KiTTY encrypted savemode=file snapshots are unsupported; unknown terminal, proxy, forwarding, font and extension settings remain accessible through the native API.

## Install and read profiles

~~~sh
npm install @jalsoedesign/putty-core
npm install --global @jalsoedesign/putty-cli
~~~

~~~ts
import {PuttyProfileSource} from '@jalsoedesign/putty-core';

const source = await PuttyProfileSource.fromFile('sessions.reg');
console.log(source.list());
~~~

~~~sh
putty-js sources --json
putty-js list --file sessions.reg --json
putty-js search example --file sessions.reg
putty-js get work --file sessions.reg --json
~~~

Node 22.22.2 or newer is required. Read commands do not change application settings. Discovery reports candidate storage; ambiguous installations require explicit selection. Windows-native storage and process discovery require Windows. See --help for the application's file, directory, registry and installation options.

Normalized profiles and default CLI output contain metadata and credential references. getNativeSettings() explicitly returns native settings and may contain secrets. --show-password requests supported credential resolution; unsupported encryption is reported without fabricating a password.

## Write and sync

write and sync create previews. apply is a separate operation; write-status checks availability without mutation. Existing profiles require explicit update/upsert mode, repeated on apply. Stored passwords, key contents and host trust policies are not copied. Unknown native settings are preserved where supported, and unsupported conversions are refused.

Built-in apply requires Windows. Writers recheck revisions, application processes and known lock markers. Files use exclusive handles and protected recovery backups. Registry writes default to native transactions and refuse unavailable capability. Explicit --registry-mode guarded enables checks, backups and conditional rollback without atomicity; select it for both preview and apply. Keep the application and other settings writers closed. There is no force or lock bypass.

[Writing policies, format boundaries and recovery](https://github.com/h2ooooooo/portline/blob/main/docs/profile-writing.md).

Portline manages profiles, selection, credentials references and guarded settings changes. This repository supplies the application adapter and executable. Dockline provides separate SSH, transfer and key operations.

## Development

See the [development guide](docs/development.md) for independent builds, linting, testing and packed consumer checks.

[Documentation](https://h2ooooooo.github.io/putty-js/) · [Quick start](https://h2ooooooo.github.io/putty-js/guide/quick-start) · [API reference](https://h2ooooooo.github.io/putty-js/reference/api)

## Runnable examples

[Run a local demo](docs/guide/local-demo.md) for one-command examples and captured output. Profile demos use synthetic settings and make no remote connections.
