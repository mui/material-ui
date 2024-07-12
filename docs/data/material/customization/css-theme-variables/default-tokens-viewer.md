# Default tokens viewer

<p class="description">A preview of the default CSS theme variables for built-in light and dark color schemes</p>

The following tokens are generated when using `CssVarsProvider` in your application.

## Colors

The color tokens are generated from `colorSchemes`:

{{"component": "modules/material-ui/PaletteTokensViewer.js"}}

## Font

The font tokens are generated from `typography`:

{{"component": "modules/material-ui/FontTokensViewer.js"}}

:::success
The font variables can be used with the CSS `font` property like this:

```css
.text {
  font: var(--mui-font-h1);
}
```

:::

## Spacing

The variable `--mui-spacing` is generated from the `spacing` field with a default of `8px`.

Below are the usage examples:

<codeblock>

```js JS
theme.spacing(1, 2); // var(--mui-spacing) calc(2 * var(--mui-spacing))
```

```css CSS
.some-class {
  margin: calc(var(--mui-spacing) * 2);
}
```

</codeblock>

## Shadows and overlays

Shadows and overlays are arrays with 24 indexes ordered by intensity.

The demo below is a [Paper](/material-ui/react-paper/) component with different level of elevations in light and dark color schemes:

{{"component": "modules/material-ui/ShadowsOverlaysViewer.js"}}

## Z-index

The z-index tokens are named after the components they are used in.

{{"component": "modules/material-ui/ZIndexTokensViewer.js"}}
