# ADR 0003 — Density token variable prefix & access

> Status: **experiment** (branch `exp/density-var-prefix`, off `exp/css-var-density-adapter` / PR #48624)
> Feeds the RFC's open question 1 ("Variable prefix + var-access API"). Goal of the branch:
> find the *cleanest* way to make prefixing work, so the team can judge whether the added
> complexity is acceptable — i.e. measure the real floor, not an inflated cost.

## Decision

Component density tokens **carry the theme prefix, and the prefix tracks the css-var feature**:

- `createTheme({ cssVariables: true })` → `theme.cssVarPrefix` is `'mui'` (or custom) → tokens resolve to `--mui-Button-pad`.
- plain `createTheme()` → no `cssVarPrefix` → tokens resolve to bare `--Button-pad`.

The internal default `--_pad` is always **unprefixed** (private, co-located).

## How

One resolver, used by **both** the styled component and the consumer, so the emitted name
and the targeted name are produced by the same function on the same theme and cannot drift:

```ts
// styles/tokenAccess.ts
export function makeComponentVars(keyMap) {        // cached by cssVarPrefix
  const cache = new Map();
  return (theme) => {
    const prefix = theme?.cssVarPrefix ?? '';
    let vars = cache.get(prefix);
    if (!vars) { vars = Object.freeze(mapNames(keyMap, prefix)); cache.set(prefix, vars); }
    return vars;
  };
}
```

```ts
// Button/buttonVars.ts — the typed handle lives WITH the component
export const buttonVars = { pad: 'Button-pad', smallPad: 'Button-small-pad', /* … */ } as const;
export const getButtonVars = makeComponentVars(buttonVars);
```

- **Component internals** read `const v = getButtonVars(theme)` inside the styled fn (already
  `memoTheme`-cached) and consume `var(${v.pad}, var(--_pad))`. No `theme.vars` branch, no
  `|| 'mui'` fallback — works identically in both modes.
- **Consumers** call the same `getButtonVars(theme)` for the bare name and set it:
  `sx={{ [getButtonVars(theme).smallPad]: '2px 8px' }}`.

## Why these shapes (rejected alternatives)

- **`theme.vars.Button.smallPad` (rejected).** A core-assembled `theme.vars` node would force
  `createTheme` to import every component's var map — a dependency inversion (core → leaf
  components), kills tree-shaking, and a `Proxy` workaround fights Pigment's theme
  serialization. The component's `buttonVars` key map is the typed handle instead.
- **`theme.getCssVar` (rejected for tokens).** It returns the wrapped read form
  `var(--mui-…)`, which is invalid as a custom-property *key* — useless for the dominant
  action (setting a token). It's also absent on a plain `createTheme()` theme. `getButtonVars`
  returns the bare name, works in both modes, and covers set + (wrap-it-yourself) read.
- **Forcing `cssVarPrefix: 'mui'` on every theme (rejected).** Would give one stable name in
  all modes, but bolts a css-var concept onto non-css-var themes and needs a `createThemeNoVars`
  change. Since both sides share `getButtonVars`, names match without it.
- **Custom-size inline token routing (dropped).** It required a `useTheme()` call in render
  purely to name a token. Custom sizes now fall back to `--_pad`; only built-in sizes get
  per-size tokens (handled in `variants`, which already have `theme`). One hook removed from
  every Button render.

## Cost the team is being asked to accept

1. **Mode-dependent public name** — `--mui-Button-*` with `cssVariables`, `--Button-*` without.
   Fine within one app; the casualty is cross-mode preset portability (a preset authored as
   `--mui-*` does nothing pasted into a no-vars app), and docs must show the name per mode.
2. **Tokens are theme-resolved, not static strings** — a consumer must call `getButtonVars(theme)`
   rather than hand-type a constant. Mitigated: it's one cached call; bare names; typed keys.

Everything else that looked expensive in the first cut (a hook per render, a parallel naming
scheme, a `theme.vars` assembly, build-time questions) was removable. This is the floor.

## Performance

`getButtonVars` is memoized by `cssVarPrefix` (domain ≈ `{ '', 'mui' }`): first call builds +
freezes the map, every later call is an O(1) `Map.get` returning the shared object — no
per-call allocation, multi-field free. Component internals are additionally inside `memoTheme`.

## Branch staleness

Pre-existing density demos/harness (`density-tokens`, `density-showcase`, `density-fixture`,
`scripts/density-screenshots`) hand-author tokens as `--Button-*` / `--OutlinedInput-*`. Under
`cssVariables: true` the components now emit `--mui-*`, so those override scopes no longer drive
the three converted components on this branch. The **default** (no-token) render is unchanged
(a consistent rename, not a value change) → Argos zero-diff holds. Only the explicit-override
scopes need re-pointing if this direction is adopted.
