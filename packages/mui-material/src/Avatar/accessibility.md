# Avatar accessibility conformance

Rated against WCAG 2.2 Level A and AA. See the [reports legend](../accessibility.md).

| Result                | Count |
| :-------------------- | :---- |
| ✅ Supports           | 9     |
| ⚠️ Partially Supports | 2     |
| ❌ Does Not Support   | 0     |
| ➖ Not Applicable     | 44    |

Of the 11 applicable ratings, 0 are confirmed by a test and 11 are `🚩 Unverified`.

## Known gaps

- ⚠️ **1.4.3 Contrast (Minimum).** Default letter and fallback avatars render white text on `grey[400]` (about 1.9:1), and the documented `deepOrange[500]` example is 3.16:1, both below 4.5:1; arbitrary `stringToColor` backgrounds are unguaranteed.
- ⚠️ **1.4.11 Non-text Contrast.** Meaningful icon-child avatars use the default white-on-`grey[400]` (1.9:1) or low-contrast author backgrounds (for example `green[500]` 2.78:1), below the 3:1 graphical-object minimum.

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

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- Favorable by design: letter and initials children and the `alt[0]` fallback (`Avatar.js:227`) are live, CSS-styled DOM text, not images of text, so they are user-customizable.
- A photographic avatar (`ImageAvatars`) is a picture containing significant non-text visual content, which is outside the definition of an image of text and therefore exempt.
- The only risk is an author deliberately passing a bitmap of text as the avatar image, which is an author content choice, not the component's behavior.

**Manual testing steps**

1. Open `LetterAvatars` and `FallbackAvatars` and inspect the DOM: confirm initials are text nodes (selectable, present in the accessibility tree), not an `<img>`.
2. Confirm the font scales with text settings rather than being a rasterized image.
3. Confirm `ImageAvatars` uses photographic content, not a rendered image of words.

**Pass:** avatar initials and fallback are real text; photographic avatars are pictures. The component generates no image of text.

### 🔁 Hybrid

#### 1.1.1 Non-text Content · A

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- The component provides the correct plumbing: an `src`/`srcSet` renders a native `<img>` that forwards the author's `alt` as its text alternative (`Avatar.js:208`; tested at `Avatar.test.js:65`), and the no-image states (the `Person` fallback and `SvgIcon` children) are `aria-hidden` so assistive tech correctly ignores them as decorative.
- The text alternative is author-supplied and optional: `alt` is a `string` with no default, so omitting it leaves the `<img>` with no `alt` (AT may read the filename), and `alt=""` correctly marks the image decorative. Meaningful equivalent text is the author's duty.
- An icon-only avatar (`IconAvatars`) or the `Person` fallback conveys nothing to AT by default; if the icon carries meaning the author must add an accessible name.

**Manual testing steps**

1. Render `ImageAvatars` (with `src` and `alt`) and inspect the DOM: confirm a native `<img>` with the author's `alt`.
2. Run a screen reader (VoiceOver with Safari, or NVDA with Chrome) over `ImageAvatars` and confirm the `alt` is announced.
3. Render the same avatar with `alt` omitted and confirm the `<img>` has no `alt` (filename risk).
4. Render `IconAvatars` and `FallbackAvatars` and confirm the `SvgIcon` and `Person` are `aria-hidden` and silent.
5. Render a decorative image avatar with `alt=""` and confirm AT ignores it.

**Pass:** every informative avatar exposes equivalent text (`img` `alt` or an author-provided label); decorative and no-image avatars are silent. The component passes the plumbing; an informative avatar with no `alt` is an author-side failure.

#### 1.3.1 Info and Relationships · A

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- The component carries no visual structure to encode: the root is a generic non-semantic `<div>` (`Avatar.js:25`) holding a single image, text node, or icon, so there are no relationships that must be made programmatically determinable.
- The one relationship present, image-to-name, is conveyed natively: the working-image path renders a real `<img>` whose `alt` is its accessible name (implicit `role="img"`), and decorative no-image states are `aria-hidden`, the correct programmatic mapping.
- If an author builds meaning by composing the avatar with surrounding content (for example, a name and avatar in a list item), conveying that structure is the author's responsibility.

