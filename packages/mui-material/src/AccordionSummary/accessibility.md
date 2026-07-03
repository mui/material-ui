# AccordionSummary accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

This is the item-level report for the accordion header button. The root `<Accordion>` inherits these criteria; see [Accordion](../Accordion/accessibility.md).

| Result                | Count |
| :-------------------- | :---- |
| ✅ Supports           | 23    |
| ⚠️ Partially Supports | 1     |
| ❌ Does Not Support   | 0     |
| ➖ Not Applicable     | 31    |
| 🚩 Flagged            | 8/24  |

## Known gaps

- ⚠️ **1.4.11 Non-text Contrast.** The keyboard-focus indicator is only a background tint (`action.focus`), about 1.3:1 against the adjacent `paper` surface, below the 3:1 minimum.

## Success criteria

### 🔍 Manual

#### 1.3.2 Meaningful Sequence · A

`✅ Supports` · `○ Author`

- The summary is one control whose slots render in DOM order: the content `span`, then the `expandIcon` wrapper; the decorative icon is `aria-hidden`, leaving the label as the exposed content.
- Order carries meaning only across the surrounding controls, which the page layout sets.

**Manual testing steps**

1. In an accordion, read the summary content from left to right.
2. Compare it to the order announced by a screen reader.

**Pass:** the announced order matches the visual order.

#### 1.3.3 Sensory Characteristics · A

`✅ Supports` · `○ Author`

- The summary is identified by its text label, not only by the position or shape of the `expandIcon`.
- Surrounding instructions must not rely on the icon's direction alone (for example, "open the section with the down arrow").

**Manual testing steps**

1. Find any product copy that tells users to expand a section.
2. Check that it names the section by its heading, not only by the chevron's shape or position.

**Pass:** no instruction depends on the icon alone.

#### 1.4.1 Use of Color · A

`🚩` · `✅ Supports` · `◐ Shared`

- The expanded state is conveyed by `aria-expanded` and the rotated `expandIcon`, not by color, and the label carries the meaning.

**Manual testing steps**

1. In a UI with accordions, turn on a grayscale view (Chrome DevTools: Rendering, Emulate vision deficiencies, Achromatopsia).
2. Expand and collapse a panel.

**Pass:** the open and closed states stay distinguishable without color.

#### 1.4.4 Resize Text · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The label text is rem-based (`Typography`), and the 48px `min-height` is a floor that content grows past, not a fixed size, so the summary scales with browser zoom rather than clipping.
- A fixed-pixel container in the surrounding layout could clip at 200%.

**Manual testing steps**

1. In a UI with accordions, set browser zoom to 200% (<kbd>Ctrl</kbd> or <kbd>Cmd</kbd> and <kbd>+</kbd>).
2. Confirm the summary label is fully visible and the control still toggles.

**Pass:** nothing is clipped at 200%.

#### 1.4.5 Images of Text · AA

`✅ Supports` · `○ Author`

- The label is real text passed as children.

**Manual testing steps**

1. Verify that the summary label is real text.

**Pass:** no summary renders its label as an image of text.

#### 1.4.10 Reflow · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The summary is full width and its label wraps, so it reflows on its own; horizontal overflow at 320 CSS pixels comes from the surrounding layout.

**Manual testing steps**

1. In a UI with accordions, set the window (or the DevTools device toolbar) to 320 CSS pixels wide.
2. Confirm there is no sideways scrolling and the summary text is reachable.

**Pass:** content reflows with no horizontal scroll, and long labels wrap.

#### 1.4.11 Non-text Contrast · AA

`🚩` · `⚠️ Partially Supports` · `● Component`

- The keyboard-focus indicator is a background change to `action.focus` (`rgba(0, 0, 0, 0.12)`), about 1.3:1 against the adjacent `paper` surface, below the 3:1 minimum; `ButtonBase` sets `outline: 0`, so no outline backs it up.
- The `expandIcon` uses `action.active` (`rgba(0, 0, 0, 0.54)`), about 4.6:1 on `paper`, which clears 3:1.

**Manual testing steps**

