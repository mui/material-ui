/**
 * Module-augmentable interface that lets consumers opt in to typed support for
 * `data-*` (and any other) attributes on MUI slot props. Empty by default —
 * by design, MUI slot prop types do not include arbitrary `data-*` keys; the
 * augmentation is the single switch consumers can flip to choose their level
 * of strictness.
 *
 * The loose index-signature form accepts any `data-*` key but offers no key
 * autocomplete; the strongly-typed form restricts to the keys you declare, but
 * in exchange gives IntelliSense and flags typos on those keys.
 *
 * @example
 * // Loose: accept any `data-*` key (mirrors the primitive elements); no autocomplete.
 * declare module '@mui/utils/types' {
 *   interface DataAttributesOverrides {
 *     [k: `data-${string}`]: string | number | boolean | undefined;
 *   }
 * }
 *
 * @example
 * // Strongly-typed: only the declared keys, with autocomplete and typo-checking.
 * declare module '@mui/utils/types' {
 *   interface DataAttributesOverrides {
 *     'data-testid'?: string;
 *   }
 * }
 */
export interface DataAttributesOverrides {}

/**
 * Surface contributed to slot prop types by the `DataAttributesOverrides`
 * augmentation. Empty by default; populated only when a consumer declares
 * `data-*` keys via module augmentation. This is what `WithDataAttributes`
 * intersects into the widened branch of every slot prop union exposed by
 * `@mui/utils/types`.
 */
export type DataAttributes = DataAttributesOverrides;

/**
 * Widens a slot-props type so that, when a consumer augments
 * `DataAttributesOverrides`, the augmented keys become assignable to the
 * widened branch. The default `DataAttributes` is empty, so this widening is
 * a no-op until a consumer opts in.
 *
 * Implemented as a union between the original type and the intersected widened
 * form — `T | (T & DataAttributes)` — so that pre-typed values remain
 * assignable to the original branch without having to declare a `data-*`
 * index signature themselves, while object literals can pick up the widened
 * branch and include the augmented keys.
 */
export type WithDataAttributes<T> = T | (T & DataAttributes);
