# Avatar accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

| Result                | Count |
| :-------------------- | :---- |
| ✅ Supports           | 9     |
| ⚠️ Partially Supports | 2     |
| ❌ Does Not Support   | 0     |
| ➖ Not Applicable     | 44    |
| 🚩 Unverified         | 6/11  |

## Known gaps

- ⚠️ **1.4.3 Contrast (Minimum).** Default letter and fallback avatars render white text on `grey[400]` (about 1.9:1), and the `deepOrange[500]` example is 3.16:1, both below 4.5:1; arbitrary `stringToColor` backgrounds are unguaranteed.
- ⚠️ **1.4.11 Non-text Contrast.** Meaningful icon-child avatars use the default white-on-`grey[400]` (1.9:1) or low-contrast author backgrounds (for example `green[500]` 2.78:1), below the 3:1 minimum for graphical objects.

## Success criteria

### 🔍 Manual

#### 1.3.2 Meaningful Sequence · A

`🚩 Unverified` · `✅ Supports` · `○ Author`

- The component renders a single child (the `<img>`, the initials text, or one icon) in DOM order, so within one avatar there is no sequence whose order conveys meaning.
- Order matters only across several avatars (a row, a list, or an `AvatarGroup`), which the surrounding layout controls. Confirm that the reading order of a group of avatars matches their visual order.

**Manual testing steps**

1. Render a row of avatars (`GroupAvatars`, or several `<Avatar>` in a `Stack`).
2. Inspect the DOM or accessibility tree order and compare it to the visual left-to-right order.

**Pass:** reading order matches visual order. A `Stack` or flex layout that visually reorders avatars without changing the DOM would fail.

#### 1.3.3 Sensory Characteristics · A

`🚩 Unverified` · `✅ Supports` · `○ Author`

- An avatar is identified by its image `alt`, its initials, or an author-supplied label, not by its shape (`variant`), color, size, or position, so it can be referenced without relying on a sensory characteristic.
- Instructions in the surrounding content must not point to an avatar by shape or position alone (for example, "click the round picture on the left").

**Manual testing steps**

