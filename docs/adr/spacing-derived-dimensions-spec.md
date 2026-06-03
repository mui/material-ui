# Spacing-derived dimensions — replication spec

How to convert a component's hardcoded px dimensions to spacing-derived values.
Follow this for the next set (FilledInput, standard `Input`, `Select`,
multiline, …). Decision + rationale: [0001](./0001-spacing-derived-component-dimensions.md).

## The rule

For each **spacing** px value `P` (padding / margin / gap / label offset):

1. `N = round(P / 8)` — nearest whole unit (integer).
2. `offset = P − 8 * N`.
3. Write `` `calc(${theme.spacing(N)} - <|offset|>px)` `` (or `+`) when
   `offset !== 0`; otherwise `` `${theme.spacing(N)}` `` (no `calc`).
4. Verify it resolves to `P` at the default (`spacing(1) = 8px`).

Relationship rules:

- **Outlined = contained − 1px** (border compensation), e.g. Button outlined
  block `5 = 6 − 1`.
- **Horizontal stays literal where x is anchored.** Keep inline padding,
  adornment paddings, and label `transformX` **literal** whenever something is
  horizontally anchored to the input's inline padding. The outlined notch
  (`<legend>`, fixed left inset) is the obvious break — but the **filled and
  standard labels also align their x to inline padding**, so keep their x
  literal too. For inputs and their labels, only the **block / y-axis** derives.
  Components with no anchored horizontal relationship (Button) derive **both**.
