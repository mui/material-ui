# API

<p class="description">@material-ui/core/styles 的 API 参考文档。</p>

## `createGenerateClassName([options]) => class name generator`

一个返回 [ 类名称生成器函数 ](https://cssinjs.org/jss-api/#generate-your-class-names) 的函数。

### 参数

1. `options` (*Object* [optional]): 
  - `options.disableGlobal` (*Boolean* [optional]): 默认值为 `false`。 阻止生成确定性的类名。
  - `options.productionPrefix` (*String* [optional])：初始值为 `'jss'`。 字符串用来在生产中对类名称加上前缀。
  - `options.seed` (*String* [optional])：初始值为 `''`. 用于唯一标识生成器的字符串。 在同一个文档中使用多个生成器时，它可用于避免类名冲突。

### 返回结果

`类名生成器`：应该将生成器提供给 JSS。

### 例子

```jsx
import React from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>...</StylesProvider>
  );
}
```

## `createStyles(styles) => styles`

在运行的时候，这个函数并没有真正“做任何事”，它一个只是认证函数。 它的唯一目的是，当向 `Theme` 的 `makeStyles`/`withStyles` 功能提供样式的规则时， 可以阻止 **TypeScript** 的类型扩展。

### 参数

1. `styles` (*Object*): 一个样式对象。

### 返回结果

`styles`: 一个样式对象。

### 例子

```jsx
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.color.red,
  },
}));

export default function MyComponent {
  const classes = useStyles();
  return <div className={classes.root} />;
}
```

## `makeStyles(styles, [options]) => hook`

使用 **hook** 的模式与一个具有函数组件的样式表相连。

### 参数

1. `styles`(* Function | Object *)：一个生成样式或一个样式对象的函数。 它将被链接到组件中。 若您需要访问主题，请使用函数签名（function signature）。 它是提供的第一个参数。
2. `options` (*Object* [optional]): 
  - `options.defaultTheme`（*Object* [optional]）：如果 Theme Provider 为给与任何主题，则会应用默认主题。
  - ` options.name ` (*String* [optional]): 样式表的名称。 适合调试。
  - `options.flip` (*Boolean* [optional])：当设置为 `false` 时，此表单将选择退出 `rtl` 转换。 如果设置为 `true`时，则会反转样式。 当设置为 `null`，它依据 `theme.direction` 而定。
  - 其他的键将会作为 options 参数传递给 [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet)。

### 返回结果

`hook` ： 一个 hook。 该 hook 可以在一个功能组件中使用。 文档通常会调用这个回调 hook `useStyles`。 它接受了一个参数：会被用于样式表中的“插值”的属性。

### 例子

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: props => props.color,
  },
});

export default function MyComponent(props) {
  const classes = useStyles(props);
  return <div className={classes.root} />;
}
```

## `ServerStyleSheets`

这是一个处理服务器端渲染的类助手（class helper）。 [您可以遵循本指南以了解实际的操作](/guides/server-rendering/)。

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/core/styles';

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

实例化接受的第一个参数是一个 options 对象。

1. `options` (*Object* [optional])：options 作为属性分布到 [`StylesProvider`](#stylesprovider) 组件中。

### `sheets.collect(node) => React element`

此方法将你的 React 节点包装在一个 provider 元素中。 它在渲染过程中收集样式表，以便它们以后可以发送到客户端。

### `sheets.toString() => CSS string`

该方法返回收集的样式。

⚠️ 在使用这个方法前，您必须调用 `.collect()`。

### `sheets.getStyleElement() => CSS React element`

若用 React 渲染整个页面时，此方法能够替代`.toString()`。

⚠️ 在使用这个方法前，您必须调用 `.collect()`。

## `styled(Component)(styles, [options]) => Component`

使用 **styled components** 的模式与一个具有函数组件的样式表相连。

### 参数

1. `Component` ：将被包装的组件。
2. `styles`(* Function | Object *)：生成样式或样式对象的函数。 它将被链接到组件中。 若您需要访问主题，请使用函数签名（function signature）。 它作为第一个参数的属性给出。
3. `options` (*Object* [optional]): 
  - `options.defaultTheme`（*Object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
  - `options.withTheme` (*Boolean* [optional])：默认值为 `false`。 将 `theme` 对象作为属性提供给组件。
  - `options.name` (*String* [optional])：样式表的名称。 适合调试。 如果未提供该值，它将尝试回退到组件的名称。
  - `options.flip` (*Boolean* [optional])：当设置为 `false` 时，此表单将选择退出 `rtl` 转换。 如果设置为 `true`时，则会反转样式。 当设置为 `null`，它跟着 `theme.direction` 而定。
  - 其他的键则被转发到 [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet) 的 options 参数当中。

### 返回结果

`Component` ：已创建的新组建。

### 例子

```jsx
import React from 'react';
import { styled } from '@material-ui/core/styles';

