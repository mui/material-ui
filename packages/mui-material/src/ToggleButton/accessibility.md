# Toggle Button accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

| Result                | Count |
| :-------------------- | :---- |
| ✅ Supports           | 20    |
| ⚠️ Partially Supports | 4     |
| ❌ Does Not Support   | 0     |
| ➖ Not Applicable     | 31    |
| 🚩 Unverified         | 17/24 |

## Known gaps

- ⚠️ **1.4.1 Use of Color.** For the color variants (`primary`, `error`, `info`, `success`), the selected and unselected labels are near-identical in grayscale lightness, so the pressed state is conveyed almost entirely by hue.
- ⚠️ **1.4.3 Contrast (Minimum).** When selected, the `primary`, `error`, `info`, and `warning` labels (their `color.main` text over the tinted selected background) fall short of 4.5:1.
- ⚠️ **1.4.11 Non-text Contrast.** The focus indicator is the ripple; `disableRipple`/`disableFocusRipple` remove it, leaving no focus indicator. The selected-state fill is untested for 3:1.
- ⚠️ **2.4.7 Focus Visible.** `disableRipple`/`disableFocusRipple` remove the only keyboard focus indicator; the Toggle Button has no box-shadow fallback.

## Success criteria

### 🔍 Manual

#### 1.3.2 Meaningful Sequence · A

`🚩 Unverified` · `✅ Supports` · `○ Author`

- The Toggle Button is one control. Its children render in DOM order; a decorative MUI icon is `aria-hidden`, leaving the label (text or `aria-label`) as the exposed content.
- Order carries meaning only across several toggles, which the surrounding layout (often a `ToggleButtonGroup`) sets. Confirm that reading order matches the visual order.

**Manual testing steps**

1. Open a demo with a row of toggles (`ToggleButtons`).
2. Press <kbd>Tab</kbd> repeatedly and note the order the toggles receive focus.
3. Compare that order to the visual left-to-right order.

**Pass:** focus order matches the visual order. Watch for layouts that reorder toggles visually without changing the DOM.

#### 1.3.3 Sensory Characteristics · A

`🚩 Unverified` · `✅ Supports` · `○ Author`

- A toggle with text or an `aria-label` can be identified by name, not only by shape, color, or position.
- Instructions in the surrounding content must not rely on color, shape, or position alone (for example, "the highlighted button").

**Manual testing steps**

1. Find any product copy that tells users to operate a toggle.
2. Check that it names the toggle by its label, not only by color, shape, size, or position.

**Pass:** no instruction relies on "the highlighted one" or "the button on the left" without naming it.

#### 1.4.5 Images of Text · AA

`🚩 Unverified` · `✅ Supports` · `○ Author`

- A text label is live CSS text; the component never renders it as an image.
- This fails only if an image of text, or an icon font spelling words, is passed as the children. Use real text or an icon with an `aria-label`.

**Manual testing steps**

1. Open a toggle with a text label and try to select the text with the mouse, or zoom in.
2. Confirm it behaves like real text (selectable, stays crisp), not a picture.

**Pass:** labels are live text. No toggle uses an image of text.

#### 2.4.11 Focus Not Obscured (Minimum) · AA

`🚩 Unverified` · `✅ Supports` · `○ Author`

- The Toggle Button is an ordinary focusable element and never places itself behind other content. Obscuring comes from sticky headers, banners, or overlays in the surrounding layout.
- Confirm by moving focus to a toggle beneath any sticky or overlay content at several scroll positions. At least part of it must stay visible.

**Manual testing steps**

1. In a page that has a sticky header, footer, or banner, press <kbd>Tab</kbd> to move focus onto a toggle near it.
2. Scroll so the toggle sits under the sticky element, then <kbd>Tab</kbd> to it again.

**Pass:** at least part of the focused toggle stays visible, never fully covered.

#### 3.2.4 Consistent Identification · AA

`🚩 Unverified` · `✅ Supports` · `○ Author`

- The component produces one stable accessible name per set of props, the precondition for consistent identification.
- Consistency is a cross-page property. Confirm that toggles with the same function share a label and icon, and that one label is not reused for different functions.

**Manual testing steps**

