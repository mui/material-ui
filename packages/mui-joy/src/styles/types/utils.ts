import { OverridableStringUnion } from '@mui/types';

export type OverridableRecord<DefaultRecord extends { [k: string]: any }, Overrides = {}> = {
  [k in OverridableStringUnion<
    Exclude<keyof DefaultRecord, symbol>,
    Overrides
  >]: k extends keyof DefaultRecord ? DefaultRecord[k] : never;
};

export type MergeDefault<T, U> = { [k in keyof T]: k extends keyof U ? U[k] & T[k] : T[k] };
