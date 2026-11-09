# How PuTTY / KiTTY JS works

The reader opens saved session storage on the host. It does not control a PuTTY or KiTTY window and does not establish an SSH connection while listing sessions.

## Find the settings source

PuTTY's official Windows session store is `HKCU\Software\SimonTatham\PuTTY\Sessions`. `HKCU` means `HKEY_CURRENT_USER`, the current Windows user's registry hive. Each child key is a saved session. Cached host keys live separately under `SshHostKeys`; reading a session does not verify its server. See [PuTTY's storage FAQ](https://www.chiark.greenend.org.uk/~sgtatham/putty/faq.html#faq-settings).

KiTTY uses `HKCU\Software\9bis.com\KiTTY\Sessions` for registry storage and also supports documented portable formats.

Choose a registry source, a registry-export file or a supported session file/directory explicitly. Live registry reads use the host's Windows registry; an exported file can be read separately without opening that registry.

Discovery reports available candidates and can use running-process executable paths and storage switches as evidence. Official PuTTY selects its registry store. KiTTY discovery checks `kitty.ini`, including `KITTY_INI_FILE` where supplied: `savemode=registry` selects registry storage, while `savemode=dir` selects the configured Sessions directory. KiTTY's own [`kitty_commun.c` source](https://github.com/cyd01/KiTTY/blob/master/kitty_commun.c) defines these modes and the `configdir` setting. Encrypted `savemode=file` snapshots and unknown fork formats are unsupported. Ambiguous sources need explicit selection.

## Read and interpret the sessions

1. Read the selected file/directory or enumerate the selected registry key on the host.
2. Parse registry exports, supported INI-like session sections or KiTTY's native session lines.
3. Decode escaped session names and supported KiTTY values.
4. Build profiles containing host, port, username, authentication metadata and source information.
5. Keep native values available for settings without a normalized equivalent.

### A registry session

This synthetic `.reg` excerpt describes one session, not a command to import:

```text
[HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\Sessions\Demo%20SSH]
"HostName"="ssh.example.test"
"UserName"="deploy"
"PortNumber"=dword:00000016
"PublicKeyFile"="C:\\keys\\example.ppk"
```

| Stored part | Meaning in the profile |
| --- | --- |
| `Demo%20SSH` | Escaped session name, decoded to `Demo SSH`. |
| `HostName` and `UserName` | Server endpoint `ssh.example.test` and SSH username `deploy`. |
| `dword:00000016` | Registry integer written in hexadecimal; `0x16` is port `22`. |
| `PublicKeyFile` | PuTTY's name for the private-key file setting. Doubled backslashes are `.reg` string escaping; the decoded path is `C:\keys\example.ppk` on the host. |

The [source and native-settings APIs](/reference/api#read-a-source) distinguish normalized connection fields from the original native values. The [public type definitions](/reference/types#jalsoedesign-putty-core) describe `PuttyProfileSource` and `PuttyOptions`.

### A KiTTY portable session

A supported file inside the selected `Sessions` directory can contain:

```text
PublicKeyFile\C:%5Ckeys%5Cexample.ppk\
^             ^                      ^
|             |                      \-- Final delimiter
|             \-- Percent-encoded setting value
\-- Setting name
```

The first backslash separates `PublicKeyFile` (the setting name) from `C:%5Ckeys%5Cexample.ppk` (the encoded value). The trailing backslash ends the record.

Percent-encoded `%5C` becomes a backslash, producing `C:\keys\example.ppk`. Backslashes inside an unescaped value are also preserved. Reading the profile does not open that key. See the [parser definition](/reference/types#jalsoedesign-putty-core) and KiTTY's [native directory/registry reader in `winstore.c`](https://github.com/cyd01/KiTTY/blob/master/0.76_My_PuTTY/windows/winstore.c).

Non-SSH protocols and native proxy options remain identifiable through native settings and diagnostics. A normalized SSH profile is not a complete emulation of every terminal or proxy preference.

## Understand authentication

Profiles can report a saved private-key path and SSH-agent settings. The reader does not retrieve agent key material. PuTTY does not normally store session passwords; KiTTY saved-password formats are not decoded by this library. Password metadata distinguishes not-stored and unsupported cases rather than inventing a credential value.

## Reading, connecting and writing

A source is a snapshot of the selected storage. Reopen it after settings change. Reading and searching do not connect to the server or change native settings.

Use the [API quick start](/api/quick-start) or [CLI quick start](/cli/quick-start) to read a synthetic session. [Storage and discovery](/guide/storage) explains source selection; [profile writing](/guide/writing) covers separate preview/apply operations and their safeguards. Dockline provides live SSH and transfer operations when needed.

## Shared execution after native interpretation

The source now exposes normalized execution details alongside metadata. `@jalsoedesign/portline-dockline` performs the shared mapping and delegates live sessions to optional Dockline clients. Native-only requirements appear in `unsupportedOptions`; they are refused rather than dropped. Read [the scoped source-to-session walkthrough](/api/integration) for supported operations and explicit trust/authentication options.
