# Radio accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

| Result                | Count |
| :-------------------- | :---- |
| ✅ Supports           | 23    |
| ⚠️ Partially Supports | 2     |
| ❌ Does Not Support   | 0     |
| ➖ Not Applicable     | 30    |
| 🚩 Flagged            | 6/25  |

## Known gaps

- ⚠️ **1.4.11 Non-text Contrast.** The default dot and circle clear 3:1 (`warning` is the tightest at 3.11:1), but the keyboard focus indicator is untested and `disableRipple`/`disableFocusRipple` or custom icons can drop below 3:1 (the `CustomizedRadios` unchecked circle is about 1.1:1 against the page).
- ⚠️ **2.4.7 Focus Visible.** `disableRipple`/`disableFocusRipple` removes the focus ripple, leaving none unless the author adds `.Mui-focusVisible` styling.

## Success criteria

### 🔍 Manual

#### 1.3.2 Meaningful Sequence · A

`✅ Supports` · `○ Author`

- The radio is one control: the hidden `<input>` followed by the `aria-hidden` dot and circle, with `FormControlLabel` placing the label and control in source order, so the reading order matches the visual order.
- Order carries meaning only across several controls, which the surrounding layout sets. `labelPlacement="bottom"` flips the label and control vertically, so confirm the reading order of a group like `FormControlLabelPlacement` still matches its visual order.

**Manual testing steps**

1. Render a `RadioGroup` with several labeled `Radio` options, then press <kbd>Tab</kbd> and the arrow keys through them, noting the focus order.
2. Compare that order to the visual top-to-bottom order.
3. Watch for `labelPlacement` or flex layouts that reorder a row visually without changing the DOM.

**Pass:** focus and reading order match the visual order.

#### 1.3.3 Sensory Characteristics · A

`✅ Supports` · `○ Author`

- The component renders no instructional text of its own.
- The author is responsible for ensuring surrounding copy does not rely on sensory characteristics alone (for example "select the green option" or "the option on the right").

**Manual testing steps**

1. Review the copy near a radio group for sensory-only references.
2. Check that each also names the option by its label.

**Pass:** no instruction relies on color, shape, size, or position without naming the control.

#### 1.4.4 Resize Text · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The dot and circle are an `SvgIcon` whose size comes from `fontSize` in `rem` (medium 24px = 1.5rem, small 20px = 1.25rem) with a `1em` box, so they scale with browser zoom or root font size; the label is normal text. No pixel units are used.
- A fixed-pixel container in the surrounding layout could cause clipping at 200%.

**Manual testing steps**

1. Set browser zoom to 200% and confirm the radio, label, and helper text are fully visible and the control still selects.
2. Test a long label inside a constrained-width container.

**Pass:** nothing is clipped or cut off at 200%.

#### 1.4.5 Images of Text · AA

`✅ Supports` · `○ Author`

- Labels and helper text render as live DOM text; the dot and circle are vector graphics without any textual information.
- This fails only if an author passes an image of text as the label, or supplies an `icon`/`checkedIcon` that is an image of text. Use real text unless it is a logo.

**Manual testing steps**

1. Inspect the label and helper nodes and confirm they are selectable live text, not `<img>` or background images of text.
2. Confirm no label, `icon`, or `checkedIcon` uses an image of text.

**Pass:** labels and helper text are live text.

#### 1.4.10 Reflow · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The radio is a small inline-flex control with no fixed min-width and no horizontal-overflow layout of its own, so it reflows into a 320 CSS pixel viewport.
- Real failures usually come from the surrounding layout, such as a wide non-wrapping row of labeled radios or a fixed-width container (a default `row` group still wraps, since `FormGroup` keeps `flex-wrap: wrap`).

**Manual testing steps**

1. Set the viewport to 320 CSS pixels wide (or 400% zoom at 1280px) and confirm radio rows stack with no horizontal scrollbar.
2. Confirm any multi-column group collapses to one column.

**Pass:** content reflows to one column with no two-dimensional scrolling and no loss of function.

#### 2.4.11 Focus Not Obscured (Minimum) · AA

`✅ Supports` · `○ Author`

