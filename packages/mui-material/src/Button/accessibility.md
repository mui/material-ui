# Button accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

| Result                | Count |
| :-------------------- | :---- |
| ✅ Supports           | 23    |
| ⚠️ Partially Supports | 4     |
| ❌ Does Not Support   | 0     |
| ➖ Not Applicable     | 28    |
| 🚩 Flagged            | 17/27 |

## Known gaps

- ⚠️ **1.4.3 Contrast (Minimum).** `info` and `warning` contained buttons fall short of 4.5:1.
- ⚠️ **1.4.11 Non-text Contrast.** Focus-indicator, border, and icon contrast are untested; `disableRipple`/`disableFocusRipple` remove the `text`/`outlined` focus indicator, and `disableElevation` removes the `contained` one.
- ⚠️ **2.4.7 Focus Visible.** `disableRipple`/`disableFocusRipple` remove the `text`/`outlined` focus indicator; `contained` loses its indicator only when `disableElevation` is combined with them.
- ⚠️ **4.1.3 Status Messages.** The `loading` state adds no live region, so the change may go unannounced.

## Success criteria

### 🔍 Manual

#### 1.3.2 Meaningful Sequence · A

`🚩` · `✅ Supports` · `○ Author`

- The button is one control. Its slots render in DOM order (start icon, label, end icon); decorative MUI icons are `aria-hidden`, leaving the single label as the exposed content. Custom icon nodes are not hidden automatically.
- Order carries meaning only across several controls, which the surrounding layout sets. Confirm that reading order matches the visual order of any button group.

**Manual testing steps**

1. In a UI with a series of buttons, press <kbd>Tab</kbd> repeatedly and note the order the buttons receive focus.
2. Compare that order to the visual left-to-right order.

**Pass:** focus order matches the visual order. Watch for `Stack` or flex layouts that reorder buttons visually without changing the DOM.

#### 1.3.3 Sensory Characteristics · A

`🚩` · `✅ Supports` · `○ Author`

- A button with text or an `aria-label` can be identified by name, not only by shape, color, or position.
- Instructions in the surrounding content must not rely on color, shape, or position alone (for example, "press the green button").

**Manual testing steps**

1. Find any product copy that tells users to operate a button.
2. Check that it names the button by its label, not only by color, shape, size, or position.

**Pass:** no instruction relies on "the green button" or "the button on the right" without naming it.

#### 1.4.4 Resize Text · AA

`🚩` · `✅ Supports` · `◐ Shared`

- Typography is set in rem and em, so the label and button scale with browser zoom or font size rather than staying pixel-fixed.
- A fixed-pixel container in the surrounding layout could clip at 200%.

**Manual testing steps**

1. In a UI with buttons, set browser zoom to 200% (<kbd>Ctrl</kbd> or <kbd>Cmd</kbd> and <kbd>+</kbd>).
2. Confirm labels are fully visible and buttons still work.

**Pass:** nothing is clipped or cut off at 200%.

#### 1.4.5 Images of Text · AA

`✅ Supports` · `○ Author`

- The label is real text.
- A logo can be a valid exception, as long as the Button has a proper accessible name.

**Manual testing steps**

1. Select a button's label with the mouse (or zoom in) and confirm it behaves like real text (selectable, stays crisp), not an image.

**Pass:** no button renders its label as an image of text (a logo with an accessible name is exempt).

#### 1.4.10 Reflow · AA

`🚩` · `✅ Supports` · `◐ Shared`

- Labels wrap by default (the component sets no `white-space`), so a button reflows on its own. Horizontal overflow at 320 CSS pixels comes from the surrounding layout, such as a fixed-width button or a non-wrapping row.

**Manual testing steps**

1. In a UI with buttons, set the window (or the DevTools device toolbar) to 320 CSS pixels wide.
2. Confirm there is no sideways scrolling and all button text is reachable.

**Pass:** content reflows with no horizontal scroll, and long labels wrap.

#### 2.4.11 Focus Not Obscured (Minimum) · AA

