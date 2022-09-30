# Tipografia

<p class="description">O tema fornece um conjunto de tipos de tamanhos que funcionam bem juntos e também com a grade de leiaute.</p>

## Fonte

Você pode alterar a família de fontes com a propriedade `theme.typography.fontFamily`.

Por exemplo, esta demonstração usa a fonte do sistema em vez da fonte padrão Roboto:

```js
const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
```

### Fontes auto-hospedadas

Para fontes auto-hospedadas, baixe os arquivos de fonte em formatos `ttf`, `woff`, e/ou `woff2` e importe-os em seu código.

⚠️ Isso requer que você tenha um plugin ou loader em seu processo de compilação que possa manipular o carregamento de arquivos `ttf`, `woff` e `woff2`. Fontes _não_ serão embutidas dentro do seu pacote. Elas serão carregadas de seu servidor da web em vez de uma CDN.

```js
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';
```

Em seguida, você precisa alterar o tema para usar essa nova fonte. In order to globally define Raleway as a font face, the [`CssBaseline`](/material-ui/react-css-baseline/) component can be used (or any other CSS solution of your choice).

```jsx
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';

const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: "local('Raleway'), local('Raleway-Regular'), url(${RalewayWoff2}) format('woff2')";
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
        }
      `,
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
      sx={{
        fontFamily: 'Raleway',
      }}
    >
      Raleway
    </Box>
  </ThemeProvider>
);
```

Observe que se você deseja adicionar declarações `@font-face` adicionais, você precisa usar a sintaxe de string do modelo CSS para adicionar substituições de estilo, de modo que as declarações `@font-face` previamente definidas não serão substituídas.

## Tamanho da fonte

Material-UI usa a unidade `rem` para o tamanho da fonte. O tamanho da fonte padrão do elemento `<html>` do navegador é `16px`, mas os navegadores têm a opção de alterar esse valor, a unidade `rem` nos permite acomodar as configurações do usuário, resultando em um melhor suporte de acessibilidade. Os usuários alteram as configurações de tamanho da fonte por vários motivos, desde problemas de visão, até a escolha de configurações ideais para dispositivos que podem ser muito diferentes em tamanho e distância de visualização.

Para alterar o tamanho da fonte do Material-UI, você pode definir a propriedade `fontSize`. O valor padrão é `14px`.

```js
const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});
```

O tamanho da fonte computada pelo navegador segue esta equação matemática:

<div class="only-light-mode">
  <img alt="cálculo do tamanho da fonte" style="width: 458px;" src="/static/images/font-size.svg" />
</div>
<div class="only-dark-mode">
  <img alt="cálculo do tamanho da fonte" style="width: 458px;" src="/static/images/font-size-dark.svg" />
</div>

<!-- https://latex.codecogs.com/svg.latex?\dpi{200}&space;\text{computed}&space;=&space;\text{specification}\cdot\frac{\text{typography.fontSize}}{14}\cdot\frac{\text{html&space;fontsize}}{\text{typography.htmlFontSize}} -->

### Tamanhos de fonte responsivo

As propriedades de variações de tipografia são mapeadas diretamente para o CSS gerado. You can use [media queries](/material-ui/customization/breakpoints/#api) inside them:

```js
const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
```

{{"demo": "CustomResponsiveFontSizes.js"}}

To automate this setup, you can use the [`responsiveFontSizes()`](/material-ui/customization/theming/#responsivefontsizes-theme-options-theme) helper to make Typography font sizes in the theme responsive.

{{"demo": "ResponsiveFontSizesChart.js", "hideToolbar": true}}

Você pode ver isso em ação no exemplo abaixo. Adjust your browser's window size, and notice how the font size changes as the width crosses the different [breakpoints](/material-ui/customization/breakpoints/):

```js
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

{{"demo": "ResponsiveFontSizes.js"}}

### Tamanhos da fonte fluido

Para ser feito: [#15251](https://github.com/mui/material-ui/issues/15251).

### Tamanho da fonte no HTML

Você pode querer alterar o tamanho da fonte padrão do elemento `<html>`. Por exemplo, quando usando a [simplificação de 10px](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/).

Alterar o tamanho da fonte pode prejudicar a acessibilidade. Most browsers agreed on the default size of 16px, but the user can change it. Por exemplo, alguém com deficiência visual pode ter definido o tamanho da fonte padrão do navegador para algo maior.
:::

The `theme.typography.htmlFontSize` property is provided for this use case, which tells MUI what the font-size on the `<html>` element is. This is used to adjust the `rem` value so the calculated font-size always match the specification.

```js
const theme = createTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% de 16px = 10px */
}
```

_You need to apply the above CSS on the html element of this page to see the below demo rendered correctly_

{{"demo": "FontSizeTheme.js"}}

## Variantes

The typography object comes with [13 variants](/material-ui/react-typography/#component) by default:

- h1
- h2
- h3
- h4
- h5
- h6
- subtitle1
- subtitle2
- body1
- body2
- button
- caption
- overline

Each of these variants can be customized individually:

```js
const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});
```

{{"demo": "TypographyVariants.js"}}

## Adicionando & desativando variantes

Além de usar as variantes de tipografia padrão, você pode adicionar variantes personalizadas ou desabilitar as que não precisar. O que você precisa fazer:

**Passo 1. Atualizar o tema da tipografia de um objeto**

```js
const theme = createTheme({
  typography: {
    poster: {
      color: 'red',
    },
    // Disable h3 variant
    h3: undefined,
  },
});
```

**Passo 2. Atualize as tipagens necessárias (se você estiver usando TypeScript)**

:::info
Se você não estiver usando o TypeScript, pule esta etapa.
:::

You need to make sure that the typings for the theme's `typography` variants and the `Typography`'s `variant` prop reflects the new set of variants.

<!-- Tested with packages/mui-material/test/typescript/augmentation/typographyVariants.spec.ts -->

```ts
declare module '@material-ui/core/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@material-ui/core/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
    h3: false;
  }
}
```

**Passo 3. Agora você pode usar a nova variante criada**

{{"demo": "TypographyCustomVariant.js", "hideToolbar": true}}

```jsx
<Typography variant="poster">poster</Typography>;

/* This variant is no longer supported */
<Typography variant="h3">h3</Typography>;
```

## Valores padrão

Você pode explorar os valores padrão da tipografia usando [o explorador de temas](/material-ui/customization/default-theme/?expand-path=$.typography) ou abrindo o console de ferramentas de desenvolvimento nesta página (`window.theme.typography`).
