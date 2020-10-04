---
title: React Drawer component
components: Drawer, SwipeableDrawer
---

# Drawer (Tiroir)

<p class="description">Les tiroirs de navigation permettent d'accéder aux destinations de votre application. Les feuilles latérales sont des surfaces contenant du contenu supplémentaire ancré au bord gauche ou droit de l'écran.</p>

[Navigation drawers](https://material.io/design/components/navigation-drawer.html) (or "sidebars") provide access to destinations and app functionality, such as switching accounts. They can either be permanently on-screen or controlled by a navigation menu icon.

[Side sheets](https://material.io/design/components/sheets-side.html) are supplementary surfaces primarily used on tablet and desktop.

## Tiroir temporaire

Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected.

The Drawer can be cancelled by clicking the overlay or pressing the Esc key. It closes when an item is selected, handled by controlling the `open` prop.

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

### Swipeable

You can make the drawer swipeable with the `SwipeableDrawer` component.

This component comes with a 2 kB gzipped payload overhead. Some low-end mobile devices won't be able to follow the fingers at 60 FPS. You can use the `disableBackdropTransition` property to help.

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

The following properties are used in this documentation website for optimal usability of the component:

- iOS is hosted on high-end devices. The performance will be good enough. The backdrop transition can be enabled without dropping frames.
- iOS has a "swipe to go back" feature that interferes with the discovery feature, so discovery has to be disabled.

```jsx
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />
```

## Responsive drawer

The `Hidden` responsive helper component allows showing different types of drawer depending on the screen width. A `temporary` drawer is shown for small screens while a `permanent` drawer is shown for wider screens.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Tiroir persistant

Persistent navigation drawers can toggle open or closed. The drawer sits on the same surface elevation as the content. It is closed by default and opens by selecting the menu icon, and stays open until closed by the user. The state of the drawer is remembered from action to action and session to session.

When the drawer is outside of the page grid and opens, the drawer forces other content to change size and adapt to the smaller viewport.

Persistent navigation drawers are acceptable for all sizes larger than mobile. They are not recommended for apps with multiple levels of hierarchy that require using an up arrow for navigation.

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Mini variante de tiroir

In this variation, the persistent navigation drawer changes its width. Its resting state is as a mini-drawer at the same elevation as the content, clipped by the app bar. When expanded, it appears as the standard persistent navigation drawer.

The mini variant is recommended for apps sections that need quick selection access alongside content.

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Tiroir permanent

Permanent navigation drawers are always visible and pinned to the left edge, at the same elevation as the content or background. They cannot be closed.

Les tiroirs de navigation permanents sont les **valeurs par défaut recommandées pour le bureau**.

### Navigation pleine hauteur

Applications axées sur la consommation d'informations utilisant une hiérarchie de gauche à droite.

{{"demo": "pages/components/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### Clippé sous la barre d'application

Des applications axées sur la productivité qui nécessitent un équilibre sur l’écran.

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}