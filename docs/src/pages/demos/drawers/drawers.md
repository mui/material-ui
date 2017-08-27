---
components: Drawer
---

# Drawer

The [Drawer](https://material.io/guidelines/patterns/navigation-drawer.html) slides in from the side. It is a common pattern found in Google apps and follows the keylines and metrics for lists.

## Temporary drawer

Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected.

The Drawer can be cancelled by clicking the overlay or pressing the Esc key.
It closes when an item is selected, handled by controlling the `open` prop.

{{demo='pages/demos/drawers/TemporaryDrawer.js'}}

## Permanent drawer

Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. They cannot be closed.

Permanent navigation drawers are the recommended default for desktop.

{{demo='pages/demos/drawers/PermanentDrawer.js'}}

## Persistent drawer

Persistent navigation drawers can toggle open or closed. The drawer sits on the same surface elevation as the content. It is closed by default and opens by selecting the menu icon, and stays open until closed by the user. The state of the drawer is remembered from action to action and session to session.

When the drawer is outside of the page grid and opens, the drawer forces other content to change size and adapt to the smaller viewport.

Persistent navigation drawers are acceptable for all sizes larger than mobile. They are not recommended for apps with multiple levels of hierarchy that require using an up arrow for navigation.

{{demo='pages/demos/drawers/PersistentDrawer.js'}}

## Mini variant drawer

In this variation, the persistent navigation drawer changes its width. Its resting state is as a mini-drawer at the same elevation as the content, clipped by the app bar. When expanded, it appears as the standard persistent navigation drawer.

The mini variant is recommended for apps sections that need quick selection access alongside content.

{{demo='pages/demos/drawers/MiniDrawer.js'}}
