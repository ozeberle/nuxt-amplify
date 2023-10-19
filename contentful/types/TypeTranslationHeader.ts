import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeTranslationHeaderFields {
    headerText: EntryFieldTypes.Symbol;
    heCode: EntryFieldTypes.Symbol;
    heAdt: EntryFieldTypes.Symbol;
    heYth: EntryFieldTypes.Symbol;
    heChd: EntryFieldTypes.Symbol;
    heIftLp: EntryFieldTypes.Symbol;
    heIftSeat: EntryFieldTypes.Symbol;
    searchButton: EntryFieldTypes.Symbol;
    ow: EntryFieldTypes.Symbol;
    rt?: EntryFieldTypes.Symbol;
    ps: EntryFieldTypes.Symbol;
    pp: EntryFieldTypes.Symbol;
    from: EntryFieldTypes.Symbol;
    to: EntryFieldTypes.Symbol;
    dd: EntryFieldTypes.Symbol;
    rd: EntryFieldTypes.Symbol;
    heDone: EntryFieldTypes.Symbol;
}

export type TypeTranslationHeaderSkeleton = EntrySkeletonType<TypeTranslationHeaderFields, 'translationHeader'>;
export type TypeTranslationHeader<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTranslationHeaderSkeleton, Modifiers, Locales>;
