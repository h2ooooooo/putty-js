# API documentation

Read saved PuTTY and KiTTY sessions, find their settings store, inspect native options and preview supported SSH profile changes.

## Start here

1. [Choose the package](/guide/installation) needed by the code.
2. [Run the API quick start](/api/quick-start) with complete code and verified output.
3. Continue with [list/search/get](/api/profiles), [storage selection](/guide/storage) or [a writer preview](/guide/writing).

[The KiTTY example](/guide/kitty) reads a portable directory and selected native fields.

## Reference and advanced usage

Use [method contracts](/reference/api) or [exact TypeScript signatures](/reference/types) for lookup. [Execution boundaries](/api/integration) explain how metadata relates to separate transport/database operations. Review [writing safeguards](/guide/writing) before applying changes.

For terminal use, switch to [CLI documentation](/cli/).

## Connect through the shared integration

Use [shared FTP/SFTP and SSH execution](/api/integration) to reuse a selected normalized profile with `@jalsoedesign/portline-dockline`. The guide includes reader-specific source creation, optional client installation, scoped cleanup and trust/authentication requirements. Native readers do not open connections while listing profiles.
