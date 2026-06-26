# Checkbox accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

| Result                | Count |
| :-------------------- | :---- |
| ✅ Supports           | 21    |
| ⚠️ Partially Supports | 4     |
| ❌ Does Not Support   | 0     |
| ➖ Not Applicable     | 30    |
| 🚩 Unverified         | 12/25 |

## Known gaps

- ⚠️ **1.4.11 Non-text Contrast.** The default checkmark icons clear 3:1 (`warning` is the tightest at 3.11:1), but the keyboard focus indicator is untested and `disableRipple`/`disableFocusRipple` or custom icons can drop below 3:1 (the Customization demo's unchecked box is about 1.1:1 against the page).
- ⚠️ **2.4.7 Focus Visible.** `disableRipple`/`disableFocusRipple` removes the default focus indicator (the focus ripple), leaving none unless the author adds `.Mui-focusVisible` styling.
- ⚠️ **3.3.2 Labels or Instructions.** The component ships no visible label, and the basic demos use a `slotProps.input` `aria-label` only (a name for assistive technology, but no label presented to all users). A visible label via `FormControlLabel` or adjacent text is required.
- ⚠️ **4.1.2 Name, Role, Value.** The `indeterminate` state sets `aria-checked="mixed"` on the native checkbox, which ARIA in HTML disallows because the native `.checked` is `false` (axe `aria-conditional-attr` flags it). The conforming fix is to set the native `.indeterminate` property instead.

## Success criteria

### 🔍 Manual

#### 1.3.2 Meaningful Sequence · A

`🚩 Unverified` · `✅ Supports` · `○ Author`

- The checkbox is one control: the hidden `<input>` followed by the `aria-hidden` checkmark icon, with `FormControlLabel` placing the label and control in source order, so the exposed reading order matches the visual order. The component applies no CSS reordering to itself.
- Order carries meaning only across several controls, which the surrounding layout sets. `labelPlacement="start"` flips the label/control visually with `row-reverse`, so confirm the reading order of a checkbox group still matches its visual order.

**Manual testing steps**

1. Open `CheckboxesGroup` and press <kbd>Tab</kbd> through the rows, noting the focus order.
2. Compare that order to the visual top-to-bottom order.
3. Watch for `labelPlacement` or flex layouts that reorder the row visually without changing the DOM.

**Pass:** focus and reading order match the visual order.

#### 1.3.3 Sensory Characteristics · A

`🚩 Unverified` · `✅ Supports` · `○ Author`

- The component renders no instructional text of its own, so it introduces no shape-, color-, or position-only instructions.
- Surrounding copy must not rely on sensory characteristics alone (for example "check the green box" or "the boxes on the right"). That is authored content.

**Manual testing steps**

1. Review the copy near checkboxes for sensory-only references.
2. Check that each also names the checkbox by its label.

**Pass:** no instruction relies on color, shape, size, or position without naming the control.

#### 1.4.5 Images of Text · AA

`🚩 Unverified` · `✅ Supports` · `○ Author`

- Labels and helper text render as live DOM text; the checkmark icon is a vector graphic, not an image of text, and it carries no textual information.
- This fails only if an author passes an image of text as the label. Use real text unless it is a logo.

**Manual testing steps**

1. Inspect the label and helper nodes and confirm they are selectable live text, not `<img>` or background images of text.
2. Confirm no label uses an image of text.

**Pass:** labels and helper text are live text.

#### 2.4.11 Focus Not Obscured (Minimum) · AA

`🚩 Unverified` · `✅ Supports` · `○ Author`

- The checkbox is an ordinary focusable control and never places itself behind other content. Obscuring comes from sticky headers, banners, or overlays in the surrounding layout.
- Confirm by moving focus to a checkbox beneath any sticky or overlay content at several scroll positions. At least part of it must stay visible.

**Manual testing steps**

1. In a page with a sticky header, footer, or banner, scroll so a checkbox sits under the sticky element.
2. Press <kbd>Tab</kbd> to move focus onto it.

**Pass:** at least part of the focused checkbox stays visible, never fully covered.

#### 3.2.4 Consistent Identification · AA

`🚩 Unverified` · `✅ Supports` · `○ Author`

- The component surfaces whatever name the author supplies, stably per props, which is the precondition for consistent identification.
- Consistency is a cross-page property. Confirm that checkboxes with the same function share a label, and that one label is not reused for different functions.

**Manual testing steps**

1. List the checkboxes that do the same job across the product.
2. Compare their labels.

**Pass:** the same function uses the same label, and no label is reused for different functions.

### 🔁 Hybrid

#### 1.1.1 Non-text Content · A

`✅ Supports` · `◐ Shared`

- The default `CheckBox*` icons, and any MUI `SvgIcon` passed via `icon`/`checkedIcon`, default to `aria-hidden`, so they stay decorative; the accessible name comes from the label, not the checkmark icon.
- The name is not self-supplied: a bare `<Checkbox />` has none. It is satisfied when the author wraps it in `FormControlLabel` (a real `<label>`) or passes `slotProps.input` `aria-label`/`aria-labelledby`, as the docs instruct. axe-core `label` confirms a non-empty name across the enrolled demos in `checkboxes.a11y.json`.

**Manual testing steps**

1. Render `<FormControlLabel control={<Checkbox />} label="Subscribe" />` and confirm the accessibility tree shows `role=checkbox` named "Subscribe".
2. Render a bare `<Checkbox />` and confirm it has an empty name, the failure mode authors must avoid.
3. Confirm the checkmark icon's SVG is `aria-hidden`.

**Pass:** every checkbox exposes a non-empty accessible name and the checkmark icon stays `aria-hidden`.

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `◐ Shared`

- The native `<input type="checkbox">` exposes role and checked state; `indeterminate` sets `aria-checked="mixed"` (unit-tested); `required` and `disabled` map to the native attributes; `FormControlLabel` associates the label through a real `<label>`; and `FormControl component="fieldset"` with `FormLabel component="legend"` gives a group its name. axe-core's ARIA rules (`aria-allowed-attr`, `aria-valid-attr-value`, `aria-prohibited-attr`, `form-field-multiple-labels`) pass across the demos. The one exception is the `indeterminate` state's non-conforming `aria-checked="mixed"`, tracked as a gap under 4.1.2.
- Two relationships are the author's to wire. `FormHelperText` is a bare `<p>` with no `aria-describedby`, so helper and error text are not tied to the control, and a tri-state "select all" parent is not linked to its children. Add `aria-describedby` and the group wiring in the application.

**Manual testing steps**

1. Render `<FormControlLabel control={<Checkbox required />} label="Accept terms" />` and confirm `role=checkbox`, the name, `required`, and the wrapping `<label>`.
2. Toggle indeterminate and confirm `aria-checked` cycles `true`/`false`/`mixed`.
3. In `CheckboxesGroup`, confirm the `<fieldset>`/`<legend>` name is exposed but the error and required constraint are not (no `aria-describedby`/`aria-invalid`).

**Pass:** role, states, label association, and group name are programmatically determinable, and any helper/error text is tied to the control via author-supplied `aria-describedby`.

#### 1.4.1 Use of Color · A

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- State is conveyed by the checkmark icon's shape, not color: an empty square (unchecked), a square with a check (checked), and a square with a dash (indeterminate). A color-blind user can tell all three apart.
- The group error state is color-only: `FormHelperText` conveys it through red text. Pair it with text or an icon. (Required, by contrast, shows a visible `*`, which is a non-color cue, so it is fine.) That is author content.

**Manual testing steps**

1. Render unchecked, checked, and indeterminate and view in grayscale (DevTools Rendering, Emulate vision deficiencies, Achromatopsia); confirm all three remain distinguishable.
2. Render an error `FormHelperText` in grayscale and confirm "error" is still perceivable without the red.

**Pass:** the three states are distinguishable by shape, and any error state is conveyed by more than color.

#### 1.4.3 Contrast (Minimum) · AA

`✅ Supports` · `◐ Shared`

- This criterion governs the visible text (the label and helper text), not the checkmark icon, which is covered by 1.4.11. The label uses `text.primary` (about 16:1 on white, 18:1 on the dark surface) and helper text uses `text.secondary` (about 5.7:1); error helper text `error.main` computes 4.98:1 on white, the tightest text case but above the 4.5:1 threshold. axe-core `color-contrast` passes on the labeled demos (recorded in `checkboxes.a11y.json`); the disabled label text is correctly treated as exempt.
- The component renders no text on a colored fill, so unlike a contained button there is no label-on-background risk. Custom label colors or a colored container behind the row are the author's to check. Disabled text is exempt.

**Manual testing steps**

1. Measure the label and helper text against the real background in light and dark themes.
2. Pay attention to light-mode error text (`#d32f2f`, about 5:1) on any non-white background.
3. Re-check any custom label color.

**Pass:** label and helper/error text meet 4.5:1 (3:1 for large text) against the actual background.

#### 1.4.11 Non-text Contrast · AA

`🚩 Unverified` · `⚠️ Partially Supports` · `● Component`

- This criterion, not 1.4.3, governs the checkmark icon at 3:1, and every default state passes against the default page background (`#fff` light, `#121212` dark). In light mode `warning` is the tightest at 3.11:1, `info` 3.86:1, `primary` 4.60:1, the unchecked `text.secondary` outline 5.74:1, and the white check on the primary fill 4.60:1; dark mode clears 3:1 with room to spare (error, the lowest, is about 5:1). `warning.main` is tuned in the palette as "closest to orange[800] that pass 3:1", so a colored container behind the checkbox eats its small headroom first. Disabled (`action.disabled`, about 1.9:1) is exempt.
- The gaps are the focus indicator and customization. The keyboard focus indicator's contrast is untested, and `disableRipple`/`disableFocusRipple` removes it. Custom icons can fall below 3:1: the `CustomizedCheckbox` unchecked box is `#f5f8fa` with a faint inset border, about 1.1:1 against the page and 1.5:1 at the edge.

**Manual testing steps**

1. Measure the unchecked outline and each checked color (`primary` through `warning`) against the background; confirm 3:1, checking `warning` specifically.
2. Measure the keyboard focus indicator against the colors next to it.
3. Audit any custom icons (the Blueprint unchecked box is a known fail) and treat disabled as exempt.

**Pass:** the indicator in every active state (unchecked outline, checked fill, indeterminate dash) and the focus indicator are 3:1 against adjacent colors; disabled is exempt.

#### 1.4.12 Text Spacing · AA

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- The component sets no text styles of its own and no fixed heights that would clip under user text-spacing overrides; the label is normal flowing text that wraps, and the checkmark icon is a fixed vector unaffected by spacing.
- Whether a long label clips depends on the author's container, not the checkbox.

**Manual testing steps**

1. Apply the WCAG text-spacing overrides via the DevTools console: `document.head.insertAdjacentHTML('beforeend','<style>*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}</style>')`.
2. Confirm labels and helper text are not clipped or overlapping and the control still toggles.

**Pass:** applying the text-spacing overrides causes no clipping, overlap, or loss of text or function.

#### 2.4.6 Headings and Labels · AA

`✅ Supports` · `◐ Shared`

- The component renders whatever label and group legend the author supplies; descriptiveness is a content decision. This criterion does not require a label to exist, only that any provided label describes its purpose. axe-core `label` confirms a name is present across the demos; whether it is descriptive is a manual review.
- A vague label ("Option 1") would fail, and the component cannot enforce wording.

**Manual testing steps**

1. Read each checkbox label and group legend.
2. Confirm each describes the option ("Email notifications", not "Option 1").

**Pass:** every provided label and legend describes its purpose.

#### 2.4.7 Focus Visible · AA

`🚩 Unverified` · `⚠️ Partially Supports` · `● Component`

- `ButtonBase` removes the user-agent outline (`outline: 0`). In the default configuration keyboard focus adds the `.Mui-focusVisible` class plus a centered focus ripple, so an indicator is shown.
- `disableRipple` or `disableFocusRipple` removes the default focus indicator (the focus ripple), leaving none unless the author adds `.Mui-focusVisible` styles. The `CustomizedCheckbox` demo does this, re-adding a 2px outline.

**Manual testing steps**

1. Press <kbd>Tab</kbd> to a default `<Checkbox />` and confirm a visible focus indicator appears.
2. Press <kbd>Tab</kbd> to a `<Checkbox disableRipple />` (or `disableFocusRipple`) with no custom styles and confirm none appears.
3. Click with the mouse and confirm the indicator is keyboard-only.

**Pass:** every keyboard-focused checkbox shows a visible indicator, including `disableRipple` via author-supplied styles. Today a bare `disableRipple` checkbox shows none.

#### 2.5.3 Label in Name · A

`✅ Supports` · `◐ Shared`

- With `FormControlLabel` and a string label, the accessible name equals the visible text, so the name contains the label. The required `*` is symbolic punctuation, not part of the label, so it is correctly excluded from the name; native `required` conveys that state instead. A `getByRole('checkbox', { name })` test in [`Checkbox.test.js`](./Checkbox.test.js) confirms the accessible name matches the visible label.
- A `slotProps.input` `aria-label` that differs from the visible text breaks this. Keep the visible words in the name.

**Manual testing steps**

1. Render `<FormControlLabel control={<Checkbox />} label="Remember me" />` and confirm the accessible name contains "Remember me".
2. If an `aria-label` is set, confirm it includes the visible text.
3. Try a voice command speaking the visible label and confirm it activates the checkbox.

**Pass:** the accessible name contains the visible label text.

#### 3.3.2 Labels or Instructions · A

`🚩 Unverified` · `⚠️ Partially Supports` · `◐ Shared`

- A label must be presented to all users, not only exposed to assistive technology. The Understanding document is explicit that a name exposed only to assistive technology (an `aria-label`) can pass 4.1.2 yet fail this criterion.
- The component ships no visible label, and the basic demos (`Checkboxes`, `ColorCheckboxes`, `IconCheckboxes`, `CustomizedCheckbox`) supply only `slotProps.input` `aria-label="Checkbox demo"`, a name for assistive technology with no visible label. `FormControlLabel`, as used in `CheckboxLabels` and `CheckboxesGroup`, is the conforming pattern.

**Manual testing steps**

1. For each checkbox, confirm a visible label or instruction is shown to all users.
2. Flag instances that rely on an `aria-label` only (no visible text).
3. Confirm bare checkboxes are wrapped in `FormControlLabel` or paired with visible instructions.

**Pass:** each checkbox has a visible label or instruction. An `aria-label`-only checkbox fails.

#### 4.1.2 Name, Role, Value · A

`⚠️ Partially Supports` · `◐ Shared`

- Role, checked, and disabled are met natively: the native `<input type="checkbox">` exposes `role=checkbox`, the checked state, and change notification with no ARIA needed, and `disabled` maps to native `disabled`. axe-core (`aria-allowed-attr`, `aria-valid-attr-value`, `label`, `nested-interactive`) and unit tests in [`Checkbox.test.js`](./Checkbox.test.js) (role resolves, `checked` flips on click, `disabled` through `FormControl`) confirm them.
- The `indeterminate` state is the failing part: it sets `aria-checked="mixed"` on the native `<input type="checkbox">`, which ARIA in HTML disallows because the native `.checked` stays `false`, so axe `aria-conditional-attr` records a violation on `IndeterminateCheckbox` in `checkboxes.a11y.json`. Major screen readers do announce "mixed" and the value is unit-tested, but a `mixed` state on a native checkbox is not guaranteed across browsers. The conforming fix is to set the native `.indeterminate` property instead of `aria-checked` (MUI currently avoids `.indeterminate`, citing cross-browser inconsistency).
- The name is the shared part: it comes from the author's `FormControlLabel` or `aria-label`. One caveat: `readOnly` sets the native `readonly` attribute, which has no effect on a checkbox and is not exposed to assistive technology, so a read-only checkbox is not announced as such. Use `disabled` or `aria-readonly` if that state must be conveyed.

**Manual testing steps**

1. Render a labeled checkbox and confirm `role=checkbox` with a non-empty name in the accessibility tree.
2. Toggle it with a screen reader running and confirm the state change is announced.
3. Render `indeterminate` and confirm "mixed" or partially checked is announced.

**Pass:** the role, the checked/unchecked/mixed/disabled state with change notification, and an author-supplied accessible name are all programmatically determinable.

### ⚙️ Automated

#### 1.4.4 Resize Text · AA

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- The checkmark icon is an `SvgIcon` whose size comes from `fontSize` in `rem` (medium 24px = 1.5rem, small 20px = 1.25rem) with a `1em` box, so it scales with browser zoom or root font size; the label is normal text. Nothing is pixel-fixed.
- A fixed-pixel container in the surrounding layout could clip at 200%.

**Manual testing steps**

1. Set browser zoom to 200% and confirm the checkbox, label, and helper text are fully visible and the control still toggles.
2. Test a long label inside a constrained-width container.

**Pass:** nothing is clipped or cut off at 200%.

#### 1.4.10 Reflow · AA

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- The checkbox is a small inline-flex control with no fixed min-width and no horizontal-overflow layout of its own, so it reflows into a 320 CSS pixel viewport.
- Real failures usually come from the surrounding layout. `CheckboxesGroup` places two fieldsets in a non-wrapping flex row, which can overflow at 320 pixels.

**Manual testing steps**

1. Set the viewport to 320 CSS pixels wide (or 400% zoom at 1280px) and confirm checkbox rows stack with no horizontal scrollbar.
2. Confirm any multi-column group collapses to one column.

**Pass:** content reflows to one column with no two-dimensional scrolling and no loss of function.

#### 2.1.1 Keyboard · A

`✅ Supports` · `● Component`

- The native `<input type="checkbox">` is the single focusable control (the root span is `role: undefined`, `tabIndex: null`), so the browser provides <kbd>Tab</kbd> focus and <kbd>Space</kbd> toggle with no timing or path dependence, matching the [APG checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/). Disabled leaves the tab order.
- Confirmed by a <kbd>Space</kbd>-key toggle test in [`Checkbox.test.js`](./Checkbox.test.js): focus the input, press <kbd>Space</kbd>, and assert `checked` flips and `onChange` fires on each press.

#### 2.1.2 No Keyboard Trap · A

`✅ Supports` · `● Component`

- A single native input with standard <kbd>Tab</kbd> in and out. It installs no focus-capturing handlers and no containment logic, so focus cannot be trapped. A `user.tab()` test in [`Checkbox.test.js`](./Checkbox.test.js) confirms focus enters and leaves with <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd>.

#### 2.4.3 Focus Order · A

`✅ Supports` · `◐ Shared`

- The checkbox is one focusable element in natural DOM order, with no positive `tabIndex` and no reordering, so it is one correct focus stop. A `user.tab()` test in [`Checkbox.test.js`](./Checkbox.test.js) confirms it takes a single tab stop in DOM order; whether that order preserves meaning in a given layout stays a manual check.
- Order across controls, and group order, is the surrounding layout's responsibility.

#### 2.5.2 Pointer Cancellation · A

`✅ Supports` · `● Component`

- Toggling runs on the native input's `click`, fired on pointer-up over the target. Nothing toggles on the down event (the ripple starts there but is decorative), and releasing off the control cancels. A pointer test in [`Checkbox.test.js`](./Checkbox.test.js) confirms mouse-down alone does not toggle and a release over the target does.

#### 2.5.8 Target Size (Minimum) · AA

`✅ Supports` · `◐ Shared`

- The target is the padded root, not the icon (the input fills it at 100%): medium is a 24px icon plus 2 by 9px padding = 42px, and `size="small"` is 38px, both above the 24 by 24 CSS pixel minimum. A custom 16px icon still yields 34px. axe-core `target-size` confirms this across the demos in `checkboxes.a11y.json`.
- It would drop below 24px only if an author both shrinks the icon and removes the padding. Custom `sx`/`size` overrides and hit-area changes under browser zoom are not covered.

#### 3.2.1 On Focus · A

`✅ Supports` · `● Component`

- Focusing the input only moves focus and shows the focus indicator. There is no navigation, dialog, or content change on focus, and the component registers no `onFocus` side effects. A focus test in [`Checkbox.test.js`](./Checkbox.test.js) confirms focusing fires no `onChange` and changes no state.

#### 3.2.2 On Input · A

`✅ Supports` · `◐ Shared`

- Toggling only flips the checked or indeterminate state and fires `onChange`; per the Understanding document, changing a control's value is not a change of context. `readOnly` short-circuits the change. The click-toggle test in [`Checkbox.test.js`](./Checkbox.test.js) confirms toggling updates the value and fires `onChange` with no context change.
- An author `onChange` that navigates or submits without warning would be an author-side failure.

## Not applicable

- **1.3.5 Identify Input Purpose (AA).** Covers inputs that collect information about the user through `autocomplete`. A boolean checkbox is not one of those input purposes.
- **1.4.13 Content on Hover or Focus (AA).** Needs additional content such as a tooltip or popover. The checkbox only restyles itself; a `Tooltip` wrapper would own this.
- **2.1.4 Character Key Shortcuts (A).** The only key is <kbd>Space</kbd>, and only while focused. There is no single-character shortcut.
- **2.2.2 Pause, Stop, Hide (A).** No auto-starting moving, blinking, or auto-updating content.
- **2.4.4 Link Purpose (In Context) (A).** The component renders no links.
- **2.5.7 Dragging Movements (AA, new in 2.2).** Covers drag operations. The checkbox toggles by tap or click.
- **3.1.1 Language of Page (A), 3.1.2 Language of Parts (AA).** The component emits no `<html lang>` and no text of its own. A foreign-language label is the author's phrase to mark.
- **3.2.3 Consistent Navigation (AA).** Covers repeated navigation across a set of pages, not a single control.
- **3.2.6 Consistent Help (A, new in 2.2).** Covers consistent placement of help across pages.
- **3.3.7 Redundant Entry (A, new in 2.2).** Covers repopulating previously entered data. The checkbox captures none.
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2).** The paste, autofill, and cognitive-test duty falls on the credential fields, not a checkbox.
- **4.1.3 Status Messages (AA).** The checkbox emits no status messages; its checked-state change is covered by 4.1.2.
- **Time-based media (1.2.1 to 1.2.5).** No audio or video.
- **Audio Control (1.4.2).** Emits no audio.
- **Orientation (1.3.4).** Sets no orientation lock; a layout concern.
- **Bypass Blocks (2.4.1), Page Titled (2.4.2), Multiple Ways (2.4.5).** Page or site structure, not a single control.
- **Timing Adjustable (2.2.1).** Sets no time limit.
- **Three Flashes or Below Threshold (2.3.1).** Nothing flashes.
- **Pointer Gestures (2.5.1), Motion Actuation (2.5.4).** Toggles on a simple click; reads no device motion.
- **Error Identification (3.3.1), Error Suggestion (3.3.3), Error Prevention (3.3.4).** The checkbox collects and validates no input; these belong to the form or process. When an author surfaces an error, identify it in text and tie it to the control with `aria-describedby` (tracked under 1.3.1).

