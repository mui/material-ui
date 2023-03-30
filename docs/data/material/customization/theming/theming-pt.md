# Temas

<p class="description">Customize Material-UI com seu tema. Você pode mudar as cores, a tipografia e muito mais.</p>

O tema especifica a cor dos componentes, o escurecimento das superfícies, o nível de sombra, a opacidade apropriada dos elementos de tinta, etc.

Temas permitem que você aplique um tom consistente na sua aplicação. Ele permite que você **customize todos os aspectos do design** do seu projeto, para atender as necessidades específicas do seu negócio ou marca.

Para promover uma maior consistência entre os aplicativos, os temas claro e escuro estão disponíveis para escolha. Por padrão, os componentes usam o tema claro.

## Provedor de Temas

Se você deseja personalizar o tema, você precisa usar o `ThemeProvider` componente para injetar um tema em sua aplicação. No entanto, isso é opcional; Material-UI componentes vêm com um tema padrão.

O `ThemeProvider` depende do [ recurso de contexto do React](https://pt-br.reactjs.org/docs/context.html) afim de passar o tema para baixo na árvore de componentes, então você precisa ter certeza de que o `ThemeProvider` é um pai dos componentes que você está tentando customizar. Você pode aprender mais sobre isso lendo a [seção da API](#themeprovider).

## Variáveis de configuração do tema

Alterar as variáveis de configuração do tema é a maneira mais eficaz de combinar o Material-UI às suas necessidades. As seções a seguir abordam as variáveis mais importantes do tema:

- [`.paleta`](/material-ui/customization/palette/)
- [`.tipografia`](/material-ui/customization/typography/)
- [`.espaçamento`](/material-ui/customization/spacing/)
- [`.pontos de quebra`](/material-ui/customization/breakpoints/)
- [`.zIndex`](/material-ui/customization/z-index/)
- [`.transições`](/material-ui/customization/transitions/)
- [`.componentes`](/material-ui/customization/theme-components/)

Você pode conferir a [seção do tema padrão](/material-ui/customization/default-theme/) para ver tudo sobre o tema padrão.

### Variáveis customizáveis

When using MUI's theme with [MUI System](/system/getting-started/overview/) or [any other styling solution](/material-ui/guides/interoperability/), it can be convenient to add additional variables to the theme so you can use them everywhere. Por exemplo:

```jsx
const theme = createTheme({
  status: {
    danger: orange[500],
  },
});
```

**WARNING**: `vars` is a private field used for CSS variables support. It will throw an error if you try to use it:

```jsx
createTheme({
  vars: { ... },
})
```

If you are using TypeScript, you would also need to use [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) for the theme to accept the above values.

```tsx
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
```

{{"demo": "CustomStyles.js"}}

## Acessando o tema em um componente

<video autoPlay muted loop width="320">
  <source src="/static/studies.mp4" type="video/mp4" >
</video>

The community has built great tools to build a theme:

- [mui-theme-creator](https://bareynol.github.io/mui-theme-creator/): A tool to help design and customize themes for the MUI component library. Inclui modelos de site básicos para mostrar vários componentes e como eles são afetados pelo tema
- [create-mui-theme](https://react-theming.github.io/create-mui-theme/): É uma ferramenta online para criar temas de Material-UI por meio da ferramenta de cor do Material Design.

## Acessando o tema em um componente

You can access the theme variables inside your functional React components using the `useTheme` hook:

```jsx
import { useTheme } from '@mui/material/styles';

function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
```

## Aninhando o tema

[You can nest](/system/styles/advanced/#theme-nesting) multiple theme providers.

{{"demo": "ThemeNesting.js"}}

The inner theme will **override** the outer theme. You can extend the outer theme by providing a function:

{{"demo": "ThemeNestingExtend.js"}}

## API

### `createTheme(options, ...args) => theme`

Generate a theme base on the options received. Then, pass it as a prop to [`ThemeProvider`](#themeprovider).

#### Argumentos

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

:::warning
Note: Only the first argument (`options`) is being processed by the `createTheme` function. If you want to actually merge two themes' options and create a new one based on them, you may want to deep merge the two options and provide them as a first argument to the `createTheme` function.
:::

```js
import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material/styles';

const theme = createTheme(deepmerge(options1, options2));
```

#### Retornos

`theme` (_object_): A complete, ready-to-use theme object.

#### Examples

```js
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
```

#### Argumentos

When the value for a theme option is dependent on another theme option, you should compose the theme in steps.

```js
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});
```

Think of creating a theme as a two-step composition process: first, you define the basic design options; then, you'll use these design options to compose other options.

**WARNING**: `theme.vars` is a private field used for CSS variables support. Please use another name for a custom object.

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### Retornos

1. `theme` (_object_): The theme object to enhance.
2. `options` (_object_ [optional]):

- `breakpoints` (_array\<string\>_ [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/material-ui/customization/breakpoints/) (identifiers).
- `disableAlign` (_bool_ [optional]): Default to `false`. Se os tamanhos de fonte mudam pouco, as alturas da linha são preservadas e alinhadas à altura da linha da grade em 4px do Material Design. Isso requer uma altura de linha sem unidade nos estilos do tema.
- `factor` (_number_ [optional]): Default to `2`. Este valor determina o fator de redimensionamento do tamanho da fonte. Quanto maior o valor, menor a diferença entre tamanhos de fonte em telas pequenas. Quanto menor o valor, maiores os tamanhos de fonte para telas pequenas. O valor deve ser maior que 1.
- `variants` (_array\<string\>_ [optional]): Default to all. As variantes de tipografia para manipular.

#### Exemplos

`theme` (_object_): The new theme with a responsive typography.

#### Examples

```js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);
```

### `unstable_createMuiStrictModeTheme(options, ...args) => theme`

**WARNING**: Do not use this method in production.

Generates a theme that reduces the amount of warnings inside [`React.StrictMode`](https://react.dev/reference/react/StrictMode) like `Warning: findDOMNode is deprecated in StrictMode`.

#### Argumentos

Currently `unstable_createMuiStrictModeTheme` adds no additional requirements.

#### Retornos

1. `options` (_object_): Takes an incomplete theme object and adds the missing parts.
2. `...args` (_object[]_): Deep merge the arguments with the about to be returned theme.

#### Exemplos

`theme` (_object_): A complete, ready-to-use theme object.

#### Examples

```js
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </React.StrictMode>
  );
}
```

### `ThemeProvider`

This component takes a `theme` prop and applies it to the entire React tree that it is wrapping around. It should preferably be used at **the root of your component tree**.

#### Props

| Name               | Type                                     | Description                                                                                                                                                                                               |
|:------------------ |:---------------------------------------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children&nbsp;\* | node                                     | Your component tree.                                                                                                                                                                                      |
| theme&nbsp;\*    | union:&nbsp;object&nbsp;&#124;&nbsp;func | A theme object, usually the result of [`createTheme()`](#createtheme-options-args-theme). The provided theme will be merged with the default theme. You can provide a function to extend the outer theme. |

#### Examples

```jsx
import * as React from 'react';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function App() {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}
```
