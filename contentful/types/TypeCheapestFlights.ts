import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'
import type { TypeTranslationCheapestFlightsSkeleton } from './TypeTranslationCheapestFlights'

export interface TypeCheapestFlightsFields {
    title?: EntryFieldTypes.Symbol;
    translations?: EntryFieldTypes.EntryLink<TypeTranslationCheapestFlightsSkeleton>;
}

export type TypeCheapestFlightsSkeleton = EntrySkeletonType<TypeCheapestFlightsFields, 'cheapestFlights'>;
export type TypeCheapestFlights<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCheapestFlightsSkeleton, Modifiers, Locales>;