1. Find any product copy that tells users to act on an avatar.
2. Check that it names the avatar by a text cue (the person's name or label), not only by shape, color, size, or position.

**Pass:** no instruction relies on "the round avatar" or "the one on the right" without a text identifier.

#### 1.4.5 Images of Text · AA

`✅ Supports` · `◐ Shared`

- Letter/initials children and the `alt[0]` fallback are live, CSS-styled DOM text, not images of text.
- The only risk is an author deliberately passing a bitmap of text as the avatar image.
- Confirmed by a unit test in `Avatar.test.js` (initials render as a text node, not an `<img>`).

**Manual testing steps**

1. Open `LetterAvatars` and `FallbackAvatars` and confirm the initials are selectable text, not an `<img>`.

**Pass:** avatar initials and fallback are real text; the component renders no image of text.

### 🔁 Hybrid

#### 1.1.1 Non-text Content · A

`✅ Supports` · `◐ Shared`

- When given an `src`/`srcSet`, the component renders a native `<img>` and forwards the author's `alt` as its text alternative; the states without images (`Person` fallback and `SvgIcon` children) are `aria-hidden`, so assistive technology skips them as decorative.
- A text alternative is the author's responsibility.
- An icon-only avatar (`IconAvatars`) or the `Person` fallback exposes nothing to assistive technology by default; if the icon carries meaning, the author must add an accessible name.
- axe-core `image-alt` confirms a text alternative is present on the image avatar.

**Manual testing steps**

1. Render `ImageAvatars` (with `src` and `alt`) and inspect the DOM: confirm a native `<img>` with the author's `alt`.
2. Run a screen reader (VoiceOver with Safari, or NVDA with Chrome) over `ImageAvatars` and confirm the `alt` is announced.
3. Render the same avatar with `alt` omitted and confirm the `<img>` has no `alt` (filename risk).
4. Render `IconAvatars` and `FallbackAvatars` and confirm the `SvgIcon` and `Person` are `aria-hidden` and silent.
5. Render a decorative image avatar with `alt=""` and confirm assistive technology ignores it.

**Pass:** every informative avatar exposes a text alternative (`img` `alt` or an author-provided label); decorative and no-image avatars are silent. The component does its part; an informative avatar with no `alt` is an authoring failure.

#### 1.3.1 Info and Relationships · A

`✅ Supports` · `◐ Shared`

- The only relationship (image-to-name) is conveyed natively via `<img>` and `alt` text.
- If an author builds meaning by composing the avatar with surrounding content (for example, a name and avatar in a list item), conveying that structure is the author's responsibility.
- Confirmed by unit tests in `Avatar.test.js` (the root exposes no role; the `Person` fallback and `SvgIcon` children are `aria-hidden`).

**Manual testing steps**

1. Render `ImageAvatars` and inspect the accessibility tree (in Chrome DevTools: Elements panel, Accessibility tab): confirm the `img` exposes `role="img"` with the `alt` as its name.
2. Render `LetterAvatars` and `IconAvatars` and confirm the root div is generic (no spurious role) and decorative icons are `aria-hidden`.
3. Confirm no grouping, heading, or list semantics are implied by the avatar alone that would need programmatic encoding.

**Pass:** the image-to-name relationship is programmatically available via native `img` and `alt`.

#### 1.4.1 Use of Color · A

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- Color is decorative only: the default gray background and the hash-derived `stringToColor` background in `BackgroundLetterAvatars` are aesthetic, so the component never uses color alone to convey meaning.
- The avatar's information is carried by the image, initials, or icon, not by the background hue, so nothing is lost when color is removed.
- If an author repurposes the background to encode status or role (for example, green for online), they must add a non-color cue (text, icon, or shape) to satisfy this criterion.

**Manual testing steps**

1. Render `BackgroundLetterAvatars` and `LetterAvatars` and confirm the identifying content is the initials or icon, not the hue.
2. Simulate grayscale or color-blindness (in Chrome DevTools: Rendering tab, Emulate vision deficiencies) and confirm no information is lost when color is removed.
3. Confirm the component does not use color alone to distinguish any state.

**Pass:** no information conveyed by the avatar is lost in grayscale; any color-coded meaning an author adds is paired with a non-color cue.

#### 1.4.3 Contrast (Minimum) · AA

`⚠️ Partially Supports` · `◐ Shared`

- Default letter avatars fail: `colorDefault` sets the text color to `background.default` (`#fff` in the light theme) on `backgroundColor` `grey[400]` `#bdbdbd`, about `1.9:1`. The children text is 20px at the inherited weight 400, so it is not WCAG large text and the `4.5:1` threshold applies; at `1.9:1` it fails even the `3:1` large-text threshold. This affects `<Avatar>H</Avatar>`, the `alt[0]` fallback, and any default-palette letter avatar.
- Colored demos fail too: `LetterAvatars` renders white "N" on `deepOrange[500]` `#ff5722` = `3.16:1`, below `4.5:1`; only its white "OP" on `deepPurple[500]` passes at `7.3:1`. `BackgroundLetterAvatars` compounds the risk: `bgcolor` is an arbitrary `stringToColor` hash with white text, so contrast is unguaranteed and often below `4.5:1`. In the three names, "Tim Neutkens" (`#fd7e97`) renders at `2.44:1` (failing the `3:1` min) and "Jed Watson" (`#1f6cfa`) reaches only `4.58:1`.
- A working photographic `<img>` is exempt (it's not text), and the dark-theme default (`grey[600]` `#757575` on `#121212`, about `4.1:1`) is also below `4.5:1`. Icons are non-text and are out of scope here. Authors must override `bgcolor`/`color` to reach `4.5:1` for letter avatars.
- axe-core `color-contrast` flags the low-contrast letter demos.

**Manual testing steps**

1. Render the default gray `LetterAvatars` (`<Avatar>H</Avatar>`) and measure foreground against background with a contrast tool (the color picker in browser DevTools shows a ratio): expect about 1.9:1.
2. Confirm the children font is 20px at weight 400 (not large text), so `4.5:1` applies.
3. Render `LetterAvatars` ("N" on `deepOrange[500]`) and `BackgroundLetterAvatars` across several names and measure each background against the white text.
4. Render `ImageAvatars` and confirm a working image is exempt (no text on background).
5. Repeat in the dark theme (`grey[600]` on `#121212`).

**Pass:** all letter, initial, and fallback text meets `4.5:1` (or `3:1` if it's sized to qualify as large text). The default gray letter avatar, the `deepOrange[500]` example, and arbitrary `stringToColor` backgrounds do not meet this without author color overrides.

#### 1.4.11 Non-text Contrast · AA

`🚩 Unverified` · `⚠️ Partially Supports` · `◐ Shared`

- Meaningful icon-child avatars fall short: when an icon is the avatar's sole, unlabeled content (`IconAvatars`), it is a graphical object required to understand the content which requires `3:1`. The component's `colorDefault` renders a white icon on `grey[400]`/`#bdbdbd` (`1.9:1`), and author backgrounds vary, for example `green[500]`/`#4caf50` = `2.78:1` fails, while `pink[500]`/`#e91e63` = `4.35:1` passes. So the default and low-contrast author backgrounds are below `3:1`.
- Exemptions: the colored circle or square is a decorative graphical object, and the `Person` fallback is a decorative placeholder. The default avatar is non-interactive so the user-interface-component part of this criterion does not apply.
- Under `@media (forced-colors: active)` the component sets `1px solid ButtonBorder` so the shape stays visible in Windows High Contrast Mode. A meaningful icon avatar needs both a `≥3:1` foreground/background here and an accessible name under 1.1.1 (icon children default to `aria-hidden`). This is Partially Supports, because the `1.9:1` shortfall comes from the default `colorDefault`, whereas the missing name is an author responsibility.

**Manual testing steps**

1. Render `IconAvatars` (Folder on default gray, Pageview on `pink[500]`, Assignment on `green[500]`) and measure each icon's foreground against its background: expect the default and `green[500]` below 3:1.
2. Render `VariantAvatars` (circular, rounded, square) and confirm the colored shape itself is decorative, not an information-bearing graphic.
3. Enable Windows High Contrast / forced-colors and confirm the `1px` `ButtonBorder` keeps the avatar boundary visible.

**Pass:** any icon that conveys meaning meets `3:1` against its background; the decorative container shape and `Person` placeholder are exempt, and the boundary stays visible in forced-colors mode.

#### 1.4.12 Text Spacing · AA

`✅ Supports` · `● Component`

- An avatar holds 1 to 2 character initials (or the `alt[0]` fallback) in a fixed 40px box with `overflow: hidden`, so the only risk to text legibility is clipping. Increasing text spacing would overflow the content but not clip it.
- Confirmed by a Playwright regression test (`test/regressions/index.test.js`): the `OP` initials stay within the box after the four text-spacing overrides.

**Manual testing steps**

1. Render `LetterAvatars` ("OP") and `FallbackAvatars`.
2. Apply the WCAG text-spacing values to the text: line-height 1.5, letter-spacing 0.12em, word-spacing 0.16em (paragraph spacing 2em does nothing here, with no paragraphs).
3. Confirm the 1 to 2 character initials stay fully visible inside the 40px circle.
4. Repeat with `SizeAvatars` to gauge sensitivity at other fixed sizes.

**Pass:** documented initials and fallback text stay fully visible after applying the four overrides. Long author-supplied strings that already overflow at default spacing are out of scope.

### ⚙️ Automated

#### 1.4.4 Resize Text · AA

`🚩 Unverified` · `✅ Supports` · `● Component`

- The container is a fixed 40px square with text in rem (`pxToRem(20)`) and `overflow: hidden`. Under full-page browser zoom, the default scaling mechanism, the box and the text scale together, so initials stay fully visible.

**Manual testing steps**

1. Open `LetterAvatars` and `FallbackAvatars`.
2. Set browser zoom to 200% (<kbd>Ctrl</kbd> or <kbd>Cmd</kbd> and <kbd>+</kbd>) and confirm the box and initials scale together with nothing clipped.
3. Optional: compare against text-only resize (Firefox "Zoom Text Only") to see the px box not scaling; long initials there are an author concern.

**Pass:** initials and fallback text stay fully visible at 200% page zoom. The container scales with the page.

#### 1.4.10 Reflow · AA

`🚩 Unverified` · `✅ Supports` · `● Component`

- The avatar is a fixed 40px box that establishes no horizontal layout, so at a 320 CSS pixel width (or 400% zoom) it cannot force two-dimensional scrolling; it scales and wraps with its container.

**Manual testing steps**

1. Open the Avatar demos and set the window, or the DevTools device toolbar, to 320 CSS pixels wide.
2. Confirm there is no horizontal scrolling and every avatar stays visible.

**Pass:** content reflows with no two-dimensional scrolling. A single 40px avatar never triggers it.

## Not applicable

- **1.3.5 Identify Input Purpose (AA).** Not an input; collects no user information.
- **1.4.13 Content on Hover or Focus (AA).** Shows no hover or focus content; a `Tooltip` wrapper would own this.
- **2.4.4 Link Purpose (In Context) (A).** Renders no anchor or `role="link"` by default; an author who sets `component="a"` owns the link's purpose.
- **2.5.3 Label in Name (A).** Not a labeled control; the `img`'s `alt` is an accessible name, not a visible label.
- **3.1.2 Language of Parts (AA).** Names and initials are an explicit exception; other text is author-supplied.
- **4.1.2 Name, Role, Value (A).** Applies to controls; the static `div`/`img` exposes no control role, state, or value (the `img`'s `alt` is covered by 1.1.1).
- **4.1.3 Status Messages (AA).** Adds no live region; the image-to-fallback swap is not a status message.
- **Time-based media (1.2.1 to 1.2.5).** No audio or video.
- **Audio Control (1.4.2).** Emits no audio.
- **Orientation (1.3.4).** Sets no orientation lock; a layout concern.
- **Keyboard, pointer, and focus (2.1.1, 2.1.2, 2.1.4, 2.4.3, 2.4.7, 2.4.11, 2.5.1, 2.5.2, 2.5.4, 2.5.7, 2.5.8, 3.2.1, 3.2.2).** The default root is a non-interactive `<div>` with no role, `tabIndex`, or handlers, so it is not focusable and takes no keyboard, pointer, or motion action. An author who makes it interactive owns these.
- **Timing and motion (2.2.1, 2.2.2, 2.3.1).** Sets no timer (`useLoaded` waits on load and error events), and renders nothing that moves, blinks, or flashes.
- **Page and site structure (2.4.1, 2.4.2, 2.4.5, 2.4.6, 3.1.1, 3.2.3, 3.2.4, 3.2.6).** Document title, page language, navigation, headings, and cross-page consistency are the author's concern in their site or app.
- **Input and errors (3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.7, 3.3.8).** The avatar collects, validates, and submits no input.

## Level AAA

- **1.4.6 Contrast (Enhanced), 7:1.** Default letter avatars already fail the AA 4.5:1 (white on `grey[400]`, about 1.9:1), so they fall well short of 7:1. `🚩`
- **1.4.9 Images of Text (No Exception).** Initials and the `alt[0]` fallback are live DOM text, so the component meets even the no-exception form by default; only an author-supplied bitmap of text would fail. `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.4.8 Visual Presentation, 1.3.6 Identify Purpose.** `🚩`

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.1.
- **Scope.** The Avatar component in isolation, rendered through its documented API. `AvatarGroup` is a separate component and is out of scope.
- **Automated.** axe-core via the Playwright regression harness (results in [`avatars.a11y.json`](../../../../docs/data/material/components/avatars/avatars.a11y.json)), a text-spacing clip test in the same harness, and unit tests in `Avatar.test.js`.
- **Assistive-technology review.** Spot checked but not audited. `🚩` criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
