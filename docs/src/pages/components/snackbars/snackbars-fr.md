---
title: Snackbar React component
components: Snackbar, SnackbarContent
---

# Snackbars

<p class="description">Snackbars provide brief messages about app processes - typically at the bottom of the screen.</p>

[Snackbars](https://material.io/design/components/snackbars.html) inform users of a process that an app has performed or will perform. They appear temporarily, towards the bottom of the screen. They shouldn’t interrupt the user experience, and they don’t require user input to disappear.

Snackbars contain a single line of text directly related to the operation performed. They may contain a text action, but no icons. You can use them to display notifications.

#### Fréquence

Only one snackbar may be displayed at a time.

## Simple snackbars

A basic snackbar that aims to reproduce Google Keep's snackbar behavior.

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## Customized snackbars

Voici quelques exemples de personnalisation du composant. Vous pouvez en apprendre plus sur [la page de documentation de personnalisation](/customization/components/).

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## Positioned snackbars

There may be circumstances when the placement of the snackbar needs to be more flexible.

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## Longueur du message

Some snackbars with varying message length.

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## Les transitions

### Snackbars consécutifs

When multiple snackbar updates are necessary, they should appear one at a time.

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### Snackbars and floating action buttons (FABs)

Snackbars should appear above FABs (on mobile).

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 500}}

### Changer la transition

[Grow](/components/transitions/#grow) is the default transition but you can use a different one.

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### Control Slide direction

You can change the direction of the [Slide](/components/transitions/#slide) transition.

{{"demo": "pages/components/snackbars/DirectionSnackbar.js"}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des avantages suivants:

### notistack

![stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

Dans l'exemple suivant, nous montrons comment utiliser [notistack](https://github.com/iamhosseindhv/notistack). notistack makes it easy to display snackbars (so you don't have to deal with open/close state of them). It also enables you to stack them on top of one another (but discouraged by the specification).

{{"demo": "pages/components/snackbars/IntegrationNotistack.js"}}