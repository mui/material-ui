# CSS theme variables - Relative color

<p class="description">Learn how to customize color space with CSS theme variables.</p>

:::warning
This feature is experimental and only available in modern browsers. Please check the [browser support](https://caniuse.com/css-relative-colors) before using it.
:::

## Benefits

- No longer need JavaScript to manipulate colors.
- Support modern color spaces, e.g. `oklch`, `oklab`, and `display-p3`.
- Support color aliases to external CSS variables.
- Automatically calculate contrast text color based on the [color-contrast research](https://lea.verou.me/blog/2024/contrast-color) by [Lea Verou](https://lea.verou.me/).

## Usage

Set `cssVariables` with `experimentalRelativeColor: true` to the theme options.
Material UI will start using CSS color-mix and relative color instead of the JavaScript color manipulation.

:::info
Try inspecting the demo below to the calculated values of the color tokens.
:::

```js
const theme = createTheme({
  cssVariables: {
    experimentalRelativeColor: true,
  },
});
```

{{"demo": "RelativeColor.js", "defaultCodeOpen": false}}

## What's new

### Theme color functions

`alpha`, `lighten`, and `darken` are added to the theme object.
When relative color feature is enabled, those functions will use CSS color-mix and relative color instead of the JavaScript color manipulation.

{{"demo": "ThemeColorFunctions.js", "defaultCodeOpen": false}}

### Contrast color function

When relative color feature is enabled, `theme.palette.getContrastText` function replaces the JavaScript color manipulation with relative color.

The demo below shows the result of the `theme.palette.getContrastText` function as the text color of the color swatch.

{{"demo": "ContrastTextDemo.js", "defaultCodeOpen": false}}

:::info
The CSS variable `--__l` and `--__a` is set globally by Material UI based on the [color-contrast research](https://lea.verou.me/blog/2024/contrast-color).
:::

### Alias color variables

If you already have color tokens via CSS variables, you can provide the values to the theme palette options.

```js
const theme = createTheme({
  cssVariables: {
    experimentalRelativeColor: true,
  },
  palette: {
    primary: {
      main: 'var(--colors-brand-primary)',
    },
  },
});
```

{{"demo": "AliasColorVariables.js", "defaultCodeOpen": false}}

## Caveats

- The relative color contrast is calculated based on the [color-contrast research](https://lea.verou.me/blog/2024/contrast-color) by [Lea Verou](https://lea.verou.me/). The result **might not** be the same as the JavaScript color manipulation.
- In the future, the relative color contrast will be replaced by native [CSS `contrast-color` function](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/contrast-color) when the browser support is improved.
