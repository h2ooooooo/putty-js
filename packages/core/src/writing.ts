import {NativeProfileWriter} from '@jalsoedesign/portline-platform';
import type {NativeWriteOptions} from '@jalsoedesign/portline-platform';
import type {SourceReference} from '@jalsoedesign/portline-abstract';

export function createPuttyWriter(source: SourceReference, options: Omit<NativeWriteOptions, 'source' | 'application'> = {}) {
    return new NativeProfileWriter({...options, source, application: source.application.toLowerCase() === 'kitty' ? 'kitty' : 'putty' });
}
