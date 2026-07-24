# TextField accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

| Result                | Count |
| :-------------------- | :---- |
| ✅ Supports           | 25    |
| ⚠️ Partially Supports | 3     |
| ❌ Does Not Support   | 0     |
| ➖ Not Applicable     | 27    |
| 🚩 Flagged            | 9/28  |

## Known gaps

- ⚠️ **1.4.3 Contrast (Minimum).** The placeholder (about 2.55:1), the focused `warning` label (3.11:1), and the focused color labels on the filled surface (`primary` 4.04:1) fall short of 4.5:1.
- ⚠️ **1.4.11 Non-text Contrast.** The default `outlined` resting border (`rgba(0, 0, 0, 0.23)`, about 1.74:1) is below 3:1; the `filled` underline (about 3.03:1) clears it only marginally.
- ⚠️ **4.1.3 Status Messages.** A dynamically shown error is associated to the input but is not a live region, so it may go unannounced when focus is elsewhere.

## Success criteria

### 🔍 Manual

#### 1.3.2 Meaningful Sequence · A

`✅ Supports` · `○ Author`

- The field renders in source order (label, input, helper text), so the exposed reading order matches the visual order; the component applies no CSS reordering of its own.
- Order carries meaning only across several fields, which the surrounding form layout sets.

**Manual testing steps**

1. In a form with several text fields, press <kbd>Tab</kbd> through them, noting the focus order.
2. Compare that order to the visual order, and confirm each label reads before its input.

**Pass:** focus and reading order match the visual order.

#### 1.3.3 Sensory Characteristics · A

`✅ Supports` · `○ Author`

- The component renders no instructional text of its own.
- Surrounding copy must not rely on sensory characteristics alone (for example "the field outlined in red" or "the field on the right").

**Manual testing steps**

1. Review the copy near a field for sensory-only references.
2. Check that each also names the field by its label.

**Pass:** no instruction relies on color, shape, size, or position without naming the field.

#### 1.4.4 Resize Text · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The label, input value, and helper text are set in `rem`, so they scale with browser zoom or root font size rather than staying pixel-fixed.
- A fixed-pixel container in the surrounding layout could clip the field at 200%.

**Manual testing steps**

1. In a form with text fields, set browser zoom to 200% (<kbd>Ctrl</kbd> or <kbd>Cmd</kbd> and <kbd>+</kbd>).
2. Confirm the label, value, and helper text are fully visible and the field still accepts input.

**Pass:** nothing is clipped or cut off at 200%.

#### 1.4.5 Images of Text · AA

`✅ Supports` · `○ Author`

- The label, input value, and helper text render as live DOM text, not images of text.
- This fails only if an author passes an image of text as the `label` or `helperText`. Use real text unless it is a logo.

**Manual testing steps**

1. Inspect the label and helper nodes and confirm they are selectable live text, not `<img>` or background images of text.

**Pass:** labels and helper text are live text.

#### 1.4.10 Reflow · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The field is an inline-flex control with no fixed min-width of its own, and `fullWidth` makes it fill the container, so it reflows into a 320 CSS pixel viewport.
- Real failures usually come from the surrounding layout, such as a row of fields that does not wrap.

**Manual testing steps**

1. Set the viewport to 320 CSS pixels wide (or 400% zoom at 1280px) and confirm fields stack with no horizontal scrollbar.
2. Confirm a long helper text wraps rather than overflowing.

**Pass:** content reflows to one column with no two-dimensional scrolling and no loss of function.

#### 1.4.11 Non-text Contrast · AA

`🚩` · `⚠️ Partially Supports` · `● Component`

- This criterion, not 1.4.3, governs the input boundary at 3:1, and the default `outlined` resting border (`rgba(0, 0, 0, 0.23)`, about `1.74:1` against a white page) does not meet it; the `filled` underline (`rgba(0, 0, 0, 0.42)`, about `3.03:1`) clears it only marginally. On an empty field the border is the only visual indicator of the input's presence, so it is the identifier 1.4.11 requires at 3:1; the boundary exemption applies only when the control has internal visible content that already identifies it, which an empty field lacks.
- The states that do pass are the hover border (`text.primary`), the 2px focus border (`color.main`, `4.60:1` for the default `primary`), and the error border (`error.main`, `4.98:1`); disabled (`action.disabled`, about `1.88:1`) is exempt.