`🚩` · `✅ Supports` · `○ Author`

- The button is an ordinary focusable element and never places itself behind other content. Obscuring comes from sticky headers, banners, or overlays in the surrounding layout.
- Confirm by moving focus to the button beneath any sticky or overlay content at several scroll positions. At least part of it must stay visible.

**Manual testing steps**

1. In a page that has a sticky header, footer, or banner, press <kbd>Tab</kbd> to move focus onto a button near it.
2. Scroll so the button sits under the sticky element, then <kbd>Tab</kbd> to it again.

**Pass:** at least part of the focused button stays visible, never fully covered.

#### 3.2.4 Consistent Identification · AA

`🚩` · `✅ Supports` · `○ Author`

- The component produces one stable accessible name per set of props, the precondition for consistent identification.
- Consistency is a cross-page property. Confirm that buttons with the same function share a label and icon, and that one label is not reused for different functions.

**Manual testing steps**

1. List the buttons that do the same job across the product (for example, every "Delete").
2. Compare their labels and icons.

**Pass:** the same job uses the same label and icon, and no single label is reused for different jobs.

#### 4.1.3 Status Messages · AA

`🚩` · `⚠️ Partially Supports` · `◐ Shared`

- The `loading` state renders a `CircularProgress` with `role="progressbar"` named by the button, but the component adds no `aria-live` or `role="status"` region, so the change may go unannounced when focus is elsewhere.
- This applies only when `loading` is toggled for a background task. Add a live region in the surrounding application if the result must be announced.

**Manual testing steps**

1. With a screen reader running (NVDA with Chrome, or VoiceOver with Safari), activate a button that enters the `loading` state for a background task.
2. Press <kbd>Tab</kbd> to move focus away from it, then listen for whether the loading change is announced.

**Pass:** the change is announced without the user moving focus to it. It is not, because the component adds no live region; wrap the status in `role="status"` to fix it.

### 🔁 Hybrid

#### 1.1.1 Non-text Content · A

`✅ Supports` · `◐ Shared`

- `SvgIcon` is used as `startIcon`/`endIcon` which default to `aria-hidden` and are not focusable, so they do not affect the name.
- Custom icon nodes must be hidden by the author if decorative. axe-core `button-name`, `link-name`, and `aria-command-name` confirm a name is present across the demos.
- The name comes from the children or `aria-label`; an icon-only button with no label has none. Whether the name conveys meaning needs an assistive-technology review.

**Manual testing steps**

1. With a screen reader running (NVDA with Chrome, or VoiceOver with Safari), <kbd>Tab</kbd> to buttons that carry a start or end icon and confirm each announces the visible label, not the icon.
2. For any icon-only button in the product, confirm it has an `aria-label` describing the action.

**Pass:** every button's announced name matches its purpose, and decorative icons are silent.

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `◐ Shared`

- The component sets the correct role (`button`, `link` with `href`, or `role="button"` for non-native), the disabled and loading state, and the upload label-to-input relationship. axe-core's ARIA rules pass across the demos.
- Whether the runtime loading or disabled state change is announced needs an assistive-technology review; static axe-core does not cover it.

**Manual testing steps**

1. With a screen reader running, focus a plain button, an `href` button, a disabled button, and a non-native (`role="button"`) button.
2. Confirm the plain button announces "button", the `href` one announces "link", the disabled one announces its disabled state, and the non-native one announces "button".

**Pass:** role and state match the visual presentation for every variant.

#### 1.4.1 Use of Color · A

`🚩` · `✅ Supports` · `◐ Shared`

- A button's purpose comes from its label or icon, and focus, disabled, and loading are shown without relying on color, so the component does not use color alone.
- Two buttons can still be distinguished by palette alone (for example, `error` against `success`). Confirm in grayscale that meaning survives.

**Manual testing steps**

1. In a UI with buttons of different colors, turn on a grayscale view (in Chrome DevTools: Rendering tab, Emulate vision deficiencies, Achromatopsia).
2. Confirm each button can still be told apart and understood from its text.

