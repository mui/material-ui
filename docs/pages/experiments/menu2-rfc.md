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

- It is one of our oldest requests. [#11723](https://github.com/mui/material-ui/issues/11723) is open since 2018 and has 120+ reactions.
- Material UI v0.x had nested menus ([#2148](https://github.com/mui/material-ui/pull/2148)). The v1 rewrite removed them.
- Community packages (`mui-nested-menu`, `material-ui-popup-state`, many sandboxes) have weak keyboard support and weak ARIA support. Maintainers report this problem many times.
- The Menubar docs page shows Base UI submenus as copy-paste code. Users then asked for a real component ([#48336](https://github.com/mui/material-ui/issues/48336)). Copy-paste code has no version, no tests, and no theme support.

We want submenus in `@mui/material` with Material visuals and full theme support. The current `Menu` must stay stable. The plan is to make the new component the default `Menu` in the next major version.

This RFC also sets the rules to build future Material UI components on Base UI: customization, style reuse, dependencies, tests, and tools. Menu is the first component. We intend the decisions here to apply to the other components.

## What are the requirements?

1. Correct menu behavior at every nesting level:
   - Trigger semantics.
   - RTL-aware arrow keys.
   - Escape that closes one level at a time.
   - Focus that returns to the parent item.
   - Typeahead per level.
   - Any nesting depth.
2. Good pointer behavior. A submenu must stay open while the pointer moves diagonally toward it (the "safe triangle"). The menu must also delay the hover-open. Earlier attempts failed to meet this requirement.
3. Collision-aware positioning: submenus flip at screen edges instead of being cut off.
4. The same look as the current `Menu`/`MenuItem`, and full theming: `sx`, `classes`, `component`, `slots`/`slotProps`, and theme `defaultProps`/`styleOverrides`/`variants`.
5. Near-zero cost for existing users. The current `Menu` continues to work. Apps that do not import the new component get no behavior change and none of Base UI's bundle cost. These apps pay a one-time cost, because the classic components now read the styles that the new components share. See the size numbers below.
6. Keep the current API where the new foundation permits it. Document the places where the new foundation does not permit it.
7. Add the other menu features that users request often, at the same time. Then we do not need to change the API later. These features are checkbox items, radio items, groups, hover-open, and context menus.
8. A clear path to become `Menu` in the next major version. Supply a migration guide and codemods, so early adopters keep a way forward.
9. Reuse a maintained library. Do not build focus, dismissal, and positioning again.
10. The component must look like any other Material UI component in tooling, theming, imports, and tests. Users do not need to know about Base UI, and they do not install anything extra.

## What are our options?

### Option A: Add submenus to the existing Menu

We tried three times in eight years. The same problems blocked each attempt:

- [#14700](https://github.com/mui/material-ui/pull/14700) (2019): a recursive Menu inside a Menu. We closed it with this note: "we need to change the menu implementation and to expose new objects to make it happen".
- [#20591](https://github.com/mui/material-ui/pull/20591) (2020-2022, +1333 lines, ~22 months of review): a `subMenu` prop on `MenuItem` that used `cloneElement`. Five problems blocked it. The gzip size of the core bundle increased by a double-digit percentage. Hover intent was incorrect. `Popover` had no collision handling. The tests needed many changes. A change to a core component before v5 was a risk. The final review rejected `cloneElement` and proposed a rebuild on headless primitives.
- [#37570](https://github.com/mui/material-ui/pull/37570) (2023-2024): a docs demo only. An accessibility review found problems in Escape handling, `aria-expanded`, and screen reader support. We closed it with this note: "it would make more sense to focus on bringing this to Base UI".

The problems are structural. Every open `Menu` is a full `Modal` (`Menu -> Popover -> Modal`). Two nested modals break in six places:

1. Each menu renders a full-screen backdrop that captures clicks. The backdrop of a submenu covers its parent. A click on the parent closes the child.
2. `ModalManager` sets `aria-hidden` on all elements except the top modal. Therefore, an open submenu hides the parent from screen readers.
3. ArrowRight and ArrowLeft do nothing in a vertical list. There is also no hook to open the submenu.
4. Each modal has its own focus trap. The focus traps do not coordinate when a submenu closes.
5. `Popover` does not flip on collision. Therefore, a submenu near the screen edge is cut off.
6. Each `MenuList` keeps its own keyboard state. Nested lists share no state.

A fix must change `Menu`, `MenuList`, `MenuItem`, `Popover`, `Modal`, `ModalManager`, and `FocusTrap`. It must also replace two core models: backdrop dismissal and per-modal focus traps. `Dialog` and every `Popover` also use these two models. This work rebuilds what the `Menu` of Base UI already does. The regression risk is high, and we discard the work in the next major version. Rejected.

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

This plan follows Grid (`Unstable_Grid2` -> `Grid2` -> `Grid`, old one renamed `GridLegacy`, [#45363](https://github.com/mui/material-ui/pull/45363)). Each rename breaks early adopters. But a codemod can do the rename, and we accepted this trade before. The `2` suffix makes a stable phase before the major release possible. A name without the suffix would collide with the `Menu` that we still release.

Only the directories, the subpaths, and the exports use the `Unstable_` prefix. The internal names are `Menu2*` and the theme keys are `MuiMenu2*`. Our lint rules require this, and it matches Grid2. Therefore the theme keys do not change in the `Unstable_Menu2` -> `Menu2` step. Only the final promotion to `Menu` renames them.

The imports follow our usual convention: flat names, one component for each subpath, and no short aliases such as `Root` or `Item`.

```jsx
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
```

The subpaths use default exports. Therefore adopters can remove the `Unstable_` prefix in their own code. Their JSX then looks like the future API. We add the barrel exports at graduation.

A checklist controls graduation. It is not a judgment call. The checklist has four items:

- The conformance suite passes, minus the documented skips.
- The theme registration is at parity.
- The `data-*` boundary is pinned.
- The design team approves.

### Rules for Base UI-backed components (Menu is the first)

The rule: a Base UI-backed component must look the same as any other Material UI component. Only the behavior below the surface is new.

Decided:

- **Customization:** `slots`/`slotProps`, the same as every other component. We use Base UI's `render` prop internally to inject our styled elements. The `render` prop is not the documented contract.
- **Slot plumbing:** reuse the `@mui/utils` helpers (`useSlotProps`, `mergeSlotProps`, `appendOwnerState`, `resolveComponentProps`). Do not write our own helpers. We did this in the experiment. Three Base UI-specific helpers remain, and they should move into the shared utilities. The first helper hides a Base UI part's own props when a plain element replaces a slot. The second helper connects Base UI's `className={(state) => string}` callbacks to our utility classes. The third helper infers `nativeButton` from the root slot.
- **Style reuse:** share the styled element itself through `render` where possible. If this is not possible, use a shared style function. Today the classic `Menu`/`MenuItem` and the new parts read the same style modules. Therefore there is one source of truth. Two regressions taught us to audit the shared styles for each consumer. The first regression was a `maxHeight: calc(100% - 96px)` value. This value meant "the viewport" inside the old Modal, but it did not mean this inside the new popup. The second regression was an `[item] + divider` margin. This margin broke when Base UI added focus-guard elements next to an open submenu trigger. Each part must control its own spacing. A part must not depend on sibling selectors.
- **Presentational props stay:** `dense`, `disableGutters`, `divider`, `selected`. We control presentation and Base UI controls behavior. The line is styling against behavior, not old against new. Therefore we can still decide each rarely-used prop separately.
- **Dependency:** `@base-ui/react` becomes a direct dependency of `@mui/material`, like `@popperjs/core`. Users never install or import it. There are two conditions. First, we review each version increase and we never auto-merge it. Second, the conformance tests pin the `data-*` attributes that we use. Therefore an upstream rename makes CI fail and does not break the styles silently.
- **Docs tooling:** the component adapts to our tooling. Our tooling does not adapt to the component.
- **Theme registration:** normal `defaultProps`/`styleOverrides`/`variants` for each part, under `MuiMenu2*` keys.

Still up for discussion:

- **Where styling state lives:** the `Mui-*` classes and `ownerState` stay the public contract for `styleOverrides`, `variants`, and `sx`. Internally we can read the Base UI `data-*` attributes for positional state. Tooltip already does this with `[data-popper-placement]`. The rule is simple. Each item that users theme gets a class. Internal positional state stays a data attribute.
- **Prop types:** extend Base UI's types and use `Omit` for the props that we hide or rename. Therefore we inherit new props automatically. As a result, the callbacks keep the Base UI signatures, for example `onOpenChange(open, eventDetails)` instead of `onClose(event, reason)`. This works in the experiment, but there is one limitation. Our proptypes generator cannot read types from `node_modules`. Therefore the runtime PropTypes cover only the props that we declare locally. This does not change the types. Production builds do not include the PropTypes. To teach the generator to follow external types is a separate infra task.
- **Testing:** reuse `describeConformance` for the Material UI contract. Also run the existing Menu behavior tests again against the successor, and add a note to each skip. Those suites must pass to show parity. Do not write new tests for the successor to show parity. All 14 rendering parts now run conformance. Therefore we deleted the manual theming and slots tests. Two adaptations can belong in the shared harness. First, portalled roots need a method to point the harness at the real root element. Second, the nested submenu popup mounts only with real layout. Therefore its suite runs in the browser project only.

### API shape (settled by review)

The review agreed on these rules. We do not make one global choice between a flat API and a compound API.

- The new API stays as near to today's `Menu` as the foundation permits.
- The wiring parts (Portal, Positioner, Popup, Paper, List) become one flat container. You configure this container with `slots`/`slotProps`.
- The parts that users change for each instance stay separate components. These parts are the items, the submenu triggers, the checkbox items, and the radio items.

Before the final decision on the shape, we had to know how much the behavior differs. A test next to the component now gives this benchmark (`Menu2Benchmark.test.tsx`). A real browser measures each row below. We do not read the rows from the source code.

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
| Backdrop element           | the menu renders it                                      | opt-in (see open question 4)             | **difference**              |
| Sibling content while open | `aria-hidden`                                            | it stays in the accessibility tree       | **difference**              |
| Default placement          | under the trigger, left aligned                          | under the trigger, left aligned          | same                        |

These results have this meaning. The successor is nearer to a drop-in replacement than we expected. The placement, the scroll lock, Escape, and Tab-closes-the-menu already match. We cannot compare directly how the two menus open with the keyboard, because the classic Menu has no trigger part. But both menus highlight an item, thus they agree in practice. Five differences stay:

- **Keep, they are accessibility fixes.** The disabled items stay focusable. The sibling content stays in the accessibility tree. Both behaviors follow the WAI-ARIA menu pattern. The classic behavior is the different one. The backdrop is also in this group. The menu no longer needs a backdrop to close, and a slot supplies the backdrop.
- **Decided: keep Base UI's behavior** for the initial focus when the user opens the menu with the pointer. The menu highlights no item. Thus Enter cannot start an item that the user did not select. Native desktop menus work in this way. This is a deliberate deviation from the APG. It is not a neutral choice. The [menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) says that focus moves to an item when the menu opens. The pattern makes no exception when the user opens the menu with the pointer. We match native desktop menus instead. We must release this deviation with documentation. To match the classic behavior, we must move focus to an item after the menu opens, because Base UI has no `initialFocus` prop on Menu. This works against the library and adds the risk of accidental activation again. This is a documented change for the users who migrate.
- **Document it.** Tell the user where focus goes after Tab. The classic Menu sends focus back to the trigger. The successor lets focus move to the next element. This is the usual function of the Tab key.

We drop `variant="selectedMenu"`. This is a lost feature, not a changed behavior. The prop opens the menu and highlights the current value. In the code, the prop selects which item gets the focus when the menu opens. The prop also hides the focus ring at that first moment. Base UI cannot do these two things. `Menu.Root` has no prop for the initial highlight, and `Menu.Popup` has no `initialFocus`. The radio items do not replace this feature. A `RadioGroup` with a checked second item still opens with the first item highlighted. The benchmark asserts this behavior.

This change also makes the pointer-focus difference above smaller, but it does not remove the difference. The classic Menu highlights an item on a pointer open with both variants.

Base UI does this deliberately. It is not a mistake. `initialFocus` exists on Base UI's Combobox, Dialog, Drawer, and Popover, but not on Menu. A maintainer gives the reason in [base-ui#2143](https://github.com/mui/base-ui/issues/2143): "Menu doesn't have the `initialFocus` prop (like Popover), because it's supposed to only contain menu items." The same thread recommends a different component for this case: "The `Menu` pattern is for listing a bunch of actions the user can take. The `Select` pattern is for choosing an option from a list of options." No open request asks for a change. Thus the answer is the boundary between the patterns, not a feature request to Base UI.

For the API shape, this result has two meanings. A flat container can give today's API. The migration is "the same component with a few documented behavior changes", not a rewrite.

The review settled the shape. The experiment started with a fully compound API, with one component for each Base UI part. Now there is one component for each menu, at the two levels. The root holds the trigger and the popup. A submenu has the same shape one level lower.

```jsx
<Menu2 trigger={<Button>Options</Button>} slotProps={{ paper: { elevation: 4 } }}>
  <Menu2Item onClick={handleCut}>Cut</Menu2Item>
  <Menu2Submenu trigger="Share">
    <Menu2Item>Email</Menu2Item>
    <Menu2Item>Copy link</Menu2Item>
  </Menu2Submenu>
</Menu2>
```

The trigger part and the popup part still exist, but they are internal. We export only their class hooks. Thus `styleOverrides` and `sx` do not change.

Three results come from this work:

- The root `trigger` takes an element. Base UI's `render` merges the behavior into that element. Thus the caller keeps their own component. Other content renders inside the default trigger.
- The submenu `trigger` takes content, not an element. This is the one place where the two levels cannot match. A submenu trigger is already a menu item. A `<Menu2Item>` in the `trigger` puts an item inside an item, and the submenu does not open.
- It is now more difficult to put a trigger in a `Tooltip`. The compound shape put the `Tooltip` directly around the element. Now the wrapper must move into the root slot of the trigger. This step needs a `forwardRef` component. The test suite and the recipes page both have this problem.

For the classic controlled pattern, omit `trigger` and control the menu with `open` and `anchor`. The context-menu recipe uses this pattern.

These behaviors are true for each shape that we select:

- The submenus open on hover by default, with a delay of 100ms and hover intent on close. This behavior is new when you compare it to the classic Menu. It matches native menus, and you can configure it.
- Escape closes the innermost submenu and moves focus back to its trigger. To close the full tree, you must select that option.
- If the user opens the menu with the pointer, the menu highlights no item. If the user opens the menu with the keyboard, the menu highlights the first item.
- When a submenu is open, Base UI puts focus-guard elements next to its trigger. See open question 7.
- The menu limits its height to the available space and scrolls inside itself. The old behavior used only the viewport for this limit.

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

- We renamed the components to the `Unstable_Menu2` lifecycle name, one component for each subpath.
- We removed the special cases in the docs tooling.
- The classic component and the successor share the same style modules.
- Composed list primitives still work inside the items. `ListItemText inset` aligns with the icon column. `inset` is a `ListItemText` prop, not a menu item prop, so we implemented nothing.
- The prop types inherit from Base UI. The roots get `actionsRef` and future props at no cost.
- Top-level `elevation` on the popup, default 8.
- A default open and close animation, and a backdrop slot that you opt in to.

Left:

- The components share styles at the style-function level. It is better to share the styled element itself where this fits.
- The slot helpers for Base UI should move into `@mui/utils`.
- We must still adapt the existing Menu behavior tests. The flat container was the blocker, and it now exists, so this task is next. The benchmark covers the open action, focus, disabled items, dismissal, scroll locking, backdrop treatment, and placement. The benchmark does not yet cover these areas: the default item close behavior, link items, checkbox and radio activation, controlled callback reasons, outside-pointer dismissal, hover and submenu timing, RTL submenu navigation, and context-menu focus.
- The `MenuItem` and `Select` part of the lifecycle is unanswered. See open question 13.

### Open questions

1. **Ripple.** The items are plain elements. Therefore the items have no ripple by default. Users can add a ripple today. They replace the item root with `slots={{ root: ButtonBase }}`. This gives a real ripple. But it removes our item styling, because that CSS is on the default root. A `ButtonBase` inside an item is not possible. It puts a focusable element inside a `menuitem`. This highlights the item when the menu opens ([base-ui#2622](https://github.com/mui/base-ui/issues/2622)). Base UI does not permit this pattern. So we must make a choice. Do we release a ripple by default? This makes the item root a styled `ButtonBase` and adds `disableRipple` again. Or do we leave the ripple to the root slot and document the procedure? This is a design decision. It has no effect on accessibility.
2. **Default animation. Decided: release one.** The popup has a CSS transition. The transition follows the classic `Grow`. It uses the same scale and the same theme durations. Thus applications that migrate keep their animation. But the two animations are not identical. The classic Menu sends `transitionDuration="auto"`. Then `Grow` calculates the duration from the height of the menu with `getAutoHeightDuration`. A CSS transition must use the fixed `enteringScreen`/`leavingScreen` values. Tall menus now animate more quickly than before. We must compare the two speeds before we complete this work. The transition stops when the user sets `prefers-reduced-motion`. Users can override the transition through `slotProps.popup`, `styleOverrides`, or the theme. The transition must be on the popup element. Base UI waits for the animations on that element before it removes the element. A transition on a child element stops when the menu closes. There is one practical effect. Code that measures the menu immediately after it opens reads the menu during the animation. Therefore tests must wait for the end of the transition.
3. **`elevation` prop. Decided: keep it.** The popup accepts `elevation` (default 8). The popup sends `elevation` to the Paper slot. Therefore the usual case does not need `slotProps.paper`.
4. **Backdrop. Decided: show it.** `slots.backdrop` and `slotProps.backdrop` are the same as in the classic Menu. The default element is transparent and lets clicks through. This is the same as the classic invisible backdrop. The outside-press behavior of Base UI continues to close the menu. To make the background dark, use `slotProps={{ backdrop: { sx: { bgcolor: ... } } }}`. There is one difference from the classic Menu. The backdrop renders only when you request it. If the backdrop always renders, non-modal menus get a full-screen layer that they did not have before. Also, modal menus already get the inert backdrop of Base UI.
5. **Imperative actions. Decided: use Base UI's `actionsRef` as-is.** `actionsRef` comes with the inherited types. It gives `close()` and `unmount()`. We do not rename it. We do not build our own `action` ref. A new name moves our API away from the Base UI API and gives no benefit. A new implementation repeats the work that Base UI already does. The classic `action.updatePosition()` has no equivalent, because the position updates automatically.
6. **Context menu: does it need its own component?** Right-click menus work today with a virtual anchor. But the procedure has a focus bug. We found this bug ourselves. A menu with no trigger has no element for the return of focus. Then Base UI uses the last element that it remembers. This element can be a trigger from a different menu on the page. The procedure must send `finalFocus` with the element that the user right-clicked. The API does not tell you this. The result looks correct until a second menu exists. A component that wraps the Base UI `ContextMenu` corrects this internally, because its trigger is the right-click surface. So we must make a choice. Do we document the procedure, or do we release the component?
7. **Styling around submenu triggers. Decided: do both.** When a submenu is open, Base UI keeps focus-guard elements adjacent to the trigger, because the tab order needs them. CSS that uses the sibling selectors (`+`, `~`, `:last-child`) near a trigger fails when a submenu opens. We found this bug ourselves. Now each of our parts controls its own spacing. We will document this rule. You can identify the guards with `data-base-ui-focus-guard`. We will also ask the Base UI team if the guards can go outside the item list. That change helps every Base UI user.
8. **Bundle size.** Base UI adds much weight to each component. Do we want a size check for each component that uses Base UI?
9. **Accessibility: what is still ours.** Base UI controls the roles, the keyboard behavior, the focus, and the dismissal. We control all the visual parts. The remaining risk is in the visual parts. There are three concrete gaps. We closed the forced-colors gap. `enhanceHighContrast` controls the five item parts and the two indicators. It uses the `highlighted` state. Two gaps are open. The highlight is a background tint (`action.focus`, approximately 1.3:1), and the native outline is not present. This is parity with the classic item. But it is less than the 3:1 ratio that [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) requires for a focus indicator. Therefore the design team and the accessibility team must approve it. We must not inherit it. Also, no test examines an open menu automatically. axe runs only in the visual regression suite. That suite does not interact with the page, and for this reason it skips the menus page. `describeConformance` has no accessibility assertions.
10. **Other defaults.** We decided two defaults. A menu that a pointer opens highlights no item. A submenu opens on hover. Modality is not a question. The Base UI `modal` prop has the default value `true`. The classic Menu is always modal. The benchmark measured the same scroll lock in both menus. The successor only adds the option to disable the modal behavior.
11. **SSR, `'use client'`, ref typing.** All 18 modules contain `'use client'`. We put the directive in the same position as the classic Menu. Base UI also includes the directive in its own menu modules. No test confirms that the directive works. The documentation site uses the Pages Router with `output: 'export'`. Therefore the site never evaluates a server component boundary. Only an App Router fixture can confirm the behavior. We measured the server rendering, so it is not an open question. Only the trigger renders on the server. `defaultOpen` and `keepMounted` do not change this, because Base UI creates the portal node in a layout effect. The real question is the ref typing. The refs come from Base UI and are wide (`HTMLElement`, `Element`). The classic `MenuItem` resolves to `HTMLLIElement` and follows the `component` prop. The conformance tests fix the runtime element, but the type stays wide. Do we make the type narrow for each part, or do we keep parity with the Base UI signatures?

12. **Theme API. Decided: collapse it too.** `MuiMenu2` and `MuiMenu2Submenu` are now the only theme keys. Each key carries `defaultProps`, `variants`, and `styleOverrides` for its slots. The menu slots are `root`, `trigger`, `backdrop`, `paper`, and `list`. The submenu slots are `root`, `trigger`, `paper`, and `list`. We removed `MuiMenu2Popup`, `MuiMenu2Trigger`, `MuiMenu2SubmenuPopup`, `MuiMenu2SubmenuTrigger`, and `MuiMenu2SubmenuRoot`. Therefore the parts are internal in the theme and in the JSX. Each element keeps its own class hook, because CSS must still select the different nodes and their states. Autocomplete has the same division between one theme key and the classes for each slot.
13. **`MenuItem` and `Select` in the lifecycle.** The rollout plan below covers `Menu2` -> `Menu` and classic `Menu` -> `MenuLegacy`. The plan says nothing about the items. `Select` renders a classic `Menu` with `MenuItem` as a listbox. Therefore the promotion must answer four questions. Does `Menu2Item` become `MenuItem`? Does today's `MenuItem` become `MenuItemLegacy`? What happens to the `MuiMenuItem` theme key? Does `Select` keep the legacy item, get a private listbox item, or get a new implementation first? This is the largest open gap in the migration plan.
14. **How much Base UI shows through.** `Menu2Props` extends `BaseMenu.Root.Props`, and the dependency is `^1.6.0`. Therefore a Base UI minor version can add public Menu props. These props do not pass our own API review. The runtime PropTypes stay incomplete, because the generator cannot read the types in `node_modules`. This is a problem for the rule that users do not need to know about Base UI. It is also a problem for the `actionsRef` name from Base UI. We have two options. We put a Material UI facade over the root props and the callbacks. Or we accept the inheritance, pin the exact version, and state clearly that the Base UI API is a part of the Material UI contract.

### Rollout plan

1. Behavior benchmark: **done**. The results are above.
2. Design phase for the API shape. We try the design in the companion experiment. Then we answer each question against a real preview.
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
| `anchorReference="anchorPosition"` + `anchorPosition` | `anchor={virtualElement}`                                                             | See open question 6.                               |
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
| `hideBackdrop`                            | backdrop slot  | You must add the backdrop yourself (open question 4).                                                                                                       |
| `disablePortal`                           | dropped        | The menu always uses a portal.                                                                                                                              |
| `keepMounted`, `container`                | same           | The behavior is the same.                                                                                                                                   |

</details>

<details>
<summary>4. Transitions</summary>

| Classic Menu                                                        | New equivalent                                            |
| :------------------------------------------------------------------ | :-------------------------------------------------------- |
| `TransitionComponent` / `slots.transition` (default `Grow`)         | CSS with `data-starting-style` / `data-ending-style`      |
| `transitionDuration`                                                | CSS `transition-duration` on the popup                    |
| `onTransitionEnter` / `onTransitionExited` / `closeAfterTransition` | `onOpenChangeComplete` + `keepMounted`                    |
| default `Grow` animation                                            | We add this animation as a CSS default (open question 2). |

</details>

<details>
<summary>5. Styling and slots</summary>

| Classic Menu                                                               | New equivalent                                                       | Notes                                                 |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------- | :---------------------------------------------------- |
| `slots`: `root`, `paper`, `list`, `transition`, `backdrop`                 | `portal`, `positioner`, `popup`, `paper`, `list`, `backdrop`         | There is no transition slot. The transitions use CSS. |
| `elevation` (default 8)                                                    | `elevation` (default 8, the component sends it to the Paper slot)    | We keep this prop.                                    |
| paper `maxHeight: calc(100% - 96px)` (the Modal clamps it to the viewport) | `min(calc(100vh - 96px), var(--available-height))` + internal scroll | The value reacts to collisions.                       |
| `slots.backdrop` + `BackdropProps`                                         | `slots.backdrop` + `slotProps.backdrop`                              | You must add the backdrop yourself (open question 4). |
| `PopoverClasses`                                                           | n/a                                                                  | The new component does not use a Popover.             |

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
| ripple props                                                       | none yet                                | See open question 1.                                                                                                                                                                                                                                                                       |
| `focusVisibleClassName`, `onFocusVisible`, `action.focusVisible()` | `highlighted` class and data attributes | Set the style with CSS.                                                                                                                                                                                                                                                                    |
| `MenuList.disableListWrap`                                         | `loopFocus` (default true)              | The value is the inverse.                                                                                                                                                                                                                                                                  |
| `MenuList.autoFocus`/`autoFocusItem`/`variant`                     | dropped                                 | These props are internal or legacy.                                                                                                                                                                                                                                                        |
| `MenuList.disablePadding`, `subheader`                             | `slotProps.list`, group parts           | The groups get correct ARIA attributes.                                                                                                                                                                                                                                                    |

</details>
## Resources and benchmarks

Proof of concept and experiment:

- PoC: [#48663](https://github.com/mui/material-ui/pull/48663) ([demo](https://deploy-preview-48663--material-ui.netlify.app/experiments/menu-preview/))
- Companion playground: [#48823](https://github.com/mui/material-ui/pull/48823)
- Bundle impact on `@mui/material`: the current report on [#48823](https://github.com/mui/material-ui/pull/48823) shows +3.54 KB parsed and +685 B gzip. The earlier +77 B number came from the proof of concept. That number is stale, because we merged the collapsed components and the shared popup module after it. The user pays for the Base UI code only when the user imports the component.

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
