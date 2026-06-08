# Component density via a CSS-var adapter, resolved in variants

Component dimensions are exposed as public CSS variables with **literal-px
fallbacks**, resolved through an **internal var whose value lives in `variants`**
(inline style bridges only the custom-size case), instead of riding the single
`--mui-spacing` dial (`feat/components-theme-spacing`) or emitting a static
per-(variant, size) token matrix (`poc/css-vars-map`).

## Context

We want designers to tune density — per component, per size, or holistically —
without editing component source, writing `calc`, or accepting that every
dimension reflows off one global `--mui-spacing` value.

Constraints that shaped the design:

- **Pixel-identical default.** The un-configured theme must render today's exact
  px for every `(variant, size)` cell (Argos zero-diff).
- **Literal defaults in `variants`, not the body.** The `(variant, size)` →
  px matrix uses the idiomatic `variants` mechanism (Button already has these
  cells for `fontSize`); no JS lookup table lives in the component body.
- **Support user-provided sizes.** A custom `size` added via the theme must get
  the same tunability as built-in sizes — built-in routing is per-size `variants`
  blocks; a custom size falls back to inline routing (dynamic size string).
- **No JavaScript conditionals in the styles implementation.** The `styled()` body must
  not branch on `ownerState.size`/`variant` to pick a value.
- **Non-breaking.** Existing variant/size padding and existing
  `styleOverrides`/`sx` overrides must keep working unchanged.

## Decision

The component is read as **three layers of responsibility**, each owning a
distinct slice of the same cascade:

1. **Agnostic** — the styled root with no design meaning (no size/variant/color).
   Its whole spacing surface is one public var it consumes directly, falling back
   to the internal default: `padding: var(--Button-pad, var(--_pad))`.
2. **Material UI** — Material Design's sizes/variants, all in `variants`: the
   `(variant, size)` literal **defaults** (`--_pad`) and the **sized-token
   routing** for the built-in sizes (`--Button-pad`). No JS lookup in the body.
   Custom (non-built-in) sizes route inline instead — the one case that needs the
   runtime size string.
3. **Design system** — overrides through the public **sized token** the Material
   UI layer routes over its default (driven by `enhanceDensity`).

Per property, the chain (inline padding on Button):

- **Agnostic var** `--Button-pad` (public) — the styled root's only spacing
  consumption point; **set by a built-in-size `variants` block** to the
  sized-token routing (inline for custom sizes), falling back to `--_pad`.
- **Sized token** `--Button-<size>-pad` (public) — the design-system knob;
  reflows one size.
- **Internal default** `--_pad` (private, leading underscore) — the Material
  default, **set in `variants`** per `(variant, size)`, with a universal default
  on the root so a custom variant/size still renders a sane value.

Resolution for a **size-varying** axis is **sized-only** (no all-sizes base
token): the sized token wins, else the Material default. An axis whose default is
the same every size can still be **sized** — and usually should be, so a design
system can tune it per size (density). A plain **base token** `--Component-<key>`
over an internal default `--_<key>` (consumed `var(--Component-<key>, var(--_<key>))`,
no size layer/routing) is reserved for the rare axis where per-size override is
genuinely meaningless.

When the compactness axis is a **boolean** prop (`dense`) rather than a `size`
enum, use a **state token**: the default (off) state is the plain seam
`--Component-<key>` (base-token-shaped — nothing routes it in the base), and only
the on state is qualified `--Component-dense-<key>`, routed in the `dense`
variant. A boolean has no name for "off", so there is no
`--Component-normal/regular/default-<key>` — unlike a size enum, where every value
(including `medium`) is qualified because each is a real named size. Used by
MenuItem, ListItem, ListItemButton, and ListItemText.

The styled root has **one** consumption point per property and **no conditional**;
the defaults and built-in-size routing are plain `variants` entries:

