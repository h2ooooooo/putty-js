---
outline: 2
---

# Query command examples

Inputs and outputs below were captured from the built command using synthetic settings. Colours preserve the executable's actual ANSI choices; JSON remains colour-free. These reference fixtures use example.invalid hosts and are separate from the 127.0.0.1 quick-start fixture. Placeholder fixture paths must be replaced with your local paths. No external server was contacted.

Start with the [CLI quick start](/cli/quick-start) for a complete fixture you can create and query immediately. See the [full output reference](/reference/cli-output) for every captured case.

## list (terminal)
```sh
putty-js list --file <fixture-directory>\sessions.reg --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code><span style="color:#72f088;">• </span>Demo (Private key: C:\keys\example.ppk)</code></pre>

## list (JSON)
```sh
putty-js list --file <fixture-directory>\sessions.reg --json
```

Exit code: 0.

### stdout

```json
[
  {
    "path": "Demo",
    "host": "shell.example.invalid",
    "protocol": "ssh",
    "keyFile": "C:\\keys\\example.ppk",
    "remoteDirectory": ""
  }
]
```

## list (table)
```sh
putty-js list --file <fixture-directory>\sessions.reg --table --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code><span style="color:#76e3ea;">┌</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">───────────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">─────────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">────────</span><span style="color:#76e3ea;">┐</span>
<span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Path</span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Host                 </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Protocol</span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Private key        </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Remote</span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">├</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">───────────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">─────────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">────────</span><span style="color:#76e3ea;">┤</span>
<span style="color:#76e3ea;">│</span> Demo <span style="color:#76e3ea;">│</span> shell.example.invalid <span style="color:#76e3ea;">│</span> ssh      <span style="color:#76e3ea;">│</span> C:\keys\example.ppk <span style="color:#76e3ea;">│</span>        <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">└</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">───────────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">─────────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">────────</span><span style="color:#76e3ea;">┘</span></code></pre>

## search
```sh
putty-js search example --file <fixture-directory>\sessions.reg --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code>Found 1 profile

<span style="color:#76e3ea;">┌</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">─────────────────────────────────</span><span style="color:#76e3ea;">┐</span>
<span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Label           </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Value                          </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">├</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">─────────────────────────────────</span><span style="color:#76e3ea;">┤</span>
<span style="color:#76e3ea;">│</span> Name             <span style="color:#76e3ea;">│</span> Demo                            <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Path             <span style="color:#76e3ea;">│</span> Demo                            <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Protocol         <span style="color:#76e3ea;">│</span> ssh                             <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Host             <span style="color:#76e3ea;">│</span> shell.example.invalid           <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Port             <span style="color:#76e3ea;">│</span> 22                              <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Username         <span style="color:#76e3ea;">│</span> deploy                          <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Password         <span style="color:#76e3ea;">│</span>                                 <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Passphrase       <span style="color:#76e3ea;">│</span>                                 <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Credential state <span style="color:#76e3ea;">│</span> not-stored                      <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Authentication   <span style="color:#76e3ea;">│</span> connection/password: not-stored <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Private key      <span style="color:#76e3ea;">│</span> C:\keys\example.ppk             <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Remote           <span style="color:#76e3ea;">│</span>                                 <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">└</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">─────────────────────────────────</span><span style="color:#76e3ea;">┘</span></code></pre>

## get (JSON)
```sh
putty-js get Demo --file <fixture-directory>\sessions.reg --json
```

Exit code: 0.

### stdout

```json
{
  "name": "Demo",
  "path": "Demo",
  "protocol": "ssh",
  "host": "shell.example.invalid",
  "port": 22,
  "user": "deploy",
  "password": "(hidden)",
  "passphrase": "(hidden)",
  "credentialState": "not-stored",
  "credentials": [
    {
      "connectionId": "connection",
      "kind": "password",
      "state": "not-stored"
    }
  ],
  "authentication": "connection/password: not-stored",
  "keyFile": "C:\\keys\\example.ppk",
  "remoteDirectory": "",
  "connections": [
    {
      "id": "connection",
      "kind": "ssh",
      "protocol": "ssh",
      "endpoint": {
        "host": "shell.example.invalid",
        "port": 22,
        "username": "deploy"
      },
      "authentication": [
        {
          "type": "private-key",
          "path": {
            "value": "C:\\keys\\example.ppk",
            "format": "native"
          },
          "format": "ppk"
        },
        {
          "type": "password",
          "credential": {
            "sourceId": "putty:<fixture-directory>\\sessions.reg",
            "id": "Demo",
            "state": "not-stored",
            "kind": "password"
          }
        },
        {
          "type": "agent"
        }
      ]
    }
  ],
  "diagnostics": [],
  "source": {
    "id": "putty:<fixture-directory>\\sessions.reg",
    "application": "putty",
    "location": "<fixture-directory>\\sessions.reg",
    "storage": [
      {
        "kind": "file",
        "path": "<fixture-directory>\\sessions.reg"
      }
    ]
  }
}
```

## get a property
```sh
putty-js get Demo host --file <fixture-directory>\sessions.reg --json
```

Exit code: 0.

### stdout

```json
"shell.example.invalid"
```

## source
```sh
putty-js source --file <fixture-directory>\sessions.reg --json
```

Exit code: 0.

### stdout

```json
{
  "id": "putty:<fixture-directory>\\sessions.reg",
  "application": "putty",
  "location": "<fixture-directory>\\sessions.reg",
  "storage": [
    {
      "kind": "file",
      "path": "<fixture-directory>\\sessions.reg"
    }
  ]
}
```

## sources
```sh
putty-js sources --file <fixture-directory>\sessions.reg --json
```

Exit code: 0.

### stdout

```json
{
  "candidates": [
    {
      "id": "putty:<fixture-directory>\\sessions.reg",
      "application": "putty",
      "location": "<fixture-directory>\\sessions.reg",
      "storage": [
        {
          "kind": "file",
          "path": "<fixture-directory>\\sessions.reg"
        }
      ]
    }
  ],
  "selectedSourceId": "putty:<fixture-directory>\\sessions.reg",
  "selectedBy": "explicit",
  "diagnostics": []
}
```
