---
title: Drawer React component
components: Drawer, SwipeableDrawer
---

# Drawer

<p class="description">Navigation drawers provide access to destinations in your app. Side sheets are surfaces containing supplementary content that are anchored to the left or right edge of the screen.</p>

[Navigation drawers](https://material.io/design/components/navigation-drawer.html) provide access to destinations and app functionality, such as switching accounts. They can either be permanently on-screen or controlled by a navigation menu icon.

[Side sheets](https://material.io/design/components/sheets-side.html) are supplementary surfaces primarily used on tablet and desktop.

## Temporary drawer

Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected.

The Drawer can be cancelled by clicking the overlay or pressing the Esc key.
It closes when an item is selected, handled by controlling the `open` prop.

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

## Swipeable Temporary drawer

You can make the drawer swipeable with the `SwipeableDrawer` component.

This component comes with a 2 kB gzipped payload overhead.
Some low-end mobile devices won't be able to follow the fingers at 60 FPS.
You can use the `disableBackdropTransition` property to help.

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

We are using the following set of properties on this documentation website for optimal usability of the component:
- iOS is hosted on high-end devices.
We can enable the backdrop transition without dropping frames.
The performance will be good enough.
- iOS has a "swipe to go back" feature that mess
with the discovery feature. We have to disable it.

```jsx
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />
```

## Responsive drawer

The `Hidden` responsive helper component allows showing different types of drawer depending on the screen width.
A `temporary` drawer is shown for small screens while a `permanent` drawer is shown for wider screens.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Persistent drawer

Persistent navigation drawers can toggle open or closed.
The drawer sits on the same surface elevation as the content.
It is closed by default and opens by selecting the menu icon, and stays open until closed by the user.
The state of the drawer is remembered from action to action and session to session.

When the drawer is outside of the page grid and opens, the drawer forces other content to change size and adapt to the smaller viewport.

Persistent navigation drawers are acceptable for all sizes larger than mobile.
They are not recommended for apps with multiple levels of hierarchy that require using an up arrow for navigation.

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Mini variant drawer

In this variation, the persistent navigation drawer changes its width.
Its resting state is as a mini-drawer at the same elevation as the content, clipped by the app bar.
When expanded, it appears as the standard persistent navigation drawer.

The mini variant is recommended for apps sections that need quick selection access alongside content.

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Permanent drawer

Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. They cannot be closed.

Permanent navigation drawers are the **recommended default for desktop**.

### Full-height navigation

Apps focused on information consumption that use a left-to-right hierarchy.

{{"demo": "pages/components/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### Clipped under the app bar

Apps focused on productivity that require balance across the screen.

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}
