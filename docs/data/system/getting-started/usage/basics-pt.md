# Sistema Material-UI

<p class="description">CSS utilities for rapidly laying out custom designs.</p>

Material-UI comes with dozens of **ready-to-use** components in the core. Esses componentes são um ponto de partida incrível, mas quando se trata de fazer seu site se destacar com um design customizado, pode ser mais simples começar de um estado sem estilos. Apresentando o sistema:

O **sistema** permite que você crie rapidamente componentes de UI customizados utilizando os valores definidos no seu tema.

## Demonstração

_(Redimensione a janela para ver os pontos de quebra responsivos)_

{{"demo": "Demo.js", "bg": true, "defaultCodeOpen": true}}

## Instalação

<!-- #default-branch-switch -->

To install and save in your `package.json` dependencies, run the command below using **npm**:

```sh
npm install @mui/system @emotion/react @emotion/styled
```

Or **yarn**:

```sh
yarn add @mui/system @emotion/react @emotion/styled
```

Or if you want to use `styled-components` as a styling engine:

<!-- #default-branch-switch -->

```sh
npm install @mui/system @mui/styled-engine-sc styled-components
```

```sh
yarn add @mui/system @mui/styled-engine-sc styled-components
```

Take a look at the [Styled Engine guide](/material-ui/guides/styled-engine/) for more information about how to configure `styled-components` as the style engine.

## Por que usar o sistema?

Compare how the same stat component can be built with two different APIs.

{{"demo": "Why.js", "bg": true, "defaultCodeOpen": false}}

1. ❌ usando a API do styled-components:

```jsx
const StatWrapper = styled('div')(
  ({ theme }) => `
  background-color: ${theme.palette.background.paper};
  box-shadow: ${theme.shadows[1]};
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(2)};
  min-width: 300px;
`,
);

const StatHeader = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
`,
);

const StyledTrend = styled(TrendingUpIcon)(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  font-size: 16px;
  vertical-alignment: sub;
`,
);

const StatValue = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.primary};
  font-size: 34px;
  font-weight: ${theme.typography.fontWeightMedium};
`,
);

const StatDiff = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.success.dark};
  display: inline;
  font-weight: ${theme.typography.fontWeightMedium};
  margin-left: ${theme.spacing(0.5)};
  margin-right: ${theme.spacing(0.5)};
`,
);

const StatPrevious = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
  display: inline;
  font-size: 12px;
`,
);

return (
  <StatWrapper>
    <StatHeader>Sessions</StatHeader>
    <StatValue>98.3 K</StatValue>
    <StyledTrend />
    <StatDiff>18.77%</StatDiff>
    <StatPrevious>vs last week</StatPrevious>
  </StatWrapper>
);
```

2. ✅ usando o sistema:

```jsx
<Box
  sx={{
    bgcolor: 'background.paper',
    boxShadow: 1,
    borderRadius: 1,
    p: 2,
    minWidth: 300,
  }}
>
  <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
  <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
    98.3 K
  </Box>
  <Box
    component={TrendingUpIcon}
    sx={{ color: 'success.dark', fontSize: 16, verticalAlign: 'sub' }}
  />
  <Box
    sx={{
      color: 'success.dark',
      display: 'inline',
      fontWeight: 'medium',
      mx: 0.5,
    }}
  >
    18.77%
  </Box>
  <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
    vs. last week
  </Box>
