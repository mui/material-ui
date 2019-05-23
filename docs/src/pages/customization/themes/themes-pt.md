# Temas

<p class="description">Personalize Material-UI com seu tema. Você pode mudar as cores, a tipografia e muito mais.</p>

O tema especifica a cor dos componentes, o escurecimento das superfícies, o nível de sombra, a opacidade apropriada dos elementos de tinta, etc.

Themes let you apply a consistent tone to your app. It allows you to **customize all design aspects** of your project in order to meet the specific needs of your business or brand.

Para promover uma maior consistência entre os aplicativos, os temas claro e escuro estão disponíveis para escolha. Por padrão, os componentes usam o tema claro.

## Provedor de Temas

Se você deseja personalizar o tema, você precisa usar o ` ThemeProvider ` componente para injetar um tema em sua aplicação. No entanto, isso é opcional; Material-UI componentes vêm com um tema padrão.

`ThemeProvider` relies on the context feature of React to pass the theme down to the components, so you need to make sure that `ThemeProvider` is a parent of the components you are trying to customize. Você pode aprender mais sobre isso na [ seção da API ](/styles/api/#themeprovider).

## Variáveis de configuração do tema

Changing the theme configuration variables is the most effective way to match Material-UI to your needs. The following sections cover the most important theme variables:

- [Paleta de Cores](/customization/palette/)
- [Typography](/customization/typography/)
- [Espaçamento](/customization/spacing/)
- [Pontos de interrupção](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [Globais](/customization/globals/)

Você pode conferir a [seção de tema padrão](/customization/default-theme/) para visualizar o tema padrão na íntegra.

### Variáveis customizáveis

When using Material-UI's theme with our [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider). It can be convenient to add additional variables to the theme so you can use them everywhere. Por exemplo:

{{"demo": "pages/customization/themes/CustomStyles.js"}}

## Acessando o tema em um componente

You [can access](/styles/advanced/#accessing-the-theme-in-a-component) the theme variables inside your React components.

## Nesting the theme

[You can nest](/styles/advanced/#theme-nesting) multiple theme providers.

{{"demo": "pages/customization/themes/ThemeNesting.js"}}

O tema interno **sobrescreverá** o tema exterior. Você pode estender o tema externo fornecendo uma função:

{{"demo": "pages/customization/themes/ThemeNestingExtend.js"}}

### A note on performance

The performance implications of nesting the `ThemeProvider` component are linked to JSS's work behind the scenes. The main point to understand is that the injected CSS is cached with the following tuple `(styles, theme)`.

- `theme`: If you provide a new theme at each render, a new CSS object will be computed and injected. Both for UI consistency and performance, it's better to render a limited number of theme objects.
- `styles`: The larger the styles object is, the more work is needed.

## API

### `createMuiTheme(options) => theme`

Generate a theme base on the options received.

#### Argumentos

1. `options` (*Object*): Takes an incomplete theme object and adds the missing parts.

#### Retornos

`theme` (*Object*): A complete, ready to use theme object.

#### Exemplos

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

#### Argumentos

1. `theme` (*Object*): The theme object to enhance.
2. `options` (*Object* [optional]):

- `breakpoints` (*Array<string>* [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers).
- `disableAlign` (*Boolean* [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (*Number* [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. The value must me greater than 1.
- `variants` (*Array<string>* [optional]): Default to all. The typography variants to handle.

#### Retornos

`theme` (*Object*): The new theme with a responsive typography.

#### Exemplos

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```