import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeTranslationAllRoutesFromOriginFields {
    arTitle: EntryFieldTypes.Symbol;
}

export type TypeTranslationAllRoutesFromOriginSkeleton = EntrySkeletonType<TypeTranslationAllRoutesFromOriginFields, 'translationAllRoutesFromOrigin'>;
export type TypeTranslationAllRoutesFromOrigin<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTranslationAllRoutesFromOriginSkeleton, Modifiers, Locales>;
