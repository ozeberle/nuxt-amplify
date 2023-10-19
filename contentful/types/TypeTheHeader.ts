import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'
import type { TypeTranslationHeaderSkeleton } from './TypeTranslationHeader'

export interface TypeTheHeaderFields {
    title: EntryFieldTypes.Symbol;
    logo: EntryFieldTypes.AssetLink;
    bgImage?: EntryFieldTypes.AssetLink;
    translations?: EntryFieldTypes.EntryLink<TypeTranslationHeaderSkeleton>;
}

export type TypeTheHeaderSkeleton = EntrySkeletonType<TypeTheHeaderFields, 'TheHeader'>;
export type TypeTheHeader<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTheHeaderSkeleton, Modifiers, Locales>;