- The radio is an ordinary focusable control and never places itself behind other content. Obscuring comes from sticky headers, banners, or overlays in the surrounding layout.
- Confirm by moving focus to a radio beneath any sticky or overlay content at several scroll positions. At least part of it must stay visible.

**Manual testing steps**

1. In a page with a sticky header, footer, or banner, scroll so a radio sits under the sticky element.
2. Press <kbd>Tab</kbd> to move focus onto it.

**Pass:** at least part of the focused radio stays visible, never fully covered.

#### 3.2.4 Consistent Identification · AA

`✅ Supports` · `○ Author`

- The component exposes whatever name the author supplies.
- Consistency is a cross-page property. Confirm that radios with the same function share a label, and that one label is not reused for different functions.

**Manual testing steps**

1. List the radio options that do the same job across the product.
2. Compare their labels.

**Pass:** the same function uses the same label, and no label is reused for different functions.

#### 3.3.2 Labels or Instructions · A

`✅ Supports` · `○ Author`

- A visible label or instruction is the author's content to supply; the component renders a real `<label>` when wrapped in `FormControlLabel`, which is the recommended composition for the radio component.
- `aria-label`-only radios would fail this SC in a real-world use case.

**Manual testing steps**

1. For each radio, confirm a visible label or instruction is shown to all users.
2. Flag instances that rely on an `aria-label` only (no visible text).
3. Confirm bare radios are wrapped in `FormControlLabel` or paired with visible instructions.

**Pass:** each radio has a visible label or instruction.

### 🔁 Hybrid

#### 1.1.1 Non-text Content · A

`✅ Supports` · `◐ Shared`

- The default `RadioButton*` icons, and any MUI `SvgIcon` passed via `icon`/`checkedIcon`, default to `aria-hidden`, so they stay decorative; the accessible name comes from the label, not the dot.
- The name is not self-supplied: a bare `<Radio />` has none. It is satisfied when the author wraps it in `FormControlLabel` (a real `<label>`) or passes `slotProps.input` `aria-label`/`aria-labelledby`, as the docs instruct. Covered by axe-core.

**Manual testing steps**

1. Render `<FormControlLabel control={<Radio />} label="Standard shipping" />` and confirm the accessibility tree shows `role=radio` named "Standard shipping".
2. Render a bare `<Radio />` and confirm it has an empty name, the failure mode authors must avoid.
3. Confirm the dot and circle SVGs are `aria-hidden`.

**Pass:** every radio exposes a non-empty accessible name and the dot and circle stay `aria-hidden`.

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `◐ Shared`

- The native `<input type="radio">` exposes role and checked state; `required` and `disabled` map to the native attributes; `FormControlLabel` associates the label through a real `<label>`; and a shared `name` ties the options into one native group. Covered by axe-core. The group's `role="radiogroup"` relationship is rated in the [RadioGroup report](../RadioGroup/accessibility.md).
- Two relationships are the author's to connect. `FormHelperText` is a bare `<p>` with no `aria-describedby`, so helper and error text (as in `ErrorRadios`) are not tied to the control. Add `aria-describedby` in the application.

**Manual testing steps**

1. Render `<FormControlLabel control={<Radio required />} label="Express" />` and confirm `role=radio`, the name, `required`, and the wrapping `<label>`.

**Pass:** role, state, and label association are programmatically determinable, and any helper or error text is tied to the control via author-supplied `aria-describedby`.

#### 1.4.1 Use of Color · A

`🚩` · `✅ Supports` · `◐ Shared`

- State is conveyed by the dot's presence and not color - an empty circle (unchecked) and a circle with a filled dot (checked)
- The group error state is color-only: `FormHelperText` conveys it through red text. The author is responsible for associating it with error text.

**Manual testing steps**

1. Render a checked and an unchecked radio and view in grayscale (DevTools Rendering, Emulate vision deficiencies, Achromatopsia); confirm the dot still distinguishes them.

**Pass:** checked and unchecked are distinguishable by the dot, and any error state is conveyed by more than color.

#### 1.4.3 Contrast (Minimum) · AA

`✅ Supports` · `◐ Shared`

