import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'
import type { TypeTranslationWeatherSkeleton } from './TypeTranslationWeather'

export interface TypeWeatherSectionFields {
    title?: EntryFieldTypes.Symbol;
    translations?: EntryFieldTypes.EntryLink<TypeTranslationWeatherSkeleton>;
}

export type TypeWeatherSectionSkeleton = EntrySkeletonType<TypeWeatherSectionFields, 'weatherSection'>;
export type TypeWeatherSection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWeatherSectionSkeleton, Modifiers, Locales>;
