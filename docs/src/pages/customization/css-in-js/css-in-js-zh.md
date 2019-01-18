# CSS in JS

<p class="description">即使您没有使用我们的组件, 您也可以利用我们的样式解决方案。</p>

> ⚠️ We are working on extracting the styling solution into it's own package: [`@material-ui/styles`](/css-in-js/basics/). It's an unstable project (alpha version). Hopefully, we will make it the default style implementation for the core components in Material-UI v4.

Material-UI 旨在为构建动态 UI 提供强大的基础。 为了简单起见, **我们向用户公开我们的样式解决方案 **。 你可以使用它，但是你不需要这样做。 该样式解决方案可[与所有其他主要解决方案](/guides/interoperability/)互操作

## Material-UI 的样式解决方案

在以前的版本中，Material-UI 使用 LESS，然后是自定义内嵌式的解决方案来编写组件的样式，但是这些方法已被证明是有限制的。 最近，我们[迁移](https://github.com/oliviertassinari/a-journey-toward-better-style)到*CSS-in-JS*的解决方案中去。 它**解锁了许多很棒的功能**（主题嵌套、动态样式、自我支持等...） 我们认为这是未来：

- [统一的样式语言](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)
- [基于组件样式的未来](https://medium.freecodecamp.org/css-in-javascript-the-future-of-component-based-styling-70b161a79a32)
- [将SCSS（Sass）转换为CSS-in-JS](https://egghead.io/courses/convert-scss-sass-to-css-in-js)

因此，你可能在演示中注意到*CSS-in-JS*的样子。 我们使用由[`wtihStyles`](#api)创建的高阶组件以CSS的形式注入到DOM中，使用JSS。 下面是一个例子：

{{"demo": "pages/customization/css-in-js/CssInJs.js"}}

## JSS

Material-UI 的样式解决方案的核心处是使用[JSS](https://github.com/cssinjs/jss)。 它是一个[高性能](https://github.com/cssinjs/jss/blob/master/docs/performance.md)JS到CSS编译器，它在运行时和服务器端工作。 它大约是8kb（缩小和压缩）并且可以通过[插件](https://github.com/cssinjs/jss/blob/master/docs/plugins.md)的API扩展。

如果您最终在代码库中使用此样式解决方案，则需要*学习API*。 The best place to start is by looking at the features that each [plugin](https://cssinjs.org/plugins/) provides. Material-UI 使用了[其中的几个](#plugins)。 如果需要，您可以随时使用[`JssProvider`](https://github.com/cssinjs/react-jss#custom-setup)帮助程序添加新插件。

如果您希望构建自己的`jss`**和**支持*rtl*的实例，请确保您还包含[jss-rtl](https://github.com/alitaheri/jss-rtl)的插件。 请查阅jss-rtl的[Readme](https://github.com/alitaheri/jss-rtl#simple-usage)去了解如何使用。

## Sheets 注册

在服务器上渲染时，您需要将所有渲染样式作为CSS字符串。 `SheetsRegistry`允许你手动聚合和字符串化它们。 了解更多[Server Rendering](/guides/server-rendering/)

## Sheets 管理器

The sheets manager uses a [reference counting](https://en.wikipedia.org/wiki/Reference_counting) algorithm in order to attach and detach the style sheets only once per (styles, theme) couple. This technique provides an important performance boost when re-rendering instances of a component.

When only rendering on the client, that's not something you need to be aware of. However, when rendering on the server you do. You can read more about [Server Rendering](/guides/server-rendering/).

## Class names

您可能已经注意到我们的样式解决方案生成的类名称**不确定性**，所以你不能依赖它们保持不变。 The following CSS won't work:

```css
.MuiAppBar-root-12 {
  opacity: 0.6
}
```

Instead, you have to use the `classes` property of a component to override them. On the other hand, thanks to the non-deterministic nature of our class names, we can implement optimizations for development and production. 它们在开发中易于调试, 在生产中尽可能短:

- 开发：`.MuiAppBar-root-12`
- 生产：`.jss12`

如果您不喜欢此默认行为, 您可以更改它。 JSS relies on the concept of [class name generator](http://cssinjs.org/js-api/#generate-your-own-class-names).

### 全局CSS

We provide a custom implementation of the class name generator for Material-UI needs: [`createGenerateClassName()`](#creategenerateclassname-options-class-name-generator). As well as the option to make the class names **deterministic** with the `dangerouslyUseGlobalCSS` option. 打开后, 类名将如下所:

- 开发：`.MuiAppBar-root-`
- 生产: `.MuiAppBar-root`

⚠️ **Be cautious when using `dangerouslyUseGlobalCSS`.** We provide this option as an escape hatch for quick prototyping. 依赖于它的代码在生产中运行有以下含义:

- 全局CSS本质上是很弱的 人们使用严格的方法, 如 [BEM](http://getbem.com/introduction/) 来解决问题。
- 很难跟踪`classes`API的更改。

⚠️ When using `dangerouslyUseGlobalCSS` standalone (without Material-UI), you should name your style sheets. `withStyles` has a name option for that:

```jsx
const Button = withStyles(styles, { name: 'button' })(ButtonBase)
```

## CSS 注入顺序

由Material-UI 注入的 CSS 对组件的样式具有最高的特异性, 因为`<link>`被注入到`<head>`的底部, 以确保组件始终正确呈现。

但是, 您可能还希望重写这些样式, 例如使用styled-components。 If you are experiencing a CSS injection order issue, JSS [provides a mechanism](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-dom-insertion-point) to handle this situation. By adjusting the placement of the `insertionPoint` within your HTML head you can [control the order](http://cssinjs.org/js-api/#attach-style-sheets-in-a-specific-order) that the CSS rules are applied to your components.

### HTML 注释

最简单的方法是添加一个 HTML 注释, 用于确定 JSS 将在何处插入样式:

```jsx
<head>
  <!-- jss-insertion-point -->
  <link href="..." />
</head>
```

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
//我们定义一个自定义插入点，JSS将寻找在DOM中注入样式。
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

### 其他 HTML 元素

创建生产环境时, [Create React App](https://github.com/facebook/create-react-app) 会剥离 HTML 注释。 若要变通解决此问题, 您可以提供 DOM 元素 (注释以外) 作为 JSS 插入点。

例如, `<noscript>` 元素:

```jsx
<head>
  <noscript id="jss-insertion-point"></noscript>
  <link href="..." />
</head>
```

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
//我们定义一个自定义插入点，JSS将寻找在DOM中注入样式。
  insertionPoint: document.getElementById('jss-insertion-point'),
});

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

### JS createComment

codesandbox.io 阻止对 `<head>` 元素的访问。 若要变通解决此问题, 您可以使用 JavaScript ` 文档. createComment () ` API:

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const styleNode = document.createComment("jss-insertion-point");
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
//我们定义一个自定义插入点，JSS将寻找在DOM中注入样式。
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

## JssProvider

react-jss exposes a `JssProvider` component to configure JSS for the underlying child components. There are different use cases:

- 提供类名生成器。
- [提供Sheets注册。](/customization/css-in-js/#sheets-registry)
- 提供JSS例子 您可能希望支持[从右到左](/guides/right-to-left/)或更改[ CSS注入顺序](/customization/css-in-js/#css-injection-order)。 阅读[JSS文档](http://cssinjs.org/js-api/)以了解有关可用选项的更多信息。 下面是一个示例：

```jsx
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

function App() {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

## 插件

JSS使用插件的概念来扩展其核心，允许人们挑选他们需要的功能。 你仅为你正在使用的内容支付性能开销。 Given `withStyles` is our internal styling solution, all the plugins aren't available by default. 我们添加了以下列表：

- [jss-global](http://cssinjs.org/jss-global/)
- [jss-nested](http://cssinjs.org/jss-nested/)
- [jss-camel-case](http://cssinjs.org/jss-camel-case/)
- [jss-default-unit](http://cssinjs.org/jss-default-unit/)
- [jss-vendor-prefixer](http://cssinjs.org/jss-vendor-prefixer/)
- [jss-props-sort](http://cssinjs.org/jss-props-sort/)

It's a subset of [jss-preset-default](http://cssinjs.org/jss-preset-default/). 当然，你可以自由的添加新插件。 We have one example for the [`jss-rtl` plugin](/guides/right-to-left/#3--jss-rtl).

## API

### `withStyles(styles, [options]) => higher-order component`

Link a style sheet with a component. 它不会修改传递给它的组件；相反，它返回一个具有`classes`属性的新组件。 这个`classes`对象包含DOM中注入的class名称。

一些可能有趣的实现细节：

- 它添加了一个`classes`属性，因此您可以从外部覆盖注入的类名。
- 它添加了一个`innerRef`属性，因此你可以从外部覆盖注入的类名。 ` innerRef ` 的用法与 ` ref ` 相同。
- 它将转发 *non React static* 属性, 以便 HOC 更 "透明"。 例如, 它可用于定义 ` getInitialProps()` 静态方法 (next.js)。

#### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
2. `选项` (*Object* [optional]): 
    - `options.withTheme` (*Boolean* [optional]): 默认值为`false`。 将 ` theme ` 对象作为属性提供给组件。
    - ` options.name ` (*String* [optional]): 样式表的名称。 用于调试。 如果未提供该值, 它将尝试回退到组件的名称。
    - `options.flip` (*Boolean* [optional])：当设置为 `false` 时, 此工作表将选择退出 ` rtl ` 转换。 如果设置为 ` true `, 则会反转样式。 当设置为`null`，它跟随`theme.direction`。
    - 其他键被转发到[jss.createStyleSheet([styles], [options])](http://cssinjs.org/js-api/#create-style-sheet)。

#### 返回结果

`higher-order component`：应用于包装组件。

#### 例子

```jsx
import { withStyles } from '@material-ui/core/styles';

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

### `createGenerateClassName([options]) => class name generator`

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
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

function App() {
  return (
    <JssProvider generateClassName={generateClassName}>
      ...
    </JssProvider>
  );
}

export default App;
```

## 备选方案

Do you think that [higher-order components are the new mixins](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)? Rest assured we don't, however because `withStyles()` is a higher-order component, it can be extended with just a **few lines of code** to match different patterns that are all idiomatic React. Here are a couple of examples.

### 渲染道具 api (+ 11 行)

The term [“render prop”](https://reactjs.org/docs/render-props.html) refers to a simple technique for sharing code between React components using a prop whose value is a function.

```jsx
//您将在演示源中找到`createStyled`实现。
const Styled = createStyled({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

function RenderProps() {
  return (
    <Styled>
      {({ classes }) => (
        <Button className={classes.root}>
          {'Render props'}
        </Button>
      )}
    </Styled>
  );
}
```

{{"demo": "pages/customization/css-in-js/RenderProps.js"}}

You can access the theme the same way you would do it with `withStyles`:

```js
const Styled = createStyled(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));
```

[@jedwards1211](https://github.com/jedwards1211) Has taken the time to move this module into a package: [material-ui-render-props-styles](https://github.com/jcoreio/material-ui-render-props-styles). Feel free to use it.

### 样式组件 api (+ 15条线)

styled-components's API removes the mapping between components and styles. Using components as a low-level styling construct can be simpler.

```jsx
//您将在演示中找到`styled`实现。
/你甚至可以用https://github.com/cssinjs/jss-template编写CSS。
const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

function StyledComponents() {
  return <MyButton>{'Styled Components'}</MyButton>;
}
```

{{"demo": "pages/customization/css-in-js/StyledComponents.js"}}

You can access the theme the same way you would do it with `withStyles`:

```js
const MyButton = styled(Button)(theme => ({
  backgroundColor: theme.palette.background.paper,
}));
```