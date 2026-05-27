# Spacing-derived dimensions — rollout plan

Roll the spacing-derivation pattern across `packages/mui-material/src/*`, one
component (or tight family) per PR, until every spacing dimension rides
`--mui-spacing`.

- **Decision / why:** [0001-spacing-derived-component-dimensions.md](./0001-spacing-derived-component-dimensions.md)
- **How (the rule + worked examples):** [spacing-derived-dimensions-spec.md](./spacing-derived-dimensions-spec.md)

Done: **Button**, **OutlinedInput**, **InputLabel (outlined)**, **FilledInput +
InputLabel (filled)**, **InputBase (standard `Input`)**.

## Requirement (per component)

For every **spacing** value (padding / margin / gap / row-column-gap, and any
transform offset that positions content relative to padding):

1. Convert to `calc(theme.spacing(N) ± offsetpx)`, `N = round(px/8)` integer,
   offset for a **pixel-identical default**. Offset `0` → bare `theme.spacing(N)`.
2. Keep the value's relationships intact (border `−1px` comps, label/anchor
   transforms tracking their controlled element).
3. Touch nothing else — no public vars, no visual change at the default theme.

## Edge cases (check every component against these)

- **Horizontal / anchored coupling.** Keep a horizontal value **literal** when
  something is anchored to it. The outlined notch is the loud case, but the
  **filled and standard label x also align to the input's inline padding** — so
  inputs and their labels keep inline/x literal (derive vertical only).
  Re-evaluate per component; ones with no anchored horizontal relationship
  (Button) derive both axes.
- **Not spacing → leave literal:** `em`/`rem` line-boxes, icon/avatar sizes,
  `border-width`, `border-radius`, `scale()`, `translate` used for motion/flip,
  rail/thumb/track geometry.
- **Sub-unit values (< 4px).** `round(px/8) = 0` → keep the px literal (don't
  write `spacing(0) ± x`), unless it's part of a scaling family (then express
  relative, e.g. `contained − 1px`).
- **Fractional offsets** (`+ 0.5px`, inputs) are fine.
- **Asymmetric block padding** (e.g. FilledInput `25` top / `8` bottom) — derive
  each side independently; the matching InputLabel transform tracks the top.
- **Floating-label transforms** track their input on the **y-axis** (x stays
  literal). Resting y tracks the input's block padding. Shrunk y is **literal if
  the label floats onto a border** (outlined) but **tracks the input if it
  floats into reserved padding** (filled — and expect a growing gap at high
  density unless the coefficient is tuned). Verify the shrunk state with a
  valued/focused field — an empty field only shows the resting label.
- **Mixed shorthand** — block derived, inline literal → `` `calc(…) 14px` ``.
- **default-prop margins** (e.g. `FormControl` `margin="dense|normal"`) are
  spacing — convert them too.
- **Geometry-only components** (Switch, Slider, LinearProgress, Skeleton,
  Divider) — likely nothing to convert; confirm and skip.

## How to verify (every PR — local, no Argos)

Argos per-component is too slow. Verify locally with the screenshot harness
(`scripts/spacing-screenshots/` — a Playwright test using its built-in pixel
comparator, no extra deps). Screenshots land in `spacing-screenshots/<Component>/`
(gitignored) for your review. Requires `pnpm docs:dev` running.

1. Add the component's load-bearing matrix (variants × sizes, adornment,
   multiline) to the `spacing-fixture` route's demo map. For floating-label
   components, include a **valued/focused field** so the shrunk label is visible.
2. **Baseline (before):** on the _unconverted_ component,
   `COMPONENT=<C> pnpm spacing:shot:update` — writes the "before" baseline
   (`baseline-default.png`).
3. Implement the spacing-derivation.
4. **Assert + density (after):** `COMPONENT=<C> pnpm spacing:shot` —
   - asserts the default render is **pixel-identical to the baseline**
     (`toHaveScreenshot`, `maxDiffPixels: 0`); a mismatch ⇒ a wrong offset, and
     a diff image is written to `test-results/`. **This is the regression gate.**
   - writes `after-6px.png` / `after-10px.png` (`--mui-spacing` set inline on the
     fixture scope) for review.
