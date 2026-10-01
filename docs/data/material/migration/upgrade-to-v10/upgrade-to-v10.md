# Upgrade to v10

<p class="description">This guide explains how to upgrade from Material UI v9 to v10.</p>

## Start using the alpha release

In the `package.json` file, change the package version from `latest` to `next`.

```diff title="package.json"
-"@mui/material": "latest",
+"@mui/material": "next",
```

Using `next` ensures your project always uses the latest v10 pre-releases.
Alternatively, you can also target and fix it to a specific version, for example, `10.0.0-alpha.0`.

## Breaking changes

Since v10 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v9 to v10 are described below.

:::info
This list is a work in progress.
Expect updates as new breaking changes are introduced.
:::

### Theme

#### CSS theme variables are enabled by default

`createTheme()` now generates [CSS theme variables](/material-ui/customization/css-theme-variables/overview/) by default.
Components read theme values such as colors, shadows, and spacing from CSS variables, for example `var(--mui-palette-primary-main)`.

To keep the previous behavior, set `cssVariables` to `false`:

```diff
 const theme = createTheme({
+  cssVariables: false,
 });
```

If your theme defines both light and dark color schemes:

- The color scheme follows the `prefers-color-scheme` media query by default, so `setMode()` from `useColorScheme()` has no effect.
  To toggle the mode manually, set `colorSchemeSelector` as described in [Toggling dark mode manually](/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually).
- The theme object no longer changes between modes.
  Read values from `theme.vars` or use `theme.applyStyles()`, or pass the `forceThemeRerender` prop to the `ThemeProvider` as described in [Force theme recalculation between modes](/material-ui/customization/css-theme-variables/configuration/#force-theme-recalculation-between-modes).

`theme.spacing()` returns a `calc()` expression based on the `--mui-spacing` variable, for example `calc(2 * var(--mui-spacing, 8px))`, instead of `16px`.
