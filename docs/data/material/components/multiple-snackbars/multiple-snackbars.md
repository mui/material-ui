---
product: material-ui
title: Multiple Snackbars React component
components: SnackbarsProvider
materialDesign: https://material.io/components/snackbars
waiAria: https://www.w3.org/TR/wai-aria-1.1/#alert
---

# Multiple Snackbars

<p class="description">Display multiple snackbars on the page.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Usage

To display multiple snackbars, wrap your application with the `SnackbarsProvider` component.
That's what will enable you to use the `useSnackbars` hook.

If you're using `ThemeProvider`, wrap `SnackbarsProvider` below it, as follows:

```jsx
<ThemeProvider>
  <SnackbarsProvider>
    <YourApp />
  </SnackbarsProvider>
</ThemeProvider>
```

## Maximum snackbars

The `limit` prop can be passed to `SnackbarsProvider` to limit the maximum number of snackbars displayed at the same time.

{{"demo": "MaximumSnackbars.js", "defaultCodeOpen": false}}

## Simple snackbars

The `message` prop is used to show the snackbar message.

The `action` prop can be used to show content on the right side of the snackbar.
It can simply be a React Node or a callback function with a key parameter returning a React Node.

Use the `snackbars.closeSnackbar` method to dismiss a specific snackbar by providing the `key` from the `action` callback argument.

{{"demo": "SimpleSnackbars.js", "defaultCodeOpen": false}}

## Customization

Use the `content` prop to customize the individual snackbars.

{{"demo": "CustomizedSnackbars.js", "defaultCodeOpen": false}}

## Positioned snackbars

You can control the position of an individual snackbar by specifying the `anchorOrigin` prop.
For even greater convience, pass the desired `anchorOrigin` value to the `SnackbarsProvider` component to set the position of all snackbars used globally.

{{"demo": "PositionedSnackbars.js", "defaultCodeOpen": false}}

## Transition

Similarly to positioning, use the`TransitionComponent` prop in an individual snackbar if you want to control that specific instance transition effect or use it in the `SnackbarsProvider` component to change it globally.

{{"demo": "TransitionedSnackbars.js", "defaultCodeOpen": false}}

## Props priority

For the mutual properties between `showSnackbar` options and `SnackbarsProvider` props, the options in `showSnackbar` method of `useSnackbars` hook for individual snackbars take more preference over props passed in `SnackbarsProvider` if both are supplied.

{{"demo": "PropsPriority.js"}}

In the above example, the `anchorOrigin`, `autoHideDuration` and `TransitionComponent` props in `showSnackbar` are applied taking preference over the `props` supplied on `SnackbarsProvider`.

## Global content and action props

To have global consistency of the types of `action` and `content` every instance of snackbar has across your application, use the `ref` prop in the `SnackbarsProvider` component to apply the desired values to the aforementioned props.

This will save you from a lot of inefficient repetition if you'd to in each instance individually using `showSnackbar`.

### Global action prop

{{"demo": "GlobalActionSnackbars.js"}}

### Global content prop

{{"demo": "GlobalContentSnackbars.js"}}