## Level AAA

The following SC are applicable but out of scope:

- **2.3.3 Animation from Interactions.** The ripple's `scale()` animation honors `prefers-reduced-motion` when the theme sets `motion.reducedMotion` to `system` (follows the OS) or `always`; `disableRipple` also removes it. The default is `never`, so OS reduced-motion is not honored by default. `🚩`
- **2.4.13 Focus Appearance.** The focus ripple is unlikely to meet the area and 3:1 thresholds, and `disableRipple` removes it. `🚩`
- **2.5.5 Target Size (Enhanced), 44 px.** Default sizes (42px medium, 38px small) are below 44px. `🚩`
- **1.4.6 Contrast (Enhanced), 7:1.** The label (`text.primary`, about 16:1) clears 7:1, but helper text (about 5:1) and the checkmark icon fall short where the 7:1 text bar applies. `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.3.6 Identify Purpose, 1.4.9 Images of Text (No Exception), 2.1.3 Keyboard (No Exception), 2.4.12 Focus Not Obscured (Enhanced)**.

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.1.
- **Scope.** The Checkbox component and its documented composition with `FormControlLabel`, `FormControl`/`FormGroup`, `FormLabel`, and `FormHelperText`, rendered through the documented API.
- **Automated.** axe-core via the Playwright visual-regression harness (results in [`checkboxes.a11y.json`](../../../../docs/data/material/components/checkboxes/checkboxes.a11y.json)), plus interaction tests in [`Checkbox.test.js`](./Checkbox.test.js). Glyph contrast is computed from the theme tokens, since no axe rule covers non-text contrast.
- **Assistive-technology review.** Not yet performed. `🚩` criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