</Box>
```

### Problema resolvido

The system focus on solving 3 main problems:

**1. Switching context wastes time.**

There's no need to constantly jump between the usage of the styled components and where they are defined. With the system, those descriptions are right where you need them.

**2. Naming things is hard.**

Have you ever found yourself struggling to find a good name for a styled component? The system maps the styles directly to the element. All you have to do is worry about actual style properties.

**3. Enforcing consistency in UIs is hard.**

This is especially true when more than one person is building the application, as there has to be some coordination amongst members of the team regarding the choice of design tokens and how they are used, what parts of the theme structure should be used with what CSS properties, and so on.

The system provides direct access to the value in the theme. It makes it easier to design with constraints.

## A propriedade `sx`

The `sx` prop, as the main part of the system, solves these problems by providing a fast & simple way of applying the correct design tokens for specific CSS properties directly to a React element. The [demo above](#demo) shows how it can be used to create a one-off design.

This prop provides a superset of CSS (contains all CSS properties/selectors in addition to custom ones) that maps values directly from the theme, depending on the CSS property used. Also, it allows a simple way of defining responsive values that correspond to the breakpoints defined in the theme. For more details, visit the [`sx` prop page](/system/getting-started/the-sx-prop/).

### Quando usar ela?

- **styled-components**: a API é excelente para construir componentes que precisam suportar uma ampla variedade de contextos. Estes componentes são usados em diversos locais da aplicação e suportam diferentes combinações de propriedades.
- **propriedade `sx`**: a API é excelente para aplicar estilos pontuais. É chamado de "utilitário" por esse motivo.

### Desempenho

The system relies on CSS-in-JS. It works with both Emotion and styled-components.

Pros:

- 📚 Permite uma grande flexibilidade na API. A propriedade `sx` suporta um super conjunto de CSS. Não há **nenhuma necessidade de aprender CSS duas vezes**. Uma vez que você aprendeu a sintaxe padronizada do CSS, é seguro pois, não mudou durante uma década. Então, você pode **opcionalmente** aprender os atalhos, se você valoriza a economia de tempo que eles trazem.
- 📦 Auto-purge. Somente o CSS usado na página é enviado para o cliente. O custo inicial do tamanho do pacote é **fixo**. Ele não aumenta com o número de propriedades CSS usadas. You pay the cost of [@emotion/react](https://bundlephobia.com/package/@emotion/react) and [@mui/system](https://bundlephobia.com/package/@mui/system). Você paga o custo de [@emotion/react](https://bundlephobia.com/result?p=@emotion/react) e [@material-ui/system](https://bundlephobia.com/result?p=@material-ui/system). Custa cerca de ~15 kB gzipped.

Cons:

- O desempenho em tempo de execução é impactado.

  | Benchmark                             | Fragmento de código         | Tempo normalizado |
  |:------------------------------------- |:--------------------------- | ----------------- |
  | c. Renderizar 1,000 styled components | `<div className="…">` | 100ms             |
  | b. Renderizar 1.000 componentes       | `<Div>`               | 120ms             |
  | c. Render 1,000 styled components     | `<StyledDiv>`         | 160ms             |
  | d. a. Renderizar 1.000 Box            | `<Box sx={…}>`        | 370ms             |

<!-- #default-branch-switch -->

_Head to the [benchmark folder](https://github.com/mui/material-ui/tree/master/benchmark/browser) for a reproduction of these metrics._

We believe that for most uses it's **fast enough**, but there are simple workarounds when performance becomes critical. For instance, when rendering a list with many items, you can use a CSS child selector to have a single "style injection" point (using d. for the wrapper and a. for each item).

### API tradeoff

Having the system under one prop (`sx`) helps to differentiate props defined for the sole purpose of CSS utilities, vs. those for component business logic. It's important for the **separation of concerns**. For instance, a `color` prop on a button impacts multiple states (hover, focus, etc.), not to be confused with the color CSS property.

Only the `Box`, `Stack`, `Typography`, and `Grid` components accept the system properties as _props_ for the above reason. These components are designed to solve CSS problems, they are CSS component utilities.

## Uso

### Tokens de design no tema

You can explore the [System properties](/system/properties/) page to discover how the different CSS (and custom) properties are mapped to the theme keys.

### Abreviações

There are lots of shorthands available for the CSS properties. These are documented in the next pages, for instance, [the spacing](/system/spacing/). Here is an example leveraging them:

```jsx
<Box
  sx={{
    boxShadow: 1, // theme.shadows[1]
    color: 'primary.main', // theme.palette.primary.main
    m: 1, // margin: theme.spacing(1)
    p: {
      xs: 1, // [theme.breakpoints.up('xs')]: { padding: theme.spacing(1) }
    },
    zIndex: 'tooltip', // theme.zIndex.tooltip
  }}
