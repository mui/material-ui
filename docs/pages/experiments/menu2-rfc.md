---
title: 'RFC draft: Menu successor with submenu support'
description: Living draft of the Menu2 RFC, tracked next to the Menu2 experiments until it is posted publicly.
---

# RFC draft: Menu successor with submenu support

<p class="description">This is a live draft. We track it in this PR until we post the RFC in public. Please add review comments on this file.</p>

Suggested issue title: `[RFC] Menu: Base UI-based successor with submenu support`

We structured this draft for `.github/ISSUE_TEMPLATE/3.rfc.yml` -- paste each section below into the matching form field. Companion experiments: [playground](/experiments/menu2-playground/), [recipes](/experiments/menu2-recipes/).

## What's the problem?

Material UI's `Menu` cannot do submenus.

- **One of our oldest requests.** [#11723](https://github.com/mui/material-ui/issues/11723) is open since 2018 and has 120+ reactions.
- **A lost feature.** Material UI v0.x had nested menus ([#2148](https://github.com/mui/material-ui/pull/2148)). The v1 rewrite removed them.
- **Weak community options.** `mui-nested-menu`, `material-ui-popup-state`, and many sandboxes have weak keyboard and ARIA support. Maintainers report this problem many times.
- **Copy-paste code.** The Menubar docs page shows Base UI submenus as copy-paste code. Users then asked for a real component ([#48336](https://github.com/mui/material-ui/issues/48336)). Copy-paste code has no version, no tests, and no theme support.

We want submenus in `@mui/material` with Material visuals and full theme support. The current `Menu` must stay stable. The plan is to make the new component the default `Menu` in the next major version.

This RFC also sets the rules to build future Material UI components on Base UI: customization, style reuse, dependencies, tests, and tools. Menu is the first component. We intend the decisions here to apply to the other components.

## What are the requirements?

1. **Correct menu behavior at every nesting level.**
   - Trigger semantics.
   - RTL-aware arrow keys.
   - Escape that closes one level at a time.
   - Focus that returns to the parent item.
   - Typeahead per level.
   - Any nesting depth.
2. **Good pointer behavior.** A submenu must stay open while the pointer moves diagonally toward it (the "safe triangle"). The menu must also delay the hover-open. Earlier attempts failed this requirement.
3. **Collision-aware positioning.** Submenus flip at screen edges instead of being cut off.
4. **The same look as the current `Menu`/`MenuItem`, and full theming.** `sx`, `classes`, `component`, `slots`/`slotProps`, and theme `defaultProps`/`styleOverrides`/`variants`.
5. **Near-zero cost for existing users.** The current `Menu` continues to work. Apps that do not import the new component get no behavior change and no Base UI bundle cost. They pay a one-time cost, because the classic components now read the styles that the new components share. See the size numbers below.
6. **Keep the current API where the new foundation permits it.** Document the places where it does not.
7. **Add the other menu features that users request often, at the same time.** These features are checkbox items, radio items, groups, hover-open, and context menus. Then we do not need to change the API later.
8. **A clear path to become `Menu` in the next major version.** Supply a migration guide and codemods, so early adopters keep a way forward.
9. **Reuse a maintained library.** Do not build focus, dismissal, and positioning again.
10. **The component must look like any other Material UI component** in tooling, theming, imports, and tests. Users do not need to know about Base UI, and they do not install anything extra.

## What are our options?

### Option A: Add submenus to the existing Menu

We tried three times in eight years. The same problems blocked each attempt:

| Attempt                                                                                                | Approach                                                 | Why it stopped                                                                                                                                                                                                                                                                   |
| :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#14700](https://github.com/mui/material-ui/pull/14700) (2019)                                         | A recursive Menu inside a Menu.                          | "we need to change the menu implementation and to expose new objects to make it happen"                                                                                                                                                                                          |
| [#20591](https://github.com/mui/material-ui/pull/20591) (2020-2022, +1333 lines, ~22 months of review) | A `subMenu` prop on `MenuItem` that used `cloneElement`. | Five problems: a double-digit percentage gzip increase in the core bundle; incorrect hover intent; no collision handling in `Popover`; many test changes; a risky core change before v5. The final review rejected `cloneElement` and proposed a rebuild on headless primitives. |
| [#37570](https://github.com/mui/material-ui/pull/37570) (2023-2024)                                    | A docs demo only.                                        | An accessibility review found problems in Escape handling, `aria-expanded`, and screen reader support. "it would make more sense to focus on bringing this to Base UI"                                                                                                           |

The problems are structural. Every open `Menu` is a full `Modal` (`Menu -> Popover -> Modal`). Two nested modals break in six places:

1. **Backdrop.** Each menu renders a full-screen backdrop that captures clicks. The backdrop of a submenu covers its parent. A click on the parent closes the child.
2. **`aria-hidden`.** `ModalManager` sets it on all elements except the top modal. Therefore, an open submenu hides the parent from screen readers.
3. **Keys.** ArrowRight and ArrowLeft do nothing in a vertical list. There is also no hook to open the submenu.
4. **Focus.** Each modal has its own focus trap. The focus traps do not coordinate when a submenu closes.
5. **Collision.** `Popover` does not flip. Therefore, a submenu near the screen edge is cut off.
6. **State.** Each `MenuList` keeps its own keyboard state. Nested lists share no state.

A fix must change `Menu`, `MenuList`, `MenuItem`, `Popover`, `Modal`, `ModalManager`, and `FocusTrap`. It must also replace two core models that `Dialog` and every `Popover` use: backdrop dismissal and per-modal focus traps. This work rebuilds what the `Menu` of Base UI already does. The regression risk is high, and we discard the work in the next major version. Rejected.

### Option B: Leave it as copy-paste docs code

Rejected as the end state. This code has no version, no tests, and no theming contract. It is not an answer to an 8-year-old request. People already asked for the real component.

### Option C: Wait for the next major

Rejected. The request waited since 2018. A release now lets us validate the API before it becomes `Menu`.

### Option D: A successor built on Base UI, shipped as public unstable (proposed)

The `Menu` of Base UI (`@base-ui/react`, stable since early 2026, maintained by the same team) covers requirements 1-3 without extra work. We verified these features against its source and its tests:

- Hover intent on submenu triggers.
- RTL-aware submenu keys.
- Escape closes the innermost submenu.
- Focus returns to the parent item.
- Per-level typeahead.
- Collision handling that flips the submenu and tracks the anchor.

Our work is the style, the theme, and the API surface.

## Proposed solution

We propose a successor to `Menu` that uses Base UI. This successor follows the Grid lifecycle. A proof of concept ([#48663](https://github.com/mui/material-ui/pull/48663)) shows that this works. We test the open questions in a companion experiment ([#48823](https://github.com/mui/material-ui/pull/48823)).

### Positioning and lifecycle (decided)

The new component is a successor. It is not a rewrite of the current internals. It is also not a second namespace that stays forever.

| Phase           | Component name   | What happens                                                                                     |
| :-------------- | :--------------- | :----------------------------------------------------------------------------------------------- |
| Now (v9 minors) | `Unstable_Menu2` | Public incubation, a real release. The theme keys and the classes are `MuiMenu2*`.               |
| Later in v9     | `Menu2`          | Stable under the interim name. The current `Menu` does not change. The theme keys do not change. |
| Next major      | `Menu`           | `Menu2` becomes the canonical name.                                                              |
| Next major      | `MenuLegacy`     | We rename and deprecate the current `Menu`. We supply a codemod.                                 |

This plan follows Grid (`Unstable_Grid2` -> `Grid2` -> `Grid`, old one renamed `GridLegacy`, [#45363](https://github.com/mui/material-ui/pull/45363)).

- **Renames.** Each rename breaks early adopters. But a codemod can do the rename, and we accepted this trade before.
- **The `2` suffix.** It makes a stable phase before the major release possible. A name without the suffix would collide with the `Menu` that we still release.
- **The `Unstable_` prefix.** Only the directories, the subpaths, and the exports use it. The internal names are `Menu2*` and the theme keys are `MuiMenu2*`. Our lint rules require this, and it matches Grid2.
- **The theme keys.** They do not change in the `Unstable_Menu2` -> `Menu2` step. Only the final promotion to `Menu` renames them.
- **The imports.** They follow our usual convention: flat names, one component for each subpath, and no short aliases such as `Root` or `Item`.

```jsx
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
```

The subpaths use default exports. Therefore adopters can remove the `Unstable_` prefix in their own code. Their JSX then looks like the future API. We add the barrel exports at graduation.

A checklist of four items controls graduation. It is not a judgment call.

- The conformance suite passes, minus the documented skips.
- The theme registration is at parity.
- The `data-*` boundary is pinned.
- The design team approves.

### Rules for Base UI-backed components (Menu is the first)

The rule: a Base UI-backed component must look the same as any other Material UI component. Only the behavior below the surface is new.

Decided:

- **Customization.** `slots`/`slotProps`, the same as every other component. We use Base UI's `render` prop internally to inject our styled elements. The `render` prop is not the documented contract.
- **Slot plumbing.** Reuse the `@mui/utils` helpers (`useSlotProps`, `mergeSlotProps`, `appendOwnerState`, `resolveComponentProps`). Do not write our own helpers. We did this in the experiment. Three Base UI-specific helpers remain, and they should move into the shared utilities:

  | Helper                  | Job                                                                                 |
  | :---------------------- | :---------------------------------------------------------------------------------- |
  | Host prop filter        | Hides a Base UI part's own props when a plain element replaces a slot               |
  | Class callback bridge   | Connects Base UI's `className={(state) => string}` callbacks to our utility classes |
  | Native button inference | Infers `nativeButton` from the root slot                                            |

- **Style reuse.** Share the styled element itself through `render` where possible. If this is not possible, use a shared style function. Today the classic `Menu`/`MenuItem` and the new parts read the same style modules, so there is one source of truth. Two regressions taught us to audit the shared styles for each consumer:

  | Regression                     | Cause                                                                             |
  | :----------------------------- | :-------------------------------------------------------------------------------- |
  | `maxHeight: calc(100% - 96px)` | The value meant "the viewport" inside the old Modal, but not inside the new popup |
  | `[item] + divider` margin      | Base UI added focus-guard elements next to an open submenu trigger                |

  Each part must control its own spacing. A part must not depend on sibling selectors.

- **Presentational props stay.** `dense`, `disableGutters`, `divider`, `selected`. We control presentation and Base UI controls behavior. The line is styling against behavior, not old against new. Therefore we can still decide each rarely-used prop separately.
- **Dependency.** `@base-ui/react` becomes a direct dependency of `@mui/material`, like `@popperjs/core`. Users never install or import it. Two conditions apply. First, we review each version increase and we never auto-merge it. Second, the conformance tests pin the `data-*` attributes that we use. Therefore an upstream rename makes CI fail and does not break the styles silently.
- **Docs tooling.** The component adapts to our tooling. Our tooling does not adapt to the component.
- **Theme registration.** Normal `defaultProps`/`styleOverrides`/`variants` for each part, under `MuiMenu2*` keys.

Still up for discussion:

- **Where styling state lives.** The `Mui-*` classes and `ownerState` stay the public contract for `styleOverrides`, `variants`, and `sx`. Internally we can read the Base UI `data-*` attributes for positional state. Tooltip already does this with `[data-popper-placement]`. Each item that users theme gets a class. Internal positional state stays a data attribute.
- **Prop types.** Extend Base UI's types and use `Omit` for the props that we hide or rename, so we inherit new props automatically. The callbacks then keep the Base UI signatures, for example `onOpenChange(open, eventDetails)` instead of `onClose(event, reason)`. This works in the experiment. The generator could not read types from `node_modules`, so the runtime PropTypes covered only the props that we declare locally. The infra now supports the extraction of inherited props ([mui-public#1709](https://github.com/mui/mui-public/pull/1709)). We get this capability when we sync with master, and then the PropTypes cover the inherited props too.
- **Testing.** Reuse `describeConformance` for the Material UI contract. Also run the existing Menu behavior tests again against the successor, and add a note to each skip. Those suites must pass to show parity. Do not write new tests for the successor to show parity. All 14 rendering parts now run conformance, so we deleted the manual theming and slots tests. Two adaptations can belong in the shared harness. First, portalled roots need a method to point the harness at the real root element. Second, the nested submenu popup mounts only with real layout, so its suite runs in the browser project only.

### API shape (settled by review)

The review agreed on these rules. We do not make one global choice between a flat API and a compound API.

- **Familiarity.** The new API stays as near to today's `Menu` as the foundation permits.
- **One flat container.** The wiring parts (Portal, Positioner, Popup, Paper, List) merge into it. You configure the container with `slots`/`slotProps`.
- **Separate components.** The parts that users change per instance stay separate: the items, the submenu triggers, the checkbox items, and the radio items.

Before the final decision on the shape, we had to know how much the behavior differs. A test next to the component gives the behavior benchmark (`Menu2Benchmark.test.tsx`). A real browser measures each row below. We do not read the rows from the source code.

#### Benchmark results

| Dimension                  | Classic `Menu`                                           | Successor                                | Verdict                     |
| :------------------------- | :------------------------------------------------------- | :--------------------------------------- | :-------------------------- |
| Open from the trigger      | no trigger part; you connect `onClick`                   | `Trigger` opens on click and ArrowDown   | the successor adds behavior |
| Initial focus, keyboard    | n/a (no trigger part)                                    | the menu highlights the first item       | matches the menu pattern    |
| Initial focus, pointer     | the selected item, or the first item if none is selected | no highlight; focus stays on the popup   | **difference**              |
| Disabled items, keyboard   | the menu skips them                                      | focusable, per the WAI-ARIA menu pattern | **difference**              |
| Escape                     | closes; focus returns to the trigger                     | same                                     | same                        |
| Tab while open             | closes; focus goes back to the trigger                   | closes; focus moves to the next element  | same close, different focus |
| Body scroll while open     | the menu locks it                                        | the menu locks it                        | same                        |
| Backdrop element           | the menu renders it                                      | opt-in (see the decisions above)         | **difference**              |
| Sibling content while open | `aria-hidden`                                            | it stays in the accessibility tree       | **difference**              |
| Default placement          | under the trigger, left aligned                          | under the trigger, left aligned          | same                        |

The successor is nearer to a drop-in replacement than we expected. The placement, the scroll lock, Escape, and Tab-closes-the-menu already match. We cannot compare the keyboard open directly, because the classic Menu has no trigger part. But both menus highlight an item, thus they agree in practice. Five differences stay:

- **Keep, they are accessibility fixes.** The disabled items stay focusable. The sibling content stays in the accessibility tree. Both behaviors follow the WAI-ARIA menu pattern. The classic behavior is the different one. The backdrop is also in this group. The menu no longer needs a backdrop to close, and a slot supplies the backdrop.
- **Decided: keep Base UI's behavior** for the initial focus on a pointer open. The menu highlights no item. Thus Enter cannot start an item that the user did not select. Native desktop menus work in this way. This is a deliberate deviation from the APG, not a neutral choice. The [menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) says that focus moves to an item when the menu opens, with no exception for a pointer open. We must release this deviation with documentation. To match the classic behavior, we must move focus to an item after the menu opens, because Base UI has no `initialFocus` prop on Menu. This works against the library and adds the risk of accidental activation again. This is a documented change for the users who migrate.
- **Document it.** Tell the user where focus goes after Tab. The classic Menu sends focus back to the trigger. The successor lets focus move to the next element. This is the usual function of the Tab key.

We drop `variant="selectedMenu"`. This is a lost feature, not a changed behavior.

- **What it did.** It selected which item got the focus when the menu opened, and hid the focus ring at that first moment.
- **Why we cannot keep it.** `Menu.Root` has no prop for the initial highlight, and `Menu.Popup` has no `initialFocus`.
- **Radio items do not replace it.** A `RadioGroup` with a checked second item still opens with the first item highlighted. The benchmark asserts this behavior.
- **Effect on the pointer-focus difference.** The difference gets smaller, but it stays. The classic Menu highlights an item on a pointer open with both variants.
- **Base UI does this deliberately.** `initialFocus` exists on its Combobox, Dialog, Drawer, and Popover, but not on Menu. A maintainer gives the reason in [base-ui#2143](https://github.com/mui/base-ui/issues/2143): "Menu doesn't have the `initialFocus` prop (like Popover), because it's supposed to only contain menu items." The same thread recommends a different component: "The `Menu` pattern is for listing a bunch of actions the user can take. The `Select` pattern is for choosing an option from a list of options." No open request asks for a change. The answer is the boundary between the patterns, not a feature request to Base UI.

For the API shape, a flat container can give today's API. The migration is "the same component with a few documented behavior changes", not a rewrite.

The review settled the shape. The experiment started with a fully compound API, with one component for each Base UI part. Now there is one component for each menu, at the two levels. The root holds the trigger and the popup. A submenu has the same shape one level lower.

```jsx
<Menu2 trigger={<Button>Options</Button>} slotProps={{ paper: { elevation: 4 } }}>
  <Menu2Item onClick={handleCut}>Cut</Menu2Item>
  <Menu2Submenu trigger={<Menu2Item>Share</Menu2Item>}>
    <Menu2Item>Email</Menu2Item>
    <Menu2Item>Copy link</Menu2Item>
  </Menu2Submenu>
</Menu2>
```

The popup part still exists, but it is internal. We export only its class hooks. Thus `styleOverrides` and `sx` do not change.

Four results come from this work:

- **`trigger` takes an element at both levels.** Base{NB}UI's `render` merges the trigger behavior into that element, so the caller keeps their own component. A string is not valid. The two levels match, and a `Tooltip` wraps the trigger at either level:

  ```jsx
  <Menu2Submenu trigger={
    <Tooltip title="Open view settings"><Menu2Item>View</Menu2Item></Tooltip>
  }>
  ```

- **A wrapper must forward the props and the ref to its child.** The `Tooltip` of Material{NB}UI does this. A wrapper that you write must do the same, or the trigger behavior does not reach the element.
- **A submenu trigger must not close the menu.** The caller usually passes a `Menu2Item`, which closes the menu on click. The submenu sets `closeOnClick` to false for the element that it renders.
- **We no longer infer `nativeButton`.** The caller declares it through `slotProps.trigger` when the element is not a native button.

For the classic controlled pattern, omit `trigger` and control the menu with `open` and `anchor`. The context-menu recipe uses this pattern.

These behaviors are true for each shape that we select:

- **Hover open.** The submenus open on hover by default, with a delay of 100ms and hover intent on close. This behavior is new when you compare it to the classic Menu. It matches native menus, and you can configure it.
- **Open state.** The list that contains a submenu trigger styles its open state, because the trigger is the caller's element. A test pins the order: a selected trigger keeps its selected blend when its submenu opens.
- **Offset.** A submenu overlaps its parent menu by 4px, and it starts 8px higher than its trigger. The offset of 8px cancels the top padding of the list. Thus the first item of the submenu lines up with the trigger row. Base UI positions a submenu in the same way.
- **Escape.** Escape closes the innermost submenu and moves focus back to its trigger. To close the full tree, you must select that option.
- **Initial highlight.** A pointer open highlights no item. A keyboard open highlights the first item.
- **Focus guards.** When a submenu is open, Base UI puts focus-guard elements next to its trigger. See the decisions above.
- **Height.** The menu limits its height to the available space and scrolls inside itself. The old behavior used only the viewport for this limit.

### Compatibility

- **Unchanged:** item props (`dense`, `disableGutters`, `divider`, `selected`, `disabled`), visuals, theming, `keepMounted`, `container`.
- **Changed on purpose:**
  - Initial focus. See above.
  - Open and close control. Use `open`/`defaultOpen` and `onOpenChange` instead of a controlled-only `open` with `onClose`.
  - Position. Use `anchor`/`side`/`align` instead of `anchorEl`/`anchorOrigin`/`transformOrigin`.
  - Transitions. Use CSS instead of `TransitionComponent`.
- **Dropped:**
  - `disableAutoFocus`, `disableEnforceFocus`, `disableRestoreFocus`, `disableEscapeKeyDown`: these escape hatches decrease accessibility. `modal` and `finalFocus` cover the real cases.
  - `variant="selectedMenu"`, `autoFocus`, `disableAutoFocusItem`: the selection state does not belong on the menu items. The component controls the initial focus internally.
  - `anchorOrigin`, `transformOrigin`, `anchorReference`, `anchorPosition`, `PopoverClasses`, `transitionDuration`, `slots.transition`, `action.updatePosition`: the new position props replace these props.
  - `disablePortal`: Base UI popups always use a portal.

The appendix contains the full prop map.

### New capabilities

- Submenus, with correct keyboard, hover, and ARIA behavior.
- Checkbox and radio items (`menuitemcheckbox` / `menuitemradio` with `aria-checked` and indicators).
- Groups with labels. The component connects the labels with `aria-labelledby`.
- A trigger that sets `aria-haspopup`, `aria-expanded`, and `aria-controls` for you.
- Typeahead, with a `label` override on each item.
- Hover-open with delays. A cancelable `onOpenChange` tells you why the menu closes.

### Where the experiment stands

The proof of concept ([#48663](https://github.com/mui/material-ui/pull/48663)) covers submenus, checkbox and radio items, groups, visuals that match the classic Menu, theme registration, and tests. It adds a small fixed cost to the `@mui/material` barrel. The companion experiment ([#48823](https://github.com/mui/material-ui/pull/48823)) moves it toward the rules above.

Done:

- **Names.** We renamed the components to the `Unstable_Menu2` lifecycle name, one component for each subpath.
- **Docs tooling.** We removed the special cases.
- **Styles.** The classic component and the successor share the same style modules.
- **Composition.** Composed list primitives still work inside the items. `ListItemText inset` aligns with the icon column. `inset` is a `ListItemText` prop, not a menu item prop, so we implemented nothing.
- **Types.** The prop types inherit from Base UI. The roots get `actionsRef` and future props at no cost.
- **Elevation.** Top-level `elevation` on the popup, default 8.
- **Animation.** A default open and close animation, and a backdrop slot that you opt in to.

Left:

- **Style sharing.** The components share styles at the style-function level. It is better to share the styled element itself where this fits.
- **Slot helpers.** The slot helpers for Base UI should move into `@mui/utils`.
- **Behavior tests.** We must still adapt the existing Menu behavior tests. The flat container was the blocker, and it now exists, so this task is next. The benchmark covers the open action, focus, disabled items, dismissal, scroll locking, backdrop treatment, and placement. The benchmark does not yet cover these areas: the default item close behavior, link items, checkbox and radio activation, controlled callback reasons, outside-pointer dismissal, hover and submenu timing, RTL submenu navigation, and context-menu focus.

### Decisions

These are settled. The detail stays here, because the caveats matter.

| Topic                           | Decision                         | Detail and caveat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :------------------------------ | :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default animation               | Release one                      | The popup has a CSS transition that follows the classic `Grow`, with the same scale and theme durations. It is **not identical**: the classic Menu sends `transitionDuration="auto"`, so `Grow` calculates the duration from the menu height with `getAutoHeightDuration`. A CSS transition must use the fixed `enteringScreen`/`leavingScreen` values, so tall menus animate more quickly than before. We must compare the two speeds before we complete this work. The transition stops under `prefers-reduced-motion`, and `slotProps.popup`, `styleOverrides`, or the theme can override it. It must sit on the popup element, because Base UI waits for the animations on that element before it removes the popup. |
| Ripple                          | Release it by default            | The item root becomes a styled `ButtonBase`, so the items get a ripple like the other Material UI components. `disableRipple` comes back and turns the ripple off. A `ButtonBase` inside an item stays impossible: it puts a focusable element inside a `menuitem`, and that highlights the item when the menu opens ([base-ui#2622](https://github.com/mui/base-ui/issues/2622)). Base UI does not permit that pattern.                                                                                                                                                                                                                                                                                                 |
| `elevation` prop                | Keep it                          | The popup accepts `elevation` (default 8) and sends it to the Paper slot. The usual case does not need `slotProps.paper`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Backdrop                        | Show it                          | `slots.backdrop` and `slotProps.backdrop` match the classic Menu. The default element is transparent and lets clicks through. Base UI's outside-press behavior still closes the menu. For a dark background use `slotProps={{ backdrop: { sx: { bgcolor: ... } } }}`. One difference: the backdrop renders only when you opt in. An unconditional backdrop gives non-modal menus a full-screen layer that they did not have, and modal menus already get Base UI's inert backdrop.                                                                                                                                                                                                                                       |
| Imperative actions              | Use Base UI's `actionsRef` as-is | It arrives with the inherited types and gives `close()` and `unmount()`. We do not rename it, and we do not build our own `action` ref. A new name moves our API away from Base UI for no benefit, and a new implementation repeats work. The classic `action.updatePosition()` has no equivalent, because the position updates automatically.                                                                                                                                                                                                                                                                                                                                                                           |
| Styling around submenu triggers | Do both                          | When a submenu is open, Base UI keeps focus-guard elements next to the trigger, because the tab order needs them. CSS that uses sibling selectors (`+`, `~`, `:last-child`) near a trigger then fails. We found this bug ourselves, so each part now controls its own spacing. We will document the rule, and the guards carry `data-base-ui-focus-guard`. We will also ask the Base UI team to move the guards outside the item list, which helps every Base UI user.                                                                                                                                                                                                                                                   |
| Theme API                       | Collapse it too                  | `MuiMenu2` and `MuiMenu2Submenu` are the only theme keys. `MuiMenu2` has the slots `root`, `backdrop`, `paper`, and `list`. `MuiMenu2Submenu` has `root`, `paper`, and `list`. Neither has a `trigger` slot, because the caller supplies the trigger element and themes that component. We removed `MuiMenu2Popup`, `MuiMenu2Trigger`, `MuiMenu2SubmenuPopup`, `MuiMenu2SubmenuTrigger`, and `MuiMenu2SubmenuRoot`. Each element keeps its own class hook, because CSS must still select the different nodes and their states. Autocomplete has the same division.                                                                                                                                                       |

### Open questions

1. **Context menu: does it need its own component?** Right-click menus work today with a virtual anchor, but the procedure has a focus bug. We found this bug ourselves. A menu with no trigger has no element for the return of focus, so Base UI uses the last element that it remembers. This element can be a trigger from a different menu on the page. The procedure must send `finalFocus` with the element that the user right-clicked, and the API does not tell you this. The result looks correct until a second menu exists. A component that wraps the Base UI `ContextMenu` corrects this internally, because its trigger is the right-click surface. Do we document the procedure, or do we release the component?
2. **Accessibility: what is still ours.** Base UI controls the roles, the keyboard behavior, the focus, and the dismissal. We control all the visual parts, and the remaining risk is there. Three concrete gaps:

   | Gap              | Status                                                                                                                |
   | :--------------- | :-------------------------------------------------------------------------------------------------------------------- |
   | Forced colors    | Closed. `enhanceHighContrast` controls the five item parts and the two indicators. It uses the `highlighted` state    |
   | Focus indicator  | Open. The highlight is a background tint (`action.focus`, approximately 1.3:1), and the native outline is not present |
   | Automated checks | Open. No test examines an open menu automatically                                                                     |

   The focus indicator is parity with the classic item, but it is less than the 3:1 ratio that [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) requires. The design team and the accessibility team must approve it. We must not inherit it. For the automated checks, axe runs only in the visual regression suite. That suite does not interact with the page, so it skips the menus page. `describeConformance` has no accessibility assertions.

3. **Other defaults.** We decided two defaults. A menu that a pointer opens highlights no item. A submenu opens on hover. Modality is not a question. The Base UI `modal` prop has the default value `true`, and the classic Menu is always modal. The benchmark measured the same scroll lock in both menus. The successor only adds the option to disable the modal behavior.
4. **SSR, `'use client'`, ref typing.**
   - **The directive.** All 18 modules contain `'use client'`, in the same position as the classic Menu. Base UI also includes the directive in its own menu modules. No test confirms that the directive works. The documentation site uses the Pages Router with `output: 'export'`, so it never evaluates a server component boundary. Only an App Router fixture can confirm the behavior.
   - **Server rendering.** We measured it, so it is not an open question. Only the trigger renders on the server. `defaultOpen` and `keepMounted` do not change this, because Base UI creates the portal node in a layout effect.
   - **Ref typing.** This is the real question. The refs come from Base UI and are wide (`HTMLElement`, `Element`). The classic `MenuItem` resolves to `HTMLLIElement` and follows the `component` prop. The conformance tests fix the runtime element, but the type stays wide. Do we make the type narrow for each part, or do we keep parity with the Base UI signatures?
5. **How much Base UI shows through.** `Menu2Props` extends `BaseMenu.Root.Props`, and the dependency is `^1.6.0`. Therefore a Base UI minor version can add public Menu props that do not pass our own API review. This is a problem for the rule that users do not need to know about Base UI, and for the `actionsRef` name that we keep from Base UI. Two options:
   - **A facade.** We put a Material UI facade over the root props and the callbacks.
   - **Inheritance.** We accept the inheritance, pin the exact version, and state clearly that the Base UI API is a part of the Material UI contract.

### Rollout plan

1. Behavior benchmark: **done**. The results are above.
2. Design phase for the API shape. We try the design in the companion experiment, then answer each question against a real preview.
3. Release `Unstable_Menu2` in a v9 minor version, with conformance tests, API docs, and demos on the Menu page.
4. Make changes from the feedback. Then make `Menu2` stable when it passes the graduation checklist.
5. Next major version: promote `Menu2` to `Menu`, rename the old component to `MenuLegacy`, and release the migration guide and the codemods.

### Appendix: full prop mapping

<details>
<summary>1. Open and close</summary>

| Classic Menu                       | New equivalent                     | Notes                                                                                                                                                              |
| :--------------------------------- | :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open` (required, controlled-only) | `open` + `defaultOpen`             | The uncontrolled mode is now possible.                                                                                                                             |
| `onClose(event, reason)`           | `onOpenChange(open, eventDetails)` | The reasons include `escape-key`, `outside-press`, `focus-out`, `trigger-press`, and `item-press`. You can cancel the change. The callback gives the native event. |
| n/a                                | `onOpenChangeComplete(open)`       | This prop replaces `onTransitionExited`.                                                                                                                           |

</details>

<details>
<summary>2. Positioning</summary>

| Classic Menu / Popover                                | New equivalent                                                                        | Notes                                              |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------- |
| `anchorEl`                                            | `anchor`                                                                              | It also accepts refs and virtual elements.         |
| `anchorOrigin` + `transformOrigin`                    | `side` + `align` + `sideOffset` + `alignOffset`                                       | The new props give more exact control.             |
| `anchorReference="anchorPosition"` + `anchorPosition` | `anchor={virtualElement}`                                                             | See open question 1.                               |
| `marginThreshold` (default 16)                        | `collisionPadding` (default 5)                                                        | The idea is the same.                              |
| `anchorReference="none"`                              | Omit `anchor` and set the position with CSS.                                          | The behavior is the same.                          |
| `action.updatePosition()`                             | automatic                                                                             | Use `disableAnchorTracking` to stop this behavior. |
| --                                                    | `collisionBoundary`, `sticky`, `collisionAvoidance`, `positionMethod`, `arrowPadding` | These props are new.                               |

</details>

<details>
<summary>3. Focus and modality</summary>

| Classic Menu                              | New equivalent | Notes                                                                                                                                                       |
| :---------------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoFocus`, `disableAutoFocusItem`       | internal       | If the user opens the menu with the keyboard, the menu highlights the first item. If the user opens the menu with the pointer, the menu highlights no item. |
| `variant` (`menu`/`selectedMenu`)         | dropped        | Base UI cannot do this (see above). Use checkbox items or radio items. Then the menu shows the current value at least.                                      |
| `disableAutoFocus`, `disableEnforceFocus` | dropped        | The `modal` prop covers this behavior.                                                                                                                      |
| `disableRestoreFocus`                     | `finalFocus`   | This prop sets an explicit focus target when the menu closes.                                                                                               |
| `disableEscapeKeyDown`                    | dropped        | This prop is against the menu pattern. Use `onKeyDown` if you need it.                                                                                      |
| `disableScrollLock`                       | removed        | `modal={false}` is not an equivalent. It also keeps the rest of the document interactive. The exact control is gone.                                        |
| `hideBackdrop`                            | backdrop slot  | You must add the backdrop yourself (see the decisions above).                                                                                               |
| `disablePortal`                           | dropped        | The menu always uses a portal.                                                                                                                              |
| `keepMounted`, `container`                | same           | The behavior is the same.                                                                                                                                   |

</details>

<details>
<summary>4. Transitions</summary>

| Classic Menu                                                        | New equivalent                                                    |
| :------------------------------------------------------------------ | :---------------------------------------------------------------- |
| `TransitionComponent` / `slots.transition` (default `Grow`)         | CSS with `data-starting-style` / `data-ending-style`              |
| `transitionDuration`                                                | CSS `transition-duration` on the popup                            |
| `onTransitionEnter` / `onTransitionExited` / `closeAfterTransition` | `onOpenChangeComplete` + `keepMounted`                            |
| default `Grow` animation                                            | We add this animation as a CSS default (see the decisions above). |

</details>

<details>
<summary>5. Styling and slots</summary>

| Classic Menu                                                               | New equivalent                                                       | Notes                                                         |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------ |
| `slots`: `root`, `paper`, `list`, `transition`, `backdrop`                 | `portal`, `positioner`, `popup`, `paper`, `list`, `backdrop`         | There is no transition slot. The transitions use CSS.         |
| `elevation` (default 8)                                                    | `elevation` (default 8, the component sends it to the Paper slot)    | We keep this prop.                                            |
| paper `maxHeight: calc(100% - 96px)` (the Modal clamps it to the viewport) | `min(calc(100vh - 96px), var(--available-height))` + internal scroll | The value reacts to collisions.                               |
| `slots.backdrop` + `BackdropProps`                                         | `slots.backdrop` + `slotProps.backdrop`                              | You must add the backdrop yourself (see the decisions above). |
| `PopoverClasses`                                                           | n/a                                                                  | The new component does not use a Popover.                     |

</details>

<details>
<summary>6. Item props</summary>

| Classic MenuItem / MenuList                                        | New equivalent                          | Notes                                                                                                                                                                                                                                                                                      |
| :----------------------------------------------------------------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dense`, `disableGutters`, `divider`                               | same                                    | We keep these props, because we control the presentation.                                                                                                                                                                                                                                  |
| `<Divider />` between items                                        | `Separator` part                        | The `Separator` part controls its own margins. The spacing does not move when a submenu is open.                                                                                                                                                                                           |
| `selected`                                                         | same (visual only)                      | We keep this prop. The checkbox items and the radio items give the real selection. The classic `MenuItem` now gets `aria-checked` from `selected` for the checkbox role and the radio role ([#48651](https://github.com/mui/material-ui/pull/48651)). Our dedicated items do this instead. |
| `disabled`                                                         | same                                    | The item gets `aria-disabled`. The item stays focusable.                                                                                                                                                                                                                                   |
| `href` / `LinkComponent`                                           | link item                               | The component renders a real `<a role="menuitem">`.                                                                                                                                                                                                                                        |
| `autoFocus` (item)                                                 | dropped                                 | The component controls the initial focus.                                                                                                                                                                                                                                                  |
| ripple props                                                       | none yet                                | See the decisions above.                                                                                                                                                                                                                                                                   |
| `focusVisibleClassName`, `onFocusVisible`, `action.focusVisible()` | `highlighted` class and data attributes | Set the style with CSS.                                                                                                                                                                                                                                                                    |
| `MenuList.disableListWrap`                                         | `loopFocus` (default true)              | The value is the inverse.                                                                                                                                                                                                                                                                  |
| `MenuList.autoFocus`/`autoFocusItem`/`variant`                     | dropped                                 | These props are internal or legacy.                                                                                                                                                                                                                                                        |
| `MenuList.disablePadding`, `subheader`                             | `slotProps.list`, group parts           | The groups get correct ARIA attributes.                                                                                                                                                                                                                                                    |

</details>

## Resources and benchmarks

Proof of concept and experiment:

- PoC: [#48663](https://github.com/mui/material-ui/pull/48663) ([demo](https://deploy-preview-48663--material-ui.netlify.app/experiments/menu-preview/))
- Companion playground: [#48823](https://github.com/mui/material-ui/pull/48823)
- Bundle impact on `@mui/material`: the current report on [#48823](https://github.com/mui/material-ui/pull/48823) shows +3.54 KB parsed and +685 B gzip. The earlier +77 B number came from the proof of concept, and is stale because we merged the collapsed components and the shared popup module after it. The user pays for the Base UI code only when the user imports the component.

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
- Menubar docs page that uses Base UI: [react-menubar](https://mui.com/material-ui/react-menubar/) (from [#47616](https://github.com/mui/material-ui/pull/47616))
- [Base UI Menu](https://base-ui.com/react/components/menu) and [releases](https://base-ui.com/react/overview/releases)
- Why the Base UI Menu has no `initialFocus`: [base-ui#2143](https://github.com/mui/base-ui/issues/2143)

Community workarounds:

- [material-ui-nested-menu-item](https://github.com/azmenak/material-ui-nested-menu-item) and `mui-nested-menu`
- [material-ui-popup-state](https://jcoreio.github.io/material-ui-popup-state/)
- [better-mui-menu](https://www.npmjs.com/package/better-mui-menu)
