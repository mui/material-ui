# Multi-Theme Plain CSS: Architectural Analysis

This document covers the two structural challenges that emerge when scaling a plain-CSS
theming system (base theme + MD opt-in) across a full component library: **bundling
granularity** and **token proliferation**. Each section describes the problem, the
available options, and the honest trade-offs of each.

---

## Problem 1: Bundling — Loading only what you need

### The constraint

CSS has no runtime tree-shaking. A stylesheet is either loaded or it isn't. There is no
mechanism to include only the rules that correspond to components actually rendered on the
page, or only the rules that belong to the active theme. This is a fundamental difference
from JavaScript, where bundlers eliminate unused exports at build time.

### Options

#### A — Single theme bundle

`material-theme.css` imports every component's MD overrides in one file:

```css
@import '../Slider/Slider.material.css';
@import '../Button/Button.material.css';
/* … all 50+ components … */
```

Users import one file; all MD component styles are present regardless of which
components are actually used on the page.

| | |
|---|---|
| **Pro** | One import, one HTTP request, simple mental model |
| **Pro** | Gzip compresses well — repeated selector patterns collapse |
| **Con** | All MD component CSS loads even when components are unused |
| **Con** | Bundle grows linearly with component count |

Realistic size: ~30–80 KB uncompressed, ~8–15 KB gzipped for a complete MD component
override set. Acceptable for most production apps.

---

#### B — Component JS import as the tree-shaking unit

Each component imports its own MD CSS alongside its base CSS:

```tsx
// Slider/index.tsx
import './Slider.css';           // base — always loaded with the component
import './Slider.material.css';  // MD overrides — inert until [data-theme="md"] activates
```

`material-theme.css` contains only token variables. The JS bundler (webpack, Vite)
eliminates unused component imports. Pages that never render `<Slider>` never load
`Slider.material.css`.

| | |
|---|---|
| **Pro** | Component not used → component CSS not bundled |
| **Pro** | Works with all major bundlers today, no extra tooling |
| **Con** | Base-theme users download dormant MD bytes for every component they use |
| **Con** | Adding a new theme requires modifying every component's import list |
| **Con** | Coupling between the component and a specific theme's CSS file |

This is the best fit for MUI's component-centric mental model. The inert MD bytes
per component are small and compress well; for most apps the trade-off is acceptable.

---

#### C — Manual per-theme imports

Users import exactly the files they need:

```tsx
import '@mui/material/Slider/Slider.css';
import '@mui/material/Slider/Slider.material.css'; // only for MD users
```

| | |
|---|---|
| **Pro** | Optimal bundle — exactly what's needed, nothing more |
| **Con** | Significant DX burden; users manage imports manually for 50+ components |
| **Con** | Easy to get wrong; hard to document; scales poorly |

Only viable as an advanced escape hatch, not the default.

---

#### D — CSS-in-JS for theme structural overrides

Base component styles stay in `.css` files (tree-shaken by component JS import).
Theme structural overrides are expressed in `styled()` or `sx` — injected into the
DOM only when the component renders. This is how MUI v5 works today.

| | |
|---|---|
| **Pro** | True runtime tree-shaking — component not rendered = styles not injected |
| **Pro** | No inert bytes from unused themes |
| **Con** | Runtime cost: style injection on every component mount |
| **Con** | SSR/hydration complexity (style mismatch risk) |
| **Con** | Abandons the plain-CSS premise; users must use `sx`/`styled` to override |

---

#### E — Build-time CSS generation

Theme is configured at build time. A tool generates a single optimised CSS output
containing only the active theme's rules. No runtime switching possible.

| | |
|---|---|
| **Pro** | Optimal output: zero dead rules, zero unused tokens |
| **Pro** | No runtime cost at all |
| **Con** | No runtime theme switching |
| **Con** | Adds a build step and configuration surface |
| **Con** | Far from MUI's current dynamic, per-user theming model |

Right answer for static sites and design systems with a fixed theme, not for MUI's
general-purpose use case.

---

#### F — Copy to project (shadcn/ui model)

MUI ships the CSS files as templates. Users copy `base-theme.css`,
`material-theme.css`, and any component CSS files they need directly into their
project, then edit them freely. The library ships no runtime CSS — only the JS
components and the source files as reference.

```
my-app/
  styles/
    base-theme.css        ← copied from @mui/material, then owned by the project
    material-theme.css    ← same
    slider-overrides.css  ← user's own additions on top
```

| | |
|---|---|
| **Pro** | Zero bundling problem — users include exactly what they copied |
| **Pro** | No token API to learn — just edit the CSS values directly |
| **Pro** | Full control: strip unused rules, restructure freely |
| **Pro** | No version lock-in on the styles — CSS evolves independently of the JS |
| **Con** | Bug fixes, accessibility patches, and new variants do not flow automatically |
| **Con** | Component CSS is coupled to MUI's internal class names and DOM structure; if those change, copied CSS breaks silently |
| **Con** | Support is harder — "which version of the CSS do you have?" has no clear answer |
| **Con** | Scales poorly past a handful of components — copying 50 component files is not a workflow |