**Manual testing steps**

1. Render `ImageAvatars` and inspect the accessibility tree (in Chrome DevTools: Elements panel, Accessibility tab): confirm the `img` exposes `role="img"` with the `alt` as its name.
2. Render `LetterAvatars` and `IconAvatars` and confirm the root div is generic (no spurious role) and decorative icons are `aria-hidden`.
3. Confirm no grouping, heading, or list semantics are implied by the avatar alone that would need programmatic encoding.

**Pass:** the image-to-name relationship is programmatically available via native `img` and `alt`; the styling div introduces no visual structure that lacks a programmatic counterpart.

#### 1.4.1 Use of Color · A

`🚩 Unverified` · `✅ Supports` · `◐ Shared`

- Color is decorative only: the default grey background and the hash-derived `stringToColor` background in `BackgroundLetterAvatars` are aesthetic, so the component never uses color alone to convey meaning.
- The avatar's information is carried by the image, initials, or icon, not by the background hue, so nothing is lost when color is removed.
- If an author repurposes the background to encode status or role (for example, green for online), they must add a non-color cue (text, icon, or shape) to satisfy this criterion.

**Manual testing steps**

1. Render `BackgroundLetterAvatars` and `LetterAvatars` and confirm the identifying content is the initials or icon, not the hue.
2. Simulate grayscale or color-blindness (in Chrome DevTools: Rendering tab, Emulate vision deficiencies) and confirm no information is lost when color is removed.
3. Confirm the component does not use color alone to distinguish any state.

**Pass:** no information conveyed by the avatar is lost in grayscale; any color-coded meaning an author adds is paired with a non-color cue.

#### 1.4.3 Contrast (Minimum) · AA

`🚩 Unverified` · `⚠️ Partially Supports` · `◐ Shared`

- Default letter avatars fail: `colorDefault` sets the text color to `background.default` (`#fff` in the light theme) on `backgroundColor` `grey[400]` `#bdbdbd` (`Avatar.js:68,78`), about 1.9:1. The children text is 20px at the inherited weight 400 (the component sets `fontSize: pxToRem(20)` but no `fontWeight`, `Avatar.js:47`), so it is not WCAG large text and the 4.5:1 threshold applies; at 1.9:1 it fails even the 3:1 large-text threshold. This affects `<Avatar>H</Avatar>`, the `alt[0]` fallback, and any default-palette letter avatar.
- Documented colored examples fail too: `LetterAvatars` renders white "N" on `deepOrange[500]` `#ff5722` = 3.16:1, below 4.5:1; only its white "OP" on `deepPurple[500]` (7.3:1) passes. `BackgroundLetterAvatars` compounds the risk: `bgcolor` is an arbitrary `stringToColor` hash with white text, so contrast is unguaranteed and often below 4.5:1; of its three documented names, "Tim Neutkens" (`#fd7e97`) renders at 2.44:1 (failing even the 3:1 floor) and "Jed Watson" (`#1f6cfa`) reaches only 4.58:1.
- A working photographic `<img>` is exempt (it is a picture, not text), and the dark-theme default (`grey[600]` `#757575` on `#121212`, about 4.1:1) is also below 4.5:1. Icon glyphs are non-text and are handled under 1.4.11, not here. Authors must override `bgcolor`/`color` to reach 4.5:1 for letter avatars; the forced-colors border (`Avatar.js:69-72`) addresses shape visibility, not this text-contrast failure.

**Manual testing steps**

