# CSS theme variables - Native color

<p class="description">Learn how to use native color with CSS theme variables.</p>

:::warning
This feature only works in modern browsers. Please check the [browser support](https://caniuse.com/css-relative-colors) before using it.
:::

## Benefits

- No longer need to use JavaScript to manipulate colors.
- Supports modern color spaces, for example `oklch`, `oklab`, and `display-p3`.
- Supports color aliases to external CSS variables.
- Automatically calculates contrast text from the main color.

## Usage

Set `cssVariables` with `nativeColor: true` to the theme options.
Material UI will start using CSS color-mix and relative color instead of the JavaScript color manipulation.

:::info
Try inspecting the demo below to see the calculated values of the color tokens.
:::

```js
const theme = createTheme({
  cssVariables: {
    nativeColor: true,
  },
});
```

{{"demo": "NativeCssColors.js"}}

## Modern color spaces

The theme palette supports all modern color spaces, for example `oklch`, `oklab`, and `display-p3`.

```js
const theme = createTheme({
  cssVariables: { nativeColor: true },
  palette: {
    primary: {
      main: 'color(display-p3 0.5 0.8 0.2)',
    },
  },
});
```

{{"demo": "ModernColorSpaces.js"}}

## Aliasing color variables

If you have set colors via CSS variables, you can provide the values to the theme palette options.

```js
const theme = createTheme({
  cssVariables: {
    nativeColor: true,
  },
  palette: {
    primary: {
      main: 'var(--colors-brand-primary)',
    },
  },
});
```

{{"demo": "AliasColorVariables.js"}}

## Theme color functions

The theme object contains these new color utilities: `alpha()`, `lighten()`, and `darken()`.

When native color is enabled, those functions will use CSS color-mix and relative color instead of the JavaScript color manipulation.

{{"demo": "ThemeColorFunctions.js"}}

:::info
The theme color functions are backward compatible.
If native color is not enabled, they will fall back to the JavaScript color manipulation.
:::

## Contrast color function

The `theme.palette.getContrastText()` function produces the contrast color.
The demo below shows the result of the `theme.palette.getContrastText()` function, which produces the text color based on the selected background.

{{"demo": "ContrastTextDemo.js"}}

:::info
The CSS variables `--__l` and `--__a` are internal variables set globally by Material UI.

To learn more about the formulas used, see [this article on color contrast from Lea Verou](https://lea.verou.me/blog/2024/contrast-color).
:::

## Caveats

- Because of the differences in how contrast is calculated between CSS and JavaScript, the resulting CSS colors may not exactly match the corresponding JavaScript colors to be replaced.
- In the future, the relative color contrast will be replaced by native [CSS `contrast-color()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/contrast-color) when browser support is improved.
- For relative color contrast, the color space is automatically set to `oklch` internally. Currently it's not possible to change this, but please [open an issue](https://github.com/mui/material-ui/issues/new/) if you have a use case that calls for it.
