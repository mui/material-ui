# LinearProgress accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

| Result                | Count |
| :-------------------- | :---- |
| ✅ Supports           | 8     |
| ⚠️ Partially Supports | 3     |
| ❌ Does Not Support   | 0     |
| ➖ Not Applicable     | 44    |
| 🚩 Flagged            | 7/11  |

## Known gaps

- ⚠️ **1.4.11 Non-text Contrast.** The fill-vs-track boundary falls below `3:1` for most palette colors in light mode, including the default `primary` (about `2.7:1`); in dark mode only `error` (`2.77:1`) falls short.
- ⚠️ **2.2.2 Pause, Stop, Hide.** The `indeterminate`, `query`, and `buffer` variants animate indefinitely with no built-in pause, stop, or hide control.
- ⚠️ **4.1.3 Status Messages.** The `progressbar` role is not a live region, so `value` changes are not announced unless the surrounding application adds one.

## Success criteria

### 🔍 Manual

#### 1.3.3 Sensory Characteristics · A

`🚩` · `✅ Supports` · `○ Author`

- The bar carries an author-supplied accessible name, so it can be referenced by name rather than only by shape, color, or position.
- Instructions in the surrounding content must not rely on a sensory characteristic alone (for example, "wait for the moving bar at the top").

**Manual testing steps**

1. Find product copy that tells the user to watch or wait for a progress bar.
2. Check that it names the bar by its label, not only by color, shape, size, or position.

**Pass:** no instruction relies on a sensory characteristic alone.

#### 1.4.10 Reflow · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The root is a block element with no intrinsic or minimum width and a fixed `4px` height, so it takes the width of its container and reflows without adding horizontal scrolling. Overflow at 320 CSS pixels comes from the surrounding layout, such as a fixed-width wrapper.

**Manual testing steps**

1. Open the LinearProgress demos and set the window, or the DevTools device toolbar, to 320 CSS pixels wide.
2. Confirm the bar reflows to the container width with no sideways scrolling.

**Pass:** content reflows with no horizontal scroll.

#### 1.4.11 Non-text Contrast · AA

`🚩` · `⚠️ Partially Supports` · `● Component`

- The determinate fill has to contrast `3:1` with the track for the proportion to be perceivable. For a named `color`, the track is a tint of the bar color (`getColorShade`: `lighten(main, 0.62)` in light mode, `darken(main, 0.5)` in dark mode) and the fill is `palette[color].main`. (`color="inherit"` differs: the fill is `currentColor` and the track is a `currentColor` overlay at `0.3` opacity.)
- Measured against the default theme (the rendered track colors, whose channels MUI truncates), the light-mode fill-vs-track ratio is about `2.70:1` for `primary` and `error`, `2.02:1` for `warning`, `2.35:1` for `info`, and `2.98:1` for `success`; only `secondary` (`3.28:1`) reaches `3:1`. In dark mode the lighter dark-palette mains lift every color above `3:1` except `error` (`2.77:1`): `primary` `3.50`, `warning` `3.43`, `info` `3.24`, `success` `3.22`, `secondary` `3.20`.
- No axe rule checks graphical-object contrast, so nothing guards this. The 1.4.11 exception for graphics with embedded or overlaid text needs text that is visible on the graphic, which only an author-supplied value label provides; the programmatic `aria-valuenow` does not satisfy it, because 1.4.11 is about visual perception.

**Manual testing steps**

1. Open `LinearProgressA11yColorMatrix`. With a contrast checker (the color picker in browser DevTools shows a ratio), measure each bar's fill color against its track color.
2. Repeat for the `buffer` variant, which has three regions: the fill, the buffered shade, and the dashed track.
3. Check any custom theme colors the application uses.

**Pass:** the fill-vs-track contrast is at least `3:1`. In light mode `primary`, `error`, `warning`, `info`, and `success` fail (only `secondary` passes); in dark mode only `error` fails.

#### 2.2.2 Pause, Stop, Hide · A

`🚩` · `⚠️ Partially Supports` · `◐ Shared`

- The `indeterminate`, `query`, and `buffer` variants run infinite CSS animations that start automatically and last more than five seconds, and the component provides no control to pause, stop, or hide them.
- 2.2.2's sufficient techniques call for an in-page control to pause, stop, or hide the motion, or for it to stop within five seconds; the component provides neither. Conformance therefore rests with the author: a loader that fills the viewport is exempt because the motion is essential, and a bar removed once loading finishes avoids the "in parallel with other content" trigger.
- Honoring `prefers-reduced-motion` (via `motion.reducedMotion: 'system'`) reduces the motion for users who request it, but that addresses Animation from Interactions (2.3.3, AAA), not 2.2.2; the default `never` does not honor it.