**Manual testing steps**

1. With a contrast checker, measure the resting `outlined` border and the `filled` underline against the page behind them.
2. Press <kbd>Tab</kbd> into a field and measure the 2px focus border against the adjacent colors.
3. Treat disabled fields as exempt.

**Pass:** the resting boundary and the focus indicator are each `3:1` against adjacent colors. Today the resting `outlined` border is the known failure.

#### 2.4.7 Focus Visible · AA

`🚩` · `✅ Supports` · `● Component`

- Keyboard focus thickens the `outlined` notched outline to a 2px `color.main` border and grows the `filled` underline to a 2px `color.main` line, a clear change from the resting state.
- Unlike the `ButtonBase` controls, no documented prop removes this indicator; an author would have to override the `.Mui-focused` styles to lose it.

**Manual testing steps**

1. Press <kbd>Tab</kbd> to move focus into an `outlined` field and a `filled` field.
2. Confirm a clear focus indicator appears and looks different from the hover style.

**Pass:** every keyboard-focused field shows a visible indicator.

#### 2.4.11 Focus Not Obscured (Minimum) · AA

`✅ Supports` · `○ Author`

- The field is an ordinary focusable control and never places itself behind other content. Obscuring comes from sticky headers, banners, or overlays in the surrounding layout.
- Confirm by moving focus to a field beneath any sticky or overlay content at several scroll positions. At least part of it must stay visible.

**Manual testing steps**

1. In a page with a sticky header, footer, or banner, scroll so a field sits under the sticky element.
2. Press <kbd>Tab</kbd> to move focus onto it.

**Pass:** at least part of the focused field stays visible, never fully covered.

#### 2.5.2 Pointer Cancellation · A

`🚩` · `✅ Supports` · `● Component`

- The native `<input>` runs no command on the pointer down-event; clicking only moves focus, which is reversible by clicking elsewhere.
- The component registers no custom pointer handler that would act before pointer-up.

**Manual testing steps**

1. Press and hold the pointer on a field, then drag off it before releasing.
2. Confirm nothing is submitted or triggered by the press alone.

**Pass:** no irreversible action runs on the pointer down-event.

#### 3.2.4 Consistent Identification · AA

`✅ Supports` · `○ Author`

- The component exposes whatever label the author supplies.
- Consistency is a cross-page property. Confirm that fields with the same function share a label, and that one label is not reused for different functions.

**Manual testing steps**

1. List the fields that collect the same data across the product (for example, every "Email").
2. Compare their labels.

**Pass:** the same function uses the same label, and no label is reused for different functions.

#### 3.3.3 Error Suggestion · AA

`✅ Supports` · `○ Author`

- When an author detects an error and passes an error message to `helperText`, the component renders text and associates it

**Manual testing steps**

1. In a field showing a validation error (`error` with a `helperText` message), read the helper text.
2. Confirm it suggests how to fix the entry ("Enter a valid email", not just "Invalid").

**Pass:** a detected error offers a correction suggestion when one is known.

#### 4.1.3 Status Messages · AA

`🚩` · `⚠️ Partially Supports` · `◐ Shared`

- When `error` and `helperText` change, the message is tied to the input through `aria-describedby` and the input gains `aria-invalid`, but `FormHelperText` is a plain `<p>` with no `aria-live` or `role="alert"`, so an error that appears while focus is elsewhere may not be announced.
- This matters for validation that runs on submit or asynchronously. Wrap the message in a live region in the surrounding application if it must be announced.

**Manual testing steps**

1. With a screen reader running (NVDA with Chrome, or VoiceOver with Safari), toggle a field into the error state (`error` with a `helperText` message) while focus is on another element.
2. Listen for whether the new error is announced.