1. List the toggles that do the same job across the product (for example, every "Bold").
2. Compare their labels and icons.

**Pass:** the same job uses the same label and icon, and no single label is reused for different jobs.

### 🔁 Hybrid

#### 1.1.1 Non-text Content · A

`✅ Supports` · `◐ Shared`

- A MUI `SvgIcon` child defaults to `aria-hidden` + `focusable="false"`, so it does not contribute to the name; the name comes from the children text or an `aria-label`. axe-core confirms a non-empty name (`button-name` on the native-button demos, `aria-command-name` on the non-native host).
- An icon-only toggle has no accessible name unless the author sets an `aria-label`, as every icon toggle in the demos does. Whether the name conveys meaning needs an assistive-technology review.

**Manual testing steps**

1. Open `ToggleButtonA11ySemanticStates` with a screen reader running (NVDA with Chrome, or VoiceOver with Safari).
2. <kbd>Tab</kbd> to each toggle and confirm it announces the visible label or `aria-label`, and does not read out the icon.
3. For any icon-only toggle in the product, confirm it has an `aria-label` describing the action.

**Pass:** every toggle's announced name matches its purpose, and decorative icons are silent.

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `◐ Shared`

- The component sets the role (`button`, or `role="button"` for a non-native host), the pressed state through `aria-pressed` (`ToggleButton.js`), and the disabled state. axe-core's ARIA rules (`aria-allowed-attr`, `aria-valid-attr-value`, and `aria-roles` where a non-default role is present) pass across the demos.
- Grouping relationships (a `role="group"` and its label) belong to `ToggleButtonGroup`, not the single toggle. Whether a runtime state change is announced needs an assistive-technology review.

**Manual testing steps**

1. Open `ToggleButtonA11ySemanticStates` and `ToggleButtonA11yNonNative` with a screen reader running.
2. Confirm the plain toggle announces "button", the selected one announces its pressed state, the disabled one announces its disabled state, and the custom one announces "button".

**Pass:** role and state match the visual presentation for every variant.

#### 1.4.1 Use of Color · A

`🚩 Unverified` · `⚠️ Partially Supports` · `● Component`

- A toggle's purpose comes from its label or icon, not color, so the control itself is not identified by color alone.
- The pressed state is the gap. For `standard`, selecting darkens the label from `action.active` to `text.primary`, a clear lightness change. For the color variants the selected label switches to `color.main`, which is almost the same lightness as the unselected `action.active` (in grayscale `primary` differs by about 0.0003, `error` by 0.017), and the only other cue is a roughly 1.1:1 fill, so a `primary`/`error`/`info`/`success` toggle's pressed state is conveyed almost entirely by hue.

**Manual testing steps**

1. Open `ColorToggleButton` or `ToggleButtonA11yColorMatrix`.
2. Turn on a grayscale view (in Chrome DevTools: Rendering tab, Emulate vision deficiencies, Achromatopsia).
3. Confirm each toggle can still be told apart, and that a selected toggle is still distinguishable from an unselected one.

**Pass:** the control's meaning survives without color. The `standard` selected state stays distinguishable; the color variants do not, since their pressed cue is hue-dominant.

#### 1.4.3 Contrast (Minimum) · AA

`⚠️ Partially Supports` · `● Component`

- When selected, a toggle uses `color.main` as the label color over a `color.main`-tinted background (`ToggleButton.js`). The `primary`, `error`, `info`, and `warning` labels fall short of 4.5:1; `ToggleButtonA11yColorMatrix` records the `color-contrast` failure in [`toggle-button.a11y.json`](../../../../docs/data/material/components/toggle-button/toggle-button.a11y.json) (rule-level pass/fail only). The unselected label (`action.active`) and the `standard` selected label pass.
- axe-core `color-contrast` checks the resting state. The `:hover` colors and custom palettes need a visual check. Disabled toggles are exempt.

**Manual testing steps**

1. Open `ToggleButtonA11yColorMatrix`. With a contrast checker (the color picker in browser DevTools shows a ratio), check each selected label against its background.
2. Repeat with the pointer hovering, since `:hover` changes the background.
3. Check any custom theme colors the product uses.

