# Upgrade to Menu v2

<p class="description">Move a menu from the Menu component to Menu v2: what to change, what behaves differently, and why.</p>

## Menu v2 status

Menu v2 is an unstable component in Material UI v9.
Import it from the `Unstable_Menu2` subpaths.
Its API can change in a minor release.

The current Menu isn't deprecated and keeps working unchanged.
You can adopt Menu v2 one menu at a time and use both components in the same app.

## Why you should upgrade

Menu v2 provides the following improvements over Menu:

- **Submenus** at any nesting depth, with correct keyboard, hover, and ARIA behavior.
  This was [one of the most requested Menu features since 2018](https://github.com/mui/material-ui/issues/11723), and the current Menu can't support it.
- **Checkbox and radio items** with the correct roles, `aria-checked`, and built-in indicators.
- **Groups with labels**, connected with `aria-labelledby`.
- **A trigger component** that sets `aria-haspopup`, `aria-expanded`, and `aria-controls`, so there's no anchor state to manage.
- **Collision-aware positioning** that flips and follows the anchor automatically.
- **Accessibility fixes** that the current Menu can't make without breaking existing behavior.
  See [Behavior changes](#behavior-changes).

### Why it's a new component

Every open Menu is a full `Modal` (`Menu` → `Popover` → `Modal`), and nesting one modal inside another breaks in six places:

1. **Backdrop.** Each menu renders a full-screen backdrop that captures clicks.
   A submenu's backdrop covers its parent, so clicking the parent closes the child.
2. **`aria-hidden`.** `ModalManager` applies it to everything except the topmost modal, so an open submenu hides its parent from screen readers.
3. **Keys.** ArrowRight and ArrowLeft do nothing in a vertical list, and there's no hook to open a submenu.
4. **Focus.** Each modal has its own focus trap, and the traps don't coordinate when a submenu closes.
5. **Collision.** `Popover` doesn't flip, so a submenu near the edge of the screen is clipped.
6. **State.** Each `MenuList` keeps its own keyboard state, and nested lists share none of it.

Fixing this in place means rewriting `Menu`, `MenuList`, `MenuItem`, `Popover`, `Modal`, `ModalManager`, and `FocusTrap`.
It also means replacing two models that `Dialog` and every `Popover` depend on: backdrop dismissal and per-modal focus traps.
Three attempts along those lines were abandoned ([#14700](https://github.com/mui/material-ui/pull/14700), [#20591](https://github.com/mui/material-ui/pull/20591), [#37570](https://github.com/mui/material-ui/pull/37570)).

Menu v2 uses [Base UI](https://base-ui.com/react/components/menu) instead, which already solves the behavior.
Base UI is a dependency of `@mui/material`, the same as `@popperjs/core`.
You don't install or import it, and apps that don't import Menu v2 don't bundle it.

## How to upgrade

### Static menu lists

For an always-visible `MenuList` inside `Paper`, keep `@mui/material/MenuList` and `@mui/material/MenuItem`.
Menu v2 has no standalone list component.
This also applies to the static list in [Menu List composition](/material-ui/react-menu/#composition-with-menu-list).

To change a static list into a popup, put `MenuTrigger` and `MenuPopup` inside `Menu`.
`MenuPopup` replaces the `Paper` and `MenuList` wrapper.
Then migrate the items as described below.
Omitting `MenuTrigger` does not make Menu v2 a static list; `MenuPopup` still renders a positioned popup in a portal.

### Context menus

Menu v2 doesn't support context menus.
A separate component will cover them with the correct accessibility behavior.
Until then, keep using Menu for context menus, as in the [Context menu](/material-ui/react-menu/#context-menu) demo.

### 1. Update the imports

Each part is the default export of its own subpath:

```diff
-import Menu from '@mui/material/Menu';
-import MenuItem from '@mui/material/MenuItem';
+import Menu from '@mui/material/Unstable_Menu2';
+import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
+import MenuPopup from '@mui/material/Unstable_Menu2Popup';
+import MenuItem from '@mui/material/Unstable_Menu2Item';
```

The examples use `Menu`, `MenuItem`, and similar local names for the Menu v2 components imported from the `Unstable_Menu2` subpaths.

### 2. Replace the anchor state with a trigger

`Menu` owns state and behavior, `MenuTrigger` connects the button, and `MenuPopup` contains the items.
The anchor state and ARIA wiring go away:

```diff
-const [anchorEl, setAnchorEl] = React.useState(null);
-const open = Boolean(anchorEl);
-
-<Button
-  id="basic-button"
-  aria-controls={open ? 'basic-menu' : undefined}
-  aria-haspopup="true"
-  aria-expanded={open}
-  onClick={(event) => setAnchorEl(event.currentTarget)}
->
-  Dashboard
-</Button>
-<Menu
-  id="basic-menu"
-  anchorEl={anchorEl}
-  open={open}
-  onClose={() => setAnchorEl(null)}
-  slotProps={{ list: { 'aria-labelledby': 'basic-button' } }}
->
-  <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
-</Menu>
+<Menu>
+  <MenuTrigger><Button>Dashboard</Button></MenuTrigger>
+  <MenuPopup>
+    <MenuItem>Profile</MenuItem>
+  </MenuPopup>
+</Menu>
```

Selecting a `MenuItem` closes the menu by default, so its `onClick={handleClose}` is no longer necessary.
Set `closeOnClick={false}` on a `MenuItem` to keep the menu open.

`MenuCheckboxItem`, `MenuRadioItem`, and `MenuLinkItem` keep the menu open by default.
Set `closeOnClick` on these items to close the menu after selection.

`MenuTrigger` takes one element as its child and merges the trigger behavior into it, so you keep your own component:

```jsx
<MenuTrigger>
  <IconButton aria-label="More actions">
    <MoreVertIcon />
  </IconButton>
</MenuTrigger>
```

There's no default trigger, so the element is always yours.
Three things to watch:

- Forward props and ref from a wrapper component to the element it renders, the same as with `Tooltip`.
  Menu v2 merges the behavior through props, so a component that drops them doesn't open the menu.
- Set `nativeButton={false}` on `MenuTrigger` when the element doesn't render a native `<button>`.
- Use `MenuSubmenuTrigger` to open a submenu, not a button.
  See [Submenu](/material-ui/react-menu2/#submenu).

To control the open state, keep `MenuTrigger` and pass `open` and `onOpenChange` to `Menu`.
See [Controlled menu](/material-ui/react-menu2/#controlled-menu).
To keep the `anchorEl` pattern, omit `MenuTrigger` and pass `anchor` to `MenuPopup`.
See [Without a trigger](/material-ui/react-menu2/#without-a-trigger).

### 3. Update the open and close props

`onOpenChange` replaces `onClose`, and `open` becomes optional:

```diff
-<Menu open={open} onClose={handleClose}>
+<Menu open={open} onOpenChange={handleOpenChange}>
```

| Menu                               | Menu v2                            | Notes                                                                              |
| :--------------------------------- | :--------------------------------- | :--------------------------------------------------------------------------------- |
| `open` (required, controlled only) | `open` + `defaultOpen`             | Uncontrolled mode is now possible.                                                 |
| `onClose(event, reason)`           | `onOpenChange(open, eventDetails)` | Fires for opening and closing. Call `eventDetails.cancel()` to prevent the change. |

Update any checks of the close reason:

| Menu `onClose` reason                                  | Menu v2 `eventDetails.reason` |
| :----------------------------------------------------- | :---------------------------- |
| `escapeKeyDown`                                        | `escape-key`                  |
| `backdropClick`                                        | `outside-press`               |
| `tabKeyDown`                                           | `focus-out`                   |
| No reason; an item's `onClick` handler closed the menu | `item-press`                  |

The `trigger-press` reason can report either opening or closing.
Check the `open` argument before you run close-only logic.

Tab dismissal reports `focus-out` because focus leaves the menu.
Other focus changes can report this reason too.
Its `eventDetails.event` is a native `FocusEvent`, not a keyboard event.

### 4. Update the positioning props

`side` and `align` on `MenuPopup`, with offsets, replace `anchorOrigin` and `transformOrigin`:

```diff
-<Menu
-  anchorEl={anchorEl}
-  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
-  transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
->
+<MenuPopup side="top" align="end">
```

`MenuPopup` uses the `MenuTrigger` element as its anchor.
Pass `anchor` only when you omit `MenuTrigger`.

| Menu / Popover                                        | Menu v2                                                               | Notes                                                                                                        |
| :---------------------------------------------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `anchorEl`                                            | `anchor`                                                              | Also accepts refs and virtual elements.                                                                      |
| `anchorOrigin` + `transformOrigin`                    | `side` + `align` + `sideOffset` + `alignOffset`                       | Defaults are `side="bottom"` and `align="start"`.                                                            |
| Both origins at `top` / `left`                        | `side="bottom"`, `align="start"`, negative `sideOffset`               | See "Place the menu over its trigger" below.                                                                 |
| `anchorReference="anchorPosition"` + `anchorPosition` | `anchor={virtualElement}`                                             | Give the virtual element the position that you want. For context menus, see [Context menus](#context-menus). |
| `anchorReference="none"`                              | No direct equivalent                                                  | Omitting `anchor` uses the trigger. Pass a virtual `anchor` at the position that you want.                   |
| `marginThreshold` (default 16)                        | `collisionPadding` (default 5)                                        | Same idea.                                                                                                   |
| `action.updatePosition()`                             | Automatic                                                             | Use `disableAnchorTracking` to stop tracking layout shifts. `actionsRef` provides `close()` and `unmount()`. |
| `PopoverClasses`                                      | Removed                                                               | Menu v2 doesn't use `Popover`.                                                                               |
| —                                                     | `collisionBoundary`, `sticky`, `collisionAvoidance`, `positionMethod` | New props.                                                                                                   |

Use the logical `inline-start` and `inline-end` sides to get the correct direction in right-to-left text.

#### Place the menu over its trigger

The classic [Positioned menu](/material-ui/react-menu/#positioned-menu) demo sets both origins to `top` / `left`, so the menu covers its trigger.
Use the anchor height to move Menu v2 up by the same distance:

```jsx
<Menu>
  <MenuTrigger>
    <Button>Options</Button>
  </MenuTrigger>
  <MenuPopup side="bottom" align="start" sideOffset={({ anchor }) => -anchor.height}>
    <MenuItem>Profile</MenuItem>
  </MenuPopup>
</Menu>
```

This matches the resting position in left-to-right text, not the animation origin.
Use `align="end"` in right-to-left text to keep physical left alignment.
Collision handling can still move the popup near viewport edges.

### 5. Check the transition

`MenuPopup` keeps `Grow` as the default transition, with the same height-dependent `transitionDuration="auto"`.
Move transition props to `MenuPopup`; keep `onOpenChangeComplete` on `Menu`.

| Menu                                          | Menu v2                                 | Notes                                                                                    |
| :-------------------------------------------- | :-------------------------------------- | :--------------------------------------------------------------------------------------- |
| `slots.transition` (default `Grow`)           | `slots.transition` (default `Grow`)     | Set it to `null` to animate with CSS.                                                    |
| `slotProps.transition`                        | `slotProps.transition`                  | Base UI controls `in`, `appear`, `mountOnEnter`, `unmountOnExit`, and the unmount.       |
| `transitionDuration` (default `'auto'`)       | `transitionDuration` (default `'auto'`) | Unchanged.                                                                               |
| `slotProps.transition.onEntered` / `onExited` | `onOpenChangeComplete(open)`            | Fires after the animation, with `true` after the menu opens and `false` after it closes. |

With `slots.transition` set to `null`, the menu surface has the `data-starting-style` and `data-ending-style` attributes for CSS animations.
See [Transitions](/material-ui/react-menu2/#transitions).

### 6. Update the items

Separators, groups, links, and checked items become dedicated parts:

| Menu                                                               | Menu v2                            | Notes                                                                                                      |
| :----------------------------------------------------------------- | :--------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `dense`, `disableGutters`, `divider`                               | Same                               | Unchanged.                                                                                                 |
| `disabled`                                                         | Same on supported item parts       | Disabled items stay focusable. `MenuLinkItem` does not support this prop.                                  |
| `disableRipple`                                                    | Same                               | The item root is a `ButtonBase`, so items ripple as before.                                                |
| `selected`                                                         | Removed                            | Use checkbox or radio items for checked state.                                                             |
| `<Divider />` between items                                        | `MenuSeparator`                    | Controls its own margins.                                                                                  |
| `ListSubheader`                                                    | `MenuGroup` + `MenuGroupLabel`     | Adds the correct ARIA relationship.                                                                        |
| `href` / `LinkComponent`                                           | `MenuLinkItem`                     | Renders a real `<a role="menuitem">`.                                                                      |
| `role="menuitemcheckbox"` + `selected`                             | `MenuCheckboxItem`                 | Reports changes through `onCheckedChange(checked, eventDetails)`.                                          |
| `role="menuitemradio"` + `selected`                                | `MenuRadioGroup` + `MenuRadioItem` | Reports changes through `onValueChange(value, eventDetails)`.                                              |
| `focusVisibleClassName`, `onFocusVisible`, `action.focusVisible()` | No dedicated equivalents           | Use state classes for styles. `highlighted` includes pointer navigation; it is not keyboard focus-visible. |
| `MenuList.disableListWrap`                                         | `loopFocus` (default `true`)       | The value is inverted.                                                                                     |
| `MenuList.disabledItemsFocusable`                                  | No equivalent                      | Disabled items stay focusable with arrow keys, but cannot be activated.                                    |
| `MenuList.dense`, `MenuList.disablePadding`                        | `slotProps.list`                   | The `list` slot is a `List`, so the props are unchanged.                                                   |

The item and `MenuList` focus props are listed under [Check the removed props](#8-check-the-removed-props).

Composed list primitives still work inside items, so `ListItemIcon`, `ListItemText`, and `Typography` carry over unchanged.
`ListItemText inset` still aligns with the icon column.

Checkbox items and radio groups report the new checked state or value in the first callback argument.
The event at `eventDetails.event` is native, not a React synthetic event.
Its target can be a descendant of the item.

### 7. Update the theme keys

Menu v2 registers separate theme keys for behavior and presentation.
`MuiMenu2`, `MuiMenu2Trigger`, and `MuiMenu2Submenu` support behavioral `defaultProps`, but no style overrides or variants.
`MuiMenu2Popup` has the slots `root`, `portal`, `positioner`, `backdrop`, and `list`.
`MuiMenu2SubmenuPopup` has `root`, `portal`, `positioner`, and `list`.
The item parts have their own keys, such as `MuiMenu2Item`.

`MuiMenu2Popup` styles also apply to the matching submenu popup slots.
`MuiMenu2Item` styles apply to all item roots.
Component-specific overrides apply after the shared styles.
This includes theme variants, but not `defaultProps`.
Utility classes remain component-specific.

The CSS classes use the same component names as the theme keys:

| Menu class       | Menu v2 class           | Submenu class                  |
| :--------------- | :---------------------- | :----------------------------- |
| `.MuiMenu-root`  | `.MuiMenu2Popup-portal` | `.MuiMenu2SubmenuPopup-portal` |
| `.MuiMenu-paper` | `.MuiMenu2Popup-root`   | `.MuiMenu2SubmenuPopup-root`   |
| `.MuiMenu-list`  | `.MuiMenu2Popup-list`   | `.MuiMenu2SubmenuPopup-list`   |

For example, change an `& .MuiMenu-list` selector to `& .MuiMenu2Popup-list`.
The `menu2PopupClasses` and `menu2SubmenuPopupClasses` exports provide these class names from `@mui/material/Unstable_Menu2Popup` and `@mui/material/Unstable_Menu2SubmenuPopup`.

The supplied trigger element owns its styles.
Theme its component, or style the `.MuiMenu2Trigger-root` class.

```diff
 const theme = createTheme({
   components: {
-    MuiMenu: {
-      styleOverrides: { paper: { borderRadius: 12 } },
-    },
-    MuiMenuItem: {
-      styleOverrides: { root: { fontWeight: 500 } },
-    },
+    MuiMenu2Popup: {
+      styleOverrides: { root: { borderRadius: 12 } },
+    },
+    MuiMenu2Item: {
+      styleOverrides: { root: { fontWeight: 500 } },
+    },
   },
 });
```

Each rendered part has its own class, such as `.MuiMenu2Item-root`, so `sx` and `styleOverrides` can reach it.

Use `slots` and `slotProps` on the popup to customize these elements and the `transition` slot.
There's no `trigger` slot: put trigger props on `MenuTrigger`.
`elevation` is a `MenuPopup` prop for its Paper root, with the default 8.

`Menu` and `MenuSubmenu` render no DOM element. They have no DOM ref, `sx`, or slots.
On the popup, `ref`, `className`, `style`, `sx`, event handlers, and HTML attributes target the menu surface.
Use `slotProps.portal` to set the stacking level for both the menu and its modal interaction layer.
Use `slotProps.positioner` for styles, placement attributes, and the ref on the positioned element.
The popup's positioning props such as `side` and `align` target that element.

The popup's `root` slot is the menu surface, not the portal.

:::warning
Move menu naming attributes from `slotProps.list` to `MenuPopup` or its `slotProps.root`.
The list is now presentational.
:::

### 8. Check the removed props

| Removed                                                                                  | What to do instead                                                                                                                                             |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant="selectedMenu"`, `autoFocus`, `disableAutoFocusItem`                            | Use checkbox or radio items to show a current value. The component controls the initial highlight.                                                             |
| `MenuItem.autoFocus`, `MenuList.autoFocus`, `MenuList.autoFocusItem`, `MenuList.variant` | The component controls the initial highlight.                                                                                                                  |
| `disableAutoFocus`, `disableEnforceFocus`                                                | No independent equivalents. `modal` controls outside interaction, not the initial focus policy.                                                                |
| `disableRestoreFocus`                                                                    | Use `finalFocus={false}` to disable focus restoration.                                                                                                         |
| `disableScrollLock`                                                                      | Use `modal={false}`, which also keeps the rest of the document interactive. There's no exact equivalent.                                                       |
| `disablePortal`                                                                          | No equivalent. Menu v2 always renders in a portal. Use `container` on `MenuPopup` to choose the portal container. See [Portal containers](#portal-containers). |
| `hideBackdrop`                                                                           | Use `slots={{ backdrop: null }}` to omit the optional visual layer. This does not change modal behavior.                                                       |

## Behavior changes

These changes are intentional and mostly bring the menu in line with the [WAI-ARIA menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).

| Behavior               | Menu                                            | Menu v2                                                                     |
| :--------------------- | :---------------------------------------------- | :-------------------------------------------------------------------------- |
| Opened with a pointer  | Highlights the selected item, or the first item | Highlights nothing, so Enter can't fire an unintended item                  |
| Opened with a keyboard | Highlights an item                              | Highlights the first enabled item; ArrowUp highlights the last enabled item |
| Disabled items         | Skipped by the keyboard by default              | Focusable, and announced as disabled                                        |
| Sibling content        | Hidden from screen readers with `aria-hidden`   | Stays in the accessibility tree                                             |
| Backdrop               | Rendered by default                             | Internal modal layer; optional visual backdrop slot                         |
| Tab while open         | Closes, and focus returns to the trigger        | Closes, and focus moves to the next element                                 |
| Escape at the root     | Closes                                          | Closes                                                                      |
| Default placement      | Below the trigger, aligned to the start         | Below the trigger, aligned to the start                                     |
| Submenus               | Not supported                                   | Open on mouse hover after 100 ms, touch tap, or keyboard activation         |

A mouse click on a submenu trigger does not bypass the hover delay.
Set `openOnHover={false}` on `MenuSubmenuTrigger` to disable hover opening and open with a mouse click instead.
Touch taps and keyboard activation remain available.
See [Submenu](/material-ui/react-menu2/#submenu).

### Backdrop

Base UI supplies a transparent backdrop for modal interaction, except when the menu opens on hover.
The separate visual backdrop is absent by default.
Set `slots.backdrop` or `slotProps.backdrop` on `MenuPopup` to render it.
This optional layer is not hidden on hover.

### Scroll locking

`modal` defaults to `true`, which locks page scrolling for a menu opened by a mouse or keyboard.
Menus opened by hover are non-modal.
On touch devices, the menu blocks outside taps, but page scrolling can stay available unless the popup spans nearly the full viewport width.

### Retained menus in dialogs

A `MenuPopup` with `keepMounted` inside a kept-mounted Material UI Dialog can remain under `aria-hidden="true"` with the default portal container.
The visible menu can then be hidden from assistive technology.
[Base UI issue #5577](https://github.com/mui/base-ui/issues/5577) describes a related portal limitation, not this exact composition.

:::warning
Leave `keepMounted` disabled on `MenuPopup` inside a kept-mounted Dialog.
:::

### Portal containers

With `defaultOpen` or `keepMounted`, `MenuPopup` can read a `container` ref before its element is attached.
The menu then renders in `document.body` instead of the container.
Keep the container element in state with a callback ref, and pass that element to `container`.
While the value is `null`, the portal waits.

```jsx
const [container, setContainer] = React.useState(null);

<div ref={setContainer}>
  <Menu defaultOpen>
    <MenuTrigger>
      <Button>Options</Button>
    </MenuTrigger>
    <MenuPopup container={container}>
      <MenuItem>Profile</MenuItem>
    </MenuPopup>
  </Menu>
</div>;
```

### The initial highlight

This is the change your users are most likely to notice.
When they open a menu with a pointer, Menu v2 highlights nothing, so pressing Enter can't activate an item they didn't choose.
Native desktop menus behave this way.

This is a deliberate deviation from the ARIA Authoring Practices Guide (APG), which says that focus moves to an item when the menu opens, with no exception for pointer opens.
There's no prop to restore the classic behavior: `Menu.Root` in Base UI has no initial-highlight prop and `Menu.Popup` has no `initialFocus`.
See the [Base UI discussion on initial focus](https://github.com/mui/base-ui/issues/2143) for the reasoning.

### The selectedMenu variant is gone

This is a lost feature rather than a changed one.
`variant="selectedMenu"` selected which item took focus when the menu opened and hid the focus ring at that first moment.
The new foundation can't express either behavior.

Radio items are the closest replacement, because they show the current value.
They don't control the initial highlight: Enter, Space, and ArrowDown highlight the first enabled item, even if another item is checked.

### Styling around triggers

While a menu or a submenu is open, Base UI renders hidden `span` elements next to its trigger.
They keep the tab order and the accessibility tree correct.
The focus guards among them have a `data-base-ui-focus-guard` attribute.

:::warning
CSS sibling selectors (`+`, `~`, `:last-child`) near a trigger can match these hidden elements.
Style each part directly instead.
:::

For menus directly inside a `Stack`, set `useFlexGap` to use CSS gap instead of sibling margins.
This prevents the trigger from moving when a focus guard is inserted before it.

### Menu height

The classic Menu limits its height to the viewport minus 96px.
Menu v2 keeps this limit, and also limits the height to the space available at the anchor, so the value reacts to collisions.