1. Press <kbd>Tab</kbd> to focus an accordion summary.
2. With a contrast checker, measure the focused background against the resting background, and the chevron against the surface behind it.

**Pass:** the focus indicator and the icon are each at least 3:1. The focus indicator is the known shortfall.

#### 2.4.11 Focus Not Obscured (Minimum) · AA

`✅ Supports` · `○ Author`

- The summary never hides itself; obscuring typically comes from sticky headers or overlays in the surrounding layout.

**Manual testing steps**

1. In a page with a sticky header, press <kbd>Tab</kbd> to a summary near it.
2. Scroll so the summary sits under the sticky element, then <kbd>Tab</kbd> to it again.

**Pass:** at least part of the focused summary stays visible, never entirely covered.

#### 2.5.3 Label in Name · A

`🚩` · `✅ Supports` · `◐ Shared`

- The accessible name is the visible label: the children become the name, and an `SvgIcon` `expandIcon` defaults to `aria-hidden`; a custom icon node adds to the name unless the author hides it.
- An `aria-label` that omits or reorders the visible words breaks this; compare the visible text to the computed name.

**Manual testing steps**

1. With a screen reader verify that the summary announces the same as the visible text

**Pass:** the visible label appears in the accessible name.

#### 3.2.4 Consistent Identification · AA

`✅ Supports` · `○ Author`

- The component produces one stable accessible name per set of props.

**Manual testing steps**

1. Compare accordions with same purpose across the product.

**Pass:** consistently uses the same text and icon.

### 🔁 Hybrid

#### 1.1.1 Non-text Content · A

`✅ Supports` · `◐ Shared`

- The `expandIcon` (an `SvgIcon`) defaults to `aria-hidden` and `focusable="false"`, so it is decorative and the name comes from the summary children.
- axe-core `button-name` and `aria-command-name` confirm a name is present across the demos; whether the name conveys the section's purpose needs an assistive-technology review.

**Manual testing steps**

1. With a screen reader running (NVDA with Chrome, or VoiceOver with Safari), <kbd>Tab</kbd> to accordion summaries that carry an `expandIcon` and confirm each announces the label, not the chevron.

**Pass:** every summary's announced name matches its section, and the chevron is silent.

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `◐ Shared`

- The summary exposes its `button` role and its `aria-expanded` state programmatically; the disclosure relationship to the panel is wired by the root `<Accordion>` (see [Accordion](../Accordion/accessibility.md)).
- axe-core `aria-allowed-attr`, `aria-valid-attr`, and `aria-valid-attr-value` pass across the demos.

**Manual testing steps**

1. With a screen reader running, move to an accordion summary.
2. Confirm it announces a collapsed or expanded button.

**Pass:** role and state match the visual presentation.

#### 1.4.3 Contrast (Minimum) · AA

`🚩` · `✅ Supports` · `● Component`

- The label uses `text.primary` (about 16:1) or `text.secondary` (about 5.7:1) on `paper`, both above 4.5:1; disabled summaries drop to `0.38` opacity and are exempt.
- axe-core `color-contrast` passes where it can resolve the background and returns incomplete on some demos, where axe cannot read the summary background behind the divider `::before` pseudo-element; no demo records a failure, so a visual check is the remaining step.

**Manual testing steps**

1. With a contrast checker, measure each summary label, including any secondary `text.secondary` line, against its background.
2. Check any custom theme colors the product uses.

**Pass:** at least 4.5:1 for the label text. Disabled summaries are exempt.

#### 1.4.12 Text Spacing · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The label wraps and the summary height comes from `min-height` and padding, not a fixed height, so the WCAG text-spacing values grow the control without clipping.
- axe-core `avoid-inline-spacing` passes, and a visual-regression screenshot guards the layout.

**Manual testing steps**

1. On an accordion with a long summary label, apply the four WCAG text-spacing values in the DevTools console: `document.head.insertAdjacentHTML('beforeend','<style>*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}</style>')`.
2. Look for clipped or overlapping label text.

**Pass:** all label text stays visible and the summary still toggles.

