# Safeguards and limitations

## Supported projection

PuTTY stores sessions in the Windows registry. Registry exports can be read from a file. KiTTY additionally supports known native Sessions directories and session files; select the variant explicitly. Unknown fork formats and encrypted `savemode=file` snapshots are refused.

Unknown terminal, font, proxy, forwarding and KiTTY extension values remain available through the native settings API. They are preserved during supported profile updates, but are not all editable through the normalized writer. Saved command strings are data and are never executed.

## Secret handling

Normalized metadata contains references, never stored passwords, key passphrases or private-key contents. Raw native settings access is opt-in; reading a native file/registry snapshot can still read password-bearing stored bytes internally. See [snapshot and native-data handling](https://h2ooooooo.github.io/portline/integration/profiles#snapshots-and-native-data). Credential lookup can return available, not-stored, locked, unavailable or unsupported. An available reference describes a possible lookup, not a guarantee that a value can be recovered later.

Sync does not copy stored secrets, key contents or trust policy. Concrete private-key paths may be copied; relative paths need a known base. Unsupported conversions fail. `--allow-lossy` acknowledges listed supported metadata omissions and cannot bypass an unsupported protocol or native authentication mode.

## Write protection

Built-in apply is Windows-only. It checks revisions, application processes and known lock markers, then acquires native storage access before mutation. It does not kill applications or remove stale native locks. Unknown availability is refused. There is no force bypass.

Files use exclusive handles and protected backups with rollback. A crash can interrupt multi-file writes; retain backups for recovery. Native Windows registry writes default to transactions. If the host cannot provide transactions, apply reports the capability error and refuses.

Where the application supports registry storage, explicit `--registry-mode guarded` uses checks, encrypted backups and conditional rollback without atomicity. Select the same mode for preview and apply. Keep applications and other writers closed throughout. A conflict or stopped rollback reports `recoveryRequired` and backup paths; inspect those before retrying.



See [the shared recovery guide](https://h2ooooooo.github.io/portline/integration/native-writing) for the full native format matrix and recovery limits.

## Operations are separate

Profile parsing does not open SSH, transfer files, run saved commands or execute SQL. Use the relevant Dockline client for SSH/transfer operations, and a database client for SQL operations. A normalized profile is configuration data, not an authenticated session.

## Recovery data and execution boundary

Sync does not copy credential values between profiles. Recovery backups are different: they contain the original native settings and can include stored or obfuscated credentials. File backups are protected by current-user ACLs; registry backups use current-user DPAPI. Keep them private and retain them when recovery is required.

The optional `@jalsoedesign/portline-dockline` package now maps supported normalized profiles into Dockline execution. Readers keep native parsing and credential providers; the shared bridge owns connection selection, conversion and runtime policy. Install only the Dockline client needed for FTP/FTPS, SFTP or SSH. Use [the complete scoped connection example](/api/integration) instead of manually mapping native settings. The bridge refuses unsupported native requirements and SSH-hop routes; it never infers an SSH endpoint from a database or FTP address. SQL execution and database import/export remain outside these libraries.

## Discovery and native-setting limits

See [storage and discovery](/guide/storage) for the exact selection and native-format boundaries.
