# Accordion accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

This doc covers the root `<Accordion>` together with `AccordionDetails` and `AccordionActions`, which are passive content containers. It inherits the header's item-level criteria from [AccordionSummary](../AccordionSummary/accessibility.md).

| Result                             | Count |
| :--------------------------------- | :---- |
| ✅ Supports                        | 19    |
| ⚠️ Partially Supports              | 0     |
| ❌ Does Not Support                | 0     |
| ➖ Not Applicable                  | 31    |
| ↗ Inherited (see AccordionSummary) | 5     |
| 🚩 Flagged                         | 6/19  |

## Known gaps

- Inherits: ⚠️ **1.4.11 Non-text Contrast** (the summary focus indicator) from [AccordionSummary](../AccordionSummary/accessibility.md).

## Success criteria

### 🔍 Manual

#### 1.3.2 Meaningful Sequence · A

`🚩` · `✅ Supports` · `◐ Shared`

- The header renders before its panel in DOM order, so the reading sequence matches the visual one; the panel content is author-supplied.

**Manual testing steps**

1. With a screen reader running, expand an accordion and read it top to bottom.

**Pass:** the header is announced before its panel content.

#### 1.3.3 Sensory Characteristics · A

`✅ Supports` · `○ Author`

- The accordion is operated by its header label, not by a sensory cue; surrounding instructions must not rely on the chevron's shape or position alone.

**Manual testing steps**

1. Find product copy that tells users to expand a section and check it names the section by its heading.

**Pass:** no instruction depends on shape, color, or position alone.

#### 1.4.1 Use of Color · A

`🚩` · `✅ Supports` · `◐ Shared`

- The open and closed states are shown by `aria-expanded` and the rotated chevron, not by color alone.

**Manual testing steps**

1. In a UI with accordions, turn on a grayscale view and expand or collapse a panel.

**Pass:** the state stays distinguishable without color.

#### 1.4.4 Resize Text · AA

`🚩` · `✅ Supports` · `◐ Shared`

- Header and panel text use rem and theme spacing, so the accordion scales with browser zoom; a fixed-pixel wrapper in the surrounding layout could clip at 200%.

**Manual testing steps**

1. In a UI with accordions, set browser zoom to 200%.
2. Confirm header and panel text are fully visible and the control still toggles.

**Pass:** nothing is clipped at 200%.

#### 1.4.5 Images of Text · AA

`✅ Supports` · `○ Author`

- The header and panel render real text.

**Manual testing steps**

1. Confirm the header or panel text is real text and not an image.

**Pass:** no header or panel renders its text as an image.

#### 1.4.10 Reflow · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The accordion is full width and its text wraps, so it reflows on its own; horizontal overflow at 320 CSS pixels comes from the surrounding layout.

**Manual testing steps**

1. In a UI with accordions, set the viewport to 320 CSS pixels wide.
2. Confirm there is no sideways scrolling and all text is reachable.

**Pass:** content reflows with no horizontal scroll.

#### 2.4.11 Focus Not Obscured (Minimum) · AA

`✅ Supports` · `○ Author`

- The accordion never hides its own focused header; full obscuring comes from sticky headers or overlays in the surrounding layout.

**Manual testing steps**

1. In a page with a sticky header, <kbd>Tab</kbd> to a header near it, scroll it under the sticky element, and <kbd>Tab</kbd> back.

**Pass:** at least part of the focused header stays visible.

#### 3.2.4 Consistent Identification · AA

`✅ Supports` · `○ Author`

- The component produces one stable name and structure per set of props; using the same header for the same purpose across pages is an authoring concern.

**Manual testing steps**

1. Compare accordions with same purpose across the product.

**Pass:** consistently uses the same text and icon.

### 🔁 Hybrid

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `◐ Shared`

- The summary button is wrapped in an `<h3>` heading (the `heading` slot, overridable), and the panel takes `role="region"` named by `aria-labelledby` from the summary's `id`, so the header-to-panel relationship is programmatic.
- axe-core `aria-valid-attr-value`, `duplicate-id-aria`, and `aria-allowed-attr` pass across the demos; whether `<h3>` is the right level in the page outline is the author's responsibility.

**Manual testing steps**

1. In a page with an expanded accordion, inspect the accessibility tree.
2. Confirm the header is a heading and the expanded panel is a region named by that header.

**Pass:** the header is exposed as a heading and the panel as a region named by it.

#### 1.4.3 Contrast (Minimum) · AA

`🚩` · `✅ Supports` · `◐ Shared`