- This criterion governs the visible text (the label and helper text), not the dot or circle, which is covered by 1.4.11. The label uses `text.primary` (about 16:1 on white, 18:1 on the dark background) and helper text uses `text.secondary` (about 5.7:1); error helper text `error.main` computes `4.98:1` on white, the tightest text case but above the `4.5:1` threshold. Covered by axe-core; the disabled label text is exempt.
- The component renders no text on a colored fill, so unlike a contained button there is no label-on-background risk. Custom label colors or a colored container behind the row are the author's to check. Disabled text is exempt.

**Manual testing steps**

1. Measure the label and helper text against the real background in light and dark themes.
2. Pay attention to light-mode error text (`#d32f2f`, about `5:1`) on any non-white background.

**Pass:** label and helper or error text meet `4.5:1` (`3:1` for large text) against the actual background.

#### 1.4.11 Non-text Contrast · AA

`🚩` · `⚠️ Partially Supports` · `● Component`

- This criterion, not 1.4.3, governs the dot and circle at 3:1, and every default state passes against the default page background (`#fff` light, `#121212` dark). In light mode `warning` is the tightest at `3.11:1`, `info` `3.86:1`, the default `primary` dot `4.60:1`, and the unchecked `text.secondary` circle `5.74:1`; dark mode clears `3:1` with room to spare (`error`, the lowest, is about `5:1`). `warning.main` is tuned in the palette as "closest to orange[800] that pass 3:1", so a colored container behind the radio eats its small headroom first. Disabled (`action.disabled`, about `1.9:1`) is exempt.

**Manual testing steps**

1. Measure the unchecked circle and each checked color (`primary` through `warning`) against the background; confirm `3:1`, checking `warning` specifically.
2. Measure the keyboard focus indicator against the colors next to it.
3. Audit any custom `icon`/`checkedIcon` (a low-contrast custom icon is a common fail) and treat disabled as exempt.

**Pass:** the dot and circle in every active state and the focus indicator are `3:1` against adjacent colors; disabled is exempt.

#### 1.4.12 Text Spacing · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The component sets no text styles of its own and no fixed heights that would clip under user text-spacing overrides; the label is normal flowing text that wraps, and the dot and circle are fixed vectors unaffected by spacing.
- Whether a long label clips depends on the author's container.

**Manual testing steps**

1. Apply the WCAG text-spacing overrides via the DevTools console: `document.head.insertAdjacentHTML('beforeend','<style>*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}</style>')`.
2. Confirm labels and helper text are not clipped or overlapping and the control still selects.

**Pass:** applying the text-spacing overrides causes no clipping, overlap, or loss of text or function.

#### 2.4.6 Headings and Labels · AA

`✅ Supports` · `◐ Shared`

- The component renders whatever label the author supplies. This criterion does not require a label to exist, only that any provided label describes its purpose. axe-core covers that a name is present; whether it is descriptive is a manual review. The group's own legend is rated in the [RadioGroup report](../RadioGroup/accessibility.md).
- A vague label ("Option 1") would fail, and the component cannot enforce wording.

**Manual testing steps**

1. Read each radio label.
2. Confirm each describes the option ("Express delivery", not "Option 1").

**Pass:** every provided label describes its purpose.

#### 2.4.7 Focus Visible · AA

`🚩` · `⚠️ Partially Supports` · `● Component`

- The focus ripple serves as focus visible indicator
- `disableRipple` or `disableFocusRipple` removes the focus indicator (the focus ripple), relying on the author to add it with `.Mui-focusVisible` styles.

**Manual testing steps**

1. Press <kbd>Tab</kbd> to a default `<Radio />` and confirm a visible focus indicator appears.
2. Click with the mouse and confirm the indicator is keyboard-only.

**Pass:** every keyboard-focused radio shows a visible indicator, including `disableRipple` via author-supplied styles.

#### 2.5.3 Label in Name · A

`✅ Supports` · `◐ Shared`

- With `FormControlLabel` and a string label, the accessible name equals the visible text, so the name contains the label. Covered by unit tests.
- A `slotProps.input` `aria-label` that differs from the visible text breaks this. Keep the visible words in the name.

