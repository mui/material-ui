# Upgrade to v10

<p class="description">This guide explains how to upgrade from Material UI v9 to v10.</p>

## Breaking changes

Since v10 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v9 to v10 are described below.

### Presentational roles

Autocomplete, Dialog, Modal, Snackbar, SpeedDial, and Step now use `role="none"` where they previously used `role="presentation"`.
The two roles have the same accessibility semantics.

Update tests and CSS selectors that match the previous role value:

```diff
-screen.getByRole('presentation');
+screen.getByRole('none');

-[role="presentation"] {
+[role="none"] {
```

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

### Nested ThemeProviders with CSS theme variables

A nested `ThemeProvider` whose theme uses CSS theme variables now applies its theme, including when the theme is a function.
Previously, its variables were ignored when it had the same `cssVarPrefix` as the outer theme, so its subtree kept the outer theme's colors.

It renders a `div` with `display: contents` and sets the variables that differ from the outer theme on it.
The `div` doesn't change the layout, but it's in the DOM.
Where a `div` isn't valid, or where CSS selectors like `>`, `:first-of-type`, and `:nth-child()` depend on the DOM structure, use the `render` prop to choose the element:

```diff
 <ul>
-  <ThemeProvider theme={itemTheme}>
-    <li>…</li>
-  </ThemeProvider>
+  <ThemeProvider theme={itemTheme} render={<li />}>
+    …
+  </ThemeProvider>
 </ul>
```

The `disableNestedContext` prop is deprecated in favor of `isolated`:

```diff
-<ThemeProvider theme={widgetTheme} disableNestedContext>
+<ThemeProvider theme={widgetTheme} isolated>
```

An isolated provider sets its variables on its element instead of `:root`, so it no longer overwrites the page's variables.
Its mode is only stored when you pass a `modeStorageKey`, `colorSchemeStorageKey`, or `storageManager`, so it no longer overwrites the page's stored mode.

Two `ThemeProvider`s that aren't nested in each other still overwrite each other's variables on `:root`, and now log a warning in development.
Add the `isolated` prop to the one that shouldn't apply to the whole page, like an embedded widget.

A nested `ThemeProvider` follows the outer mode, so its `defaultMode` and storage props, like `modeStorageKey`, don't apply, and now log a warning in development.
Add the `isolated` prop to give a section its own mode.

A nested theme with a single color scheme now keeps it whatever the outer mode is.
A theme created without `colorSchemes` only has the light one, so its subtree now stays light on a dark page.
To follow the outer mode, give it both color schemes:

```diff
 const promoTheme = createTheme({
   cssVariables: true,
-  palette: { primary: { main: '#9c27b0' } },
+  colorSchemes: {
+    light: { palette: { primary: { main: '#9c27b0' } } },
+    dark: { palette: { primary: { main: '#ce93d8' } } },
+  },
 });
```

