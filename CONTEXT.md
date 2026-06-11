# Token adapter (CSS-var)

How Material UI component styles are exposed as hand-authorable CSS variables so
a designer can tune them — per component, per size/variant/state, or
holistically — without touching component source or doing arithmetic. Two axes
share the same three-layer model:

- **Dimension** axis (padding / gap / height) — the **density** adapter.
- **Color** axis (background / foreground / border, per variant, color, and
  interaction state) — the **color/state** adapter.

The original density framing follows.

## Density (CSS-var adapter)

How Material UI component dimensions (padding / gap / height) are exposed as
hand-authorable CSS variables so a designer can tune component density — per
component, per size, or holistically — without touching component source, doing
`calc` arithmetic, or riding the single `--mui-spacing` dial.

This is the **adapter** sibling of the earlier `--mui-spacing`-derived
experiment (`feat/components-theme-spacing`): instead of one global dial, each
dimension is an overridable token whose default is a literal px.

## Layers

The component is read as **three layers of responsibility**, each owning a slice
of one cascade:

- **Agnostic** — the styled root, no design meaning (no size/variant/color). Its
  spacing surface is one public var it consumes directly, falling back to the
  internal default (`padding: var(--Button-pad, var(--_pad))`).
- **Material UI** — Material Design's sizes/variants, all in `variants`: the
  `(variant, size)` literal defaults (`--_pad`) and the sized-token routing
  (`--Button-pad`) for built-in sizes. A custom size routes inline instead (it
  needs the runtime size string).
- **Design system** — tunes the public **sized tokens** the Material UI layer
  routes over its default (wired via `enhanceDensity`).

## Language

**Agnostic var** (public, the layer-1 surface):
The single per-property variable the styled root consumes, shape
`--Component-<key>` — PascalCase component, short semantic key (`pad`, `gap`),
unprefixed (for example `--Button-pad`). Matches the existing component-var
convention (`--AppBar-background`). The root reads it with the internal default
behind it (`var(--Button-pad, var(--_pad))`); the Material UI layer **sets it in
a per-size `variants` block** to the sized-token routing (inline for custom
sizes). A designer tunes it through the sized token, not by setting it directly.
_Avoid_: literal CSS-property keys (`--Button-padding`), kebab keys, `--mui-`-prefixed component vars, "variable".

**Sized token** (public, the design-system knob):
A size-scoped override, shape `--Component-<size>-<key>`
(for example `--Button-small-pad`). Reflows only that one size. The Material UI
layer routes it over the internal default; when set at any scope it wins.
For a **size-varying** axis, resolution is **sized-only** — no all-sizes base token.
_Avoid_: "size variant token".

**Base token** (public, only when per-size override is meaningless):
An axis can skip the **size layer** — internal default `--_<key>` + seam,
consumed `var(--Component-<key>, var(--_<key>))`, nothing routes it, so a designer
sets the seam directly. Use this **only when tuning the axis per size makes no
sense**, because a base token can't be size-scoped from the theme. A
size-invariant _default_ is **not** enough: OutlinedInput's inline gutter is
`14px` for both sizes, yet it's a **sized token** (`--OutlinedInput-<size>-padInline`,
default `14px` each) so a design system can make small inputs denser inline.
Reach for a base token rarely; default to a **sized token**.
_Avoid_: a base token just because the default is size-invariant; a bare literal
default (use `--_<key>`).

