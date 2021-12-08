---
title: Bottom Navigation React component
components: BottomNavigation, BottomNavigationAction
githubLabel: 'component: BottomNavigation'
materialDesign: https://material.io/components/bottom-navigation
---

# Bottom Navigation

<p class="description">Bottom navigation bars allow movement between primary destinations in an app.</p>

Bottom navigation bars display three to five destinations at the bottom of a screen. Each destination is represented by an icon and an optional text label. When a bottom navigation icon is tapped, the user is taken to the top-level navigation destination associated with that icon.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Bottom Navigation

When there are only **three** actions, display both icons and text labels at all times.

{{"demo": "pages/components/bottom-navigation/SimpleBottomNavigation.js", "bg": true}}

## Bottom Navigation with no label

If there are **four** or **five** actions, display inactive views as icons only.

{{"demo": "pages/components/bottom-navigation/LabelBottomNavigation.js", "bg": true}}

## Fixed positioning

This demo keeps bottom navigation fixed to the bottom, no matter the amount of content on-screen.

{{"demo": "pages/components/bottom-navigation/FixedBottomNavigation.js", "bg": true, "iframe": true, "maxWidth": 600}}

## Third-party routing library

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server.
The `BottomNavigationAction` component provides the `component` prop to handle this use case.
Here is a [more detailed guide](/guides/routing/).
