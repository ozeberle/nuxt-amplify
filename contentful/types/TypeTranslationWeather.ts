import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeTranslationWeatherFields {
    wtitle: EntryFieldTypes.Symbol;
}

export type TypeTranslationWeatherSkeleton = EntrySkeletonType<TypeTranslationWeatherFields, 'translationWeather'>;
export type TypeTranslationWeather<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTranslationWeatherSkeleton, Modifiers, Locales>;