**Manual testing steps**

1. Render `<FormControlLabel control={<Radio />} label="Express delivery" />` and confirm the accessible name contains "Express delivery".
2. If an `aria-label` is set, confirm it includes the visible text.
3. Try a voice command speaking the visible label and confirm it activates the radio.

**Pass:** the accessible name contains the visible label text.

#### 4.1.2 Name, Role, Value · A

`✅ Supports` · `◐ Shared`

- Role, checked, and disabled are met natively: the native `<input type="radio">` exposes `role=radio`, the checked state, the value, and change notification with no ARIA needed; `disabled` maps to native `disabled` and `required` to native `required`. Unlike a checkbox, a radio has no `indeterminate` state, so it sets no `aria-checked` and raises no ARIA-in-HTML conflict. Covered by axe-core and unit tests.
- The individual radio's name relies on author-supplied `FormControlLabel` or `aria-label`. The group's name, role, and selected value are rated in the [RadioGroup report](../RadioGroup/accessibility.md).

**Manual testing steps**

1. Render a labeled radio and confirm `role=radio` with a non-empty name in the accessibility tree.
2. Select it with a screen reader running and confirm the state change is announced.
3. Confirm the unselected options announce as "not checked".

**Pass:** the role, the checked or unchecked and disabled state with change notification, and an author-supplied accessible name are all programmatically determinable.

### ⚙️ Automated

#### 2.1.1 Keyboard · A

`✅ Supports` · `● Component`

- The native `<input type="radio">` is the single focusable control (the root span is `role: undefined`, `tabIndex: null`), so the browser provides <kbd>Tab</kbd> focus and <kbd>Space</kbd> selection with no timing or path dependence, matching the [APG radio pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/). Disabled leaves the tab order. Arrow-key movement between grouped radios is covered in the [RadioGroup report](../RadioGroup/accessibility.md).
- Covered by unit tests.

#### 2.1.2 No Keyboard Trap · A

`✅ Supports` · `● Component`

- A single native input with standard <kbd>Tab</kbd> in and out. It installs no focus-capturing handlers and no containment logic, so focus cannot be trapped. Covered by unit tests.

#### 2.4.3 Focus Order · A

`✅ Supports` · `◐ Shared`

- The radio is one focusable element in natural DOM order, with no positive `tabIndex` and no reordering, so it is one correct focus stop. Covered by unit tests; the group's roving tab order is rated in the [RadioGroup report](../RadioGroup/accessibility.md).
- Order across controls is the surrounding layout's responsibility.

#### 2.5.2 Pointer Cancellation · A

`✅ Supports` · `● Component`

- Selecting runs on the native input's `click`, fired on pointer-up over the target. Nothing selects on the down event (the ripple starts there but is decorative), and releasing off the control cancels. Covered by unit tests.

#### 2.5.8 Target Size (Minimum) · AA

`✅ Supports` · `◐ Shared`

- The target is the padded root, not the icon (the input fills it at 100%): medium is a 24px icon plus 2 by 9px padding = 42px, and `size="small"` is 38px, both above the 24 by 24 CSS pixel minimum. Covered by axe-core.
- It would drop below 24px only if an author both shrinks the icon and removes the padding. Custom `sx`/`size` overrides and hit-area changes under browser zoom are not covered.

#### 3.2.1 On Focus · A

`✅ Supports` · `● Component`

- Focusing the input only moves focus and shows the focus indicator. There is no navigation, dialog, or content change on focus, and the component registers no `onFocus` side effects. Covered by unit tests.

#### 3.2.2 On Input · A

`✅ Supports` · `◐ Shared`

- Selecting only sets the checked state and fires `onChange`; per the Understanding document, changing a control's value is not a change of context. Covered by unit tests.
- An author `onChange` that navigates or submits without warning would be an author-side failure.

## Not applicable

