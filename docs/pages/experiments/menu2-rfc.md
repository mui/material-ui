---
title: 'RFC draft: Menu successor with submenu support'
description: A proposal for a Base UI-backed Menu successor, with submenu support and Material UI customization.
---

# RFC draft: Menu successor with submenu support

<p class="description">This is a draft for maintainer review, not an approved release plan. Please add review comments on this file.</p>

Suggested issue title: `[RFC] Menu: Base UI-based successor with submenu support`

The sections match `.github/ISSUE_TEMPLATE/3.rfc.yml`. Companion experiments: [playground](/experiments/menu2-playground/), [recipes](/experiments/menu2-recipes/).

## What's the problem?

Material UI's `Menu` does not support submenus. [#11723](https://github.com/mui/material-ui/issues/11723) tracks the request since 2018. The v0.x component had nested menus, but the v1 rewrite removed them.

The [Menubar docs](https://mui.com/material-ui/react-menubar/) show how to compose Base UI submenus. Users have asked for a packaged component instead ([#48336](https://github.com/mui/material-ui/issues/48336)). Copied examples and community packages do not provide a submenu API that Material UI maintains and tests.

We propose a Base UI-backed successor with Material visuals and full theme support. The current `Menu` stays stable. This integration also tests rules for future Material UI components built on Base UI; it does not commit every component to the same API shape.

## What are the requirements?

1. **Correct behavior at any nesting depth:** trigger semantics, RTL-aware arrow keys, Escape that closes one level, focus return to the parent item, and typeahead at each level.
2. **Pointer support:** hover-open delays and safe diagonal travel from a trigger to its submenu.
3. **Positioning:** flip at boundaries, track the anchor, and limit the popup to the available space.
4. **Material presentation and customization:** shared styles, `sx`, utility classes, slots, and theme `defaultProps`/`styleOverrides`/`variants`. Caller-rendered parts also support `component`.
5. **Low cost for existing users:** preserve the classic API and behavior, and keep Base UI out of bundles that do not use the successor. Measure the shared-style and barrel costs separately.
6. **Familiar API where possible:** document changed behavior and features with no direct replacement.
7. **Related menu features:** checkbox and radio items, labeled groups, and hover-open. A dedicated context menu follows separately.
8. **Maintained behavior:** reuse Base UI's focus, dismissal, and positioning logic.
9. **Normal Material UI integration:** standard imports, tooling, theming, and tests. Users must not need a separate Base UI installation.

## What are our options?

### Option A: Add submenus to the existing Menu

Earlier attempts show the integration risks:

| Attempt                                                 | Approach                       | Main concern                                                           |
| :------------------------------------------------------ | :----------------------------- | :--------------------------------------------------------------------- |
| [#14700](https://github.com/mui/material-ui/pull/14700) | Nested Menu components         | Required changes to the menu implementation and API.                   |
| [#20591](https://github.com/mui/material-ui/pull/20591) | A `subMenu` prop on `MenuItem` | Bundle cost, hover intent, positioning, and regression risk.           |
| [#37570](https://github.com/mui/material-ui/pull/37570) | A docs demo                    | Accessibility review found problems with Escape and submenu semantics. |

The current stack is `Menu → Popover → Modal`. Nested instances have separate backdrops and focus traps. `ModalManager` hides content outside the top modal, including the parent menu. `MenuList` has no shared submenu navigation state, and `Popover` does not flip to the other side of an anchor.

Supporting submenus would require changes across that stack or a separate behavior path within the existing API. Base UI already supplies the coordinated menu tree. We reject this option because it adds risk to existing consumers and duplicates that work.

### Option B: Leave it as copy-paste docs code

Useful as an example, but not the end state. Users still own the integration, updates, tests, and theme contract.

### Option C: Wait for the next major

This delays the feature and API feedback. An unstable successor lets us test the proposal without replacing the current `Menu`.

### Option D: A successor built on Base UI, shipped as public unstable (proposed)

[Base UI Menu](https://base-ui.com/react/components/menu) supplies submenu navigation, hover intent, focus return, typeahead, and collision handling. Material UI supplies presentation, customization, and the public API.

This reduces new behavior code, but does not remove integration work. We must test the composed result and document the differences below.

## Proposed solution

Build on the [proof of concept](https://github.com/mui/material-ui/pull/48663) and [companion experiment](https://github.com/mui/material-ui/pull/48823). Keep the popup wiring internal and expose `Menu2SubmenuTrigger` as a separate component.

### Positioning (decided)

Ship under `Unstable_` while the API settles, with one component per subpath:

```jsx
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
```

The classic `Menu` keeps its API. The experiment extracts shared styles into `Menu/menuStyles.js` and `MenuItem/menuItemStyles.js`. It also adds a `defaultMuiPrevented` check to `useButtonBase`, so Base UI can own Enter and Space activation without ButtonBase activating the item again.

### Rules for Base UI-backed components (Menu is the first)

- **Customization:** use Material UI `slots`/`slotProps`. Base UI's `render` is an internal composition mechanism, not the public customization API.
- **Slot handling:** reuse `useSlotProps`, `appendOwnerState`, `resolveComponentProps`, and Material UI's `mergeSlotProps`. Use Base UI's `mergeProps` for behavioral props and compose refs. Keep adapters local until another integration needs them. These adapters filter Material props from host elements, combine state-based classes, infer native buttons, and prevent duplicate keyboard activation.
- **Style reuse:** share styled elements where practical; otherwise share style functions. Audit each consumer. Viewport-relative heights and item-adjacent divider rules do not transfer unchanged to Base UI's popup tree. New parts own their spacing; use `Menu2Separator` between items.
- **Presentation:** retain `dense`, `disableGutters`, `divider`, and visual `selected`. Base UI owns behavior; Material UI owns styles.
- **Dependency:** make `@base-ui/react` a direct dependency of `@mui/material`. Review version updates rather than auto-merge them. Test the upstream states used by the integration, including checked indicators, starting and ending transitions, and resolved placement.
- **Theme state:** keep `Mui-*` classes and `ownerState` as the Material customization contract. Item slots receive live highlighted, disabled, and, where applicable, checked or open state. Collapsed popup slot callbacks receive resolved public props, not live uncontrolled open state. Internal animation and placement styles can use Base UI attributes.
- **API boundary:** explicitly pick the forwarded root, trigger, and positioner props. New upstream props require API and routing review. This is not complete type isolation: changes to an exposed upstream type still reach Material UI. Preserve Base UI's cancelable `onOpenChange(open, eventDetails)`; checkbox items and radio groups use `onChange(event, value, eventDetails)`.
- **Tooling and tests:** use normal theme registration, API generation, and `describeConformance`. Test behavior differences and the integration boundary as well as the individual parts. All 13 public components have conformance suites. The collapsed containers use their portal wrappers as the root; interaction tests query the menu surface.

### API shape: collapsed popup, explicit submenu trigger

`Menu2` and `Menu2Submenu` combine Portal, Positioner, Popup, Paper, and List. Items, links, checkbox and radio parts, groups, labels, separators, and the submenu trigger remain separate.

```jsx
<Menu2 trigger={<Button>Options</Button>} elevation={4}>
  <Menu2Item onClick={handleCut}>Cut</Menu2Item>
  <Menu2Submenu trigger={<Menu2SubmenuTrigger>Share</Menu2SubmenuTrigger>}>
    <Menu2Item>Email</Menu2Item>
    <Menu2Item>Copy link</Menu2Item>
  </Menu2Submenu>
</Menu2>
```

The two `trigger` props have different contracts:

- `Menu2` merges trigger behavior into the supplied element. A wrapper must forward props and its ref. Put `openOnHover`, `delay`, and `closeDelay` on `Menu2`. Its `slotProps.trigger` accepts only `nativeButton`, `className`, and `ref`.
- `Menu2Submenu` renders an explicit `Menu2SubmenuTrigger` as supplied, optionally inside a `Tooltip`. Put `disabled`, `label`, and hover props on that trigger. There is no submenu trigger slot.
- Items and submenu triggers infer `nativeButton` from their root slot and `component`. The root menu cannot infer it from an arbitrary supplied element; use `slotProps.trigger.nativeButton` when needed.

The explicit submenu trigger avoids registering one DOM node as both an item and a submenu trigger. It costs one public component and theme key, but gives the trigger one behavioral owner. An alternative would make a generic item switch its behavior according to context; this proposal keeps that distinction explicit.

For the classic controlled pattern, omit `trigger` and use `open` and `anchor`. The caller then owns the external button's ARIA attributes and the menu's accessible label. Set an explicit `finalFocus` target when the opening context must receive focus on close. See the [controlled-anchor example](/experiments/menu2-playground/#controlled-anchor).

#### Customization targets

The root theme key is `MuiMenu2`; the submenu uses `MuiMenu2Submenu`. Popup components stay internal, but their class hooks are exported.

| Target                        | Top-level props                                    | Slot         |
| :---------------------------- | :------------------------------------------------- | :----------- |
| Portal wrapper                | `ref`, `className`, `style`, `sx`, HTML attributes | `root`       |
| Positioned element            | Positioning props; carries `theme.zIndex.modal`    | `positioner` |
| Paper surface (`role="menu"`) | `elevation`, event handlers                        | `paper`      |
| Presentational list           | None                                               | `list`       |
| Animation                     | `transitionDuration`                               | `transition` |
| Optional root-menu backdrop   | None                                               | `backdrop`   |

Use `slotProps.paper` for menu `aria-*` attributes and the surface ref. Each slot's ref targets its own element. A `styled(Menu2)` class attaches to the wrapper. Root slot `sx` takes precedence over top-level `sx` for conflicting properties.

Event handlers target the popup because Base UI renders the portal wrapper and its content as React siblings. Handlers attached only to the wrapper do not receive the popup's React events. Replacing a slot changes its rendered element, not the underlying Base UI provider.

#### Benchmark results

`Menu2Benchmark.test.tsx` compares the classic Menu and successor in a browser. These results describe the tested desktop configuration, not every device or assistive technology.

| Dimension              | Classic `Menu`                      | Successor                                    |
| :--------------------- | :---------------------------------- | :------------------------------------------- |
| Open from trigger      | Caller connects the button          | Supplied trigger supports click and keyboard |
| Initial keyboard focus | Depends on caller's open handling   | First item for the tested open action        |
| Initial pointer focus  | Selected item, or first item        | Popup; no highlighted item                   |
| Disabled items         | Skipped by keyboard navigation      | Focusable, but not activatable               |
| Escape                 | Closes and restores trigger focus   | Same at the root; submenus close one level   |
| Tab                    | Closes and returns focus to trigger | Closes and moves focus to the next element   |
| Body scrolling         | Locked                              | Locked                                       |
| Material backdrop      | Rendered                            | Opt-in                                       |
| Sibling `aria-hidden`  | Applied                             | Not applied                                  |
| Default placement      | Below trigger, aligned to start     | Same                                         |

Keep these differences and document them:

- **Initial focus:** keep Base UI's pointer-open behavior. No item is ready for accidental Enter activation. This differs from the [APG menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/), which places focus on an item when a menu opens. Menu has no public `initialFocus` prop, so matching the classic behavior would require a local focus override.
- **Disabled items and Tab:** focusable disabled items and Tab leaving the menu follow the APG pattern.
- **Page treatment:** Base UI owns outside interaction and does not use Material's modal stack. The absence of sibling `aria-hidden` is a DOM observation, not a complete screen-reader accessibility test.
- **Modality:** `modal` defaults to `true`. Base UI menus opened by hover are non-modal. On touch devices, outside taps are blocked, but page scrolling can remain available unless the popup spans nearly the full viewport width. Do not generalize the desktop scroll-lock result to those cases.

`variant="selectedMenu"` has no direct replacement. It makes the selected item the initial focus target in the classic Menu. A checked radio item records a value, but does not control initial focus in Menu2. The benchmark verifies that distinction. See the [upstream discussion of initial focus](https://github.com/mui/base-ui/issues/2143).

Other behavior and caveats:

- **Hover:** submenus open on hover by default, with a 100 ms delay and safe pointer travel. These defaults are configurable.
- **Placement:** a submenu overlaps its parent by 4 px and starts 8 px above the trigger to account for list padding. Collisions can change the resolved placement.
- **Escape:** closes the innermost submenu and returns focus to its trigger. Set `closeParentOnEsc` on the submenu to request closure of the parent menus too.
- **Open tint:** an open submenu trigger uses `action.hover`, blended with selected styling when needed. A separate `closing` state keeps the tint through exit without extending logical `open`.
- **Focus outline after keyboard navigation:** with `theme.focusVisible`, the outline can follow the pointer after keyboard navigation. Base UI moves focus on hover, and the browser can preserve `:focus-visible`. We confirmed this in Chromium with real input. The classic Menu keeps focus and its outline on the keyboard-selected item. Accept this difference; no local focus override is planned.
- **Focus guards:** Base UI inserts guards near an open submenu trigger. Adjacency and child-position selectors can therefore match different elements. New parts own their spacing; a plain `Divider` still uses the classic adjacency rules. An upstream discussion of guard placement remains separate work.
- **Height:** the popup uses the smaller of the viewport limit and Base UI's available height, with internal scrolling.

### Compatibility

Keep item presentation props, `keepMounted`, `container`, and Material's customization mechanisms. Theme keys change to `MuiMenu2*`; classic `MuiMenu` and `MuiMenuItem` overrides do not reach the successor.

Migration also changes open/close callbacks, positioning, initial focus, and transition completion. There is no direct equivalent for selected-item initial focus, independent scroll-lock control, or disabling the portal. The [prop map](#appendix-full-prop-mapping) records these limits. This is not a drop-in replacement.

### New capabilities

Submenus, checkbox and radio items with indicators, labeled groups, a supplied trigger with ARIA wiring, per-item typeahead labels, hover-open delays, cancelable open changes with reasons, and a shared item-description hook.

### Where the experiment stands

The experiment implements the API above, shared styles, theme registration, RTL integration, live item state, ref composition, Grow transitions, and preview cards. Tests cover conformance and the main interaction paths, including controlled state, canceled changes, nested Escape, and menus without a trigger.

The playground compares classic Menu and Menu2, focus indicators, transition choices, and reduced motion. These experiments do not replace public component demos or API docs. The API generator still skips the `Unstable_Menu2` modules until docs registration is complete.

Remaining release work is listed once in the rollout plan.

### Decisions

These choices are proposed for maintainer review.

| Topic              | Decision and limit                                                                                                                                                                                 |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Animation          | Grow by default. Base UI owns mounting and completion. Compatible transition components or CSS remain options. See the transition contract below.                                                  |
| Ripple             | Keep ButtonBase as the item root, not a nested interactive child. Forward `disableRipple` only when supplied so theme defaults apply. Base UI owns Enter and Space activation.                     |
| Elevation          | Keep the top-level prop, default 8, with a Paper slot override.                                                                                                                                    |
| Backdrop           | Opt-in through the root menu's backdrop slot or slot props. The default styled backdrop is transparent and click-through; Base UI handles outside dismissal. Submenus expose no backdrop slot.     |
| Imperative actions | Keep Base UI's `actionsRef`, which exposes `close()` and `unmount()`. There is no `action.updatePosition()` equivalent.                                                                            |
| Theme and refs     | Use the customization targets above. Caller-rendered parts use `OverridableComponent`; their refs and HTML props follow `component`. Collapsed roots use `HTMLDivElement` refs.                    |
| Preview cards      | Release `useMenu2ItemPopover` for non-interactive descriptions. Use Popper, not a modal Popover. See the contract below.                                                                           |
| Context menu       | A separate component later. Virtual anchors support right-click placement today, but callers own labeling and focus return. A Base UI ContextMenu integration would also provide touch long-press. |
| Behavior defaults  | Keep Base UI behavior unless an integration requirement needs a change. Material presentation adds start alignment, submenu offsets, Grow, and an opt-in backdrop.                                 |
| Open tint on close | Read the popup's public ending state. Clear the trigger's closing state when exit ends or the popup unmounts; do not add a timer or wait for focus return.                                         |
| Forced colors      | `enhanceHighContrast` styles the item parts and indicators. Disabled cues take precedence over highlight styling.                                                                                  |

#### Item preview card contract

`useMenu2ItemPopover` shares one description card between items. It supplies the anchor, active value, handlers, and `aria-describedby`.

- Pass a unique value to `getItemProps(value, handlers)`. Caller handlers run first. The hook clears ownership when the active item leaves the DOM.
- Spread `popover.props` onto a `Popper` and render the surface, such as Paper, yourself. A modal `Popover` can hide the menu from assistive technology.
- Preserve `popover.props.keepMounted` and render the active content even while `popover.open` is false. The hidden card must supply the accessible description before its visual appearance.
- Connect `close()` to menu closure. The card has inline `pointer-events: none`. Interactive cards need a separate interaction and accessibility design; `interactive: true` is not a supported option.

The visual card waits for the menu's starting state and ancestor animations that can move its anchor. It checks once per frame, ignores color and opacity-only transitions, and stops waiting after 500 ms. It also excludes paused or non-terminating animations. Thus a long custom animation can still move the anchor after the card appears.

The hook does not assume fixed Grow timing. `onOpenChangeComplete` would wait for all popup animations, including fades that do not affect placement. The hook avoids undocumented Base UI internals.

### Resolved review questions

Keep the numbering for existing review references. "Resolved" means chosen in this proposal, not release-complete.

1. ✅ **Context menu:** a separate component. Virtual-anchor recipes remain available.

2. ✅ **Accessibility ownership:** Base UI supplies semantics and interaction; Material UI remains responsible for the composed result, styles, and public customization.

   The default light-theme focus tint has approximately 1.3:1 contrast against white. Sharing it with the classic item does not resolve the [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) gap. A library-wide state-style review remains separate work. Under `theme.focusVisible`, the item uses the classic inset ring instead of the focus tint; the inset avoids clipping in a scrolling popup. Shared styles do not imply identical keyboard-to-pointer behavior; see the caveat above.

   Interaction tests and conformance are not a screen-reader audit. The generic axe loop checks enrolled fixtures without opening menus for them; Menu2 has no dedicated open-menu axe coverage. Validate the open, nested, and closing states before release.

3. ✅ **Other defaults:** retain Base UI behavior with the documented Material presentation choices.

4. ✅ **SSR, client directive, and refs:** public modules have `'use client'`. The trigger can render on the server, but the portal popup is client-rendered, including with `defaultOpen` or `keepMounted`. Caller-rendered parts have polymorphic refs; collapsed roots use the portal wrapper.

5. ✅ **Base UI API exposure:** explicitly pick supported root and positioning props. Detached triggers (`handle`, `triggerId`, `defaultTriggerId`, and `Menu.createHandle`) and horizontal `orientation` are outside this API. Upstream changes to exposed types still require review.

6. ✅ **Open parent tint:** use `action.hover` through logical open and visual exit. Keep `Mui-open` separate from `MuiMenu2SubmenuTrigger-closing`. A new open-state color token would be a separate design choice.

7. ✅ **Explicit submenu trigger:** keep one behavioral owner per trigger and the popup wiring internal. The root decorates a supplied button; the submenu renders an explicit part. Accept this asymmetry. A Material Menubar remains separate work.

### Rollout plan

1. **Review the proposal:** the benchmark and API experiment are ready for maintainer feedback.
2. **Prepare an unstable release:** target a v9 minor release after review.
   - Require a Base UI release with the merged [menu tree fix](https://github.com/mui/base-ui/pull/5645), then remove the local pnpm patch and keep its regression tests. The current patch fixes submenu closure in menus without a trigger, but it does not reach applications that install `@mui/material`.
   - Register public demos, remove the Menu2 API-generator skip, then generate and review PropTypes and API docs. Public demos are separate work.
   - Add migration guidance for imports, theme keys, trigger contracts, customization targets, and behavior differences.
   - Validate accessibility in open and nested menus. Record known inherited gaps rather than treating shared styles as proof of compliance.
   - Refresh bundle measurements and run release checks, including browser and visual regressions. Historical results do not validate the release revision.
3. **Stabilize after feedback:** remove `Unstable_` when the API settles. Replacing the classic `Menu` requires a separate migration and release decision.

### Appendix: full prop mapping

<details>
<summary>1. Open and close</summary>

| Classic Menu             | New equivalent                     | Notes                                                                                          |
| :----------------------- | :--------------------------------- | :--------------------------------------------------------------------------------------------- |
| Required `open`          | `open` or `defaultOpen`            | Controlled and uncontrolled modes.                                                             |
| `onClose(event, reason)` | `onOpenChange(open, eventDetails)` | Reports both opening and closing. Details include the event, reason, and cancellation methods. |
| No direct equivalent     | `onOpenChangeComplete(open)`       | Reports completion after popup animations. Not an enter-start callback.                        |

</details>

<details>
<summary>2. Positioning</summary>

| Classic Menu / Popover                                | New equivalent                                                        | Notes                                                                                                       |
| :---------------------------------------------------- | :-------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `anchorEl`                                            | `anchor`                                                              | Also accepts refs and virtual elements. Defaults to the supplied trigger.                                   |
| `anchorOrigin` + `transformOrigin`                    | `side`, `align`, `sideOffset`, `alignOffset`                          | Placement model changes; animation origin follows resolved placement.                                       |
| `anchorReference="anchorPosition"` + `anchorPosition` | Virtual `anchor`                                                      | Caller supplies its rectangle.                                                                              |
| `marginThreshold` (16)                                | `collisionPadding` (5)                                                | Different defaults and collision model.                                                                     |
| `anchorReference="none"`                              | No direct equivalent                                                  | Omitting `anchor` uses the trigger; it does not disable positioning.                                        |
| `action.updatePosition()`                             | Automatic tracking                                                    | `disableAnchorTracking` stops anchor tracking; it is not an imperative update method.                       |
| No direct equivalent                                  | `collisionBoundary`, `sticky`, `collisionAvoidance`, `positionMethod` | Additional positioning controls. `arrowPadding` is exposed but has no visible effect without an arrow part. |

</details>

<details>
<summary>3. Focus and modality</summary>

| Classic Menu                              | New equivalent                                    | Notes                                                                                                        |
| :---------------------------------------- | :------------------------------------------------ | :----------------------------------------------------------------------------------------------------------- |
| `autoFocus`, `disableAutoFocusItem`       | Base UI initial focus                             | No direct override. Keyboard and pointer open differ.                                                        |
| `variant="selectedMenu"`                  | No direct equivalent                              | Checkbox and radio items express checked state, not initial focus.                                           |
| `disableAutoFocus`, `disableEnforceFocus` | No direct equivalent                              | `modal` controls outside interaction, not each classic focus option independently.                           |
| `disableRestoreFocus`                     | `finalFocus={false}`                              | A ref or function can instead set the return target.                                                         |
| `disableEscapeKeyDown`                    | Cancel an `onOpenChange` with reason `escape-key` | Only if the application requires it; this changes normal menu dismissal.                                     |
| `disableScrollLock`                       | No independent equivalent                         | `modal={false}` also permits outside interaction. Touch and hover behavior differ; see the benchmark caveat. |
| `hideBackdrop`                            | Opt-in backdrop                                   | There is no Material backdrop unless requested.                                                              |
| `disablePortal`                           | No equivalent                                     | The popup always uses a portal.                                                                              |
| `keepMounted`, `container`                | Same props                                        | Client-side portal controls; they do not render the popup on the server.                                     |

</details>

<details>
<summary>4. Transitions</summary>

| Classic Menu                               | New equivalent                                                            |
| :----------------------------------------- | :------------------------------------------------------------------------ |
| `TransitionComponent` / `slots.transition` | `slots.transition`, default Grow; `null` for CSS-only animation           |
| `transitionDuration`                       | Same prop: `'auto'`, milliseconds, or separate enter and exit durations   |
| `onTransitionEnter`                        | Transition slot start callbacks, where applicable                         |
| `onTransitionExited`                       | `onOpenChangeComplete(false)` for popup close completion                  |
| `closeAfterTransition`                     | Base UI controls unmounting after popup animations; no equivalent boolean |

Grow animates the popup itself with height-dependent timing. The adapter waits for Base UI's starting state to finish and keeps the opening surface focusable. Current Grow uses Material UI's internal Transition, not react-transition-group. Base UI observes browser animations and owns unmounting and `onOpenChangeComplete`.

A custom transition must forward its child's props and ref, animate that same popup element, and add no DOM wrapper. It must start in time for Base UI to detect the browser animation. Compatibility is tested for Grow, Fade, and Zoom; an arbitrary transition needs validation.

Use `onOpenChangeComplete`, not `slotProps.transition.onEntered` or `onExited`: Base UI can unmount the transition before its completion timer fires. The adapter owns `in`, `appear`, `mountOnEnter`, and `unmountOnExit`. Start callbacks and easing remain available. A slot's `timeout` overrides `transitionDuration`; automatic duration is only passed to a transition that declares support.

`keepMounted` retains a closed popup; it does not replace transition completion. Material transitions follow `theme.motion.reducedMotion`. CSS animations must apply a reduced-motion policy separately.

For CSS-only animation:

```tsx
<Menu2
  slots={{ transition: null }}
  slotProps={{
    paper: {
      sx: {
        transition: 'opacity 250ms',
        '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      },
    },
  }}
  trigger={<Button>Options</Button>}
>
  <Menu2Item>Profile</Menu2Item>
</Menu2>
```

This example follows the system preference. The playground also shows the theme policy, including `always` and `never`. `transitionDuration` has no effect when `slots.transition` is `null`.

</details>

<details>
<summary>5. Styling and slots</summary>

| Classic Menu                                            | New equivalent                                     | Notes                                        |
| :------------------------------------------------------ | :------------------------------------------------- | :------------------------------------------- |
| `root`, `paper`, `list`, `transition`, `backdrop` slots | Same names, plus `positioner`                      | Backdrop is available only on the root menu. |
| `elevation`                                             | Same prop, default 8                               | Forwarded to Paper.                          |
| Paper viewport height limit                             | `min(calc(100vh - 96px), var(--available-height))` | Also respects available collision space.     |
| `BackdropProps`                                         | `slotProps.backdrop`                               | Backdrop remains opt-in.                     |
| `PopoverClasses`                                        | No equivalent                                      | Menu2 does not render Popover.               |

</details>

<details>
<summary>6. Item props</summary>

| Classic MenuItem / MenuList                                        | New equivalent                          | Notes                                                                                                                                             |
| :----------------------------------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dense`, `disableGutters`, `divider`                               | Same props                              | Presentation remains Material-owned.                                                                                                              |
| `<Divider />`                                                      | `Menu2Separator`                        | Owns its margins, including beside submenu focus guards.                                                                                          |
| `selected`                                                         | Visual selection                        | Use dedicated checkbox and radio items for checked semantics.                                                                                     |
| `disabled`                                                         | Same prop on supported item parts       | Disabled items remain focusable. Link items have a separate contract.                                                                             |
| No equivalent                                                      | `closeOnClick`                          | Defaults to `true` on Menu2Item; `false` on link, checkbox, and radio items. Submenu triggers open the submenu instead of activating a leaf item. |
| `href` / `LinkComponent`                                           | `Menu2LinkItem`                         | Renders an anchor by default; use `component` for a routing link.                                                                                 |
| Item `autoFocus`                                                   | No dedicated equivalent                 | Base UI owns initial menu focus.                                                                                                                  |
| `disableRipple`                                                    | Same prop                               | `MuiButtonBase` theme defaults apply unless overridden.                                                                                           |
| `focusVisibleClassName`, `onFocusVisible`, `action.focusVisible()` | No dedicated Menu2 equivalents          | Use state classes for styling. `highlighted` includes pointer navigation and is not equivalent to keyboard focus-visible.                         |
| `MenuList.disableListWrap`                                         | `loopFocus`, default `true`             | Inverse boolean.                                                                                                                                  |
| `MenuList.autoFocus` / `autoFocusItem` / `variant`                 | No direct equivalent                    | Initial focus follows Base UI behavior.                                                                                                           |
| `MenuList.disablePadding`, `subheader`                             | `slotProps.list`, group and label parts | Use semantic groups for labeled sections.                                                                                                         |

</details>

## Resources and benchmarks

- [Proof of concept #48663](https://github.com/mui/material-ui/pull/48663) and [experiment #48823](https://github.com/mui/material-ui/pull/48823).
- Main requests: [nested menus #11723](https://github.com/mui/material-ui/issues/11723), [packaged Menubar #48336](https://github.com/mui/material-ui/issues/48336), and [nested menu docs #45790](https://github.com/mui/material-ui/issues/45790).
- [Base UI Menu](https://base-ui.com/react/components/menu), [release history](https://base-ui.com/react/overview/releases), and [initial-focus discussion](https://github.com/mui/base-ui/issues/2143).
- Historical bundle result from #48823: **+3.54 KB parsed, +685 B gzip** on the measured Material bundle. The earlier **+77 B** result belongs to the proof of concept. Neither describes the current release revision. Measure both classic-only and Menu2 imports before release; the latter also includes the required Base UI code.
