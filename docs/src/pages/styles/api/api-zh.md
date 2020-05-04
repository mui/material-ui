# API

<p class="description">The API reference of @material-ui/core/styles.</p>

## `createGenerateClassName([options]) => class name generator`

返回 [ 类名称生成器函数 ](https://cssinjs.org/jss-api/#generate-your-class-names) 的函数。

### 参数

1. `options` (*Object* [optional]): 
  - `options.disableGlobal` (*Boolean* [optional]): 默认值为`false`。 Disable the generation of deterministic class names.
  - `options.productionPrefix` (*String* [optional])：初始值为`'jss'`. 用于在生产中对类名称进行前缀的字符串。
  - `options.seed` (*String* [optional])：初始值为 `''`. 用于唯一标识生成器的字符串。 It can be used to avoid class name collisions when using multiple generators in the same document.

### 返回结果

`类名生成器`：应该将生成器提供给JSS。

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

这个函数在运行时并没有真正“做任何事”，它只是身份 函数。 Its only purpose is to defeat **TypeScript**'s type widening when providing style rules to `makeStyles`/`withStyles` which are a function of the `Theme`.

### 参数

1. `styles` (*Object*): A styles object.

### 返回结果

`styles`: A styles object.

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

链路的样式表中有一个功能组件的使用**钩**的模式。

### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
2. `options` (*Object* [optional]): 
  - `options.defaultTheme`（*Object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
  - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。
  - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
  - 其他键被转发到[jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet)。

### 返回结果

`hook` ： 一个钩子。 该钩子可以用在功能组件中。 The documentation often calls this returned hook `useStyles`. 它接受一个参数：将用于在“内插”的属性 样式表。

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

This is a class helper to handle server-side rendering. [You can follow this guide for a practical approach](/guides/server-rendering/).

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

The instantiation accepts an options object as a first argument.

1. `options` (*Object* [optional]): The options are spread as props to the [`StylesProvider`](#stylesprovider) component.

### `sheets.collect(node) => React element`

The method wraps your React node in a provider element. It collects the style sheets during the rendering so they can be later sent to the client.

### `sheets.toString() => CSS string`

The method returns the collected styles.

⚠️ You must call `.collect()` before using this method.

### `sheets.getStyleElement() => CSS React element`

The method is an alternative to `.toString()` when you are rendering the whole page with React.

⚠️ You must call `.collect()` before using this method.

## `styled(Component)(styles, [options]) => Component`

链路的样式表中有一个功能组件的使用**styled components**的模式。

### 参数

1. `Component` ：将被包装的组件。
2. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 It's provided as property of the first argument.
3. `options` (*Object* [optional]): 
  - `options.defaultTheme`（*Object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
  - ` options.withTheme ` (*Boolean* [optional]): 默认值为 `false`。 将 ` theme ` 对象作为属性提供给组件。
  - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
  - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
  - 其他键被转发到[jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet)。

### 返回结果

`Component` ：创建新组件。

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

此组件允许您更改样式解决方案的行为。 It makes the options available down the React tree thanks to the context.

它最好应在**组件树的根目录中使用** 。

### Props

| 名称                | 类型     | 默认值   | 描述                                                                                                                                                                                                                                                                                                                                   |
|:----------------- |:------ |:----- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| children&nbsp;*   | node   |       | Your component tree.                                                                                                                                                                                                                                                                                                                 |
| disableGeneration | bool   | false | You can disable the generation of the styles with this option. It can be useful when traversing the React tree outside of the HTML rendering step on the server. Let's say you are using react-apollo to extract all the queries made by the interface server-side. You can significantly speed up the traversal with this property. |
| generateClassName | func   |       | JSS's class name generator.                                                                                                                                                                                                                                                                                                          |
| injectFirst       | bool   | false | By default, the styles are injected last in the `<head>` element of the page. As a result, they gain more specificity than any other style sheet. If you want to override Material-UI's styles, set this prop.                                                                                                                 |
| jss               | object |       | JSS's instance.                                                                                                                                                                                                                                                                                                                      |


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

This component takes a `theme` property, and makes it available down the React tree thanks to the context. 它最好应在**组件树的根目录中使用** 。

### Props

| 名称              | 类型                                       | 默认值 | 描述                                                                    |
|:--------------- |:---------------------------------------- |:--- |:--------------------------------------------------------------------- |
| children&nbsp;* | node                                     |     | Your component tree.                                                  |
| theme&nbsp;*    | union:&nbsp;object&nbsp;&#124;&nbsp;func |     | A theme object. You can provide a function to extend the outer theme. |


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

该钩子返回`theme`对象因此可以在函数组件中使用。

### 返回结果

`theme`: The theme object previously injected in the context.

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

链路的样式表有分量利用**higher-order component**的模式。 它不会修改传递给它的组件；相反，它返回一个具有`classes`属性的新组件。 这个`classes`对象包含DOM中注入的class名称。

一些可能有趣的实现细节：

- 它添加了一个 `classes` 属性，因此您可以从外部覆盖注入的类名。
- It forwards refs to the inner component.
- The `innerRef` prop is deprecated. Use `ref` instead.
- It does **not** copy over statics. 例如，它可用于定义 ` getInitialProps()` 静态方法 (next.js)。

### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
2. `options` (*Object* [optional]): 
  - `options.defaultTheme`（*Object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
  - ` options.withTheme ` (*Boolean* [optional]): 默认值为 `false`。 将 ` theme ` 对象作为属性提供给组件。
  - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
  - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
  - 其他键被转发到[jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet)。

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

此外, 还可以像这样使用 [修饰器](https://babeljs.io/docs/en/babel-plugin-proposal-decorators):

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

提供`theme` object作为输入组件的属性，因此可以在render方法中使用 。

### 参数

1. `Component` ：将被包装的组件。

### 返回结果

`Component` ：创建新组件。 Does forward refs to the inner component.

### 例子

```jsx
import React from 'react';
import { withTheme } from '@material-ui/core/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme(MyComponent);
```