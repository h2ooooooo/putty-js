# CLI quick start

List, search and select a synthetic saved session without reading installed settings or connecting to a server.

## Install

```sh
npm install --global @jalsoedesign/putty-cli
```

For project-local use, install without `--global` and prefix commands with `npm exec --`. See [runtime requirements](/guide/installation).

## Save the fixture

Use the [synthetic settings files](/guide/fixtures): <a href="/examples/fixtures/sessions.reg" download="sessions.reg"><code>sessions.reg</code></a> · <a href="/examples/fixtures/kitty.reg" download="kitty.reg"><code>kitty.reg</code></a> · <a href="/examples/fixtures/Sessions/Demo" download="Demo"><code>Sessions/Demo</code></a>. Run from their parent working directory. The selected file is `./sessions.reg`. Key paths are illustrative metadata and require no key file.

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

## Continue by task

Use [query commands](/cli/queries) for coloured search output and JSON, or [writing commands](/cli/writing) for separate preview/apply operations. Contributor fixture runners live in [local demos](/guide/local-demo).