**State token** (public, for a boolean compactness toggle like `dense`):
When the compactness axis is a **boolean** prop (`dense`) rather than a `size`
enum, the **default (off) state** is exposed through the plain seam
`--Component-<key>` — consumed `var(--Component-<key>, var(--_<key>))`, **nothing
routes it in the base** (the seam _is_ the default knob, base-token-shaped) — and
**only the on state** gets a qualified token `--Component-dense-<key>`, routed in
the `dense` variant over its own `--_<key>` literal. A boolean has no name for
"off", so there is **no** `--Component-normal/regular/default-<key>`: the absence
of the toggle is the plain seam, not an arbitrarily-named size. Contrast a
**sized token**, where every value (including `medium`) is qualified because each
is a real named size. Used by MenuItem, ListItem, ListItemButton, ListItemText.
The same shape **generalizes to pseudo-class interaction states** on the color
axis: **rest** is the unqualified base (the plain color token), and only the
non-rest states (`hover`, `active`, `focus`, `disabled`, `selected`) get a
qualified `<state>` segment, routed in their pseudo-class block. The trigger
differs (a boolean prop vs a `:hover`/`.Mui-*` selector) but the rule is identical:
the absent/default state is never named.
_Avoid_: naming the off/rest state (`-normal-`, `-regular-`, `-default-`, `-rest-`);
routing the seam in the base; treating `dense` as a 2-value size enum.

**Internal default**:
A private variable, shape `--_<key>` (leading underscore, **no component
prefix**), **set in `variants`** per `(variant, size)` cell (medium defaults
reuse the `{ variant }` blocks), over a **universal default on the root** so a
custom variant/size still renders. It holds the Material default — today's exact
px for that cell. No prefix is needed because every cell that reads it also
sets it on the same element (Button; OutlinedInput's input and root each declare
their own) — so an ancestor's value never wins over a component's own. Lowest priority, so any sized token or
plain `styleOverrides` property still wins.
_Avoid_: exposing it as API, prefixing with the component name, "private token".

**Token fallback**:
The default a token carries when unset — today's exact value for that cell.
**Dimension axis:** a literal px (the internal default `--_<key>`). **Color axis:**
the **palette CSS var** the cell already references (`--mui-palette-primary-main`),
held by the color-axis internal default `--_<variant><Prop>`. Either way the
un-configured component renders pixel-/color-identical (Argos zero-diff).
_Avoid_: "default value", "initial".

---

The terms below cover the **color axis** specifically. It is **three-layer, like
the dimension axis** (seam / private default / public knob) — not two. The private
default earns its keep here because every component exposes the **full standard
state set even where it is inert** (see _State standard_): an un-styled state must
fall back to the value that state shows *today*, which the rest seam alone can't
express without clobbering a styled state (e.g. hover-while-active). The private
default, **advanced by each genuinely-styled state**, captures that current value.

