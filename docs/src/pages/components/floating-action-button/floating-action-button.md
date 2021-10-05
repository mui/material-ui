---
title: React Fab component
components: Fab
githubLabel: 'component: Fab'
materialDesign: https://material.io/components/buttons-floating-action-button
---

# Floating action button

<p class="description">A floating action button (FAB) performs the primary, or most common, action on a screen.</p>

A floating action button appears in front of all screen content, typically as a circular shape with an icon in its center.
FABs come in two types: regular, and extended.

Only use a FAB if it is the most suitable way to present a screen's primary action.
Only one component is recommended per screen to represent the most common action.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic FAB

{{"demo": "pages/components/floating-action-button/FloatingActionButtons.js"}}

## Size

By default, the size is `large`. Use the `size` prop for smaller floating action buttons.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonSize.js"}}

{{"demo": "pages/components/floating-action-button/FloatingActionButtonExtendedSize.js"}}

## Animation

The floating action button animates onto the screen as an expanding piece of material, by default.

A floating action button that spans multiple lateral screens (such as tabbed screens) should briefly disappear,
then reappear if its action changes.

The Zoom transition can be used to achieve this. Note that since both the exiting and entering
animations are triggered at the same time, we use `enterDelay` to allow the outgoing Floating Action Button's
animation to finish before the new one enters.

{{"demo": "pages/components/floating-action-button/FloatingActionButtonZoom.js", "bg": true}}
