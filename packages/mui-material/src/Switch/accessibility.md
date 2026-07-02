# Switch accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

| Result                | Count |
| :-------------------- | :---- |
| ✅ Supports           | 23    |
| ⚠️ Partially Supports | 2     |
| ❌ Does Not Support   | 0     |
| ➖ Not Applicable     | 30    |
| 🚩 Flagged            | 12/25 |

## Known gaps

- ⚠️ **1.4.11 Non-text Contrast.** In light mode the thumb and track stay under 3:1 (the off-state white thumb is about 2.7:1 on the gray track, the track about 2.7:1 on the page, and each checked color 1.8:1 to 2.6:1 thumb-on-track); the focus indicator is also untested and `disableRipple` removes it.
- ⚠️ **2.4.7 Focus Visible.** `disableRipple`/`disableFocusRipple` removes the default focus indicator (the focus ripple), leaving none unless the author adds `.Mui-focusVisible` styling.

## Success criteria

### 🔍 Manual

#### 1.3.2 Meaningful Sequence · A

`🚩` · `✅ Supports` · `○ Author`

- The switch is one control: the hidden `<input>` followed by the `thumb` and `track` spans, with `FormControlLabel` placing the label and control in source order, so the exposed reading order matches the visual order. The component applies no CSS reordering to itself.
- Order carries meaning only across several controls, which the surrounding layout sets. `labelPlacement="start"` flips the label and control visually with `row-reverse`, so confirm the reading order of a switch group still matches its visual order.

**Manual testing steps**

1. In a group of switches (`FormGroup` with `FormControlLabel` rows), press <kbd>Tab</kbd> through them and note the focus order.
2. Compare that order to the visual top-to-bottom order.
3. Watch for `labelPlacement` or flex layouts that reorder the row visually without changing the DOM.

**Pass:** focus and reading order match the visual order.

#### 1.3.3 Sensory Characteristics · A

`🚩` · `✅ Supports` · `○ Author`

- The component renders no instructional text of its own, so it introduces no shape, color, or position-only instructions.
- Surrounding copy must not rely on sensory characteristics alone (for example "turn on the green switch" or "the switch on the right"). That is authored content.

**Manual testing steps**

1. Review the copy near switches for sensory-only references.
2. Check that each also names the switch by its label.

**Pass:** no instruction relies on color, shape, size, or position without naming the control.

#### 1.4.4 Resize Text · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The label is normal rem-based text that grows with text resize or browser zoom, and the thumb and track carry no text to clip.
- A fixed-pixel container in the surrounding layout could clip at 200%.

**Manual testing steps**

1. Set browser zoom to 200% and confirm the switch, label, and helper text are fully visible and the control still toggles.
2. Test a long label inside a constrained-width container.

**Pass:** nothing is clipped or cut off at 200%.

#### 1.4.5 Images of Text · AA

`🚩` · `✅ Supports` · `○ Author`

- Labels and helper text render as live DOM text; the default thumb and track are styled spans, not images of text, and carry no textual information.
- The label and any custom `icon`/`checkedIcon` content are the author's: this fails only if one of them is an image of text. Use real text unless it is a logo.

**Manual testing steps**

1. Inspect the label and helper nodes and confirm they are selectable live text, not `<img>` or background images of text.
2. Confirm no label or custom `icon`/`checkedIcon` uses an image of text.

**Pass:** labels and helper text are live text.

#### 1.4.10 Reflow · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The switch is a small inline-flex control with no fixed min-width and no horizontal-overflow layout of its own, so it reflows into a 320 CSS pixel viewport.
- Real failures usually come from the surrounding layout, such as a wide non-wrapping row of labeled switches.

**Manual testing steps**

1. Set the viewport to 320 CSS pixels wide (or 400% zoom at 1280px) and confirm switch rows stack with no horizontal scrollbar.
2. Confirm any multi-column group collapses to one column.

**Pass:** content reflows to one column with no two-dimensional scrolling and no loss of function.

#### 2.4.11 Focus Not Obscured (Minimum) · AA

`🚩` · `✅ Supports` · `○ Author`

