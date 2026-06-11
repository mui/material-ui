# Density adapter — rollout goal

Spread CSS-var density adapter to more components. Decision/spec: `0001-css-var-density-adapter.md`.

**Goal:** each density dimension = one hand-authorable CSS var. Default render
pixel-identical to today. No `calc` math for users, no `--mui-spacing` dial.

## The 3 vars (per density axis)

```text
--Component-<size>-<key>   public sized token  (designer knob, enhanceDensity target)
--Component-<key>          agnostic seam       (styled root consumes this)
--_<key>                   internal default    (Material literal, lives in variants)
```

Root consumes seam, seam falls to internal default:

```js
padding: 'var(--Button-pad, var(--_pad))';
```

Resolution = **sized-only** for a size-varying axis. Sized token wins -> else
internal default. No all-sizes-over-sized base token.

**Size-invariant default ≠ base token.** If an axis's default is the same every
size (e.g. OutlinedInput inline `14px`) you _can_ skip the size layer — base
token `--Component-<key>`, consumed `var(--Component-<key>, var(--_<key>))`,
nothing routes it. But only when per-size override is genuinely meaningless,
because a **base token can't be tuned per size from the theme**. If a design
system might want that axis denser on small (density!), **size it anyway**: same
default both sizes, but expose `--Component-<size>-<key>`. OutlinedInput sizes
_both_ padBlock and padInline for this reason (inline default `14px` each size).

**Boolean `dense` axis (state token).** When compactness is a **boolean** prop
(`dense`) not a `size` enum, don't name the off-state. The **default state is the
plain seam** `--Component-<key>` (base-token-shaped: nothing routes it in the
base; designer sets it directly); **only `dense` is qualified**
`--Component-dense-<key>`, routed in the `dense` variant:

```js
// base: default state = plain seam, falls to the internal default literal
'--_padBlock': '8px',
paddingTop: 'var(--ListItem-padBlock, var(--_padBlock))',
// { dense } variant: own literal + route the dense token
'--_padBlock': '4px',
'--ListItem-padBlock': 'var(--ListItem-dense-padBlock, var(--_padBlock))',
```

No `--Component-normal/regular/default-<key>` — a boolean has no name for "off".
(MenuItem, ListItem, ListItemButton, ListItemText.)

## Recipe A — small component (Button)

One element. `pad` shorthand (all sides move together).

1. Root: universal default + consume.
   ```js
   '--_pad': '6px 16px',
   padding: 'var(--Button-pad, var(--_pad))',
   ```
2. Variants — literal default per `(variant, size)`.
   ```js
   { props: { variant: 'text', size: 'small' }, style: { '--_pad': '4px 5px' } }
   // medium defaults reuse the { variant } blocks (DRY)
   ```
3. Variants — built-in size routing (deduped CSS, no inline).
   ```js
   { props: { size: 'small' }, style: { '--Button-pad': 'var(--Button-small-pad, var(--_pad))' } }
   ```
4. Custom size -> route inline (only non-built-in size emits a `style` attr).
   ```js
   const densityVars = ['small', 'medium', 'large'].includes(size)
     ? undefined
     : { '--Button-pad': `var(--Button-${size}-pad, var(--_pad))` };
   ```
5. `enhanceDensity` maps `--Button-<size>-pad` -> `--mui-density-*` step.

## Recipe B — big component (OutlinedInput)

Padding spans 2 elements (root when multiline, input otherwise) + paired sibling
(InputLabel). More dimensions but token model is _simpler_.

**Pick real axis + shape.** Block (`16.5 -> 8.5`) varies by size -> **sized**
`padBlock`. Inline default is `14px` both sizes, but a design system may want
per-size inline density -> **size it too** (`padInline`, same `14px` default each
size). Both axes sized, routed per size. Split block/inline forced: they land on
different elements/states + zero per adornment.

**Two elements, tokenize in place.** Padding lives on the input (non-multiline,
inline gutters) _and_ the root (multiline, adornment gutters) — never both on the
same side at once (multiline zeroes input padding; an adorned side zeroes the
input and gutters from the root). Keep master's split: each site declares its own
`--_<key>` + routes the size token, right where the literal was. No lift to a
single owner, no inheritance, no dropped variants — smallest diff from master.

```js
// input base + root multiline cell:
'--_padBlock': '16.5px',
'--_padInline': '14px',
'--OutlinedInput-padBlock': 'var(--OutlinedInput-medium-padBlock, var(--_padBlock))',
'--OutlinedInput-padInline': 'var(--OutlinedInput-medium-padInline, var(--_padInline))',
padding: 'var(--OutlinedInput-padBlock, var(--_padBlock)) var(--OutlinedInput-padInline, var(--_padInline))',
// each size-small cell re-routes its axis to the small token:
//   input { size: small } -> padBlock + padInline small (input owns both)
//   root  { multiline && small }            -> padBlock + padInline small
//   root  { startAdornment/endAdornment && small } -> padInline small (gutter)
```

