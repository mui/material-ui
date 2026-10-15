---
productId: material-ui
title: React Menu v2 component
components: Menu2, Menu2Item, Menu2LinkItem, Menu2CheckboxItem, Menu2RadioGroup, Menu2RadioItem, Menu2Submenu, Menu2SubmenuTrigger, Menu2Group, Menu2GroupLabel, Menu2Separator
githubLabel: 'scope: menu'
materialDesign: https://m2.material.io/components/menus
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
githubSource: packages/mui-material/src/Unstable_Menu2
---

# Menu v2

<p class="description">Menus display a list of choices on temporary surfaces. Menu v2 adds submenus, checkbox and radio items, and grouping.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

:::warning
Menu v2 is an unstable component.
Import it from the `Unstable_Menu2` subpaths.
Its API can change in a minor release.

The [current Menu](/material-ui/react-menu/) doesn't change, and you can use both components in the same app.
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

Each component is the default export of its own subpath.
These examples use local names such as `Menu` and `MenuItem` for the components imported from `Unstable_Menu2` subpaths.
The import paths, theme keys, and CSS classes keep their `Menu2` names.

## Why a new menu component

Submenus are [one of the most requested Menu features since 2018](https://github.com/mui/material-ui/issues/11723), but the current modal-based Menu can't support them.
Menu v2 uses [Base UI](https://base-ui.com/react/components/menu) to provide more menu building blocks and improve keyboard and screen reader support:

- **Nested menus** coordinate focus and keyboard navigation. Positioning follows the anchor and flips to avoid collisions.
- **Checkbox and radio items**, labeled groups, and link items provide built-in roles and ARIA attributes.
- **Disabled items stay focusable**, and content outside the menu remains available to screen readers.
- **The trigger prop** handles anchor state and ARIA attributes. Opening with a pointer highlights no item. Enter, Space, and ArrowDown highlight the first enabled item; ArrowUp highlights the last enabled item.

Material UI supplies the styles and theming.
Base UI is included in `@mui/material`; no extra installation is needed, and apps that don't import Menu v2 don't bundle it.

See [Upgrade to Menu v2](/material-ui/migration/upgrade-to-menu-v2/) for the architecture, prop mappings, and behavior changes.

## Basic menu

Pass the element that opens the menu to the `trigger` prop, and the items as children.

{{"component": "file://./demos/basic/index.ts"}}

Selecting a `MenuItem` closes the menu by default.
Set `closeOnClick={false}` to keep it open.
Checkbox, radio, and link items stay open by default; set `closeOnClick` to close after selection.

:::warning
A custom trigger component must forward props and ref to its element, the same as [Tooltip](/material-ui/react-tooltip/), or the menu doesn't open.
Set `slotProps.trigger.nativeButton` to `false` when it doesn't render a native `<button>`.
:::

## Account menu

The trigger can be a composed element, such as an `IconButton` in a `Tooltip`.
`align="end"` aligns the menu with the end of the trigger.

Give the `IconButton` a unique `id` so the menu can use it as its accessible label.
Tooltip uses its own `id` prop for the tooltip, not the button.

{{"component": "file://./demos/account/index.ts"}}

## Open a dialog

Keep the Dialog outside the menu so that it stays mounted when the menu closes.
Open it from the item's `onClick` handler.

:::warning
Dialog can save a menu item as its return target before the menu closes.
That item is then removed or hidden, so focus does not return to the trigger when Dialog closes.
:::

Keep a ref on the menu trigger and set `disableRestoreFocus` on Dialog.
Focus the trigger from **Dialog's** `slotProps.transition.onExited` callback:

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

Keep the trigger mounted and enabled until the dialog closes.
This changes Dialog's return target, not Menu v2's focus behavior.
The [live recipe](/experiments/menu2-recipes/#menu2-open-dialog) includes a classic Menu comparison and a control to disable the workaround.

## Submenu

Nest a `MenuSubmenu` in the item list, and pass a `MenuSubmenuTrigger` to its `trigger` prop.
Its children are the submenu items.
The trigger can be wrapped in another component, but regular, link, checkbox, and radio items do not open a submenu.

{{"component": "file://./demos/submenu/index.ts"}}

By default, a submenu opens on mouse hover after 100 ms; a click does not bypass this delay.
Set `openOnHover={false}` on `MenuSubmenuTrigger` to open with a mouse click instead.
Touch taps, Enter, Space, and ArrowRight also open it, or ArrowLeft in right-to-left text.
See the [trigger API](/material-ui/api/menu-2-submenu-trigger/) for hover timing and arrow customization.
If you remove the arrow, keep another visible cue that the item opens a submenu.

Submenus nest to any depth and flip when they run out of room.
Escape closes the innermost submenu and returns focus to its trigger.
Pass `closeParentOnEsc` to `MenuSubmenu` to close the whole menu.

## Icon menu

Compose the same list primitives that you use with the current Menu: `ListItemIcon`, `ListItemText`, and `Typography` for a shortcut hint.

{{"component": "file://./demos/icon/index.ts"}}

## Dense menu

Set `dense` on the `list` slot to make all the items compact.
Submenus inherit their parent list's density.
Set `slotProps.list.dense` on a submenu to override it, including `false` for regular spacing.
An item can also set its own `dense` prop.

{{"component": "file://./demos/dense/index.ts"}}

## Checkbox and radio items

`MenuCheckboxItem` renders `role="menuitemcheckbox"` with its own indicator.
For a single choice in a set, put `MenuRadioItem` components in a `MenuRadioGroup`.
Both keep the menu open by default so users can change several options.

{{"component": "file://./demos/checkbox-radio/index.ts"}}

Read the new value from the first callback argument: `onCheckedChange(checked, eventDetails)` or `onValueChange(value, eventDetails)`.
For an uncontrolled item or group, use `defaultChecked` or `defaultValue`.
To change the icons, see [Checkbox and radio indicators](#checkbox-and-radio-indicators).

:::info
Menu v2 items do not have a `selected` prop.
Use checkbox or radio items for checked state.
:::

## Composed menu

The parts compose freely: checkbox items with shortcut hints, a submenu with a radio group, icon items, and a disabled item.

{{"component": "file://./demos/composed/index.ts"}}

## Grouped menu

`MenuGroup` and `MenuGroupLabel` label a set of related items.
The group refers to its label with `aria-labelledby`.
Use `MenuSeparator` between groups.

{{"component": "file://./demos/grouped/index.ts"}}

## Link items

`MenuLinkItem` renders a real anchor with `role="menuitem"`, so middle-click, right-click, and keyboard activation behave like a link.

{{"component": "file://./demos/link-items/index.ts"}}

A link item doesn't close the menu on click by default.
Set `closeOnClick` to close it, for example with client-side routing.

:::warning
Unlike a classic `MenuItem` with `href`, `MenuLinkItem` does not support `disabled`.
:::

## Positioned menu

`side` and `align` place the menu relative to its anchor, and `sideOffset` and `alignOffset` move it.
The defaults are `side="bottom"` and `align="start"`.

Use the logical `inline-start` and `inline-end` sides to get the correct direction in right-to-left text.

Open the non-modal menu, then change the values for a live preview.
Press Escape or use the trigger to close it.

{{"component": "file://./demos/positioned/index.ts"}}

The menu flips when it collides with the edge of its container, and it follows its anchor on scroll and resize.

## Open on hover

Set `openOnHover` to open the menu when the pointer rests on the trigger.

{{"component": "file://./demos/hover/index.ts"}}

A menu that opens on hover isn't modal, so the rest of the page stays interactive.

## Controlled menu

Pass `open` and `onOpenChange` to control the open state.
The trigger still sets the ARIA attributes and receives focus when the menu closes.

{{"component": "file://./demos/controlled/index.ts"}}

### Keep the menu open

`onOpenChange` receives the reason for the change in `eventDetails.reason`.
Call `eventDetails.cancel()` to prevent a close, for example on an outside press.
This works for controlled and uncontrolled menus:

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

Omit `trigger` and pass `anchor` to position the menu against an element that you control, the same as `anchorEl` in the current Menu.
The menu can't connect to that element, so you do the wiring:

- Add `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls` to the element. Set the matching `id` on the menu with `slotProps.paper`.
- Give the menu an accessible name with `aria-label` or `aria-labelledby`.
- Pass `finalFocus` to return focus to the element when the menu closes. Otherwise, focus can move to an unrelated element.

:::info
Menu v2 doesn't support context menus.
:::

## Max height menu

The menu limits its height to the viewport and to the space available at the anchor, and scrolls its content.
To set a smaller limit on the `paper` slot, use `min(320px, var(--available-height))` to keep it within short screens.

{{"component": "file://./demos/long/index.ts"}}

## Customization

Style the menu with `sx`, slots, or the `MuiMenu2*` theme keys.
See the [theme components](/material-ui/customization/theme-components/) guide for `defaultProps` and `styleOverrides`, and the [API reference](/material-ui/api/menu-2/) for the slots and CSS classes.

### Slots

`ref`, `className`, `style`, and `sx` target the portal's root element, not the positioned element.
Use `slotProps.positioner` for the positioned element and `slotProps.paper` for the menu surface.
Top-level event handlers and `aria-label`, `aria-labelledby`, and `aria-describedby` also target the surface; other HTML attributes go to the root.
Keep using top-level props such as `side` and `align` for positioning.

The root carries `theme.zIndex.modal` and keeps the menu and its modal interaction layer above other content, including Dialog.
Submenus stay within the root menu's stacking context, so change the top-level root's `zIndex` to change the whole menu's stacking level.

:::warning
A replacement `slots.root` must provide its own stacking and closed-state styles.
With `keepMounted`, the default root hides after the exit transition, when its positioner becomes hidden.
:::

This demo wraps Menu in `styled()` to set defaults and styles the surface and items through their class selectors:

{{"component": "file://./demos/customized/index.ts"}}

### Trigger

The trigger isn't a slot, because you supply the element.
Style it directly, or use a scoped state selector such as `.MuiMenu2Trigger-root.Mui-open`.
`slotProps.trigger` accepts only `nativeButton`, `className`, and `ref`.

:::warning
While a menu or submenu is open, Base UI renders hidden `span` elements next to its trigger for focus and accessibility.
CSS sibling selectors (`+`, `~`, `:last-child`) can match these elements.
Style each part directly instead, and set `useFlexGap` on a `Stack` that contains menu triggers to prevent layout shifts.
The focus guards have a `data-base-ui-focus-guard` attribute.
:::

### Shared theme styles

`MuiMenu2.styleOverrides` also applies to matching submenu slots.
`MuiMenu2Item.styleOverrides` applies to all item roots, including link, checkbox, and radio items and submenu triggers.
The `dense`, `divider`, and `gutters` overrides apply when the corresponding state matches.
Theme variants are shared too; menu variants apply only to the `root` slot.

Component-specific styles apply after shared styles, with `sx` last; CSS specificity still applies.
Callbacks receive the rendered component's live state.
Utility classes remain component-specific, and **`defaultProps` are not shared** between theme keys.

Use scoped state selectors such as `.MuiMenu2CheckboxItem-root.Mui-checked` inside a slot override, or a theme variant for states such as `highlighted`.

### State data attributes

Menu v2 also provides these Base UI `data-*` attributes for CSS selectors and Tailwind CSS:

| Element                                                     | Attributes                                                                                        |
| :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| Root menu trigger                                           | `data-popup-open`, `data-pressed`, `data-disabled`                                                |
| `MenuItem` root                                             | `data-highlighted`, `data-disabled`                                                               |
| `MenuLinkItem` root                                         | `data-highlighted`                                                                                |
| `MenuCheckboxItem` and `MenuRadioItem` roots and indicators | `data-highlighted`, `data-disabled`, `data-checked`, `data-unchecked`                             |
| `MenuSubmenuTrigger` root                                   | `data-popup-open`, `data-highlighted`, `data-disabled`                                            |
| `paper` slot                                                | `data-open`, `data-closed`, `data-side`, `data-align`, `data-starting-style`, `data-ending-style` |
| `positioner` slot                                           | `data-open`, `data-closed`, `data-side`, `data-align`                                             |
| Optional `backdrop` slot                                    | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`                            |

State attributes have an empty value when active and are absent otherwise: use `[data-checked]`, not `[data-checked="true"]`.
Checked items and their indicators have either `data-checked` or `data-unchecked`.
`data-side` and `data-align` contain the resolved placement after collision handling.

Triggers use `data-popup-open`, not `data-open`.
On the root trigger, `data-pressed` follows the open state and `data-disabled` follows Menu's `disabled` prop.
`data-highlighted` follows pointer and keyboard navigation, including focus on disabled items; use `.Mui-focusVisible` for keyboard focus-visible styles.

The menu's `root` and `list` slots and the submenu arrow have no automatic state attributes.
Custom slots must forward the supplied props and ref.
Internal `data-mui-*` markers are not part of this styling contract.

For example, after the [Tailwind CSS v4 setup](/material-ui/integrations/tailwindcss/tailwindcss-v4/), style a checked item with a presence variant:

```jsx
<MenuCheckboxItem className="data-[checked]:font-semibold">
  Show toolbar
</MenuCheckboxItem>
```

### Checkbox and radio indicators

Use `icon` and `checkedIcon` on `MenuCheckboxItem` and `MenuRadioItem` to change the unchecked and checked icons.
Custom icons keep their own size.

{{"component": "file://./demos/indicator-icons/index.ts"}}

Use `slotProps.indicator` to customize the indicator container, or `slots.indicator` to replace it.
If `slotProps.indicator.children` is neither `null` nor `undefined`, it takes precedence over the icon props.
Slot callbacks receive the live checked, disabled, and highlighted state.
A replacement must forward the supplied props and ref, including the state classes in `className`.

The default indicators use `ListItemIcon`, so its selectors also affect indicators.
With modular CSS layers, `MuiListItemIcon` theme overrides take precedence over default indicator colors.
For indicator-specific styles, use the item's `styleOverrides.indicator` or `slotProps.indicator.sx`; indicators have no separate theme keys.
The internal indicator components are not exported, but their owning items export `menu2CheckboxItemIndicatorClasses` and `menu2RadioItemIndicatorClasses` for CSS selectors.

### Transitions

The menu uses the `Grow` transition, the same as the current Menu.
With the default `transitionDuration="auto"`, the duration depends on the height of the menu.
Pass a different transition component to `slots.transition`, and its props to `slotProps.transition`:

{{"component": "file://./demos/fade/index.ts"}}

Grow, Fade, and Zoom work with Menu v2.
A custom transition must forward its child's props and ref, animate that same popup element, and add no DOM wrapper.
The animation must start in time for Base UI to detect it.
Test other transitions before use.

The adapter controls `in`, `appear`, `mountOnEnter`, and `unmountOnExit`.

:::warning
Use `onOpenChangeComplete(open)` for completion, not the transition's `onEntered` or `onExited`.
Base UI controls mounting and can unmount the transition before its completion timer fires.
:::

Set `transitionDuration={0}` to remove the animation.
To animate with CSS, set `slots.transition` to `null`.
The menu surface has `data-starting-style` for its initial style, then removes it to start the enter transition.
It has `data-ending-style` while it leaves:

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

`Grow` and the other Material UI transitions follow [`theme.motion.reducedMotion`](/material-ui/customization/transitions/#reduced-motion).
CSS animations need their own reduced-motion handling.

`data-closed` marks the logical closed state, not the end of the exit transition.
With `keepMounted`, the paper and positioner keep `data-closed` while hidden after the transition.
Without it, they unmount.

### Backdrop

Base UI uses an internal, transparent backdrop for modal menus.
This layer is absent when a menu opens on hover or has `modal={false}`.

The optional visual backdrop is separate and is not rendered by default.
Set `slots.backdrop` or `slotProps.backdrop` to render it inside the root, behind the menu.
Its default styles are transparent and do not capture pointer events.
To dim the page:

```jsx
<Menu
  trigger={<Button>Options</Button>}
  slotProps={{ backdrop: { sx: { bgcolor: 'rgba(0, 0, 0, 0.5)' } } }}
>
```

Set `slots={{ backdrop: null }}` to omit this layer, including when the theme supplies backdrop slot props.
This does not change modal behavior.
Base UI does not hide this optional layer when the menu opens on hover.
Submenus have no backdrop slot.

## Accessibility

Menu v2 follows the [WAI-ARIA menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/).
It handles the trigger, the roles, the keyboard behavior, focus management, and dismissal:

- The trigger gets `aria-haspopup`, `aria-expanded`, and `aria-controls`.
- Arrow keys move between items and respect right-to-left text. Home and End move to the first and the last item.
- Typeahead matches items by their text content, or by the `label` prop when the content isn't plain text.
- Disabled items stay focusable, and screen readers announce them as disabled.
- Escape closes one level at a time and returns focus to the trigger of that level.

The menu takes its accessible name from the trigger.
`aria-label` or `aria-labelledby` on `Menu` replaces it, and an explicit `aria-labelledby` takes precedence over `aria-label`.
Matching attributes on `slotProps.paper` take precedence over the top-level ones.

Two things stay your responsibility:

- **Label an icon-only trigger.** Pass `aria-label` to the element that you supply as `trigger`.
- **Keep custom item content readable.** Icons, secondary text, and shortcut hints in an item need sufficient contrast.
