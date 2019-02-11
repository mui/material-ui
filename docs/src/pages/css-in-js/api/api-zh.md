# API

<p class="description">@ material-ui/styles包的API参考。</p>

## `createGenerateClassName([options]) => class name generator`

返回 [ 类名称生成器函数 ](http://cssinjs.org/jss-api/#generate-your-class-names) 的函数。

#### 参数

1. `选项` (*Object* [optional]): 
    - `options.dangerouslyUseGlobalCSS` (*Boolean* [optional]): 默认值为`false`。 使Material-UI 类名称具有确定性。
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

这个函数在运行时并没有真正“做任何事”，它只是身份 函数。 它的唯一目的是打败**TypeScript**向` withStyles提供
样式规则时的类型扩展`这是`主题的功能` 。

#### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。

#### 返回结果

`styles` ：生成样式或样式对象的函数。

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

链路的样式表中有一个功能组件的使用**钩**的模式。

#### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
2. `选项` (*Object* [optional]): 
    - `options.defaultTheme`（*Object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
    - ` options.withTheme ` (*Boolean* [optional]): 默认值为 `false`。 将 ` theme ` 对象作为属性提供给组件。
    - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
    - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
    - 其他键被转发到[jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet)。

#### 返回结果

`hook` ： 一个钩子。 该钩子可以用在功能组件中。 它接受一个参数：将用于在“内插”的属性 样式表。

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

## `styled(Component)(styles, [options]) => Component`

链路的样式表中有一个功能组件的使用**styled components**的模式。

#### 参数

1. `Component` ：将被包装的组件。
2. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
3. `选项` (*Object* [optional]): 
    - `options.defaultTheme`（*Object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
    - ` options.withTheme ` (*Boolean* [optional]): 默认值为 `false`。 将 ` theme ` 对象作为属性提供给组件。
    - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
    - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
    - 其他键被转发到[jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet)。

#### 返回结果

`Component` ：创建新组件。

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

此组件允许您更改样式解决方案的行为。 由于React上下文，它使选项在React树下可用。

它最好应在**组件树的根目录中使用** 。

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

该组件采用`theme`属性，并使`theme`由于React上下文，可以在React树下使用。 它最好应在**组件树的根目录中使用** 。

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

该钩子返回`theme`对象因此可以在函数组件中使用。

#### 返回结果

`theme` ：主题对象。

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

链路的样式表有分量利用**higher-order component**的模式。 它不会修改传递给它的组件；相反，它返回一个具有`classes`属性的新组件。 这个`classes`对象包含DOM中注入的class名称。

一些可能有趣的实现细节：

- 它添加了一个 `classes` 属性，因此您可以从外部覆盖注入的类名。
- 它添加了一个 `innerRef` 属性，因此你可以从外部覆盖注入的类名。 ` innerRef ` 的用法与 `ref` 相同。
- 它将转发*非 React 的静态* 属性，以便 HOC 更 "透明"。 例如，它可用于定义 ` getInitialProps()` 静态方法 (next.js)。

#### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
2. `选项` (*Object* [optional]): 
    - `options.defaultTheme`（*Object* [optional]）：如果未通过主题提供者提供主题，则使用默认主题。
    - ` options.withTheme ` (*Boolean* [optional]): 默认值为 `false`。 将 ` theme ` 对象作为属性提供给组件。
    - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
    - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
    - 其他键被转发到[jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet)。

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

提供`theme` object作为输入组件的属性，因此可以在render方法中使用 。

#### 参数

1. `Component` ：将被包装的组件。

#### 返回结果

`Component` ：创建新组件。

#### 例子

```jsx
import React from 'react';
import { withTheme } from '@material-ui/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme()(MyComponent);
```