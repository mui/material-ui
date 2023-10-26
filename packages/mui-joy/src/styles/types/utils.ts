/**
 * Get keys of T that contains U
 */
type FilterConditionally<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

// Cannot use `OverridableStringUnion` from @mui/system because it excludes number
// which cause module augmentation test to fail.
type OverridableStringUnion<T extends string | number | symbol, U = {}> =
  | FilterConditionally<U, true>
  | Exclude<T, FilterConditionally<U, false>>;

/**
 * The new type will be overridable by the provided `Overrides`.
 * User can only remove the existing keys but not allow to add more keys because the structure has different values.
 * @template DefaultRecord, Overrides, Value
 * @param {DefaultRecord} defaultInterface - The default structure
 * @param {Overrides} overrideInterface - The interface that users will interact with to extend or remove keys
 */
export type OverridableImplicitRecord<DefaultRecord extends Record<string, any>, Overrides = {}> = {
  [k in OverridableStringUnion<keyof DefaultRecord, Overrides>]: k extends keyof DefaultRecord
    ? DefaultRecord[k]
    : any;
};

/**
 * The new type will be overridable by the provided `Overrides`
 * @template DefaultRecord, Overrides, Value
 * @param {DefaultRecord} defaultInterface - The default structure
 * @param {Overrides} overrideInterface - The interface that users will interact with to extend or remove keys
 * @param {Value} value - The value of the extended keys
 */
export type OverridableRecord<
  DefaultRecord extends Record<string, any>,
  Overrides = {},
  Value = any,
> = {
  [k in OverridableStringUnion<keyof DefaultRecord, Overrides>]: Value;
};

/**
 * For create theme.* options for `extendTheme()`.
 *
 * Since user can remove the default keys from the interface, we need to merge the default type for the options,
 * so that user can provide `undefined` to remove the value from the theme.
 *
 * ex:
 *
 * ```ts
 * declare module "@mui/joy/styles" {
 *   interface PalettePrimaryOverrides {
 *     50: false;
 *   }
 * }
 *
 * extendTheme({
 *   colorSchemes: {
 *     palette: {
 *       primary: {
 *         50: undefined, // ✅ typed-safe
 *       }
 *     }
 *   }
 * })
 * ```
 *
 * @template T, U
 * @param {T} userDefinedType - The interface that user will extend or remove some default keys
 * @param {U} defaultType - The default structure defined by Joy UI
 */
export type MergeDefault<T, U> = { [k in keyof T]: k extends keyof U ? U[k] & T[k] : T[k] } & {
  [k in Exclude<keyof U, keyof T>]: undefined | null;
};
