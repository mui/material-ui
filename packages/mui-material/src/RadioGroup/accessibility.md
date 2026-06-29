# RadioGroup accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

RadioGroup coordinates a set of [Radio](../Radio/accessibility.md) children, so this report rates only the criteria that exist or change because of the grouping. Each radio's own conformance (contrast, target size, label in name, focus indicator, and the rest) is rated in the [Radio report](../Radio/accessibility.md) and listed under [Inherited from Radio](#inherited-from-radio).

| Result                  | Count |
| :---------------------- | :---- |
| ✅ Supports             | 6     |
| ⚠️ Partially Supports   | 1     |
| ❌ Does Not Support     | 0     |
| ➖ Not Applicable       | 30    |
| ↗ Inherited (see Radio) | 18    |
| 🚩 Unverified           | 3/7   |

The first three rows and Not Applicable count the 7 group-level criteria plus the 30 that do not apply; Inherited adds the 18 item-level criteria rated in Radio (7 + 30 + 18 = 55). Unverified is the ratio of flagged to applicable group-level criteria; inherited criteria are excluded.

## Known gaps

- ⚠️ **3.3.2 Labels or Instructions.** The group ships no label of its own. `role="radiogroup"` requires an accessible name, but `UseRadioGroup` renders a group with no `FormLabel` and no `aria-labelledby`, so the question is unlabeled. Pair the group with a `FormLabel` referenced by `aria-labelledby`.

## Success criteria

### 🔍 Manual

#### 1.4.1 Use of Color · A

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- Which option is selected is shown by the filled dot inside one circle, a shape difference, not color, so a color-blind user can tell the selected option from the rest.
- A group error shown only through red `FormHelperText` is color-only. Pair it with text or an icon. That is author content.

**Manual testing steps**

1. Open `RadioButtonsGroup`, select an option, and view the group in grayscale (DevTools Rendering, Emulate vision deficiencies, Achromatopsia).
2. Confirm the selected option is still identifiable by its dot.
3. Render an error `FormHelperText` (as in `ErrorRadios`) in grayscale and confirm "error" is still perceivable.

**Pass:** the selected option is distinguishable by the dot, and any error state is conveyed by more than color.

### 🔁 Hybrid

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `◐ Shared`

- RadioGroup sets `role="radiogroup"` on its `FormGroup` root (`RadioGroup.js`) and shares one `name`, generated with `useId` when none is passed, through `RadioGroupContext`, so the native radios form one programmatically grouped set. Covered by axe-core and unit tests.
- The group's accessible name and any description are the author's to set: `aria-labelledby` to a `FormLabel` for the name, and `aria-describedby` for `FormHelperText`. Without them the grouping is exposed but unnamed and undescribed.

**Manual testing steps**

1. Open `RadioButtonsGroup` and inspect the accessibility tree: confirm a `radiogroup` node named by the `FormLabel`, containing the `radio` options.
2. Open `UseRadioGroup` and confirm the `radiogroup` is present but unnamed.

**Pass:** the radios are exposed as one `radiogroup`, and the name and any description are set by the author.

#### 2.4.6 Headings and Labels · AA

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- The group's label comes from a `FormLabel` referenced by `aria-labelledby`, the documented pattern in `RadioButtonsGroup` and `RowRadioButtonsGroup`. axe-core covers that the reference resolves; whether the wording describes the question is a manual review.
- A vague group label ("Choose one") would fail, and the component cannot enforce wording.

**Manual testing steps**

1. Read each group's `FormLabel` text.
2. Confirm it describes the choice ("Gender", not "Choose one").

**Pass:** every group label describes the question it asks.

#### 3.3.2 Labels or Instructions · A

`🚩 Unverified` · `⚠️ Partially Supports` · `◐ Shared`

- A radio group is a data-entry question, so it needs a label or instructions presented to all users. The conforming pattern pairs `RadioGroup` with a `FormLabel` referenced by `aria-labelledby`, as `RadioButtonsGroup`, `ControlledRadioButtonsGroup`, and `RowRadioButtonsGroup` do.
- The component supplies no group label itself, and `UseRadioGroup` ships a group with no `FormLabel` and no `aria-labelledby`, a reachable failure that nothing catches (no axe rule flags an unnamed `radiogroup`). Add a visible `FormLabel` for every group.

