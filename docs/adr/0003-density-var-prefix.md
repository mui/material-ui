# ADR 0003 — Density token variable prefix & access

> Status: **experiment** (branch `exp/density-var-prefix`, off `exp/css-var-density-adapter` / PR #48624)
> Feeds the RFC's open question 1 ("Variable prefix + var-access API"). Goal of the branch:
> find the *cleanest* way to make prefixing work, so the team can judge whether the added
> complexity is acceptable — i.e. measure the real floor, not an inflated cost.

## Decision

The **public** density tokens (the Material UI layer's designer knobs) **carry the theme
prefix, and the prefix tracks the css-var feature**:

- `createTheme({ cssVariables: true })` → `theme.cssVarPrefix` is `'mui'` (or custom) → `--mui-Button-small-pad`.
- plain `createTheme()` → no `cssVarPrefix` → bare `--Button-small-pad`.

The **agnostic seam** and the **internal default** are a different layer — see below.

### The three layers map to three naming rules

The adapter reads each component as three layers of responsibility (ADR-0001). The prefix
decision applies **per layer**, not uniformly:

| Layer | Owner | Token | Prefixed? | In `buttonVars`? |
|---|---|---|---|---|
| **Agnostic** | the bare styled root, no design opinion | `--comp-<key>` | **no** — literal | **no** |
| **Material UI** | the public per-size designer knob | `--mui-Button-<size>-<key>` | yes (tracks feature) | **yes** |
| **Internal default** | today's `(variant,size)` literal, in `variants` | `--_<key>` | no — literal | no |

- The **agnostic seam** is the styled root's single consumption point. It must stay design-system-
  agnostic, so it's the generic, literal `--comp-<key>` (e.g. `--comp-pad`, `--comp-padBlock`) —
  **not** `--Button-pad`, which wrongly wore the component name and the theme prefix. It is **not**
  a public designer knob, so it does **not** belong in `buttonVars` (which is the Material UI layer).
- `buttonVars` therefore holds **only the public sized tokens** (`smallPad`, …) — the things a design
  system actually tunes.

```text
--comp-pad                agnostic seam        ← styled root's consumption point; literal, unprefixed
--mui-Button-<size>-pad   public sized token   ← designer knob; Material UI layer; tracks the prefix
--_pad                    internal default     ← Material literal (in `variants`); literal, unprefixed
```

Consumption is unchanged in shape — the seam falls back to the internal default:
`padding: var(--comp-pad, var(--_pad))`; each size variant routes the public token over the default
into the seam: `'--comp-pad': var(--mui-Button-small-pad, var(--_pad))`.

> **Generic seam + custom sizes.** A `--comp-<key>` seam is set on the root for every **built-in**
> size (default + each size variant), so it never reads an inherited value there — a same-named seam on
> an ancestor is shadowed. The only seam-unset path is a **custom** (theme-added) size, and those are
> deliberately **out of density scope** (no inline routing; they render the literal `--_pad`). So the
> theoretical "two components share a css key and a custom-size inner one inherits the outer's seam"
> case is a documented non-goal, not a live risk. (A design system that adds a dense custom size sets
> the literal seam itself.)

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
// Button/buttonVars.ts — the typed handle lives WITH the component (public knobs only)
export const buttonVars = { smallPad: 'Button-small-pad', /* mediumPad, largePad */ } as const;
export const getButtonVars = makeComponentVars(buttonVars);
```

- **Component internals** read `const buttonVars = getButtonVars(theme)` inside the styled fn
  (already `memoTheme`-cached), consume the literal seam `var(--comp-pad, var(--_pad))`, and route
  the resolved public token into it per size. No `theme.vars` branch, no `|| 'mui'` fallback.
- **Consumers** call the same `getButtonVars(theme)` for the bare public-token name and set it:
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
- **Custom-size inline token routing (dropped — custom sizes are out of density scope).** The
  unprefixed prototype routed custom sizes inline (`style={{ '--comp-pad': 'var(--Button-xl-pad)' }}`)
  for free, since the token name was a static string. Prefixing makes that inline name
  theme-dependent (a `useTheme()` in render). Rather than pay that for a rare path, custom sizes are
  excluded from density: they render `--_pad`; only built-in sizes get per-size tokens (in `variants`,
  which already have `theme`). This is itself a small, concrete **cost of prefixing** — in the
  unprefixed design custom-size routing is free.

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