>
```

These shorthands are **optional**, they are great to save time when writing styles but it can be overwhelming to learn new custom APIs. You might want to skip this part and bet on CSS, it has been standardized for decades, head to the [next section](#superset-of-css).

### Super conjunto de CSS

As part of the prop, you can use any regular CSS too: child or pseudo-selectors, media queries, raw CSS values, etc. Here are a few examples:

- Usando pseudo seletores:

  ```jsx
  <Box
    sx={{
      // some styles
      ":hover": {
        boxShadow: 6,
      },
    }}
  >
  ```

- Usando consultas de mídia:

  ```jsx
  <Box
    sx={{
      // some styles
      '@media print': {
        width: 300,
      },
    }}
  >
  ```

- Usando seletor aninhado:

  ```jsx
  <Box
    sx={{
      // some styles
      '& . ChildSelector': {
        bgcolor: 'primary.main',
      },
    }}
  >
  ```

### Valores responsivos

If you would like to have responsive values for a CSS property, you can use the breakpoints shorthand syntax. There are two ways of defining the breakpoints:

#### 1. Pontos de quebra como um objeto

The first option for defining breakpoints is to define them as an object, using the breakpoints as keys. Note that each breakpoint property matches the breakpoint and every larger breakpoint. For example, `width: { lg: 100 }` is equivalent to `theme.breakpoints.up('lg')`. Here is the previous example again, using the object syntax.

{{"demo": "BreakpointsAsObject.js"}}

#### 2. Pontos de quebra como um array

The second option is to define your breakpoints as an array, from the smallest to the largest breakpoint.

{{"demo": "BreakpointsAsArray.js"}}

> ⚠️ Esta opção só é recomendada quando o tema tem um número limitado de pontos de quebra, p. ex. 3.<br /> Prefira a API de objeto se você tiver mais pontos de quebra. Por exemplo, o tema padrão do Material-UI tem 5.

You can skip breakpoints with the `null` value:

```jsx
<Box sx={{ width: [null, null, 300] }}>This box has a responsive width.</Box>
```

### Pontos de quebra customizados

You can also specify your own custom breakpoints, and use them as keys when defining the breakpoints object. Here is an example of how to do that.

```jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

export default function CustomBreakpoints() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: {
            mobile: 100,
            laptop: 300,
          },
        }}
      >
        This box has a responsive width
      </Box>
    </ThemeProvider>
  );
}
```

If you are using TypeScript, you will also need to use [module augmentation](/material-ui/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```ts
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true; // adds the `tablet` breakpoint
    laptop: true;
    desktop: true;
  }
}
```

### Recuperando o tema

If you wish to use the theme for a CSS property that is not supported natively by the system, you can use a function as the value, in which you can access the theme object.

{{"demo": "ValueAsFunction.js"}}

## Implementações

The `sx` prop can be used in four different locations:

### 1. Componentes do core

All core MUI components will support the `sx` prop.

### 2. Box

[`Box`](/material-ui/react-box/) is a lightweight component that gives access to the `sx` prop, and can be used as a utility component, and as a wrapper for other components. It renders a `<div>` element by default.

### 3. Componentes customizados

In addition to MUI components, you can add the `sx` prop to your custom components too, by using the `styled` utility from `@mui/material/styles`.

```jsx
import { styled } from '@mui/material/styles';

const Div = styled('div')``;
```

### 4. Qualquer elemento com o plugin babel

TODO [#23220](https://github.com/mui/material-ui/issues/23220).