**Manual testing steps**

1. For each radio group, confirm a visible question or instruction is shown to all users.
2. Flag any `RadioGroup` with no `FormLabel` (such as `UseRadioGroup`).

**Pass:** every group has a visible label or instruction. A group with no visible label fails.

#### 4.1.2 Name, Role, Value · A

`✅ Supports` · `◐ Shared`

- The group's role and value are met: `role="radiogroup"` names the relationship, and the selected value is exposed by the checked native radio with change notification, no ARIA needed. Covered by axe-core and unit tests.
- The group's name is the shared part: it comes from the author's `FormLabel` via `aria-labelledby`. Each option's own name, role, and checked state are rated in the [Radio report](../Radio/accessibility.md).

**Manual testing steps**

1. Open `ControlledRadioButtonsGroup` and inspect the `radiogroup`: confirm its role, its name from the `FormLabel`, and that the selected `radio` reads as checked.
2. Select a different option with a screen reader running and confirm the new value is announced.

**Pass:** the group exposes its `radiogroup` role, an author-supplied name, and the current selected value with change notification.

### ⚙️ Automated

#### 2.1.1 Keyboard · A

`✅ Supports` · `● Component`

- Because RadioGroup renders real `<input type="radio">` options sharing one `name`, the browser provides the [APG radio pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) keyboard behavior with no custom script: <kbd>Space</kbd> selects the focused option, and <kbd>↓</kbd>/<kbd>→</kbd> and <kbd>↑</kbd>/<kbd>←</kbd> move to the next or previous option and select it, wrapping at the ends.
- Covered by unit tests.

#### 2.4.3 Focus Order · A

`✅ Supports` · `● Component`

- The group is one tab stop: <kbd>Tab</kbd> enters on the checked option, or the first enabled option when none is checked, and <kbd>Tab</kbd> again leaves the group (native roving tab order). RadioGroup's imperative `focus()` action (`RadioGroup.js`) sets the same entry point, focusing the checked input or the first enabled one.
- Covered by unit tests.

## Inherited from Radio

These item-level criteria are rated once in the [Radio report](../Radio/accessibility.md); the grouping does not change them. They are not re-rated here and do not count toward the Unverified ratio.

- [**1.1.1 Non-text Content (A)**](../Radio/accessibility.md). Each option's dot and circle, and its label-derived name.
- [**1.3.2 Meaningful Sequence (A)**](../Radio/accessibility.md). Each option's input-then-label source order.
- [**1.3.3 Sensory Characteristics (A)**](../Radio/accessibility.md). Each option's reliance on its label, not sensory cues.
- [**1.4.3 Contrast (Minimum) (AA)**](../Radio/accessibility.md). Each option's label and helper text.
- [**1.4.4 Resize Text (AA)**](../Radio/accessibility.md). Each option's rem-sized icon and text.
- [**1.4.5 Images of Text (AA)**](../Radio/accessibility.md). Each option's text label.
- [**1.4.10 Reflow (AA)**](../Radio/accessibility.md). Each option's inline-flex layout.
- [**1.4.11 Non-text Contrast (AA)**](../Radio/accessibility.md). Each option's dot and circle at 3:1.
- [**1.4.12 Text Spacing (AA)**](../Radio/accessibility.md). Each option's label under spacing overrides.
- [**2.1.2 No Keyboard Trap (A)**](../Radio/accessibility.md). Each option as a native input.
- [**2.4.7 Focus Visible (AA)**](../Radio/accessibility.md). Each option's focus ripple.
- [**2.4.11 Focus Not Obscured (Minimum) (AA)**](../Radio/accessibility.md). Each option's focus visibility.
- [**2.5.2 Pointer Cancellation (A)**](../Radio/accessibility.md). Each option activating on pointer-up.
- [**2.5.3 Label in Name (A)**](../Radio/accessibility.md). Each option's accessible name containing its label.
- [**2.5.8 Target Size (Minimum) (AA)**](../Radio/accessibility.md). Each option's padded 42px target.
- [**3.2.1 On Focus (A)**](../Radio/accessibility.md). Each option changing nothing on focus.
- [**3.2.2 On Input (A)**](../Radio/accessibility.md). Each option changing only its value on selection.
- [**3.2.4 Consistent Identification (AA)**](../Radio/accessibility.md). Each option's stable label.