- The summary label (`text.primary` or `text.secondary`) and the default panel content (`Typography`) sit on `paper` above 4.5:1; custom content colors and action-button themes are the author's.
- axe-core `color-contrast` passes where it can resolve the background and returns incomplete on some demos, where axe cannot read the summary background behind the divider `::before` pseudo-element; no demo records a failure.

**Manual testing steps**

1. With a contrast checker, measure the summary label and the expanded panel text against their backgrounds.
2. Check any custom theme colors the product uses.

**Pass:** at least 4.5:1 for the summary label and panel text. Disabled summaries are exempt.

#### 2.4.6 Headings and Labels · AA

`✅ Supports` · `◐ Shared`

- Each accordion provides an `<h3>` heading whose text is the summary label; axe-core `button-name` confirms that label is present.
- Whether the heading describes its section is an authoring concern.

**Manual testing steps**

1. Read each accordion heading out of context and ask whether it names its section.

**Pass:** every heading describes its section.

#### 1.4.12 Text Spacing · AA

`🚩` · `✅ Supports` · `◐ Shared`

- Header and panel heights come from padding, not fixed heights, so the WCAG text-spacing values grow the accordion without clipping.
- axe-core `avoid-inline-spacing` passes, and a visual-regression screenshot guards the layout.

**Manual testing steps**

1. On an accordion with a long summary label and multi-paragraph panel content, apply the four WCAG text-spacing values in the DevTools console: `document.head.insertAdjacentHTML('beforeend','<style>*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}</style>')`.
2. Look for clipped or overlapping text.

**Pass:** all header and panel text stays visible.

#### 4.1.2 Name, Role, Value · A

`✅ Supports` · `◐ Shared`

- The summary's `aria-expanded` (set by the component) exposes the required open or closed state; the panel takes `role="region"` named by `aria-labelledby`, and `aria-controls` links the header to it.
- The region name depends on the author setting `id` and `aria-controls` on the summary, as every demo does; omitting them leaves the region unnamed. axe-core `aria-valid-attr-value` and `duplicate-id-aria` pass.

**Manual testing steps**

1. With a screen reader running, move to an accordion header and expand it.
2. Confirm the collapsed or expanded state is announced, and the expanded panel is reached as a named region.

**Pass:** state, role, and the header-to-region name are all exposed.

### ⚙️ Automated

#### 2.1.1 Keyboard · A

`✅ Supports` · `● Component`

- The accordion expands and collapses through the summary's native activation (<kbd>Enter</kbd> and <kbd>Space</kbd>); the WAI-ARIA accordion pattern requires only that plus <kbd>Tab</kbd>, and does not define arrow-key navigation between headers.
- Confirmed by interaction tests in [`../ButtonBase/ButtonBase.test.js`](../ButtonBase/ButtonBase.test.js) and an `onChange`-on-click test in [`Accordion.test.js`](./Accordion.test.js).

#### 2.1.2 No Keyboard Trap · A

`✅ Supports` · `● Component`

- Each header is a single focusable stop and the collapsed panel is removed from the tab order, so <kbd>Tab</kbd> moves through the cluster and out without a trap.
- Confirmed by a unit test in [`../AccordionSummary/AccordionSummary.test.js`](../AccordionSummary/AccordionSummary.test.js) (<kbd>Tab</kbd> enters and leaves the header freely).

#### 2.4.3 Focus Order · A

`✅ Supports` · `◐ Shared`

- The collapsed panel is set to `visibility: hidden` by `Collapse`, so its content and any AccordionActions buttons leave the tab order; an expanded panel sits in DOM order right after its header.
- Confirmed by unit tests in [`./Accordion.test.js`](./Accordion.test.js) (a collapsed panel gets the `Collapse` hidden state) and [`../AccordionSummary/AccordionSummary.test.js`](../AccordionSummary/AccordionSummary.test.js) (the header is a single tab stop; a disabled header leaves the order).

#### 2.5.2 Pointer Cancellation · A

`✅ Supports` · `● Component`

- The accordion toggles on `click`, fired on pointer-up; `mousedown` alone does not toggle.
- Confirmed by a unit test in [`../AccordionSummary/AccordionSummary.test.js`](../AccordionSummary/AccordionSummary.test.js) (releasing off the target does not toggle; a full click does).

#### 3.2.1 On Focus · A

`✅ Supports` · `● Component`

- Focusing a header applies the focus-visible tint only; it triggers no expand, navigation, or focus move, so focus alone changes no context.
- Confirmed by a unit test in [`../AccordionSummary/AccordionSummary.test.js`](../AccordionSummary/AccordionSummary.test.js) (focusing the header does not toggle it).