**Pass:** at least 4.5:1, or 3:1 for large text, in the resting and hover states. Disabled is exempt; selected `primary`, `error`, `info`, and `warning` are the known failures.

#### 1.4.11 Non-text Contrast · AA

`🚩 Unverified` · `⚠️ Partially Supports` · `● Component`

- The label or icon identifies the control, so WCAG does not require the `divider` border to reach 3:1. The pieces that do need 3:1 are the focus indicator and the visual cue that marks the pressed state.
- The focus indicator is the ripple; `disableRipple`/`disableFocusRipple` remove it, so it can be absent entirely. The selected-state fill (`action.selectedOpacity`, 0.08) is faint and untested against the unselected state. Disabled toggles are exempt.

**Manual testing steps**

1. Open `ToggleButtons`. Press <kbd>Tab</kbd> to a toggle so its focus indicator shows, and measure the indicator against the colors next to it.
2. Measure a selected toggle's fill (and any meaningful icon) against the unselected state and the background.
3. Set `disableRipple` or `disableFocusRipple` on a toggle (no demo ships these) and repeat: the focus indicator should be gone.

**Pass:** the focus indicator and any meaningful icon are each at least 3:1, and the pressed state stays identifiable. Disabled parts are exempt.

#### 1.4.12 Text Spacing · AA

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- A text label wraps when `white-space: normal` is set and the toggle height comes from padding, not a fixed height, so the WCAG text-spacing values grow the toggle without clipping.
- No axe-core rule covers this (`avoid-inline-spacing` only inspects inline `style`, but `sx` compiles to a class); a `ToggleButtonA11yTextSpacing` screenshot guards the rendered spacing layout against regressions. Inject the spacing values through a stylesheet to check for clipping.

**Manual testing steps**

1. Open `ToggleButtonA11yTextSpacing`.
2. Apply the WCAG text-spacing values. The quickest way is to run this in the DevTools console: `document.head.insertAdjacentHTML('beforeend','<style>*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}</style>')`.
3. Look for cut-off, clipped, or overlapping label text.

**Pass:** all label text stays visible and the toggle still works.

#### 2.4.6 Headings and Labels · AA

`✅ Supports` · `◐ Shared`

- The accessible name serves as the control's label. axe-core confirms it is present (`button-name` on the native-button demos, `aria-command-name` on the non-native host).
- Whether the label describes the action (a clear `aria-label` against a vague one) is a content decision, confirmed with a manual review.

**Manual testing steps**

1. Read each toggle's label, or its `aria-label`, out of context.
2. Ask whether it says what the toggle does.

**Pass:** every label describes its action ("Bold", not "B").

#### 2.4.7 Focus Visible · AA

`🚩 Unverified` · `⚠️ Partially Supports` · `● Component`

- Keyboard focus shows the `.Mui-focusVisible` ripple (suppressed for mouse). The component sets no other focus style.
- `disableRipple` removes every ripple and `disableFocusRipple` removes the focus ripple, so either prop leaves the toggle with no visible focus indicator (the `disableRipple` prop documents this).

**Manual testing steps**

1. Open `ToggleButtons` and `StandaloneToggleButton`. Press <kbd>Tab</kbd> to move to each toggle.
2. Confirm a clear focus indicator appears, and that it looks different from the selected style.
3. Click a toggle with the mouse and confirm the indicator does not appear (it is keyboard-only).
4. Set `disableRipple` or `disableFocusRipple` on a toggle (no demo ships these) and <kbd>Tab</kbd> to it.

**Pass:** every keyboard-focused toggle shows a visible indicator, including under `disableRipple` and `disableFocusRipple`.

#### 2.5.3 Label in Name · A

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- When a toggle has a visible text label, that text is the accessible name (the children become the name). An icon-only toggle has no visible text, so its `aria-label` is the name.
- An `aria-label` that omits or reorders the visible words breaks this. Compare the visible text to the computed name.

**Manual testing steps**

1. Open the accessibility tree (in Chrome DevTools: Elements panel, Accessibility tab) and select a toggle with a visible text label.
2. Compare its computed Name to the words shown on screen.
3. Optional: with Voice Control (macOS) or Dragon, say "click [label]" and confirm it activates.