1. Render the default grey `LetterAvatars` (`<Avatar>H</Avatar>`) and measure foreground against background with a contrast tool (the color picker in browser DevTools shows a ratio): expect about 1.9:1.
2. Confirm the children font is 20px at weight 400 (not large text), so 4.5:1 applies.
3. Render `LetterAvatars` ("N" on `deepOrange[500]`) and `BackgroundLetterAvatars` across several names and measure each background against the white text.
4. Render `ImageAvatars` and confirm a working image is exempt (no text on background).
5. Repeat in the dark theme (`grey[600]` on `#121212`).

**Pass:** all letter, initial, and fallback text meets 4.5:1 (or 3:1 if the author makes it large text). The default grey letter avatar, the `deepOrange[500]` example, and arbitrary `stringToColor` backgrounds do not meet this without author color overrides.

#### 1.4.11 Non-text Contrast · AA

`🚩 Unverified` · `⚠️ Partially Supports` · `◐ Shared`

- Meaningful icon-child avatars fall short: when an icon is the avatar's sole, unlabeled content (`IconAvatars`), it is a graphical object required to understand the content, so it needs 3:1. The component's `colorDefault` renders the glyph white on `grey[400]` `#bdbdbd` (1.9:1), and author backgrounds vary, for example `green[500]` `#4caf50` = 2.78:1 (fails) while `pink[500]` `#e91e63` = 4.35:1 (passes). So the default and low-contrast author backgrounds are below 3:1.
- Exempt parts: the colored circle or square is a decorative graphical object (aesthetic, not required to understand content), and the `Person` fallback is a decorative placeholder, so neither is bound by the 3:1 requirement. The default avatar is also non-interactive (a plain `<div>`, no role or state), so the user-interface-component part of this criterion does not apply.
- Under `@media (forced-colors: active)` the component adds a `1px solid ButtonBorder` (`Avatar.js:69-72`) so the shape stays visible in Windows High Contrast. A meaningful icon avatar needs both a ≥3:1 foreground/background here and an accessible name under 1.1.1 (icon children default to `aria-hidden`); this criterion is rated Partial rather than Supports because the 1.9:1 shortfall comes from the component's own `colorDefault`, whereas the missing name is purely author content (so 1.1.1 stays Supports with an author caveat).

**Manual testing steps**

1. Render `IconAvatars` (Folder on default grey, Pageview on `pink[500]`, Assignment on `green[500]`) and measure each icon's foreground against its background: expect the default and `green[500]` below 3:1.
2. Render `VariantAvatars` (circular, rounded, square) and confirm the colored shape itself is decorative, not an information-bearing graphic.
3. Enable Windows High Contrast / forced-colors and confirm the `1px` `ButtonBorder` keeps the avatar boundary visible.

**Pass:** any icon that conveys meaning meets 3:1 against its background; the decorative container shape and `Person` placeholder are exempt, and the boundary stays visible in forced-colors mode.

#### 1.4.12 Text Spacing · AA

`🚩 Unverified` · `✅ Supports` · `● Component`

- The component sets `lineHeight: 1` and a fixed 40px square with `overflow: hidden` (`Avatar.js:48,44-45,50`). Applying the four text-spacing overrides to the documented content (1 to 2 character initials and the `alt[0]` fallback) causes no loss: line-height 1.5 yields a 30px line box inside the 40px square, word-spacing is inert on initials with no spaces, and letter-spacing 0.12em keeps "OP" well under the 40px inner width.
- Per F104, the failure requires content to actually be clipped or lost, not merely a fixed-size container. The paragraph-spacing metric is moot (no paragraphs), and single-character and image avatars are unaffected. Stuffing long strings into the fixed box is an author content choice (and already overflows at default spacing), not a text-spacing-resilience defect.

**Manual testing steps**

1. Render `LetterAvatars` ("OP") and `FallbackAvatars`.
2. Apply the WCAG text-spacing values. The quickest way is to run this in the DevTools console: `document.head.insertAdjacentHTML('beforeend','<style>*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}</style>')`.
3. Confirm the 1 to 2 character initials stay fully visible inside the 40px circle.
4. Repeat with `SizeAvatars` to gauge sensitivity at other fixed sizes.

