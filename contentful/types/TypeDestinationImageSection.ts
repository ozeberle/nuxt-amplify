import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeDestinationImageSectionFields {
    title?: EntryFieldTypes.Symbol;
    destinationImage?: EntryFieldTypes.AssetLink;
}

export type TypeDestinationImageSectionSkeleton = EntrySkeletonType<TypeDestinationImageSectionFields, 'destinationImageSection'>;
export type TypeDestinationImageSection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeDestinationImageSectionSkeleton, Modifiers, Locales>;