- The switch is an ordinary focusable control and never places itself behind other content. Obscuring comes from sticky headers, banners, or overlays in the surrounding layout.
- Confirm by moving focus to a switch beneath any sticky or overlay content at several scroll positions. At least part of it must stay visible.

**Manual testing steps**

1. In a page with a sticky header, footer, or banner, scroll so a switch sits under the sticky element.
2. Press <kbd>Tab</kbd> to move focus onto it.

**Pass:** at least part of the focused switch stays visible, never fully covered.

#### 3.2.4 Consistent Identification · AA

`🚩` · `✅ Supports` · `○ Author`

- The component relies on an author supplied name
- Consistency is a cross-page property. Confirm that switches with the same function share a label, and that one label is not reused for different functions.

**Manual testing steps**

1. List the switches that do the same job across the product.
2. Compare their labels.

**Pass:** the same function uses the same label, and no label is reused for different functions.

#### 3.3.2 Labels or Instructions · A

`🚩` · `✅ Supports` · `○ Author`

- A visible label or instruction is the author's content to supply; the component renders a real `<label>` when wrapped in `FormControlLabel` (as in `SwitchLabels` and `SwitchesGroup`), the conforming pattern for a production switch.
- An `aria-label` gives a programmatic name (4.1.2) but is not presented to all users, so an `aria-label`-only switch (the form the isolation demos take) still needs a visible label in production.

**Manual testing steps**

1. For each switch in the product, confirm a visible label or instruction is shown to all users, not only an `aria-label`.
2. Confirm bare switches are wrapped in `FormControlLabel` or paired with visible instructions.

**Pass:** every production switch has a visible label or instruction; an `aria-label` alone is a name for assistive technology, not a visible label.

### 🔁 Hybrid

#### 1.1.1 Non-text Content · A

`✅ Supports` · `◐ Shared`

- The thumb and track are decorative styled spans with no text alternative needed; the accessible name comes from the label, not from those parts.
- The name is not self-supplied: a bare `<Switch />` has none, and it is satisfied when the author wraps it in `FormControlLabel` (a real `<label>`) or passes a `slotProps.input` `aria-label`/`aria-labelledby`, as the docs instruct. Covered by axe-core.

**Manual testing steps**

1. Render `<FormControlLabel control={<Switch />} label="Dark mode" />` and confirm the accessibility tree shows `role=switch` named "Dark mode".
2. Render a bare `<Switch />` and confirm it has an empty name, the failure mode authors must avoid.

**Pass:** every switch exposes a non-empty accessible name.

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `◐ Shared`

- The native `<input type="checkbox">` with `role="switch"` exposes the role and the on/off state, and `required` and `disabled` map to the native attributes.
- `FormControlLabel` associates the label through a real `<label>`, and `FormControl component="fieldset"` with `FormLabel component="legend"` names a group; covered by axe-core.
- `FormHelperText` is a bare `<p>` with no `aria-describedby`, so associating the helper or error text with the control is the author's responsibility.

**Manual testing steps**

1. Render `<FormControlLabel control={<Switch required />} label="Email alerts" />` and confirm `role=switch`, the name, `required`, and the wrapping `<label>`.
2. In a switch group (`FormControl component="fieldset"` with a `FormLabel component="legend"`), confirm the `<fieldset>`/`<legend>` name is exposed but any helper text is not tied to the control (no `aria-describedby`).

**Pass:** role, state, label association, and group name are programmatically determinable, and any helper text is tied to the control via author-supplied `aria-describedby`.

#### 1.4.1 Use of Color · A

`🚩` · `✅ Supports` · `◐ Shared`

- State is conveyed by the thumb's position, not color: the thumb sits at the left of the track when off and slides to the right when on, so a color-blind user can tell the two states apart.
- A group's error state, if the author adds one through `FormHelperText`, is color-only red text. Pair it with text or an icon (author content).

**Manual testing steps**

1. View an on switch and an off switch in grayscale (DevTools Rendering, Emulate vision deficiencies, Achromatopsia) and confirm the two states stay distinguishable by thumb position.
2. Render an error `FormHelperText` in grayscale and confirm "error" is still perceivable without the red.

**Pass:** on and off are distinguishable by thumb position, and any error state is conveyed by more than color.

