---
productId: material-ui
title: React Menu v2 component
githubLabel: 'scope: menu'
materialDesign: https://m2.material.io/components/menus
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
githubSource: packages/mui-material/src/Unstable_Menu2
---

# Menu v2

<p class="description">Menus display a list of choices on temporary surfaces. Menu v2 adds submenus, checkbox and radio items, and grouping.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

:::warning
Menu v2 is an unstable component. Import it from the `Unstable_Menu2` subpaths. Its API can change in a minor release.

The [current Menu](/material-ui/react-menu/) doesn't change, and both components can be used in the same app.
:::

## Introduction

Menu v2 is a set of components that compose into a menu:

- **Menu 2**: the trigger and the menu surface. One component configures both.
- **Item**: an option for users to select.
- **Link Item**: an item that navigates.
- **Checkbox Item**, **Radio Group**, and **Radio Item**: items with a checked state.
- **Submenu** and **Submenu Trigger**: a nested menu and the item that opens it.
- **Group**, **Group Label**, and **Separator**: the structure in a menu.

```jsx
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
```

Each component is the default export of its own subpath.

## Why a new menu component

Submenus are [the most requested Menu feature since 2018](https://github.com/mui/material-ui/issues/11723), but the current Menu can't support them. Each open menu is a full `Modal`, and nested modals break the backdrop, the focus traps, the arrow keys, and the accessibility tree.

Menu v2 uses [Base UI](https://base-ui.com/react/components/menu) for this behavior. Material UI supplies the visuals, the theming, and the API.

- **Nothing extra to install.** Base UI is a dependency of `@mui/material`, the same as `@popperjs/core`. You don't import from it, and apps that don't import Menu v2 don't bundle it.
- **No change to existing code.** The current Menu doesn't change and isn't deprecated. You can adopt Menu v2 one menu at a time.
- **The same theming.** `sx`, `classes`, `slots`, `slotProps`, and the theme `defaultProps`, `styleOverrides`, and `variants` work with the `MuiMenu2*` keys.

For the full reasoning and a step-by-step guide, see [Upgrade to Menu v2](/material-ui/migration/upgrade-to-menu-v2/).

## Major changes

Menu v2 adds submenus, checkbox and radio items, groups with labels, link items, typeahead on each level, and positioning that flips on collision and follows the anchor. The trigger is part of the component, so you don't manage anchor state or ARIA attributes.

Three changes are important before you start:

- **Opening with a pointer highlights no item**, so Enter can't activate an item that the user didn't choose. Opening with the keyboard highlights the first item. `variant="selectedMenu"` is removed. Use radio items to show a current value.
- **`onClose` becomes `onOpenChange`**, and `side` and `align` replace `anchorOrigin` and `transformOrigin`.
- **Disabled items stay focusable**, and the content next to the menu stays in the accessibility tree, as the [WAI-ARIA menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) specifies.

[Upgrade to Menu v2](/material-ui/migration/upgrade-to-menu-v2/) covers every prop mapping, the removed props, and all the behavior changes.

## Basic menu

Pass the element that opens the menu to the `trigger` prop, and the items as children.

{{"demo": "BasicMenu2.js"}}

Menu v2 merges the trigger behavior into the element, so the element keeps the component that you passed. There's no default trigger:

```jsx
<Menu2 trigger={<Button>Dashboard</Button>}>
```

```jsx
<Menu2 trigger={<IconButton aria-label="More actions"><MoreVertIcon /></IconButton>}>
```

Two rules apply to the trigger element:

- **A wrapper must forward props and ref** to the element that it renders, the same as [Tooltip](/material-ui/react-tooltip/). Menu v2 merges the trigger behavior through props, so a component that drops them doesn't open the menu. In development, Menu v2 logs an error when the trigger doesn't receive the ref.
- **Set `slotProps.trigger.nativeButton` to `false`** when the element doesn't render a native `<button>`, so the keyboard behavior stays correct.

Selecting an item closes the menu. Set `closeOnClick={false}` on an item to keep the menu open.

## Account menu

The trigger can be a composed element, such as an `IconButton` in a `Tooltip`. `align="end"` aligns the menu with the end of the trigger.

{{"demo": "AccountMenu2.js"}}

## Submenu

Nest a `Menu2Submenu` in the item list, and pass a `Menu2SubmenuTrigger` to its `trigger` prop. The children of the submenu are its items, the same shape as the root menu one level down.

{{"demo": "SubmenuMenu2.js"}}

A submenu opens on hover after a short delay, on click, and with the ArrowRight key. In right-to-left text, ArrowLeft opens it. A submenu flips when it runs out of room, and submenus nest to any depth. Escape closes the innermost submenu and returns focus to its trigger.

`Menu2SubmenuTrigger` renders the item row and an arrow indicator that follows the text direction. Set the hover behavior on the trigger:

```jsx
<Menu2Submenu
  trigger={
    <Menu2SubmenuTrigger delay={300} closeDelay={100}>
      Share
    </Menu2SubmenuTrigger>
  }
>
```

Set `openOnHover={false}` to open the submenu only on click and with the keyboard. To replace the arrow, pass your own component to `slots.indicator`.

By default, Escape closes only the submenu. Pass `closeParentOnEsc` to `Menu2Submenu` to close the whole menu.

## Icon menu

Compose the same list primitives that you use with the current Menu: `ListItemIcon`, `ListItemText`, and `Typography` for a shortcut hint.

{{"demo": "IconMenu2.js"}}

## Dense menu

Set `dense` on the `list` slot to make all the items compact. An item can also set its own `dense` prop.

{{"demo": "DenseMenu2.js"}}

Items also accept `disableGutters`, `divider`, `selected`, and `disabled`, the same as the current `MenuItem`. Items show a ripple on click, the same as other Material UI buttons. Set `disableRipple` to remove it.

## Checkbox and radio items

`Menu2CheckboxItem` renders `role="menuitemcheckbox"` with `aria-checked` and its own indicator. You don't add a separate indicator component.

A click on a checkbox item doesn't close the menu, so users can change several options in one visit.

{{"demo": "CheckboxMenu2.js"}}

For a single choice in a set, put `Menu2RadioItem` components in a `Menu2RadioGroup`:

{{"demo": "RadioMenu2.js"}}

Both components report changes with `onChange(event, value, eventDetails)`. For an uncontrolled item or group, use `defaultChecked` or `defaultValue`. To replace the indicator, pass your own component to `slots.indicator`.

:::info
Use radio items to show a current value. The `selected` prop still exists on `Menu2Item`, but it only changes the appearance.
:::

## Composed menu

The parts compose freely. This menu combines checkbox items with shortcut hints, a submenu with a radio group, icon items, and a disabled item. The item indicators and `ListItemIcon` have the same width, so the labels align.

{{"demo": "ComposedMenu2.js"}}

## Grouped menu

`Menu2Group` and `Menu2GroupLabel` label a set of related items. The group refers to its label with `aria-labelledby`. Use `Menu2Separator` between groups.

{{"demo": "GroupedMenu2.js"}}

## Link items

`Menu2LinkItem` renders a real anchor with `role="menuitem"`, so links behave like links. Middle click, right click, and keyboard activation all work.

{{"demo": "LinkItemsMenu2.js"}}

A link item doesn't close the menu on click by default. Set `closeOnClick` to close the menu, for example with client-side routing.

## Positioned menu

`side` and `align` place the menu relative to its anchor, and `sideOffset` and `alignOffset` move it. The defaults are `side="bottom"` and `align="start"`.

Use the logical `inline-start` and `inline-end` sides to get the correct direction in right-to-left text.

{{"demo": "PositionedMenu2.js"}}

The menu flips when it collides with the edge of its container, and it follows its anchor on scroll and resize. Set `disableAnchorTracking` to stop tracking layout shifts of the anchor.

## Open on hover

Set `openOnHover` to open the menu when the pointer rests on the trigger. `delay` and `closeDelay` set the timing in milliseconds.

{{"demo": "HoverMenu2.js"}}

A menu that opens on hover isn't modal, so the rest of the page stays interactive.

## Controlled menu

Pass `open` and `onOpenChange` to control the open state. The trigger still sets the ARIA attributes and receives focus when the menu closes.

{{"demo": "ControlledMenu2.js"}}

`onOpenChange` receives the reason for the change, such as `trigger-press`, `item-press`, `escape-key`, `outside-press`, or `focus-out`, and the native event. Call `eventDetails.cancel()` to prevent the change:

```jsx
<Menu2
  trigger={<Button>Options</Button>}
  onOpenChange={(open, eventDetails) => {
    if (!open && eventDetails.reason === 'outside-press') {
      eventDetails.cancel();
    }
  }}
>
```

### Without a trigger

Omit `trigger` and pass `anchor` to position the menu against an element that you control, the same as `anchorEl` in the current Menu. The menu can't connect to that element, so you do the wiring:

- Add `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls` to the element. Set the matching `id` on the menu with `slotProps.paper`.
- Pass `finalFocus` to return focus to the element when the menu closes.

The [context menu](#context-menu) uses this pattern.

## Max height menu

The menu limits its height to the viewport and to the space available at the anchor, and scrolls its content. Set a smaller limit on the `paper` slot.

Type a letter while the menu is open to move to the matching item.

{{"demo": "LongMenu2.js"}}

## Context menu

Pass a virtual anchor to place the menu at the pointer.

{{"demo": "ContextMenu2.js"}}

:::warning
A menu with no trigger has no element to return focus to when it closes. Always pass `finalFocus` with the surface that the user invoked. Otherwise, focus can move to an unrelated element.
:::

## Customization

`className`, `style`, `sx`, and the other HTML attributes go to the root element, which wraps the menu in the portal. This is the same as the current Menu. Event handlers go to the menu surface. Use a descendant selector or `slotProps.paper` to style the surface:

{{"demo": "CustomizedMenu2.js"}}

The slots are `root`, `backdrop`, `positioner`, `paper`, `list`, and `transition`. `elevation` is a top-level prop for the `paper` slot. Use `slotProps.paper` for `aria-*` attributes on the element with `role="menu"`.

The trigger isn't a slot, because you supply the element. Style it directly. It has the `.MuiMenu2Trigger-root` class, and the `.MuiMenu2Trigger-open` class while the menu is open. `slotProps.trigger` accepts only `nativeButton`, `className`, and `ref`.

:::warning
While a menu or a submenu is open, Base UI renders hidden `span` elements next to its trigger. They keep the tab order and the accessibility tree correct. CSS sibling selectors (`+`, `~`, `:last-child`) near a trigger can match these elements. Style each part directly instead. The focus guards among them have a `data-base-ui-focus-guard` attribute.
:::

The theme has two keys for the menu surfaces. `MuiMenu2` has the slots `root`, `backdrop`, `positioner`, `paper`, and `list`. `MuiMenu2Submenu` has `root`, `positioner`, `paper`, and `list`. Each item part has its own key, such as `MuiMenu2Item`:

```js
const theme = createTheme({
  components: {
    MuiMenu2: {
      defaultProps: { sideOffset: 8 },
      styleOverrides: {
        paper: { borderRadius: 12 },
      },
    },
    MuiMenu2Item: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
  },
});
```

The item parts have state classes, such as `.MuiMenu2Item-highlighted`, `.MuiMenu2CheckboxItem-checked`, and `.MuiMenu2SubmenuTrigger-open`. Slot callbacks and theme `variants` receive the same state.

### Transitions

The menu uses the `Grow` transition, the same as the current Menu. With the default `transitionDuration="auto"`, the duration depends on the height of the menu. Pass a different transition component to `slots.transition`, and its props to `slotProps.transition`:

{{"demo": "FadeMenu2.js"}}

Set `transitionDuration={0}` to remove the animation. To animate with CSS, set `slots.transition` to `null`. The menu surface has the `data-starting-style` attribute while it enters and the `data-ending-style` attribute while it leaves:

```jsx
<Menu2
  trigger={<Button>Options</Button>}
  slots={{ transition: null }}
  slotProps={{
    paper: {
      sx: {
        transition: 'opacity 150ms',
        '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
      },
    },
  }}
>
```

`Grow` and the other Material UI transitions follow [`theme.motion.reducedMotion`](/material-ui/customization/transitions/#reduced-motion).

### Backdrop

There's no backdrop by default. An outside press closes the menu without one. To dim the page, opt in with the `backdrop` slot. The default backdrop is transparent and doesn't catch pointer events:

```jsx
<Menu2
  trigger={<Button>Options</Button>}
  slotProps={{ backdrop: { sx: { bgcolor: 'rgba(0, 0, 0, 0.5)' } } }}
>
```

## Accessibility

Menu v2 follows the [WAI-ARIA menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/). It handles the trigger, the roles, the keyboard behavior, focus management, and dismissal:

- The trigger gets `aria-haspopup`, `aria-expanded`, and `aria-controls`.
- Arrow keys move between items and respect right-to-left text. Home and End move to the first and the last item.
- Typeahead matches items by their text content, or by the `label` prop when the content isn't plain text.
- Disabled items stay focusable, and screen readers announce them as disabled.
- Escape closes one level at a time and returns focus to the trigger of that level.

Two things stay your responsibility:

- **Label an icon-only trigger.** Pass `aria-label` to the element that you supply as `trigger`.
- **Keep custom item content readable.** Icons, secondary text, and shortcut hints in an item need sufficient contrast.
