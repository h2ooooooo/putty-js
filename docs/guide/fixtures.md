# Synthetic settings for examples

These files contain loopback endpoints and illustrative key paths. They do not require an account, an installed PuTTY and KiTTY application or an actual private key. Reading them opens no connection.

## Download or copy

<a href="/examples/fixtures/sessions.reg" download="sessions.reg"><code>sessions.reg</code></a> · <a href="/examples/fixtures/kitty.reg" download="kitty.reg"><code>kitty.reg</code></a> · <a href="/examples/fixtures/Sessions/Demo" download="Demo"><code>Sessions/Demo</code></a>

Save the files under the shown names in an empty working directory. Create parent directories where shown. These are settings files on the host, not paths on a remote server. Keep this directory separate from installed application settings.

### sessions.reg

```ini
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\Sessions\Demo]
"HostName"="127.0.0.1"
"UserName"="deploy"
"PortNumber"=dword:00000016
"PublicKeyFile"="C:\\keys\\example.ppk"
"TerminalType"="xterm-256color"
```

### kitty.reg

```ini
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\9bis.com\KiTTY\Sessions\Demo]
"HostName"="127.0.0.1"
"UserName"="deploy"
"PortNumber"=dword:00000016
"PublicKeyFile"="C:\\keys\\example.ppk"
"TerminalType"="xterm-256color"
```

### Sessions/Demo

```text
HostName\127.0.0.1\
UserName\deploy\
PortNumber\22\
PublicKeyFile\C:%5Ckeys%5Cexample.ppk\
TerminalType\xterm-256color\
```



Continue with the [API quick start](/api/quick-start) or [CLI quick start](/cli/quick-start).
