- - -
title: Styles API
- - -

# API

<p class="description">The API reference of @mui/styles.</p>

## `createGenerateClassName([options]) => class name generator`

A function which returns [a class name generator function](https://cssinjs.org/jss-api/#generate-your-class-names).

### Argumentos

1. `options` (_object_ [opcional]):

   - `options.disableGlobal` (_bool_ [optional]): Defaults to `false`. Desabilita a geração de nomes de classes determinísticas.
   - `options.productionPrefix` (*string* [opcional]): Padrão `'jss'`. A string usada para prefixar os nomes de classes em produção.
   - `options.seed` (*string* [opcional]): Padrão `''`. A string usada unicamente para identificar o gerador. Ela pode ser usada para evitar colisões de nomes de classes ao usar vários geradores no mesmo documento.

### Retornos

`class name generator`: The generator should be provided to JSS.

### Exemplos

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

This function doesn't really "do anything" at runtime, it's just the identity function. Its only purpose is to defeat **TypeScript**'s type widening when providing style rules to `makeStyles`/`withStyles` which are a function of the `Theme`.

### Argumentos

1. `styles` (_object_): A styles object.

### Retornos

`styles`: A styles object.

### Exemplos

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

Link a style sheet with a function component using the **hook** pattern.

### Argumentos

1. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos. Ela será vinculada ao componente. Use a assinatura da função se você precisar ter acesso ao tema. É fornecido como o primeiro argumento.
2. `options` (_object_ [opcional]):

- `options.defaultTheme` (*object* [opcional]): O tema padrão a ser usado se um tema não for fornecido por meio de um provedor de temas.
- `options.name` (*string* [opcional]): O nome da folha de estilo. Útil para depuração.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. Quando definido para `true`, os estilos são invertidos. Quando definido para `null`, segue `theme.direction`.
- As outras chaves são encaminhadas para o argumento de opções do [jss.createStyleSheet ([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

### Retornos

`hook`: A hook. This hook can be used in a function component. The documentation often calls this returned hook `useStyles`. It accepts one argument: the props that will be used for "interpolation" in the style sheet.

### Exemplos

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

This is a class helper to handle server-side rendering. [You can follow this guide for a practical approach](/guides/server-rendering/).

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

The instantiation accepts an options object as a first argument.

1. `options` (_object_ [optional]): The options are spread as props to the [`StylesProvider`](#stylesprovider) component.

### `sheets.collect(node) => Elemento React`

The method wraps your React node in a provider element. It collects the style sheets during the rendering so they can be later sent to the client.

### `sheets.toString() => CSS string`

The method returns the collected styles.

⚠️ You must call `.collect()` before using this method.

### `sheets.getStyleElement() => CSS do elemento React`

The method is an alternative to `.toString()` when you are rendering the whole page with React.

⚠️ You must call `.collect()` before using this method.

## `styled(Component)(styles, [options]) => Component`

Link a style sheet with a function component using the **styled components** pattern.

### Argumentos

1. `Component`: O componente que será manipulado.
2. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos. Ela será vinculada ao componente. Use a assinatura da função se você precisar ter acesso ao tema. É fornecido como propriedade do primeiro argumento.
3. `options` (_object_ [opcional]):

- `options.defaultTheme` (*object* [opcional]): O tema padrão a ser usado se um tema não for fornecido por meio de um provedor de temas.
- `options.withTheme` (_bool_ [optional]): Defaults to `false`. Fornecer o objeto `theme` para o componente como uma propriedade.
- `options.name` (*string* [opcional]): O nome da folha de estilo. Útil para depuração. Se o valor não for fornecido, ele tentará usar o nome do componente.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. Quando definido para `true`, os estilos são invertidos. Quando definido para `null`, segue `theme.direction`.
- As outras chaves são encaminhadas para o argumento de opções do [jss.createStyleSheet ([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

### Retornos

`Component`: O novo componente criado.

### Exemplos

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

This component allows you to change the behavior of the styling solution. It makes the options available down the React tree thanks to the context.

It should preferably be used at **the root of your component tree**.

### Propriedades

| Nome              | Tipo   | Padrão | Descrição                                                                                                                                                                                                                                                                                                                                               |
|:----------------- |:------ |:------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children&nbsp;*   | node   |        | Sua árvore de componentes.                                                                                                                                                                                                                                                                                                                              |
| disableGeneration | bool   | false  | Você pode desabilitar a geração dos estilos com esta opção. Pode ser útil ao percorrer a árvore React fora da etapa de renderização de HTML no servidor. Digamos que você esteja usando react-apollo para extrair todas as consultas feitas pela interface do lado do servidor. Você pode acelerar significativamente a varredura com essa propriedade. |
| generateClassName | func   |        | Gerador de nome de classes do JSS.                                                                                                                                                                                                                                                                                                                      |
| injectFirst       | bool   | false  | Por padrão, os estilos são injetados por último no elemento `<head>` da página. Como resultado, eles ganham mais especificidade do que qualquer outra folha de estilo. If you want to override MUI's styles, set this prop.                                                                                                                       |
| jss               | object |        | Instância do JSS.                                                                                                                                                                                                                                                                                                                                       |

### Exemplos

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

### Propriedades

| Nome            | Tipo                                     | Padrão | Descrição                                                                     |
|:--------------- |:---------------------------------------- |:------ |:----------------------------------------------------------------------------- |
| children&nbsp;* | node                                     |        | Sua árvore de componentes.                                                    |
| theme&nbsp;*    | union:&nbsp;object&nbsp;&#124;&nbsp;func |        | Um objeto de tema. Você pode utilizar uma função para receber o tema externo. |

### Exemplos

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

This hook returns the `theme` object so it can be used inside a function component.

### Retornos

`theme`: The theme object previously injected in the context.

### Exemplos

```jsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';

export default function MyComponent() {
  const theme = useTheme();

  return <div>{`spacing ${theme.spacing}`}</div>;
}
```

## `withStyles(styles, [options]) => higher-order component`

Link a style sheet with a component using the **higher-order component** pattern. It does not modify the component passed to it; instead, it returns a new component with a `classes` prop. This `classes` object contains the name of the class names injected in the DOM.

Some implementation details that might be interesting to being aware of:

- Adiciona uma propriedade `classes`, assim você pode substituir, a partir do exterior, os nomes de classe previamente injectados.
- Ela encaminha refs para o componente interno.
- Ele **não** faz copia sobre estáticos. For instance, it can be used to define a `getInitialProps()` static method (next.js).

### Argumentos

1. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos. Ela será vinculada ao componente. Use a assinatura da função se você precisar ter acesso ao tema. É fornecido como o primeiro argumento.
2. `options` (_object_ [opcional]):

- `options.defaultTheme` (*object* [opcional]): O tema padrão a ser usado se um tema não for fornecido por meio de um provedor de temas.
- `options.withTheme` (_bool_ [optional]): Defaults to `false`. Fornecer o objeto `theme` para o componente como uma propriedade.
- `options.name` (*string* [opcional]): O nome da folha de estilo. Útil para depuração. Se o valor não for fornecido, ele tentará usar o nome do componente.
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. Quando definido para `true`, os estilos são invertidos. Quando definido para `null`, segue `theme.direction`.
- As outras chaves são encaminhadas para o argumento de opções do [jss.createStyleSheet ([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

### Retornos

`higher-order component`: Should be used to wrap a component.

### Exemplos

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

Also, you can use as [decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) like so:

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

### Argumentos

1. `Component`: O componente que será manipulado.

### Retornos

`Component`: O novo componente criado. Does forward refs to the inner component.

### Exemplos

```jsx
import * as React from 'react';
import { withTheme } from '@mui/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme(MyComponent);
```