**Pass:** the error is announced without the user moving focus to it.

### 🔁 Hybrid

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `◐ Shared`

- The visible `<label>` is tied to the input through `htmlFor`/`id`; `helperText` is linked through `aria-describedby`; `error` sets `aria-invalid`; and `required` maps to the native `required` attribute. Covered by axe-core.
- Whether a runtime error or required-state change is announced needs manual verification.

**Manual testing steps**

1. In a form with labeled fields, some `required` and some in the `error` state with `helperText`, inspect the accessibility tree.
2. Confirm each input is named by its label, described by its helper text, and exposes `required` and the invalid state where set.

**Pass:** label, description, required, and invalid relationships are programmatically determinable.

#### 1.3.5 Identify Input Purpose · AA

`✅ Supports` · `○ Author`

- The `autoComplete` prop is forwarded to the input's `autocomplete` attribute, so a field collecting information about the user can expose its purpose. Covered by axe-core and unit tests.
- The component sets no token by default; choosing the correct token, and only for fields about the user, is the author's responsibility.

**Manual testing steps**

1. For a password field with `autoComplete="current-password"`, confirm the rendered input carries `autocomplete="current-password"`.
2. For each field collecting user data, confirm an appropriate `autoComplete` token is set.

**Pass:** every field about the user exposes a valid input-purpose token.

#### 1.4.1 Use of Color · A

`🚩` · `✅ Supports` · `◐ Shared`

- The documented validation pattern pairs `error` with a descriptive `helperText` message, so the error is conveyed by the text, not the red styling alone; the `required` state likewise adds the non-color `*` glyph alongside the native `required` attribute.

**Manual testing steps**

1. View a field in the `error` state, with its `helperText` message, in grayscale (DevTools Rendering, Emulate vision deficiencies, Achromatopsia).
2. Confirm the error is still identifiable from the message text, not the red alone.

**Pass:** the error state is conveyed by more than color (the `helperText` message), not the red alone.

#### 1.4.3 Contrast (Minimum) · AA

`⚠️ Partially Supports` · `● Component`

- This criterion governs the visible text. The input value (`text.primary`, about 16:1), the resting label and helper text (`text.secondary`, `5.74:1`), the `outlined` focused `primary` label on the white page (`4.60:1`), and error text on white (`error.main`, `4.98:1`) pass. The placeholder (about `2.55:1`) and the focused `warning` label (`3.11:1`) fall short, and the `filled` surface (`#f0f0f0`) drops each focused label about `0.5:1` lower, so the focused `primary` (`4.04:1`), `error` (`4.36:1`), and `success` (`4.49:1`) labels also fail there. Covered by axe-core; disabled text is exempt.
- The placeholder opacity and the failing palette colors are component defaults; custom label colors are the author's to check.

**Manual testing steps**

1. With a contrast checker, measure each focused label (across the `color` values in use) against its background, in both the `outlined` and `filled` variants.
2. Measure a placeholder against the input background, and error text against the `filled` surface.

**Pass:** label, value, placeholder, and error text meet `4.5:1` (`3:1` for large text) against the actual background. The placeholder, focused `warning`, and filled-surface error text are the known failures.

#### 1.4.12 Text Spacing · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The component has no styles that would block user overrides, so the WCAG text-spacing values apply to the label, value, and helper text. Covered by axe-core (`avoid-inline-spacing`).
- The single-line input has a fixed height, so confirm by eye that a long label or helper text does not clip when the spacing values are applied.

**Manual testing steps**

1. On a field with a long label and helper text, apply the WCAG text-spacing overrides via the DevTools console: `document.head.insertAdjacentHTML('beforeend','<style>*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}</style>')`.
2. Confirm labels, values, and helper text are not clipped or overlapping and the field still accepts input.

**Pass:** applying the text-spacing overrides causes no clipping, overlap, or loss of text or function.

#### 2.4.6 Headings and Labels · AA

`✅ Supports` · `◐ Shared`

- The `label` is the field's descriptive label; the component renders whatever the author supplies. axe-core covers that a label is present; whether it describes the field is a manual review.
- A vague label ("Field 1") would fail, and the component cannot enforce wording.

