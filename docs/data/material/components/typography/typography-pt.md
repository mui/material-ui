---
product: material-ui
title: Componente React de Tipografia
components: Typography
githubLabel: 'component: Typography'
materialDesign: https://m2.material.io/design/typography/the-type-system.html
---

# Typography

<p class="description">Use a tipografia para apresentar seu design e conteúdo da forma mais clara e eficiente possível.</p>

O uso de diferentes tamanhos e estilos de uma só vez pode estragar qualquer leiaute. Uma [escala tipográfica](https://m2.material.io/design/typography/#type-scale) tem um conjunto limitado de tipos de tamanhos que funcionam bem em conjunto com o leiaute de grade.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Geral

A fonte _Roboto_ **não** será carregada automaticamente pelo Material-UI. Você é responsável por carregar quaisquer fontes usadas em sua aplicação. A fonte Roboto possui algumas maneiras fáceis de ser carregada. For more advanced configuration, check out [the theme customization section](/material-ui/customization/typography/).

## Fonte Roboto via CDN

Temos abaixo um exemplo de markup de link usado para carregar a fonte Roboto de uma CDN:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

## Instalar via npm

You can [install it](https://www.npmjs.com/package/@fontsource/roboto) by running one of the following commands in your terminal:

With **npm**:

`npm install @fontsource/roboto`

Or **yarn**:

`yarn add @fontsource/roboto`

Then, you can import it in your entry-point.

```js
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

For more info check out [Fontsource](https://github.com/fontsource/fontsource).

Fontsource can be configured to load specific subsets, weights and styles. MUI default typography configuration only relies on 300, 400, 500, and 700 font weights.

## Componente

The Typography component makes it easy to apply a default set of font weights and sizes in your application.

{{"demo": "Types.js"}}

## Tema

In some situations you might not be able to use the `Typography` component. Hopefully, you might be able to take advantage of the [`typography`](/material-ui/customization/default-theme/?expand-path=$.typography) keys of the theme.

{{"demo": "TypographyTheme.js"}}

## Alterando o elemento semântico

The Typography component uses the `variantMapping` prop to associate a UI variant with a semantic element. It's important to realize that the style of a typography component is independent from the semantic underlying element.

- Você pode alterar o elemento subjacente para uma ocasião em específico com a propriedade `component`:

```jsx
{/ * Já existe um h1 na página, não vamos duplicá-lo. */
}
<Typography variant="h1" component="h2">
  h1. Heading
</Typography>;
```

- You can change the mapping [globally using the theme](/material-ui/customization/theme-components/#default-props):

```js
const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
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
  },
});
```

## Adding & disabling variants

In addition to using the default typography variants, you can add custom ones, or disable any you don't need. See the [Adding & disabling variants](/material-ui/customization/typography/#adding-amp-disabling-variants) example for more info.

## System props

As a CSS utility component, the `Typography` supports all [`system`](/system/properties/) properties. You can use them as prop directly on the component. For instance, a margin-top:

```jsx
<Typography mt={2}>
```

## Acessibilidade

A few key factors to follow for an accessible typography:

- **Cor**. Forneça contraste suficiente entre o texto e seu fundo, confira a [razão de contraste de cor WCAG 2.0 mínima recomendada](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Tamanho da fonte**. Use [relative units (rem)](/material-ui/customization/typography/#font-size) to accommodate the user's settings.
- **Hierarquia de títulos**. [Não pule](https://www.w3.org/WAI/tutorials/page-structure/headings/) níveis de título. Para resolver esse problema, você precisa [separar a semântica do estilo](#changing-the-semantic-element).
