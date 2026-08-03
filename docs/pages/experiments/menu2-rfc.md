---
title: 'RFC draft: Menu successor with submenu support'
description: Living draft of the Menu2 RFC, tracked next to the Menu2 experiments until it is posted publicly.
---

# RFC draft: Menu successor with submenu support

<p class="description">Living draft tracked in this PR until the RFC is posted publicly; review comments welcome on this file.</p>

Suggested issue title: `[RFC] Menu: Base UI-based successor with submenu support`

Structured for `.github/ISSUE_TEMPLATE/3.rfc.yml` -- paste each section below into the matching form field. Companion experiments: [playground](/experiments/menu2-playground/), [recipes](/experiments/menu2-recipes/).

## What's the problem?

Material UI's `Menu` cannot do submenus.

- It is one of our oldest requests: [#11723](https://github.com/mui/material-ui/issues/11723) has been open since 2018 with 120+ reactions.
- Material UI v0.x had nested menus ([#2148](https://github.com/mui/material-ui/pull/2148)). The v1 rewrite dropped them.
- Community packages (`mui-nested-menu`, `material-ui-popup-state`, many sandboxes) all fall short on keyboard support and ARIA, which maintainers have pointed out repeatedly.
- The Menubar docs page already ships Base UI submenus as copy-paste code, and people immediately asked for a real component ([#48336](https://github.com/mui/material-ui/issues/48336)). Copy-paste code is not versioned, tested, or themed.

We want submenus in `@mui/material` with Material visuals and full theming, without destabilizing today's `Menu`, on a path to becoming the default `Menu` in the next major.

This RFC also sets the rules for building future Material UI components on Base UI: customization, styling reuse, dependencies, testing, and tooling. Menu is the first one; the decisions here are meant to apply to the rest.

## What are the requirements?

1. Correct menu behavior at every nesting level: trigger semantics, RTL-aware arrow keys, Escape closing one level at a time, focus returning to the parent item, typeahead per level, any nesting depth.
2. Good pointer behavior: a submenu must stay open while the pointer moves diagonally toward it (the "safe triangle"), plus hover-open delays. This is the bar earlier attempts failed to clear.
3. Collision-aware positioning: submenus flip at screen edges instead of getting cut off.
4. Same look as today's `Menu`/`MenuItem`, and full theming: `sx`, `classes`, `component`, `slots`/`slotProps`, and theme `defaultProps`/`styleOverrides`/`variants`.
5. Near-zero cost for existing users. Today's `Menu` keeps working. Apps that do not import the new component get no behavior change and none of Base UI's bundle cost. They do pay a one-time ~77 B gzip, because the classic components now read the styles the new ones share.
6. Keep the current API where the new foundation allows, and document the places where it cannot.
7. Cover the other long-requested menu features at the same time, so the API does not need reshaping later: checkbox and radio items, groups, hover-open, context menus.
8. A clear path to becoming `Menu` in the next major, with a migration guide and codemods, so early adopters are not stranded.
9. Reuse a maintained library instead of rebuilding focus, dismissal, and positioning ourselves.
10. It should look like any other Material UI component in tooling, theming, imports, and tests. Users should not need to know Base UI is involved or install anything extra.

## What are our options?

### Option A: Add submenus to the existing Menu

Tried three times in eight years, always blocked by the same things:

- [#14700](https://github.com/mui/material-ui/pull/14700) (2019): recursive Menu-in-Menu. Closed with "we need to change the menu implementation and to expose new objects to make it happen".
- [#20591](https://github.com/mui/material-ui/pull/20591) (2020-2022, +1333 lines, ~22 months of review): a `subMenu` prop on `MenuItem` using `cloneElement`. Blocked by a double-digit percentage gzip increase to the core bundle, hover intent, missing collision handling in `Popover`, test churn, and the risk of touching a core component before v5. The final review rejected `cloneElement` and suggested rebuilding on headless primitives.
- [#37570](https://github.com/mui/material-ui/pull/37570) (2023-2024): docs demo only. Closed after an accessibility review found gaps in Escape handling, `aria-expanded`, and screen reader support, with the note: "it would make more sense to focus on bringing this to Base UI".

The blockers are structural. Every open `Menu` is a full `Modal` (`Menu -> Popover -> Modal`), and nesting two of them breaks in six places:

1. Each menu renders a full-screen backdrop that captures clicks, so a submenu's backdrop covers its parent and closes the child when you click the parent.
2. `ModalManager` sets `aria-hidden` on everything except the top modal, so opening a submenu hides the parent from screen readers.
3. ArrowRight/ArrowLeft do nothing in a vertical list, and there is no hook for "open the submenu".
4. Each modal has its own focus trap, and they do not coordinate when a submenu closes.
5. `Popover` has no collision flipping, so a submenu near the screen edge is cut off.
6. Each `MenuList` keeps its own keyboard state, so nested lists share nothing.

Fixing this means changing `Menu`, `MenuList`, `MenuItem`, `Popover`, `Modal`, `ModalManager`, and `FocusTrap`, and replacing two core models (backdrop dismissal and per-modal focus traps) that `Dialog` and every `Popover` also use. That rebuilds what Base UI's `Menu` already does, with high regression risk, and it would be thrown away in the next major. Rejected.

### Option B: Leave it as copy-paste docs code

Rejected as the end state. Unversioned, untested code with no theming contract is not an answer to an 8-year-old request, and people have already asked for the real component.

### Option C: Wait for the next major

Rejected. The request has waited since 2018, and shipping now lets us validate the API before it becomes `Menu`.

### Option D: A successor built on Base UI, shipped as public unstable (proposed)

Base UI's `Menu` (`@base-ui/react`, stable since early 2026, maintained by the same team) covers requirements 1-3 out of the box. Verified against its source and tests: hover intent on submenu triggers, RTL-aware submenu keys, Escape closing the innermost submenu, focus returning to the parent item, per-level typeahead, and collision handling that flips and tracks the anchor. Our job is styling, theming, and API surface.

## Proposed solution

Build a Base UI-based successor to `Menu` and follow the Grid lifecycle. A proof of concept ([#48663](https://github.com/mui/material-ui/pull/48663)) shows it works, and a companion experiment ([#48823](https://github.com/mui/material-ui/pull/48823)) is where the open questions get tried out.

### Positioning and lifecycle (decided)

The new component is a successor. It is not a rewrite of the current internals, and not a second namespace that stays forever.

| Phase           | Component name   | What happens                                                                   |
| :-------------- | :--------------- | :----------------------------------------------------------------------------- |
| Now (v9 minors) | `Unstable_Menu2` | Public incubation, a real release. Theme keys and classes are `MuiMenu2*`.     |
| Later in v9     | `Menu2`          | Stable under the interim name. Today's `Menu` untouched, theme keys unchanged. |
| Next major      | `Menu`           | `Menu2` becomes the canonical name.                                            |
| Next major      | `MenuLegacy`     | Today's `Menu` renamed and deprecated, with a codemod.                         |

This follows Grid (`Unstable_Grid2` -> `Grid2` -> `Grid`, old one renamed `GridLegacy`, [#45363](https://github.com/mui/material-ui/pull/45363)). Each rename breaks early adopters, but it is codemoddable and we have accepted that trade before. The `2` suffix is what makes a stable phase before the major possible: an unsuffixed name would collide with the `Menu` we still ship.

Only directories, subpaths, and exports carry the `Unstable_` prefix. Internal names are `Menu2*` and theme keys are `MuiMenu2*`, which our lint rules require and which matches Grid2. This also means theme keys survive the `Unstable_Menu2` -> `Menu2` step unchanged; only the final promotion to `Menu` renames them.

Imports follow our usual convention: flat names, one component per subpath, no short aliases like `Root` or `Item`.

```jsx
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
```

Because the subpaths use default exports, adopters can drop the `Unstable_` prefix locally, so their JSX already reads like the future API. Barrel exports come at graduation.

Graduation is gated by a checklist, not a judgment call: the conformance suite passing minus documented skips, theme registration parity, the pinned `data-*` boundary, and design sign-off.

### Rules for Base UI-backed components (Menu is the first)

The rule: a Base UI-backed component should be indistinguishable from any other Material UI component. Only the behavior underneath is new.

Decided:

- **Customization:** `slots`/`slotProps`, same as every other component. We use Base UI's `render` prop internally to inject our styled elements; it is not the documented contract.
- **Slot plumbing:** reuse the `@mui/utils` helpers (`useSlotProps`, `mergeSlotProps`, `appendOwnerState`, `resolveComponentProps`) instead of writing our own. Done in the experiment. Three Base UI-specific helpers are left, and they should move into the shared utilities: hiding a Base UI part's own props when a slot is swapped for a plain element, bridging Base UI's `className={(state) => string}` callbacks to our utility classes, and inferring `nativeButton` from the root slot.
- **Style reuse:** share the styled element itself through `render` where possible, and fall back to a shared style function. Today classic `Menu`/`MenuItem` and the new parts read the same style modules, so there is one source of truth. Two regressions taught us to audit shared styles per consumer: a `maxHeight: calc(100% - 96px)` that meant "the viewport" inside the old Modal but not inside the new popup, and an `[item] + divider` margin that broke when Base UI added focus-guard elements next to an open submenu trigger. Parts should own their spacing rather than depend on sibling selectors.
- **Presentational props stay:** `dense`, `disableGutters`, `divider`, `selected`. We own presentation, Base UI owns behavior. The line is styling versus behavior, not old versus new, so individual rarely-used props can still go case by case.
- **Dependency:** `@base-ui/react` becomes a direct dependency of `@mui/material`, like `@popperjs/core`. Users never install or import it. Two conditions: version bumps are reviewed, never auto-merged; and conformance tests pin the `data-*` attributes we rely on, so an upstream rename fails CI instead of quietly breaking styles.
- **Docs tooling:** the component adapts to our tooling, not the other way around.
- **Theme registration:** normal `defaultProps`/`styleOverrides`/`variants` per part, under `MuiMenu2*` keys.

Still up for discussion:

- **Where styling state lives:** `Mui-*` classes and `ownerState` stay the public contract for `styleOverrides`, `variants`, and `sx`. Internally we can read Base UI `data-*` attributes for positional state, like Tooltip already does with `[data-popper-placement]`. Rule of thumb: anything users theme gets a class; internal positional state stays a data attribute.
- **Prop types:** extend Base UI's types and `Omit` what we hide or rename, so we inherit new props automatically. This means callbacks keep Base UI signatures, for example `onOpenChange(open, eventDetails)` instead of `onClose(event, reason)`. It works in the experiment, with one limitation: our proptypes generator cannot read types from `node_modules`, so runtime PropTypes only cover locally declared props. Types are unaffected, and PropTypes are stripped in production. Teaching the generator to follow external types is a separate infra task.
- **Testing:** reuse `describeConformance` for the Material UI contract, and rerun the existing Menu behavior tests against the successor, annotating every skip. Parity should be shown by those suites passing, not by new tests written for the successor. All 14 rendering parts now run conformance, which let us delete the hand-written theming and slots tests. Two adaptations may belong in the shared harness: portalled roots need a way to point the harness at the real root element, and the nested submenu popup only mounts with real layout, so its suite runs in the browser project only.

### API shape (settled by review)

Agreed rules, instead of one global flat-vs-compound choice:

- Stay as close to today's `Menu` as the foundation allows.
- Wiring parts (Portal, Positioner, Popup, Paper, List) collapse into one flat container, configured through `slots`/`slotProps`.
- Parts users customize per instance stay separate components: items, submenu triggers, checkbox and radio items.

Before finalizing the shape we needed to know how far the behavior differs. That benchmark now exists as a test next to the component (`Menu2Benchmark.test.tsx`), so every row below is measured in a real browser, not read off the source.

#### Benchmark results

| Dimension                  | Classic `Menu`                                     | Successor                                   | Verdict                     |
| :------------------------- | :------------------------------------------------- | :------------------------------------------ | :-------------------------- |
| Opening from the trigger   | no trigger part; you wire `onClick` yourself       | `Trigger` opens on click and ArrowDown      | successor adds behavior     |
| Initial focus, keyboard    | n/a (no trigger part)                              | first item highlighted                      | matches the menu pattern    |
| Initial focus, pointer     | selected item, or first item when none is selected | nothing highlighted, focus on the popup     | **difference**              |
| Disabled items, keyboard   | skipped                                            | focusable, per the WAI-ARIA menu pattern    | **difference**              |
| Escape                     | closes, focus returns to the trigger               | same                                        | same                        |
| Tab while open             | closes, and focus goes back to the trigger         | closes, and focus moves to the next element | same close, different focus |
| Body scrolling while open  | locked                                             | locked                                      | same                        |
| Backdrop element           | rendered                                           | opt-in (see open question 4)                | **difference**              |
| Sibling content while open | `aria-hidden`                                      | left in the accessibility tree              | **difference**              |
| Default placement          | under the trigger, left aligned                    | under the trigger, left aligned             | same                        |

What this means: the successor is closer to a drop-in than expected. Placement, scroll locking, Escape, and Tab-closes-the-menu already match. Keyboard opening cannot be compared directly because the classic Menu has no trigger part, but both end up highlighting an item, so they agree in practice. Five differences remain:

- **Keep, they are accessibility fixes.** Disabled items stay focusable and sibling content stays in the accessibility tree. Both follow the WAI-ARIA menu pattern; the classic behavior is the odd one out. The backdrop belongs here too: dismissal no longer needs one, and it is available as a slot.
- **Decided: keep Base UI's behavior** for initial focus when opening with the pointer. Nothing is highlighted, so Enter cannot trigger an item the user never picked, which is how native desktop menus work. The menu pattern only prescribes focus for keyboard opening, where both already agree, so this was ours to choose. Matching the classic behavior would mean focusing an item ourselves after opening, since Base UI has no `initialFocus` prop on Menu, which fights the library and brings back the accidental-activation risk. This is a documented change for people migrating.
- **Document it.** Where focus goes after Tab. Classic sends it back to the trigger; the successor lets it move on, which is what pressing Tab asks for.

`variant="selectedMenu"` is dropped, and this one is a lost feature rather than a changed behavior. The prop opens the menu with the current value highlighted. In the code it decides which item is focused when the menu opens, and hides the focus ring for that first moment. Base UI cannot do either: `Menu.Root` has no initial-highlight prop and `Menu.Popup` has no `initialFocus`. Radio items do not fill the gap either. A `RadioGroup` with its second item checked still opens with the first item highlighted, which the benchmark asserts.

Dropping it also narrows the pointer-focus difference above without closing it: the classic Menu highlights an item on pointer open under either variant.

This is deliberate upstream, not an oversight. `initialFocus` exists on Base UI's Combobox, Dialog, Drawer, and Popover, but not Menu, and a maintainer explains why in [base-ui#2143](https://github.com/mui/base-ui/issues/2143): "Menu doesn't have the `initialFocus` prop (like Popover), because it's supposed to only contain menu items." The same thread recommends a different component for this case: "The `Menu` pattern is for listing a bunch of actions the user can take. The `Select` pattern is for choosing an option from a list of options." No open request exists to change it, so the answer is the pattern boundary, not an upstream feature request.

For the API shape this means a flat container really can carry today's surface, and the migration story is "same component, a few documented behavior changes" rather than a rewrite.

Settled by review. The experiment started fully compound, one component per Base UI part. It is now one component per menu, at both levels: the root carries the trigger and the popup surface, and a submenu is the same shape one level down.

```jsx
<Menu2 trigger={<Button>Options</Button>} slotProps={{ paper: { elevation: 4 } }}>
  <Menu2Item onClick={handleCut}>Cut</Menu2Item>
  <Menu2Submenu trigger="Share">
    <Menu2Item>Email</Menu2Item>
    <Menu2Item>Copy link</Menu2Item>
  </Menu2Submenu>
</Menu2>
```

The trigger and popup parts still exist, but they are internal; only their class hooks are exported, so `styleOverrides` and `sx` are unaffected.

Three things fell out of building it:

- The root `trigger` takes an element and Base UI's `render` merges the behavior into it, so the caller keeps their own component. Anything else renders inside the default trigger.
- The submenu `trigger` takes content, not an element. This is the one place the levels cannot match: a submenu trigger is already a menu item, so passing `<Menu2Item>` nests an item inside an item and the submenu never opens.
- Wrapping a trigger in a `Tooltip` got harder. The compound shape wrapped the element directly; now the wrapper has to move into the trigger's root slot, which costs a `forwardRef` component. The test suite and the recipes page both hit it.

Omit `trigger` and drive the menu with `open` and `anchor` for the classic controlled pattern, which is what the context-menu recipe uses.

Behavior worth stating whatever shape we pick:

- Submenus open on hover by default (100ms delay, hover intent on close). New compared to the classic Menu, matches native menus, and is configurable.
- Escape closes the innermost submenu and returns focus to its trigger. Closing the whole tree is opt-in.
- Opening with the pointer highlights nothing; opening with the keyboard highlights the first item.
- While a submenu is open, Base UI puts focus-guard elements next to its trigger. See open question 7.
- The menu surface caps its height against the available space and scrolls internally, instead of the old viewport-only clamp.

### Compatibility

- **Unchanged:** item props (`dense`, `disableGutters`, `divider`, `selected`, `disabled`), visuals, theming, `keepMounted`, `container`.
- **Changed on purpose:** initial focus (above), open/close control (`open`/`defaultOpen` + `onOpenChange` instead of controlled-only `open` + `onClose`), positioning (`anchor`/`side`/`align` instead of `anchorEl`/`anchorOrigin`/`transformOrigin`), transitions (CSS instead of `TransitionComponent`).
- **Dropped:**
  - `disableAutoFocus`, `disableEnforceFocus`, `disableRestoreFocus`, `disableEscapeKeyDown`: escape hatches that hurt accessibility. `modal` and `finalFocus` cover the real cases.
  - `variant="selectedMenu"`, `autoFocus`, `disableAutoFocusItem`: selection state does not belong on menu items, and initial focus is handled internally.
  - `anchorOrigin`, `transformOrigin`, `anchorReference`, `anchorPosition`, `PopoverClasses`, `transitionDuration`, `slots.transition`, `action.updatePosition`: replaced by the new positioning.
  - `disablePortal`: Base UI popups are always portalled.

The full prop mapping is in the appendix.

### New capabilities

- Submenus, with correct keyboard, hover, and ARIA behavior.
- Checkbox and radio items (`menuitemcheckbox` / `menuitemradio` with `aria-checked` and indicators).
- Groups with labels wired up via `aria-labelledby`.
- A trigger that sets `aria-haspopup`, `aria-expanded`, and `aria-controls` for you.
- Typeahead, with a per-item `label` override.
- Hover-open with delays, and a cancelable `onOpenChange` that says why the menu is closing.

### Where the experiment stands

The proof of concept ([#48663](https://github.com/mui/material-ui/pull/48663)) covers submenus, checkbox and radio items, groups, matching visuals, theme registration, and tests, at +77 B gzip on the `@mui/material` barrel. The companion experiment ([#48823](https://github.com/mui/material-ui/pull/48823)) moves it toward the rules above.

Done:

- Renamed to the `Unstable_Menu2` lifecycle naming, one component per subpath.
- Docs tooling special-casing removed.
- Classic and successor share the same style modules.
- Composed list primitives still work inside items (`ListItemText inset` lines up with the icon column). `inset` is a `ListItemText` prop, not a menu item prop, so nothing needed implementing.
- Prop types inherit from Base UI, so the roots get `actionsRef` and future props for free.
- Top-level `elevation` on the popup, default 8.
- Default open/close animation, and an opt-in backdrop slot.

Left:

- The compound API needs the flat/standalone split from the design phase.
- Style sharing is at the style-function level; sharing the styled element itself is better where it fits.
- The Base UI-specific slot helpers should move into `@mui/utils`.
- The existing Menu behavior tests cannot run against the successor yet, because they are written against `anchorEl` and need the flat container first.

### Open questions

1. **Ripple.** Items are plain elements, so there is no ripple by default. Users can get one today by swapping the item root: `slots={{ root: ButtonBase }}` produces a real ripple, but it loses our item styling, because that CSS lives on the default root. Putting a `ButtonBase` inside an item is not an option: it places a focusable element inside a `menuitem`, which highlights the item on open ([base-ui#2622](https://github.com/mui/base-ui/issues/2622)) and is the pattern Base UI rules out. So: ship ripple by default (make the item root a styled `ButtonBase`, bringing back `disableRipple`), or leave it to the root slot and document the recipe? Design call, no accessibility stake.
2. **Default animation. Decided: ship one.** The popup has a CSS transition matching the classic `Grow`, using the same scale and the theme's durations, so migrating apps do not lose their animation. It turns off under `prefers-reduced-motion` and can be overridden through `slotProps.popup`, `styleOverrides`, or the theme. It has to live on the popup element, because Base UI waits for animations on that element before unmounting; a transition on a child would be cut off when closing. One practical effect: anything measuring the menu right after it opens now reads it mid-animation, so tests have to wait for the transition to finish.
3. **`elevation` prop. Decided: keep it.** The popup takes `elevation` (default 8) and passes it to the Paper slot, so the common case does not need `slotProps.paper`.
4. **Backdrop. Decided: surface it.** `slots.backdrop` and `slotProps.backdrop` mirror the classic Menu, with a default element that is transparent and click-through, like the classic invisible backdrop. Dismissal stays with Base UI's outside-press handling. Dimming is `slotProps={{ backdrop: { sx: { bgcolor: ... } } }}`. One difference from classic: it only renders when you opt in, because always rendering it would give non-modal menus a full-screen layer they never had, and modal menus already get Base UI's own inert backdrop.
5. **Imperative actions. Decided: use Base UI's `actionsRef` as-is.** It arrives with the inherited types and gives `close()` and `unmount()`. We do not rename it or build our own `action` ref: renaming means our API drifts from Base UI's for no gain, and rebuilding duplicates what Base UI already does. The classic `action.updatePosition()` has no equivalent because the position updates automatically.
6. **Context menu: does it need its own component?** Right-click menus work today with a virtual anchor, but the recipe has a focus bug we hit ourselves: a menu with no trigger has nothing to return focus to, so Base UI falls back to the last element it remembers, which can be a trigger from an unrelated menu on the page. The recipe has to pass `finalFocus` pointing at the element that was right-clicked, and nothing in the API tells you that. It looks fine until a second menu exists. A component wrapping Base UI's `ContextMenu` would handle it internally, since its trigger is the right-click surface. So: document the recipe, or ship the component?
7. **Styling around submenu triggers. Decided: do both.** While a submenu is open, Base UI keeps focus-guard elements next to the trigger, because tab order depends on them. Any CSS using sibling selectors (`+`, `~`, `:last-child`) around a trigger breaks the moment a submenu opens. We hit this bug ourselves, and our parts now own their spacing instead. We will document the rule (the guards are identifiable via `data-base-ui-focus-guard`) and separately ask upstream whether the guards could sit outside the item list, which would help every Base UI user.
8. **Bundle size.** Base UI adds real weight per component. Do we want a size check per Base UI-backed component?
9. **Accessibility: what is still ours.** Base UI owns the roles, keyboard behavior, focus, and dismissal. Everything visual is ours, and that is where the remaining risk sits. Three concrete gaps. Our forced-colors enhancer matches classic items through `menuItemClasses`, but successor items use `menu2ItemClasses`, whose state class is `highlighted` and which has no `focusVisible`, so nothing matches them today; the trigger is covered, because it is a styled `Button`. The highlight itself is a background tint (`action.focus`, roughly 1.3:1) with the native outline removed, which is parity with the classic item but worth choosing rather than inheriting. And nothing checks an open menu automatically: axe runs only in the visual regression suite, which never interacts with the page and skips the menus page for exactly that reason, and `describeConformance` has no accessibility assertions.
10. **Other defaults.** Two are decided: pointer-opened menus highlight nothing, and submenus open on hover. There is no question about modality: Base UI's `modal` defaults to `true`, the classic Menu is always modal, and the benchmark measured scroll locking as the same. The successor only adds the option to turn it off.
11. **SSR, `'use client'`, ref typing.** All 18 modules carry `'use client'`, placed the way the classic Menu places it, and Base UI ships the directive on its own menu modules. Nothing verifies that it works: the docs site is Pages Router with `output: 'export'`, so no server component boundary is ever evaluated, and an App Router fixture is the only thing that would confirm it. Server rendering is measured rather than open: only the trigger renders on the server, and neither `defaultOpen` nor `keepMounted` changes that, because Base UI creates the portal node in a layout effect. The real question is ref typing. Refs come from Base UI and are wide (`HTMLElement`, `Element`), where the classic `MenuItem` resolves to `HTMLLIElement` and follows the `component` prop. Conformance pins the runtime element; the type stays loose. Narrow per part, or keep parity with Base UI's signatures?

### Rollout plan

1. Behavior benchmark: **done**, results above.
2. Design phase for the API shape, tried out in the companion experiment so each question is answered against a real preview.
3. Ship `Unstable_Menu2` in a v9 minor, with conformance tests, API docs, and demos on the Menu page.
4. Iterate on feedback, then stabilize as `Menu2` once the graduation checklist passes.
5. Next major: promote `Menu2` to `Menu`, rename the old one to `MenuLegacy`, and ship the migration guide and codemods.

### Appendix: full prop mapping

<details>
<summary>1. Open and close</summary>

| Classic Menu                       | New equivalent                     | Notes                                                                                                                                    |
| :--------------------------------- | :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `open` (required, controlled-only) | `open` + `defaultOpen`             | uncontrolled is now possible                                                                                                             |
| `onClose(event, reason)`           | `onOpenChange(open, eventDetails)` | reasons include `escape-key`, `outside-press`, `focus-out`, `trigger-press`, `item-press`; can be canceled, and exposes the native event |
| n/a                                | `onOpenChangeComplete(open)`       | replaces `onTransitionExited`                                                                                                            |

</details>

<details>
<summary>2. Positioning</summary>

| Classic Menu / Popover                                | New equivalent                                                                        | Notes                                  |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------ | :------------------------------------- |
| `anchorEl`                                            | `anchor`                                                                              | also accepts refs and virtual elements |
| `anchorOrigin` + `transformOrigin`                    | `side` + `align` + `sideOffset` + `alignOffset`                                       | finer control                          |
| `anchorReference="anchorPosition"` + `anchorPosition` | `anchor={virtualElement}`                                                             | see open question 6                    |
| `marginThreshold` (default 16)                        | `collisionPadding` (default 5)                                                        | same idea                              |
| `anchorReference="none"`                              | omit `anchor`, position via CSS                                                       | same                                   |
| `action.updatePosition()`                             | automatic                                                                             | `disableAnchorTracking` to opt out     |
| --                                                    | `collisionBoundary`, `sticky`, `collisionAvoidance`, `positionMethod`, `arrowPadding` | new                                    |

</details>

<details>
<summary>3. Focus and modality</summary>

| Classic Menu                              | New equivalent | Notes                                                                                                           |
| :---------------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------- |
| `autoFocus`, `disableAutoFocusItem`       | internal       | keyboard opening highlights the first item; pointer opening highlights nothing                                  |
| `variant` (`menu`/`selectedMenu`)         | dropped        | not reproducible on Base UI (see above). Use checkbox or radio items so the current value is at least indicated |
| `disableAutoFocus`, `disableEnforceFocus` | dropped        | `modal` covers this                                                                                             |
| `disableRestoreFocus`                     | `finalFocus`   | explicit focus target on close                                                                                  |
| `disableEscapeKeyDown`                    | dropped        | goes against the menu pattern; use `onKeyDown` if you must                                                      |
| `disableScrollLock`                       | `modal`        | non-modal menus do not lock scroll                                                                              |
| `hideBackdrop`                            | backdrop slot  | the backdrop is opt-in (open question 4)                                                                        |
| `disablePortal`                           | dropped        | always portalled                                                                                                |
| `keepMounted`, `container`                | same           | same behavior                                                                                                   |

</details>

<details>
<summary>4. Transitions</summary>

| Classic Menu                                                        | New equivalent                                      |
| :------------------------------------------------------------------ | :-------------------------------------------------- |
| `TransitionComponent` / `slots.transition` (default `Grow`)         | CSS via `data-starting-style` / `data-ending-style` |
| `transitionDuration`                                                | CSS `transition-duration` on the popup              |
| `onTransitionEnter` / `onTransitionExited` / `closeAfterTransition` | `onOpenChangeComplete` + `keepMounted`              |
| default `Grow` animation                                            | shipped as a CSS default (open question 2)          |

</details>

<details>
<summary>5. Styling and slots</summary>

| Classic Menu                                                        | New equivalent                                                       | Notes                          |
| :------------------------------------------------------------------ | :------------------------------------------------------------------- | :----------------------------- |
| `slots`: `root`, `paper`, `list`, `transition`, `backdrop`          | `portal`, `positioner`, `popup`, `paper`, `list`, `backdrop`         | no transition slot (CSS-based) |
| `elevation` (default 8)                                             | `elevation` (default 8, forwarded to the Paper slot)                 | kept                           |
| paper `maxHeight: calc(100% - 96px)` (viewport clamp via the Modal) | `min(calc(100vh - 96px), var(--available-height))` + internal scroll | collision-aware                |
| `slots.backdrop` + `BackdropProps`                                  | `slots.backdrop` + `slotProps.backdrop`                              | opt-in (open question 4)       |
| `PopoverClasses`                                                    | n/a                                                                  | no Popover underneath          |

</details>

<details>
<summary>6. Item props</summary>

| Classic MenuItem / MenuList                                        | New equivalent                          | Notes                                                                                                                                                                                                                                           |
| :----------------------------------------------------------------- | :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dense`, `disableGutters`, `divider`                               | same                                    | kept: we own presentation                                                                                                                                                                                                                       |
| `<Divider />` between items                                        | `Separator` part                        | owns its margins, so spacing stays put while a submenu is open                                                                                                                                                                                  |
| `selected`                                                         | same (visual only)                      | kept. Checkbox and radio items cover real selection. Classic `MenuItem` now derives `aria-checked` from `selected` for checkbox and radio roles ([#48651](https://github.com/mui/material-ui/pull/48651)); our dedicated items own that instead |
| `disabled`                                                         | same                                    | `aria-disabled`, item stays focusable                                                                                                                                                                                                           |
| `href` / `LinkComponent`                                           | link item                               | real `<a role="menuitem">`                                                                                                                                                                                                                      |
| `autoFocus` (item)                                                 | dropped                                 | initial focus is internal                                                                                                                                                                                                                       |
| ripple props                                                       | none yet                                | see open question 1                                                                                                                                                                                                                             |
| `focusVisibleClassName`, `onFocusVisible`, `action.focusVisible()` | `highlighted` class and data attributes | style via CSS                                                                                                                                                                                                                                   |
| `MenuList.disableListWrap`                                         | `loopFocus` (default true)              | inverse                                                                                                                                                                                                                                         |
| `MenuList.autoFocus`/`autoFocusItem`/`variant`                     | dropped                                 | internal or legacy                                                                                                                                                                                                                              |
| `MenuList.disablePadding`, `subheader`                             | `slotProps.list`, group parts           | groups get proper ARIA                                                                                                                                                                                                                          |

</details>

## Resources and benchmarks

Proof of concept and experiment:

- PoC: [#48663](https://github.com/mui/material-ui/pull/48663) ([demo](https://deploy-preview-48663--material-ui.netlify.app/experiments/menu-preview/))
- Companion playground: [#48823](https://github.com/mui/material-ui/pull/48823)
- Bundle impact on `@mui/material`: +160 B parsed, +77 B gzip (~0.03%), from the style extraction only. Base UI code is only paid when you import the component.

Demand:

- [#11723](https://github.com/mui/material-ui/issues/11723) (main request, open since 2018, 120+ reactions)
- [#8152](https://github.com/mui/material-ui/issues/8152) (closed as duplicate)
- [#48336](https://github.com/mui/material-ui/issues/48336) (packaged Menubar/submenu component)
- [#45790](https://github.com/mui/material-ui/issues/45790) (nested menu docs demo)

Earlier attempts:

- [#14700](https://github.com/mui/material-ui/pull/14700) (2019, closed), [#20591](https://github.com/mui/material-ui/pull/20591) (2020-2022, closed), [#37570](https://github.com/mui/material-ui/pull/37570) (2023-2024, closed)
- v0.x nested menus: [#2148](https://github.com/mui/material-ui/pull/2148), [#3265](https://github.com/mui/material-ui/pull/3265)

Direction and precedent:

- Maintainer statement (Dec 2024): [#11723 comment](https://github.com/mui/material-ui/issues/11723#issuecomment-2556390056) -- "Material UI will adopt (this new) Base UI component in its next major release."
- Grid lifecycle: [#45363](https://github.com/mui/material-ui/pull/45363)
- Menubar docs page built on Base UI: [react-menubar](https://mui.com/material-ui/react-menubar/) (from [#47616](https://github.com/mui/material-ui/pull/47616))
- [Base UI Menu](https://base-ui.com/react/components/menu) and [releases](https://base-ui.com/react/overview/releases)
- Why Base UI's Menu has no `initialFocus`: [base-ui#2143](https://github.com/mui/base-ui/issues/2143)

Community workarounds:

- [material-ui-nested-menu-item](https://github.com/azmenak/material-ui-nested-menu-item) and `mui-nested-menu`
- [material-ui-popup-state](https://jcoreio.github.io/material-ui-popup-state/)
- [better-mui-menu](https://www.npmjs.com/package/better-mui-menu)
