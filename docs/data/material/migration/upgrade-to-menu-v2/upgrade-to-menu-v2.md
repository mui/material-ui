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
Then migrate the items as described in [Update the items](#6-update-the-items).
Omitting `MenuTrigger` does not make Menu v2 a static list; `MenuPopup` still renders a positioned popup in a portal.

### Context menus

Menu v2 doesn't support context menus.
A separate component with the correct accessibility behavior is planned for them.
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

Every other part follows the same `@mui/material/Unstable_Menu2<Part>` pattern.
For example, import `MenuSeparator` from `@mui/material/Unstable_Menu2Separator`.

The examples use `Menu`, `MenuItem`, and similar local names for the Menu v2 components imported from the `Unstable_Menu2` subpaths.

### 2. Replace the anchor state with a trigger

`Menu` owns state and behavior, `MenuTrigger` connects the button, and `MenuPopup` contains the items.
The anchor state and ARIA wiring go away.

After, with Menu v2:

```jsx
<Menu>
  <MenuTrigger>
    <Button>Dashboard</Button>
  </MenuTrigger>
  <MenuPopup>
    <MenuItem>Profile</MenuItem>
  </MenuPopup>
</Menu>
```

Before, with Menu:

```jsx
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

<Button
  id="basic-button"
  aria-controls={open ? 'basic-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open}
  onClick={(event) => setAnchorEl(event.currentTarget)}
>
  Dashboard
</Button>
<Menu
  id="basic-menu"
  anchorEl={anchorEl}
  open={open}
  onClose={() => setAnchorEl(null)}
  slotProps={{ list: { 'aria-labelledby': 'basic-button' } }}
>
  <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
</Menu>
```

Selecting a `MenuItem` closes the menu by default, so its `onClick={handleClose}` is no longer necessary.
Set `closeOnClick={false}` on a `MenuItem` to keep the menu open.

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

- `open` is no longer required.
  Use `defaultOpen` for an uncontrolled menu.
- `onClose(event, reason)` becomes `onOpenChange(open, eventDetails)`.
  It fires for opening and closing.
  Call `eventDetails.cancel()` to prevent the change.

Update any checks of the close reason:

| Menu `onClose` reason                                  | Menu v2 `eventDetails.reason` |
| :----------------------------------------------------- | :---------------------------- |
| `escapeKeyDown`                                        | `escape-key`                  |
| `backdropClick`                                        | `outside-press`               |
| `tabKeyDown`                                           | `focus-out`                   |
| No reason; an item's `onClick` handler closed the menu | `item-press`                  |

The `trigger-press` reason can report either opening or closing.
Check the `open` argument before you run close-only logic:

```js
function handleOpenChange(open, eventDetails) {
  if (!open && eventDetails.reason === 'outside-press') {
    saveDraft();
  }
}
```

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
+<MenuPopup anchor={anchorEl} side="top" align="end">
```

- `anchorEl` becomes `anchor`.
  It also accepts refs and virtual elements.
- `anchorOrigin` and `transformOrigin` become `side`, `align`, `sideOffset`, and `alignOffset`.
  The defaults are `side="bottom"` and `align="start"`.
- `anchorReference="anchorPosition"` with `anchorPosition`, and `anchorReference="none"`, become `anchor={virtualElement}`.
  Give the virtual element the position that you want.
  For context menus, see [Context menus](#context-menus).
- `marginThreshold` (default 16) becomes `collisionPadding` on `MenuPopup` (default 5).
- `action.updatePosition()` is removed, because the position updates automatically.
  Use `disableAnchorTracking` to stop tracking layout shifts.
  `actionsRef` provides `close()` and `unmount()`.
- `PopoverClasses` is removed, because Menu v2 doesn't use `Popover`.
- `collisionBoundary`, `sticky`, `collisionAvoidance`, and `positionMethod` are new props.

Common origin pairs map to these values in left-to-right text:

| `anchorOrigin` | `transformOrigin` | Menu v2                                                                 |
| :------------- | :---------------- | :---------------------------------------------------------------------- |
| bottom, left   | top, left         | `side="bottom" align="start"`                                           |
| bottom, center | top, center       | `side="bottom" align="center"`                                          |
| bottom, right  | top, right        | `side="bottom" align="end"`                                             |
| top, left      | bottom, left      | `side="top" align="start"`                                              |
| top, right     | bottom, right     | `side="top" align="end"`                                                |
| top, right     | top, left         | `side="right" align="start"`                                            |
| top, left      | top, left         | See [Place the menu over its trigger](#place-the-menu-over-its-trigger) |

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

Move the transition props to `MenuPopup`.
They keep their names and defaults, except the `onEntered` and `onExited` callbacks:

- `slotProps.transition.onEntered` and `onExited` become `onOpenChangeComplete(open)` on `Menu`.
  It fires after the animation, with `true` after the menu opens and `false` after it closes.
- `slotProps.transition` no longer sets `in`, `appear`, `mountOnEnter`, `unmountOnExit`, or the unmount.
  Base UI controls them.

`slots.transition` still defaults to `Grow`, and `transitionDuration` still defaults to `'auto'`, so the duration depends on the menu height.
Set `slots.transition` to `null` to animate with CSS.
The menu surface then has the `data-starting-style` and `data-ending-style` attributes.
See [Transitions](/material-ui/react-menu2/#transitions).

### 6. Update the items

Separators, groups, links, and checked items become dedicated parts:

- `<Divider />` between items becomes `MenuSeparator`, which controls its own margins.
- `ListSubheader` becomes `MenuGroup` with `MenuGroupLabel`, which adds the correct ARIA relationship.
- Items with `href`, `LinkComponent`, or `component="a"` become `MenuLinkItem`, which renders a real `<a role="menuitem">`.
  For a router link, pass the link component to its `component` prop.
- Items with `role="menuitemcheckbox"` become `MenuCheckboxItem`.
  Its `checked` or `defaultChecked` prop replaces `selected`, and it reports the new state through `onCheckedChange(checked, eventDetails)`.
- Items with `role="menuitemradio"` become `MenuRadioItem` inside a `MenuRadioGroup`.
  Give each item a `value`, and set the current value with `value` or `defaultValue` on the group.
  The group reports the new value through `onValueChange(value, eventDetails)`.

In both callbacks, `eventDetails.event` is a native event, not a React synthetic event.
Its target can be a descendant of the item.

`MenuCheckboxItem`, `MenuRadioItem`, and `MenuLinkItem` keep the menu open by default.
Set `closeOnClick` on these items to close the menu after selection.

These item props work as before:

- `dense`, `disableGutters`, and `divider` are unchanged.
- `disabled` is unchanged on supported item parts, but disabled items now stay focusable.
  See [Behavior changes](#behavior-changes).
  `MenuLinkItem` does not support this prop.
- `disableRipple` is unchanged.
  The item root is a `ButtonBase`, so items ripple as before.

These `MenuList` props move or change:

- `MenuList.disableListWrap` becomes `loopFocus` on `Menu` (default `true`), with the value inverted.
- `MenuList.dense` and `MenuList.disablePadding` move to `slotProps.list` on `MenuPopup`.
  The `list` slot is a `List`, so the props are unchanged.
- Naming attributes on `slotProps.list` move to `MenuPopup`.
  See [Move popup props to MenuPopup](#8-move-popup-props-to-menupopup).

Removed item and `MenuList` props, such as `selected`, are listed in [Check the removed props](#9-check-the-removed-props).

Composed list primitives still work inside items, so `ListItemIcon`, `ListItemText`, and `Typography` carry over unchanged.
`ListItemText inset` still aligns with the icon column.

### 7. Update the theme keys

Move menu styles from `MuiMenu` to `MuiMenu2Popup`, and item styles from `MuiMenuItem` to `MuiMenu2Item`.
The `paper` slot is now the `root` slot:

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

The CSS classes use the same component names as the theme keys:

| Menu class       | Menu v2 class           | Submenu class                  |
| :--------------- | :---------------------- | :----------------------------- |
| `.MuiMenu-root`  | `.MuiMenu2Popup-portal` | `.MuiMenu2SubmenuPopup-portal` |
| `.MuiMenu-paper` | `.MuiMenu2Popup-root`   | `.MuiMenu2SubmenuPopup-root`   |
| `.MuiMenu-list`  | `.MuiMenu2Popup-list`   | `.MuiMenu2SubmenuPopup-list`   |

For example, change an `& .MuiMenu-list` selector to `& .MuiMenu2Popup-list`.
The `menu2PopupClasses` and `menu2SubmenuPopupClasses` exports provide these class names from `@mui/material/Unstable_Menu2Popup` and `@mui/material/Unstable_Menu2SubmenuPopup`.

Menu v2 has separate theme keys for behavior and presentation:

- `MuiMenu2` and `MuiMenu2Submenu` support `defaultProps` only.
  `Menu` and `MenuSubmenu` render no DOM element, so they have no ref, `sx`, or slots.
- `MuiMenu2Popup` and `MuiMenu2SubmenuPopup` style the popups.
  `MuiMenu2Popup` styles also apply to the matching submenu popup slots.
- Each item part has its own key, such as `MuiMenu2Item`.
  `MuiMenu2Item` styles apply to all item roots.
- The trigger element keeps its own styles.
  Theme its component, or style the `.MuiMenu2Trigger-root` class.

A part's own key applies after the shared key.
For example, `MuiMenu2CheckboxItem` overrides apply after `MuiMenu2Item` overrides, and `MuiMenu2SubmenuPopup` overrides apply after `MuiMenu2Popup` overrides.
This includes theme variants, but not `defaultProps`.
Utility classes remain specific to each part.

Theme `variants` move to the new key the same way as `styleOverrides`.
A variant that matches on `selected` no longer applies, because Menu v2 items don't have that prop.
Match on `checked` under `MuiMenu2CheckboxItem` or `MuiMenu2RadioItem` instead.

### 8. Move popup props to MenuPopup

Props that styled or named the menu surface now go on `MenuPopup`.
Each prop targets one element:

- `ref`, `className`, `style`, `sx`, event handlers, and HTML attributes target the menu surface, which is the `root` slot.
  `elevation` sets its Paper elevation, with the default 8.
- `side`, `align`, and `slotProps.positioner` target the positioned element.
- `slotProps.portal` sets the stacking level for the menu and its modal interaction layer.
- `slots` and `slotProps` also customize the `list`, `backdrop`, and `transition` slots.
  There's no `trigger` slot: put trigger props on `MenuTrigger`.

:::warning
Move menu naming attributes, such as `aria-label` and `aria-labelledby`, from `slotProps.list` to `MenuPopup` or its `slotProps.root`.
The list is now presentational, so a name on it is not announced.
:::

### 9. Check the removed props

Delete or replace each removed prop as shown in the tables.
A row that says only "Delete it." has no replacement.
The initial focus props, such as `autoFocus`, have none because Menu v2 sets the [initial highlight](#the-initial-highlight) itself.

**Menu**

| Props to remove        | What to do instead                                                                                                                                             |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoFocus`            | Delete it.                                                                                                                                                     |
| `disableAutoFocusItem` | Delete it.                                                                                                                                                     |
| `variant`              | Delete it. If you used `"selectedMenu"` to show the current value, use radio items. See [The selectedMenu variant is gone](#the-selectedmenu-variant-is-gone). |
| `disableAutoFocus`     | Delete it.                                                                                                                                                     |
| `disableEnforceFocus`  | Delete it.                                                                                                                                                     |
| `disableRestoreFocus`  | Use `finalFocus={false}` on `MenuPopup`.                                                                                                                       |
| `disableScrollLock`    | Use `modal={false}` on `Menu`. It also keeps the rest of the document interactive.                                                                             |
| `disablePortal`        | Delete it. Menu v2 always renders in a portal. Use `container` on `MenuPopup` to choose the portal target.                                                     |
| `hideBackdrop`         | Delete it. Menu v2 renders no visual backdrop unless you set `slots.backdrop` on `MenuPopup`. See [Backdrop](#backdrop).                                       |
| `action`               | Delete it. The position updates automatically. See [Update the positioning props](#4-update-the-positioning-props).                                            |
| `PopoverClasses`       | Delete it. Menu v2 doesn't use `Popover`.                                                                                                                      |

**MenuList**

| Props to remove          | What to do instead                                                                         |
| :----------------------- | :----------------------------------------------------------------------------------------- |
| `autoFocus`              | Delete it.                                                                                 |
| `autoFocusItem`          | Delete it.                                                                                 |
| `variant`                | Delete it. See [The selectedMenu variant is gone](#the-selectedmenu-variant-is-gone).      |
| `disabledItemsFocusable` | Delete it. Disabled items are always focusable. See [Behavior changes](#behavior-changes). |

**MenuItem**

| Props to remove         | What to do instead                                                                                                                                                                                                         |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoFocus`             | Delete it.                                                                                                                                                                                                                 |
| `selected`              | For one current value, use `MenuRadioItem` inside a `MenuRadioGroup`, and add `closeOnClick` to close the menu on selection. For independent toggles, use `MenuCheckboxItem`. See [Update the items](#6-update-the-items). |
| `focusVisibleClassName` | Style `.MuiMenu2Item-highlighted`, or `menu2ItemClasses.highlighted`. It also matches pointer navigation, not only keyboard focus.                                                                                         |
| `onFocusVisible`        | Delete it.                                                                                                                                                                                                                 |
| `action`                | Delete it. Menu v2 items have no `action` methods, such as `focusVisible()`.                                                                                                                                               |

## Behavior changes

These changes are intentional and mostly bring the menu in line with the [WAI-ARIA menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).

- **Opened with a pointer:** Menu highlights the selected item, or the first item.
  Menu v2 highlights nothing.
  See [The initial highlight](#the-initial-highlight).
- **Opened with a keyboard:** Menu highlights an item.
  Menu v2 highlights the first enabled item, and ArrowUp highlights the last enabled item.
- **Disabled items:** Menu skips them with the keyboard by default.
  Menu v2 keeps them focusable with arrow keys and announces them as disabled, but they cannot be activated.
- **Sibling content:** Menu hides it from screen readers with `aria-hidden`.
  Menu v2 keeps it in the accessibility tree.
- **Backdrop:** Menu renders one by default.
  Menu v2 uses an internal modal layer, with an optional visual backdrop slot.
  See [Backdrop](#backdrop).
- **Tab while open:** Menu closes, and focus returns to the trigger.
  Menu v2 closes, and focus moves to the next element.
- **Submenus:** Menu doesn't support them.
  Menu v2 opens them on mouse hover after 100 ms, touch tap, or keyboard activation.

Escape still closes the menu, and the default placement is still below the trigger, aligned to the start.

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

:::warning
Leave `keepMounted` disabled on `MenuPopup` inside a kept-mounted Dialog.
:::

### The initial highlight

This is the change your users are most likely to notice.
When they open a menu with a pointer, Menu v2 highlights nothing, so pressing Enter can't activate an item they didn't choose.
Native desktop menus behave this way.

This is a deliberate deviation from the ARIA Authoring Practices Guide (APG), which says that focus moves to an item when the menu opens, with no exception for pointer opens.
There's no prop to restore the classic behavior.
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
