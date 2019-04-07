---
title: Snackbar React component
components: Snackbar, SnackbarContent
---
# Snackbars

<p class="description">Snackbars provide brief messages about app processes through a message - typically at the bottom of the screen</p>

[Snackbars](https://material.io/design/components/snackbars.html) inform users of a process that an app has performed or will perform. They appear temporarily, towards the bottom of the screen. They shouldn’t interrupt the user experience, and they don’t require user input to disappear.

Snackbars contain a single line of text directly related to the operation performed. They may contain a text action, but no icons. You can use them to display notifications.

#### Fréquence

Only one snackbar may be displayed at a time.

## Simple

A basic snackbar that aims to reproduce Google Keep's snackbar behavior.

{{"demo": "pages/demos/snackbars/SimpleSnackbar.js"}}

## Customized Snackbars

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here are examples of how you can change the look of a Snackbar.

⚠️ Bien que les spécifications de conception des matériaux encouragent la thématisation, ces exemples sortent des sentiers battus.

{{"demo": "pages/demos/snackbars/CustomizedSnackbars.js"}}

## Positioned

There may be circumstances when the placement of the snackbar needs to be more flexible.

{{"demo": "pages/demos/snackbars/PositionedSnackbar.js"}}

## Longueur du message

Some snackbars with varying message length.

{{"demo": "pages/demos/snackbars/LongTextSnackbar.js"}}

## Les transitions

### Snackbars consécutifs

When multiple snackbar updates are necessary, they should appear one at a time.

{{"demo": "pages/demos/snackbars/ConsecutiveSnackbars.js"}}

### Snackbars and floating action buttons (FABs)

Snackbars should appear above FABs (on mobile).

{{"demo": "pages/demos/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 500}}

### Changer la transition

[Grow](/utils/transitions/#grow) is the default transition but you can use a different one.

{{"demo": "pages/demos/snackbars/TransitionsSnackbar.js"}}

### Control Slide direction

You can change the direction of the [Slide](/utils/transitions/#slide) transition.

{{"demo": "pages/demos/snackbars/DirectionSnackbar.js"}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des projects suivants:

### notistack

![stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

Dans l'exemple suivant, nous montrons comment utiliser [notistack](https://github.com/iamhosseindhv/notistack). notistack makes it easy to display snackbars (so you don't have to deal with open/close state of them). It also enables you to stack them on top of one another (but discouraged by the specification).

{{"demo": "pages/demos/snackbars/IntegrationNotistack.js"}}