**Is it a good option?** It depends on what is being copied.

For **theme token files** (`base-theme.css`, `material-theme.css`) — yes, genuinely
good. Token declarations are stable, change infrequently, and the whole point of a
starting-point theme is that users will customise it. Encouraging users to copy and
own these files is reasonable and already aligns with how this PoC is structured.

For **component CSS files** (`Slider.css`, `Button.css`) — much riskier. These files
reference class names that MUI generates internally. A patch release that renames
`.MuiSlider-thumb` to `.MuiSlider-handle` (unlikely, but possible) silently breaks
every copied file. The more components are copied, the higher the ongoing maintenance
tax.

The practical sweet spot is a **hybrid**: keep component CSS managed by MUI (delivered
via the npm package, updated with each release), and encourage users to copy only the
theme token files as a starting point for customisation. This is distinct from shadcn/ui,
where the components themselves are intentionally decoupled from any upstream — MUI's
value proposition is precisely the maintained, accessible component implementation.

---

### Bundling recommendation

**Option B** (component JS import as the tree-shaking unit) is the best default.
The component import is already the unit of granularity users think in. The dormant
MD bytes for base-theme users are minimal per-component and compress well.

**Option F** (copy to project) is the right answer specifically for theme token files —
ship `base-theme.css` and `material-theme.css` as well-commented starting points that
users are explicitly invited to copy and modify. For component CSS, keep it managed.

For apps where bundle cost is the primary concern, **Option E** (build-time) is the
correct answer — but it is a different product, not a configuration of the same one.

---

## Problem 2: Token Proliferation

### The constraint

Every CSS custom property you expose is a public API. It must be documented,
kept stable across versions, and maintained when the underlying CSS changes.
Tokens also interact — setting `--Slider-thumbSize` and `--Slider-trackSize`
independently can produce visually incoherent combinations. There is a real cost
to each token added, and it compounds across components.

The Slider PoC already has 12 component-level tokens. MUI has 50+ components.
A naive extrapolation — 12 × 50 — yields 600+ component tokens on top of ~100
global tokens. At that scale, discoverability collapses.

### Token tiers

**Level 1 — Global tokens** (~50–100 variables)

`--mui-palette-primary-main`, `--mui-shape-borderRadius`, `--mui-shadows-2`

Brand-level changes. High leverage: one change propagates to every component that
references that token. Well-understood by developers today.

**Level 2 — Component tokens** (~5–15 per component)

`--Slider-thumbSize`, `--Slider-trackSize`, `--Slider-thumbElevation`

The component's visual "knobs" — values that themes intentionally set differently,
and that users commonly need to override in design system work. One token maps to
one clear visual property.

**Level 3 — Sub-part tokens** (unbounded)

`--SliderTrack-borderTopLeftRadius`, `--SliderThumb-boxShadowSpread`

Full CSS property access for every internal element. Maximum flexibility,
maximum API surface.

### Options

#### A — Global tokens only

No component-level tokens. All component customisation via CSS class overrides.

| | |
|---|---|
| **Pro** | Minimal API surface — ~100 variables total, easy to document |
| **Con** | Any per-component customisation requires knowing internal class names |
| **Con** | Theme differences (base vs MD) cannot be expressed via tokens → every structural difference needs scoped CSS rules |

Not sufficient for a two-theme system. Themes need to set component-level values
differently without the user writing CSS.

---

#### B — Global + essential component tokens *(current approach)*

~10 tokens per component, chosen to cover the meaningful visual differences between
themes and the most common user customisation needs. Not every CSS property gets a
token — only the ones that themes actually differ on.

| | |
|---|---|
| **Pro** | Manageable total (~600 variables across all components) |
| **Pro** | Covers base vs MD differences without exposing full internals |
| **Pro** | Clear selection criteria — tokens have a reason to exist |
| **Con** | Some customisations still require CSS class overrides |
| **Con** | "Essential" is a judgement call, hard to get right the first time |

A token earns its place when:
1. Two first-party themes set it to different values, **or**
2. It changes the component's overall visual character (size, shape, depth), **or**
3. It appears frequently in design system customisation work

Avoid tokens for values that are derived from other tokens. For example,
`--Slider-hoverRingColor` is always `rgba(var(--mui-palette-primary-mainChannel) / 0.16)` —
that relationship belongs in CSS, not duplicated as a configurable token. Surfacing it
as a token implies it's independently useful when in practice it almost never is.

**Suggested cap: 10–15 tokens per component.** If you need more to express the
difference between two themes, that is a signal those themes are structurally different
enough to warrant scoped CSS rules (see Problem 1, Option B) rather than more tokens.

---

#### C — Full sub-part tokens

Every CSS property on every internal element gets a token.

