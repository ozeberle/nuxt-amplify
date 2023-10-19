import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'
import type { TypeTranslationAllRoutesFromOriginSkeleton } from './TypeTranslationAllRoutesFromOrigin'

export interface TypeAllRoutesFromOriginFields {
    title?: EntryFieldTypes.Symbol;
    originCity: EntryFieldTypes.Symbol;
    originCode?: EntryFieldTypes.Symbol;
    destination?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    translations?: EntryFieldTypes.EntryLink<TypeTranslationAllRoutesFromOriginSkeleton>;
}

export type TypeAllRoutesFromOriginSkeleton = EntrySkeletonType<TypeAllRoutesFromOriginFields, 'allRoutesFromOrigin'>;
export type TypeAllRoutesFromOrigin<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAllRoutesFromOriginSkeleton, Modifiers, Locales>;
