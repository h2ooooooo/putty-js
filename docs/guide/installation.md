# Installation

Use Node.js 22.22.2 or newer. Choose the API or CLI according to the task:

## API

```sh
npm install @jalsoedesign/putty-core
```

The ESM package includes TypeScript declarations. Follow [language setup](/guide/examples) for TypeScript, JavaScript, MJS or CommonJS and run the [API quick start](/api/quick-start).

## CLI

```sh
npm install --global @jalsoedesign/putty-cli
putty-js --help
```

For project-local use, install without `--global` and invoke through `npm exec -- putty-js`. The CLI includes its reader dependencies; install the API package separately only when code imports it directly. Start with [the CLI quick start](/cli/quick-start).

## Platform support

Supported files can be read without an installed native application. Live Windows registry/process inspection and built-in native apply require Windows. File reads and previews remain available elsewhere; apply refuses unknown availability. See [format boundaries and safeguards](/guide/limitations).
