# Upgrade to v10

<p class="description">This guide explains how to upgrade from Material UI v9 to v10.</p>

## Breaking changes

### Theme

#### Nested ThemeProviders with CSS theme variables

A nested `ThemeProvider` whose theme uses CSS theme variables now applies its theme.
Previously, its variables were ignored when it had the same `cssVarPrefix` as the outer theme, so its subtree kept the outer theme's colors.

When its variables differ from the outer theme, it wraps its children in a `div` with `display: contents` that sets them.
Selectors like `> *` and `~`, the spacing of a `Stack`, and DOM snapshots can be affected.
To render your own element instead, for example a `tbody` inside a table, use the `component` prop:

```jsx
<ThemeProvider theme={promoTheme} component="tbody">
  {rows}
</ThemeProvider>
```

Two `ThemeProvider`s that aren't nested in each other still overwrite each other's variables on `:root`, and now log a warning in development.
Add the `scoped` prop to the one that should only apply to its children:

```diff
-<ThemeProvider theme={widgetTheme}>
+<ThemeProvider theme={widgetTheme} scoped="widget">
```

See [Nested and multiple theme providers](/material-ui/customization/css-theme-variables/configuration/#nested-and-multiple-theme-providers) for details.
