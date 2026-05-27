# Spacing-derived dimensions — rollout plan

Roll the spacing-derivation pattern across `packages/mui-material/src/*`, one
component (or tight family) per PR, until every spacing dimension rides
`--mui-spacing`.

- **Decision / why:** [0001-spacing-derived-component-dimensions.md](./0001-spacing-derived-component-dimensions.md)
- **How (the rule + worked examples):** [spacing-derived-dimensions-spec.md](./spacing-derived-dimensions-spec.md)

Done: the **entire input / form family** — Button, OutlinedInput, FilledInput,
InputBase (standard `Input`) + `Input`, all three InputLabel transform sets,
InputAdornment, FormControl margins, FormControlLabel row gaps. Audited-skip
within it: Select/NativeSelect, FormHelperText, FormLabel.

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
- [x] ~~FormControl (margin dense/normal), FormControlLabel, FormHelperText, FormLabel~~ ✅ Done — FormControl normal `16/8` → `spacing(2)`/`spacing(1)`, dense `8/4` → `spacing(1)`/`spacing(1)−4px` (static styled → `memoTheme`). FormControlLabel row gaps `16` → `spacing(2)`; `−11` stays literal (compensates control icon-button padding). FormHelperText **skip**: `marginTop 3/4` micro typographic gaps (deriving 4 would invert vs the 3 medium), `marginLeft/Right 14` align to input inline → literal. FormLabel **skip**: only `padding: 0`.

**Input / form family complete.** Skipped within it: Select/NativeSelect (icon
geometry), FormHelperText + FormLabel (micro-gaps / input-anchored / `padding: 0`).

### Buttons & actionable controls

- [x] ~~IconButton~~ ✅ Done — padding `8/5/12` → `spacing(1)` / `spacing(1)−3px` / `spacing(2)−4px`. `fontSize` (icon size) + edge `−12/−3` margins (alignment compensation anchored to padding/icon) stay literal.
- [x] ~~ButtonBase~~ ✅ Done — **skip**: only `padding: 0` / `margin: 0` resets.
- [x] ~~ButtonGroup~~ ✅ Done — **skip**: `marginLeft/Top: -1` are border-overlap geometry, `minWidth: 40` is sizing; no padding/gap.
- [x] ~~Fab~~ ✅ Done — extended inline padding `0 16px`/`0 8px` → `0 spacing(2)` / `0 spacing(1)`. Circular FAB + all width/height/minWidth/borderRadius are geometry (literal).
- [x] ~~Chip~~ ✅ Done — **skip**: height `32/24` is geometry-fixed, block padding `0`; inline padding `12/8` is an anchored coupled system (avatar/icon/delete offsets reference it). Density on Chip needs a geometry→spacing pass (height), out of this rule's scope.
- [x] ~~ToggleButton / ToggleButtonGroup~~ ✅ Done — ToggleButton padding `11/7/15` → `spacing(1)+3px` / `spacing(1)−1px` / `spacing(2)−1px`. ToggleButtonGroup **skip**: only `-1` border-overlap margins.
- [x] ~~Tab~~ ✅ Done — padding `12px 16px` → `spacing(2)−4px spacing(2)`; labelIcon `paddingTop/Bottom 9` → `spacing(1)+1px`; stacked-icon margin `6` → `spacing(1)−2px` (start/end icon margins were already `spacing(1)`). One jsdom computed-style test → `skipIf(isJsdom())` (calc).
- [x] ~~BottomNavigationAction~~ ✅ Done — inline padding `12` → `spacing(2)−4px`; unselected `paddingTop 14` → `spacing(2)−2px`. minWidth/maxWidth geometry.
- [x] ~~SpeedDialAction~~ ✅ Done — fab `margin 8` → `spacing(1)`; static-tooltip `marginLeft/Right 8` → `spacing(1)`; label `padding 4px 16px` → `spacing(1)−4px spacing(2)`. Verified by construction + unit tests (SpeedDial is position-fixed, doesn't isolate in the harness scope).
- [x] ~~Pagination / PaginationItem~~ ✅ Done — Pagination root **skip** (`padding/margin: 0`). PaginationItem inline padding `6/4/10` → `spacing(1)−2px` / `−4px` / `+2px` (both text + outlined blocks); inter-item margins `3/1` + page-icon `−8` stay literal. Fixed `height/minWidth` = geometry (like Fab-extended: horizontal padding scales, height doesn't).

### Lists & menus

- [x] ~~List / ListSubheader~~ ✅ Done — List `paddingTop/Bottom 8` → `spacing(1)` (static styled → `memoTheme`). ListSubheader **skip**: only inline `16/72` (horizontal coupled).
- [x] ~~ListItem / ListItemButton / ListItemAvatar / ListItemIcon / ListItemText~~ ✅ Done — **vertical only** (the list family's inline `16` ↔ icon width `56/36` ↔ inset `72/56` is an anchored horizontal system, kept literal). Block paddings `8` → `spacing(1)`, dense `4` → `spacing(1)−4px`; ListItemText margins `4/6` → `spacing(1)−4px`/`−2px`; Avatar/Icon flex-start `marginTop 8` → `spacing(1)`. ListItemAvatar/ListItemText were static → `memoTheme`.
- [x] ~~MenuItem~~ ✅ Done — block `paddingTop/Bottom 6` → `spacing(1)−2px`, dense `4` → `spacing(1)−4px`. Inline `16/36/52` + minHeight stay literal (horizontal/geometry); divider margins were already `spacing(1)`.
- [x] ~~Autocomplete~~ ✅ Done — dropdown block paddings (listbox `8`, option `6`, loading/noOptions `14`) → spacing-based. Input-integration (static root → `memoTheme`): **block only** across outlined/filled/standard × sizes × hiddenLabel; the padding **redistribution** preserved (outlined root `9` + inner `7.5` → `spacing(1)+1px` + `spacing(1)−0.5px`, sums to the OutlinedInput total). All inline kept literal — icon-anchored reservation (`paddingRight 26+4+9`, `endAdornment right: 9`, indicator paddings `4/2`). Verified field pixel-identical across all variants; dropdown via unit tests.

### Surfaces & containers

- [x] ~~Accordion / AccordionSummary / AccordionActions~~ ✅ Done — Accordion expanded `margin 16` → `spacing(2)`; Summary content margin `12/20` → `spacing(2)−4px` / `spacing(3)−4px`; Actions `padding/marginLeft 8` → `spacing(1)` (static → `memoTheme`). Summary padding + AccordionDetails were already `theme.spacing`.
- [x] ~~Alert / AlertTitle~~ ✅ Done — root `6px 16px` → `spacing(1)−2px spacing(2)`; icon/message/action paddings + icon `marginRight 12` → spacing-based (all vertical derived together so they stay centered); action `marginRight −8` → `spacing(-1)` (tracks IconButton padding). Icon/Message/Action static → `memoTheme`. AlertTitle `marginTop −2` literal (sub-unit).
- [x] ~~Dialog / DialogTitle / DialogContent / DialogActions~~ ✅ Done — Title `16px 24px` → `spacing(2) spacing(3)`; Content `20px 24px` → `spacing(3)−4px spacing(3)`, dividers `16px 24px` → `spacing(2) spacing(3)`; Actions `padding/marginLeft 8` → `spacing(1)`. **Dialog root skip**: paper `margin 32` is coupled to static media-query breakpoints (`+ 32*2`, can't use CSS vars) — deriving would desync margin from the breakpoint thresholds. Title/Actions static → `memoTheme`.
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