**Manual testing steps**

1. Render an `indeterminate` LinearProgress on a page with other content and leave it for more than five seconds.
2. Look for a way to pause, stop, or hide the motion.
3. Set the OS "reduce motion" preference and confirm whether the animation stops; it stops only when the theme sets `motion.reducedMotion: 'system'` (`'always'` stops it regardless of the OS, the default `'never'` never does).

**Pass:** the user can pause, stop, or hide the motion, or it stops within five seconds. The component supplies no such control; a full-viewport (essential) loader, or a bar removed once loading finishes, is what keeps it conformant.

#### 2.3.1 Three Flashes or Below Threshold · A

`🚩` · `✅ Supports` · `● Component`

- The animations are smooth translations; the `buffer` dashed layer pulses opacity once every three seconds, well below the three-flashes-per-second threshold. Nothing flashes.

**Manual testing steps**

1. Open `LinearBuffer` and `LinearIndeterminate`.
2. Watch for any part that flashes more than three times in any one second.

**Pass:** no part flashes more than three times per second.

#### 3.2.4 Consistent Identification · AA

`🚩` · `✅ Supports` · `○ Author`

- For a given set of props the component produces a stable role and value, the precondition for consistent identification; the name comes from the author.
- Consistency is a cross-page property. Confirm that progress bars with the same function share a name and presentation, and that one name is not reused for different functions.

**Manual testing steps**

1. List the progress bars that serve the same function across the product.
2. Compare their accessible names and variants.

**Pass:** the same function uses the same name and presentation.

#### 4.1.3 Status Messages · AA

`🚩` · `⚠️ Partially Supports` · `◐ Shared`

- `role="progressbar"` is not a live region, so updating `aria-valuenow` is not announced while focus is elsewhere. The component adds no `aria-live` region.
- To announce determinate progress, the surrounding application supplies a polite live region (the W3C `ARIA25` pattern). Announcement is an advisory technique, not an automatic failure, and assistive-technology behavior for progressbar values varies.

**Manual testing steps**

1. Open `LinearWithValueLabel` with a screen reader running (NVDA with Chrome, or VoiceOver with Safari).
2. Move focus away from the bar and let the value change.
3. Listen for whether the change is announced.

**Pass:** the change is announced without the user moving focus to it. It is not by default; add a polite live region in the application to convey it.

### 🔁 Hybrid

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `● Component`

- The root sets `role="progressbar"`. The `determinate` and `buffer` variants add `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` when a `value` is supplied; the `indeterminate` and `query` variants omit `aria-valuenow`, which WAI-ARIA defines as the correct pattern for an unknown value.
- axe-core `aria-allowed-attr`, `aria-valid-attr`, `aria-valid-attr-value`, and `aria-roles` pass across the demos in [`progress.a11y.json`](../../../../docs/data/material/components/progress/progress.a11y.json), and unit tests assert the role and value attributes.

**Manual testing steps**

1. Open the accessibility tree (in Chrome DevTools: Elements panel, Accessibility tab) on `LinearDeterminate` and `LinearIndeterminate`.
2. Confirm the determinate bar exposes a value (now, min, max) and the indeterminate bar exposes the role with no value.

**Pass:** role and value match the variant.

#### 2.4.6 Headings and Labels · AA

`✅ Supports` · `◐ Shared`

- The accessible name serves as the bar's label. axe-core `aria-progressbar-name` passes on every enrolled demo, confirming a name is present.
- Whether the name describes the operation ("Uploading photos" against a vague name) is an authoring concern.

**Manual testing steps**

1. Read each progress bar's accessible name out of context.
2. Ask whether it says what is in progress.

**Pass:** every name describes its operation.

#### 4.1.2 Name, Role, Value · A

`✅ Supports` · `◐ Shared`

- Role: `role="progressbar"` is always set. Value: `determinate` and `buffer` set `aria-valuenow`/`aria-valuemin`/`aria-valuemax` when given a `value`, and `indeterminate`/`query` correctly omit the value. Name: the component emits no name of its own; the author supplies it with `aria-label` or `aria-labelledby`, which the [Accessibility](https://mui.com/material-ui/react-progress/#accessibility) docs require.
- axe-core's `aria-progressbar-name` (name) and `aria-*` attribute rules (role and value) pass across the demos in [`progress.a11y.json`](../../../../docs/data/material/components/progress/progress.a11y.json), and unit tests assert the role and `aria-valuenow`/`min`/`max`. (axe tags `aria-progressbar-name` `1.1.1` upstream, but a `progressbar`'s name obligation sits with 4.1.2.)
- A bare `<LinearProgress />` (the default `indeterminate` variant) has a role but no value and no name; a `determinate` or `buffer` bar with a `value` exposes the value but still needs an author-supplied name. Whether a supplied name is meaningful needs an assistive-technology review.

