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

- **Menu**: the trigger and the menu surface. One component configures both.
- **Item**: an option for users to select.
- **Link Item**: an item that navigates.
- **Checkbox Item**, **Radio Group**, and **Radio Item**: items with a checked state.
- **Submenu** and **Submenu Trigger**: a nested menu and the item that opens it.
- **Group**, **Group Label**, and **Separator**: the structure in a menu.

```jsx
import Menu from '@mui/material/Unstable_Menu2';
import MenuItem from '@mui/material/Unstable_Menu2Item';
```

Each component is the default export of its own subpath. These examples use local names such as `Menu` and `MenuItem` for the components imported from `Unstable_Menu2` subpaths. The import paths, theme keys, and CSS classes keep their `Menu2` names.

TypeScript apps that use Menu v2 require TypeScript 5.0 or later. Apps that use only existing Material UI components can continue to use TypeScript 4.9.

## Why a new menu component

Submenus are [one of the most requested Menu features since 2018](https://github.com/mui/material-ui/issues/11723), but the current modal-based Menu can't support them. Menu v2 uses [Base UI](https://base-ui.com/react/components/menu) to provide more menu building blocks and improve keyboard and screen reader support:

- **Nested menus** coordinate focus and keyboard navigation. Positioning follows the anchor and flips to avoid collisions.
- **Checkbox and radio items**, labeled groups, and link items provide built-in roles and ARIA attributes.
- **Disabled items stay focusable**, and content outside the menu remains available to screen readers.
- **The trigger prop** handles anchor state and ARIA attributes. Opening with a pointer highlights no item. Enter, Space, and ArrowDown highlight the first enabled item; ArrowUp highlights the last enabled item.

Material UI supplies the styles and theming. Base UI is included in `@mui/material`; no extra installation is needed, and apps that don't import Menu v2 don't bundle it.

See [Upgrade to Menu v2](/material-ui/migration/upgrade-to-menu-v2/) for the architecture, prop mappings, and behavior changes.

## Basic menu

Pass the element that opens the menu to the `trigger` prop, and the items as children.

{{"demo": "BasicMenu2.js"}}

Menu v2 merges the trigger behavior into the element, so the element keeps the component that you passed. There's no default trigger:

```jsx
<Menu trigger={<Button>Dashboard</Button>}>
```

```jsx
<Menu trigger={<IconButton aria-label="More actions"><MoreVertIcon /></IconButton>}>
```

Two rules apply to the trigger element:

- **A wrapper must forward props and ref** to the element that it renders, the same as [Tooltip](/material-ui/react-tooltip/). Menu v2 merges the trigger behavior through props, so a component that drops them doesn't open the menu. In development, Menu v2 logs an error when the trigger doesn't receive the ref.
- **Set `slotProps.trigger.nativeButton` to `false`** when the element doesn't render a native `<button>`, so the keyboard behavior stays correct.

Selecting a `MenuItem` closes the menu by default. Set `closeOnClick={false}` on a `MenuItem` to keep the menu open.

`MenuCheckboxItem`, `MenuRadioItem`, and `MenuLinkItem` keep the menu open by default. Set `closeOnClick` on these items to close the menu after selection.

## Account menu

The trigger can be a composed element, such as an `IconButton` in a `Tooltip`. `align="end"` aligns the menu with the end of the trigger.

Give the `IconButton` a unique `id` so the menu can use it as its accessible label. Tooltip uses its own `id` prop for the tooltip, not the button.

{{"demo": "AccountMenu2.js"}}

## Open a dialog

Keep the Dialog outside the menu so that it stays mounted when the menu closes. Open it from the item's `onClick` handler.

Menu v2 and Material UI Dialog restore focus at different times. Dialog can save a menu item as its return target before the menu closes. That item is then removed or hidden, so focus does not return to the trigger when Dialog closes.

To work around this limitation, keep a ref on the menu trigger and set `disableRestoreFocus` on Dialog. Focus the trigger from **Dialog's** `slotProps.transition.onExited` callback:

```jsx
<Dialog
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
  disableRestoreFocus
  slotProps={{
    transition: {
      onExited: () => triggerRef.current?.focus({ preventScroll: true }),
    },
  }}
>
  {/* Dialog content */}
</Dialog>
```

Keep the trigger mounted and enabled until the dialog closes. This workaround sets the Dialog return target; it does not change Menu v2's focus behavior. The [live recipe](/experiments/menu2-recipes/#menu2-open-dialog) includes a classic Menu comparison and a control to disable the workaround.

## Submenu

Nest a `MenuSubmenu` in the item list, and pass a `MenuSubmenuTrigger` to its `trigger` prop. The children of the submenu are its items, the same shape as the root menu one level down.

{{"demo": "SubmenuMenu2.js"}}

By default, a submenu opens when the mouse stays over its trigger for 100 ms. A mouse click does not bypass this delay. Touch taps, Enter, Space, and ArrowRight also open it. In right-to-left text, use ArrowLeft instead of ArrowRight.

A submenu flips when it runs out of room, and submenus nest to any depth. Escape closes the innermost submenu and returns focus to its trigger.

`MenuSubmenuTrigger` renders the item row and an arrow indicator that follows the text direction. Set the hover behavior on the trigger:

```jsx
<MenuSubmenu
  trigger={
    <MenuSubmenuTrigger delay={300} closeDelay={100}>
      Share
    </MenuSubmenuTrigger>
  }
>
```

Set `openOnHover={false}` to disable hover opening and open with a mouse click instead. Touch and keyboard activation remain available.

Use `slotProps.indicator.children` to replace the arrow, or `slots.indicator` to replace its container. Custom content and components must handle their own RTL direction; Menu v2 does not mirror them. Set `slots.indicator` to `null` to omit the indicator and its spacing. Keep another visible cue that the item opens a submenu.

By default, Escape closes only the submenu. Pass `closeParentOnEsc` to `MenuSubmenu` to close the whole menu.

## Icon menu

Compose the same list primitives that you use with the current Menu: `ListItemIcon`, `ListItemText`, and `Typography` for a shortcut hint.

{{"demo": "IconMenu2.js"}}

## Dense menu

Set `dense` on the `list` slot to make all the items compact. Submenus inherit the density of their parent list. Set `slotProps.list.dense` on a submenu to override it, including `false` for regular spacing. An item can also set its own `dense` prop.

{{"demo": "DenseMenu2.js"}}

Items also accept `disableGutters`, `divider`, and `disabled`, the same as the current `MenuItem`. Items show a ripple on click, the same as other Material UI buttons. Set `disableRipple` to remove it.

## Checkbox and radio items

`MenuCheckboxItem` renders `role="menuitemcheckbox"` with `aria-checked` and its own indicator. You don't add a separate indicator component.

A click on a checkbox item doesn't close the menu, so users can change several options in one visit.

{{"demo": "CheckboxMenu2.js"}}

For a single choice in a set, put `MenuRadioItem` components in a `MenuRadioGroup`:

{{"demo": "RadioMenu2.js"}}

Use `icon` and `checkedIcon` to change the unchecked and checked icons. Both item components accept these props. Set them on an item or in the theme's `defaultProps`:

```tsx
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckIcon from '@mui/icons-material/Check';
import { createTheme } from '@mui/material/styles';
import type {} from '@mui/material/Unstable_Menu2/themeAugmentation';

const theme = createTheme({
  components: {
    MuiMenu2CheckboxItem: {
      defaultProps: {
        icon: <CheckBoxOutlineBlankIcon fontSize="small" />,
        checkedIcon: <CheckIcon fontSize="small" />,
      },
    },
  },
});
```

Use `MuiMenu2RadioItem.defaultProps` to set the radio item icons. Custom icons keep their own size. If `slotProps.indicator.children` is not `null` or `undefined`, it takes precedence over both icon props. Use a slot callback if the content must depend on the item's state.

Checkbox items report changes with `onCheckedChange(checked, eventDetails)`. Radio groups use `onValueChange(value, eventDetails)`. For an uncontrolled item or group, use `defaultChecked` or `defaultValue`.

Read the new checked state or value from the first argument. The native event is available through `eventDetails.event`. Its target can be a descendant of the item.

:::info
Menu v2 items do not have a `selected` prop. Use checkbox or radio items for checked state.
:::

## Composed menu

The parts compose freely. This menu combines checkbox items with shortcut hints, a submenu with a radio group, icon items, and a disabled item. The item indicators and `ListItemIcon` have the same width, so the labels align.

{{"demo": "ComposedMenu2.js"}}

## Grouped menu

`MenuGroup` and `MenuGroupLabel` label a set of related items. The group refers to its label with `aria-labelledby`. Use `MenuSeparator` between groups.

{{"demo": "GroupedMenu2.js"}}

## Link items

`MenuLinkItem` renders a real anchor with `role="menuitem"`, so links behave like links. Middle click, right click, and keyboard activation all work.

{{"demo": "LinkItemsMenu2.js"}}

A link item doesn't close the menu on click by default. Set `closeOnClick` to close the menu, for example with client-side routing.

Unlike a classic `MenuItem` with `href`, `MenuLinkItem` does not support `disabled`.

## Positioned menu

`side` and `align` place the menu relative to its anchor, and `sideOffset` and `alignOffset` move it. The defaults are `side="bottom"` and `align="start"`.

Use the logical `inline-start` and `inline-end` sides to get the correct direction in right-to-left text.

Open the non-modal menu, then change the values for a live preview. Press Escape or use the trigger to close it. Offsets are in pixels and can be negative.

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
<Menu
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
- Give the menu an accessible name with `aria-label` or `aria-labelledby`.
- Pass `finalFocus` to return focus to the element when the menu closes. Otherwise, focus can move to an unrelated element.

## Max height menu

The menu limits its height to the viewport and to the space available at the anchor, and scrolls its content. To set a smaller limit on the `paper` slot, use `min(320px, var(--available-height))`. This keeps the menu within the available space on short screens.

Type a letter while the menu is open to move to the matching item.

{{"demo": "LongMenu2.js"}}

## Customization

`ref`, `className`, `style`, and `sx` target the portal's root element. It carries `theme.zIndex.modal` and keeps the menu and its modal interaction layer together above other content, including Dialog. Use `slotProps.positioner` to style or reference the element that positions the menu. Event handlers and the label and description attributes `aria-label`, `aria-labelledby`, and `aria-describedby` go to the menu surface. Other HTML attributes go to the root. Use a descendant selector or `slotProps.paper` to style the surface:

{{"demo": "CustomizedMenu2.js"}}

The slots are `root`, `positioner`, `backdrop`, `paper`, `list`, and `transition`. The `positioner` slot receives the positioning props and placement attributes, such as `data-side`. Keep using top-level props such as `side` and `align` to position the menu. `container` and `keepMounted` control the portal.

With `keepMounted`, the default root hides when its positioner becomes hidden, after the exit transition. Replacing `slots.root` removes both its stacking and closed-state styles; the replacement must provide them. Submenus use the parent menu's stacking context by default. Set `zIndex` on the top-level menu's root to change the stacking level of the whole menu; a submenu's `zIndex` stays within that level.

`elevation` is a top-level prop for the `paper` slot. Use `slotProps.paper` for other `aria-*` attributes and the ref on the element with `role="menu"`. Matching paper slot attributes take precedence over top-level attributes. An explicit `aria-labelledby` takes precedence over `aria-label`; either replaces the inferred trigger name.

The trigger isn't a slot, because you supply the element. Style it directly. It has the `.MuiMenu2Trigger-root` class, and the global `.Mui-open` class while the menu is open. Scope state selectors to the component, such as `.MuiMenu2Trigger-root.Mui-open`. `slotProps.trigger` accepts only `nativeButton`, `className`, and `ref`.

:::warning
While a menu or a submenu is open, Base UI renders hidden `span` elements next to its trigger. They keep the tab order and the accessibility tree correct. CSS sibling selectors (`+`, `~`, `:last-child`) near a trigger can match these elements. Style each part directly instead. The focus guards among them have a `data-base-ui-focus-guard` attribute.

For menus directly inside a `Stack`, set `useFlexGap` to use CSS gap instead of sibling margins. This prevents the trigger from moving when a focus guard is inserted before it.
:::

In TypeScript, import the theme augmentation once in your app to type all `MuiMenu2*` theme keys. Component imports do not add these types:

```ts
import type {} from '@mui/material/Unstable_Menu2/themeAugmentation';
```

This import adds no runtime code. The separate module keeps Base UI types out of apps that do not use Menu v2.

The theme has two keys for the menu surfaces. `MuiMenu2` has the slots `root`, `positioner`, `backdrop`, `paper`, and `list`. `MuiMenu2Submenu` has `root`, `positioner`, `paper`, and `list`. Each item part has its own key, such as `MuiMenu2Item`:

```js
import { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';

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
        root: {
          fontWeight: 500,
          [`&.${menu2ItemClasses.highlighted}`]: { backgroundColor: 'lightblue' },
        },
        dense: { minHeight: 28 },
      },
    },
    MuiMenu2CheckboxItem: {
      styleOverrides: {
        indicator: { minWidth: 32 },
      },
    },
  },
});
```

Use class selectors inside a slot override for states such as `highlighted`, `checked`, `disabled`, and `open`. Items also support the `dense`, `divider`, and `gutters` override keys, as classic MenuItem does. Scope global state classes to the component, for example `.MuiMenu2CheckboxItem-root.Mui-checked` and `.MuiMenu2SubmenuTrigger-root.Mui-open`. Slot callbacks and theme style callbacks receive the live item state.

### Checkbox and radio indicators

Use `slotProps.indicator` to customize an indicator, or `slots.indicator` to replace it. Slot callbacks receive the live checked, disabled, and highlighted state. A custom indicator must forward the supplied props and ref to its element, including the `className` with the state classes.

The default indicators use `ListItemIcon`, so `.MuiListItemIcon-root` selectors apply to both indicators and decorative icons. Each item still has its own theme key. With modular CSS layers, `MuiListItemIcon` theme overrides take precedence over the default indicator colors. Use the item's `styleOverrides.indicator` or `slotProps.indicator.sx` to set indicator-specific colors.

The default indicator components are internal. Their class objects are exported from the owning item:

```jsx
import MenuCheckboxItem, {
  menu2CheckboxItemIndicatorClasses,
} from '@mui/material/Unstable_Menu2CheckboxItem';

<MenuCheckboxItem
  sx={{
    [`& .${menu2CheckboxItemIndicatorClasses.root}`]: { minWidth: 32 },
  }}
>
  Show toolbar
</MenuCheckboxItem>;
```

For radio items, import `menu2RadioItemIndicatorClasses` from `Unstable_Menu2RadioItem`. Set theme defaults through the owning item's `defaultProps.slotProps.indicator` and styles through `styleOverrides.indicator`. Indicators have no separate theme keys.

### Transitions

The menu uses the `Grow` transition, the same as the current Menu. With the default `transitionDuration="auto"`, the duration depends on the height of the menu. Pass a different transition component to `slots.transition`, and its props to `slotProps.transition`:

{{"demo": "FadeMenu2.js"}}

Grow, Fade, and Zoom are tested. A custom transition must forward its child's props and ref, animate that same popup element, and add no DOM wrapper. The animation must start in time for Base UI to detect it. Test other transitions before use.

Use `onOpenChangeComplete(open)` for completion, not the transition's `onEntered` or `onExited`. Base UI controls mounting and can unmount the transition before its completion timer fires. The adapter controls `in`, `appear`, `mountOnEnter`, and `unmountOnExit`.

Set `transitionDuration={0}` to remove the animation. To animate with CSS, set `slots.transition` to `null`. The menu surface has the `data-starting-style` attribute while it enters and the `data-ending-style` attribute while it leaves:

```jsx
<Menu
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

`Grow` and the other Material UI transitions follow [`theme.motion.reducedMotion`](/material-ui/customization/transitions/#reduced-motion). CSS animations need their own reduced-motion handling.

### Backdrop

Base UI uses an internal, transparent backdrop for modal menus. This layer is absent when a menu opens on hover or has `modal={false}`.

The optional visual backdrop is separate and is not rendered by default. Set `slots.backdrop` or `slotProps.backdrop` to render it inside the root, behind the menu. Its default styles are transparent and do not capture pointer events. To dim the page:

```jsx
<Menu
  trigger={<Button>Options</Button>}
  slotProps={{ backdrop: { sx: { bgcolor: 'rgba(0, 0, 0, 0.5)' } } }}
>
```

Set `slots={{ backdrop: null }}` to omit this layer, including when the theme supplies backdrop slot props. This does not change modal behavior. Base UI does not hide this optional layer when the menu opens on hover. Submenus have no backdrop slot.

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
