# @material-ui/system

<p class="description">Sistema de estilo & funções de estilo para a construção de sistemas de design poderosos.</p>

## Primeiros passos

`@material-ui/system` fornece funções utilitárias de baixo nível, chamadas de "*funções de estilo*", para construir sistemas de design poderosos. Algumas das principais características:

- ⚛️ Acesso aos valores do tema diretamente nas propriedades do componente.
- 🦋 Incentivo a consistência da UI.
- 🌈 Escreva estilo responsivo sem esforço.
- 🦎 Trabalhe com qualquer objeto de tema.
- 💅 Trabalhe com as soluções CSS-in-JS mais populares.
- 📦 Menos que [4 KB gzipped](https://bundlephobia.com/result?p=@material-ui/system).
- 🚀 [Rápido o suficiente](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uisystem) para não ser um gargalo em tempo de execução.

É importante entender que este pacote expõe funções de estilo puro (sem efeitos colaterais) com esta assinatura: `({ theme, ...style }) => style`, **só isso**.

### Demonstração

No restante desta seção de *Primeiros passos*, estamos usando **styled-components** como exemplo de referência (para enfatizar a universalidade deste pacote). Alternativamente, você pode [usar JSS](#interoperability). As demonstrações também são baseadas no valor **padrão** do [objeto de tema](/customization/default-theme/) do Material-UI.

{{"demo": "pages/system/basics/Demo.js", "defaultCodeOpen": true}}

### Instalação

```jsx
// utilizando o npm
npm install @material-ui/system

// utilizando o yarn
yarn add @material-ui/system
```

### Criar um componente

Para usar o componente `Box`, você primeiro precisa criá-lo. Para começar, adicione uma função de `espaçamento` e `paleta` para o argumento de estilo.

```jsx
import styled from 'styled-components';
import { spacing, palette } from '@material-ui/system';

const Box = styled.div`${spacing}${palette}`;

export default Box;
```

Este componente Box agora suporta novas [propriedades de espaçamento](/system/spacing/#api) e [propriedades de cor](/system/palette/#api). Por exemplo, você pode fornecer uma propriedade de preenchimedo (padding): `p` e uma propriedade de cor: `color`.

```jsx
<Box p="1rem" color="grey">Me dê algum espaço!</Box>
```

O componente pode ser estilizado, fornecendo quaisquer valores CSS válidos.

### Temas

Mas na maioria das vezes, você deseja depender dos valores de um tema, para aumentar a consistência da interface do usuário. É preferível ter um conjunto predeterminado de valores de preenchimento e cor. Importe o provedor de temas de sua solução de estilo.

```jsx
import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  spacing: 4,
  palette: {
    primary: '#007bff',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* children */}
    </ThemeProvider>
  )
}

export default App
```

Agora, você pode fornecer um valor multiplicador de espaçamento:

```jsx
<Box p={1}>4px</Box>
<Box p={2}>8px</Box>
<Box p={-1}>-4px</Box>
```

e uma cor primária:

```jsx
<Box color="primary">azul</Box>
```

### Tudo incluído

Para tornar o componente Box mais útil, estamos construindo uma coleção de funções de estilo, aqui está a lista completa:

- [borders](/system/borders/#api)
- [display](/system/display/#api)
- [flexbox](/system/flexbox/#api)
- [palette](/system/palette/#api)
- [positions](/system/positions/#api)
- [shadows](/system/shadows/#api)
- [sizing](/system/sizing/#api)
- [spacing](/system/sizing/#api)
- [typography](/system/typography/#api)

If you are already using `@material-ui/core`, you can use the [Box component](/components/box/) (using JSS internally):

```jsx
import Box from '@material-ui/core/Box';
```

## Interoperabilidade

`@material-ui/system` funciona com a maioria das bibliotecas CSS-in-JS, incluindo JSS, styled-components, e emotion.

Se você já estiver usando `@material-ui/core`, nós recomendamos você a começar com a solução **JSS**, para diminuir o tamanho do pacote.

### JSS

{{"demo": "pages/system/basics/JSS.js", "defaultCodeOpen": true}}

### Styled components

{{"demo": "pages/system/basics/StyledComponents.js", "defaultCodeOpen": true}}

### Emotion

{{"demo": "pages/system/basics/Emotion.js", "defaultCodeOpen": true}}

## Responsivo

**Todas** as propriedades são responsivas, oferecemos suporte para 3 diferentes APIs. Ela usa essa estrutura de tema com pontos de quebra padrão, mas é customizável:

```js
const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const theme = {
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    up: key => `@media (min-width:${values[key]}px)`,
  },
};
```

### Array

```jsx
<Box p={[2, 3, 4]} />

/**
 * Saídas:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

### Object

```jsx
<Box p={{ xs: 2, sm: 3, md: 4 }} />

/**
 * Saídas:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

### Colocação

If you want to group the breakpoint values, you can use the `breakpoints()` helper.

```jsx
import { compose, spacing, palette, breakpoints } from '@material-ui/system';
import styled from 'styled-components';

const Box = styled.div`
  ${breakpoints(
    compose(
      spacing,
      palette,
    ),
  )}
`;

<Box
  p={2}
  sm={{ p: 3 }}
  md={{ p: 4 }}
/>

/**
 * Saídas:
 *
 * padding: 16px;
 * @media (min-width: 600px) {
 *   padding: 24px;
 * }
 * @media (min-width: 960px) {
 *   padding: 32px;
 * }
 */
```

{{"demo": "pages/system/basics/CollocationApi.js"}}

## Propriedades de estilo customizadas

### `style(options) => style function`

Use esta função utilitária para criar sua própria função de estilo.

Not all CSS properties are supported. É possível que você queira suportar novas. Também é possível que você queira alterar o prefixo do caminho do tema.

#### Argumentos

1. `options` (*Object*): 
  - `options.prop` (*String*): A propriedade na qual a função de estilo será ativada.
  - `options.cssProperty` (*String|Boolean* [opcional]): Padrão `options.prop`. A propriedade CSS usada. Você pode desativar esta opção fornecendo `false`. Quando desativado, o valor da propriedade será manipulado como um objeto de estilo próprio. Pode ser usado para [variações de renderização](#variants).
  - `options.themeKey` (*String* [opcional]): O prefixo do caminho do tema.
  - `options.transform` (*Function* [opcional]): Aplique uma transformação antes de gerar um valor de CSS.

#### Retornos

`style function`: A função de estilo criada.

#### Exemplos

You can create a component that supports some CSS grid properties like `grid-gap`. By supplying `spacing` as the `themeKey` you can reuse logic enabling the behavior we see in other spacing properties like `padding`.

```jsx
import styled from 'styled-components';
import { style } from '@material-ui/system';
import { Box } from '@material-ui/core';

const gridGap = style({
  prop: 'gridGap',
  themeKey: 'spacing',
});

const Grid = styled(Box)`${gridGap}`;
const example = <Grid display="grid" gridGap={[2, 3]}>...</Grid>;
```

You can also customize the prop name by adding both a `prop` and `cssProperty` and transform the value by adding a `transform` function.

```jsx
import styled from 'styled-components';
import { style } from '@material-ui/system';

const borderColor = style({
  prop: 'bc',
  cssProperty: 'borderColor',
  themeKey: 'palette',
  transform: value => `${value} !important`,
});

const Colored = styled.div`${borderColor}`;
const example = <Colored bc="primary.main">...</Colored>;
```

### `compose(...style functions) => style function`

Mesclar várias funções de estilo em uma.

#### Retornos

`style function`: A função de estilo criada.

#### Exemplos

```js
import { style, compose } from '@material-ui/system'

export const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

export const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
});

const palette = compose(textColor, bgcolor);
```

## Variantes

A função auxiliar `style()` também pode ser usada para mapear propriedades para objetos de estilo no tema. Neste exemplo, a propriedade `variant` suporta todas as chaves presentes em `theme.typography`.

{{"demo": "pages/system/basics/Variant.js", "defaultCodeOpen": true}}

## Propriedade CSS

If you want to support custom CSS values, you can use the `css()` helper. Ele irá processar a propriedade `css`.

{{"demo": "pages/system/basics/CssProp.js", "defaultCodeOpen": true}}

## Como funciona

O styled-system fez um ótimo trabalho [explicando como ele funciona](https://github.com/jxnblk/styled-system/blob/master/docs/how-it-works.md#how-it-works). Ele pode ajudar a construir um modelo mental para esse conceito de "função de estilo".

## Caso de uso do mundo real

Na prática, um componente do Box pode poupar muito tempo. Neste exemplo, demonstramos como reproduzir um componente Banner.

{{"demo": "pages/system/basics/RealWorld.js"}}

## Arte prévia

`@material-ui/system` sintetiza ideias & APIs de várias fontes diferentes:

- [Tachyons](https://tachyons.io/) foi uma das primeiras bibliotecas CSS (2014) a promover o [padrão de CSS atômico](https://css-tricks.com/lets-define-exactly-atomic-css/) (ou CSS funcional).
- Tachyons foi mais tarde (2017) seguido por [Tailwind CSS](https://tailwindcss.com/). Eles tornaram o CSS atômico mais popular.
- [Twitter Bootstrap](https://getbootstrap.com/docs/4.1/utilities/borders/) introduziu lentamente nomes de classes atômicas em v2, v3 e v4. The way they group their "Helper classes" was used as inspiration.
- No mundo React, [Styled System](https://github.com/jxnblk/styled-system) foi um dos primeiros (2017) a promover as funções de estilo. Ele pode ser usado como um componente genérico do Box, substituindo os auxiliares CSS atômicos, bem como os auxiliares para escrever novos componentes.
- Grandes empresas como Pinterest, GitHub e Segment.io estão usando a mesma abordagem em diferentes gostos: 
  - [Evergreen Box](https://evergreen.segment.com/components/layout-primitives/)
  - [Gestalt Box](https://evergreen.segment.com/components/layout-primitives)
  - [Primer Box](https://primer.style/components/docs/Box)
- A implementação atual e a API responsiva de objetos foram inspiradas no [sistema Smooth-UI](https://smooth-ui.smooth-code.com/docs-basics-system).