#### 1.4.3 Contrast (Minimum) · AA

`✅ Supports` · `◐ Shared`

- This governs the visible text (the label and helper text), not the thumb or track, which 1.4.11 covers.
- The label uses `text.primary` (about `16:1` on white) and helper text `text.secondary` (about `5.7:1`), both above the `4.5:1` threshold; covered by axe-core, disabled label text is exempt.
- The component renders no text on a colored fill, so there is no label-on-background risk. Custom label colors or a colored container behind the row are the author's to check. Disabled text is exempt.

**Manual testing steps**

1. Measure the label and helper text against the real background in light and dark themes.
2. Re-check any custom label color.

**Pass:** label and helper text meet `4.5:1` (`3:1` for large text) against the actual background.

#### 1.4.11 Non-text Contrast · AA

`🚩` · `⚠️ Partially Supports` · `● Component`

- This criterion, not 1.4.3, governs the thumb and track at 3:1, measuring the thumb against the track (the state indicator) and the track against the page (the control's edge).
- Both miss 3:1 in light mode: the off-state white thumb is `2.68:1` on the `#9e9e9e` track and that track `2.68:1` on the page, and each checked color is `1.8:1` (`warning`) to `2.6:1` (`secondary`) thumb-on-track.
- The thumb's drop shadow is discounted (WCAG subsumes it into the nearest color) and the thumb position satisfies 1.4.1 but not this contrast; dark mode clears 3:1 only for the off-state thumb (`5.31:1`) and checked `primary` (`3.06:1`), with `warning` right at the `3:1` boundary. Disabled is exempt.

**Manual testing steps**

1. With a contrast checker, measure the off-state thumb against the track, the track against the page, and each checked color's thumb against its track.
2. Press <kbd>Tab</kbd> to a switch and measure the keyboard focus indicator against the colors next to it.

**Pass:** the thumb against the track, the track against the page, and the focus indicator are each at least `3:1`; disabled is exempt. Today the default thumb and track are the known failures.

#### 1.4.12 Text Spacing · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The component sets no text styles of its own and no fixed heights that would clip under user text-spacing overrides; the label is normal flowing text that wraps, and the thumb and track are fixed vector shapes unaffected by spacing.
- Whether a long label clips depends on the author's container, not the switch.

**Manual testing steps**

1. Apply the WCAG text-spacing overrides via the DevTools console: `document.head.insertAdjacentHTML('beforeend','<style>*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}</style>')`.
2. Confirm labels and helper text are not clipped or overlapping and the control still toggles.

**Pass:** applying the text-spacing overrides causes no clipping, overlap, or loss of text or function.

#### 2.4.6 Headings and Labels · AA

`✅ Supports` · `◐ Shared`

- The component renders whatever label and group legend the author supplies; this criterion does not require a label to exist, only that any provided label describes its purpose.
- axe-core covers the existence of a name for all demos; whether it is descriptive or not requires manual review and judgment
- A vague label ("Option 1") would fail, and the component cannot enforce wording.

**Manual testing steps**

1. Read each switch label and group legend.
2. Confirm each describes the option ("Email notifications", not "Option 1").

**Pass:** every provided label and legend describes its purpose.

#### 2.4.7 Focus Visible · AA

`🚩` · `⚠️ Partially Supports` · `● Component`

- `ButtonBase` removes the user-agent outline (`outline: 0`). In the default configuration keyboard focus adds the `.Mui-focusVisible` class plus a centered focus ripple, so an indicator is shown.
- `disableRipple` or `disableFocusRipple` removes the default focus indicator (the focus ripple), leaving none unless the author adds `.Mui-focusVisible` styles. The `CustomizedSwitches` iOS demo does this, re-styling the thumb on focus.

**Manual testing steps**

1. Press <kbd>Tab</kbd> to a default `<Switch />` and confirm a visible focus indicator appears.
2. Press <kbd>Tab</kbd> to a `<Switch disableRipple />` (or `disableFocusRipple`) with no custom styles and confirm none appears.
3. Click with the mouse and confirm the indicator is keyboard-only.

**Pass:** every keyboard-focused switch shows a visible indicator, including `disableRipple` via author-supplied styles. Today a bare `disableRipple` switch shows none.

#### 2.5.3 Label in Name · A

`✅ Supports` · `◐ Shared`

- With `FormControlLabel` and a string label, the accessible name equals the visible text, so the name contains the label. Covered by unit tests.
- A `slotProps.input` `aria-label` that differs from the visible text breaks this. Keep the visible words in the name.

**Manual testing steps**

1. Render `<FormControlLabel control={<Switch />} label="Dark mode" />` and confirm the accessible name contains "Dark mode".
2. If an `aria-label` is set, confirm it includes the visible text.
3. Try a voice command speaking the visible label and confirm it toggles the switch.

**Pass:** the accessible name contains the visible label text.

#### 4.1.2 Name, Role, Value · A

`✅ Supports` · `◐ Shared`

- Role, state, and change notification are met natively: the component sets `role="switch"` on the native `<input type="checkbox">`, and the input's `checked` is the on/off value (ARIA in HTML names the HTML `checked` attribute as the stand-in for `aria-checked` on a switch and forbids setting `aria-checked` directly, so no extra ARIA is needed). Covered by axe-core and unit tests.
- The name is the shared part: it comes from the author's `FormControlLabel` or `aria-label`.
- One caveat: `readOnly` sets the native `readonly` attribute, which has no effect on a checkbox and is not exposed to assistive technology, so a read-only switch is not announced as such (use `disabled` or `aria-readonly` if that state must be conveyed).
- Whether assistive technology announces the `switch` role (some older screen readers say "checkbox") and the on/off change needs an assistive-technology review.

**Manual testing steps**

1. Render a labeled switch and confirm `role=switch` with a non-empty name in the accessibility tree.
2. Toggle it with a screen reader running and confirm the on/off change is announced.

**Pass:** the role, the on/off state with change notification, and an author-supplied accessible name are all programmatically determinable.

### ⚙️ Automated

#### 2.1.1 Keyboard · A

`✅ Supports` · `● Component`

- The native `<input type="checkbox">` is the single focusable control (the root span is `role: undefined`, `tabIndex: null`), so the browser provides <kbd>Tab</kbd> focus and <kbd>Space</kbd> toggle with no timing or path dependence, matching the [APG switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/). Disabled leaves the tab order.
- Covered by unit tests.

#### 2.1.2 No Keyboard Trap · A

`✅ Supports` · `● Component`

- A single native input with standard <kbd>Tab</kbd> in and out. It installs no focus-capturing handlers and no containment logic, so focus cannot be trapped. Covered by unit tests.

#### 2.4.3 Focus Order · A

`✅ Supports` · `◐ Shared`

- The switch is one focusable element in natural DOM order, with no positive `tabIndex` and no reordering, so it is one correct focus stop. Covered by unit tests; whether that order preserves meaning in a given layout stays a manual check.
- Order across controls, and group order, is the surrounding layout's responsibility.

#### 2.5.2 Pointer Cancellation · A

`✅ Supports` · `● Component`

- Toggling runs on the native input's `click`, fired on pointer-up over the target. Nothing toggles on the down event (the ripple starts there but is decorative), and releasing off the control cancels. Covered by unit tests.

#### 2.5.8 Target Size (Minimum) · AA

`✅ Supports` · `◐ Shared`

- The target is the padded `switchBase` with the input stretched across it (`300%` wide), so the hit area spans the whole control: medium is about 38px tall, above the 24 by 24 CSS pixel minimum. Covered by axe-core.
- Custom `sx`/`size` overrides that shrink the control, or hit-area changes under browser zoom, are not covered.

#### 3.2.1 On Focus · A

`✅ Supports` · `● Component`

- Focusing the input only moves focus and shows the focus indicator. There is no navigation, dialog, or content change on focus, and the component registers no `onFocus` side effects. Covered by unit tests.

#### 3.2.2 On Input · A

`✅ Supports` · `◐ Shared`

- Toggling only flips the checked state and fires `onChange`; per the Understanding document, changing a control's value is not a change of context. `readOnly` short-circuits the change. Covered by unit tests.
- An author `onChange` that navigates or submits without warning would be an author-side failure.

## Not applicable

- **1.3.5 Identify Input Purpose (AA).** Covers inputs that collect information about the user through `autocomplete`. An on/off switch is not one of those input purposes.
- **1.4.13 Content on Hover or Focus (AA).** Needs additional content such as a tooltip or popover. The switch only restyles itself; a `Tooltip` wrapper would own this.
- **2.1.4 Character Key Shortcuts (A).** The only key is <kbd>Space</kbd>, and only while focused. There is no single-character shortcut.
- **2.2.2 Pause, Stop, Hide (A).** No auto-starting moving, blinking, or auto-updating content.
- **2.4.4 Link Purpose (In Context) (A).** The component renders no links.
- **2.5.7 Dragging Movements (AA, new in 2.2).** Covers drag operations. The switch toggles by tap or click, with no drag.
- **3.1.1 Language of Page (A), 3.1.2 Language of Parts (AA).** The component emits no `<html lang>` and no text of its own. A foreign-language label is the author's phrase to mark.
- **3.2.3 Consistent Navigation (AA).** Covers repeated navigation across a set of pages, not a single control.
- **3.2.6 Consistent Help (A, new in 2.2).** Covers consistent placement of help across pages.
- **3.3.7 Redundant Entry (A, new in 2.2).** Covers repopulating previously entered data. The switch captures none.
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2).** The paste, autofill, and cognitive-test duty falls on the credential fields, not a switch.
- **4.1.3 Status Messages (AA).** The switch emits no status messages; its on/off change is covered by 4.1.2.
- **Time-based media (1.2.1 to 1.2.5).** No audio or video.
- **Audio Control (1.4.2).** Emits no audio.
- **Orientation (1.3.4).** Sets no orientation lock; a layout concern.
- **Bypass Blocks (2.4.1), Page Titled (2.4.2), Multiple Ways (2.4.5).** Page or site structure, not a single control.
- **Timing Adjustable (2.2.1).** Sets no time limit.
- **Three Flashes or Below Threshold (2.3.1).** Nothing flashes.
- **Pointer Gestures (2.5.1), Motion Actuation (2.5.4).** Toggles on a simple click; reads no device motion.
- **Error Identification (3.3.1), Error Suggestion (3.3.3), Error Prevention (3.3.4).** The switch holds a boolean and supports `required`, but surfaces no error state or message of its own, so detecting and describing an error is the form's or process's job. An author who surfaces a required-but-off error identifies it in text and ties it to the control with `aria-describedby` (tracked under 1.3.1).

