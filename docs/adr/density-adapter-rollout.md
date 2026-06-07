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
padding: 'var(--Button-pad, var(--_pad))'
```

Resolution = **sized-only**. Sized token wins -> else internal default. No
all-sizes base token.

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
   const densityVars = ['small','medium','large'].includes(size)
     ? undefined
     : { '--Button-pad': `var(--Button-${size}-pad, var(--_pad))` };
   ```
5. `enhanceDensity` maps `--Button-<size>-pad` -> `--mui-density-*` step.

## Recipe B — big component (OutlinedInput)

Padding spans 2 elements (root when multiline, input otherwise) + paired sibling
(InputLabel). More dimensions but token model is *simpler*.

**Pick real axis.** Input density = vertical only. Material's own `small` only
changes block (`16.5 -> 8.5`); `14px` inline gutter constant -> stays literal.
Tokenize `padBlock`, not `pad`.

**Two elements, one source via inheritance.** Root owns routing + `--_padBlock`.
Input is child -> consumes resolved `--OutlinedInput-padBlock` by inheritance. No
duplicated size logic.

```js
// root base
'--_padBlock': '16.5px',
'--OutlinedInput-padBlock': 'var(--OutlinedInput-medium-padBlock, var(--_padBlock))',
// root { size: small } -> --_padBlock 8.5px + route to small token
// input: padding: 'var(--OutlinedInput-padBlock, var(--_padBlock)) 14px'
// root multiline: padding: 'var(--OutlinedInput-padBlock) 14px'
```

Var carries size -> redundant `multiline && small` + input `size: small`
variants gone. Same pixels, fewer rules.

**Paired sibling component (the label).** Generic component must not name
specific component token. Label exposes own seam:

```js
// InputLabel — generic, literal default
transform: 'translate(14px, var(--InputLabel-y, 16px)) scale(1)' // small: 9px
```

Specific component owns bridge. Label = *preceding* sibling -> reach via `:has`:

```js
// OutlinedInputRoot, per size
[`.${inputLabelClasses.root}:has(~ &)`]: {
  '--OutlinedInput-padBlock': 'var(--OutlinedInput-medium-padBlock, 16.5px)',
  '--InputLabel-y': 'calc(var(--OutlinedInput-padBlock) - 0.5px)', // small: + 0.5px
}
```

One knob (`--OutlinedInput-<size>-padBlock`) -> input box + label move together.

## Gotchas

- **Two vars, not one.** Cells write value (`--_pad`), routing writes reference
  (`--Button-pad`). One var fails 3 ways: inline bridge self-references (invalid
  CSS) -> literal leaks to runtime; `(variant×size)` vs size-only writes clobber
  on one element; lose the seam.
- **Unprefixed `--_<key>` safe only if every instance sets own.** Custom prop
  inherits. Co-located setter (Button) or every root re-sets (OutlinedInput) ->
  ancestor value never wins. Else prefix it.
- **Sibling can't inherit.** Sibling vars need common ancestor. Specific
  component reaches sibling via `:has(~ &)`. Note: `+`/`~` match *following*
  siblings only -> `:has` makes the *earlier* element the subject.
- **One element can't see another's internal var.** Label can't read input-root
  `--_padBlock`. Reference **public** token (visible at `:root`) + literal
  fallback. Never the internal var across elements.
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
- Key granularity = component's real spacing structure. Tune-all-sides ->
  shorthand. One axis -> that axis only.

## Order to roll out

Small single-element first (prove pattern) -> bigger multi-element -> paired
sibling family. Done: Button, OutlinedInput (+ InputLabel, TextField outlined).
Next candidates: FilledInput, Input (standard) — note asymmetric block padding
(`4/5`, `25/8`) -> need per-side seam, not single `padBlock`.
