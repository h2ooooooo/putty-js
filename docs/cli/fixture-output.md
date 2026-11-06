# Run commands against the demo fixture

Install `@jalsoedesign/putty-cli` and save the [synthetic files](/guide/fixtures). These captures use those exact files. They are independent of the broader reference examples using `example.invalid` endpoints.

## Get one property

```sh
putty-js get Demo host --file ./sessions.reg --json
```

Exit code: `0`.

Standard output:

```json
"127.0.0.1"
```

## List profiles

```sh
putty-js list --file ./sessions.reg --json
```

Exit code: `0`.

Standard output:

```json
[
  {
    "path": "Demo",
    "host": "127.0.0.1",
    "protocol": "ssh",
    "keyFile": "C:\\keys\\example.ppk",
    "remoteDirectory": ""
  }
]
```

## Search metadata

```sh
putty-js search 127.0.0.1 --file ./sessions.reg --color
```

Exit code: `0`.

Standard output:

<pre class="cli-output" v-pre><code>Found 1 profile

<span style="color:#00aaaa">┌</span><span style="color:#00aaaa">──────────────────</span><span style="color:#00aaaa">┬</span><span style="color:#00aaaa">─────────────────────────────────</span><span style="color:#00aaaa">┐</span>
<span style="color:#00aaaa">│</span> <span style="font-weight:700"></span><span style="color:#ffffff;font-weight:700">Label           </span><span style="font-weight:700"></span> <span style="color:#00aaaa">│</span> <span style="font-weight:700"></span><span style="color:#ffffff;font-weight:700">Value                          </span><span style="font-weight:700"></span> <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">├</span><span style="color:#00aaaa">──────────────────</span><span style="color:#00aaaa">┼</span><span style="color:#00aaaa">─────────────────────────────────</span><span style="color:#00aaaa">┤</span>
<span style="color:#00aaaa">│</span> Name             <span style="color:#00aaaa">│</span> Demo                            <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">│</span> Path             <span style="color:#00aaaa">│</span> Demo                            <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">│</span> Protocol         <span style="color:#00aaaa">│</span> ssh                             <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">│</span> Host             <span style="color:#00aaaa">│</span> 127.0.0.1                       <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">│</span> Port             <span style="color:#00aaaa">│</span> 22                              <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">│</span> Username         <span style="color:#00aaaa">│</span> deploy                          <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">│</span> Password         <span style="color:#00aaaa">│</span>                                 <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">│</span> Passphrase       <span style="color:#00aaaa">│</span>                                 <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">│</span> Credential state <span style="color:#00aaaa">│</span> not-stored                      <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">│</span> Authentication   <span style="color:#00aaaa">│</span> connection/password: not-stored <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">│</span> Private key      <span style="color:#00aaaa">│</span> C:\keys\example.ppk             <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">│</span> Remote           <span style="color:#00aaaa">│</span>                                 <span style="color:#00aaaa">│</span>
<span style="color:#00aaaa">└</span><span style="color:#00aaaa">──────────────────</span><span style="color:#00aaaa">┴</span><span style="color:#00aaaa">─────────────────────────────────</span><span style="color:#00aaaa">┘</span></code></pre>

## KiTTY directory

```sh
putty-js list --variant kitty --directory ./Sessions --json
```

Exit code: `0`.

Standard output:

```json
[
  {
    "path": "Demo",
    "host": "127.0.0.1",
    "protocol": "ssh",
    "keyFile": "C:\\keys\\example.ppk",
    "remoteDirectory": ""
  }
]
```

## Missing profile

```sh
putty-js get Missing --file ./sessions.reg --json
```

Exit code: `1`.

Standard error:

```text
{"error":"Could not find profile by path \"Missing\""}
```

JSON is colour-free; the human capture preserves actual CLI colours. Check the exit code before consuming output. Credential values remain masked unless explicit supported resolution is requested. See [automation](/cli/automation) and the [full command reference](/reference/cli-help).