## Level AAA

The following SC are applicable but out of scope:

- **2.3.3 Animation from Interactions.** The thumb's slide transition and the ripple's `scale()` animation honor `prefers-reduced-motion` when the theme sets `motion.reducedMotion` to `system` (follows the OS) or `always`; `disableRipple` also removes the ripple. The default is `never`, so OS reduced-motion is not honored by default. `🚩`
- **2.4.13 Focus Appearance.** The focus ripple is unlikely to meet the area and 3:1 thresholds, and `disableRipple` removes it. `🚩`
- **2.5.5 Target Size (Enhanced), 44 px.** The default control (about 38px tall) is below 44px. `🚩`
- **1.4.6 Contrast (Enhanced), 7:1.** The label (`text.primary`, about 16:1) clears 7:1, but the thumb and track fall short where the 7:1 bar applies (they miss even 3:1). `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.3.6 Identify Purpose, 1.4.9 Images of Text (No Exception), 2.1.3 Keyboard (No Exception), 2.4.12 Focus Not Obscured (Enhanced)**.

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.2.
- **Scope.** The Switch component and its documented composition with `FormControlLabel`, `FormControl`/`FormGroup`, `FormLabel`, and `FormHelperText`, rendered through the documented API.
- **Automated.** axe-core via the Playwright visual-regression harness (results in [`switches.a11y.json`](../../../../docs/data/material/components/switches/switches.a11y.json)), plus interaction tests in [`Switch.test.js`](./Switch.test.js). Thumb and track contrast is computed from the theme tokens, since no axe rule covers non-text contrast.
- **Assistive-technology review.** Not yet performed. `🚩` criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
