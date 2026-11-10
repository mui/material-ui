/**
 * Omits null/undefined event handlers so unset consumer props cannot replace Base UI's
 * internal handlers during prop merging. Other props retain their values.
 *
 * Apply after resolving consumer precedence: an unset handler may clear an earlier
 * consumer handler, but must still preserve Base UI's behavior.
 * The optional filter receives each [key, value] entry and returns true to keep it,
 * matching Array.prototype.filter. Nullish event handlers are always omitted.
 */
export default function omitNullishEventHandlers<Props extends object>(
  props: Props,
  filterEntry?: (entry: [key: string, value: unknown]) => boolean,
) {
  return Object.fromEntries(
    Object.entries(props).filter((entry) => {
      const [key, value] = entry;
      return !(/^on[A-Z]/.test(key) && value == null) && (filterEntry?.(entry) ?? true);
    }),
  ) as Props;
}
