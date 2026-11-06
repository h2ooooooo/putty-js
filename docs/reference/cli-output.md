---
outline: 2
---

# CLI output reference

These examples were captured from the actual built CLI using synthetic native settings. No remote connection was made. Paths are normalized for portability. Terminal examples preserve the executable's ANSI color choices; JSON examples are color-free. The [complete input reference](/reference/cli-help) lists command help.

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

## full record

```sh
putty-js get Demo --file <fixture-directory>\sessions.reg --full --json
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

## recursive list

```sh
putty-js list --file <fixture-directory>\sessions.reg --recurse --json
```

Exit code: 0.

### stdout

```json
{
  "name": "Root",
  "folders": [],
  "profiles": [
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
  ]
}
```

## missing profile

```sh
putty-js get does-not-exist --file <fixture-directory>\sessions.reg --json
```

Exit code: 1.

### stderr

```json
{"error":"Could not find profile by path \"does-not-exist\""}
```

## write status

```sh
putty-js write-status --file <fixture-directory>\sessions.reg --json
```

Exit code: 0.

### stdout

```json
{
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
  },
  "revision": "bfdab54e5ade5fa2c0009866fc1367b8517002649c7784c11fd44acb62b457c5",
  "diagnostics": [],
  "lock": "unlocked",
  "application": "closed"
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

## write preview

```sh
putty-js write --file <fixture-directory>\sessions.reg --input <fixture-directory>\putty-js-profiles.json --json
```

Exit code: 0.

### stdout

```json
{
  "schemaVersion": 1,
  "sourceId": "putty:<fixture-directory>\\sessions.reg",
  "application": "putty",
  "mode": "create",
  "allowLossy": false,
  "registryMode": "transactional",
  "expectedRevision": "bfdab54e5ade5fa2c0009866fc1367b8517002649c7784c11fd44acb62b457c5",
  "inspection": {
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
    },
    "revision": "bfdab54e5ade5fa2c0009866fc1367b8517002649c7784c11fd44acb62b457c5",
    "diagnostics": [],
    "lock": "unlocked",
    "application": "closed"
  },
  "changes": [
    {
      "profileId": "Imported",
      "operation": "create",
      "fields": [
        "HostName",
        "PortNumber",
        "UserName",
        "Protocol",
        "PublicKeyFile",
        "TryAgent"
      ]
    }
  ],
  "diagnostics": [
    {
      "code": "metadata-only-sync",
      "severity": "warning",
      "message": "Stored secrets, private key contents, trust policies and application-specific settings are not copied"
    }
  ],
  "mutations": [
    {
      "operation": "create",
      "path": "Imported",
      "profile": {
        "id": "Demo",
        "path": "Imported",
        "name": "Imported",
        "source": {
          "id": "putty:<fixture-directory>\\sessions.reg",
          "application": "putty"
        },
        "connections": [
          {
            "id": "connection",
            "endpoint": {
              "host": "shell.example.invalid",
              "port": 22,
              "username": "deploy"
            },
            "authentication": [
              {
                "type": "private-key",
                "path": {
                  "value": "C:\\keys\\example.ppk"
                },
                "format": "ppk"
              },
              {
                "type": "password",
                "credential": {
                  "sourceId": "omitted",
                  "id": "omitted",
                  "kind": "password",
                  "state": "not-stored"
                }
              },
              {
                "type": "agent"
              }
            ],
            "kind": "ssh",
            "protocol": "ssh"
          }
        ],
        "diagnostics": []
      }
    }
  ],
  "digest": "0b9a842ba0e8afbbcd235f3b1f4b36c1b0aa9b8e44843990b81794b84172d06e"
}
```

## invalid apply

```sh
putty-js apply --file <fixture-directory>\sessions.reg --plan <fixture-directory>\missing-plan.json --json
```

Exit code: 1.

### stderr

```json
{"error":"ENOENT: no such file or directory, stat '<fixture-directory>\\missing-plan.json'"}
```

## Write and sync result contracts

write and sync both emit `NativeWritePreview`: schemaVersion, application, sourceId, expectedRevision, mode, `allowLossy`, optional `registryMode`/scope, inspection, diagnostics, changes, sanitized mutations and a digest. They never apply settings. A digest detects an edited plan; it is not a signature. Sync requires an installed source adapter and explicit connection selection for multi-connection profiles.

Successful apply emits `{applied: true, sourceId, changes, backups}`. It performs guard checks and commits separately; this documentation does not execute apply against a real application store. write-status emits source, revision, application, lock and diagnostics. These write commands emit JSON even without `--json`; `--json` also requests JSON errors.

Read/query success uses stdout; shared query/write failures use stderr and exit 1. Help and successful/empty reads exit 0. With `--json`, ordinary errors have an error string. Registry refusals can additionally include code, nativeCode, operation, `recoveryRequired` and backups. Do not treat a failed lookup as an empty successful list.

Stored credentials remain hidden by default. `--show-password` explicitly changes credential visibility and may report unavailable/locked/unsupported states. Keys and remote directories appear only when present. Captured examples contain no real credential values.