| | |
|---|---|
| **Pro** | Nothing requires a CSS override — designers can wire tokens directly from a design tool |
| **Con** | 50+ tokens per component → 2,500+ total across the library |
| **Con** | Tokens interact in non-obvious ways; visually incoherent combinations are easy to produce |
| **Con** | Every CSS refactor risks a breaking token API change |
| **Con** | Documentation becomes unmanageable |

This is the direction tools like Fluent UI Web Components and SAP Fiori take.
It works when the component library is the design system — one team, one product.
It does not work well for a general-purpose library serving thousands of diverse
design systems.

---

#### D — Tiered exposure with a layer escape hatch

Start with global + component tokens (Option B). For sub-part customisation, instead
of adding more tokens, rely on `@layer` to give user styles guaranteed priority:

```css
/* MUI components declared in @layer mui.default */
/* User's own CSS in an unlayered sheet, or a higher layer, always wins */
```

Users who need to change something not covered by a token write a standard CSS
override — they never need to hunt for an obscure token name or file a GitHub issue.

| | |
|---|---|
| **Pro** | Token count stays bounded and principled |
| **Pro** | No escape-hatch dead ends — users can always reach internal elements |
| **Pro** | Good long-term direction; aligns with how CSS Layers were designed to be used |
| **Con** | Layer overrides are less discoverable than a named token |
| **Con** | Requires users to understand `@layer` specificity |

---

#### E — Copy to project, no tokens needed

When users own the theme CSS files, they do not need a token API. They change the
value directly in the file. This sidesteps the entire token proliferation problem
for the theme layer.

| | |
|---|---|
| **Pro** | No token API to design, document, or maintain |
| **Pro** | Any value is "customisable" — there is no ceiling |
| **Con** | Requires understanding of which values to change and how they interact |
| **Con** | Loses the semantic contract: a token named `--Slider-thumbElevation` communicates intent; a raw `box-shadow` value does not |
| **Con** | Does not help with component-level customisation — users still need to know MUI's internal class names to go beyond the token layer |

This reinforces the hybrid conclusion from the Bundling section: copy-to-project is
appropriate for theme files, not for component files. Component-level tokens remain
necessary for users who want to customise without writing class-name CSS.

---

### What tokens cannot express

Some visual differences between themes require structural CSS — different properties,
different pseudo-elements, different nesting. No number of tokens can encode these:

- Slider: circular vs truly square thumb with clipped focus ring
- TextField: underline (standard) vs full border box (outlined) as default style
- Button: filled vs tonal vs text — fundamentally different background and border logic
- Select: native vs custom dropdown anchor structure

These require `[data-theme]`-scoped CSS rules in a higher `@layer`, not more tokens.
This is the real boundary to establish: **tokens for values, scoped CSS rules for
structure.**

---

### Token recommendation

**Option B** (global + ~10 essential component tokens) plus **Option D** (`@layer` as
the structural escape hatch).

Concrete decision rule:

> Add a token if two themes set the property to different values, or if the property
> directly expresses a component's visual character. Stop at 10–15 per component. If
> the differences between themes cannot be expressed with that many tokens, use
> `[data-theme]`-scoped CSS rules in `@layer mui.theme` instead.

---

## Summary

| Problem | Option | Bundle cost | DX | Recommended |
|---|---|---|---|---|
| Bundling | A — Single theme bundle | ~15 KB gzip total | Simple | Acceptable default |
| Bundling | B — Component JS import | Per-component, pays for base+MD | Natural MUI model | **Best fit for components** |
| Bundling | C — Manual per-theme imports | Optimal | Tedious | Escape hatch only |
| Bundling | D — CSS-in-JS overrides | Zero waste | Familiar, runtime cost | If already on CSS-in-JS |
| Bundling | E — Build-time generation | Optimal | Config burden | Static / perf-critical apps |
| Bundling | F — Copy to project | User-controlled | Full control, upgrade burden | **Best fit for theme files** |
| Tokens | A — Global only | Minimal | Simple | Insufficient for multi-theme |
| Tokens | B — Global + component knobs | ~600 vars | Balanced | **Recommended** |
| Tokens | C — Full sub-part tokens | 2,500+ vars | Overwhelming | Over-engineered |
| Tokens | D — Tiered + layer escape | Bounded | Principled | Good long-term direction |
| Tokens | E — Copy to project, no tokens | N/A — user edits source | Full control, no contract | **For theme files only** |

The recommendations compose naturally:

- **Component CSS** → Option B (component JS import). Unused components = no CSS. MUI maintains the files.
- **Theme token files** → Option F (copy to project). Users own and edit `base-theme.css` / `material-theme.css` directly. Treated as a well-commented starting point, not a versioned API.
- **Component-level customisation** → Option B/D for tokens (global + essential knobs, `@layer` as escape hatch). Component tokens remain necessary even when theme files are copied, because users should not need to know MUI's internal class names to adjust a slider's track size.
