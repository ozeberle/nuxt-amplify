import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'
import type { TypeAllRoutesFromOriginSkeleton } from './TypeAllRoutesFromOrigin'
import type { TypeCheapestFlightsSkeleton } from './TypeCheapestFlights'
import type { TypeDestinationImageSectionSkeleton } from './TypeDestinationImageSection'
import type { TypeHistogramSectionSkeleton } from './TypeHistogramSection'
import type { TypeTheFooterSkeleton } from './TypeTheFooter'
import type { TypeTheHeaderSkeleton } from './TypeTheHeader'
import type { TypeWeatherSectionSkeleton } from './TypeWeatherSection'

export interface TypeLandingPageOdFields {
    slug: EntryFieldTypes.Symbol;
    primaryColor: EntryFieldTypes.Symbol;
    features?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeAllRoutesFromOriginSkeleton | TypeCheapestFlightsSkeleton | TypeDestinationImageSectionSkeleton | TypeHistogramSectionSkeleton | TypeTheFooterSkeleton | TypeTheHeaderSkeleton | TypeWeatherSectionSkeleton>>;
    weatherWidget?: EntryFieldTypes.Boolean;
    showHistogram?: EntryFieldTypes.Boolean;
}

export type TypeLandingPageOdSkeleton = EntrySkeletonType<TypeLandingPageOdFields, 'landingPageOd'>;
export type TypeLandingPageOd<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLandingPageOdSkeleton, Modifiers, Locales>;
