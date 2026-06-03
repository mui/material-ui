# Component dimensions are spacing-derived

Component dimension values (padding, label offsets) are expressed as
`calc(theme.spacing(N) ± <px>)` with an **integer** `N`, instead of hardcoded
pixels — so they ride the `--mui-spacing` runtime variable for density, while
rendering pixel-identically to the previous hardcoded values at the default
theme.

## Context

Material UI hardcodes component paddings as pixels (`padding: '6px 16px'`,
`'16.5px 14px'`, …). Under `createTheme({ cssVariables: true })`,
`theme.spacing(n)` compiles to `calc(n * var(--mui-spacing))`, so overriding
`--mui-spacing` at any scope reflows everything spacing-derived. But components
opt out of that dial wherever they use literal px — density stops at the
component edge.

We want components to follow `--mui-spacing` without:

- any visual change at the default theme (Argos must be a zero-diff), and
- introducing new public/agnostic CSS variables (that is a separate effort).

The spec paddings are not clean 8px multiples (`6`, `5`, `15`, `16.5`, …), so a
naive `theme.spacing(value/8)` yields ugly fractional multipliers
(`spacing(1.875)`) that are hard to read and debug.

## Decision

Express every **spacing** dimension as `calc(theme.spacing(N) ± offsetpx)`:

- **N = `round(px / 8)`** — the nearest whole unit. Integer multipliers stay
  legible (`spacing(2)` reads as "2 units") and debuggable.
- **offset** = the px needed to land on the exact original value, so the
  default theme (`--mui-spacing: 8px`) is pixel-identical. When the offset is
  `0`, drop the `calc` and use `theme.spacing(N)` directly.
- **Outlined** input/button block = the contained expression **− 1px**;
  the `−1` is the border compensation (`6 → 5`).
- **Vertical axis only where horizontal couples to fixed sibling geometry.**
  The outlined input's notch (NotchedOutline `<legend>`) sits at a fixed left
  inset; if the input's **inline** padding or the label's **transformX** scaled
  with density, the value text, the floating label, and the notch gap would
  desync — a visibly broken outline. So for OutlinedInput and the outlined
  InputLabel, only the **block / y-axis** is spacing-derived; inline padding,
  adornment paddings, and `transformX` stay literal. Components with **no** such
  coupling (Button) keep both axes spacing-derived.
- **The outlined InputLabel resting y-offset tracks the input's block padding**
  (so the label stays vertically aligned at any density). The _shrunk_ transform
  stays fully literal — when floated, the label sits on the border line, which
  padding does not move.

**Not** spacing, left untouched: the `1.4375em` line-box (font-size-coupled),
`border-radius`, `border-width`, `scale()` factors, the NotchedOutline `8px`
notch, and — per above — horizontal (inline/x) values on notch-coupled
components.

## Consequences

- Overriding `--mui-spacing` at a scope reflows Button padding and outlined
  input height/label together — density with one dial, no per-component knobs.
- Pixel-identical at the default theme; Argos is the acceptance gate
  (real browsers resolve `calc`; jsdom does not, so density assertions belong
  in browser/visual tests, not jsdom unit tests).
- Conversion is mechanical and component-by-component, so there is a temporary
  window where converted components (Button, OutlinedInput) follow the dial and
  unconverted ones (FilledInput, standard Input, Select, …) do not. The
  replication spec exists to close that window consistently — see
  [spacing-derived-dimensions-spec.md](./spacing-derived-dimensions-spec.md).
- No new public API: `--variant-*` and other private vars are untouched.
