# Color/state tuning via a 3-layer CSS-var adapter, standardized across states

Component color (background / foreground / border) is exposed as public CSS
variables — **per variant, per palette color, per interaction state** — layered
**over the pre-existing `--variant-*` seam** and resolved through a private
per-state default, so a designer can tune any state's color without editing
component source. This is the **color axis** sibling of the dimension/density
adapter (ADR-0001); the two share the three-layer reading.

## Context

We want designers to recolor a component per `(variant, color, state)` — e.g.
"make the hover background of contained error buttons hot pink", "tint disabled
buttons per color" — without editing source, and with **today's exact colors
when nothing is set** (Argos zero-diff).

Two facts shape the design:

- **There is already a color seam.** Button has carried `--variant-containedBg`,
  `--variant-outlinedColor`, `--variant-outlinedBorder`, `--variant-textBg`, …
  since the CSS-extraction conversion (#41378). The per-color `variants` block
  sets these, the variant block consumes them, and `&:hover` **reassigns the
  value**. It is undocumented and unprefixed. We **adopt it as the seam**, not
  replace it (a wholesale rewrite would be a large, pointless diff).
- **The seam is variant-qualified, not agnostic.** Unlike the dimension seam
  (`--Button-pad` carries no variant meaning), "background" means a solid for
  `contained` and transparent for `text`, so the variant lives in the seam name.
  The public token inherits that — variant leads the token, aligning with the
  seam.

Constraints inherited from ADR-0001: color-identical default, no JS conditional
in the styles body (states/colors are `variants`/pseudo-class cells), existing
`styleOverrides`/`sx` keep working.

## Decision

### The token shape

```text
--Component-<variant>-<color>-<state>-<prop>     public color token (designer knob)
--variant-<variant><Prop>                        seam (pre-existing consumption point)
--_<variant><Prop>                               private default (advanced per state)
```

- `<prop> ∈ {bg, fg, border}` — `fg` = foreground/text color (not `color`, which
  would collide with the palette `<color>` segment); `border` = border **color**
  on this axis (bare name kept for now — see _Accepted trade-offs_).
- `<state> ∈ {hover, focus, active, disabled, selected}`; the **rest** state omits
  the `<state>` segment. `focus` maps to the `.Mui-focusVisible` selector
  (keyboard focus), not `:focus`.
- `<color>` is built from the per-color loop variable, so **custom palette colors
  get tokens for free** (parallel to custom-size routing in ADR-0001).

Resolution is **per `(variant, color, state, prop)`** — the most specific
meaningful granularity, no coarse color-agnostic layer (a single
`--Button-contained-hover-bg` would force every color to one value). This mirrors
the dimension axis dropping the all-sizes base token.

### Three layers — value-states vs inert-states

`--_<vp>` holds the prop's **current resolved value** — the value the element
shows now, *including any rest/hover/disabled token override*. The crux is **where
a state's token lives**:

- **Value-state** (the state genuinely sets the prop today — rest, hover for bg,
  disabled): its token goes **inside** `--_<vp>`, with the palette literal as the
  fallback; the seam just reads `var(--_<vp>)`. The override is now in the default,
  so every later state inherits it.
- **Inert state** (the state changes nothing today — focus, active on Button):
  its token routes in the **seam over** `var(--_<vp>)`. Settable, but unset it
  tracks the default.

```js
// per-color variants block (one per palette color)
{
  props: { color: 'error' /* loop var */ },
  style: {
    // rest (value-state): token INSIDE the default, seam reads it
    '--_containedBg': 'var(--Button-contained-error-bg, var(--mui-palette-error-main))',
    '--variant-containedBg': 'var(--_containedBg)',

    '@media (hover: hover)': {
      '&:hover': {
        // hover (value-state for bg): advance the default with the hover token inside
        '--_containedBg': 'var(--Button-contained-error-hover-bg, var(--mui-palette-error-dark))',
        '--variant-containedBg': 'var(--_containedBg)',
      },
    },

    // active (inert — Button moves only box-shadow): route the token over the default.
    // Unset → tracks --_containedBg, which already carries any rest/hover override
    // (so a re-coloured button stays re-coloured on press; press-while-hover = dark).
    '&:active': {
      '--variant-containedBg': 'var(--Button-contained-error-active-bg, var(--_containedBg))',
    },

    // disabled (value-state): advance with the disabled token, neutral grey fallback
    [`&.${buttonClasses.disabled}`]: {
      '--_containedBg':
        'var(--Button-contained-error-disabled-bg, var(--mui-palette-action-disabledBackground))',
      '--variant-containedBg': 'var(--_containedBg)',
    },
  },
}
```

> **Correction (post-implementation).** This ADR's first draft put *every* state's
> token in the seam *over* a `--_<vp>` that held the bare palette literal. That
> breaks override propagation: setting only the **rest** token left focus/active
> falling back to the palette literal, so a re-coloured button **snapped to the
> palette colour on focus** (a re-greyed secondary flashed default purple). The
> structure above — value-state token *inside* the default — is the fix.

### Standardize the full state set, even where inert

Every component exposes the **same** non-rest states
(`hover/focus/active/disabled/selected`) for each variant×color×prop, **even
where the component changes nothing in that state today** (the routing is then
inert). A designer can rely on `--Button-<v>-<c>-disabled-bg` existing without
reading source. This is the opposite stance from the dimension axis, where a
token exists only where the axis is genuinely density-bearing — colour states are
a small, fixed, universal vocabulary, so a *predictable* surface beats a *minimal*
one.

### Why three vars, not two

The simpler design — seam + public token, with the **palette var as the inline
fallback** (`--variant-containedBg: var(--token, var(--mui-palette-error-main))`)
— works only if we tokenize *just the states the component already styles*. The
moment we standardize an **inert** state, two layers break it:

- An inert `&:active` block must set `--variant-containedBg` (so its token is
  live), and an **unset** token must reproduce today's active color — which is the
  **hover** color when pressing-while-hovering. A two-layer fallback can only point
  at the *rest* palette var, so an unset active token would clobber hover on every
  click. A `var(--token, var(--variant-containedBg))` self-reference is
  guaranteed-invalid CSS.
- The **private default** `--_<variant><Prop>` captures "the value this element
  currently shows": value-states write their token *into* it, inert states read it
  as their fallback — so inert states track the live value (including overrides)
  instead of overwriting it. (An inert state can't write the default itself: a
  `--_<vp>: var(--token, var(--_<vp>))` self-reference is guaranteed-invalid CSS.)

So the three-layer shape is **forced by standardization**, restoring symmetry with
the dimension axis (which is also three-layer).

### No `enhanceColor` — the palette is the holistic surface

The dimension axis needed `enhanceDensity` because it invented a new tier-1 scale
(`--mui-density-*`). Color already **has** its holistic dial: the **palette**.
Tuning `palette.error.dark` reflows every contained-error hover for free (the
tokens fall back to it). The color tokens exist for **per-component-state
deviations** from the palette, not a parallel global scale. So there is no
`enhanceColor` function and no color "scale" node — `createTheme`'s palette is
tier-1, the color tokens are tier-2.

## Alternatives considered

- **Two-layer (seam + token, palette fallback).** Smaller, no private var.
  Rejected: cannot keep inert standardized states zero-diff (the hover/active
  clobber above).
- **Tokenize only where color varies today.** Smallest bundle. Rejected: the
  surface becomes unpredictable — a designer must read each component's source to
  learn which state knobs exist.
- **Adopt `--variant-*` as the public API, or replace it.** Rejected: it's
  unprefixed and variant-qualified in a way we don't want as a contract; layering
  a documented public token over it costs less and keeps the seam an internal
  detail.
- **A coarse color-agnostic token** (`--Button-contained-hover-bg`). Rejected:
  forces all palette colors to one value, destroying per-color semantics.

## Consequences

- **Color-identical default & non-breaking.** Unset tokens fall back through the
  private default to today's palette var; `styleOverrides`/`sx` still win.
- **Per-state color is independently tunable**, including states the component
  doesn't style today, via a predictable, uniform token surface.
- **Custom palette colors are tunable for free** (token name built from the loop
  variable).
- **Bundle grows** with inert routing per component — the price of the standard.
- The **private default looks redundant** next to the palette var until you hit
  the hover/active interplay; it is mechanical and documented here.

### Accepted trade-offs

| Trade-off | Why we can live with it |
| :-- | :-- |
| Inert state routing emitted on every component | Buys a predictable surface (knob exists without reading source); colour states are a small fixed set. |
| Three vars per `(variant, prop)` instead of two | Forced by standardizing inert states (see _Why three vars_); restores symmetry with the dimension axis. |
| `border` under-specifies (width? style? color?) | On this axis it is always **color**; `bc` reads as background-color and `borderColor` is verbose. **Revisit if a border-width (dimension) token ever appears.** |
| `--variant-*` seam stays unprefixed/undocumented as plumbing | It's the consumption point, not the contract; the public token is the documented knob. |
| Disabled becomes per-color-tunable though Button uses a flat grey today | Default is the same `palette.action.*` literal for every colour (zero-diff); the per-color knob is upside, not cost. |
