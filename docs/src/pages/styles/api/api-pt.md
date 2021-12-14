- - -
title: Styles API
- - -

# API

<p class="description">The API reference of @mui/styles.</p>

## `createGenerateClassName([options]) => class name generator`

Uma função que retorna [uma função geradora de nome de classe](https://cssinjs.org/jss-api/#generate-your-class-names).

### Arguments

1. `options` (_object_ [optional]):

   - `options.disableGlobal` (_bool_ [opcional]): Padrão `false`. Desabilita a geração de nomes de classes determinísticas.
   - `options.productionPrefix` (*string* [opcional]): Padrão `'jss'`. A string usada para prefixar os nomes de classes em produção.
   - `options.seed` (*string* [opcional]): Padrão `''`. A string usada unicamente para identificar o gerador. Ela pode ser usada para evitar colisões de nomes de classes ao usar vários geradores no mesmo documento.

### Returns

`class name generator`: O gerador que deve ser fornecido ao JSS.

### Examples

```jsx
import * as React from 'react';
import { StylesProvider, createGenerateClassName } from '@mui/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

export default function App() {
  return <StylesProvider generateClassName={generateClassName}>...</StylesProvider>;
}
```

## `createStyles(styles) => styles`

Esta função realmente não "faz nada" em tempo de execução, é apenas uma função de identidade. Sua única finalidade é lidar com a ampliação de tipos do **TypeScript**, ao fornecer regras de estilo para `makeStyles`/`withStyles` que são uma função do `tema`.

### Arguments

1. `styles` (_object_): A styles object.

### Returns

`styles`: Um objeto de estilos.

### Examples

```jsx
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.red,
    },
  }),
);

const theme = createTheme();

export default function MyComponent() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root} />
    </ThemeProvider>
  );
}
```

## `makeStyles(styles, [options]) => hook`

Vincula uma folha de estilo a um componente de função usando o padrão **hook**.

### Arguments

1. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos. Ela será vinculada ao componente. Use a assinatura da função se você precisar ter acesso ao tema. É fornecido como o primeiro argumento.
2. `options` (_object_ [optional]):

- `options.defaultTheme` (*object* [opcional]): O tema padrão a ser usado se um tema não for fornecido por meio de um provedor de temas.
- `options.name` (*string* [opcional]): O nome da folha de estilo. Útil para depuração.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. Quando definido para `true`, os estilos são invertidos. Quando definido para `null`, segue `theme.direction`.
- As outras chaves são encaminhadas para o argumento de opções do [jss.createStyleSheet ([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

### Returns

`hook`: Um hook. Este hook pode ser usado em uma função que retorna o componente. A documentação geralmente chama esse hook retornado de `useStyles`. It accepts one argument: the props that will be used for "interpolation" in the style sheet.

### Examples

```jsx
import * as React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: (props) => props.color,
  },
});

export default function MyComponent(props) {
  const classes = useStyles(props);
  return <div className={classes.root} />;
}
```

## `ServerStyleSheets`

Esta é uma classe auxiliar para manipular a renderização do lado do servidor. [Você pode seguir este guia para uma abordagem prática](/guides/server-rendering/).

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@mui/styles';

const sheets = new ServerStyleSheets();
const html = ReactDOMServer.renderToString(sheets.collect(<App />));
const cssString = sheets.toString();

const response = `
<!DOCTYPE html>
<html>
  <head>
    <style id="jss-server-side">${cssString}</style>
  </head>
  <body>${html}</body>
</html>
`;
```

### `new ServerStyleSheets([options])`

A instanciação aceita um objeto de opções como primeiro argumento.

1. `options` (_object_ [optional]): The options are spread as props to the [`StylesProvider`](#stylesprovider) component.

### `sheets.collect(node) => Elemento React`

O método envolve seu nó React em um elemento provider. Ele coleta as folhas de estilo durante a renderização para que elas possam ser enviadas posteriormente ao cliente.

### `sheets.toString() => CSS string`

O método retorna os estilos coletados.

⚠️ Você deve chamar `.collect()` antes de usar este método.

### `sheets.getStyleElement() => CSS do elemento React`

O método é uma alternativa para `.toString()` quando você esta renderizando a página inteira com React.

⚠️ You must call `.collect()` before using this method.

## `styled(Component)(styles, [options]) => Component`

Vincula uma folha de estilos, com uma função de componente, usando o padrão de **componentes estilizados (styled components)**.

### Arguments

1. `Component`: O componente que será manipulado.
2. `styles` (_Function | Object_): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. É fornecido como propriedade do primeiro argumento.
3. `options` (_object_ [optional]):

- `options.defaultTheme` (_object_ [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
- `options.withTheme` (_bool_ [opcional]): Padrão `false`. Fornecer o objeto `theme` para o componente como uma propriedade.
- `options.name` (_string_ [optional]): The name of the style sheet. Useful for debugging. Se o valor não for fornecido, ele tentará usar o nome do componente.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
- The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

### Returns

`Component`: The new component created.

### Examples

```jsx
import * as React from 'react';
import { styled, ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

const MyComponent = styled('div')({
  backgroundColor: 'red',
});

const MyThemeComponent = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
}));

const theme = createTheme();

export default function StyledComponents() {
  return (
    <ThemeProvider theme={theme}>
      <MyThemeComponent>
        <MyComponent />
      </MyThemeComponent>
    <ThemeProvider>
  );
}
```

## `StylesProvider`

Este componente permite que você altere o comportamento da solução de estilo. Ele torna as opções disponíveis na árvore React graças ao contexto.

It should preferably be used at **the root of your component tree**.

### Props

| Name              | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                             |
|:----------------- |:------ |:------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children&nbsp;*   | node   |         | Sua árvore de componentes.                                                                                                                                                                                                                                                                                                                              |
| disableGeneration | bool   | false   | Você pode desabilitar a geração dos estilos com esta opção. Pode ser útil ao percorrer a árvore React fora da etapa de renderização de HTML no servidor. Digamos que você esteja usando react-apollo para extrair todas as consultas feitas pela interface do lado do servidor. Você pode acelerar significativamente a varredura com essa propriedade. |
| generateClassName | func   |         | Gerador de nome de classes do JSS.                                                                                                                                                                                                                                                                                                                      |
| injectFirst       | bool   | false   | Por padrão, os estilos são injetados por último no elemento `<head>` da página. Como resultado, eles ganham mais especificidade do que qualquer outra folha de estilo. If you want to override MUI's styles, set this prop.                                                                                                                       |
| jss               | object |         | Instância do JSS.                                                                                                                                                                                                                                                                                                                                       |

### Examples

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@mui/styles';

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `ThemeProvider`

This component takes a `theme` prop, and makes it available down the React tree thanks to the context. It should preferably be used at **the root of your component tree**.

### Props

| Name               | Type                                     | Default | Description                                                                   |
|:------------------ |:---------------------------------------- |:------- |:----------------------------------------------------------------------------- |
| children&nbsp;\* | node                                     |         | Your component tree.                                                          |
| theme&nbsp;*       | union:&nbsp;object&nbsp;&#124;&nbsp;func |         | Um objeto de tema. Você pode utilizar uma função para receber o tema externo. |

### Examples

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';

const theme = {};

function App() {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `useTheme() => theme`

Este hook retorna o objeto `theme`, para que possa ser usado dentro de um componente retornado por função.

### Returns

`theme`: O objeto de tema previamente injetado no contexto.

### Examples

```jsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';

export default function MyComponent() {
  const theme = useTheme();

  return <div>{`spacing ${theme.spacing}`}</div>;
}
```

## `withStyles(styles, [options]) => higher-order component`

Link a style sheet with a component using the **higher-order component** pattern. It does not modify the component passed to it; instead, it returns a new component with a `classes` prop. Este objeto `classes` contém o nome das classes inseridas no DOM.

Alguns detalhes de implementação que podem ser interessantes para estar ciente:

- Adiciona uma propriedade `classes`, assim você pode substituir, a partir do exterior, os nomes de classe previamente injectados.
- Ela encaminha refs para o componente interno.
- Ele **não** faz copia sobre estáticos. For instance, it can be used to define a `getInitialProps()` static method (next.js).

### Arguments

1. `styles` (_Function | Object_): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as the first argument.
2. `options` (_object_ [optional]):

- `options.defaultTheme` (_object_ [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
- `options.withTheme` (_bool_ [opcional]): Padrão `false`. Provide the `theme` object to the component as a prop.
- `options.name` (_string_ [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
- The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

### Returns

`higher-order component`: Deve ser usado para encapsular o componente.

### Examples

```jsx
import * as React from 'react';
import { withStyles } from '@mui/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

function MyComponent(props) {
  return <div className={props.classes.root} />;
}

export default withStyles(styles)(MyComponent);
```

Além disso, você pode usar como [decoradores](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) dessa forma:

```jsx
import * as React from 'react';
import { withStyles } from '@mui/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

@withStyles(styles)
class MyComponent extends React.Component {
  render() {
    return <div className={this.props.classes.root} />;
  }
}

export default MyComponent;
```

## `withTheme(Component) => Component`

Provide the `theme` object as a prop of the input component so it can be used in the render method.

### Arguments

1. `Component`: The component that will be wrapped.

### Returns

`Component`: The new component created. Encaminha refs para o componente interno.

### Examples

```jsx
import * as React from 'react';
import { withTheme } from '@mui/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme(MyComponent);
```
