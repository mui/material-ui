---
productId: joy-ui
title: React Snackbar component
components: Snackbar
githubLabel: 'component: snackbar'
waiAria: https://www.w3.org/TR/wai-aria-1.1/#alert
---

# Snackbar

<p class="description">The Snackbar, also commonly referred to as Toast, component informs users that an action has been or will be performed by the app.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

Snackbars inform users of a process that an app has performed or will perform. They appear temporarily, towards the bottom of the screen. They shouldn't interrupt the user experience, and they don't require user input to disappear.

Snackbars contain a single line of text directly related to the operation performed. They may contain a text action, but no icons. You can use them to display notifications.

{{"demo": "SnackbarUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Positioned snackbars

In wide layouts, snackbars can be left-aligned or center-aligned if they are consistently placed on the same spot at the bottom of the screen, however there may be circumstances where the placement of the snackbar needs to be more flexible.
You can control the position of the snackbar by specifying the `anchorOrigin` prop.

{{"demo": "PositionedSnackbar.js"}}
