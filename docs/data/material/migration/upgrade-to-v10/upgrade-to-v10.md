# Upgrade to v10

<p class="description">This guide explains how to upgrade from Material UI v9 to v10.</p>

## Breaking changes

Since v10 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v9 to v10 are described below.

### Khmer locale renamed

The Khmer locale is now exported as `kmKH` instead of `khKH`, to match the ISO 639-1 code for Khmer (`km`).

```diff
-import { khKH } from '@mui/material/locale';
+import { kmKH } from '@mui/material/locale';

-const theme = createTheme(themeOptions, khKH);
+const theme = createTheme(themeOptions, kmKH);
```

Numbers in `TablePagination` are now formatted with the `km-KH` locale.
Previously, `Intl.NumberFormat` didn't recognize `kh-KH` and fell back to the runtime's default locale.

### Spacing uses CSS gap

Stack, DialogActions, CardActions and AccordionActions now space their children with the CSS `gap` property instead of a margin on each child after the first.

#### Stack

The `useFlexGap` prop has been removed.
Remove it from your Stack components and from the theme's default props:

```diff
-<Stack spacing={2} useFlexGap>
+<Stack spacing={2}>
```

If you didn't use `useFlexGap`, check your layouts for these differences:

- Children's own margins now add to the `spacing`. Previously, Stack reset them to `0`. To reset them again:

  ```jsx
  <Stack spacing={2} sx={{ '& > :not(style):not(style)': { m: 0 } }}>
  ```

- `spacing` also applies between lines when the children wrap.

#### DialogActions, CardActions and AccordionActions

If you customized the space between the actions, through the `spacing` style override or a margin on the actions, set `gap` on the root instead.

### CSS theme variables are always on

`createTheme()` always generates [CSS theme variables](/material-ui/customization/css-theme-variables/overview/), and they can't be turned off.
Components read theme values such as colors, shadows, and spacing from CSS variables, for example `var(--mui-palette-primary-main)`.

Remove `cssVariables: true` from your theme.
To configure the variables, keep passing an object, for example `cssVariables: { colorSchemeSelector: 'class' }`.

```diff
 const theme = createTheme({
-  cssVariables: true,
 });
```

`cssVariables: false` is no longer supported.
It's ignored, and logs an error in development.

A theme object that wasn't created with `createTheme()` has no CSS theme variables, so the `ThemeProvider` warns about it in development.

The theme types include the CSS theme variables: `theme.vars` is always defined, the palette includes channel tokens such as `theme.palette.primary.mainChannel`, and the `ThemeProvider` accepts props such as `colorSchemeNode` and `disableNestedContext`.
Remove the `@mui/material/themeCssVarsAugmentation` import and any `CssThemeVariables` module augmentation, they're no longer needed.

If your theme defines both light and dark color schemes:

- The color scheme follows the `prefers-color-scheme` media query by default, so `setMode()` from `useColorScheme()` has no effect and logs an error in development.
  To toggle the mode manually, set `colorSchemeSelector` as described in [Toggling dark mode manually](/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually).
- The theme object no longer changes between modes, so `theme.palette.mode` stays on the default color scheme.
  Use `theme.applyStyles()` or read values from `theme.vars`, or pass the `forceThemeRerender` prop to the `ThemeProvider` as described in [Force theme recalculation between modes](/material-ui/customization/css-theme-variables/configuration/#force-theme-recalculation-between-modes).

Code that computes colors from the theme needs these changes:

- `alpha()`, `lighten()` and `darken()` from `@mui/material/styles`, and `theme.lighten()` and `theme.darken()`, throw an error when given a value from `theme.vars`, because they can't parse `var()`.
  This includes the `(theme.vars || theme).palette` pattern, which now always returns `theme.vars`.
  Use `theme.alpha()` with values from `theme.vars`, or pass the raw value from `theme.palette` to the other functions.

  ```diff
  -backgroundColor: alpha((theme.vars || theme).palette.primary.main, 0.5),
  +backgroundColor: theme.alpha(theme.vars.palette.primary.main, 0.5),
  ```

- `theme.spacing()` returns a `calc()` expression based on the `--mui-spacing` variable, for example `calc(2 * var(--mui-spacing, 8px))`, instead of `16px`.

jsdom doesn't resolve `var()`, so tests that assert computed colors or sizes in jsdom see unresolved values.
Run those tests in a browser, or compare against the values from `theme.vars`.
