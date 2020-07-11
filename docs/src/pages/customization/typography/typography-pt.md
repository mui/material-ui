# Tipografia

<p class="description">O tema fornece um conjunto de tipos de tamanhos que funcionam bem juntos e também com a grade de leiaute.</p>

## Família da fonte

Você pode alterar a família de fontes com a propriedade `theme.typography.fontFamily`.

Por exemplo, esta demonstração usa a fonte do sistema em vez da fonte padrão Roboto:

```js
const theme = createMuiTheme({
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

⚠️ Isso requer que você tenha um plugin ou loader em seu processo de compilação que possa manipular o carregamento de arquivos `ttf`, `woff` e `woff2`. Fontes *não* serão embutidas dentro do seu pacote. Elas serão carregadas de seu servidor da web em vez de uma CDN.

```js
import RalewayWoff2 from './fonts/Raleway-Regular.woff2';

const raleway = {
  fontFamily: 'Raleway',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${RalewayWoff2}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
```

Em seguida, você precisa alterar o tema para usar essa nova fonte. Para definir globalmente Raleway como uma fonte, o componente [`CssBaseline`](/components/css-baseline/) pode ser usado (ou qualquer outra solução CSS de sua escolha).

```jsx
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [raleway],
      },
    },
  },
});

// ...
return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
```

## Tamanho da fonte

Material-UI usa a unidade `rem` para o tamanho da fonte. O tamanho da fonte padrão do elemento `<html>` do navegador é `16px`, mas os navegadores têm a opção de alterar esse valor, a unidade `rem` nos permite acomodar as configurações do usuário, resultando em um melhor suporte de acessibilidade. Os usuários alteram as configurações de tamanho da fonte por vários motivos, desde problemas de visão, até a escolha de configurações ideais para dispositivos que podem ser muito diferentes em tamanho e distância de visualização.

Para alterar o tamanho da fonte do Material-UI, você pode definir a propriedade `fontSize`. O valor padrão é `14px`.

```js
const theme = createMuiTheme({
  typography: {
    // Em chinês e japonês os caracteres são geralmente maiores,
    // então um tamanho de letra menor pode ser apropriado.
    fontSize: 12,
  },
});
```

O tamanho da fonte computada pelo navegador segue esta equação matemática:

![font-size](/static/images/font-size.gif)

<!-- https://latex.codecogs.com/gif.latex?computed&space;=&space;specification&space;\frac{typography.fontSize}{14}&space;\frac{html&space;font&space;size}{typography.htmlFontSize} -->

### Tamanhos de fonte responsivo

As propriedades de variações de tipografia são mapeadas diretamente para o CSS gerado. Você pode usar [consultas de mídia](/customization/breakpoints/#api) dentro delas:

```js
const theme = createMuiTheme();

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

{{"demo": "pages/customization/typography/CustomResponsiveFontSizes.js"}}

Para automatizar estas configurações, você pode usar a função auxiliar [`responsiveFontSizes()`](/customization/theming/#responsivefontsizes-theme-options-theme), para fazer a tipografia responsiva em relação aos tamanhos da fonte no tema.

{{"demo": "pages/customization/typography/ResponsiveFontSizesChart.js", "hideToolbar": true}}

Você pode ver isso em ação no exemplo abaixo. Ajuste o tamanho da janela do navegador e observe como o tamanho da fonte muda à medida que a largura cruza os diferentes [pontos de quebra](/customization/breakpoints/):

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```

{{"demo": "pages/customization/typography/ResponsiveFontSizes.js"}}

### Tamanhos da fonte fluido

Para ser feito: [#15251](https://github.com/mui-org/material-ui/issues/15251).

### Tamanho da fonte no HTML

Você pode querer alterar o tamanho da fonte padrão do elemento `<html>`. Por exemplo, quando usando a [simplificação de 10px](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/).

> ⚠️ Alterar o tamanho da fonte pode prejudicar a acessibilidade ♿️. A maioria dos navegadores concordou com o tamanho padrão de 16 pixels, mas o usuário pode alterá-lo. Por exemplo, alguém com necessidades especiais na visão poderia ter definido o tamanho padrão da fonte do seu navegador para algo maior.

Uma propriedade de tema `htmlFontSize` é fornecida para estas situações, que informa ao Material-UI qual é o tamanho da fonte no elemento `<html>`. Isso é usado para ajustar o valor `rem`, para que o tamanho da fonte calculado sempre corresponda à especificação.

```js
const theme = createMuiTheme({
  typography: {
    // Diz ao Material-UI qual é o font-size no elemento html.
    htmlFontSize: 10,
  },
});
```

```css
html {
  font-size: 62.5%; /* 62.5% of 16px = 10px */
}
```

*Você precisa aplicar o CSS acima no elemento html desta página para ver a demonstração abaixo renderizada corretamente*

{{"demo": "pages/customization/typography/FontSizeTheme.js"}}

## Variantes

O objeto de tipografia vem com [13 variantes](/components/typography/#component) por padrão:

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

Cada uma dessas variantes pode ser customizada individualmente:

```js
const theme = createMuiTheme({
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

{{"demo": "pages/customization/typography/TypographyVariants.js"}}

## Valores padrão

Você pode explorar os valores padrão da tipografia usando [o explorador de tema](/customization/default-theme/?expand-path=$.typography) ou abrindo o console das ferramentas de desenvolvimento nesta página (`window.theme.typography`).