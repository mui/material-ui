# Public CSS Variables & Density POC

POC exploring whether Material UI components should expose hand-authorable CSS variables for spacing/color/typography, so theming is easier and "density" can be experimented with. Branch: `poc/css-vars-map`.

## Language

**Public CSS variable** (always **agnostic**):
A component-scoped CSS custom property (e.g. `--Button-padding-block`, `--Button-bg`) that consumers may set directly in their own stylesheets. **Hard rule:** exactly one variable per styleable property, encoding **no variant/size/color/state** in the name (state is itself design language). It is **neutral to any design language** — it lifts the property up a layer so the component can be _re-expressed in a different design language_, i.e. reset to a neutral baseline. It defaults to the Material spec (via private per-variant/size fallbacks); overriding it **opts that property out of the spec** and hands the consumer full control. No `--mui-` prefix. See `docs/adr/0002-agnostic-public-css-vars.md`.
_Avoid_: variant/size/color-specific public names (`--Button-contained-bg`); "internal var"/"computed var" (those are private, like `--variant-*` or Badge's `--Badge-translate`).

**Agnostic axes** (geometry / density / elevation / color / typography):
The five categories every agnostic variable belongs to — the systematic structure for _determining_ a component's vars and the completeness check. Walk the axes; for each, expose one var per property the component actually paints/sizes.

- **geometry**: width, height, radius, border-width
- **density**: margin, padding, gap
- **elevation**: shadow, transform
- **color**: color, bg, border-color, ring
- **typography**: font-size, line-height, font-weight, text-transform, letter-spacing

A proposed var that fits no axis is a smell — it is probably **anatomy/behavior** (label float, the outline notch, ripple, DOM shape), which is handled by props/variants/slots, not the agnostic surface. Agnostic vars = the design language's _look_; props/variants/slots = its _anatomy_.

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
- **TextField color/border/radius knobs (outlined):** `--TextField-color` (text), `--TextField-border-color`, `--TextField-border-width`, `--TextField-radius`, mapped to variant-level `--OutlinedInput-*` (inward rule), consumed by the NotchedOutline slot / root. `--TextField-bg` intentionally absent (InputBase defines no background — only expose vars for properties the component actually styles). Border-width focus uses `var(--OutlinedInput-border-width, 2px)`: default keeps 1px→2px on focus; when customized, focus = resting width (not thinner). Border-color routes through `var(--OutlinedInput-border-color, <spec value>)` in every state — hover, focus, error, and disabled — so a custom border color persists across all of them.
- **TextField** owns no padding. Its single knob is **`--TextField-height`** (not padding), mapped to the variant-level `--OutlinedInput-height` (not directly to `--InputBase-height`, which would shadow a page-level base knob). The **Input slot** (InputBaseInput / OutlinedInputInput) is the real consumer. Resolution order: variant knob (`--OutlinedInput-*`) → base knob (`--InputBase-*`) → literal/derived default.
- **Input vertical size is height-driven, not padding-driven.** `--InputBase-height` defaults to `theme.spacing(7)` (medium) / `spacing(5)` (small) — clean spacing multiples — so inputs ride `--mui-spacing` density via height. `padding-block` is _derived_: `(height − line-height·font-size)/2`, with `--InputBase-padding-block` as an escape hatch. `padding-inline` is spacing-derived independently. Floor: when `height < line-height·font-size`, derived padding goes negative (font-size scaling, deferred, or a clamp would fix).

## Decisions

- **Public = reading (A):** hand-authorable fixed API, not an internal theme-only mechanism. No `--mui-` prefix on component vars.
- **POC runs under `cssVariables: true`.** Density mechanic is **A1** + `--mui-spacing` global override; no new `--spacing-*` token scale yet.
- **Density is holistic (A):** overriding `--mui-spacing` reflows the whole UI (layout + component internals), not just controls.
- **POC dimensions:** padding (block/inline) + line-height (inputs only — load-bearing in the height formula; no Button line-height var) + font-size (`--Button-font-size`; inputs via `--InputBase-font-size` with variant chain `--OutlinedInput-font-size` and TextField mapping `--TextField-font-size`). Font-weight and color deferred.
- **Font-size & the input height formula compose for free:** the derived padding uses `1em` for the line box, and `1em` = the input's own font-size. So changing `--*-font-size` re-centers the text inside the fixed `--*-height` automatically — no extra line-height var needed for the font-size axis.
- **Color vars are agnostic, two-tier.** Public `--Button-bg` / `--Button-color` / `--Button-border-color` / `--Button-border-width` / `--Button-radius` / `--Button-shadow` (resting elevation, contained) / `--Button-ring` (opt-in focus-visible `outline`, default `0`) are _variant-agnostic_ and layer **over** the existing private `--variant-*` palette source: `var(--Button-bg, var(--variant-containedBg))`. Default falls through to `--variant-*` (palette via `color` prop) → unbroken. The agnostic var **flattens** across variants (setting `--Button-bg` tints text/outlined too) — intended: overriding = opting out of the spec. The private `--variant-*` are **not** public API (spec-default source only, may change); they are never promoted. Names are explicit (`-border-color`, `-border-width`) so width and color don't collide. `--Button-border-width` also feeds the outlined padding compensation (`calc(padding − var(--Button-border-width, 1px))`), so changing border width keeps the button size constant.
- **Agnostic var honored in every state (not "resting-only").** Every assignment of a var-backed property — including interactive-state rules — must route through the var: `var(--X, <that state's spec value>)`. A direct literal in a state rule is a bug (e.g. Button `boxShadow: shadows[4]` on hover clobbered `--Button-shadow`; OutlinedInput hover/focus `borderColor` clobbered `--OutlinedInput-border-color` — both fixed). Color already behaved correctly because hover reassigns the inner `--variant-*` while the outer `--Button-bg` wins. Applies to **every** assignment with **no exceptions** — resting, interactive states (hover/active/focus), and affordance states (`disabled`, `error`, `disableElevation`) all route through the var. So a set `--Button-bg`/`--OutlinedInput-border-color` wins everywhere, including disabled/error. Customizing a property forgoes the spec's state styling for it (disabled greying, error red, hover delta); remap `--mui-palette-*` to keep the spec's states instead.
- **Agnostic vars sort into five axes** — geometry / density / elevation / color / typography (see _Agnostic axes_ above). This is the systematic method for determining a component's vars and the completeness check: a var fitting no axis is anatomy/behavior, which belongs to props/variants/slots (e.g. floating-label opt-out), not the agnostic surface. See `docs/adr/0002-agnostic-public-css-vars.md`.
- **POC build scope:** Button (direct-padding density) + OutlinedInput with TextField→OutlinedInput→InputBase mapping (layered height-derived density). FilledInput / standard Input / Select deferred.
- **Density demo:** one `docs/pages/experiments/` page showing both diagram branches — "Different Apps" (`--mui-spacing` overridden via a class scope) and "Different Viewports" (`--mui-spacing` overridden in a `@media` query) — with the same Buttons/TextFields reflowing live.

## Example dialogue

> **Dev:** "If I set `--TextField-padding-block` on a wrapper, does it reach the `<input>`?"
> **Maintainer:** "Yes — TextField maps it to `--OutlinedInput-padding-block`, which the Input slot consumes. But for vertical size you usually don't touch padding at all; you set **`--InputBase-height`** and padding is derived to keep the text centered."
> **Dev:** "And global density?"
> **Maintainer:** "Override **`--mui-spacing`** at a scope. Button padding scales directly; input height scales (it defaults to `spacing(7)`) and its padding recomputes. One dial, whole UI."