**Variant seam** (the color-axis analog of the agnostic var):
The single per-property variable the styled root consumes for color, shape
`--variant-<variant><Prop>` (`--variant-containedBg`, `--variant-outlinedColor`,
`--variant-outlinedBorder`, `--variant-textBg`). **Pre-existing** (Button, since
the CSS-extraction conversion #41378) — we adopt it as the seam, we don't replace
it. Unlike the dimension seam it is **variant-qualified**, not agnostic: "background"
is solid for `contained`, transparent for `text`, so the variant lives in the seam
name. For a **value-state** it reads `var(--_<variant><Prop>)`; for an **inert
state** it routes `var(<color token>, var(--_<variant><Prop>))` (see _Value-state
vs inert-state_).
_Avoid_: treating it as public API directly; renaming/prefixing it; assuming one
agnostic color seam across variants.

**Color internal default** (private, the color-axis analog of `--_<key>`):
Shape `--_<variant><Prop>` (`--_containedBg`, leading underscore, no component
prefix). Holds the **current resolved value** of its prop — the value the element
shows right now, **including any rest/hover/disabled token override**, not the bare
palette literal. Each **value-state** sets it to `var(<that state's token>, <palette
literal>)` in its block (`--_containedBg: var(--Button-contained-error-hover-bg,
<palette.dark>)` in `&:hover`); the seam then just reads `var(--_<variant><Prop>)`.
An **inert state** reads it as its fallback, so it inherits whatever override the
value-states put there.
_Avoid_: omitting it (collapses to two vars and breaks inert standardized states);
storing the bare palette literal with the token routed *above* it in the seam (then
a rest override never reaches inert states — they snap back to the palette); exposing
it as API.

**Value-state vs inert-state** (where a state's token lives):
A **value-state** genuinely sets the prop today (rest / hover / disabled for bg,
border, etc.): its token lives **inside** the default —
`--_<vp>: var(<token>, <palette>)`, seam = `var(--_<vp>)` — so the override is
captured in the default and flows to every later state. An **inert state** does not
change the prop (focus / active on Button — only box-shadow moves): its token is
routed in the **seam over** the default — `--variant-<vp>: var(<token>, var(--_<vp>))`
— settable, but unset it tracks the default. Which props are value vs inert is
per (state, prop): hover is a value-state for bg/border but inert for fg (Button
doesn't recolor text on hover).
_Avoid_: routing a value-state's token in the seam above the default (the
snap-to-palette bug); advancing the default in an inert state with a self-reference
`--_<vp>: var(<token>, var(--_<vp>))` (guaranteed-invalid CSS).

**Color token** (public, the design-system knob for color):
A fully-qualified override, shape `--Component-<variant>-<color>-<state>-<prop>`
(`--Button-contained-error-hover-bg`); the **rest** state omits the `<state>`
segment (`--Button-contained-error-bg`). Vocabulary: `<prop> ∈ {bg, fg, border}`
(`fg` = foreground/text color; `border` = border **color** on this axis),
`<state> ∈ {hover, focus, active, disabled, selected}` plus the unqualified rest.
Resolution is **per (variant, color, state, prop)** — the most
specific meaningful granularity, no coarse color-agnostic layer (mirrors the
dimension axis dropping the all-sizes base token). The name is built from the
per-color loop variable, so **custom palette colors get tokens for free** (parallels
custom-size routing). Variant-first ordering aligns with the seam (`--variant-contained…`).
_Avoid_: a color-agnostic token (`--Button-contained-hover-bg` — forces all colors
to one value); color-first ordering; omitting variant (breaks contained-vs-text).

**State standard** (the predictable state surface):
Every component exposes the **same** non-rest state segments — `hover`, `focus`,
`active`, `disabled`, `selected` — for each variant×color×prop, **even where the
component does not change that property in that state today** (the routing is then
inert: token unset → tracks the current value). The goal is a *predictable* surface
(a designer knows `--Button-<v>-<c>-disabled-bg` exists without reading source),
traded against the extra inert CSS each component emits. `focus` maps to the
`.Mui-focusVisible` selector (keyboard focus), not `:focus`. Contrast the dimension
axis, where a token exists only where the axis is genuinely density-bearing.
_Avoid_: tokenizing "only where color varies today"; naming the rest state; using
`:focus` instead of `.Mui-focusVisible`; inventing per-component state sets.

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
**sized tokens** to density steps
(`--Button-medium-pad: theme.vars.density.md`). `createTheme` is untouched.
Opt-in: without it, components render their literal-px defaults; with it, tuning
the density scale (or scoping `--mui-density-*`) reflows every wired component.
_Avoid_: "density preset" (that is the resulting effect, not the function).

## Relationships

- The styled root reads **one** agnostic var per property; **no JavaScript
  conditional** lives in the styles implementation. The `(variant, size)` → px
  matrix and the built-in-size routing are both **`variants` cells**, not a body
  lookup table; only custom-size routing is inline.
- **Two vars, not one** (`--Button-pad` over `--_pad`): the cells write the
  _value_ (`--_pad`), the routing writes a _reference_ (`--Button-pad`). One var
  fails three ways — a self-referencing fallback in the inline bridge (invalid
  CSS, forcing the literal back into runtime style), the `(variant×size)` and
  size-only write-axes clobbering on one element, and losing the agnostic seam.
  Full reasoning in `docs/adr/0001` → _Why two vars_.
- Override priority (high → low): plain `styleOverrides` property → **sized
  token** → internal default (literal fallback).
- Custom (user-defined) sizes work for free: when the size isn't built-in, the
  inline routing builds the sized-token name from the runtime size string; the
  design system supplies the value via that token.
- **Token granularity follows the component's spacing structure; split only when
  the impl forces it.** Button sets all sides together via one shorthand on one
  element → one `pad` var (even though block 6 ≠ inline 8 — differing values alone
  don't force a split). OutlinedInput _is_ forced: block vs inline land on
  different elements/states and zero per adornment. **Both axes are sized**
  (`--OutlinedInput-<size>-padBlock`/`-padInline`) — block defaults vary by size
  (16.5/8.5), inline defaults don't (14 both) but it's sized anyway so density can
  tune it per size. Its padding spans two elements (input when inline, root when
  multiline/adorned — never both on a side at once), so each site tokenizes its
  own literal in place rather than lifting size resolution to one owner; smallest
  diff from master.
- **Cross-component coordination respects dependency direction.** The outlined
  floating label must track the input's `padBlock`, but `InputLabel` is generic
  (shared by all input variants) so it only exposes a seam (`--InputLabel-y`,
  literal default). The **specific** component, `OutlinedInput`, owns the bridge:
  it reaches its preceding-sibling label via `:has(~ &)` and sets `--InputLabel-y`
  from its public token. Generic never names specific; one knob still drives both.
- **A shared internal base owns the agnostic layer; consumers route their own
  tokens into it.** `SwitchBase` consumes the seam once
  (`var(--SwitchBase-pad, var(--_pad))`); `Checkbox`/`Radio`/`Switch` (the Material
  layer) each route a per-component sized token (`--Checkbox-<size>-pad`, …) into
  that shared seam, staying independently tunable. The seam keeps the base's name
  (plumbing); the knob is the per-component token. Delivery rides **custom-property
  inheritance**, no descendant selector: where the consumer _is_ the base
  (`styled(SwitchBase)`) it sets the seam on its own root; where it _wraps_ the
  base (the Switch thumb), the wrapper root sets the seam and the base inherits it
  (the base doesn't redeclare the seam). Caveat: the base _does_ redeclare
  `--_<key>` (what makes it unprefixed-safe), so an inherited `--_<key>` is
  shadowed — a wrapper needing a different per-state default feeds it through the
  seam (set `--_<key>` on the wrapper), not by inheriting `--_<key>`.
- **enhanceDensity** (opt-in) connects tier-2 component tokens to the tier-1
  **density scale**; un-enhanced, the literal fallbacks reproduce today's pixels.
- This experiment does **not** ride `--mui-spacing`; holistic density comes from
  the density scale, not that dial.
- **The color token carries only the axes the component has.** Button has variant
  and palette-color → `--Button-<variant>-<color>-<state>-<prop>`. MenuItem has
  neither (single styled root, no `color` prop) → `--MenuItem-<state>-<prop>`. The
  segments are dropped, not stubbed; the value-state/inert-state and
  rest-unqualified rules are unchanged. MenuItem's compound states
  (`selected:hover`, `selected:focus`) are real states with their own tokens
  (`--MenuItem-selected-hover-<prop>`), resolved by selector specificity as before.
- **An inert prop with no native CSS home rides a zero-cost carrier.** MenuItem has
  no border today, so its `border` token drives an **always-on inset box-shadow**
  (`inset 0 0 0 1.5px var(--_border)`, default `transparent`) — invisible until set,
  and never shifts layout (unlike a real `border`). The seam pattern is otherwise
  identical to a component that already has the property (Button's `--variant-*`).

## Example dialogue

> **Dev:** "How do I shrink the padding of small buttons?"
> **Domain expert:** "Set the **sized token** `--Button-small-pad` at any scope;
> the Material UI layer routes it over its default, so every small button
> reflows. Resolution is sized-only — there's no all-sizes base token, so do it
> per size."
> **Dev:** "And with nothing set?"
> **Domain expert:** "The agnostic `--Button-pad` falls back to the **internal
> default** `--_pad` — the literal px set in the `(variant, size)` `variants`
> cell, pixel-identical to today. The `--mui-spacing` dial does nothing here; for
> holistic density you run **enhanceDensity** and tune the **density scale**."

> **Dev:** "How do I recolor the hover background of contained error buttons?"
> **Domain expert:** "Set the **color token** `--Button-contained-error-hover-bg`.
> The `&:hover` block routes it over the **color internal default** `--_containedBg`,
> which hover has advanced to `palette.error.dark` — so unset it's today's hover
> color, set it's yours. It's `(variant, color, state, prop)`-specific: error only,
> hover only, background only."
> **Dev:** "Is there a knob for the disabled state even though Button uses a flat grey?"
> **Domain expert:** "Yes — `--Button-contained-error-disabled-bg` exists by the
> **state standard**, even though it's inert by default (falls back to
> `palette.action.disabledBackground`). Every component exposes the same
> `hover/focus/active/disabled/selected` set, so the surface is predictable."

## Flagged ambiguities

- "spacing token" meant both a `theme.spacing` key and a per-component value —
  resolved: `theme.spacing` is untouched; per-component vars are the **agnostic
  var** (layer-1 surface) and **sized tokens** (the design-system knob).
- "spacing scale" (earlier draft, tier-1) — renamed **density scale** and moved
  to `theme.density`, to disambiguate from `theme.spacing`.
- Base (all-sizes-over-sized) token — dropped for **size-varying** axes;
  resolution is sized-only, tune per size. A base token applies only when per-size
  override is meaningless — _not_ merely when the default is size-invariant
  (OutlinedInput's `14px` inline gutter is still a **sized** token so density can
  tune it per size).
- Var key — single `pad` shorthand only when the impl sets all sides together on
  one element (Button); split per axis (`padBlock`/`padInline`) when forced —
  axes on different elements/states or different shapes (OutlinedInput). Sides are
  symmetric within an axis, so `padding: <block> <inline>` stays RTL-safe.
- Color `<prop>` foreground — the seam names it `Color` (`--variant-containedColor`),
  but the public token already carries a palette `<color>` segment, so foreground
  is **`fg`** (avoids `--Button-…-error-color`, two "color" meanings) — the public
  vocabulary is deliberately separate from the internal seam suffix.
- Color `<prop>` border — kept as bare **`border`** (not `borderColor`/`bc`):
  `bc` reads as background-color, and `borderColor` is verbose. **Known caveat:**
  on the color axis `border` means border _color_; if border _width_ ever becomes
  a dimension-axis token this must be revisited to disambiguate.
- "state token" — originally a binary-prop concept (`dense`); now also the
  color-axis pseudo-class states. Same shape (rest/off unqualified, only non-rest
  named), different trigger. The color axis additionally fixes a **standard** set
  (`hover/focus/active/disabled/selected`) emitted even when inert, where the
  dimension axis tokenizes only genuinely-density-bearing axes.
- Where the value-state token lives — **corrected after the grill.** First draft
  (and ADR-0002 v1) routed every state's token in the seam *over* a `--_<vp>` that
  held the bare palette literal. Bug: overriding only the **rest** token left
  inert states (focus/active) falling back to the palette literal, so a recoloured
  button **snapped back to the palette colour on focus** (visible as default purple
  on a re-greyed secondary). Fix: a **value-state** puts its token *inside*
  `--_<vp>` (`--_<vp>: var(<token>, <palette>)`, seam reads `var(--_<vp>)`); only
  **inert** states route over `--_<vp>`. Now `--_<vp>` is the current resolved
  value and overrides propagate. See _Value-state vs inert-state_.
