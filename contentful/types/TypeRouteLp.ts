import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'
import type { TypeAllRoutesFromOriginSkeleton } from './TypeAllRoutesFromOrigin'
import type { TypeCheapestFlightsSkeleton } from './TypeCheapestFlights'
import type { TypeHistogramSectionSkeleton } from './TypeHistogramSection'

export interface TypeRouteLpFields {
    url?: EntryFieldTypes.Symbol;
    resultsByLocale?: EntryFieldTypes.Boolean;
    histogramSwitch?: EntryFieldTypes.Boolean;
    histogram?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeHistogramSectionSkeleton>>;
    destinationImage?: EntryFieldTypes.AssetLink;
    destinationWeather?: EntryFieldTypes.Boolean;
    cheapestFlights?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCheapestFlightsSkeleton>>;
    allRoutesFromOrigin?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeAllRoutesFromOriginSkeleton>>;
}

export type TypeRouteLpSkeleton = EntrySkeletonType<TypeRouteLpFields, 'routeLp'>;
export type TypeRouteLp<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeRouteLpSkeleton, Modifiers, Locales>;
