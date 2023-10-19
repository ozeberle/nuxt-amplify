import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeTranslationCheapestFlightsFields {
    cpTitle?: EntryFieldTypes.Symbol;
    chFrom: EntryFieldTypes.Symbol;
    cfTo: EntryFieldTypes.Symbol;
    cfMaxBudg: EntryFieldTypes.Symbol;
    cpType?: EntryFieldTypes.Symbol;
    cfDate: EntryFieldTypes.Symbol;
    cfCost: EntryFieldTypes.Symbol;
}

export type TypeTranslationCheapestFlightsSkeleton = EntrySkeletonType<TypeTranslationCheapestFlightsFields, 'translationCheapestFlights'>;
export type TypeTranslationCheapestFlights<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTranslationCheapestFlightsSkeleton, Modifiers, Locales>;
