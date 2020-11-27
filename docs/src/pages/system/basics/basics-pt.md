# Sistema Material-UI

<p class="description">Utilitários CSS para criar rapidamente um design customizado.</p>

Material-UI vem com dezenas de componentes **pronto para uso** em seu package core. Esses componentes são um ponto de partida incrível, mas quando se trata de fazer seu site se destacar com um design customizado, pode ser mais simples começar de um estado sem estilos. Apresentando o sistema:

O **sistema** permite que você crie rapidamente componentes de UI customizados utilizando os valores definidos no seu tema.

## Demonstração

_(Redimensione a janela para ver os pontos de quebra responsivos)_

{{"demo": "pages/system/basics/Demo.js", "bg": true, "defaultCodeOpen": true}}

## Instalação

```jsx
// utilizando o npm
npm install @material-ui/system

// utilizando o yarn
yarn add @material-ui/system
```

## Por que usar o sistema?

Compare como o mesmo componente de estatística pode ser construído com duas APIs diferentes.

{{"demo": "pages/system/basics/Why.js", "bg": true, "defaultCodeOpen": false}}

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
    <StatHeader>Sessões</StatHeader>
    <StatValue>98.3 K</StatValue>
    <StyledTrend />
    <StatDiff>18.77%</StatDiff>
    <StatPrevious>em relação ultima semana</StatPrevious>
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
  <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'fontWeightMedium' }}>
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
      fontWeight: 'fontWeightMedium',
      mx: 0.5,
    }}
  >
    18.77%
  </Box>
  <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}>
    em relação ultima semana
  </Box>
</Box>
```

### Problema resolvido

O sistema foca na resolução de 3 principais problemas:

**1. Mudar de contexto desperdiça tempo.**

Não há necessidade de saltar constantemente entre o uso dos componentes customizados e onde eles são definidos. Com o sistema, essas descrições estão corretas onde é necessário estar.

**2. Nomear as coisas é difícil.**

Você já se encontrou com dificuldades para encontrar um bom nome para um componente customizado? O sistema mapeia os estilos diretamente para o elemento. Tudo o que você precisa fazer é se preocupar com as propriedades de estilo atuais.

**3. Manter consistência nas UI é difícil.**

Isso é especialmente verdadeiro quando mais de uma pessoa está construindo a aplicação, já que tem que haver alguma coordenação entre os membros da equipe sobre a escolha dos tokens de design e como eles são usados, quais partes da estrutura do tema devem ser usadas com quais propriedades CSS e assim por diante.

O sistema oferece acesso direto ao valor no tema. Fica mais fácil de lidar com restrições.

## A propriedade `sx`

A propriedade `sx`, como a parte principal do sistema, resolve esses problemas, fornecendo uma maneira rápida & simples de aplicar os tokens de design corretos para propriedades CSS específicas diretamente a um elemento React. A [demonstração acima](#demo) mostra como ela pode ser usada para criar um design único.

Esta propriedade fornece um super conjunto de CSS que mapeia valores diretamente do tema, dependendo da propriedade CSS usada. Além disso, permite uma maneira simples de definir valores responsivos que correspondem aos pontos de quebra definidos no tema.

### Quando usar ela?

- **styled-components**: the API is great to build components that need to support a wide variety of contexts. These components are used in many different parts of the application and support different combinations of props.
- **`sx` prop**: the API is great to apply one-off styles. It's called "utility" for this reason.

### Performance tradeoff

The system relies on CSS-in-JS. It works with both emotion and styled-components.

Pros:

- 📚 It allows a lot of flexibility in the API. The `sx` prop supports a superset of CSS. There is **no need to learn CSS twice**. You are set once you have learn the standardized CSS syntax, it's safe, it hasn't changed for a decade. Then, you can **optionally** learn the shorthands if you value the save of time they bring.
- 📦 Auto-purge. Only the used CSS on the page is sent to the client. The initial bundle size cost is **fixed**. It's not growing with the number of used CSS properties. You pay the cost of [@emotion/react](https://bundlephobia.com/result?p=@emotion/react) and [@material-ui/system](https://bundlephobia.com/result?p=@material-ui/system). It cost around ~15 kB gzipped. If you are already using the core components, it comes with no extra overhead.

Cons:

- The runtime performance takes a hit.

  | Benchmark case                    | Code snippet                | Time normalized |
  |:--------------------------------- |:--------------------------- | --------------- |
  | a. Render 1,000 primitives        | `<div className="…">` | 100ms           |
  | b. Render 1,000 components        | `<Div>`               | 120ms           |
  | c. Render 1,000 styled components | `<StyledDiv>`         | 160ms           |
  | d. Render 1,000 Box               | `<Box sx={…}>`        | 370ms           |

  _Head to the [benchmark folder](https://github.com/mui-org/material-ui/tree/next/benchmark/browser) for a reproduction of these metrics._

  We believe that for most uses it's **fast enough**, but there are simple workarounds when performance becomes critical. For instance, when rendering a list with many items, you can use a CSS child selector to have a single "style injection" point (using d. for the wrapper and a. for each item).

## Uso

### Design tokens in the theme

You can explore the [System properties](/system/properties/) page to discover how the different CSS (and custom) properties are mapped to the theme keys.

### Shorthands

There are lots of shorthands available for the CSS properties. These are documented in the next pages, for instance, [the spacing](/system/spacing/). Here is an example leveraging them:

```jsx
<Box
  sx={{
    boxShadow: 1, // theme.shadows[1]
    color: 'primary.main', // theme.palette.primary.main
    m: 1, // margin: theme.spacing(1)
    p: {
      sx: 1, // [theme.breakpoints.up('sx')]: : { padding: theme.spacing(1) }
    },
    zIndex: 'tooltip', // theme.zIndex.tooltip
  }}