```js
const ButtonRoot = styled(ButtonBase)({
  '--_pad': '6px 16px', // universal default (today's root padding)
  padding: 'var(--Button-pad, var(--_pad))', // agnostic layer
  variants: [
    // routing for built-in sizes (deduped CSS)
    {
      props: { size: 'small' },
      style: { '--Button-pad': 'var(--Button-small-pad, var(--_pad))' },
    },
    // literal default per (variant, size); medium lives in the { variant } blocks (DRY)
    { props: { variant: 'text', size: 'small' }, style: { '--_pad': '4px 5px' } },
  ],
});
```

Only **custom sizes** route inline — the one case needing the runtime size
string (so custom sizes stay tunable without registering a variant):

```js
const buttonSizes = ['small', 'medium', 'large'];
const densityVars = buttonSizes.includes(size)
  ? undefined // built-in: routed via variants above
  : { '--Button-pad': `var(--Button-${size}-pad, var(--_pad))` };
<ButtonRoot style={{ ...densityVars, ...style }} />;
```

### Why two vars (`--Button-pad` and `--_pad`), not one

Three reasons, all pointing the same way:

1. **Values belong in `variants`; the inline bridge must stay value-free.** The
   literal px is a design decision — it must live in `variants`, co-located with
   the rest of the variant's styling, statically deduped, smallest diff from
   today. Inline style is only a **bridge** for the one dynamic case (a custom
   size's token name) and must carry **no values**, only routing. Two vars allow
   that: cells write the value (`--_pad`), the bridge writes a _reference_
   (`--Button-pad: var(--Button-<size>-pad, var(--_pad))`). With a single
   `--_pad`, the custom-size bridge would have to write
   `--_pad: var(--Button-<size>-pad, var(--_pad))` — a property referencing
   **itself**, which CSS treats as guaranteed-invalid. The only escape is
   embedding the literal back into the inline string, dragging the value into
   runtime style — exactly what we moved out.
2. **Two write-axes on one element clobber if they share a name.** The literal
   varies by **(variant × size)** (the cells); the token interception varies by
   **size only** (`--Button-<size>-pad`, the routing). A single `--_pad` keeps
   exactly one: routing-wins loses the per-variant literal (and the size block
   can't supply the right fallback — it doesn't know the variant); literal-wins
   never consults the token, so no override. Two names let each axis write
   independently; `--Button-pad` chains to `--_pad`, the root reads `--Button-pad`.
3. **Layer seam (naming).** `--Button-pad` is public-shaped because it's the
   **agnostic-layer seam** — the var a no-design consumer of the bare root would
   set; Material UI takes it over to inject token routing. `--_pad` is private:
   Material UI's internal default, not a contract.

Holistic density is a separate, opt-in layer driven by a **single**
`enhanceDensity(theme)` function (mirroring `enhanceHighContrast`) that does
both jobs: it **emits** the density scale as `--mui-density-*` (and populates
`theme.vars.density`), and **maps** sized tokens to density steps via injected
`styleOverrides.root` (`--Button-medium-pad: var(--mui-density-md)`).
`createTheme` is left untouched. Types for `theme.vars.density` ship built-in;
the vars exist at runtime only after `enhanceDensity` runs.

We considered making `density` a first-class `createTheme` node so the normal
css-var generator emits the vars. That is more "correct" (the vars participate
in the standard generation and can be re-scoped at any level), but it requires
`createTheme`/css-vars surgery. For an experiment we chose the self-contained
function: easy to A/B, easy to delete, no core change. The cost is that
post-hoc-emitted vars live outside the standard `theme.vars` pipeline.

Scope: **Button** and the **outlined input family** (OutlinedInput, with
InputBase/TextField to follow) for this experiment.

### OutlinedInput specifics

Same three-tier model, with two component-driven differences:

- **Both axes are sized.** Block (`16.5px`→`8.5px`) varies by size → sized token
  `--OutlinedInput-<size>-padBlock`. The `14px` inline gutter is _constant_ across
  sizes, but it's **sized too** → `--OutlinedInput-<size>-padInline` (default
  `14px` each size) so a design system can make small inputs denser inline. (We
  first modeled inline as a single size-invariant **base token**, but that can't
  be size-scoped from the theme — a flaw for density — so we promoted it; a base
  token is now reserved for axes where per-size override is meaningless.) Block and
  inline are still split because the impl applies them separately — different
  elements/states, per-adornment side-zeroing. Each axis is routed per size **in
  place** on the element/variant that consumes it (input + root cells), so sizing
  inline adds a `&& size === 'small'` re-route beside each size-agnostic adornment
  variant — no lift, both axes wired identically. (Filled/Standard have asymmetric
  block padding — `4/5`, `25/8` — so a shared InputBase block seam would need a
  richer, per-side shape; deferred.)