**Pass:** documented initials and fallback text stay fully visible after applying the four overrides. Long author-supplied strings that already overflow at default spacing are out of scope.

### ⚙️ Automated

Avatar is not yet enrolled in the axe-core harness (there is no `avatars.a11y.json`), so the criteria below are deterministically testable but currently assessed from source, hence `🚩`. See the Button report's [`buttons.a11y.json`](../../../../docs/data/material/components/buttons/buttons.a11y.json) for the harness pattern this component should adopt.

#### 1.4.4 Resize Text · AA

`🚩 Unverified` · `✅ Supports` · `● Component`

- The container is a fixed 40px square (`Avatar.js:44-45`) with text in rem (`pxToRem(20)`, `Avatar.js:47`) and `overflow: hidden` (`Avatar.js:50`). Under full-page browser zoom, the default scaling mechanism, the box and the text scale together, so initials stay fully visible. WCAG is satisfied if at least one user-agent scaling mechanism reaches 200% without loss of content, and page zoom does.
- Text-only resize can clip 2+ character initials inside the px box, but the Understanding doc's "at least one mechanism" rule is satisfied by page zoom, and F69 is not met when content passes via a sufficient technique. So a component that passes under page zoom does not fail this criterion; the residual text-only-resize clip is an author content choice, not a component defect.

**Manual testing steps**

1. Open `LetterAvatars` and `FallbackAvatars`.
2. Set browser zoom to 200% (<kbd>Ctrl</kbd> or <kbd>Cmd</kbd> and <kbd>+</kbd>) and confirm the box and initials scale together with nothing clipped.
3. Optional: compare against text-only resize (Firefox "Zoom Text Only") to see the px box not scaling; long initials there are an author concern.

**Pass:** initials and fallback text stay fully visible at 200% page zoom. The container scales with the page, so the default avatar degrades gracefully.

#### 1.4.10 Reflow · AA

`🚩 Unverified` · `✅ Supports` · `● Component`

- The avatar is a fixed 40px box (`Avatar.js:44-45`) that establishes no horizontal layout of its own, so at a 320 CSS pixel width (or 400% zoom) it cannot force two-dimensional scrolling; it simply scales and wraps with its container.
- Real reflow failures come from the surrounding layout (for example a wide row of avatars or an `AvatarGroup`), not from a single avatar.

**Manual testing steps**

1. Open the Avatar demos and set the window, or the DevTools device toolbar, to 320 CSS pixels wide.
2. Confirm there is no horizontal scrolling and every avatar stays visible.

**Pass:** content reflows with no two-dimensional scrolling. A single 40px avatar never triggers it.

## Not applicable

