# Upgrade to Menu v2

<p class="description">This guide explains how and why to migrate from the Menu component to Menu v2.</p>

## Menu v2 status

Menu v2 is an unstable component in Material UI v9. Import it from the `Unstable_Menu2` subpaths. Its API can change in a minor release.

The current Menu isn't deprecated and keeps working unchanged. You can adopt Menu v2 one menu at a time, and both components can be used in the same app.

## Why you should upgrade

Menu v2 provides the following improvements over Menu:

- **Submenus** at any nesting depth, with correct keyboard, hover, and ARIA behavior. This was [the most requested Menu feature since 2018](https://github.com/mui/material-ui/issues/11723), and the current Menu can't support it.
- **Checkbox and radio items** with the correct roles, `aria-checked`, and built-in indicators.
- **Groups with labels**, connected with `aria-labelledby`.
- **A trigger prop** that sets `aria-haspopup`, `aria-expanded`, and `aria-controls`, so there's no anchor state to manage.
- **Collision-aware positioning** that flips and follows the anchor automatically.
- **Accessibility fixes** that the current Menu can't make without breaking existing behavior. See [Behavior changes](#behavior-changes).

### Why it's a new component

Every open Menu is a full `Modal` (`Menu` → `Popover` → `Modal`), and nesting one modal inside another breaks in six places:

1. **Backdrop.** Each menu renders a full-screen backdrop that captures clicks. A submenu's backdrop covers its parent, so clicking the parent closes the child.
2. **`aria-hidden`.** `ModalManager` applies it to everything except the topmost modal, so an open submenu hides its parent from screen readers.
3. **Keys.** ArrowRight and ArrowLeft do nothing in a vertical list, and there's no hook to open a submenu.
4. **Focus.** Each modal has its own focus trap, and the traps don't coordinate when a submenu closes.
5. **Collision.** `Popover` doesn't flip, so a submenu near the edge of the screen is clipped.
6. **State.** Each `MenuList` keeps its own keyboard state, and nested lists share none of it.

Fixing this in place means rewriting `Menu`, `MenuList`, `MenuItem`, `Popover`, `Modal`, `ModalManager`, and `FocusTrap`, and replacing two models that `Dialog` and every `Popover` depend on: backdrop dismissal and per-modal focus traps. Three attempts along those lines were abandoned ([#14700](https://github.com/mui/material-ui/pull/14700), [#20591](https://github.com/mui/material-ui/pull/20591), [#37570](https://github.com/mui/material-ui/pull/37570)).

Menu v2 uses [Base UI](https://base-ui.com/react/components/menu) instead, which already solves the behavior. Base UI is a dependency of `@mui/material`, the same as `@popperjs/core`. You don't install or import it, and apps that don't import Menu v2 don't bundle it.

## How to upgrade

### 1. Update the imports

Each part is the default export of its own subpath:

```diff
-import Menu from '@mui/material/Menu';
-import MenuItem from '@mui/material/MenuItem';
+import Menu2 from '@mui/material/Unstable_Menu2';
+import Menu2Item from '@mui/material/Unstable_Menu2Item';
```

### 2. Replace the anchor state with a trigger

The trigger is part of the component now, so the anchor state and the ARIA wiring go away:

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
+<Menu2 trigger={<Button>Dashboard</Button>}>
+  <Menu2Item>Profile</Menu2Item>
+</Menu2>
```

Selecting an item closes the menu by default, so the `onClick={handleClose}` on every item is no longer necessary. Set `closeOnClick={false}` on an item to keep the menu open.

`trigger` takes an element, and Menu v2 merges the trigger behavior into it, so you keep your own component:

```jsx
<Menu2 trigger={<IconButton aria-label="More actions"><MoreVertIcon /></IconButton>}>
```

There's no default trigger, so the element is always yours. Three things to watch:

- A wrapper used as a trigger must forward props and ref to the element that it renders, the same as `Tooltip`. Menu v2 merges the behavior through props, so a component that drops them doesn't open the menu.
- Set `slotProps.trigger.nativeButton` to `false` when the element doesn't render a native `<button>`.
- A submenu opens from a `Menu2SubmenuTrigger`, not from a button. See [Submenu](/material-ui/react-menu2/#submenu).

To control the open state, keep `trigger` and pass `open` and `onOpenChange`. See [Controlled menu](/material-ui/react-menu2/#controlled-menu). To keep the `anchorEl` pattern, omit `trigger` and pass `anchor`. See [Without a trigger](/material-ui/react-menu2/#without-a-trigger).

### 3. Update the open and close props

```diff
-<Menu open={open} onClose={handleClose}>
+<Menu2 open={open} onOpenChange={handleOpenChange}>
```

| Menu                               | Menu v2                            | Notes                                                                                                                                                                             |
| :--------------------------------- | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open` (required, controlled only) | `open` + `defaultOpen`             | Uncontrolled mode is now possible.                                                                                                                                                |
| `onClose(event, reason)`           | `onOpenChange(open, eventDetails)` | Fires for opening and closing. Reasons include `trigger-press`, `item-press`, `escape-key`, `outside-press`, and `focus-out`. Call `eventDetails.cancel()` to prevent the change. |

### 4. Update the positioning props

`side` and `align`, with offsets, replace `anchorOrigin` and `transformOrigin`:

```diff
-<Menu
-  anchorEl={anchorEl}
-  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
-  transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
->
+<Menu2 anchor={anchorEl} side="top" align="end">
```

| Menu / Popover                                        | Menu v2                                                                               | Notes                                                       |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------ | :---------------------------------------------------------- |
| `anchorEl`                                            | `anchor`                                                                              | Also accepts refs and virtual elements.                     |
| `anchorOrigin` + `transformOrigin`                    | `side` + `align` + `sideOffset` + `alignOffset`                                       | Defaults are `side="bottom"` and `align="start"`.           |
| `anchorReference="anchorPosition"` + `anchorPosition` | `anchor={virtualElement}`                                                             | See [Context menu](/material-ui/react-menu2/#context-menu). |
| `anchorReference="none"`                              | `anchor={virtualElement}`                                                             | Give the virtual element the position that you want.        |
| `marginThreshold` (default 16)                        | `collisionPadding` (default 5)                                                        | Same idea.                                                  |
| `action.updatePosition()`                             | Automatic                                                                             | Use `disableAnchorTracking` to stop tracking layout shifts. |
| —                                                     | `collisionBoundary`, `sticky`, `collisionAvoidance`, `positionMethod`, `arrowPadding` | New props.                                                  |

Use the logical `inline-start` and `inline-end` sides to get the correct direction in right-to-left text.

### 5. Check the transition

Menu v2 keeps `Grow` as the default transition, with the same height-dependent `transitionDuration="auto"`.

| Menu                                          | Menu v2                                 | Notes                                                                                    |
| :-------------------------------------------- | :-------------------------------------- | :--------------------------------------------------------------------------------------- |
| `slots.transition` (default `Grow`)           | `slots.transition` (default `Grow`)     | Set it to `null` to animate with CSS.                                                    |
| `slotProps.transition`                        | `slotProps.transition`                  | Base UI controls `in`, `appear`, `mountOnEnter`, `unmountOnExit`, and the unmount.       |
| `transitionDuration` (default `'auto'`)       | `transitionDuration` (default `'auto'`) | Unchanged.                                                                               |
| `slotProps.transition.onEntered` / `onExited` | `onOpenChangeComplete(open)`            | Fires after the animation, with `true` after the menu opens and `false` after it closes. |

With `slots.transition` set to `null`, the menu surface has the `data-starting-style` and `data-ending-style` attributes for CSS animations. See [Transitions](/material-ui/react-menu2/#transitions).

### 6. Update the items

| Menu                                                               | Menu v2                                 | Notes                                                             |
| :----------------------------------------------------------------- | :-------------------------------------- | :---------------------------------------------------------------- |
| `dense`, `disableGutters`, `divider`, `disabled`                   | Same                                    | Unchanged.                                                        |
| `disableRipple`                                                    | Same                                    | The item root is a `ButtonBase`, so items ripple as before.       |
| `selected`                                                         | Same, but visual only                   | Use checkbox or radio items for real selection state.             |
| `<Divider />` between items                                        | `Menu2Separator`                        | Controls its own margins.                                         |
| `ListSubheader`                                                    | `Menu2Group` + `Menu2GroupLabel`        | Adds the correct ARIA relationship.                               |
| `href` / `LinkComponent`                                           | `Menu2LinkItem`                         | Renders a real `<a role="menuitem">`.                             |
| `role="menuitemcheckbox"` + `selected`                             | `Menu2CheckboxItem`                     | Reports changes through `onChange(event, checked, eventDetails)`. |
| `role="menuitemradio"` + `selected`                                | `Menu2RadioGroup` + `Menu2RadioItem`    | Reports changes through `onChange(event, value, eventDetails)`.   |
| `autoFocus` (item)                                                 | Removed                                 | The component controls the initial highlight.                     |
| `focusVisibleClassName`, `onFocusVisible`, `action.focusVisible()` | `highlighted` class and data attributes | Style with CSS.                                                   |
| `MenuList.disableListWrap`                                         | `loopFocus` (default `true`)            | The value is inverted.                                            |
| `MenuList.dense`, `MenuList.disablePadding`                        | `slotProps.list`                        | The `list` slot is a `List`, so the props are unchanged.          |
| `MenuList.autoFocus` / `autoFocusItem` / `variant`                 | Removed                                 | Internal or legacy.                                               |

Composed list primitives still work inside items, so `ListItemIcon`, `ListItemText`, and `Typography` carry over unchanged. `ListItemText inset` still aligns with the icon column.

### 7. Update the theme keys

Menu v2 registers two theme keys for the menu surfaces. `MuiMenu2` has the slots `root`, `backdrop`, `positioner`, `paper`, and `list`. `MuiMenu2Submenu` has `root`, `positioner`, `paper`, and `list`. The item parts have their own keys, such as `MuiMenu2Item`.

The trigger has no theme key, because you supply the element. Theme its own component instead, or style the `.MuiMenu2Trigger-root` class.

```diff
 const theme = createTheme({
   components: {
-    MuiMenu: {
-      styleOverrides: { paper: { borderRadius: 12 } },
-    },
-    MuiMenuItem: {
-      styleOverrides: { root: { fontWeight: 500 } },
-    },
+    MuiMenu2: {
+      styleOverrides: { paper: { borderRadius: 12 } },
+    },
+    MuiMenu2Item: {
+      styleOverrides: { root: { fontWeight: 500 } },
+    },
   },
 });
```

Every element has its own class, such as `.MuiMenu2Item-root`, so `sx` and `styleOverrides` can reach each node.

The slots are `root`, `backdrop`, `positioner`, `paper`, `list`, and `transition`. There's no `trigger` slot: `slotProps.trigger` accepts only `nativeButton`, `className`, and `ref`. `elevation` stays a top-level prop for the `paper` slot, with the default 8.

`className`, `style`, `sx`, and the other HTML attributes go to the root element, the same as before. Event handlers go to the menu surface.

### 8. Check the removed props

| Removed                                                                                  | What to do instead                                                                                       |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `variant="selectedMenu"`, `autoFocus`, `disableAutoFocusItem`                            | Use checkbox or radio items to show a current value. The component controls the initial highlight.       |
| `disableAutoFocus`, `disableEnforceFocus`, `disableEscapeKeyDown`                        | Use `modal`. These escape hatches reduce accessibility.                                                  |
| `disableRestoreFocus`                                                                    | Use `finalFocus` to set an explicit focus target.                                                        |
| `disableScrollLock`                                                                      | Use `modal={false}`, which also keeps the rest of the document interactive. There's no exact equivalent. |
| `disablePortal`                                                                          | No equivalent. Menu v2 always renders in a portal. Use `container` to choose the portal container.       |
| `hideBackdrop`                                                                           | No longer necessary. The backdrop is opt-in through the `backdrop` slot.                                 |
| `anchorOrigin`, `transformOrigin`, `anchorReference`, `anchorPosition`, `PopoverClasses` | Use the positioning props. Menu v2 doesn't use `Popover`.                                                |
| `action.updatePosition()`                                                                | The position updates automatically. `actionsRef` provides `close()` and `unmount()`.                     |

## Behavior changes

Most of these changes bring the menu in line with the [WAI-ARIA menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/), so they're intentional and won't be reverted.

| Behavior               | Menu                                            | Menu v2                                                    |
| :--------------------- | :---------------------------------------------- | :--------------------------------------------------------- |
| Opened with a pointer  | Highlights the selected item, or the first item | Highlights nothing, so Enter can't fire an unintended item |
| Opened with a keyboard | Highlights an item                              | Highlights the first item                                  |
| Disabled items         | Skipped by the keyboard                         | Focusable, and announced as disabled                       |
| Sibling content        | Hidden from screen readers with `aria-hidden`   | Stays in the accessibility tree                            |
| Backdrop               | Always rendered                                 | Opt in through the `backdrop` slot                         |
| Tab while open         | Closes, and focus returns to the trigger        | Closes, and focus moves to the next element                |
| Submenus               | Not supported                                   | Open on hover after 100ms, and on click                    |

Escape, scroll locking, and the default placement (below the trigger, start aligned) are unchanged.

### The initial highlight

This is the change that users are most likely to notice. When the user opens a menu with a pointer, Menu v2 highlights nothing, so pressing Enter can't activate an item that the user didn't choose. Native desktop menus behave this way.

This is a deliberate deviation from the APG, which says that focus moves to an item when the menu opens, with no exception for pointer opens. There's no prop to restore the classic behavior: `Menu.Root` in Base UI has no initial-highlight prop and `Menu.Popup` has no `initialFocus`, [by design](https://github.com/mui/base-ui/issues/2143).

### `variant="selectedMenu"` is gone

This is a lost feature rather than a changed one. It selected which item took focus when the menu opened and hid the focus ring at that first moment. The new foundation can't express either behavior.

Radio items are the closest replacement, because they show the current value. They don't reproduce the behavior: a `Menu2RadioGroup` with a checked second item still opens with the first item highlighted.

### Styling around triggers

While a menu or a submenu is open, Base UI renders hidden `span` elements next to its trigger. They keep the tab order and the accessibility tree correct. CSS sibling selectors (`+`, `~`, `:last-child`) near a trigger can match these elements. Style each part directly instead. The focus guards among them have a `data-base-ui-focus-guard` attribute.

### Menu height

The classic Menu limits its height to the viewport minus 96px. Menu v2 keeps this limit, and also limits the height to the space available at the anchor, so the value reacts to collisions.

## Context menus

Right-click menus use a virtual anchor. A menu with no trigger has no element to return focus to when it closes. Always pass `finalFocus` with the surface that the user invoked. Otherwise, focus can move to an unrelated element on the page.

See the [Context menu demo](/material-ui/react-menu2/#context-menu) for the full pattern.
