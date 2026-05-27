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
- **Horizontal exception — notch coupling.** For OutlinedInput and the outlined
  InputLabel, keep **inline padding, adornment paddings, and `transformX`
  literal**. The notch (`<legend>`) sits at a fixed left inset; scaling the
  horizontal axis desyncs the value text, the floating label, and the notch
  gap. Only the **block / y-axis** derives there. Components with no notch
  coupling (Button) derive **both** axes.
- **Outlined InputLabel resting y tracks the input block padding**; the shrunk
  (floated) transform stays fully literal — border-relative, not
  padding-relative.

Leave untouched (not spacing): `em` line-boxes, `border-radius`,
`border-width`, `scale()`, NotchedOutline notch padding, and horizontal
(inline/x) values on notch-coupled components.

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

## Verification

- **Argos zero-diff** at the default theme — the acceptance gate.
- Unit tests (vitest, browser + node) green; lint, prettier.
- No jsdom assertion on computed padding px (jsdom can't resolve `calc`).

## Remaining components (next set)

- [ ] FilledInput — input md/sm (incl. `25/8` label-space asymmetry),
      adornments, multiline; InputLabel **filled** transforms track.
- [ ] InputBase (standard `Input`) — `4px 0 5px`, small, multiline;
      InputLabel **standard** transforms track.
- [ ] Select / NativeSelect — `paddingRight 24/32`.
