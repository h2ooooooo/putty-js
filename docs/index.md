---
layout: home
hero:
  name: PuTTY / KiTTY JS
  text: Use the SSH sessions you have already saved.
  tagline: Read PuTTY and KiTTY session settings from code or the terminal.
  actions:
    - theme: brand
      text: API documentation
      link: /api/
    - theme: alt
      text: CLI documentation
      link: /cli/
---

Source code: [GitHub repository](https://github.com/h2ooooooo/putty-js).

A saved terminal session already describes the SSH host, port, username and authentication settings. PuTTY / KiTTY JS makes those settings available to scripts and terminal commands. Find the session, inspect its key path and native options, or preview a supported profile change without re-entering the connection details.

[How it works](/guide/how-it-works) explains where settings are read, how the native format is interpreted and what happens on the host.

## Start with a working example

| Goal | Start here |
| --- | --- |
| Read settings from code | [API quick start with output](/api/quick-start) |
| Inspect settings from a terminal | [CLI quick start with output](/cli/quick-start) |
| Try everything without installed settings | [Synthetic fixtures](/guide/fixtures) |
| Preview a supported settings change | [Preview, review and apply](/guide/writing) |
| Read KiTTY portable sessions and native options | [KiTTY example](/guide/kitty) |

## What the library does

Read registry exports, live Windows registry sessions and supported KiTTY portable formats. Native access retains application-specific settings; normalized writing handles the documented SSH subset.

Read operations describe saved metadata without opening a remote session. Use [Dockline](https://h2ooooooo.github.io/dockline/) for transfers/SSH and [Dockline Keys](https://h2ooooooo.github.io/dockline/keys/) for key loading and conversion.

Part of the [Portline family](https://h2ooooooo.github.io/portline/libraries/), with each application library maintained in its own repository.

## Reuse a saved connection

[Connect a selected profile](/api/integration) through the optional shared Portline–Dockline integration. Use the same scoped execution API across application readers while keeping native parsing and metadata queries free of transport dependencies.
