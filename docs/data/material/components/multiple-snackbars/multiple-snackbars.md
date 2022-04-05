---
product: material-ui
title: React Multiple Snackbars component
components: SnackbarsProvider
githubLabel: 'component: multiple snackbars'
materialDesign: https://material.io/components/snackbars
waiAria: https://www.w3.org/TR/wai-aria-1.1/#alert
---

# Multiple Snackbars

<p class="description">Multiple snackbars can be used to show ore than one snackbars at a time</p>

Multiple snackbars on the page can be placed by using `SnackbarsProvider` and `useSnackbars` hook.
Wrap your application with `SnackbarsProvider` to use the `useSnackbars` hook within your components. If using `ThemeProvider` wrap `SnackbarsProvider` below it like:

```jsx
<ThemeProvider>
  <SnackbarsProvider>
    <YourApp />
  </SnackbarsProvider>
</ThemeProvider>
```

The snackbar options in method `showSnackbar` of `useSnackbars` hook take more priority over props passed in `SnackbarsProvider`.

{{"demo": "MultipleSnackbars.js"}}
