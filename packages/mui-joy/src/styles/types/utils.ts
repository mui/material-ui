type FilterConditionally<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

// Cannot use `OverridableStringUnion` from @mui/system because it excludes number
// which cause module augmentation test to fail.
type OverridableStringUnion<T extends string | number | symbol, U = {}> =
  | FilterConditionally<U, true>
  | Exclude<T, FilterConditionally<U, false>>;

export type OverridableImplicitRecord<DefaultRecord extends Record<string, any>, Overrides = {}> = {
  [k in OverridableStringUnion<keyof DefaultRecord, Overrides>]: k extends keyof DefaultRecord
    ? DefaultRecord[k]
    : any;
};

export type OverridableRecord<
  DefaultRecord extends Record<string, any>,
  Overrides = {},
  Value = any,
> = {
  [k in OverridableStringUnion<keyof DefaultRecord, Overrides>]: Value;
};

export type MergeDefault<T, U> = { [k in keyof T]: k extends keyof U ? U[k] & T[k] : T[k] } & {
  [k in Exclude<keyof U, keyof T>]: undefined | null;
};