**Pass:** meaning/purpose of the Button can be understood without color.

#### 1.4.3 Contrast (Minimum) · AA

`⚠️ Partially Supports` · `● Component`

- `info` and `warning` contained buttons do not meet `4.5:1`.
- axe-core `color-contrast` checks the default state.
- `:hover` and `:active` colors need a visual check.
- Disabled buttons are exempt.

**Manual testing steps**

1. With a contrast checker (the color picker in browser DevTools shows a ratio), check each button's label against its background, across the color and variant combinations in use.
2. Repeat with the pointer hovering and held down, since `:hover` and `:active` change the background.
3. Check any custom theme colors the product uses.

**Pass:** at least `4.5:1`, or `3:1` for large text, in the resting, hover, and active states. Disabled is exempt; `info` and `warning` are the known failures.

#### 1.4.11 Non-text Contrast · AA

`🚩` · `⚠️ Partially Supports` · `● Component`

- The focus indicator, the `outlined` border, and any meaningful icon each need `3:1` against adjacent colors.
- The indicator is the ripple for `text`/`outlined` and a box-shadow for `contained`; `disableRipple`/`disableFocusRipple` remove the ripple and `disableElevation` the box-shadow, so it can be absent entirely.
- Disabled buttons are exempt.

**Manual testing steps**

1. With a contrast checker, measure an `outlined` button's border against the page behind it.
2. Press <kbd>Tab</kbd> to a button so its focus indicator shows, and measure the indicator against the colors next to it.
3. If a button has a meaningful icon, measure it against its background.

**Pass:** border, focus indicator, and any meaningful icon are each at least `3:1`. Disabled and purely decorative parts are exempt.

#### 1.4.12 Text Spacing · AA

`🚩` · `✅ Supports` · `◐ Shared`

- Labels wrap and the button height comes from padding, not a fixed height, so the WCAG text-spacing values grow the button without clipping.

**Manual testing steps**

1. On a button with a long label, apply the WCAG text-spacing values. The quickest way is to run this in the DevTools console: `document.head.insertAdjacentHTML('beforeend','<style>*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}</style>')`.
2. Look for cut-off, clipped, or overlapping label text.

**Pass:** all label text stays visible and the button still works.

#### 2.4.4 Link Purpose (In Context) · A

`✅ Supports` · `◐ Shared`

- This applies only with `href`, where the root is a `<a>`. axe-core `link-name` confirms a non-empty accessible name on the link demos.
- Whether the name and context convey the destination is an authoring concern.

**Manual testing steps**

1. Find buttons that use `href` (they render as links).
2. Read each link's label together with the text around it.

**Pass:** a user can tell where the link goes. Replace vague labels like "Learn more" or "click here".

#### 2.4.6 Headings and Labels · AA

`✅ Supports` · `◐ Shared`

- The accessible name serves as the control's label. axe-core `button-name` and `link-name` confirm it is present.
- Whether the label describes the action ("Submit order" against a vague name) is an authoring concern.

**Manual testing steps**

1. Read each button's label out of context.
2. Ask whether it says what the button does.

**Pass:** every label describes its action ("Submit order", not "OK").

#### 2.4.7 Focus Visible · AA

`🚩` · `⚠️ Partially Supports` · `● Component`

- Keyboard focus shows the `.Mui-focusVisible` indicator (suppressed for mouse); `contained` adds a box-shadow on focus.
- `disableRipple`/`disableFocusRipple` remove the ripple and `disableElevation` the `contained` box-shadow, so `text`/`outlined` lose the indicator with either ripple prop, and `contained` only when a ripple prop and `disableElevation` are both set.

**Manual testing steps**

1. Press <kbd>Tab</kbd> to move focus across `contained`, `outlined`, and `text` buttons.
2. Confirm a clear focus indicator appears, and that it looks different from the hover style.
3. Click a button with the mouse and confirm the indicator does not appear (it is keyboard-only).
4. <kbd>Tab</kbd> to `text` and `outlined` buttons that set `disableRipple` or `disableFocusRipple`; for `contained`, test a button that combines one of those props with `disableElevation`.