**Manual testing steps**

1. Read each field's label.
2. Confirm each describes the data requested ("Email address", not "Field 1").

**Pass:** every provided label describes its field.

#### 3.3.2 Labels or Instructions · A

`🚩` · `✅ Supports` · `◐ Shared`

- A label must be presented to all users, not only exposed to assistive technology; the documented `label` prop renders a visible `<label>`, which the Understanding document distinguishes from an `aria-label`-only name that passes 4.1.2 but fails this criterion. axe-core confirms an accessible name is present, not that it is a visible label, so the visible-label requirement is a manual check.
- An author can still defeat it: a `hiddenLabel` field given neither a `label` nor an `aria-label` has no accessible name at all.

**Manual testing steps**

1. For each field, confirm a visible label or instruction is shown to all users.
2. Flag fields that rely on a placeholder or `aria-label` only.

**Pass:** each field has a visible label or instruction. A placeholder-only or `aria-label`-only field fails.

#### 4.1.2 Name, Role, Value · A

`✅ Supports` · `◐ Shared`

- The native `<input>` exposes `role=textbox`, its value, and change notification; `error` sets `aria-invalid`, `required` sets the native `required`, and `disabled` sets the native `disabled`. The accessible name comes from the associated `<label>`. Covered by axe-core and unit tests.
- The name is the shared part: it depends on the author's `label` (or `aria-label`). Whether the name is meaningful and a runtime state change is announced needs an assistive-technology review.

**Manual testing steps**

1. With a screen reader running, <kbd>Tab</kbd> to a labeled field, a `required` field, and a field in the `error` state.
2. Confirm the announced name, role, required, and invalid state are correct for each.

**Pass:** name, role, value, and the required and invalid states are programmatically determinable.

### ⚙️ Automated

#### 2.1.1 Keyboard · A

`✅ Supports` · `● Component`

- The native `<input>` and `<textarea>` are fully keyboard operable: focus with <kbd>Tab</kbd>, type to edit, and disabled fields leave the tab order. Covered by unit tests.

#### 2.1.2 No Keyboard Trap · A

`✅ Supports` · `● Component`

- A single native input with standard <kbd>Tab</kbd> in and out; the component installs no focus-capturing handler, so focus cannot be trapped. Covered by unit tests.

#### 2.4.3 Focus Order · A

`✅ Supports` · `◐ Shared`

- The field is one focusable element in natural DOM order, with no positive `tabIndex`, so it is one correct focus stop. Covered by unit tests.
- Order across fields is the surrounding form's responsibility.

#### 2.5.3 Label in Name · A

`✅ Supports` · `◐ Shared`

- With the `label` prop, the accessible name equals the visible label text, so the name contains the label. Covered by axe-core and unit tests.
- An `aria-label` that differs from the visible label would break this. Keep the visible words in the name.

#### 2.5.8 Target Size (Minimum) · AA

`✅ Supports` · `● Component`

- The input fills the field, which is about 56px tall at the default `medium` size and about 40px at `size="small"`, both above the 24 by 24 CSS pixel minimum. Covered by axe-core.
- Not covered: `sx` overrides that shrink a custom field, or hit-area changes under browser zoom.

#### 3.2.1 On Focus · A

`✅ Supports` · `● Component`

- Focusing the input only moves focus and floats the label; there is no navigation, dialog, or content change, and the component registers no `onFocus` side effect. Covered by unit tests.

#### 3.2.2 On Input · A

`✅ Supports` · `◐ Shared`

- Typing only updates the value and fires `onChange`; per the Understanding document, changing a control's value is not a change of context. Covered by unit tests.
- An author `onChange` that navigates or submits without warning would be an author-side failure.

#### 3.3.1 Error Identification · A

`✅ Supports` · `◐ Shared`

- `error` sets `aria-invalid="true"` on the input and the `helperText` is linked through `aria-describedby`, so a detected error identifies the field and is described in text. Covered by unit tests.
- The message text is author-supplied; `error` without a `helperText` gives no text description, only color.