- **1.3.5 Identify Input Purpose (AA).** Covers fields that autofill the user's own data through `autocomplete`. Those purposes map to text-entry and `select` controls (`sex`, for example, is free-form text), not radio buttons, so even a "Gender" radio group is outside this criterion.
- **1.4.13 Content on Hover or Focus (AA).** Needs additional content such as a tooltip or popover. The radio only restyles itself; a `Tooltip` wrapper would own this.
- **2.1.4 Character Key Shortcuts (A).** The only keys are <kbd>Space</kbd> and the arrow keys, and only while focused. There is no single-character shortcut.
- **2.2.2 Pause, Stop, Hide (A).** No auto-starting moving, blinking, or auto-updating content.
- **2.4.4 Link Purpose (In Context) (A).** The component renders no links.
- **2.5.7 Dragging Movements (AA, new in 2.2).** Covers drag operations. The radio selects by tap or click.
- **3.1.1 Language of Page (A), 3.1.2 Language of Parts (AA).** The component emits no `<html lang>` and no text of its own. A foreign-language label is the author's phrase to mark.
- **3.2.3 Consistent Navigation (AA).** Covers repeated navigation across a set of pages, not a single control.
- **3.2.6 Consistent Help (A, new in 2.2).** Covers consistent placement of help across pages.
- **3.3.7 Redundant Entry (A, new in 2.2).** Covers repopulating previously entered data. The radio captures none.
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2).** The paste, autofill, and cognitive-test duty falls on the credential fields, not a radio.
- **4.1.3 Status Messages (AA).** The radio emits no status messages; its checked-state change is covered by 4.1.2.
- **Time-based media (1.2.1 to 1.2.5).** No audio or video.
- **Audio Control (1.4.2).** Emits no audio.
- **Orientation (1.3.4).** Sets no orientation lock; a layout concern.
- **Bypass Blocks (2.4.1), Page Titled (2.4.2), Multiple Ways (2.4.5).** Page or site structure, not a single control.
- **Timing Adjustable (2.2.1).** Sets no time limit.
- **Three Flashes or Below Threshold (2.3.1).** Nothing flashes.
- **Pointer Gestures (2.5.1), Motion Actuation (2.5.4).** Selects on a simple click; reads no device motion.
- **Error Identification (3.3.1), Error Suggestion (3.3.3), Error Prevention (3.3.4).** A radio collects a boolean choice and supports `required`, but in isolation it raises no error state or message of its own; error detection and messaging belong to the form or validation process. When an author shows an error (as `ErrorRadios` does), tie it to the group with `aria-describedby` (tracked under 1.3.1).

## Level AAA

- **2.3.3 Animation from Interactions.** The ripple's `scale()` animation honors `prefers-reduced-motion` when the theme sets `motion.reducedMotion` to `system` (follows the OS) or `always`; `disableRipple` also removes it. The default is `never`, so OS reduced-motion is not honored by default. `🚩`
- **2.4.13 Focus Appearance.** The focus ripple is unlikely to meet the area and 3:1 thresholds, and `disableRipple` removes it. `🚩`
- **2.5.5 Target Size (Enhanced), 44 px.** Default sizes (42px medium, 38px small) are below 44px. `🚩`
- **1.4.6 Contrast (Enhanced), 7:1.** The label (`text.primary`, about 16:1) clears 7:1, but helper text (about 5:1) and the dot and circle fall short where the 7:1 text bar applies. `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.3.6 Identify Purpose, 1.4.9 Images of Text (No Exception), 2.1.3 Keyboard (No Exception), 2.4.12 Focus Not Obscured (Enhanced)**.

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.2.
- **Scope.** The Radio component and its documented composition with `FormControlLabel`, `FormControl`/`FormLabel`, and `FormHelperText`, rendered through the documented API. Group-level coordination (the `radiogroup` role, arrow-key navigation, and the group's name) is rated in the [RadioGroup report](../RadioGroup/accessibility.md).
- **Automated.** axe-core via the Playwright visual-regression harness (results in [`radio-buttons.a11y.json`](../../../../docs/data/material/components/radio-buttons/radio-buttons.a11y.json)), plus interaction tests in [`Radio.test.js`](./Radio.test.js). Dot and circle contrast is computed from the theme tokens, since no axe rule covers non-text contrast.
- **Assistive-technology review.** Not yet performed. Flagged criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