Cost of sizing inline in place: the size-agnostic adornment gutters need a small
re-route, so each adornment variant gains a `&& size === 'small'` sibling. Cheap
(one line each), and keeps both axes wired identically (no lift).

**Paired sibling component (the label).** Generic component must not name
specific component token. Label exposes own seam:

```js
// InputLabel — generic, literal default
transform: 'translate(14px, var(--InputLabel-y, 16px)) scale(1)'; // small: 9px
```

Specific component owns bridge. Label = _preceding_ sibling -> reach via `:has`.
Cross-element rule -> derive the label seam straight from the **public sized
token** + literal fallback (can't read the input's internal `--_padBlock`):

```js
// OutlinedInputRoot, per size
[`.${inputLabelClasses.root}:has(~ &)`]: {
  '--InputLabel-y': 'calc(var(--OutlinedInput-medium-padBlock, 16.5px) - 0.5px)', // small: small token + 0.5px
}
```

One knob (`--OutlinedInput-<size>-padBlock`) -> input box + label move together.

## Recipe C — shared internal base (SwitchBase -> Checkbox / Radio / Switch)

Several components share one styled base. Put the **agnostic layer on the base**:
it consumes the seam once, with the internal default. Each consumer is the
**Material layer** -> routes its _own_ per-component public token into the shared
seam.

```js
// SwitchBase (shared, agnostic): consume once
'--_pad': '9px',
padding: 'var(--SwitchBase-pad, var(--_pad))',
```

The seam keeps the **base's** name (`--SwitchBase-pad`) — it's plumbing; the
public knob is the per-component sized token (`--Checkbox-<size>-pad`).

Two reader topologies:

- **Consumer _is_ the base** (Checkbox/Radio = `styled(SwitchBase)`): route on
  the consumer's own root, same element, no selector.
  ```js
  { props: { size: 'small' }, style: { '--SwitchBase-pad': 'var(--Checkbox-small-pad, var(--_pad))' } }
  ```
- **Consumer _wraps_ the base** as a descendant (the Switch thumb is a
  `SwitchBase` inside `SwitchRoot`): set the seam on the wrapper root — the base
  **inherits** it. No descendant selector (custom props inherit; the base doesn't
  redeclare the seam).
  ```js
  // SwitchRoot: thumb inherits this
  '--SwitchBase-pad': 'var(--Switch-medium-pad, var(--_pad))',
  ```