>
```

These shorthands are **optional**, they are great to save time when writing styles but it can be overwhelming to learn new custom APIs. You might want to skip this part and bet on CSS, it has been standardized for decades, head to the [next section](#superset-of-css).

### Superset of CSS

As part of the prop, you can use any regular CSS too: child or pseudo-selectors, media queries, raw CSS values, etc. Here are a few examples:

- Using pseudo selectors:

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

- Using media queries:

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

- Using nested selector:

  ```jsx
  <Box
    sx={{
      // some styles
      '& .ChildSelector': {
        bgcolor: 'primary.main',
      },
    }}
  >
  ```

### Responsive values

If you would like to have responsive values for a CSS property, you can use the breakpoints shorthand syntax. There are two ways of defining the breakpoints:

#### 1. Breakpoints as an object

The first option for defining breakpoints is to define them as an object, using the breakpoints as keys. Here is the previous example again, using the object syntax.

{{"demo": "pages/system/basics/BreakpointsAsObject.js"}}

#### 2. Breakpoints as an array

The second option is to define your breakpoints as an array, from the smallest to the largest breakpoint.

{{"demo": "pages/system/basics/BreakpointsAsArray.js"}}

> ⚠️ This option is only recommended when the theme has a limited number of breakpoints, e.g. 3.<br /> Prefer the object API if you have more breakpoints. For instance, the default theme of Material-UI has 5.

You can skip breakpoints with the `null` value:

```jsx
<Box sx={{ width: [null, null, 300] }}>This box has a responsive width.</Box>
```

### Pontos de quebra customizados

You can also specify your own custom breakpoints, and use them as keys when defining the breakpoints object. Here is an example of how to do that.

```jsx
import * as React from 'react';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
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
            tablet: 100,
            laptop: 300,
            desktop: 500,
          },
        }}
      >
        Este box tem uma largura responsiva
      </Box>
    </ThemeProvider>
  );
}
```

If you are using TypeScript, you will also need to use [module augmentation](/guides/typescript/#customization-of-theme) for the theme to accept the above values.

```ts
declare module "@material-ui/core/styles/createBreakpoints" {
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

### Theme getter

If you wish to use the theme for a CSS property that is not supported natively by the system, you can use a function as the value, in which you can access the theme object.

{{"demo": "pages/system/basics/ValueAsFunction.js"}}

## Implementações

The `sx` prop can be used in four different locations:

### 1. Core components

All core Material-UI components will support the `sx` prop.

### 2. Box

[`Box`](/components/box/) is a lightweight component that gives access to the `sx` prop, and can be used as a utility component, and as a wrapper for other components. It renders a `<div>` element by default.

### 3. Custom components

In addition to Material-UI components, you can add the `sx` prop to your custom components too, by using the `experimentalStyled` utility from `@material-ui/core/styles`.

```jsx
import { experimentalStyled as styled } from '@material-ui/core/styles';

const Div = styled('div')``;
```

### 4. Any element with the babel plugin

TODO [#23220](https://github.com/mui-org/material-ui/issues/23220).
