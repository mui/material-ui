# API

<p class="description">The API reference of the @material-ui/styles package.</p>

## `createGenerateClassName([options]) => class name generator`

返回 [ 类名称生成器函数 ](http://cssinjs.org/js-api/#generate-your-own-class-names) 的函数。

#### 参数

1. `选项` (*Object* [optional]): 
    - ` options.dangerouslyUseGlobalCSS ` (*Boolean* [optional]): Defaults to `false`。 使Material-UI 类名称具有确定性。
    - `options.productionPrefix` (*String* [optional])：初始值为`'jss'`. 用于在生产中对类名称进行前缀的字符串。
    - `options.seed` (*String* [optional])：初始值为 `''`. 用于唯一标识生成器的字符串。 当使用多个生成器时，它可用于避免类名冲突。

#### 返回结果

`类名生成器`：应该将生成器提供给JSS。

#### 例子

```jsx
import React from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>...</StylesProvider>
  );
}
```

## `createStyles(styles) => styles`

This function doesn't really "do anything" at runtime, it's just the identity function. Its only purpose is to defeat **TypeScript**'s type widening when providing style rules to `withStyles` which are a function of the `Theme`.

#### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。

#### 返回结果

`styles`: A function generating the styles or a styles object.

#### 例子

```jsx
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
  root: {
    backgroundColor: 'red',
  },
});

class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default withStyles(styles)(MyComponent);
```

## `makeStyles(styles, [options]) => hook`

Link a style sheet with a function component using the **hook** pattern.

#### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
2. `选项` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
    - `options.withTheme` (*Boolean* [optional]): 默认值为`false`。 将 ` theme ` 对象作为属性提供给组件。
    - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
    - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
    - 其他键被转发到[jss.createStyleSheet([styles], [options])](http://cssinjs.org/js-api/#create-style-sheet)。

#### 返回结果

`hook`: A hook. This hook can be used in a function component. It accepts one argument: the properties that will be used for "interpolation" in the style sheet.

#### 例子

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
  },
});

export default function MyComponent() {
  const classes = useStyles();
  return <div className={classes.root} />;
}
```

## `styled(styles, [options])(Component) => Component`

Link a style sheet with a function component using the **styled components** pattern.

#### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
2. `选项` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
    - `options.withTheme` (*Boolean* [optional]): 默认值为`false`。 将 ` theme ` 对象作为属性提供给组件。
    - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
    - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
    - 其他键被转发到[jss.createStyleSheet([styles], [options])](http://cssinjs.org/js-api/#create-style-sheet)。
3. `Component`: The component that will be wrapped.

#### 返回结果

`Component`: The new component created.

#### 例子

```jsx
import React from 'react';
import { styled } from '@material-ui/styles';

const MyComponent = styled('div')({
  backgroundColor: 'red',
});

export default function StyledComponents() {
  return <MyComponent />;
}
```

## `StylesProvider`

This component allows you to change the behavior of the styling solution. It makes the options available down the React tree thanks to React context.

It should preferably be used at **the root of your component tree**.

#### 例子

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';

function App() {
  return (
    <StylesProvider jss={jss}>...</StylesProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `ThemeProvider`

This component takes a `theme` property, and makes the `theme` available down the React tree thanks to React context. It should preferably be used at **the root of your component tree**.

#### 例子

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';

const theme = {};

function App() {
  return (
    <ThemeProvider theme={theme}>...</ThemeProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `useTheme() => theme`

This hook returns the `theme` object so it can be used inside a function component.

#### 返回结果

`theme`: The theme object.

#### 例子

```jsx
import React from 'react';
import { useTheme } from '@material-ui/styles';

export default function MyComponent() {
  const theme = useTheme();

  return <div>{`spacing ${theme.spacing}`}</div>;
}
```

## `withStyles(styles, [options]) => higher-order component`

Link a style sheet with a component using the **higher-order component** pattern. 它不会修改传递给它的组件；相反，它返回一个具有`classes`属性的新组件。 这个`classes`对象包含DOM中注入的class名称。

一些可能有趣的实现细节：

- 它添加了一个`classes`属性，因此您可以从外部覆盖注入的类名。
- 它添加了一个`innerRef`属性，因此你可以从外部覆盖注入的类名。 ` innerRef ` 的用法与 ` ref ` 相同。
- 它将转发 *non React static* 属性, 以便 HOC 更 "透明"。 例如, 它可用于定义 ` getInitialProps()` 静态方法 (next.js)。

#### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
2. `选项` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
    - `options.withTheme` (*Boolean* [optional]): 默认值为`false`。 将 ` theme ` 对象作为属性提供给组件。
    - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
    - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
    - 其他键被转发到[jss.createStyleSheet([styles], [options])](http://cssinjs.org/js-api/#create-style-sheet)。

#### 返回结果

`higher-order component`：应用于包装组件。

#### 例子

```jsx
import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default withStyles(styles)(MyComponent);
```

此外, 还可以像这样使用 [修饰器](https://babeljs.io/docs/en/babel-plugin-proposal-decorators):

```jsx
import React from 'react';
import { withStyles } from '@material-ui/styles';

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

## `withTheme()(Component) => Component`

Provide the `theme` object as a property of the input component so it can be used in the render method.

#### 参数

1. `Component`: The component that will be wrapped.

#### 返回结果

`Component`: The new component created.

#### 例子

```jsx
import React from 'react';
import { withTheme } from '@material-ui/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme()(MyComponent);
```