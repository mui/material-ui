# Theming

<p class="description">Customize Material-UI with your theme. You can change the colors, the typography and much more.</p>

The theme specifies the color of the components, darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc.

Themes let you apply a consistent tone to your app. It allows you to **customize all design aspects** of your project in order to meet the specific needs of your business or brand.

To promote greater consistency between apps, light and dark theme types are available to choose from. By default, components use the light theme type.

## Theme provider

If you wish to customize the theme, you need to use the `ThemeProvider` component in order to inject a theme into your application. However, this is optional; Material-UI components come with a default theme.

`ThemeProvider` relies on the context feature of React to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize. You can learn more about this in [the API section](/styles/api/#themeprovider).

## Theme configuration variables

Changer la configuration du thème est la manière la plus efficace d'accorder Material-UI à vos préférences. Les sections suivantes couvrent les principales variables des thèmes:

- [Palette](/customization/palette/)
- [Typographie](/customization/typography/)
- [Ecartement](/customization/spacing/)
- [Breakpoints](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Variables globales](/customization/globals/)

Vous pouvez consulter la section [thème par défaut](/customization/default-theme/) pour afficher le thème par défaut dans son intégralité.

### Variables personnalisées

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider). Il peut être pratique d'ajouter des variables supplémentaires au thème afin que vous puissiez les utiliser partout. Par exemple:

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Accéder au thème dans un composant

Vous [pouvez accéder](/styles/advanced/#accessing-the-theme-in-a-component) aux variables de thème dans vos composants React.

## Saisir le thème

[Vous pouvez imbriquer](/styles/advanced/#theme-nesting) plusieurs fournisseurs de thème.

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

Le thème intérieur **remplacera** le thème extérieur. Vous pouvez étendre le thème externe en fournissant une fonction :

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### Une note sur les performances

The performance implications of nesting the `ThemeProvider` component are linked to JSS's work behind the scenes. The main point to understand is that the injected CSS is cached with the following tuple `(styles, theme)`.

- `theme`: If you provide a new theme at each render, a new CSS object will be computed and injected. Both for UI consistency and performance, it's better to render a limited number of theme objects.
- `styles`: The larger the styles object is, the more work is needed.

## API

### `createMuiTheme(options) => theme`

Générer un thème basé sur les options reçues.

#### Paramètres

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.

#### Valeur de retour

`theme` (*Object*): A complete, ready to use theme object.

#### Exemples

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

#### Paramètres

1. `theme` (*Object*): The theme object to enhance.
2. `options` (*Object* [optional]):

- `breakpoints` (*Array<String>* [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers).
- `disableAlign` (*Boolean* [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (*Number* [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. The value must be greater than 1.
- `variants` (*Array<String>* [optional]): Default to all. The typography variants to handle.

#### Valeur de retour

`theme` (*Object*): The new theme with a responsive typography.

#### Exemples

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```