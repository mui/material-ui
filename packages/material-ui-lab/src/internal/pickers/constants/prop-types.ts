export type ParseableDate<TDate> = string | number | Date | null | undefined | TDate;

export const defaultMinDate = new Date('1900-01-01') as unknown;

export const defaultMaxDate = new Date('2099-12-31') as unknown;
