# CSS Layers

<p class="description">Learn how to generate Material UI styles with cascade layers.</p>

## What are cascade layers?

Cascade layers are an advanced CSS feature that make it possible to control the order in which styles are applied to elements.
If you're not familiar with cascade layers, visit the [MDN documentation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers) for a detailed overview.

Benefits of using cascade layers include:

- **Improved specificity**: Cascade layers let you control the order of the styles, which can help avoid specificity conflicts. For example, you can theme a component without hitting the default specificity of the styles.
- **Better integration with CSS frameworks**: With cascade layers, you can use Tailwind CSS v4 utility classes to override Material UI styles without the need for the `!important` directive.
- **Better debuggability**: Cascade layers appear in the browser's dev tools, making it easier to see which styles are applied and in what order.

## The mui layer

Material UI puts all of its styles in a single layer, `@layer mui`: the components' styles, the theme's style overrides, the `sx` prop, the `GlobalStyles` and `CssBaseline` components, and the CSS theme variables.
Inside the layer, these styles keep their usual precedence.

Unlayered CSS and layers declared after `mui` override Material UI's styles, whatever their specificity.

:::info
In tests that run in jsdom or happy-dom, Material UI's styles aren't layered, so that style assertions keep working.
jsdom before version 31 and happy-dom ignore the rules inside `@layer` blocks, and matchers such as `@emotion/jest`'s `toHaveStyleRule` don't look inside them.
:::

## Setting the layer order

A layer takes its place in the order where the browser first finds it.
To place `mui` among other layers, such as the ones of Tailwind CSS v4, declare the order at the top of a global CSS file, which loads before Material UI's styles:

```css title="globals.css"
@layer theme, base, mui, components, utilities;
```

This works with the Next.js App Router and Pages Router, Vite, and any other SPA.

## Sub-layers

Set `modularCssLayers: true` in the theme to split `mui` into sub-layers.
This makes it simpler to apply theming and override styles with the `sx` prop.

```tsx title="src/theme.tsx"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  modularCssLayers: true,
});

export default function AppTheme({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

{{"component": "file://./demos/input/index.ts"}}

Material UI then generates these layers:

- `@layer mui.global`: Global styles from the `GlobalStyles` and `CssBaseline` components, and the CSS theme variables.
- `@layer mui.components`: Base styles for all Material UI components.
- `@layer mui.theme`: Theme styles for all Material UI components.
- `@layer mui.custom`: Custom styles for non-Material UI styled components.
- `@layer mui.sx`: Styles from the `sx` prop.

The `ThemeProvider` declares the order of the sub-layers with Material UI's other styles, so they stay inside `mui`, wherever [the layer order](#setting-the-layer-order) puts it.

### Usage with other styling solutions

To integrate with other styling solutions, such as Tailwind CSS v4, declare the order at the top of your global CSS file, as with the single layer:

```css title="globals.css"
@layer theme, base, mui, components, utilities;
```

The sub-layers then go inside `mui`:

```css
@layer theme, base, mui.global, mui.components, mui.theme, mui.custom, mui.sx, components, utilities;
```

`modularCssLayers` also accepts the order as a string, such as `'@layer theme, base, mui, components, utilities;'`.
Material UI declares it with its styles, with `mui` replaced by the sub-layers, so it only orders the layers that no CSS before it declares.

### Caveats

If you enable `modularCssLayers` in an app that already has custom styles and theme overrides applied to it, you may observe unexpected changes to the look and feel of the UI due to the differences in specificity before and after.

For example, if you have the following [theme style overrides](/material-ui/customization/theme-components/#theme-style-overrides) for the [Accordion](/material-ui/react-accordion/) component:

```js
const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
});
```

By default, the margin from the theme does _not_ take precedence over the default margin styles when the accordion is expanded, because it has higher specificity than the theme styles—so this code has no effect.

After enabling the `modularCssLayers` option, the margin from the theme _does_ take precedence because the theme layer comes after the components layer in the cascade order—so the style override is applied and the accordion has no margins when expanded.

{{"component": "file://./demos/caveat/index.ts"}}