- **Two consuming elements, tokenized in place.** Padding lives on the input
  (non-multiline) _and_ the root (multiline) — and the two never both apply block
  padding at once (multiline zeroes the input's). Rather than lift size resolution
  to a single owner, **each site keeps master's literal-bearing cell and
  tokenizes in place**: input base + input `{ size: small }`, root `multiline` +
  root `{ multiline && small }`, each declaring its own `--_padBlock` and routing
  the size token. This keeps the smallest diff from master (no restructuring, no
  inheritance reliance, no dropped variants); the minor cost is the size routing
  written twice (input vs root-multiline), which is honest — they are genuinely
  separate code paths. Unprefixed `--_padBlock` stays safe because every cell that
  reads it also sets it on the same element.

**Closing the loop — the floating label.** In a `TextField`, `InputLabel` is a
_preceding sibling_ of the input. The resting label must track the block padding
or it decenters when density is tuned. True centering is `labelY = padBlock`
exactly (`(lineHeight + 2·padBlock)/2 − lineHeight/2`); today's `16px`/`9px` are
that with ±0.5px historical rounding.

The bridge must respect the **dependency direction**: `InputLabel` is generic
(shared by outlined/filled/standard) and must not name a specific input's token.
So `InputLabel` only exposes a seam — its outlined resting transform reads
`var(--InputLabel-y, <literal>)` — and **OutlinedInput owns the bridge**. Because
the label precedes the input, OutlinedInput reaches it with `:has` (sibling
combinators only match _following_ siblings) and, per size, derives the label
seam straight from its public sized token (a cross-element rule must reference the
public token, not the input's internal `--_padBlock`):

```js
// InputLabel — generic seam, literal default
transform: 'translate(14px, var(--InputLabel-y, 16px)) scale(1)' // small: 9px

// OutlinedInputRoot — base (medium) + size:small variant
[`.${inputLabelClasses.root}:has(~ &)`]: {
  '--InputLabel-y': 'calc(var(--OutlinedInput-medium-padBlock, 16.5px) - 0.5px)', // small: small token + 0.5px = 9px
},
```

Defaults compute to exactly `16px`/`9px` (Argos zero-diff); setting
`--OutlinedInput-<size>-padBlock` reflows input and label together — single knob,
no FormControl, no `enhanceDensity`. The **shrunk** label (`-9px`, in the notch on
the top border) is padding-independent and stays literal. InputBase needs no
change — OutlinedInput fully overrides its padding.

Why `:has` and not the alternatives: putting the calc in `InputLabel` would make
a generic component name a sibling's token (wrong direction); a flat-scope
`--InputLabel-y` can't be size-specific for mixed-size pages; routing through
`enhanceDensity` defers single-knob to the design-system layer. The `:has` rule
keeps the coupling in the one component that legitimately owns it. Cost: needs
`:has()` (Chrome 105 / Safari 15.4 / Firefox 121).

### Shared internal base (SwitchBase → Checkbox, Radio, Switch)

When several components share one styled base, the **agnostic layer lives on the
base**: `SwitchBase` consumes the seam once (`padding: var(--SwitchBase-pad,
var(--_pad))`, `--_pad: 9px`), and each consumer — the **Material layer** — routes
its own per-component public token into the shared seam. The seam keeps the
_base's_ name (`--SwitchBase-pad`, plumbing); the designer-facing knob is the
per-component sized token (`--Checkbox-<size>-pad`, `--Radio-<size>-pad`,
`--Switch-<size>-pad`). Each consumer stays independently tunable while the base
holds the one consumption point.

Two reader topologies, both relying on **custom-property inheritance** (no
descendant selector, no added specificity):

- **Consumer is the base.** `Checkbox`/`Radio` are `styled(SwitchBase)`, so their
  size variants set `--SwitchBase-pad` on the very element that consumes it.
- **Consumer wraps the base.** The `Switch` thumb is a `SwitchBase` _inside_
  `SwitchRoot`; the root sets `--SwitchBase-pad` and the thumb **inherits** it.
  This works precisely because `SwitchBase` does not redeclare the seam.

The inheritance caveat is the mirror of why `--_<key>` is safe unprefixed: the
base **redeclares `--_<key>`** on itself, so an inherited `--_<key>` is shadowed.
The seam inherits (not redeclared); the internal default does not. So a wrapper
that needs a value different from the base's feeds it **through the seam** — set
the seam directly on the wrapper (preferred), not the shadowed `--_<key>`. Switch
does exactly this: it sets `--SwitchBase-pad` to a derived `calc` (below).

**Interlocked geometry — derive, don't tokenize one axis.** A `Switch`'s width,
height, thumb, touch target and travel all move together; tokenizing the thumb
pad alone drifts the thumb off the track. So Switch tokenizes its real dims per
size (`--Switch-<size>-width/height/thumbSize/touchSize` + the track gutter
`--Switch-<size>-pad`) and **derives** the coupled values with `calc`, feeding the
shared seam: SwitchBase pad
`= (touchSize − thumbSize) / 2`; the absolutely-positioned button stays centered
via `top = (height − touchSize) / 2` and checked `transform: translateX(width −
touchSize)`; the thumb slot reads `thumbSize`. Defaults (`touchSize == height`)
compute to today's `9/4` pad, `0` top, `20/16` travel — pixel-identical.
`enhanceDensity` skips Switch (geometry isn't spacing-scale-derived); tune it per
size through the public dim tokens.

## Consequences

- **Pixel-identical default & non-breaking.** Literals come from the `variants`
  cells (`--_pad`) over a universal root default, so a custom variant/size still
  renders; public tokens, `styleOverrides`, and `sx` all still win via the cascade.
- **No inline for built-in sizes.** Routing for `small`/`medium`/`large` lives in
  `variants` (deduped CSS), so the common case carries no per-instance `style`
  attr. Only a **custom size** routes inline.
- **Custom sizes work for free** — the inline routing builds the sized-token name
  from the runtime size string; the design system supplies the value via that
  token, no variant registration needed.
- **No `--mui-spacing` reflow.** Components opt out of the global dial; holistic
  density flows through the density scale + `enhanceDensity` instead.
- **calc resolves only in a real browser** (jsdom does not), so density
  assertions belong in browser/visual tests, not jsdom unit tests.

### Accepted trade-offs

| Trade-off                                                                                  | Why we can live with it                                                                                                                                        |
| :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--Button-pad` is public-shaped but not a designer knob in the assembled Button (plumbing) | It's the agnostic seam; the real knob is `--Button-<size>-pad`, documented. The name marks the layer boundary.                                                 |
| Two vars per property instead of one                                                       | Mandatory (see _Why two vars_); the indirection is mechanical and documented.                                                                                  |
| Unprefixed `--_pad` could inherit a foreign value                                          | Every built-in cell plus the root universal default set it on the element; revisit a prefix only if cross-component collisions surface as the pattern spreads. |
| `pad` shorthand is coarse (an override sets all sides)                                     | Button padding is symmetric; tiny token surface; granular logical props can come later.                                                                        |
| `var()` unresolved in jsdom (no computed-px assertions)                                    | Argos covers default visuals; the chain is declarative and inspectable.                                                                                        |
| Inline still present for custom sizes                                                      | Rare; the built-in common case carries zero inline.                                                                                                            |
| Per-property boilerplate grows with rollout                                                | Acceptable for the payoff (runtime scoped theming); extract a helper before component #3.                                                                      |
