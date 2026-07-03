# ToggleButtonGroup accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

ToggleButtonGroup coordinates a set of [Toggle Button](../ToggleButton/accessibility.md) children, so this report rates only the criteria that exist or change because of the grouping. Each toggle's own conformance (contrast, target size, label in name, focus indicator, keyboard activation, and the rest) is rated in the [Toggle Button report](../ToggleButton/accessibility.md) and listed under [Inherited from Toggle Button](#inherited-from-toggle-button).

Unlike a radio group, ToggleButtonGroup adds no roving tab order and no arrow-key navigation: it wraps the toggles in a `role="group"` container, and each toggle stays an independent tab stop that activates on its own. Keyboard operation and focus order are therefore inherited per toggle, not rated here.

| Result                          | Count |
| :------------------------------ | :---- |
| ✅ Supports                     | 4     |
| ⚠️ Partially Supports           | 0     |
| ❌ Does Not Support             | 0     |
| ➖ Not Applicable               | 31    |
| ↗ Inherited (see Toggle Button) | 20    |
| 🚩 Flagged                      | 2/4   |

The first rows and Not Applicable count the 4 group-level criteria plus the 31 that do not apply; Inherited adds the 20 item-level criteria rated in Toggle Button (4 + 31 + 20 = 55). Flagged is the ratio of source-assessed to applicable group-level criteria; inherited criteria are excluded.

## Known gaps

No group-level gaps.

## Success criteria

### 🔍 Manual

#### 1.4.10 Reflow · AA

`🚩` · `✅ Supports` · `◐ Shared`

- Each toggle sizes to its content, but the group owns the layout: a horizontal group is `display: inline-flex` and does not wrap (`ToggleButtonGroup.js`), so a wide row of toggles can overflow horizontally at 320 CSS pixels.
- The component provides `orientation="vertical"` as the escape hatch; the author keeps the group within 320 pixels by switching orientation or limiting the number of toggles.

**Manual testing steps**

1. In a UI with a horizontal toggle button group, set the window (or the DevTools device toolbar) to 320 CSS pixels wide.
2. Confirm there is no sideways scrolling and every toggle is reachable, switching the group to vertical orientation if the row does not fit.

**Pass:** content reflows with no horizontal scroll.

### 🔁 Hybrid

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `◐ Shared`

- ToggleButtonGroup sets `role="group"` on its root (`ToggleButtonGroup.js`), so the toggles are exposed as one related set. axe-core's `aria-roles` and `aria-allowed-attr` pass across the group demos.
- The group's accessible name is the author's to set with `aria-label` or `aria-labelledby`; without one the grouping is exposed but unnamed.
- Confirmed by a unit test in [`./ToggleButtonGroup.test.js`](./ToggleButtonGroup.test.js).

**Manual testing steps**

1. With a screen reader running, move focus into the group and confirm the group and its name are announced (for example, "text alignment, group").
2. Render a group with no `aria-label` and confirm the group is exposed but unnamed.

**Pass:** the toggles are exposed as one group, named when the author supplies a label.

#### 2.4.6 Headings and Labels · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The group's label comes from the author's `aria-label`, the documented pattern ("text alignment" and "text formatting" in the demos).
- Whether the wording describes the set of choices depends on author content, a vague group label ("Options") would fail.

**Manual testing steps**

1. Read each toggle group's `aria-label`.
2. Confirm it describes the set of choices ("text alignment", not "Options").

**Pass:** every group label describes the set of toggles it contains.

#### 4.1.2 Name, Role, Value · A

`✅ Supports` · `◐ Shared`

- The group's role and value are met: `role="group"` names the relationship, and the selected value is exposed by each child's `aria-pressed`, which the group drives from its `value` and `exclusive` props (`ToggleButtonGroup.js`). axe-core `aria-roles`, `button-name`, and `nested-interactive` pass across the group demos.
- The group's name is the shared part, supplied by the author's `aria-label`.
- Confirmed by a unit test in [`./ToggleButtonGroup.test.js`](./ToggleButtonGroup.test.js).

**Manual testing steps**

1. With a screen reader running, focus each toggle in a group and confirm the group role, its author-supplied name, and each toggle's pressed state are announced.
2. Activate a toggle and confirm the pressed change is announced.

**Pass:** the group exposes its role and author-supplied name, and each toggle's pressed state and its changes are announced.

## Inherited from Toggle Button