const MyComponent = styled('div')({
  backgroundColor: 'red',
});

const MyThemeComponent = styled('div')(({
  theme
}) => ({
  padding: theme.spacing(1),
}));

export default function StyledComponents() {
  return (
    <MyThemeComponent>
      <MyComponent />
    </MyThemeComponent>
  );
}
```

## `StylesProvider`

此组件允许您调整样式方案的行为。 多亏了 context，选项可以在 React 树下层使用。

最好在**您的组件树的根目录**中使用它。

### 属性

| 名称                | 类型     | 默认值   | 描述                                                                                                                                  |
|:----------------- |:------ |:----- |:----------------------------------------------------------------------------------------------------------------------------------- |
| children&nbsp;*   | node   |       | 您的组件树。                                                                                                                              |
| disableGeneration | bool   | false | 使用此选项，你可以禁用样式表的生成。 当在服务端的 HTML 之外渲染步骤中遍历 React 树的时候，这个属性卓有成效。 举个例子，若你正在使用 react-apillo 来提取服务端接口发出的所有查询（queries）。 用这个属性，遍历的速度回明显地加快。 |
| generateClassName | func   |       | JSS 的类名生成器。                                                                                                                         |
| injectFirst       | bool   | false | 默认情况下，在页面中注入的 style会被插入到 `<head>` 元素的最后。 因此，相比其他样式表单，它们能够表现地更为具体。 如果您想要覆盖 Material-UI 的样式，请设置此属性。                             |
| jss               | object |       | JSS 的实例。                                                                                                                            |


### 例子

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/core/styles';

function App() {
  return (
    <StylesProvider jss={jss}>...</StylesProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `ThemeProvider`

该组件接受一个 `theme`属性，多亏了 context，此属性可以在 React 树下层使用。 最好在**您的组件树的根目录**中使用它。

### 属性

| 名称              | 类型                                       | 默认值 | 描述                                        |
|:--------------- |:---------------------------------------- |:--- |:----------------------------------------- |
| children&nbsp;* | node                                     |     | 您的组件树。                                    |
| theme&nbsp;*    | union:&nbsp;object&nbsp;&#124;&nbsp;func |     | 一个主题对象（theme object）。 您可以提供一个能够扩展外层主题的函数。 |


### 例子

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = {};

function App() {
  return (
    <ThemeProvider theme={theme}>...</ThemeProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `useTheme() => theme`

此 hook 返回了一个 `theme` 对象，你可以在函数组件中使用它。

### 返回结果

`theme`：事先在 context 中注入的主题对象。

### 例子

```jsx
import React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default function MyComponent() {
  const theme = useTheme();

  return <div>{`spacing ${theme.spacing}`}</div>;
}
```

## `withStyles(styles, [options]) => higher-order component`

使用 **higher-order component** 的模式与一个具有函数组件的样式表相连。 它不会修改传递给它的组件；相反的，它返回一个带有 `classes` 属性的新组件。 这个 `classes` 对象包含了在 DOM 中注入的类名（class names ）。

你可能会注意到一些有趣的细节：

- 它添加了一个 `classes` 属性，这样您可以从外部重写注入的类名。
- 它将 refs 转发给内部的组件。
- 而 `innerRef` 属性已不再使用了。 请使用 `ref`。
- 它**不会** 拷贝静态文件。 例如，您可以用它来定义一个 `getInitialProps()` 的静态方法 (next.js)。

### 参数

1. `styles`(* Function | Object *)：一个生成样式或一个样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
2. `options` (*Object* [optional]): 
  - `options.defaultTheme`（*Object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
  - ` options.withTheme ` (*Boolean* [optional]): 默认值为 `false`。 将 `theme` 对象作为属性提供给组件。
  - `options.name` (*String* [optional]): 样式表的名称。 适合调试。 如果未提供该值，它将尝试回退到组件的名称。
  - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 `true`时，则会反转样式。 当设置为 `null` 时，它依据 `theme.direction` 而定。
  - 其他的键则被转发到 [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet) 的 options 参数当中。

### 返回结果

`higher-order component`：应用于包装组件。

### 例子

```jsx
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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

此外，您还也可以这样使用 [ decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)：

```jsx
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

@withStyles(styles)
class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default MyComponent
```

## `withTheme(Component) => Component`

向输入框组件提供 `theme` 对象这个属性，那则可以在渲染方法中使用它。

### 参数

1. `Component` ：将被包装的组件。

### 返回结果

`Component` ：创建的新组件。 它将 refs 转发给内部的组件。

### 例子

```jsx
import React from 'react';
import { withTheme } from '@material-ui/core/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme(MyComponent);
```