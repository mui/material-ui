# Public CSS Variables & Density POC

POC exploring whether Material UI components should expose hand-authorable CSS variables for spacing/color/typography, so theming is easier and "density" can be experimented with. Branch: `poc/css-vars-map`.

## Language

**Public CSS variable**:
A component-scoped CSS custom property (e.g. `--Button-padding-block`) that consumers may set directly in their own stylesheets. It is a fixed, supported part of the component's API — component style implementations are written to consume it. No `--mui-` prefix.
_Avoid_: "internal var", "computed var" (those are private, like Badge's `--Badge-translate`).

**Spacing token** _(conceptual — not built in this POC)_:
A named step in a future spacing scale (`xxs, xs, sm, md, lg, xl, xxl`). Raised in the original sketch as the long-term target, but **the POC does not implement it**. Today MUI has only `theme.spacing()` (an 8px-base multiplier) which, under `cssVariables: true`, emits a single **`--mui-spacing`** dial. The POC relies on that single dial; a named token scale is left for later and would slot in underneath without changing component code.
_Avoid_: treating `xxs…xxl` as something the POC ships; confusing with Grid breakpoint keys (`xxs/xs/sm…`), which are unrelated.

**Density**:
A set of key-values (spacing/font-size/line-height/weight) applied as a group, varying across different viewports and different apps. In the POC, the coarse density lever is overriding `--mui-spacing` at a scope.

**`--mui-spacing`**:
The single base spacing-unit runtime variable emitted when `createTheme({ cssVariables: true })` is used (default `8px`). `theme.spacing(n)` compiles to `calc(var(--mui-spacing) * n)`, so overriding it at any scope reflows all spacing-derived values. This is the existing runtime dial the POC reuses instead of a new `--spacing-*` scale.

**Inward dependency rule**:
A component's CSS-var fallback chain may reference only its own var and the vars of components it renders/extends (inward), never the vars of its consumers (outward). InputBase must not mention OutlinedInput or TextField; OutlinedInput (extends InputBase) may reference `--InputBase-*`; TextField (renders OutlinedInput) maps `--OutlinedInput-*: var(--TextField-*)`. Details, worked example, and rejected alternatives: `docs/design/public-css-var-layering.md`.

## Relationships

- A **Public CSS variable** (component padding) defaults to `theme.spacing(n)`, i.e. `calc(var(--mui-spacing) * n)`.
- Coarse **Density** = override **`--mui-spacing`** at a scope (reflows everything). Fine density = override individual **Public CSS variables** per component.
- **TextField** owns no padding. Its single knob is **`--TextField-height`** (not padding), mapped to the variant-level `--OutlinedInput-height` (not directly to `--InputBase-height`, which would shadow a page-level base knob). The **Input slot** (InputBaseInput / OutlinedInputInput) is the real consumer. Resolution order: variant knob (`--OutlinedInput-*`) → base knob (`--InputBase-*`) → literal/derived default.
- **Input vertical size is height-driven, not padding-driven.** `--InputBase-height` defaults to `theme.spacing(7)` (medium) / `spacing(5)` (small) — clean spacing multiples — so inputs ride `--mui-spacing` density via height. `padding-block` is *derived*: `(height − line-height·font-size)/2`, with `--InputBase-padding-block` as an escape hatch. `padding-inline` is spacing-derived independently. Floor: when `height < line-height·font-size`, derived padding goes negative (font-size scaling, deferred, or a clamp would fix).

## Decisions

- **Public = reading (A):** hand-authorable fixed API, not an internal theme-only mechanism. No `--mui-` prefix on component vars.
- **POC runs under `cssVariables: true`.** Density mechanic is **A1** + `--mui-spacing` global override; no new `--spacing-*` token scale yet.
- **Density is holistic (A):** overriding `--mui-spacing` reflows the whole UI (layout + component internals), not just controls.
- **POC dimensions:** padding (block/inline) + line-height (inputs only — load-bearing in the height formula; no Button line-height var). Font-size and font-weight deferred. Color deferred.
- **POC build scope:** Button (direct-padding density) + OutlinedInput with TextField→OutlinedInput→InputBase mapping (layered height-derived density). FilledInput / standard Input / Select deferred.
- **Density demo:** one `docs/pages/experiments/` page showing both diagram branches — "Different Apps" (`--mui-spacing` overridden via a class scope) and "Different Viewports" (`--mui-spacing` overridden in a `@media` query) — with the same Buttons/TextFields reflowing live.

## Example dialogue

> **Dev:** "If I set `--TextField-padding-block` on a wrapper, does it reach the `<input>`?"
> **Maintainer:** "Yes — TextField maps it to `--OutlinedInput-padding-block`, which the Input slot consumes. But for vertical size you usually don't touch padding at all; you set **`--InputBase-height`** and padding is derived to keep the text centered."
> **Dev:** "And global density?"
> **Maintainer:** "Override **`--mui-spacing`** at a scope. Button padding scales directly; input height scales (it defaults to `spacing(7)`) and its padding recomputes. One dial, whole UI."
