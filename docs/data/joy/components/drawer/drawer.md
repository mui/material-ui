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

{{"demo": "DrawerBasic.js", "iframe": true}}

## Customization

### Anchor

You can use the `anchor` prop for specifying where the drawer should appear from.

{{"demo": "DrawerAnchor.js"}}

### Size

The `size` prop allows you to adjust the size of the drawer.

{{"demo": "DrawerSize.js"}}