## Not applicable

- **1.1.1 Non-text Content (A).** The component renders no non-text content; the required `*` is decorative (`aria-hidden`) text duplicating the native `required` state, and any adornment image is author-supplied.
- **1.3.4 Orientation (AA).** Sets no orientation lock; a layout concern.
- **1.4.13 Content on Hover or Focus (AA).** Shows no hover- or focus-triggered content; the floating label only repositions the existing label.
- **2.1.4 Character Key Shortcuts (A).** Typing enters text into the field; the component binds no single-character shortcut.
- **2.2.2 Pause, Stop, Hide (A).** No auto-starting moving, blinking, or scrolling content; the label float is a brief user-triggered transition.
- **2.4.4 Link Purpose (In Context) (A).** The component renders no links.
- **2.5.7 Dragging Movements (AA, new in 2.2).** Covers drag operations; the field is operated by pointer and keyboard.
- **3.2.3 Consistent Navigation (AA).** Covers repeated navigation across a set of pages, not a single field.
- **3.2.6 Consistent Help (A, new in 2.2).** Covers consistent placement of help across pages.
- **3.3.4 Error Prevention (Legal, Financial, Data) (AA).** Applies to pages that cause legal or financial commitments, modify user data, or submit test responses; a field in isolation has no such transaction and provides none of the reversible, checked, or confirmed mechanisms.
- **3.3.7 Redundant Entry (A, new in 2.2).** Covers re-asking for information in the same multi-step process; a single field stores none.
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2).** Covers authentication cognitive-function tests; the field allows paste and does not suppress autocomplete or password managers, so any duty falls on the authentication process.
- **Time-based media (1.2.1 to 1.2.5).** No audio or video.
- **Audio Control (1.4.2).** Emits no audio.
- **Timing Adjustable (2.2.1).** Sets no time limit.
- **Three Flashes or Below Threshold (2.3.1).** Nothing flashes.
- **Bypass Blocks (2.4.1), Page Titled (2.4.2), Multiple Ways (2.4.5).** Page or site structure, not a single field.
- **Pointer Gestures (2.5.1), Motion Actuation (2.5.4).** Operated by a simple click and keyboard; reads no device motion.
- **Language of Page (3.1.1), Language of Parts (3.1.2).** The component emits no `<html lang>` and no text of its own; a foreign-language label is the author's phrase to mark.

## Level AAA

The following SC are applicable but out of scope:

- **2.3.3 Animation from Interactions.** The label float and border transitions are interaction-triggered and do not honor `prefers-reduced-motion` by default (the theme's `motion.reducedMotion` is `never`). `🚩`
- **2.4.13 Focus Appearance.** The 2px focus border is unlikely to meet the area and 3:1 thresholds in every state. `🚩`
- **2.5.5 Target Size (Enhanced), 44 px.** The default `medium` field (about 56px) clears 44px, but `size="small"` (about 40px) does not. `🚩`
- **1.4.6 Contrast (Enhanced), 7:1.** The input value (`text.primary`, about 16:1) clears 7:1, but the label and helper text (about 5.7:1) and the failing 1.4.3 cases fall short. `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.3.6 Identify Purpose, 1.4.9 Images of Text (No Exception), 2.1.3 Keyboard (No Exception), 2.4.12 Focus Not Obscured (Enhanced)**.

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.2.
- **Scope.** The TextField component in the `outlined` and `filled` variants, rendered through its documented API. The `select` mode (which renders a `Select`) and the `standard` variant are out of scope.
- **Automated.** axe-core via the Playwright visual-regression harness (results in [`text-fields.a11y.json`](../../../../docs/data/material/components/text-fields/text-fields.a11y.json)), plus interaction tests in [`TextField.test.js`](./TextField.test.js). Border, focus-indicator, and placeholder contrast are computed from theme tokens, since axe cannot resolve a value's background through the notched outline and no axe rule covers a non-text boundary.
- **Assistive-technology review.** Not yet performed. Flagged criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
