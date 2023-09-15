---
productId: joy-ui
title: React Drawer component
components: Drawer
githubLabel: 'component: drawer'
---

# Drawer

<p class="description">Navigation drawers provide quick access to other app areas without removing the user out of context.</p>

## Introduction

The Drawer component is commonly used as a type of menu on desktop and as a dialog on mobile (similar to [Apple's sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)).

{{"demo": "DrawerUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basic

The Drawer can be closed by clicking on the overlay or pressing the <kbd>Esc</kbd> key.
It will also close if an item inside of it is selected, which can be controlled by the `open` prop.

{{"demo": "DrawerBasic.js"}}

## Customization

### Anchor

Use the anchor prop to specify where the drawer should appear from.

{{"demo": "DrawerAnchor.js"}}

### Close button

Use the Modal Close component to add a close button to the Drawer.

{{"demo": "DrawerCloseButton.js"}}

### Size

Use the `size` prop to adjust the Drawer's width.

{{"demo": "DrawerSize.js"}}

### Transition

Customize the Drawer's opening transition by using the CSS variables below inside the sx prop:

- `--Drawer-transitionFunction`: the [transition function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function); default is `ease`.
- `--Drawer-transitionDuration`: the [duration of the transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration); default is `0.3s`.

{{"demo": "DrawerTransition.js"}}

### Scrollable content

Use the Dialog Content component to create a scrollable container inside the Drawer.

{{"demo": "DrawerScrollable.js"}}

## Common examples

### Mobile navigation

A common use case for the Drawer is mobile menus.

{{"demo": "DrawerMobileNavigation.js"}}

### Inset drawer

To make the Drawer not glued to the edge of the viewport, creating an inset style, use a combination of background and padding values on the Drawer component and either a Box or [Sheet](/joy-ui/react-sheet/) to the full-height wrapper.

{{"demo": "DrawerFilters.js"}}