5. **Density review (human):** eyeball `after-6px` / `after-10px` for reflow and
   anchored/notch alignment — new behavior, not assertable.
6. Unit tests green (`pnpm test:unit run <paths>` — browser **and** node),
   `eslint`, `prettier`, `tsc`. No jsdom assertion on computed padding px.

> Pixel-identical at default is also true by construction (`calc(8px − 2px) ≡ 6px`); step 4's diff is the belt-and-suspenders catch for a mistyped offset.

## Component checklist

### Next set — input / form family (completes TextField)

- [x] ~~FilledInput (input md/sm incl. `25/8` label-space, adornments, multiline)~~ ✅ Done
- [x] ~~InputBase (standard `Input`: `4px 0 5px`, small, multiline)~~ ✅ Done — block only (`spacing(1)−4px` / `−3px`), 1px small nudge stays literal; inline already `0`. Standard label tracking ⇒ InputLabel item.
- [x] ~~Input~~ ✅ Done — only spacing is the standard label-gap `marginTop: 16` → `spacing(2)`.
- [x] ~~NativeSelect / Select (`paddingRight 24/32`)~~ ✅ Done — **skip**: `paddingRight 24/32` reserves space for the fixed 24px arrow icon (absolutely positioned, `right: 0/7`) → icon-anchored horizontal geometry, not density; block padding comes from the wrapping input variant. `minWidth 16` / icon `top: calc(50% − .5em)` are geometry.
- [x] ~~InputAdornment~~ ✅ Done — filled start `marginTop: 16` → `spacing(2)` (tracks the filled label-space, verified with a valued field). `marginRight/marginLeft: 8` stay **literal** — horizontal, part of the input's inline layout which the whole family keeps literal.
- [x] ~~InputLabel — **filled** + **standard** transform sets (track their input)~~ ✅ Done — filled with FilledInput; standard resting y → `spacing(3) − 4px` (md) / `spacing(2) + 1px` (sm), tracking `Input` marginTop + `InputBase` paddingTop. Shrunk `-1.5px` floats above the field → literal.
- [ ] FormControl (margin dense/normal), FormControlLabel, FormHelperText, FormLabel

### Buttons & actionable controls

- [ ] IconButton
- [ ] ButtonBase
- [ ] ButtonGroup
- [ ] Fab
- [ ] Chip
- [ ] ToggleButton / ToggleButtonGroup
- [ ] Tab
- [ ] BottomNavigationAction
- [ ] SpeedDialAction
- [ ] Pagination / PaginationItem

### Lists & menus

- [ ] List / ListSubheader
- [ ] ListItem / ListItemButton / ListItemAvatar / ListItemIcon / ListItemText
- [ ] MenuItem
- [ ] Autocomplete

### Surfaces & containers

- [ ] Accordion / AccordionSummary / AccordionActions
- [ ] Alert / AlertTitle
- [ ] Dialog / DialogTitle / DialogContent / DialogActions
- [ ] Card — CardHeader / CardContent / CardActions
- [ ] SnackbarContent
- [ ] Tooltip
- [ ] Breadcrumbs
- [ ] MobileStepper

### Steppers, tables, misc layout

- [ ] Stepper / Step / StepButton / StepLabel / StepContent / StepConnector
- [ ] TableCell / TablePagination / TableSortLabel
- [ ] ImageList / ImageListItemBar
- [ ] AvatarGroup
- [ ] Link
- [ ] Badge (audit: `translate` offsets are geometry, not spacing)

### Audit & likely skip (geometry, not spacing density)

- [ ] Switch — thumb/track geometry
- [ ] Slider — rail/thumb/mark geometry
- [ ] LinearProgress
- [ ] Skeleton
- [ ] Divider
- [ ] Typography (margin resets — confirm)
- [ ] CssBaseline / internal
