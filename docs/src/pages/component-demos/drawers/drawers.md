---
components: Drawer
---

# Drawer

The [Drawer](https://material.io/guidelines/patterns/navigation-drawer.html) slides in from the side. It is a common pattern found in Google apps and follows the keylines and metrics for lists.

There are no examples for uncontrolled mode because an uncontrolled `Drawer` can only be opened with a swipe. The doc site has an uncontrolled `Drawer`. Swipe from the left on a touch device to see it.

## Undocked example

An undocked controlled `Drawer` with custom width. The Drawer can be cancelled by clicking the overlay or pressing the Esc key. It closes when an item is selected, handled by controlling the `open` prop.

{{demo='pages/component-demos/drawers/UndockedDrawer.js'}}

## Permanent navigation drawer

Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. They cannot be closed.

Permanent navigation drawers are the recommended default for desktop.

{{demo='pages/component-demos/drawers/PermanentDrawer.js'}}
