import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeTranslationHistogramFields {
    hTitle?: EntryFieldTypes.Symbol;
    hFrom?: EntryFieldTypes.Symbol;
    hTo: EntryFieldTypes.Symbol;
    how: EntryFieldTypes.Symbol;
    hrt?: EntryFieldTypes.Symbol;
    hm?: EntryFieldTypes.Symbol;
}

export type TypeTranslationHistogramSkeleton = EntrySkeletonType<TypeTranslationHistogramFields, 'translationHistogram'>;
export type TypeTranslationHistogram<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTranslationHistogramSkeleton, Modifiers, Locales>;