#### 2.4.6 Headings and Labels · AA

`✅ Supports` · `◐ Shared`

- The accessible name serves as the summary's label; axe-core `button-name` confirms it is present.
- Whether the label describes the section is an authoring concern.

**Manual testing steps**

1. Read each summary label out of context.
2. Ask whether it says what the section contains.

**Pass:** every label describes its section, not a vague "Details".

#### 2.4.7 Focus Visible · AA

`🚩` · `✅ Supports` · `● Component`

- Keyboard focus applies the `.Mui-focusVisible` background (`action.focus`); mouse focus is suppressed, and `ButtonBase` removes the native outline, so this tint is the only indicator.
- Covered by a unit test in [`AccordionSummary.test.js`](./AccordionSummary.test.js) that confirms the focus-visible state fires; whether the tint is perceptible enough is the visual step (its contrast is the 1.4.11 shortfall).

**Manual testing steps**

1. Press <kbd>Tab</kbd> to move focus across accordion summaries.
2. Confirm a focus indicator appears and differs from the resting style.
3. Click a summary with the mouse and confirm the indicator does not appear.

**Pass:** every keyboard-focused summary shows a visible indicator.

#### 4.1.2 Name, Role, Value · A

`✅ Supports` · `◐ Shared`

- The native summary is a `button`; with `nativeButton={false}` and a custom `component`, `ButtonBase` applies `role="button"`. The name comes from the children and the state from `aria-expanded`.
- axe-core `button-name`, `aria-command-name`, `aria-allowed-attr`, `aria-roles`, `nested-interactive`, and `duplicate-id-aria` pass; a unit test in [`AccordionSummary.test.js`](./AccordionSummary.test.js) confirms `aria-expanded` tracks the state. Whether the name is meaningful needs an assistive-technology review.

**Manual testing steps**

1. With a screen reader running, <kbd>Tab</kbd> to a native summary and a non-native (`nativeButton={false}`) summary.
2. Confirm each announces the name, the button role, and the collapsed or expanded state.

**Pass:** name, role, and state are correct for the native and non-native summaries.

### ⚙️ Automated

#### 2.1.1 Keyboard · A

`✅ Supports` · `● Component`

- The native summary activates with <kbd>Enter</kbd> and <kbd>Space</kbd>; the non-native `role="button"` gets the same handling from `ButtonBase`, and a disabled summary leaves the tab order.
- Confirmed by interaction tests in [`../ButtonBase/ButtonBase.test.js`](../ButtonBase/ButtonBase.test.js).

#### 2.1.2 No Keyboard Trap · A

`✅ Supports` · `● Component`

- The summary is a single focusable control that installs no focus-capturing loop; <kbd>Tab</kbd> moves in and out, and a disabled summary leaves the order.
- Confirmed by a unit test in [`./AccordionSummary.test.js`](./AccordionSummary.test.js) (<kbd>Tab</kbd> is not intercepted, and focus moves away freely).

#### 2.4.3 Focus Order · A

`✅ Supports` · `◐ Shared`

- The summary sits in natural DOM order with no positive `tabIndex`, so it is one correct focus stop; order across the cluster is covered in [Accordion](../Accordion/accessibility.md).
- Confirmed by a unit test in [`./AccordionSummary.test.js`](./AccordionSummary.test.js) (default `tabIndex` is `0`; a disabled summary leaves the order).

#### 2.5.2 Pointer Cancellation · A

`✅ Supports` · `● Component`

- Activation runs on `click`, fired on pointer-up over the target; `mousedown` alone does not toggle, so releasing off the target cancels.
- Confirmed by a unit test in [`./AccordionSummary.test.js`](./AccordionSummary.test.js) (releasing off the target does not toggle; a full click does).

#### 2.5.8 Target Size (Minimum) · AA

`✅ Supports` · `● Component`

- The summary is full width with a 48px `min-height` (64px when expanded), well above the 24 by 24 CSS pixel minimum. axe-core `target-size` confirms this across the demos in [`accordion.a11y.json`](../../../../docs/data/material/components/accordion/accordion.a11y.json).
- Not covered: `sx` overrides that shrink a custom summary.

