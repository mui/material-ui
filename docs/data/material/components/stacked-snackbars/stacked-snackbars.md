---
product: material-ui
title: Stacked snackbars React component
components: SnackbarsProvider
materialDesign: https://material.io/components/snackbars
waiAria: https://www.w3.org/TR/wai-aria-1.1/#alert
---

# Stacked snackbars

<p class="description">The SnackbarsProvider component and useSnackbars hook let you display multiple stacked snackbars.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

:::info
Keep in mind that Material Design guidelines specify that "only one snackbar may be displayed at a time"—see [the Material Design snackbar documentation](https://material.io/components/snackbars#usage) for more information on usage.
But you don't necessarily need to adhere to Material Design to use Material UI components, so these utilities give you the freedom to follow your own design patterns.
:::

## Usage

To display multiple snackbars, wrap your application with the `SnackbarsProvider` component.
This lets you implement the `useSnackbars` hook.

If you're using `ThemeProvider`, then `SnackbarsProvider` should be nested inside, as shown here:

```jsx
<ThemeProvider>
  <SnackbarsProvider>
    <YourApp />
  </SnackbarsProvider>
</ThemeProvider>
```

## Maximum snackbars

You can add the `limit` prop to`SnackbarsProvider` to set the maximum number of snackbars that can be displayed simultaneously.

{{"demo": "MaximumSnackbars.js", "defaultCodeOpen": false}}

## Basic stacked snackbars

The `message` prop defines the snackbar's text.

You can add the `action` prop to display additional content on the right side of the snackbar (e.g. a call to action such as an **OK** or **Undo** button).
It can be a React Node, or a callback function with a key parameter that returns a React Node.

Use the `close` method to dismiss a specific snackbar by providing the `key` from the `action` callback argument.

The following demo shows how to work with these basic features:

{{"demo": "SimpleSnackbars.js", "defaultCodeOpen": false}}

## Customization

Use the `content` prop to customize the individual snackbars.

{{"demo": "CustomizedSnackbars.js", "defaultCodeOpen": false}}

## Snackbar position

Add the 'anchorOrigin' prop to control the position of an individual snackbar.
To set the position of all snackbars used globally, pass the desired `anchorOrigin` value to the `SnackbarsProvider` component.

The following demo shows how to control the positions of individual snackbars:

{{"demo": "PositionedSnackbars.js", "defaultCodeOpen": false}}

## Transition

You can use the`TransitionComponent` prop to control the transition effects on individual snackbars, or use it in the `SnackbarsProvider` component for global effects.

The following demo shows how to apply unique transition effects to each individual snackbar in an app:

{{"demo": "TransitionedSnackbars.js", "defaultCodeOpen": false}}

## Props priority

Props supplied to the `show` method of an individual snackbar take priority over those same props supplied globally to `<SnackbarsProvider>`, as the following demo illustrates:

{{"demo": "PropsPriority.js"}}

## Global content and action props

You can add the `ref` prop to the `SnackbarsProvider` component to apply global values for the `action` and `content` props in all instances of snackbars across your entire application.

This lets you define default values rather than having to specify these props in every individual snackbar.

The following demos show how to implement global values for the `action` prop and `content` prop, respectively:

### Global action prop

{{"demo": "GlobalActionSnackbars.js"}}

### Global content prop

{{"demo": "GlobalContentSnackbars.js"}}
