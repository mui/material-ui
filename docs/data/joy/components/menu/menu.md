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

{{"demo": "SizeMenu.js", "bg": true}}

### Selected menu

If used for item selection, when opened, simple menus places the initial focus on the selected menu item.
The currently selected menu item is set using the `selected` prop (from [ListItem](/material-ui/api/list-item/)).
To use a selected menu item without impacting the initial focus, set the `variant` prop to "menu".

<!-- {{"demo": "SimpleListMenu.js"}} -->

### Positioned menu

Because the `Menu` component uses the `Popover` component to position itself, you can use the same [positioning props](/material-ui/react-popover/#anchor-playground) to position it.
For instance, you can display the menu on top of the anchor:

<!-- {{"demo": "PositionedMenu.js"}} -->

### MenuList composition

The `Menu` component uses the `Popover` component internally.
However, you might want to use a different positioning strategy, or not blocking the scroll.
For answering those needs, we expose a `MenuList` component that you can compose, with `Popper` in this example.

The primary responsibility of the `MenuList` component is to handle the focus.

<!-- {{"demo": "MenuListComposition.js", "bg": true}} -->