#### 3.2.2 On Input · A

`✅ Supports` · `◐ Shared`

- Expanding or collapsing a panel changes content within the same page, which is not a change of context; coupling activation to navigation would be an author decision.
- Confirmed by a unit test in [`../AccordionSummary/AccordionSummary.test.js`](../AccordionSummary/AccordionSummary.test.js) (the panel toggles only on explicit activation, never on its own).

## Not applicable

- **1.3.5 Identify Input Purpose (AA).** Collects no user data.
- **1.4.13 Content on Hover or Focus (AA).** The panel opens on activation, not on hover or focus.
- **2.1.4 Character Key Shortcuts (A).** Implements no shortcut bound to a letter, punctuation, number, or symbol key; <kbd>Enter</kbd> and <kbd>Space</kbd> are standard activation, not character shortcuts.
- **2.4.4 Link Purpose (In Context) (A).** The header is a button, not a link.
- **2.5.7 Dragging Movements (AA, new in 2.2).** No drag interactions.
- **3.1.1 Language of Page (A), 3.1.2 Language of Parts (AA).** Authoring concern.
- **3.2.3 Consistent Navigation (AA).** Inapplicable in isolation.
- **3.2.6 Consistent Help (A, new in 2.2).** Provides no help mechanism.
- **3.3.7 Redundant Entry (A, new in 2.2).** Re-enters no data.
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2).** No authentication step.
- **4.1.3 Status Messages (AA).** Adds no status region; the state is carried by `aria-expanded` on the focused header.
- **Time-based media (1.2.1 to 1.2.5).** No audio or video.
- **Audio Control (1.4.2).** Emits no audio.
- **Orientation (1.3.4).** Sets no orientation lock; a layout concern.
- **Bypass Blocks (2.4.1), Page Titled (2.4.2), Multiple Ways (2.4.5).** Page or site structure concerns.
- **Timing Adjustable (2.2.1), Pause, Stop, Hide (2.2.2).** Sets no time limit; the expand transition is user-triggered.
- **Three Flashes or Below Threshold (2.3.1).** Nothing flashes.
- **Pointer Gestures (2.5.1), Motion Actuation (2.5.4).** Activates on a simple click; reads no device motion.
- **Error Identification (3.3.1), Labels or Instructions (3.3.2), Error Suggestion (3.3.3), Error Prevention (3.3.4).** The accordion collects and validates no input; these belong to the form or process.

## Inherited from AccordionSummary

These item-level criteria are rated on the header button. See [AccordionSummary](../AccordionSummary/accessibility.md).

- [1.1.1 Non-text Content](../AccordionSummary/accessibility.md)
- [1.4.11 Non-text Contrast](../AccordionSummary/accessibility.md)
- [2.4.7 Focus Visible](../AccordionSummary/accessibility.md)
- [2.5.3 Label in Name](../AccordionSummary/accessibility.md)
- [2.5.8 Target Size (Minimum)](../AccordionSummary/accessibility.md)

## Level AAA

- **2.3.3 Animation from Interactions.** The `Collapse` transition and chevron rotation honor `prefers-reduced-motion` only when the theme sets `motion.reducedMotion` to `system` or `always`; the default is `never`. `🚩`
- **2.4.13 Focus Appearance.** The header focus tint is unlikely to meet the area and contrast thresholds. `🚩`
- **2.5.5 Target Size (Enhanced), 44px.** The header (48px tall) meets it; nested action buttons may not. `🚩`
- **1.4.6 Contrast (Enhanced), 7:1.** `text.primary` clears 7:1, but `text.secondary` (about 5.7:1) does not. `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.3.6 Identify Purpose, 1.4.9 Images of Text (No Exception), 2.1.3 Keyboard (No Exception), 2.4.12 Focus Not Obscured (Enhanced)**.

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.2.
- **Scope.** The Accordion cluster rendered through its documented API: the root `<Accordion>`, plus the passive `AccordionDetails` (the panel's padding container) and `AccordionActions` (the optional action bar), both `<div>`s with no role or ARIA of their own. The interactive header `AccordionSummary` has its own [report](../AccordionSummary/accessibility.md) and is inherited here; author-supplied panel content and action buttons are the author's responsibility.
- **Automated.** axe-core via Playwright test harness (results in [`accordion.a11y.json`](../../../../docs/data/material/components/accordion/accordion.a11y.json)), plus interaction tests in `Accordion.test.js`, `AccordionSummary.test.js`, and `ButtonBase.test.js`.
- **Assistive-technology review.** Not yet performed. Flagged criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
