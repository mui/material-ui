---
title: Snackbar React component
components: Snackbar, SnackbarContent
---

# Snackbars

<p class="description">Snackbars provide brief messages about app processes through a message - typically at the bottom of the screen</p>

[Snackbars](https://material.io/design/components/snackbars.html) inform users of a process that an app has performed or will perform. They appear temporarily, towards the bottom of the screen. They shouldn’t interrupt the user experience, and they don’t require user input to disappear.

Snackbars contain a single line of text directly related to the operation performed.
They may contain a text action, but no icons. You can use them to display notifications.

#### Frequency

Only one snackbar may be displayed at a time.

## Simple

A basic snackbar that aims to reproduce Google Keep's snackbar behavior.

{{"demo": "pages/demos/snackbars/SimpleSnackbar.js"}}

## Message Length

Some snackbars with varying message length.

{{"demo": "pages/demos/snackbars/LongTextSnackbar.js"}}

## Positioned

There may be circumstances when the placement of the snackbar needs to be more flexible.

{{"demo": "pages/demos/snackbars/PositionedSnackbar.js"}}

## Transitions

### Control Direction

Change the direction of the transition. Slide is the default transition.

{{"demo": "pages/demos/snackbars/DirectionSnackbar.js"}}

### Change Transition

Use a different transition all together.

{{"demo": "pages/demos/snackbars/FadeSnackbar.js"}}

### Don't block the floating action button

Move the floating action button vertically to accommodate the snackbar height.

{{"demo": "pages/demos/snackbars/FabIntegrationSnackbar.js"}}

### Consecutive Snackbars

Per [Google's guidelines](https://material.io/design/components/snackbars.html#snackbars-toasts-usage), when a second snackbar is triggered while the first is displayed, the first should start the contraction motion downwards before the second one animates upwards.

{{"demo": "pages/demos/snackbars/ConsecutiveSnackbars.js"}}

## Customized Snackbars

If you have been reading the [overrides documentation page](/customization/overrides)
but you are not confident jumping in,
here are examples of how you can change the look of a Snackbar.

{{"demo": "pages/demos/snackbars/CustomizedSnackbars.js"}}
