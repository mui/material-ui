# Estilos

<p class="description">Customize Material-UI with your theme. You can change the colors, the typography and much more.</p>

The theme specifies the color of the components, darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc.

Themes let you apply a consistent tone to your app. It allows you to **customize all design aspects** of your project in order to meet the specific needs of your business or brand.

To promote greater consistency between apps, light and dark theme types are available to choose from. By default, components use the light theme type.

## Theme provider

If you wish to customize the theme, you need to use the `ThemeProvider` component in order to inject a theme into your application. However, this is optional; Material-UI components come with a default theme.

`ThemeProvider` relies on the context feature of React to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize. You can learn more about this in [the API section](/styles/api/#themeprovider).

## Theme configuration variables

Changing the theme configuration variables is the most effective way to match Material-UI to your needs. The following sections cover the most important theme variables:

- [Paleta](/customization/palette/)
- [Tipografía](/customization/typography/)
- [Espaciado](/customization/spacing/)
- [Puntos de interrupción](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Globales](/customization/globals/)

You can check out the [default theme section](/customization/default-theme/) to view the default theme in full.

### Custom variables

When using Material-UI's theme with our [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider). It can be convenient to add additional variables to the theme so you can use them everywhere. For instance:

{{"demo": "pages/customization/themes/CustomStyles.js"}}

## Accessing the theme in a component

You [can access](/styles/advanced/#accessing-the-theme-in-a-component) the theme variables inside your React components.

## Nesting the theme

[You can nest](/styles/advanced/#theme-nesting) multiple theme providers.

{{"demo": "pages/customization/themes/ThemeNesting.js"}}

The inner theme will **override** the outer theme. You can extend the outer theme by providing a function:

{{"demo": "pages/customization/themes/ThemeNestingExtend.js"}}

### A note on performance

The performance implications of nesting the `ThemeProvider` component are linked to JSS's work behind the scenes. The main point to understand is that the injected CSS is cached with the following tuple `(styles, theme)`.

- `theme`: If you provide a new theme at each render, a new CSS object will be computed and injected. Both for UI consistency and performance, it's better to render a limited number of theme objects.
- `styles`: The larger the styles object is, the more work is needed.

## API

### `createMuiTheme(options) => theme`

Generate a theme base on the options received.

#### Arguments

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.

#### Returns

`theme` (*Object*): A complete, ready to use theme object.

#### Ejemplos

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### Arguments

1. `theme` (*Object*): The theme object to enhance.
2. `options` (*Object* [optional]):

- `breakpoints` (*Array<string>* [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers).
- `disableAlign` (*Boolean* [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (*Number* [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. The value must me greater than 1.
- `variants` (*Array<string>* [optional]): Default to all. The typography variants to handle.

#### Returns

`theme` (*Object*): The new theme with a responsive typography.

#### Ejemplos

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```