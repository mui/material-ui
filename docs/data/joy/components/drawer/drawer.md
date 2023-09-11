---
productId: joy-ui
title: React Drawer component
components: Drawer
githubLabel: 'component: drawer'
---

# Drawer

<p class="description">Navigation drawers provide quick access to other destinations in your app without removing the user out of context.</p>

## Introduction

{{"demo": "DrawerUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basic

The navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected.

The Drawer can be cancelled by clicking the overlay or pressing the Esc key.
It closes when an item is selected, handled by controlling the `open` prop.

{{"demo": "DrawerBasic.js"}}

## Customization

### Anchor

You can use the `anchor` prop for specifying where the drawer should appear from.

{{"demo": "DrawerAnchor.js"}}

### Close button

Use the ModalClose component to add a close button to the drawer.

{{"demo": "DrawerCloseButton.js"}}

### Size

The `size` prop allows you to adjust the size of the drawer.

{{"demo": "DrawerSize.js"}}

### Transition

Set these CSS variables to the `sx` prop to the transition of the drawer:

- `--Drawer-transitionFunction`: the [transition function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function), default is `ease`.
- `--Drawer-transitionDuration`: the [duration of the transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration), default is `0.3s`.

{{"demo": "DrawerTransition.js"}}

### Scrollable content

Use the DialogContent component to create a scrollable content inside the drawer.

{{"demo": "DrawerScrollable.js"}}

## Common examples

### Mobile navigation

{{"demo": "DrawerMobileNavigation.js"}}

### Filter drawer

To create an inset panel, set the background and padding of the Drawer's content slot and then create a full height wrapper using [Sheet](/joy-ui/react-sheet/) or Box component.

{{"demo": "DrawerFilters.js"}}
