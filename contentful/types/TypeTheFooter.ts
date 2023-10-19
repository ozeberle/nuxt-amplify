import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'
import type { TypeSocialMediaSkeleton } from './TypeSocialMedia'

export interface TypeTheFooterFields {
    title: EntryFieldTypes.Symbol;
    socialMedia?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSocialMediaSkeleton>>;
    markup?: EntryFieldTypes.RichText;
    companyInfo?: EntryFieldTypes.RichText;
}

export type TypeTheFooterSkeleton = EntrySkeletonType<TypeTheFooterFields, 'TheFooter'>;
export type TypeTheFooter<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTheFooterSkeleton, Modifiers, Locales>;