- **1.1.1 Non-text Content (A).** Each toggle's icon handling and label-derived name.
- **1.3.2 Meaningful Sequence (A).** Each toggle's DOM-order content.
- **1.3.3 Sensory Characteristics (A).** Each toggle's reliance on its label, not sensory cues.
- **1.4.1 Use of Color (A).** Each toggle's selected-state color cue.
- **1.4.3 Contrast (Minimum) (AA).** Each toggle's label against its background.
- **1.4.4 Resize Text (AA).** Each toggle's rem-sized label.
- **1.4.5 Images of Text (AA).** Each toggle's live-text label.
- **1.4.11 Non-text Contrast (AA).** Each toggle's focus indicator and selected fill.
- **1.4.12 Text Spacing (AA).** Each toggle's label under spacing overrides.
- **2.1.1 Keyboard (A).** Each toggle's <kbd>Enter</kbd> and <kbd>Space</kbd> activation.
- **2.1.2 No Keyboard Trap (A).** Each toggle as a single focusable control.
- **2.4.3 Focus Order (A).** Each toggle as one tab stop in DOM order.
- **2.4.7 Focus Visible (AA).** Each toggle's focus ripple.
- **2.4.11 Focus Not Obscured (Minimum) (AA).** Each toggle's focus visibility.
- **2.5.2 Pointer Cancellation (A).** Each toggle activating on pointer-up.
- **2.5.3 Label in Name (A).** Each toggle's accessible name containing its label.
- **2.5.8 Target Size (Minimum) (AA).** Each toggle's padded target.
- **3.2.1 On Focus (A).** Each toggle changing nothing on focus.
- **3.2.2 On Input (A).** Each toggle changing only its pressed state.
- **3.2.4 Consistent Identification (AA).** Each toggle's stable label.

## Not applicable

- **1.3.5 Identify Input Purpose (AA).** Not an input; collects no user data through `autocomplete`.
- **1.4.13 Content on Hover or Focus (AA).** The group shows no additional content on hover or focus; a `Tooltip` wrapper would own this.
- **2.1.4 Character Key Shortcuts (A).** The only keys are <kbd>Enter</kbd> and <kbd>Space</kbd>, which are not single-character shortcuts.
- **2.2.2 Pause, Stop, Hide (A).** Nothing moves or auto-updates.
- **2.4.4 Link Purpose (In Context) (A).** The group renders no links.
- **2.5.7 Dragging Movements (AA, new in 2.2).** Toggles select on tap or click; no drag operation.
- **3.1.1 Language of Page (A), 3.1.2 Language of Parts (AA).** The group emits no `<html lang>` and no text of its own.
- **3.2.3 Consistent Navigation (AA).** Covers repeated navigation across a set of pages, not a single group.
- **3.2.6 Consistent Help (A, new in 2.2).** Covers consistent placement of help across pages.
- **3.3.2 Labels or Instructions (A).** Limited by WCAG to data-entry controls, and it excludes interactive components not associated with data entry. The group's children are toggle buttons (`aria-pressed`, `role="button"`), not form fields, so the group is outside this criterion. (This is where ToggleButtonGroup differs from a radio group, whose native radios are data entry.)
- **3.3.7 Redundant Entry (A, new in 2.2).** Covers repopulating previously entered data. The group captures none.
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2).** The paste, autofill, and cognitive-test duty falls on the credential fields, not a toggle group.
- **4.1.3 Status Messages (AA).** The group emits no status messages; the selected value is exposed through each toggle's `aria-pressed`.
- **Time-based media (1.2.1 to 1.2.5).** No audio or video.
- **Audio Control (1.4.2).** Emits no audio.
- **Orientation (1.3.4).** Sets no orientation lock; the `orientation` prop is a layout choice, not a display-orientation restriction.
- **Bypass Blocks (2.4.1), Page Titled (2.4.2), Multiple Ways (2.4.5).** Page or site structure concerns, not a single group.
- **Timing Adjustable (2.2.1).** Sets no time limit.
- **Three Flashes or Below Threshold (2.3.1).** Nothing flashes.
- **Pointer Gestures (2.5.1), Motion Actuation (2.5.4).** Toggles activate on a simple click; the group reads no device motion.
- **Error Identification (3.3.1), Error Suggestion (3.3.3), Error Prevention (3.3.4).** The group collects and validates no input; these belong to the form or process.

## Level AAA

The following SC are applicable but out of scope, and are item-level:

- **2.3.3 Animation from Interactions.** Each toggle's ripple `scale()` animation honors `prefers-reduced-motion` when the theme sets `motion.reducedMotion` to `system` or `always`; `disableRipple` also removes it. The default is `never`. `🚩`
- **2.4.13 Focus Appearance.** Each toggle's focus ripple is unlikely to meet the area and 3:1 thresholds, and `disableRipple` removes it. `🚩`
- **2.5.5 Target Size (Enhanced), 44 px.** Each toggle's `small` size (about 40 px) is below 44 px. `🚩`
- **1.4.6 Contrast (Enhanced), 7:1.** Palettes target the AA 4.5:1, so several selected toggle colors fall short of 7:1. `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.3.6 Identify Purpose, 1.4.9 Images of Text (No Exception), 2.1.3 Keyboard (No Exception), 2.4.12 Focus Not Obscured (Enhanced)**.

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.2.
- **Scope.** The ToggleButtonGroup component coordinating two or more `ToggleButton` children, with an author-supplied `aria-label` for the group's name, rendered through the documented API. Each toggle's item-level conformance is inherited from the [Toggle Button report](../ToggleButton/accessibility.md).
- **Automated.** axe-core via the Playwright visual-regression harness. The group compositions share the Toggle Button demo slug, so their results are recorded in [`toggle-button.a11y.json`](../../../../docs/data/material/components/toggle-button/toggle-button.a11y.json), plus interaction tests in [`ToggleButtonGroup.test.js`](./ToggleButtonGroup.test.js).
- **Assistive-technology review.** Not yet performed. Flagged criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
