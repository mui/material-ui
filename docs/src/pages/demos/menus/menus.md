---
title: Menu React component
components: Menu, MenuItem, MenuList, ClickAwayListener, Popper
---

# Menus

<p class="description">Menus display a list of choices on temporary surfaces.</p>

A [Menu](https://material.io/design/components/menus.html) displays a list of choices on a temporary surface. They appear when users interact with a button, action, or other control.

## Simple Menu

Simple menus open over the anchor element by default (this option can be changed via props). When close to a screen edge, simple menus vertically realign to make all menu items are completely visible.

Choosing an option should immediately ideally commit the option and close the menu.

**Disambiguation**: In contrast to simple menus, simple dialogs can present additional detail related to the options available for a list item or provide navigational or orthogonal actions related to the primary task. Although they can display the same content, simple menus are preferred over simple dialogs because simple menus are less disruptive to the user’s current context.

{{"demo": "pages/demos/menus/SimpleMenu.js"}}

## Selected menus

If used for item selection, when opened, simple menus attempt to vertically align the currently selected menu item with the anchor element.
The currently selected menu item is set using the `selected` property (from [ListItem](/api/list-item)).

{{"demo": "pages/demos/menus/SimpleListMenu.js"}}

If text in a simple menu wraps to a second line, use a simple dialog instead. Simple dialogs can have rows with varying heights.

## Max height menus

If the height of a menu prevents all menu items from being displayed, the menu can scroll internally.

{{"demo": "pages/demos/menus/LongMenu.js"}}

## MenuList composition

The `Menu` component uses the `Popover` component internally.
However, you might want to use a different positioning strategy, or not blocking the scroll.
For answering those needs, we expose a `MenuList` component that you can compose, with `Popper` in this example.

The primary responsibility of the `MenuList` component is to handle the focus.

{{"demo": "pages/demos/menus/MenuListComposition.js"}}

## Customized MenuItem

The `MenuItem` is a wrapper around `ListItem` with some additional styles.
You can use the same list composition features with the `MenuItem` component:

{{"demo": "pages/demos/menus/ListItemComposition.js"}}

## Change Transition

Use a different transition altogether.

{{"demo": "pages/demos/menus/FadeMenu.js"}}

## Render Props

It is a [render props](https://reactjs.org/docs/render-props.html) demo that
keeps track of the local state for a single menu.

{{"demo": "pages/demos/menus/RenderPropsMenu.js"}}
