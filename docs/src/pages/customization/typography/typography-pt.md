# Tipografia

<p class="description">O tema fornece um conjunto de tamanhos de tipos que funcionam bem juntos e também com a grade de leiaute.</p>

The following example demonstrates how to change the [default values](/customization/default-theme/?expend-path=$.typography) of the typography in the theme. You can learn more about how to use the [Typography component](/components/typography/) by checking out the dedicated page.

{{"demo": "pages/customization/typography/TypographyTheme.js"}}

## Família da fonte

Você pode usar fonte do sistema em vez da fonte Roboto padrão.

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

## Fontes próprias

Para utilizar fontes próprias, baixe os arquivos de fonte em formatos `ttf`, `woff`, e/ou `woff2` e importe-os em seu código.

⚠️ Isso requer que você tenha um plugin ou loader em seu processo de compilação que possa manipular o carregamento de arquivos `ttf`, `woff` e `woff2`. Fontes *não* serão embutidas dentro do seu pacote. Elas serão carregadas de seu servidor da Web em vez de uma CDN.

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
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
```

Então, você pode alterar o tema para usar essa nova fonte. Para definir globalmente Raleway como uma fonte, o componente [`CssBaseline`](/components/css-baseline/) precisa ser usado.

```js
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Raleway',
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
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [raleway],
      },
    },
  },
});
```

## Tamanho da fonte

Material-UI usa a unidade `rem` para o tamanho da fonte. O tamanho da fonte padrão do elemento `<html>` do navegador é `16px`, mas os navegadores têm a opção de alterar esse valor, a unidade `rem` nos permite acomodar as configurações do usuário, resultando em uma experiência de usuário muito melhor. Os usuários alteram as configurações de tamanho da fonte por vários motivos, desde problemas de visão, até a escolha de configurações ideais para dispositivos que podem ser muito diferentes em tamanho e distância de visualização.

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

![font-size](/static/images/font-size.gif) <!-- https://latex.codecogs.com/gif.latex?computed&space;=&space;specification&space;\frac{typography.fontSize}{14}&space;\frac{html&space;font&space;size}{typography.htmlFontSize} -->

## Tamanho da fonte no HTML

Você pode querer alterar o tamanho da fonte padrão do elemento `<html>`. Por exemplo, quando usando a [simplificação de 10px](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/). Nós fornecemos uma propriedade `htmlFontSize` no tema, para estas necessidades. Ela diz ao Material-UI qual é o tamanho da fonte no elemento `<html>`. É usada para ajustar o valor `rem`, para que o tamanho da fonte calculado sempre corresponda à especificação.

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
  font-size: 62.5%; /* 62.5% de 16px = 10px */
}
```

*Você precisa aplicar o CSS acima no elemento html desta página para ver a demonstração abaixo renderizada corretamente*

{{"demo": "pages/customization/typography/FontSizeTheme.js"}}

## Tamanhos da fonte responsivo

As propriedades de variações de tipografia são mapeadas diretamente para o CSS gerado. Você pode usar [consultas de mídia](/customization/breakpoints/#api) dentro delas:

```js
const theme = createMuiTheme();

theme.typography.h1 = {
  fontSize: '3rem',
  '@media (min-width:600px)': {
    fontSize: '4.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '6rem',
  },
};
```

Para automatizar estas configurações, você pode usar a função auxiliar [`responsiveFontSizes()`](/customization/themes/#responsivefontsizes-theme-options-theme), para fazer a tipografia de tamanhos da fonte no tema responsivo.

{{"demo": "pages/customization/typography/ResponsiveFontSizesChart.js", "hideHeader": true}}

Você pode ver isso em ação no exemplo abaixo. Ajuste o tamanho da janela do navegador e observe como o tamanho da fonte muda à medida que a largura cruza os diferentes [pontos de quebra](/customization/breakpoints/):

{{"demo": "pages/customization/typography/ResponsiveFontSizes.js"}}

## Tamanhos da fonte fluido

Para ser feito: [#15251](https://github.com/mui-org/material-ui/issues/15251).