**Pass:** the visible text appears in the accessible name. An `aria-label` that drops or reorders the visible words fails.

#### 4.1.2 Name, Role, Value · A

`✅ Supports` · `◐ Shared`

- A native `<button>` (or `role="button"` for a non-native host) sets the role; `aria-pressed` reflects `selected` for the on/off state, the W3C-prescribed mechanism for a toggle button (distinct from a switch's `aria-checked`); `disabled` sets state. axe-core `button-name` (with `aria-command-name` covering the non-native host), the other `aria-*` rules, and `nested-interactive` all pass.
- axe-core covers the mechanical layer (a name is present, `aria-pressed` is a valid and permitted value). Whether the name is meaningful, and whether the pressed state matches the visual state and is announced on change, needs an assistive-technology review.

**Manual testing steps**

1. Open `ToggleButtonA11ySemanticStates`, `ToggleButtonA11yNonNative`, and `ToggleButtonsMultiple` with a screen reader running.
2. <kbd>Tab</kbd> to each toggle and confirm the announced name, role, and pressed or disabled state are correct.
3. Activate a toggle and confirm the pressed/not-pressed change is announced.

**Pass:** name, role, and state are correct for every variant, and state changes are announced.

### ⚙️ Automated

#### 1.4.4 Resize Text · AA

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- Typography is set in rem and em, so the label and toggle scale with browser zoom or font size rather than staying pixel-fixed.
- A fixed-pixel container in the surrounding layout could clip at 200%.

**Manual testing steps**

1. Open the Toggle Button demos and set browser zoom to 200% (<kbd>Ctrl</kbd> or <kbd>Cmd</kbd> and <kbd>+</kbd>).
2. Confirm labels are fully visible and toggles still work.

**Pass:** nothing is clipped or cut off at 200%.

#### 1.4.10 Reflow · AA

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- A toggle sizes to its content, so it reflows on its own. Horizontal overflow at 320 CSS pixels comes from the surrounding layout, such as a wide `ToggleButtonGroup` that does not wrap.

**Manual testing steps**

1. Open the Toggle Button demos and set the window, or the DevTools device toolbar, to 320 CSS pixels wide.
2. Confirm there is no sideways scrolling and all toggles are reachable.

**Pass:** content reflows with no horizontal scroll.

#### 2.1.1 Keyboard · A

`✅ Supports` · `● Component`

- A native toggle and a non-native `role="button"` activate with <kbd>Enter</kbd> and <kbd>Space</kbd>. Disabled toggles leave the tab order.
- Confirmed by interaction tests in [`../ButtonBase/ButtonBase.test.js`](../ButtonBase/ButtonBase.test.js) (<kbd>Enter</kbd> and <kbd>Space</kbd> activation, disabled non-native cases) and [`./ToggleButton.test.js`](./ToggleButton.test.js) (click activation, disabled).

#### 2.1.2 No Keyboard Trap · A

`🚩 Unverified` · `✅ Supports` · `● Component`

- A single focusable control that installs no focus-capturing loop. <kbd>Tab</kbd> moves in and out, and a disabled toggle leaves the tab order (the `disabled` attribute on native buttons, `tabIndex=-1` on non-native).

#### 2.4.3 Focus Order · A

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- The component sits in natural DOM order with no positive `tabIndex`, and a disabled toggle leaves the order, so it is one correct focus stop.
- Order across toggles is the surrounding layout's responsibility.

#### 2.5.2 Pointer Cancellation · A

`🚩 Unverified` · `✅ Supports` · `● Component`

- Activation runs on `click`, fired on pointer-up over the target. `onMouseDown` only starts the ripple, and releasing off the target cancels, so nothing runs on the down event.

#### 2.5.8 Target Size (Minimum) · AA

`✅ Supports` · `● Component`

- Default sizes meet the 24 by 24 CSS pixel minimum (a `medium` icon toggle is about 48 pixels). axe-core `target-size` confirms this across the Toggle Button demos in [`toggle-button.a11y.json`](../../../../docs/data/material/components/toggle-button/toggle-button.a11y.json).
- Not covered: `sx` or `size` overrides that shrink a custom toggle, or hit-area changes under browser zoom.

#### 3.2.1 On Focus · A

`🚩 Unverified` · `✅ Supports` · `● Component`

- Focus triggers only the focus-visible ripple and `onFocus` callbacks. There is no navigation, dialog, or focus move, so focus alone changes no context.

#### 3.2.2 On Input · A

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- Toggling the pressed state (`selected`, exposed as `aria-pressed`) changes no context on its own.
- Whether an author's `onChange` handler couples that change to navigation or a new window without warning is an author decision.

## Not applicable

- **1.3.5 Identify Input Purpose (AA).** Not an input.
- **1.4.13 Content on Hover or Focus (AA).**
- **2.1.4 Character Key Shortcuts (A).** The only keys are <kbd>Enter</kbd> and <kbd>Space</kbd> which are not shortcuts.
- **2.2.2 Pause, Stop, Hide (A).** Nothing moves or auto-updates.
- **2.4.4 Link Purpose (In Context) (A).** A button, not a link. `href` is inherited from ButtonBase, but a toggle used as a link carries a meaningless `aria-pressed`, so link usage is outside the documented toggle pattern.
- **2.5.7 Dragging Movements (AA, new in 2.2).** No drag interactions.
- **3.1.1 Language of Page (A), 3.1.2 Language of Parts (AA).** Authoring concern.
- **3.2.3 Consistent Navigation (AA).** Inapplicable in isolation.
- **3.2.6 Consistent Help (A, new in 2.2).** Inapplicable in isolation.
- **3.3.2 Labels or Instructions (A).** Limited by WCAG to data-entry controls; it excludes interactive widgets not associated with data entry, and a toggle button is one.
- **3.3.7 Redundant Entry (A, new in 2.2).** Covers repopulating previously entered data. The toggle captures none.
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2).** The paste, autofill, and cognitive-test duty falls on the credential fields, not a toggle.
- **4.1.3 Status Messages (AA).** No status message; state is exposed through `aria-pressed`.
- **Time-based media (1.2.1 to 1.2.5).** No audio or video.
- **Audio Control (1.4.2).** Emits no audio.
- **Orientation (1.3.4).** Sets no orientation lock; a layout concern.
- **Bypass Blocks (2.4.1), Page Titled (2.4.2), Multiple Ways (2.4.5).** Page or site structure concerns.
- **Timing Adjustable (2.2.1).** Sets no time limit.
- **Three Flashes or Below Threshold (2.3.1).** Nothing flashes (one ripple of about 550 ms).
- **Pointer Gestures (2.5.1), Motion Actuation (2.5.4).** Activates on a simple click; reads no device motion.
- **Error Identification (3.3.1), Error Suggestion (3.3.3), Error Prevention (3.3.4).** The toggle collects and validates no input; these belong to the form or process.