#### 3.2.1 On Focus · A

`✅ Supports` · `● Component`

- Focusing the summary applies the focus-visible tint and runs `onFocus` callbacks only; there is no navigation or focus move, so focus alone changes no context.
- Confirmed by a unit test in [`./AccordionSummary.test.js`](./AccordionSummary.test.js) (focusing the summary does not toggle it).

#### 3.2.2 On Input · A

`✅ Supports` · `◐ Shared`

- Activating the summary toggles the panel within the same page, which is not a change of context.
- Whether an author's `onClick` couples activation to navigation is an author decision.
- Confirmed by a unit test in [`./AccordionSummary.test.js`](./AccordionSummary.test.js) (the panel toggles only on explicit activation, never on its own).

## Not applicable

- **1.3.5 Identify Input Purpose (AA).** Collects no user data.
- **1.4.13 Content on Hover or Focus (AA).** The panel opens on activation, not on hover or focus.
- **2.1.4 Character Key Shortcuts (A).** Implements no shortcut bound to a letter, punctuation, number, or symbol key; <kbd>Enter</kbd> and <kbd>Space</kbd> are standard activation, not character shortcuts.
- **2.4.4 Link Purpose (In Context) (A).** The summary is a button, not a link.
- **2.5.7 Dragging Movements (AA, new in 2.2).** No drag interactions.
- **3.1.1 Language of Page (A), 3.1.2 Language of Parts (AA).** Authoring concern.
- **3.2.3 Consistent Navigation (AA).** Inapplicable in isolation.
- **3.2.6 Consistent Help (A, new in 2.2).** Provides no help mechanism.
- **3.3.7 Redundant Entry (A, new in 2.2).** Re-enters no data.
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2).** No authentication step.
- **4.1.3 Status Messages (AA).** Adds no status region; the state is carried by `aria-expanded` on the focused summary.
- **Time-based media (1.2.1 to 1.2.5).** No audio or video.
- **Audio Control (1.4.2).** Emits no audio.
- **Orientation (1.3.4).** Sets no orientation lock; a layout concern.
- **Bypass Blocks (2.4.1), Page Titled (2.4.2), Multiple Ways (2.4.5).** Page or site structure concerns.
- **Timing Adjustable (2.2.1), Pause, Stop, Hide (2.2.2).** Sets no time limit and nothing moves on its own.
- **Three Flashes or Below Threshold (2.3.1).** Nothing flashes.
- **Pointer Gestures (2.5.1), Motion Actuation (2.5.4).** Activates on a simple click; reads no device motion.
- **Error Identification (3.3.1), Labels or Instructions (3.3.2), Error Suggestion (3.3.3), Error Prevention (3.3.4).** The summary collects and validates no input; these belong to the form or process.

## Level AAA

The following SC are applicable but out of scope:

- **2.3.3 Animation from Interactions.** The `expandIcon` rotation honors `prefers-reduced-motion` only when the theme sets `motion.reducedMotion` to `system` or `always`; the default is `never`. `🚩`
- **2.4.13 Focus Appearance.** The focus tint is unlikely to meet the area and contrast thresholds. `🚩`
- **2.5.5 Target Size (Enhanced), 44px.** The summary (48px tall) meets it; nested action buttons may not. `🚩`
- **1.4.6 Contrast (Enhanced), 7:1.** `text.primary` clears 7:1, but `text.secondary` (about 5.7:1) does not. `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.3.6 Identify Purpose, 1.4.9 Images of Text (No Exception), 2.1.3 Keyboard (No Exception), 2.4.12 Focus Not Obscured (Enhanced)**.

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.2.
- **Scope.** The AccordionSummary header button, rendered through its documented API inside an Accordion.
- **Automated.** axe-core via Playwright test harness (results in [`accordion.a11y.json`](../../../../docs/data/material/components/accordion/accordion.a11y.json)), plus interaction tests in `AccordionSummary.test.js` and `ButtonBase.test.js`.
- **Assistive-technology review.** Not yet performed. Flagged criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