**Manual testing steps**

1. Open `LinearProgressA11ySemanticStates` and `LinearWithValueLabel` with a screen reader running.
2. Confirm each bar announces a name, the determinate ones announce a value or percentage, and the indeterminate ones announce a busy or indeterminate state.

**Pass:** name, role, and value are correct for every variant.

### ⚙️ Automated

#### 1.4.1 Use of Color · A

`✅ Supports` · `● Component`

- Determinate progress is conveyed by the length of the filled bar (the `bar1` transform) and by `aria-valuenow`, not by color, so the value survives without color. Unit tests assert the `bar1` transform tracks `value` (`value={77}` renders `translateX(-23%)`), confirming the proportion is encoded by length, not color.
- The `color` prop (`primary`, `error`, and so on) is decorative and does not encode the value. Whether the fill is visually distinguishable from the track is a contrast question, covered by 1.4.11.

## Not applicable

- **1.1.1 Non-text Content (A).** The component renders no images or icons; the `progressbar` widget's name, role, and value are covered by 4.1.2, not by a text alternative.
- **1.3.2 Meaningful Sequence (A).** A single status element whose inner bars are presentational, so there is no multi-part reading order to preserve.
- **1.3.5 Identify Input Purpose (AA).** Not an input; collects no user data.
- **1.4.3 Contrast (Minimum) (AA), 1.4.4 Resize Text (AA), 1.4.5 Images of Text (AA), 1.4.12 Text Spacing (AA).** The component renders no text. Value labels shown in the demos are author-supplied and outside the component.
- **1.4.13 Content on Hover or Focus (AA).** Shows no hover or focus content.
- **Time-based media (1.2.1 to 1.2.5), Audio Control (1.4.2).** No audio or video.
- **Orientation (1.3.4).** Sets no orientation lock; a layout concern.
- **Keyboard and focus (2.1.1, 2.1.2, 2.1.4, 2.4.3, 2.4.7, 3.2.1).** The bar is not focusable or interactive: it sets no `tabIndex`, takes no keyboard input, and never receives focus.
- **2.4.11 Focus Not Obscured (Minimum) (AA, new in 2.2).** Not focusable, so its focus cannot be obscured.
- **Pointer (2.5.1, 2.5.2, 2.5.3, 2.5.4).** Not an interactive target: no pointer gestures, no down-event activation, no visible label text, and no motion actuation.
- **2.5.7 Dragging Movements (AA, new in 2.2).** No drag interactions.
- **2.5.8 Target Size (Minimum) (AA, new in 2.2).** Not an activation target.
- **Timing Adjustable (2.2.1).** Sets no time limit.
- **Link Purpose (In Context) (2.4.4).** Renders no link.
- **Page and site structure (2.4.1 Bypass Blocks, 2.4.2 Page Titled, 2.4.5 Multiple Ways, 3.2.3 Consistent Navigation).** Page or site concerns, not a single status indicator.
- **3.2.6 Consistent Help (A, new in 2.2).** Inapplicable in isolation.
- **Language (3.1.1 Language of Page, 3.1.2 Language of Parts).** Authoring concern; the component sets no language.
- **On Input (3.2.2).** Takes no user input.
- **Forms and errors (3.3.1 Error Identification, 3.3.2 Labels or Instructions, 3.3.3 Error Suggestion, 3.3.4 Error Prevention).** Collects and validates no input; these belong to the form or process.
- **3.3.7 Redundant Entry (A, new in 2.2).** Captures no entered data to repopulate.
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2).** Not an authentication control.

## Level AAA

- **2.3.3 Animation from Interactions.** The `indeterminate`, `query`, and `buffer` animations reduce only via `motion.reducedMotion`: `system` follows the OS `prefers-reduced-motion` query and `always` removes the animation unconditionally; the default `never` does not, so OS reduced-motion is not honored by default. `🚩`

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.2.
- **Scope.** The LinearProgress component in isolation, rendered through its documented API.
- **Automated.** axe-core via the Playwright harness (results in [`progress.a11y.json`](../../../../docs/data/material/components/progress/progress.a11y.json)), plus component unit tests.
- **Assistive-technology review.** Not yet performed. Flagged criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
