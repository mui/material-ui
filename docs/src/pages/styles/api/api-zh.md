- - -
title: Styles API
- - -

# API

<p class="description">The API reference of @mui/styles.</p>

## `createGenerateClassName([options]) => class name generator`

A function which returns [a class name generator function](https://cssinjs.org/jss-api/#generate-your-class-names).

### 参数

1. `options` (_object_ [optional]):

   - `options.disableGlobal` (_bool_ [optional]): Defaults to `false`. 阻止生成确定性的类名。
   - `options.seed` (*string* [optional])：初始值为 `''`. 用于唯一标识生成器的字符串。 字符串用来在生产中对类名称加上前缀。
   - `options.seed` (_string_ [optional])：初始值为 `''`. 用于唯一标识生成器的字符串。 用于唯一标识生成器的字符串。 在同一个文档中使用多个生成器时，它可用于避免类名冲突。

### 返回结果

`class name generator`: The generator should be provided to JSS.

### 例子

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

### 参数

1. `styles` (_object_): A styles object.

### 返回结果

`styles`: A styles object.

### 例子

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

### 参数

1. ` styles `(_ Function | Object _): 生成样式或样式对象的函数。 它将被链接到组件中。 若您需要访问主题，请使用函数签名（function signature）。 它是提供的第一个参数。
2. `options` (_object_ [optional]):

- `options.defaultTheme`（*object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
- `options.name` (*string* [optional]): 样式表的名称。 适合调试。
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. 如果设置为 `true`时，则会反转样式。 当设置为 `null`，它依据 `theme.direction` 而定。
- 其他的键将会作为 options 参数传递给 [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet)。

### 返回结果

`hook`: A hook. This hook can be used in a function component. The documentation often calls this returned hook `useStyles`. It accepts one argument: the props that will be used for "interpolation" in the style sheet.

### 例子

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

### `sheets.collect(node) => React element`

The method wraps your React node in a provider element. It collects the style sheets during the rendering so they can be later sent to the client.

### `sheets.toString() => CSS string`

The method returns the collected styles.

⚠️ You must call `.collect()` before using this method.

### `sheets.getStyleElement() => CSS React element`

The method is an alternative to `.toString()` when you are rendering the whole page with React.

⚠️ You must call `.collect()` before using this method.

## `styled(Component)(styles, [options]) => Component`

Link a style sheet with a function component using the **styled components** pattern.

### 参数

1. `Component` ：将被包装的组件。
2. ` styles `(_ Function | Object _): 生成样式或样式对象的函数。 它将被链接到组件中。 若您需要访问主题，请使用函数签名（function signature）。 它作为第一个参数的属性给出。
3. `options` (_object_ [optional]):

- `options.defaultTheme`（*object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
- `options.withTheme` (_bool_ [optional]): Defaults to `false`. 将 `theme` 对象作为属性提供给组件。
- `options.name` (*string* [optional]): 样式表的名称。 适合调试。 如果未提供该值，它将尝试回退到组件的名称。
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. 如果设置为 `true`时，则会反转样式。 当设置为 `null`，它依据 `theme.direction` 而定。
- 其他的键将会作为 options 参数传递给 [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet)。

### 返回结果

`Component` ：已创建的新组建。

### 例子

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

### 属性

| 名称                 | 类型     | 默认值   | 描述                                                                                                                                   |
|:------------------ |:------ |:----- |:------------------------------------------------------------------------------------------------------------------------------------ |
| children&nbsp;\* | node   |       | 您的组件树。                                                                                                                               |
| disableGeneration  | bool   | false | 使用此选项，你可以禁用样式表的生成。 当在服务端的 HTML 之外渲染步骤中遍历 React  树的时候，这个属性卓有成效。 举个例子，若你正在使用 react-apillo 来提取服务端接口发出的所有查询（queries）。 使用这个属性可以大大加快遍历的速度。 |
| generateClassName  | func   |       | JSS 的类名生成器。                                                                                                                          |
| injectFirst        | bool   | false | 默认情况下，在页面中注入的 style会被插入到 `<head>` 元素的最后。 因此，相比其他样式表单，它们能够表现地更为具体。 If you want to override MUI's styles, set this prop.         |
| jss                | object |       | JSS 的实例。                                                                                                                             |

### 例子

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

### 属性

| 名称                 | 类型                                       | 默认值 | 描述                                        |
|:------------------ |:---------------------------------------- |:--- |:----------------------------------------- |
| children&nbsp;\* | node                                     |     | 您的组件树。                                    |
| theme&nbsp;\*    | union:&nbsp;object&nbsp;&#124;&nbsp;func |     | 一个主题对象（theme object）。 您可以提供一个能够扩展外层主题的函数。 |

### 例子

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

### 返回结果

`theme`: The theme object previously injected in the context.

### 例子

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

- It adds a `classes` prop so you can override the injected class names from the outside.
- 它将 refs 转发给内部的组件。
- 它 **不会** 拷贝静态文件。 For instance, it can be used to define a `getInitialProps()` static method (next.js).

### 参数

1. ` styles `(_ Function | Object _): 生成样式或样式对象的函数。 它将被链接到组件中。 若您需要访问主题，请使用函数签名（function signature）。 它是提供的第一个参数。
2. `options` (_object_ [optional]):

- `options.defaultTheme`（*object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
- `options.withTheme` (_bool_ [optional]): Defaults to `false`. 将 `theme` 对象作为属性提供给组件。
- `options.name` (*string* [optional]): 样式表的名称。 适合调试。 如果未提供该值，它将尝试回退到组件的名称。
- `options.flip` (_bool_ [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. 如果设置为 `true`时，则会反转样式。 当设置为 `null`，它依据 `theme.direction` 而定。
- 其他的键将会作为 options 参数传递给 [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet)。

### 返回结果

`higher-order component`: Should be used to wrap a component.

### 例子

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

### 参数

1. `Component` ：将被包装的组件。

### 返回结果

`Component` ：已创建的新组建。 Does forward refs to the inner component.

### 例子

```jsx
import * as React from 'react';
import { withTheme } from '@mui/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme(MyComponent);
```
