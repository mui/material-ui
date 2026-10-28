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

### Nested ThemeProviders with CSS theme variables

A nested `ThemeProvider` whose theme uses CSS theme variables now applies its theme.
Previously, its variables were ignored when it had the same `cssVarPrefix` as the outer theme, so its subtree kept the outer theme's colors.

When its variables differ from the outer theme, it sets them with a class on its child, so give it a single child element:

```diff
 <ThemeProvider theme={promoTheme}>
-  <Header />
-  <Section />
+  <div>
+    <Header />
+    <Section />
+  </div>
 </ThemeProvider>
```

With several children, a Fragment, or a child that doesn't render its `className`, the variables aren't applied, and the first two log an error in development.

Two `ThemeProvider`s that aren't nested in each other still overwrite each other's variables on `:root`, and now log a warning in development.
Add the `scoped` prop to the one that should only apply to its child, like an embedded widget.

See [Nested and multiple theme providers](/material-ui/customization/css-theme-variables/configuration/#nested-and-multiple-theme-providers) for details.
