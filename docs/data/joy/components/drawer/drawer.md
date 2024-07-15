---
productId: joy-ui
title: React Drawer component
components: Drawer, ModalClose, DialogContent
githubLabel: 'component: drawer'
---

# Drawer

<p class="description">Navigation drawers provide quick access to other areas of an app without taking the user away from their current location.</p>

## Introduction

Drawers are commonly used as menus for desktop navigation, and as dialogs on mobile devices (similar to [Apple's sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)).

{{"demo": "DrawerUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import Drawer from '@mui/joy/Drawer';
```

The Drawer will close after the user makes a selection, clicks anywhere outside of it, or presses the <kbd class="key">Esc</kbd> key.

Use the `open` prop to control the toggling of the Drawer's open and close states, as shown in the demo below:

{{"demo": "DrawerBasic.js"}}

## Customization

### Anchor

Use the `anchor` prop to specify which side of the screen the Drawer should originate from.
The default value is `left`.

{{"demo": "DrawerAnchor.js"}}

### Size

Use the `size` prop to adjust the Drawer's width (when anchored to the left or right) or height (when anchored to the top or bottom).

{{"demo": "DrawerSize.js"}}

### Close button

Use the Modal Close component to add a close button to the Drawer that automatically handles the `onClick` event.

```jsx
import ModalClose from '@mui/joy/ModalClose';
```

{{"demo": "DrawerCloseButton.js"}}

### Transition

Customize the Drawer's opening transition by using the CSS variables below inside the [`sx` prop](/system/getting-started/the-sx-prop/):

- `--Drawer-transitionFunction`: the [transition function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function); default is `ease`.
- `--Drawer-transitionDuration`: the [duration of the transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration); default is `0.3s`.

{{"demo": "DrawerTransition.js"}}

### Scrollable content

Use the Dialog Content component to create a scrollable container inside the Drawer.

```jsx
import DialogContent from '@mui/joy/DialogContent';
```

{{"demo": "DrawerScrollable.js"}}

## Common examples

### Mobile navigation

A common use case for the Drawer is to build mobile-friendly navigation menus:

{{"demo": "DrawerMobileNavigation.js"}}

### Inset drawer

An inset drawer is a panel that's not anchored to any edge of the screen.

You can achieve this by applying background and padding values to the Drawer component, and using either a Box or [Sheet](/joy-ui/react-sheet/) component for a full-height wrapper, as shown below:

{{"demo": "DrawerFilters.js"}}