**Pass:** every keyboard-focused button shows a visible indicator, including under `disableRipple`, `disableFocusRipple`, and `disableElevation`.

#### 2.5.3 Label in Name · A

`🚩` · `✅ Supports` · `◐ Shared`

- The visible text is the accessible name: the children become the name, decorative MUI icons are hidden (a custom icon node is not, unless the author hides it), and `loadingPosition="center"` keeps the label in the name despite `color: transparent`.
- An `aria-label` that omits or reorders the visible words breaks this. Compare the visible text to the computed name.

**Manual testing steps**

1. Open the accessibility tree (in Chrome DevTools: Elements panel, Accessibility tab) and select a button.
2. Compare its computed Name to the words shown on screen.
3. Optional: with Voice Control (macOS) or Dragon, say "click [label]" and confirm it activates.

**Pass:** the visible text appears in the accessible name. An `aria-label` that drops or reorders the visible words fails.

#### 3.3.2 Labels or Instructions · A

`✅ Supports` · `◐ Shared`

- This applies to the file-upload pattern (`component="label"` wrapping a hidden `<input type="file">`), where the button text labels a real input. axe-core `label` and `form-field-multiple-labels` pass on that demo.
- Whether the label text is sufficiently instructive is a manual review. A plain action button is outside this criterion.

**Manual testing steps**

1. For a file-upload button (`component="label"` wrapping a hidden `<input type="file">`), read the upload button's label.

**Pass:** the label clearly tells the user what to upload, not just "Upload".

#### 4.1.2 Name, Role, Value · A

`✅ Supports` · `◐ Shared`

- Native button, anchor, and `role="button"` set the correct role; `disabled` and `loading` set state; the loading progressbar is named by the button. axe-core `button-name`, the `aria-*` rules, `nested-interactive`, and `duplicate-id-aria` all pass.
- axe-core covers the mechanical layer. Whether the name is meaningful, the role matches intent, and the runtime state change is announced needs an assistive-technology review.

**Manual testing steps**

1. With a screen reader running, <kbd>Tab</kbd> to each button variant in use (native, `href` link, non-native `role="button"`, disabled, loading).
2. Confirm the announced name, role, and disabled state are correct for each.
3. Toggle `loading` and confirm the busy or disabled change is announced.

**Pass:** name, role, and state are correct for every variant, and state changes are announced.

### ⚙️ Automated

#### 2.1.1 Keyboard · A

`✅ Supports` · `● Component`

- Native buttons and non-native `role="button"` activate with <kbd>Enter</kbd> and <kbd>Space</kbd>; an `href` anchor uses native link behavior (<kbd>Enter</kbd> activates, <kbd>Space</kbd> does not). Disabled buttons leave the tab order.
- Confirmed by interaction tests in [`../ButtonBase/ButtonBase.test.js`](../ButtonBase/ButtonBase.test.js) (<kbd>Enter</kbd> and <kbd>Space</kbd> activation, disabled non-native cases).

#### 2.1.2 No Keyboard Trap · A

`🚩` · `✅ Supports` · `● Component`

- A single focusable control that installs no focus-capturing loop. <kbd>Tab</kbd> moves in and out, and a disabled button leaves the tab order (the `disabled` attribute on native buttons, `tabIndex=-1` on non-native).

#### 2.4.3 Focus Order · A

`🚩` · `✅ Supports` · `◐ Shared`

- The component sits in natural DOM order with no positive `tabIndex`, and disabled or loading buttons leave the order, so it is one correct focus stop.
- Order across controls is the surrounding layout's responsibility.

#### 2.5.2 Pointer Cancellation · A

`🚩` · `✅ Supports` · `● Component`

- Activation runs on `click`, fired on pointer-up over the target. `onMouseDown` only starts the ripple, and releasing off the target cancels, so nothing runs on the down event.

#### 2.5.8 Target Size (Minimum) · AA

`✅ Supports` · `● Component`