- **Floating-label y tracks the input — but the shrunk state splits by where it
  floats:**
  - **resting** y → tracks the input's block padding (the value position).
  - **shrunk** y → **literal if it floats onto a border** (outlined: the floated
    label sits on the border line, which padding doesn't move). **Tracks the
    input if it floats into reserved padding** (filled: into the top padding).
    Filled shrunk is the tricky one — tracking one unit while `paddingTop` tracks
    three leaves a growing gap at high density; tune the coefficient and **verify
    with a valued/focused field** (an empty field only shows the resting label).

Leave untouched (not spacing): `em` line-boxes, `border-radius`,
`border-width`, `scale()`, NotchedOutline notch padding, and horizontal
(inline/x) values on inputs + their labels.

## Choosing `N` — the step coefficient

Once a value is written as `calc(<literal> + theme.spacing(N))`, **N is the
step coefficient**: each 1px change in `--mui-spacing` shifts that value by
N px. So N is not just "the closest multiple of 8" — it's a design knob for
how fast that element scales with density.

**Rule of thumb: N reflects the size/role of the element.**

- **Larger / container-like elements → larger N.** A medium-sized container
  (Button padding, Chip height) typically uses `N = 2` (+2px per spacing unit),
  so the container visibly responds to density.
- **Smaller / inner elements → smaller N.** Inner glyphs inside a container
  (Chip avatar/icon/deleteIcon `width`/`height`/`fontSize`) typically use `N = 1`
  (+1px per spacing unit), so they scale gently and don't outgrow their parent.
- **The result:** at high density the container grows faster than its contents,
  so inner gaps grow rather than shrink (avatars don't overflow); at low density
  the container shrinks faster than its contents, but a separate **min-clamp**
  prevents inner offsets from going negative — see below.

Choosing N this way trades two competing goals:

1. **Default fidelity** — `calc(<literal> + spacing(N))` must equal the original
   px at `--mui-spacing = 8` (the math constraint).
2. **Density behavior** — at non-default densities, smaller N keeps proportions
   tighter, larger N makes the element more density-responsive.

Pick the smallest N that still gives meaningful response. For sub-unit values
(`< 4px`) that are **load-bearing in a coupled system** (e.g. Chip's `5/-6/4`
offsets), prefer `N = 1` with a px offset (`calc(spacing(1) - 3px)`) — this
keeps the value scaling at the gentlest rate, matching the surrounding inner
elements.

### Clamp inner-margin negatives at `0`

Compensation negatives like `calc(spacing(1) - 3px)` go _negative_ when
`--mui-spacing < 3` (would pull the inner element past the container edge).
Wrap them in `max(…, 0px)` to clamp:

```js
marginLeft: `max(calc(${theme.spacing(1)} - 3px), 0px)`;
```

At default the `max()` is a no-op (5px stays 5px). At ultra-low density it
prevents the negative shift. Use this for inner-positive offsets that must
not go negative (Chip avatar/icon `marginLeft`, deleteIcon `marginRight`).
Compensation negatives that _should_ stay negative (FormControlLabel `-11`
cancelling IconButton padding) don't need the clamp — they're meant to be
negative at every density.

## Worked examples (this PR)

### Button (`theme.spacing(1)=8`, `(2)=16`, `(3)=24`)

| variant   | size | block                  | inline                  |
| :-------- | :--- | :--------------------- | :---------------------- |
| contained | md   | `spacing(1) − 2px` (6) | `spacing(2)` (16)       |
| contained | sm   | `spacing(1) − 4px` (4) | `spacing(1) + 2px` (10) |
| contained | lg   | `spacing(1)` (8)       | `spacing(3) − 2px` (22) |
| text      | md   | `spacing(1) − 2px` (6) | `spacing(1)` (8)        |
| text      | sm   | `spacing(1) − 4px` (4) | `spacing(1) − 3px` (5)  |
| text      | lg   | `spacing(1)` (8)       | `spacing(1) + 3px` (11) |
| outlined  | \*   | contained − 1px        | contained − 1px         |

Button has no notch, so both axes derive.

### OutlinedInput

| target                    | value                       |
| :------------------------ | :-------------------------- |
| input block, md           | `spacing(2) + 0.5px` (16.5) |
| input block, sm           | `spacing(1) + 0.5px` (8.5)  |
| input inline + adornments | `14px` — literal (notch)    |

### InputLabel (outlined)

| state       | transform                                 |
| :---------- | :---------------------------------------- |
| resting, md | `translate(14px, spacing(2))` — x literal |
| resting, sm | `translate(14px, spacing(1) + 1px)`       |
| shrunk      | `translate(14px, −9px)` — fully literal   |

### InputLabel (standard) — x stays `0`

Resting y tracks the standard input's text top = `Input` `marginTop`
(`spacing(2)`) + `InputBase` `paddingTop`:

| state       | transform                                      |
| :---------- | :--------------------------------------------- |
| resting, md | `translate(0, spacing(3) − 4px)` (20)          |
| resting, sm | `translate(0, spacing(2) + 1px)` (17)          |
| shrunk      | `translate(0, −1.5px)` — floats above, literal |

### FilledInput + InputLabel (filled) — block only, x literal

Input block padding (top / bottom); inline `12` + adornments stay literal:

| state          | top                     | bottom                  |
| :------------- | :---------------------- | :---------------------- |
| md             | `spacing(3) + 1px` (25) | `spacing(1)` (8)        |
| sm             | `spacing(3) − 3px` (21) | `spacing(1) − 4px` (4)  |
| hiddenLabel md | `spacing(2)` (16)       | `spacing(2) + 1px` (17) |
| hiddenLabel sm | `spacing(1)` (8)        | `spacing(1) + 1px` (9)  |

Filled label `transformY` (x stays `12px`):

| state       | y                                                            |
| :---------- | :----------------------------------------------------------- |
| resting, md | `spacing(2)` (16)                                            |
| resting, sm | `spacing(2) − 3px` (13)                                      |
| shrunk, md  | `spacing(1) − 1px` (7) — floats _into_ padding, so it tracks |
| shrunk, sm  | `spacing(1) − 4px` (4)                                       |

### InputBase (standard `Input`) — block only, inline already `0`

Root-multiline + input share `4px 0 5px`. No inline padding ⇒ nothing anchored,
but the variant has no notch either — still derive **block only** (the `0`
inline is already density-free):

| target                    | value                            |
| :------------------------ | :------------------------------- |
| block top                 | `spacing(1) − 4px` (4)           |
| block bottom              | `spacing(1) − 3px` (5)           |
| small `paddingTop`        | `1px` — literal (sub-unit nudge) |
| multiline input `padding` | `0` — unchanged                  |

The standard `InputLabel` transforms track this in their own rollout item.

### Surrounding form components

| component        | value                          | derivation                            |
| :--------------- | :----------------------------- | :------------------------------------ |
| FormControl      | normal `marginTop 16`          | `spacing(2)`                          |
| FormControl      | normal `marginBottom 8`        | `spacing(1)`                          |
| FormControl      | dense `marginTop 8`            | `spacing(1)`                          |
| FormControl      | dense `marginBottom 4`         | `spacing(1) − 4px`                    |
| FormControlLabel | row gaps `marginRight/Left 16` | `spacing(2)`                          |
| FormControlLabel | `marginLeft/Right −11`         | literal — compensates control padding |
| FormHelperText   | `marginTop 3/4`, inline `14`   | literal — micro-gap / input-anchored  |
| InputAdornment   | filled start `marginTop 16`    | `spacing(2)` (tracks label-space)     |

FormControl's root was a static styled object — wrap it in `memoTheme(({ theme })
=> …)` to reach `theme.spacing`.

## Verification

Use the local harness (`scripts/spacing-screenshots/`) — see the rollout plan's
"How to verify". Default render must be **pixel-identical** to the pre-change
baseline (`toHaveScreenshot`, `maxDiffPixels: 0`); review 6px/10px shots for
density. For floating-label components, put a **valued field** in the fixture so
the shrunk label is visible. Unit tests (vitest, browser + node) green; lint,
prettier. No jsdom assertion on computed padding px.