- **Time-based media (1.2.1 to 1.2.5).** No audio or video; the component renders only a static image, text, or an icon.
- **Audio Control (1.4.2).** Emits no audio.
- **Orientation (1.3.4).** Sets no orientation lock; the fixed 40px box renders the same in portrait or landscape.
- **Identify Input Purpose (1.3.5).** Collects no user information; it has no form field with an `autocomplete` purpose.
- **Content on Hover or Focus (1.4.13).** Shows no tooltip or popover; the default root is a non-focusable `<div>`. A `Tooltip` wrapper would own this.
- **Keyboard, pointer, and focus (2.1.1, 2.1.2, 2.1.4, 2.4.3, 2.4.7, 2.4.11, 2.5.1, 2.5.2, 2.5.4, 2.5.7, 2.5.8, 3.2.1, 3.2.2).** The default root is a non-interactive `<div>` (`component="div"`) with no role, `tabIndex`, or handlers, and its `img`/text/SVG content is not focusable. It exposes no functionality, is not in the tab order, accepts no pointer or motion action, and is not a pointer target (the 40px box would exceed the 24px minimum anyway). Making the avatar interactive via the `component` prop or a wrapper (for example, `UploadAvatars` wrapping it in `ButtonBase`) shifts these duties to the author.
- **Link Purpose (In Context) (2.4.4).** Renders no anchor or `role="link"` by default; an author who sets `component="a"` owns the link's purpose.
- **Label in Name (2.5.3).** Not a labeled control: the initials and `alt[0]` glyph are decorative content, and the `img`'s `alt` is an accessible name (1.1.1 territory), not a visible label on a control.
- **Timing Adjustable (2.2.1).** Sets no time limit; `useLoaded` listens for image load and error events with no timer.
- **Pause, Stop, Hide (2.2.2).** Renders no moving, blinking, or auto-updating content (no ripple or animation).
- **Three Flashes or Below Threshold (2.3.1).** Nothing flashes.
- **Page and site structure (2.4.1, 2.4.2, 2.4.5, 3.1.1, 3.2.3, 3.2.4, 3.2.6).** Bypass Blocks, Page Titled, Multiple Ways, Language of Page, Consistent Navigation, Consistent Identification, and Consistent Help are page or cross-page concerns. A single non-navigational display component owns no document title, page language, navigation mechanism, or cross-page identity; keeping reused avatars' labels consistent across pages is an author decision.
- **Headings and Labels (2.4.6).** Renders no headings and no form-control labels; the criterion only applies when headings or labels are present.
- **Language of Parts (3.1.2).** Emits no built-in human-language text; initials, `alt`, and icon children are author content, and personal names and initials are an explicit exception.
- **Input and errors (3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.7, 3.3.8).** Error Identification, Labels or Instructions, Error Suggestion, Error Prevention, Redundant Entry, and Accessible Authentication apply to data entry and form processes. The avatar collects, validates, and submits no input; the internal image-load error only swaps to a fallback glyph and is not a user input error.
- **Name, Role, Value (4.1.2).** Applies to user interface components, defined as content perceived as a single control for a distinct function. The default Avatar is a non-interactive `div`/`img` with no control role, state, or value to expose; the working `<img>` exposes `role="img"` with `alt` as its name natively, which is covered under 1.1.1. An author who makes the avatar interactive (`component`, or a `ButtonBase`/anchor wrapper) owns 4.1.2 for that control.
- **Status Messages (4.1.3).** Emits no `role="status"`, `role="alert"`, or `aria-live` region; its only runtime change is a silent image-to-fallback content swap, which is not a status message. A status pattern an author wraps around it (for example, an upload result) owns the live region.

## Level AAA

The following SC are applicable but out of scope:

- **1.4.6 Contrast (Enhanced), 7:1.** Default letter avatars already fail the AA 4.5:1 (white on `grey[400]`, about 1.9:1), so they fall well short of 7:1. `🚩`
- **1.4.9 Images of Text (No Exception).** Initials and the `alt[0]` fallback are live DOM text, so the component meets even the no-exception form by default; only an author-supplied bitmap of text would fail. `🚩`
- Also touched, in the same shape as their A and AA siblings: **1.4.8 Visual Presentation, 1.3.6 Identify Purpose.** `🚩`

## Scope and test environment

- **Standard.** WCAG 2.2, Level A and AA.
- **Component version.** `@mui/material` 9.1.1.
- **Scope.** The Avatar component in isolation, rendered through its documented API. `AvatarGroup` is a separate component and is out of scope.
- **Automated.** Avatar is not yet enrolled in the axe-core harness (there is no `avatars.a11y.json`), so automated coverage is feasible but not yet written; the only existing tests are unit tests in `Avatar.test.js` (for example, `alt` forwarding at `Avatar.test.js:65`). The Button report's [`buttons.a11y.json`](../../../../docs/data/material/components/buttons/buttons.a11y.json) shows the harness pattern to adopt.
- **Assistive-technology review.** Not yet performed. `🚩` criteria are assessed from source pending a review with NVDA, JAWS, and VoiceOver.
