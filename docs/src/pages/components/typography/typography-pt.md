---
components: Typography
---

# Tipografia

<p class="description">Use a tipografia para apresentar seu design e conteúdo da forma mais clara e eficiente possível.</p>

O uso de diferentes tamanhos e estilos de uma só vez pode estragar qualquer layout. Uma [escala tipográfica](https://material.io/design/typography/#type-scale) tem um conjunto limitado de tamanhos de tipo que funcionam bem em conjunto com a grade de layout.

## Geral

A fonte *Roboto* **não** será carregada automaticamente pelo Material-UI. O desenvolvedor é responsável por carregar todas as fontes usadas em sua aplicação. A fonte Roboto possui algumas maneiras fáceis de começar. Para configuração mais avançadas, dê uma olhada na [seção de personalização de temas](/customization/typography/).

## CDN da fonte Roboto

Temos abaixo um exemplo de markup de link usado para carregar a fonte Roboto de um CDN:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Instalar via npm

Você pode [instalá-la](https://www.npmjs.com/package/typeface-roboto) digitando o comando a seguir em um terminal:

`npm install typeface-roboto --save`

Então, você pode importá-la no seu ponto de entrada (entry-point).

```js
import 'typeface-roboto';
```

Para mais informações confira o projeto [typeface](https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto).

⚠️ Tome cuidado ao usar essa abordagem. Certifique-se de que seu bundler não carregue ansiosamente todas as variações da fonte (100/300/400/500/700/900, itálico/regular, SVG/woff). Colocar todos os arquivos de fonte em linha pode aumentar o tamanho do seu pacote significativamente. A configuração de tipografia padrão do Material-UI depende apenas dos pesos de fonte de 300, 400, 500 e 700.

## Componente

{{"demo": "pages/components/typography/Types.js"}}

## Tema

Em algumas situações, talvez você não consiga usar o componente `Tipografia`. Hopefully, you might be able to take advantage of the [`typography`](/customization/default-theme/?expand-path=$.typography) keys of the theme.

{{"demo": "pages/components/typography/TypographyTheme.js"}}

## Alterando o elemento semântico

O componente de Tipografia (Typography) usa a propriedade `variantMapping` para associar a variação da UI com um elemento semântico. É importante ressaltar que o estilo de uma tipografia é independente do elemento semântico por baixo dela.

- Você pode alterar o elemento subjacente para uma ocasião única com a propriedade `component`:

```jsx
{/ * Já existe um h1 na página, não vamos duplicá-lo. */}
<Typography variant="h1" component="h2">
  h1. Título
</Typography>
```

- Você pode alterar o mapeamento [globalmente usando o tema](/customization/globals/#default-props):

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

## Acessibilidade

Alguns fatores chave a seguir para uma tipografia acessível:

- **Cor**. Forneça contraste suficiente entre o texto e seu fundo, confira a [razão de contraste de cor WCAG 2.0 mínima recomendada](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1).
- **Tamanho da fonte**. Use [unidades relativas (rem)](/customization/typography/#font-size) para acomodar as configurações do usuário.
- **Hierarquia de títulos**. [Não pule](https://www.w3.org/WAI/tutorials/page-structure/headings/) níveis de título. Para resolver esse problema, você precisa [separar a semântica do estilo](#changing-the-semantic-element).