See [Nested and multiple theme providers](/material-ui/customization/css-theme-variables/configuration/#nested-and-multiple-theme-providers) for details.

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

- Negative `spacing` values and `'auto'` are no longer supported. Remove `spacing` and apply margins to the children instead. For example, to preserve overlapping children in a row:

  ```diff
  -<Stack direction="row" spacing={-1}>
  +<Stack
  +  direction="row"
  +  sx={{ '& > :not(style) ~ :not(style)': { ml: -1 } }}
  +>
  ```

  Put the margin on the side that faces the previous child: `ml` for `row`, `mr` for `row-reverse`, `mt` for `column`, and `mb` for `column-reverse`. Use the value `'auto'` to preserve `spacing="auto"`.

- Percentage spacing is now relative to the container's width for horizontal gaps and height for vertical gaps. Previously, percentage margins used the container's width in both directions. For example, `spacing="10%"` now produces no gap in a column whose height is determined by its children. Use a numeric spacing value or a length such as `'1rem'` for spacing that does not depend on the container's dimensions.

#### DialogActions, CardActions and AccordionActions

If you customized the space between the actions, through the `spacing` style override or a margin on the actions, set `gap` on the root instead.

### SpeedDial generated ids

`SpeedDial` no longer derives the ids of its actions container and actions from `ariaLabel`.
The ids are now based on the `id` prop, or on a generated unique id when it is omitted.
This avoids duplicate ids when several speed dials share the same `ariaLabel`.

If you target these ids in CSS or tests, pass an explicit `id`:

```diff
-<SpeedDial ariaLabel="Actions" />
+<SpeedDial ariaLabel="Actions" id="Actions" />
```

The ids are then `Actions-actions` for the actions container and `Actions-action-0`, `Actions-action-1`, and so on for each action.

### InputBase disableInjectingGlobalStyles removed

The deprecated `disableInjectingGlobalStyles` prop of InputBase has been removed.
The auto-fill keyframes are injected with the input styles, so there is no style sheet per input to avoid.
Remove the prop, along with the `GlobalStyles` for the auto-fill keyframes it required:

```diff
 const theme = createTheme({
   components: {
     MuiInputBase: {
-      defaultProps: {
-        disableInjectingGlobalStyles: true,
-      },
     },
   },
 });

 <ThemeProvider theme={theme}>
-  <GlobalStyles
-    styles={{
-      '@keyframes mui-auto-fill': { from: { animationName: 'mui-auto-fill' } },
-      '@keyframes mui-auto-fill-cancel': {
-        from: { animationName: 'mui-auto-fill-cancel' },
-      },
-    }}
-  />
   ...
 </ThemeProvider>
```

### BottomNavigationAction children type

The `children` prop of BottomNavigationAction is now typed as `null | undefined`, the same as Tab and Chip.
It was typed as `React.ReactNode`, but the component never rendered it and warned when it was passed.
Remove `children` and use the `label` and `icon` props instead, or the `component` prop if you need a different structure:

```diff
-<BottomNavigationAction value="recents">Recents</BottomNavigationAction>
+<BottomNavigationAction value="recents" label="Recents" />
```

### CssVarsProvider removed

The deprecated `CssVarsProvider` and `Experimental_CssVarsProvider` components have been removed.
Use `ThemeProvider` instead, which accepts the same props:

```diff
-import { CssVarsProvider } from '@mui/material/styles';
+import { ThemeProvider } from '@mui/material/styles';

-<CssVarsProvider theme={theme}>
+<ThemeProvider theme={theme}>
   ...
-</CssVarsProvider>
+</ThemeProvider>
```

If you created the theme with `extendTheme()`, see [extendTheme removed](#extendtheme-removed).

`ThemeProvider` requires a `theme` prop.
If you rendered `CssVarsProvider` without one, pass a theme with CSS variables:

```diff
-import { CssVarsProvider } from '@mui/material/styles';
+import { ThemeProvider, createTheme } from '@mui/material/styles';
+
+const theme = createTheme({ cssVariables: true });

-<CssVarsProvider>
+<ThemeProvider theme={theme}>
   ...
-</CssVarsProvider>
+</ThemeProvider>
```

With TypeScript, the `colorSchemeNode`, `disableNestedContext`, `disableStyleSheetGeneration`, `forceThemeRerender`, and `isolated` props of `ThemeProvider` are only typed with the CSS theme variables [module augmentation](/material-ui/customization/css-theme-variables/usage/#typescript).
If you pass any of them, import it in a file included in your `tsconfig.json`:

```ts
import type {} from '@mui/material/themeCssVarsAugmentation';
```

### getInitColorSchemeScript removed

The deprecated `getInitColorSchemeScript()` function has been removed.
Render the `InitColorSchemeScript` component instead, and pass the same options as props:

```diff
-import { getInitColorSchemeScript } from '@mui/material/styles';
+import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

-{getInitColorSchemeScript({ attribute: 'class' })}
+<InitColorSchemeScript attribute="class" />
```

Without an `attribute`, `getInitColorSchemeScript()` set `data-color-scheme`, while `InitColorSchemeScript` sets `data-mui-color-scheme`.
If your `colorSchemeSelector` relies on `data-color-scheme`, pass `attribute="data-color-scheme"`.

### extendTheme removed

The `extendTheme()` function and its deprecated `experimental_extendTheme` alias have been removed.
Use `createTheme()` instead, and always pass the `cssVariables` option: without it, `createTheme()` doesn't generate CSS variables.

```diff
-import { extendTheme } from '@mui/material/styles';
+import { createTheme } from '@mui/material/styles';

-const theme = extendTheme({
-  colorSchemeSelector: 'class',
-  colorSchemes: { light: true, dark: true },
-});
+const theme = createTheme({
+  cssVariables: { colorSchemeSelector: 'class' },
+  colorSchemes: { light: true, dark: true },
+});
```

The options that go into `cssVariables` are `colorSchemeSelector`, `cssVarPrefix`, `disableCssColorScheme`, `nativeColor`, `rootSelector`, and `shouldSkipGeneratingVar`.
If you didn't pass any of them, use `cssVariables: true`.

With TypeScript, `extendTheme()` returned a theme with the CSS variables types, but `createTheme()` returns `Theme`.
To keep `theme.vars` and `theme.getCssVar()` typed, add the [module augmentation](/material-ui/customization/css-theme-variables/usage/#typescript) in any file included in your `tsconfig.json`:

```ts
import type {} from '@mui/material/themeCssVarsAugmentation';
```

If `colorSchemes` has no `light` scheme, set `defaultColorScheme` too.
`extendTheme()` used the first color scheme as the default, while `createTheme()` adds a `light` scheme and uses it:

```diff
-extendTheme({ colorSchemes: { dark: true } });
+createTheme({ cssVariables: true, colorSchemes: { dark: true }, defaultColorScheme: 'dark' });
```

`extendTheme()` ignored a top-level `palette`, but `createTheme()` applies it and replaces the palette of the default color scheme.
Its `mode` also sets the default color scheme: with `palette: { mode: 'dark' }`, the theme defaults to `dark`, and has no `light` scheme unless `colorSchemes` defines one.
Remove the top-level `palette` to keep the previous result, or move its values into `colorSchemes`.

### createTheme arguments with CSS variables

With CSS variables, the extra arguments of `createTheme()` are deep merged into the options before the theme is created, so they're processed like the options.
Previously, they were deep merged into the created theme as they were, and the values that depend on them weren't generated again.
For example, `info.light`, `info.dark`, and `info.contrastText` now follow the `main` color of a second call:

```js
theme = createTheme(theme, {
  palette: { info: { main: theme.palette.secondary.main } },
});
```

To keep a previous value, pass it in the argument too, like `light: theme.palette.info.light`.

A theme passed back to `createTheme()` is created again from its options and the values changed in a copy of it, like `{ ...theme, palette: { ...theme.palette, primary } }`.
Changes made to the theme itself are ignored, so make them in a copy, or pass them as an argument:

```diff
-theme.palette.primary.main = red[500];
-theme = createTheme(theme);
+theme = createTheme(theme, { palette: { primary: { main: red[500] } } });
```
