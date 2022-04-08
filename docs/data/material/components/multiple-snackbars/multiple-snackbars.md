---
product: material-ui
title: Multiple Snackbars React component
components: SnackbarsProvider
githubLabel: 'component: snackbar'
materialDesign: https://material.io/components/snackbars
waiAria: https://www.w3.org/TR/wai-aria-1.1/#alert
---

# Multiple Snackbars

<p class="description">Place multiple snack bars on the page.</p>

Multiple snackbars can be placed on the page by using `SnackbarsProvider` and `useSnackbars` hook.

Wrap your application with `SnackbarsProvider` to use the `useSnackbars` hook within your components.

If using `ThemeProvider`, wrap `SnackbarsProvider` below it like:

```jsx
<ThemeProvider>
  <SnackbarsProvider>
    <YourApp />
  </SnackbarsProvider>
</ThemeProvider>
```

The `message` option in `showSnackbar` method is used to show the message. The `limit` prop can be passed to `SnackbarsProvider` to display the maximum number of snackbars at a time.
The snackbar option values in method `showSnackbar` of `useSnackbars` hook take more priority over props passed in `SnackbarsProvider`.

{{"demo": "MultipleSnackbars.js"}}
