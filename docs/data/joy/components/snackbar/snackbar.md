---
productId: joy-ui
title: React Snackbar component
components: Snackbar
githubLabel: 'component: snackbar'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
---

# Snackbar

<p class="description">The Snackbar, also commonly referred to as Toast, component informs users that an action has been or will be performed by the app.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

Snackbars inform users of a process that an app has performed or will perform. They appear temporarily, towards the bottom of the screen. They shouldn't interrupt the user experience, and they don't require user input to disappear.

Snackbars contain a single line of text directly related to the operation performed. They may contain a text action, but no icons. You can use them to display notifications.

{{"demo": "SnackbarUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import Snackbar from '@mui/joy/Snackbar';
```

### Position

In wide layouts, snackbars can be left-aligned or center-aligned if they are consistently placed on the same spot at the bottom of the screen, however there may be circumstances where the placement of the snackbar needs to be more flexible.
You can control the position of the snackbar by specifying the `anchorOrigin` prop.

{{"demo": "PositionedSnackbar.js"}}

## Customization

### Variants

The Snackbar component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `outlined` (default), `solid`, `soft`, and `plain`.

{{"demo": "SnackbarVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The Snackbar component comes in three sizes: `sm`, `md` (default), and `lg`.

{{"demo": "SnackbarSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.
Play around combining different colors with different variants.

{{"demo": "SnackbarColors.js"}}

### Hide duration

Use `autoHideDuration` prop to control how long the Snackbar is displayed. If it is not provided, the Snackbar will be displayed until the user dismisses it.

<!-- {{"demo": "SnackbarHideDuration.js"}} -->

### Close reason

There are three reasons for the Snackbar to close:

- `timeout`: The Snackbar is closed after the `autoHideDuration` prop timer expires.
- `clickaway`: The Snackbar is closed when the user interacts outside of the Snackbar.
- `escapeKeyDown`: The Snackbar is closed when the user presses the escape key.

You can access the value from the second argument of the `onClose` callback.

```js
<Snackbar onClose={(event, reason) => {
  // reason will be one of: timeout, clickaway, escapeKeyDown
}}>
```

<!-- {{"demo": "SnackbarCloseReason.js"}} -->

#### Ignore clickaway

This pattern is useful when you don't want the Snackbar to close when the user clicks outside of it.

```js
<Snackbar
  onClose={(event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  }}
>
```

### Decorators

Use the `startDecorator` and `endDecorator` props to append icons and/or actions to either side of the Snackbar.

{{"demo": "SnackbarWithDecorators.js"}}

### Inverted colors

When the Snackbar's variant is `soft` or `solid`, you can set `invertedColors` prop to `true` to invert the colors of the children for increasing the contrast.

To learn more about this, check out [Color Inversion](/joy-ui/main-features/color-inversion/) feature.

{{"demo": "SnackbarInvertedColors.js"}}

### Animation

To apply a custom animation, provide the `animationDuration` prop, which we'll use to match the component's unmount animation accurately.

{{"demo": "CustomAnimatedSnackbar.js"}}
