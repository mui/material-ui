import { OverridableStringUnion } from '@mui/types';

export type OverridableImplicitRecord<DefaultRecord extends { [k: string]: any }, Overrides> = {
  [k in OverridableStringUnion<Exclude<keyof DefaultRecord, symbol>, Overrides>]: DefaultRecord[k];
};

export type OverridableRecord<DefaultRecord extends { [k: string]: any }, Overrides, Value> = {
  [k in OverridableStringUnion<Exclude<keyof DefaultRecord, symbol>, Overrides>]: Value;
};

export type MergeDefault<T, U> = { [k in keyof T]: k extends keyof U ? U[k] & T[k] : T[k] } & {
  [k in Exclude<keyof U, keyof T>]: undefined | null;
};
