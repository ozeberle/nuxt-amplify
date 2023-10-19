import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'
import type { TypeTranslationHistogramSkeleton } from './TypeTranslationHistogram'

export interface TypeHistogramSectionFields {
    title?: EntryFieldTypes.Symbol;
    translations?: EntryFieldTypes.EntryLink<TypeTranslationHistogramSkeleton>;
}

export type TypeHistogramSectionSkeleton = EntrySkeletonType<TypeHistogramSectionFields, 'histogramSection'>;
export type TypeHistogramSection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHistogramSectionSkeleton, Modifiers, Locales>;