**Inheritance caveat.** The _seam_ inherits because the base doesn't redeclare it.
But the base **does** redeclare `--_<key>` (that's what keeps it unprefixed-safe),
so an inherited `--_<key>` is _shadowed_ on the base. A wrapper that needs a value
different from the base's feeds it **through the seam** — set the seam directly on
the wrapper, not the shadowed `--_<key>`.

**Interlocked geometry -> derive, don't tokenize one axis.** When a component's
dims move together (a `Switch`: width/height/thumb/touch/travel), tokenizing one
(the thumb pad) alone drifts the thumb off the track. Tokenize the real dims per
size (incl. the track gutter `pad`) and **derive** the coupled values with `calc`,
feeding the seam:

```js
// SwitchRoot, per size: --Switch-<size>-{width,height,thumbSize,touchSize,pad}
padding: 'var(--Switch-pad, var(--_pad))', // track gutter (own axis)
'--SwitchBase-pad': 'calc((var(--Switch-touchSize) - var(--Switch-thumbSize)) / 2)',
// thumb button (absolute): keep it centered
top: 'calc((var(--Switch-height) - var(--Switch-touchSize)) / 2)',
// checked: travel = width - touch
transform: 'translateX(calc(var(--Switch-width) - var(--Switch-touchSize)))',
```

`touchSize == height` by default -> pad `9/4`, top `0`, travel `20/16`
(pixel-identical). `enhanceDensity` can still wire it: map the input dims to scale
steps and the derived values stay valid (Switch uses `xxl` for the wider track).

## Gotchas

- **Split axes only when the impl forces it.** Differing values per side is NOT
  enough. If all sides are set together via one shorthand on one element, keep one
  key — Button uses `pad` even though block 6 ≠ inline 8. Split per axis
  (`padBlock`/`padInline`) only when the impl applies them separately: different
  elements/states (OutlinedInput block on input vs root-multiline), independent
  side-zeroing (adornments), or different token shapes (sized block + base inline).
  OutlinedInput is forced; Button is not. Don't over-tokenize.
- **Two vars, not one.** Cells write value (`--_pad`), routing writes reference
  (`--Button-pad`). One var fails 3 ways: inline bridge self-references (invalid
  CSS) -> literal leaks to runtime; `(variant×size)` vs size-only writes clobber
  on one element; lose the seam.
- **Uniform consume shape — every axis.** Always `var(--Component-<key>,
var(--_<key>))`, including a size-invariant **base** axis. Two real mistakes to
  avoid: (a) **bare literal default** for a base axis (`var(--seam, 14px)`) —
  instead define `--_<key>` (e.g. `--_padInline: 14px`) so the default lives in
  one place and the shape matches sized axes; (b) **dropping a fallback because
  the seam "is always set"** — keep it; the uniform shape is the contract (Button
  `var(--Button-pad, var(--_pad))`; a sized axis carries `--_<key>` in _both_ the
  routing and the consume — that double-reference is intentional). Consistency
  over minimalism.
- **Unprefixed `--_<key>` safe only if every instance sets own.** Custom prop
  inherits. Co-located setter (Button) or every root re-sets (OutlinedInput) ->
  ancestor value never wins. Else prefix it.
- **Sibling can't inherit.** Sibling vars need common ancestor. Specific
  component reaches sibling via `:has(~ &)`. Note: `+`/`~` match _following_
  siblings only -> `:has` makes the _earlier_ element the subject.
- **One element can't see another's internal var.** Label can't read input-root
  `--_padBlock`. Reference **public** token (visible at `:root`) + literal
  fallback. Never the internal var across elements.
- **Inline padding = outer gutter, not the adornment↔input gap.** The inline
  token (`padInline`) is the border→first/last content inset (border→adornment
  when adorned). The adornment↔text gap is the adornment's own margin
  (`InputAdornment` marginRight/Left, ~8px), separate and untouched. Don't read
  the gutter as the gap, and don't expect tokenizing it to move that gap.
- **Check if component defaults `size`.** Most components destructure a default
  (Button: `size = 'medium'`) -> `ownerState.size` always valid -> `{ size: medium }`
  variant matches, fine. But context-driven ones (InputBase/OutlinedInput read
  `size` from FormControl, **no** default) -> `size` can be `undefined` -> put
  medium routing in **base**, not a `{ size: medium }` variant (won't match
  undefined). Tell: does the component have a `{ size: medium }` variant today?
- **Shorthand vs longhand.** Use `padding` shorthand to set block + override
  earlier longhand (e.g. InputBase `paddingTop`); zero sides after with
  `paddingLeft: 0`.
- **Pixel-identical = exact calc.** `calc` must compute today's px exactly
  (`16.5 - 0.5 = 16` exact -> Argos zero-diff). Per-size sign trick when offset
  flips (med `-0.5`, small `+0.5`).
- **`:has()` support** — Chrome 105 / Safari 15.4 / Firefox 121. Fine for
  experiment; confirm baseline before ship.
- **`calc`/`var` resolve in browser only, not jsdom.** Assert density in
  visual/screenshot tests, not unit.

## Verify (per component)

Screenshot harness `scripts/density-screenshots/` (`maxDiffPixels: 0`):

1. Add matrix to `density-fixture.tsx` `demos` (+ token overrides to `scopes`).
2. Baseline from **master** (default unchanged by design):
   `git checkout master -- <files>` -> `COMPONENT=X pnpm density:shot:update` -> restore.
3. `COMPONENT=X pnpm density:shot` -> default == baseline (gate) + dense/loose for eyeball.

## Naming

- Public seam/token: `--Component-<key>` / `--Component-<size>-<key>`. PascalCase
  component, short semantic key (`pad`, `gap`, `padBlock`). Matches `--AppBar-background`.
- Internal: `--_<key>` (leading underscore, no prefix).
- Key granularity = component's real spacing structure. One shorthand key
  (`pad`) when sides set together on one element; split per axis only when forced
  (see gotcha). Per axis: **sized by default** (per-size tunable); base token only
  if per-size override is genuinely meaningless — a size-invariant _default_ alone
  doesn't justify base (size it so density can tune it per size).
- **Boolean toggle (`dense`)** = **state token**: off-state is the plain seam
  `--Component-<key>` (don't qualify it); only the on-state is qualified
  `--Component-dense-<key>`. Never `--Component-normal/regular/default-<key>`.

## Order to roll out

Small single-element first (prove pattern) -> bigger multi-element -> paired
sibling family. Done: Button, OutlinedInput (+ InputLabel, TextField outlined),
the dashboard set (Chip, IconButton, MenuItem, ListItem(+Button/Icon/Text),
ListSubheader, Toolbar, Tab/Tabs, TablePagination, CardContent, Select,
Breadcrumbs, InputAdornment, Badge), and the SwitchBase family (Checkbox, Radio,
Switch — Recipe C). Next candidates: FilledInput, Input (standard) — note
asymmetric block padding (`4/5`, `25/8`) -> need per-side seam, not single
`padBlock`.
