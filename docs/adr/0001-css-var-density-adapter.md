# Component density via a CSS-var adapter, resolved inline

Component dimensions are exposed as public CSS variables with **literal-px
fallbacks**, resolved through an **internal var set by inline style**, instead of
riding the single `--mui-spacing` dial (`feat/components-theme-spacing`) or
emitting a static per-(variant, size) token matrix (`poc/css-vars-map`).

## Context

We want designers to tune density — per component, per size, or holistically —
without editing component source, writing `calc`, or accepting that every
dimension reflows off one global `--mui-spacing` value.

Constraints that shaped the design:

- **Pixel-identical default.** The un-configured theme must render today's exact
  px for every `(variant, size)` cell (Argos zero-diff).
- **No token bloat at build time.** Don't emit a static CSS rule (or named
  token) per variant×size×property cell.
- **Support user-provided sizes.** A custom `size` added via the theme must get
  the same tunability as built-in sizes.
- **No JavaScript conditionals in the styles implementation.** The `styled()` body must
  not branch on `ownerState.size`/`variant` to pick a value.
- **Non-breaking.** Existing variant/size padding and existing
  `styleOverrides`/`sx` overrides must keep working unchanged.

## Decision

Three token layers per component property, for example inline padding on Button:

- **Base token** `--Button-paddingInline` (public) — reflows all variants/sizes.
- **Sized token** `--Button-<size>-paddingInline` (public) — reflows one size;
  **more specific than base** (size wins).
- **Internal resolution var** `--_Button-paddingInline` (private, leading
  underscore) — set via **inline style** from the rendered `(variant, size)`,
  carrying the chain `var(--Button-<size>-paddingInline, var(--Button-paddingInline, <literal>))`.

The styled root has **one** consumption point per property and **no conditional**:

```js
const ButtonRoot = styled(ButtonBase)({
  paddingInline: 'var(--_Button-paddingInline)',
  paddingBlock: 'var(--_Button-paddingBlock)',
});
```

The component body holds the `(variant, size)` → px values as a **lookup table**
(today's exact numbers) and applies them via inline style:

```js
const [block, inline] = PADDING[variant][size];
const sizingVars = {
  '--_Button-paddingBlock': `var(--Button-${size}-paddingBlock, var(--Button-paddingBlock, ${block}))`,
  '--_Button-paddingInline': `var(--Button-${size}-paddingInline, var(--Button-paddingInline, ${inline}))`,
};
<ButtonRoot style={{ ...sizingVars, ...style }} />;
```

Holistic density is a separate, opt-in layer driven by a **single**
`enhanceDensity(theme)` function (mirroring `enhanceHighContrast`) that does
both jobs: it **emits** the density scale as `--mui-density-*` (and populates
`theme.vars.density`), and **maps** base tokens to density steps via injected
`styleOverrides.root` (`--Button-paddingInline: var(--mui-density-md)`).
`createTheme` is left untouched. Types for `theme.vars.density` ship built-in;
the vars exist at runtime only after `enhanceDensity` runs.

We considered making `density` a first-class `createTheme` node so the normal
css-var generator emits the vars. That is more "correct" (the vars participate
in the standard generation and can be re-scoped at any level), but it requires
`createTheme`/css-vars surgery. For an experiment we chose the self-contained
function: easy to A/B, easy to delete, no core change. The cost is that
post-hoc-emitted vars live outside the standard `theme.vars` pipeline.

Scope: **Button only** for this experiment.

## Consequences

- **Pixel-identical default & non-breaking.** Literals come from the lookup
  table; the internal var is the lowest-priority fallback, so public tokens,
  `styleOverrides`, and `sx` all still win via the cascade.
- **Custom sizes work for free** — the sized-token name is built from the
  runtime size string; nothing static is emitted per size.
- **Inline style is the price.** Every instance carries a `style` attr with the
  resolution vars (larger HTML, no CSS dedup of those values) — accepted to kill
  the static token matrix and support arbitrary sizes.
- **No `--mui-spacing` reflow.** Components opt out of the global dial; holistic
  density flows through the density scale + `enhanceDensity` instead.
- **calc resolves only in a real browser** (jsdom does not), so density
  assertions belong in browser/visual tests, not jsdom unit tests.
