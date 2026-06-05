# Density (CSS-var adapter)

How Material UI component dimensions (padding / gap / height) are exposed as
hand-authorable CSS variables so a designer can tune component density — per
component, per size, or holistically — without touching component source, doing
`calc` arithmetic, or riding the single `--mui-spacing` dial.

This is the **adapter** sibling of the earlier `--mui-spacing`-derived
experiment (`feat/components-theme-spacing`): instead of one global dial, each
dimension is an overridable token whose default is a literal px.

## Language

**Component spacing token** (public, base):
A per-component, per-CSS-property variable a designer may set, shape
`--Component-<cssProperty>` — PascalCase component, camelCase **logical** CSS
property, unprefixed (for example `--Button-paddingInline`, `--Chip-gap`). Matches the
existing component-var convention (`--AppBar-background`). Setting it reflows
that property across every variant and size of the component.
_Avoid_: kebab property (`--Button-padding-inline`), `--mui-`-prefixed component vars, "variable".

**Sized token** (public, size-specific):
A size-scoped override, shape `--Component-<size>-<cssProperty>`
(for example `--Button-small-paddingInline`). Reflows only that one size. **More
specific than the base token** — when both are set, the sized token wins.
_Avoid_: "size variant token".

**Internal resolution var**:
A private variable, shape `--_<cssProperty>` (leading underscore, **no component
prefix**), **set via inline style** from the rendered `(variant, size)` and
consumed once in the styled root of the same element. It carries the full
fallback chain (sized token → base token → literal). No prefix is needed because
the reader is co-located with the inline setter, so an ancestor's value never
bleeds into a descendant. Lowest priority, so any public token or plain
`styleOverrides` property still wins.
_Avoid_: exposing it as API, prefixing with the component name, "private token".

**Token fallback**:
The literal px at the end of the chain — today's exact value for that
`(variant, size)` cell. Makes the default render pixel-identical and bundle-light,
at the cost that the single `--mui-spacing` dial no longer reflows the component.
_Avoid_: "default value", "initial".

**Density scale** (tier-1):
A named, ordered set of density steps (`xxs / xs / sm / md / lg …`), values
derived from `theme.spacing`, surfaced as `--mui-density-*` CSS vars. The shared,
designer-facing holistic-density surface. **Emitted by `enhanceDensity`, not
`createTheme`** (runtime opt-in); its **types ship built-in**
(`theme.vars.density.*` always type-checks).
_Avoid_: "spacing scale" (that is `theme.spacing`), "grid".

**enhanceDensity**:
A single post-`createTheme` function (mirroring `enhanceHighContrast`) that does
**both**: (a) emits the **density scale** as `--mui-density-*` and populates
`theme.vars.density`, and (b) injects per-component `styleOverrides.root` mapping
**component spacing tokens** to density steps
(`--Button-paddingInline: theme.vars.density.md`). `createTheme` is untouched.
Opt-in: without it, components render their literal-px defaults; with it, tuning
the density scale (or scoping `--mui-density-*`) reflows every wired component.
_Avoid_: "density preset" (that is the resulting effect, not the function).

## Relationships

- The styled root reads **one** internal resolution var per property; **no JavaScript
  conditional** lives in the styles implementation. The `(variant, size)` → px
  matrix is a **lookup table** in the component body, applied via inline style.
- Override priority (high → low): plain `styleOverrides` property → **sized
  token** → **base token** → internal resolution var (literal fallback).
- Custom (user-defined) sizes work for free: the sized-token name is built from
  the runtime size string; no static per-size CSS is emitted.
- **enhanceDensity** (opt-in) connects tier-2 component tokens to the tier-1
  **density scale**; un-enhanced, the literal fallbacks reproduce today's pixels.
- This experiment does **not** ride `--mui-spacing`; holistic density comes from
  the density scale, not that dial.

## Example dialogue

> **Dev:** "If I set `--Button-paddingInline` on the theme, what happens to a
> small outlined button?"
> **Domain expert:** "It reflows to your value — base token covers every
> variant and size. Unless you also set `--Button-small-paddingInline`; the
> **sized token** is more specific and wins for small."
> **Dev:** "And with nothing set?"
> **Domain expert:** "The **internal resolution var**, set inline from the
> `(variant, size)` cell, falls through to the literal px — pixel-identical to
> today. The `--mui-spacing` dial does nothing here; for holistic density you
> run **enhanceDensity** and tune the **density scale**."

## Flagged ambiguities

- "spacing token" meant both a `theme.spacing` key and a per-component value —
  resolved: `theme.spacing` is untouched; per-component vars are **component
  spacing tokens** (base) and **sized tokens**.
- "spacing scale" (earlier draft, tier-1) — renamed **density scale** and moved
  to `theme.density`, to disambiguate from `theme.spacing`.