## Level AAA

The following SC are applicable but out of scope:

- **2.3.3 Animation from Interactions.** The ripple's `scale()` animation honors `prefers-reduced-motion` when the theme sets `motion.reducedMotion` to `system` (follows the OS) or `always`; `disableRipple` also removes it. The default is `never`, so OS reduced-motion is not honored by default. `🚩`
- **2.4.13 Focus Appearance.** The focus indicator is unlikely to meet the area and 3:1 thresholds, especially with `disableRipple`. `🚩`
- **2.5.5 Target Size (Enhanced), 44 px.** The `small` size (about 40 px) is below 44 px. `🚩`
- **1.4.6 Contrast (Enhanced), 7:1.** Palettes target the AA 4.5:1, so several selected colors fall short of 7:1. `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.3.6 Identify Purpose, 1.4.9 Images of Text (No Exception), 2.1.3 Keyboard (No Exception), 2.4.12 Focus Not Obscured (Enhanced)**.

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.2.
- **Scope.** The Toggle Button component in isolation, rendered through its documented API.
- **Automated.** axe-core via Playwright test harness (results in [`toggle-button.a11y.json`](../../../../docs/data/material/components/toggle-button/toggle-button.a11y.json)), plus interaction tests in `ButtonBase.test.js` and `ToggleButton.test.js`.
- **Assistive-technology review.** Not yet performed. `🚩` criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
