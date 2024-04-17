---
productId: material-ui
title: React Menu Component
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
githubLabel: 'component: menu'
materialDesign: https://m2.material.io/components/menus
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
unstyled: /base-ui/react-menu/
---

# Menu Component

<p class="description">Menus display a list of choices on temporary surfaces.</p>

A menu displays a list of choices on a temporary surface. It appears when the user interacts with a button or other control.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic Menu

A basic menu opens over the anchor element by default. This option can be [changed](#menu-positioning) via props. When close to a screen edge, a basic menu vertically realigns to ensure that all menu items are completely visible.

Choosing an option should ideally commit the selection and close the menu.

**Disambiguation**: Simple menus differ from simple dialogs, which can present additional detail related to list items or provide navigational or orthogonal actions. Simple menus are preferred over simple dialogs because they are less disruptive to the user's current context.

{{"demo": "BasicMenu.js"}}

## Icon Menu

In the desktop viewport, padding is increased to provide more space for the menu.

{{"demo": "IconMenu.js", "bg": true}}

## Dense Menu

For menus with long lists and text, you can use the `dense` prop to reduce the padding and text size.

{{"demo": "DenseMenu.js", "bg": true}}

## Selected Menu

If used for item selection, simple menus place the initial focus on the selected menu item when opened. The currently selected menu item is set using the `selected` prop (from [ListItem](/material-ui/api/list-item/)). To use a selected menu item without impacting the initial focus, set the `variant` prop to "menu".

{{"demo": "SimpleListMenu.js"}}

## Positioned Menu

The `Menu` component uses the `Popover` component for positioning, allowing the use of the same [positioning props](/material-ui/react-popover/#anchor-playground) to position it. For example, you can display the menu on top of the anchor:

{{"demo": "PositionedMenu.js"}}

## MenuList Composition

While the `Menu` component internally uses the `Popover` component, you might require a different positioning strategy or not want to block the scroll. To address these needs, we expose a `MenuList` component that you can compose, with `Popper` in this example. The primary responsibility of the `MenuList` component is to handle focus.

{{"demo": "MenuListComposition.js"}}

## Account Menu

Menu content can be mixed with other components like `Avatar`.

{{"demo": "AccountMenu.js"}}

## Customization

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedMenus.js"}}

The `MenuItem` is a wrapper around `ListItem` with additional styles. You can use the same list composition features with the `MenuItem` component.

🎨 For inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/?path=/docs/menu-introduction--docs).

## Max Height Menu

If the menu's height prevents all menu items from being displayed, it can scroll internally.

{{"demo": "LongMenu.js"}}

## Limitations

There is [a flexbox bug](https://bugs.chromium.org/p/chromium/issues/detail?id=327437) that prevents `text-overflow: ellipsis` from working in a flexbox layout. You can use the `Typography` component with `noWrap` to workaround this issue:

{{"demo": "TypographyMenu.js", "bg": true}}

## Change Transition

Use a different transition.

{{"demo": "FadeMenu.js"}}

## Context Menu

Here is an example of a context menu. (Right-click to open.)

{{"demo": "ContextMenu.js"}}

## Complementary Projects

For more advanced use cases, you might be able to take advantage of:

### material-ui-popup-state

![stars](https://img.shields.io/github/stars/jcoreio/material-ui-popup-state?style=social&label=Star)
![npm downloads](https://img.shields.io/npm/dm/material-ui-popup-state.svg)

The package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) takes care of menu state for you in most cases.

{{"demo": "MenuPopupState.js"}}

