# CSS theme variables - Native color syntax

<p class="description">Learn how to use native color syntax with CSS theme variables.</p>

:::warning
This feature only works in modern browsers. Please check the [browser support](https://caniuse.com/css-relative-colors) before using it.
:::

## Benefits

- No longer need JavaScript to manipulate colors.
- Support modern color spaces, for example `oklch`, `oklab`, and `display-p3`.
- Support color aliases to external CSS variables.
- Automatically calculate contrast text color based on the [color-contrast research](https://lea.verou.me/blog/2024/contrast-color) by [Lea Verou](https://lea.verou.me/).

## Usage

Set `cssVariables` with `nativeColorSyntax: true` to the theme options.
Material UI will start using CSS color-mix and relative color instead of the JavaScript color manipulation.

:::info
Try inspecting the demo below to the calculated values of the color tokens.
:::

```js
const theme = createTheme({
  cssVariables: {
    nativeColorSyntax: true,
  },
});
```

{{"demo": "NativeCssColors.js"}}

## Modern color spaces

The theme palette supports all modern color spaces, for example `oklch`, `oklab`, and `display-p3`.

```js
const theme = createTheme({
  cssVariables: { nativeColorSyntax: true },
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
    nativeColorSyntax: true,
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

When native color syntax is enabled, those functions will use CSS color-mix and relative color instead of the JavaScript color manipulation.

{{"demo": "ThemeColorFunctions.js"}}

:::info
The theme color functions are backward compatible.
If native color syntax is not enabled, they will fallback to the JavaScript color manipulation.
:::

## Contrast color function

The `theme.palette.getContrastText` function produces the contrast color based on the [color-contrast research](https://lea.verou.me/blog/2024/contrast-color).

The demo below shows the result of the `theme.palette.getContrastText` function to produce the text color based on the selected background.

{{"demo": "ContrastTextDemo.js"}}

:::info
The CSS variable `--__l` and `--__a` are internal variables set globally by Material UI.

To learn more about the formula, please refer to the [color-contrast research](https://lea.verou.me/blog/2024/contrast-color).
:::

## Caveats

- The color contrast is calculated based on the [color-contrast research](https://lea.verou.me/blog/2024/contrast-color) by [Lea Verou](https://lea.verou.me/). The produced color **might not** be exactly the same as the JavaScript color manipulation.
- In the future, the relative color contrast will be replaced by native [CSS `contrast-color` function](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/contrast-color) when the browser support is improved.
- For relative color contrast, the color space is automatically set to `oklch` internally. It's not possible to change at the moment until we see the need for customizing it. Feel free to [open an issue](https://github.com/mui/material-ui/issues/new/) if you have a use case for it.
