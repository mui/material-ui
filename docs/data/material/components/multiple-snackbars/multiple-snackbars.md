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

Multiple snackbars can be displayed on the page by using `SnackbarsProvider` and `useSnackbars` hook.

Wrap your application with `SnackbarsProvider` to use the `useSnackbars` hook within your components.

If using `ThemeProvider`, wrap `SnackbarsProvider` below it as follows:

```jsx
<ThemeProvider>
  <SnackbarsProvider>
    <YourApp />
  </SnackbarsProvider>
</ThemeProvider>
```

## Maximum snackbars

The `limit` prop can be passed to `SnackbarsProvider` to display the maximum number of snackbars at a time.

{{"demo": "MaximumSnackbars.js", "defaultCodeOpen": false}}

## Simple snackbars

The `message` option is used to show the snackbar message.

The `action` option can be used to show content on the right side of the snackbar. It can simply be a React Node or a callback function with a key parameter returning a React Node.

Use the `snackbars.closeSnackbar` method to dismiss a specific snackbar by providing the `key` from the `action` callback argument.

{{"demo": "SimpleSnackbars.js", "defaultCodeOpen": false}}

## Customization

Use the `content` option to customize the individual snackbars.

{{"demo": "CustomizedSnackbars.js", "defaultCodeOpen": false}}

## Positioned snackbars

You can control the position of the individual snackbars by specifying the `anchorOrigin` option. You can also pass `anchorOrigin` prop to `SnackbarsProvider` component to set the position of all snackbars globally in your application.

{{"demo": "PositionedSnackbars.js", "defaultCodeOpen": false}}

## Transition

Use the `TransitionComponent` option on individual snackbars or the `TransitionComponent` prop on `SnackbarsProvider` component to change the transition of the snackbars.

{{"demo": "TransitionedSnackbars.js", "defaultCodeOpen": false}}

## Props priority

For the mutual properties between `showSnackbar` options and `SnackbarsProvider` props, the options in `showSnackbar` method of `useSnackbars` hook for individual snackbars take more preference over props passed in `SnackbarsProvider` if both are supplied.

See the following demo:

{{"demo": "PropsPriority.js"}}

In the above example, the `anchorOrigin`, `autoHideDuration` and `TransitionComponent` options in `showSnackbar` gets applied taking preference over the `props` supplied on `SnackbarsProvider`.

## Global content and action props

There maybe some use case where you need to have same `action` or `content` for all snackbars. Perhaps having the same close icon for all snackbars.

Providing the same `action` or `content` values for each individual snackbars in `showSnackbar` is cumbersome.

So we expose a way by using `ref` to add `action` or `content` to the global `SnackbarsProvider` which will get applied to all snackbars thus reducing the repetitiveness to add it on individual snackbars.

### Global action prop

{{"demo": "GlobalActionSnackbars.js"}}

### Global content prop

{{"demo": "GlobalContentSnackbars.js"}}