## Not applicable

- **1.3.5 Identify Input Purpose (AA).** Covers inputs that collect information about the user through `autocomplete`. A radio choice is not one of those input purposes.
- **1.4.13 Content on Hover or Focus (AA).** The group shows no additional content on hover or focus; a `Tooltip` wrapper would own this.
- **2.1.4 Character Key Shortcuts (A).** The only keys are <kbd>Space</kbd> and the arrow keys, and only while focused. There is no single-character shortcut.
- **2.2.2 Pause, Stop, Hide (A).** No auto-starting moving, blinking, or auto-updating content.
- **2.4.4 Link Purpose (In Context) (A).** The group renders no links.
- **2.5.7 Dragging Movements (AA, new in 2.2).** Covers drag operations. Options select by tap, click, or key.
- **3.1.1 Language of Page (A), 3.1.2 Language of Parts (AA).** The group emits no `<html lang>` and no text of its own. A foreign-language label is the author's phrase to mark.
- **3.2.3 Consistent Navigation (AA).** Covers repeated navigation across a set of pages, not a single group.
- **3.2.6 Consistent Help (A, new in 2.2).** Covers consistent placement of help across pages.
- **3.3.7 Redundant Entry (A, new in 2.2).** Covers repopulating previously entered data. The group captures none.
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2).** The paste, autofill, and cognitive-test duty falls on the credential fields, not a radio group.
- **4.1.3 Status Messages (AA).** The group emits no status messages; the selected-value change is covered by 4.1.2.
- **Time-based media (1.2.1 to 1.2.5).** No audio or video.
- **Audio Control (1.4.2).** Emits no audio.
- **Orientation (1.3.4).** Sets no orientation lock; the `row` prop is a layout choice, not a lock.
- **Bypass Blocks (2.4.1), Page Titled (2.4.2), Multiple Ways (2.4.5).** Page or site structure, not a single group.
- **Timing Adjustable (2.2.1).** Sets no time limit.
- **Three Flashes or Below Threshold (2.3.1).** Nothing flashes.
- **Pointer Gestures (2.5.1), Motion Actuation (2.5.4).** Selects on a simple click; reads no device motion.
- **Error Identification (3.3.1), Error Suggestion (3.3.3), Error Prevention (3.3.4).** The group collects a choice and supports `required`, but in isolation it raises no error state or message of its own; error detection and messaging belong to the form or validation process. When an author shows an error (as `ErrorRadios` does), tie it to the group with `aria-describedby` (tracked under 1.3.1).

## Level AAA

The following SC are applicable but out of scope:

- **2.3.3 Animation from Interactions.** Each option's ripple `scale()` animation honors `prefers-reduced-motion` when the theme sets `motion.reducedMotion` to `system` or `always`; `disableRipple` also removes it. The default is `never`. `🚩`
- **2.4.13 Focus Appearance.** The option focus ripple is unlikely to meet the area and 3:1 thresholds, and `disableRipple` removes it. `🚩`
- **2.5.5 Target Size (Enhanced), 44 px.** Default option sizes (42px medium, 38px small) are below 44px. `🚩`
- **1.4.6 Contrast (Enhanced), 7:1.** Option labels (`text.primary`, about 16:1) clear 7:1, but helper text (about 5:1) and the dot and circle fall short where the 7:1 bar applies. `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.3.6 Identify Purpose, 1.4.9 Images of Text (No Exception), 2.1.3 Keyboard (No Exception), 2.4.12 Focus Not Obscured (Enhanced)**.

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.2.
- **Scope.** The RadioGroup component coordinating two or more `Radio` children, with `FormControl`/`FormLabel` for the group's name and `FormHelperText`, rendered through the documented API. Each radio's item-level conformance is inherited from the [Radio report](../Radio/accessibility.md).
- **Automated.** axe-core via the Playwright visual-regression harness (results in [`radio-buttons.a11y.json`](../../../../docs/data/material/components/radio-buttons/radio-buttons.a11y.json)), plus interaction tests in [`RadioGroup.test.js`](./RadioGroup.test.js). The arrow-key navigation and roving tab-order test runs in the browser project only, since jsdom does not implement native radio-group navigation.
- **Assistive-technology review.** Not yet performed. `🚩` criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
