<!-- Generated from public package declarations by scripts/generate-api-docs.mjs. -->
# TypeScript reference

These signatures come from the public package entry points and their re-exports. Build the libraries and run `npm run docs:api` to update them. Use the API guide for behavior and examples.

## @jalsoedesign/putty-core

### index.d.ts

```ts
import type { SourceReference } from '@jalsoedesign/portline-abstract';
import { NativeProfileSource } from '@jalsoedesign/portline-platform';
import type { NativeDiscoveryOptions, NativeSession, NativeSettings, RegistryReader } from '@jalsoedesign/portline-platform';
export interface PuttyOptions extends NativeDiscoveryOptions {
    readonly variant?: 'putty' | 'kitty';
}
/** KiTTY directory sessions use Key\value\ lines, including literal backslashes in values. */
export declare function parseKittySession(contents: string): NativeSettings;
export declare class PuttyProfileSource extends NativeProfileSource {
    static fromSessions(source: SourceReference, sessions: readonly NativeSession[]): PuttyProfileSource;
    static fromFile(filename: string, variant?: 'putty' | 'kitty'): Promise<PuttyProfileSource>;
    static fromDirectory(directory: string, variant?: 'putty' | 'kitty'): Promise<PuttyProfileSource>;
    static fromRegistry(key?: string | undefined, variant?: 'putty' | 'kitty', reader?: RegistryReader, view?: '32' | '64' | 'default'): Promise<PuttyProfileSource>;
    static discover(options?: PuttyOptions): Promise<import("@jalsoedesign/portline-platform").DiscoveryResult>;
    static open(options?: PuttyOptions): Promise<PuttyProfileSource>;
}
export { PuttyProfileSource as Putty };
export declare const discoverPuttySources: typeof PuttyProfileSource.discover;
export * from './writing.js';
```

### writing.d.ts

```ts
import { NativeProfileWriter } from '@jalsoedesign/portline-platform';
import type { NativeWriteOptions } from '@jalsoedesign/portline-platform';
import type { SourceReference } from '@jalsoedesign/portline-abstract';
export declare function createPuttyWriter(source: SourceReference, options?: Omit<NativeWriteOptions, 'source' | 'application'>): NativeProfileWriter;
```
