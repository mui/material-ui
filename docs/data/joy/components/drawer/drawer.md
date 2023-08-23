---
productId: joy-ui
title: React Drawer component
components: Drawer, PermanentDrawer
githubLabel: 'component: drawer'
---

# Drawer

<p class="description">Navigation drawers provide quick access to other destinations in your app without removing the user out of context.</p>

## Introduction

{{"demo": "DrawerUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Temporary drawers

Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected.

The Drawer can be cancelled by clicking the overlay or pressing the Esc key.
It closes when an item is selected, handled by controlling the `open` prop.

{{"demo": "DrawerBasic.js"}}

## Permanent drawers

Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. They cannot be closed.

Permanent navigation drawers are the **recommended default for desktop**.

{{"demo": "PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "PermanentDrawerRight.js", "iframe": true}}

### Clipped under the app bar

Apps focused on productivity that require balance across the screen.

{{"demo": "ClippedDrawer.js", "iframe": true}}
