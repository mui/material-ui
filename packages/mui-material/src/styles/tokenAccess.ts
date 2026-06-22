/**
 * Density token name resolution (ADR-0003). The prefix tracks the css-var
 * feature: a theme created with `cssVariables` carries `cssVarPrefix` (default
 * `mui`), so tokens resolve to `--mui-Button-pad`; a plain `createTheme()` has
 * no prefix, so they resolve to `--Button-pad`. The component internals and the
 * consumer both call the same resolver on the same theme, so the emitted name
 * and the targeted name can never drift.
 */

interface PrefixedTheme {
  cssVarPrefix?: string | undefined;
}

/** Bare (unwrapped) css-var name for a single ad-hoc field, prefix-guarded. */
export const varName = (theme: PrefixedTheme | undefined, field: string): string =>
  `--${theme?.cssVarPrefix ? `${theme.cssVarPrefix}-` : ''}${field}`;

/**
 * Build a cached, theme-bound resolver from a component's key map. The resolved
 * map depends only on `cssVarPrefix` (domain ≈ `{ '', 'mui' }`), so it's
 * memoized per prefix: first call builds + freezes, every later call is an O(1)
 * lookup returning the shared object — no per-call allocation, multi-field free.
 */
export function makeComponentVars<T extends Record<string, string>>(keyMap: T) {
  const cache = new Map<string, Readonly<Record<keyof T, string>>>();
  return (theme?: PrefixedTheme): Readonly<Record<keyof T, string>> => {
    const prefix = theme?.cssVarPrefix ?? '';
    let vars = cache.get(prefix);
    if (vars === undefined) {
      const resolved = {} as Record<keyof T, string>;
      for (const key in keyMap) {
        if (Object.prototype.hasOwnProperty.call(keyMap, key)) {
          resolved[key] = `--${prefix ? `${prefix}-` : ''}${keyMap[key]}`;
        }
      }
      vars = Object.freeze(resolved);
      cache.set(prefix, vars);
    }
    return vars;
  };
}