- Default sizes meet the 24 by 24 CSS pixel minimum (medium is about 36 pixels tall). axe-core `target-size` confirms this across the Button demos in [`buttons.a11y.json`](../../../../docs/data/material/components/buttons/buttons.a11y.json).
- Not covered: `sx` or `size` overrides that shrink a custom button, or hit-area changes under browser zoom.

#### 3.2.1 On Focus · A

`🚩` · `✅ Supports` · `● Component`

- Focus triggers only the focus-visible ripple and `onFocus` callbacks. There is no navigation, dialog, or focus move, so focus alone changes no context.

#### 3.2.2 On Input · A

`🚩` · `✅ Supports` · `◐ Shared`

- Toggling the button's setting (`loading` to disabled, or an `aria-pressed` toggle) changes no context on its own.
- Whether an author's handler couples that change to navigation or a new window without warning is an author decision.

## Not applicable

- **1.3.5 Identify Input Purpose (AA).** Not an input.
- **1.4.13 Content on Hover or Focus (AA).**
- **2.1.4 Character Key Shortcuts (A).** The only keys are <kbd>Enter</kbd> and <kbd>Space</kbd> which are not shortcuts.
- **2.2.2 Pause, Stop, Hide (A).** The loading spinner is user-triggered, and the button is disabled while loading.
- **2.5.7 Dragging Movements (AA, new in 2.2).** No drag interactions.
- **3.1.1 Language of Page (A), 3.1.2 Language of Parts (AA).** Authoring concern.
- **3.2.3 Consistent Navigation (AA).** Inapplicable in isolation.
- **3.2.6 Consistent Help (A, new in 2.2).** Inapplicable in isolation.
- **3.3.7 Redundant Entry (A, new in 2.2).** Covers repopulating previously entered data. The button captures none.
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2).** The paste, autofill, and cognitive-test duty falls on the credential fields, not the submit button.
- **Time-based media (1.2.1 to 1.2.5).** No audio or video.
- **Audio Control (1.4.2).** Emits no audio.
- **Orientation (1.3.4).** Sets no orientation lock; a layout concern.
- **Bypass Blocks (2.4.1), Page Titled (2.4.2), Multiple Ways (2.4.5).** Page or site structure concerns.
- **Timing Adjustable (2.2.1).** Sets no time limit.
- **Three Flashes or Below Threshold (2.3.1).** Nothing flashes (one ripple of about 550 ms).
- **Pointer Gestures (2.5.1), Motion Actuation (2.5.4).** Activates on a simple click; reads no device motion.
- **Error Identification (3.3.1), Error Suggestion (3.3.3), Error Prevention (3.3.4).** The button collects and validates no input; these belong to the form or process.

## Level AAA

- **2.3.3 Animation from Interactions.** The ripple's `scale()` animation honors `prefers-reduced-motion` when the theme sets `motion.reducedMotion` to `system` (follows the OS) or `always`; `disableRipple` also removes it. The default is `never`, so OS reduced-motion is not honored by default. `🚩`
- **2.4.13 Focus Appearance.** The focus indicator is unlikely to meet the area and 3:1 thresholds, especially with `disableRipple`. `🚩`
- **2.5.5 Target Size (Enhanced), 44 px.** Default sizes (about 36 px) are below 44 px. `🚩`
- **1.4.6 Contrast (Enhanced), 7:1.** Palettes target the AA 4.5:1, so several combinations fall short of 7:1. `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.3.6 Identify Purpose, 1.4.9 Images of Text (No Exception), 2.1.3 Keyboard (No Exception), 2.4.9 Link Purpose (Link Only), 2.4.12 Focus Not Obscured (Enhanced)**.

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.1.
- **Scope.** The Button component in isolation, rendered through its documented API.
- **Automated.** axe-core via Playwright test harness (results in [`buttons.a11y.json`](../../../../docs/data/material/components/buttons/buttons.a11y.json)), plus interaction tests in `ButtonBase.test.js` and `Button.test.js`.
- **Assistive-technology review.** Not yet performed. Flagged criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
