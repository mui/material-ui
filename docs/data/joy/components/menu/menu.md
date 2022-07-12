---
product: joy-ui
title: React Menu component
githubLabel: 'component: menu'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/
unstyled: /base/react-menu/
---

# Menu

<p class="description">Menus display a list of choices on temporary surfaces.</p>

## Introduction

A menu displays a list of choices on a temporary surface. It appears when the user interacts with a button, or other control.

Joy UI provides three menu-related components:

- `Menu`: A popup and a listbox for wrapping the menu items.
- `MenuItem`: A menu item which uses the same styles to the `ListItemButton`.
- `MenuList`: A standalone listbox for composition usage.

## Component

### Basic

A basic menu opens over the anchor element by default (this option can be [changed](#menu-positioning) via props). When close to a screen edge, a basic menu vertically realigns to make sure that all menu items are completely visible.

Choosing an option should immediately ideally commit the option and close the menu.

{{"demo": "BasicMenu.js"}}

### Size

By specifying the `size` prop to the menu, the value is passed down to all of the menu items under it.

{{"demo": "SizeMenu.js"}}

### Selected

Because `MenuItem` uses the same styles as the [`ListItemButton`](/joy-ui/react-list/#selected), you can provide the `selected` prop to it to visually communicate the selected state.

{{"demo": "SelectedMenu.js"}}

### Positioned menu

Because the `Menu` component uses the `PopperUnstyled` component to position itself, you can use the same [placement props](/base/react-popper/#placement) to position it.

For instance, you can display the menu from the bottom-end of the anchor:

{{"demo": "PositionedMenu.js"}}

### MenuList composition

If you want to have full control on the DOM structure, we expose a `MenuList` component that you can compose with any popup component. In this demo, the [`PopperUnstyled`](/base/react-popper/) is used to demonstrate the composition.

The primary responsibility of the `MenuList` component is to handle the focus.

{{"demo": "MenuListComposition.js"}}
