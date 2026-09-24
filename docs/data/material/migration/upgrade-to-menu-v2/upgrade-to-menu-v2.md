# Upgrade to Menu v2

<p class="description">This guide explains how and why to migrate from the Menu component to Menu v2.</p>

## Menu component versions

Menu v2 is the successor to Menu. It's published as an unstable component in Material UI v9 minors, becomes stable as `Menu2` later in v9, and becomes the canonical `Menu` in the next major version—at which point today's Menu is renamed `MenuLegacy` and a codemod handles the rename.

The current Menu is not deprecated yet and keeps working unchanged. You can adopt Menu v2 one menu at a time, and both can coexist in the same app.

| Phase       | Import                         | Notes                                                                     |
| :---------- | :----------------------------- | :------------------------------------------------------------------------ |
| Now         | `@mui/material/Unstable_Menu2` | Public incubation. Theme keys and classes are `MuiMenu2*`.                |
| Later in v9 | `@mui/material/Menu2`          | Stable under the interim name. Theme keys don't change.                   |
| Next major  | `@mui/material/Menu`           | `Menu2` becomes the canonical `Menu`.                                     |
| Next major  | `@mui/material/MenuLegacy`     | The current Menu is renamed and deprecated. A codemod handles the rename. |

## Why you should upgrade

Menu v2 provides the following improvements over Menu:

- **Submenus** at any nesting depth, with correct keyboard, hover, and ARIA behavior. This was [the most requested Menu feature since 2018](https://github.com/mui/material-ui/issues/11723), and it isn't possible in the current Menu.
- **Checkbox and radio items** with the right roles, `aria-checked`, and built-in indicators.
- **Groups with labels**, connected with `aria-labelledby`.
- **A trigger prop** that handles `aria-haspopup`, `aria-expanded`, and `aria-controls` for you, so there's no anchor state to manage.
- **Collision-aware positioning** that flips and follows the anchor automatically.
- **Accessibility fixes** that the current Menu can't make without breaking existing behavior—see [Behavior changes](#behavior-changes).

### Why it's a new component

Every open Menu is a full `Modal` (`Menu` → `Popover` → `Modal`), and nesting one modal inside another breaks in six places:

1. **Backdrop.** Each menu renders a full-screen backdrop that captures clicks. A submenu's backdrop covers its parent, so clicking the parent closes the child.
2. **`aria-hidden`.** `ModalManager` applies it to everything except the topmost modal, so an open submenu hides its parent from screen readers.
3. **Keys.** ArrowRight and ArrowLeft do nothing in a vertical list, and there's no hook to open a submenu.
4. **Focus.** Each modal has its own focus trap, and the traps don't coordinate when a submenu closes.
5. **Collision.** `Popover` doesn't flip, so a submenu near the edge of the screen is clipped.
6. **State.** Each `MenuList` keeps its own keyboard state, and nested lists share none of it.

Fixing this in place means rewriting `Menu`, `MenuList`, `MenuItem`, `Popover`, `Modal`, `ModalManager`, and `FocusTrap`, and replacing two models that `Dialog` and every `Popover` depend on: backdrop dismissal and per-modal focus traps. Three attempts along those lines were abandoned ([#14700](https://github.com/mui/material-ui/pull/14700), [#20591](https://github.com/mui/material-ui/pull/20591), [#37570](https://github.com/mui/material-ui/pull/37570)).

Menu v2 is built on [Base UI](https://base-ui.com/react/components/menu) instead, which already solves the behavior. Base UI is a dependency of `@mui/material`, the way `@popperjs/core` is—you never install or import it, and apps that don't use Menu v2 don't pay for it.

## How to upgrade

### 1. Update the imports

Each part has its own subpath and a default export, so you can drop the `Unstable_` prefix from the local name and your JSX already matches the future stable API:

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

Selecting an item closes the menu by default, so the `onClick={handleClose}` on every item is no longer needed. Set `closeOnClick={false}` on an item to keep the menu open.

`trigger` takes an element, and the trigger behavior is merged into it, so you keep your own component:

```jsx
<Menu2 trigger={<IconButton aria-label="More actions"><MoreVertIcon /></IconButton>}>
```

There's no default trigger, so the element is always yours. Three things to watch:

- A wrapper used as a trigger must forward props and ref to the element it renders, the way `Tooltip` does. The behavior is merged through props, so a component that drops them opens nothing.
- Pass `nativeButton={false}` when the element isn't a native `<button>`.
- A submenu `trigger` is a menu item, so pass a `Menu2Item`. The submenu keeps it from closing the menu, so you don't set `closeOnClick` yourself.

If you'd rather keep the controlled pattern, omit `trigger` and pass `open`, `onOpenChange`, and `anchor`. See [Controlled menu](/material-ui/react-menu2/#controlled-menu).

### 3. Update the open and close props

```diff
-<Menu open={open} onClose={handleClose}>
+<Menu2 open={open} onOpenChange={handleOpenChange}>
```

| Menu                               | Menu v2                            | Notes                                                                                                                                                                         |
| :--------------------------------- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open` (required, controlled only) | `open` + `defaultOpen`             | Uncontrolled mode is now possible.                                                                                                                                            |
| `onClose(event, reason)`           | `onOpenChange(open, eventDetails)` | Fires for opening and closing. Reasons are `escape-key`, `outside-press`, `focus-out`, `trigger-press`, and `item-press`. Call `eventDetails.cancel()` to prevent the change. |
| `onTransitionExited`               | `onOpenChangeComplete(open)`       | Fires after the animation finishes.                                                                                                                                           |

### 4. Update the positioning props

`anchorOrigin` and `transformOrigin` are replaced by `side` and `align`, with offsets:

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
| `anchorReference="none"`                              | Omit `anchor` and position with CSS.                                                  | Same behavior.                                              |
| `marginThreshold` (default 16)                        | `collisionPadding` (default 5)                                                        | Same idea.                                                  |
| `action.updatePosition()`                             | Automatic                                                                             | Use `disableAnchorTracking` to opt out.                     |
| —                                                     | `collisionBoundary`, `sticky`, `collisionAvoidance`, `positionMethod`, `arrowPadding` | New props.                                                  |

Use the logical `inline-start` and `inline-end` sides to get the correct direction in RTL automatically.

### 5. Replace transitions with CSS

Menu v2 animates with CSS rather than a transition component. The default matches the classic `Grow` and stops under `prefers-reduced-motion`.

| Menu                                                                | Menu v2                                              |
| :------------------------------------------------------------------ | :--------------------------------------------------- |
| `TransitionComponent` / `slots.transition` (default `Grow`)         | CSS with `data-starting-style` / `data-ending-style` |
| `transitionDuration`                                                | CSS `transition-duration` on the `popup` slot        |
| `onTransitionEnter` / `onTransitionExited` / `closeAfterTransition` | `onOpenChangeComplete` + `keepMounted`               |

```jsx
<Menu2 trigger={<Button>Options</Button>} slotProps={{ popup: { sx: { transition: 'none' } } }}>
```

:::info
The default animation is close to `Grow` but not identical. The classic Menu passes `transitionDuration="auto"`, so `Grow` derives the duration from the menu's height. A CSS transition uses the fixed `enteringScreen` and `leavingScreen` durations, so tall menus animate faster than before.
:::

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
| `autoFocus` (item)                                                 | Dropped                                 | The component controls the initial highlight.                     |
| `focusVisibleClassName`, `onFocusVisible`, `action.focusVisible()` | `highlighted` class and data attributes | Style with CSS.                                                   |
| `MenuList.disableListWrap`                                         | `loopFocus` (default `true`)            | The value is inverted.                                            |
| `MenuList.disablePadding`, `subheader`                             | `slotProps.list`, group parts           |                                                                   |
| `MenuList.autoFocus` / `autoFocusItem` / `variant`                 | Dropped                                 | Internal or legacy.                                               |

Composed list primitives still work inside items, so `ListItemIcon`, `ListItemText`, and `Typography` carry over unchanged. `ListItemText inset` still aligns with the icon column.

### 7. Update the theme keys

Menu v2 registers two theme keys. `MuiMenu2` has the slots `root`, `backdrop`, `paper`, and `list`. `MuiMenu2Submenu` has `root`, `paper`, and `list`. The items have their own keys, such as `MuiMenu2Item`.

The trigger has no theme slot, because you supply the element—theme its own component instead, or style the `.MuiMenu2Trigger-root` class.

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

Every element keeps its own class hook, so `sx` and `styleOverrides` can still reach each node—for example `.MuiMenu2Item-root`.

The slots are `portal`, `positioner`, `popup`, `paper`, `list`, and `backdrop`. There's no `transition` slot, and no `trigger` slot. `elevation` remains a top-level prop that forwards to the `paper` slot, default 8.

### 8. Check the removed props

| Removed                                                                                                        | What to do instead                                                                                       |
| :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `variant="selectedMenu"`, `autoFocus`, `disableAutoFocusItem`                                                  | Use checkbox or radio items to show a current value. The component controls the initial highlight.       |
| `disableAutoFocus`, `disableEnforceFocus`, `disableEscapeKeyDown`                                              | Use `modal`. These escape hatches reduce accessibility.                                                  |
| `disableRestoreFocus`                                                                                          | Use `finalFocus` to set an explicit focus target.                                                        |
| `disableScrollLock`                                                                                            | Use `modal={false}`, which also keeps the rest of the document interactive. There's no exact equivalent. |
| `disablePortal`                                                                                                | No equivalent—Menu v2 always renders in a portal.                                                        |
| `hideBackdrop`                                                                                                 | No longer needed; the backdrop is opt-in through the `backdrop` slot.                                    |
| `anchorOrigin`, `transformOrigin`, `anchorReference`, `anchorPosition`, `transitionDuration`, `PopoverClasses` | Use the positioning props. Menu v2 doesn't use `Popover`.                                                |
| `action.updatePosition()`                                                                                      | The position updates automatically. `actionsRef` provides `close()` and `unmount()`.                     |

## Behavior changes

Most of these bring the menu in line with the [WAI-ARIA menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/), so they're intentional and won't be reverted.

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

This is the change most likely to be noticed. When the user opens a menu with a pointer, Menu v2 highlights nothing, so pressing Enter can't activate an item the user didn't choose. Native desktop menus behave this way.

This is a deliberate deviation from the APG, which says focus moves to an item when the menu opens without an exception for pointer opens. There's no prop to restore the classic behavior: `Menu.Root` in Base UI has no initial-highlight prop and `Menu.Popup` has no `initialFocus`, [by design](https://github.com/mui/base-ui/issues/2143).

### `variant="selectedMenu"` is gone

This is a lost feature rather than a changed one. It selected which item took focus when the menu opened and hid the focus ring at that first moment. Neither is expressible on the new foundation.

Radio items are the closest replacement—they show the current value—but they don't reproduce the behavior: a `Menu2RadioGroup` with a checked second item still opens with the first item highlighted.

### Styling around submenu triggers

While a submenu is open, Base UI keeps focus-guard elements next to its trigger so the tab order stays correct. CSS that relies on sibling selectors (`+`, `~`, `:last-child`) near a submenu trigger won't match what you expect. Style each part directly instead. The guards carry a `data-base-ui-focus-guard` attribute.

### Menu height

The classic Menu clamped its height to the viewport (`maxHeight: calc(100% - 96px)` inside the Modal). Menu v2 limits its height to the space actually available and scrolls internally, so the value reacts to collisions.

## Context menus

Right-click menus use a virtual anchor. A menu with no trigger has no element to return focus to when it closes, so always pass `finalFocus` pointing at the surface the user invoked—otherwise focus can land on an unrelated element elsewhere on the page.

See the [Context menu demo](/material-ui/react-menu2/#context-menu) for the full pattern.
