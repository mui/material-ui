---
components: Typography
---

# Tipografia

<p class="description">Use typography to present your design and content as clearly and efficiently as possible.</p>

Too many type sizes and styles at once can spoil any layout. A [typographic scale](https://material.io/design/typography/#type-scale) has a limited set of type sizes that work well together along with the layout grid.

## General

The *Roboto* font will **not** be automatically loaded by Material-UI. The developer is responsible for loading all fonts used in their application. Roboto Font has a few easy ways to get started. For more advanced configuration, check out [the theme customization section](/customization/typography/).

## Roboto Font CDN

Temos abaixo um exemplo de markup de link usado para carregar a fonte Roboto de um CDN:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Install with npm

Você pode [instalá-la](https://www.npmjs.com/package/typeface-roboto) digitando o comando a seguir em um terminal:

`npm install typeface-roboto --save`

Então, você pode importá-la no seu ponto de entrada (entry-point).

```js
import 'typeface-roboto';
```

Para mais informações confira o projeto [typeface](https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto).

⚠️ Tome cuidado ao usar essa abordagem. Certifique-se de que seu bundler não carregue ansiosamente todas as variações da fonte (100/300/400/500/700/900, itálico/regular, SVG/woff). Colocar todos os arquivos de fonte inline pode aumentar o tamanho do seu bundle significativamente. A configuração de tipografia padrão da Material-UI depende apenas dos font weights 300, 400 e 500.

## Component

{{"demo": "pages/components/typography/Types.js"}}

## Theme

Em algumas situações, talvez você não consiga usar o componente `Tipografia`. Com sorte, você possa talvez tirar proveito das chaves de [`typography`](/customization/default-theme/?expend-path=$.typography) do tema.

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## Changing the semantic element

O componente de Tipografia (Typography) usa a propriedade `variantMapping` para associar a variação da UI com um elemento semântico. É importante ressaltar que o estilo de uma tipografia é independente do elemento semântico por baixo dela.

- You can change the underlying element for a one time occassion with the `component` property:

```jsx
{/* Já temos um h1 na página, não vamos duplicá-lo. */}
<Typography variant="h1" component="h2">
  h1. Título (Heading)
</Typography>
```

- You can change the mapping [globally using the theme](/customization/globals/#default-props):

```js
const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
});
```