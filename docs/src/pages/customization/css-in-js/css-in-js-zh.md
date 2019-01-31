# CSS in JS

<p class="description">即使您没有使用我们的组件, 您也可以利用我们的样式解决方案。</p>

> ⚠️我们正在努力将样式解决方案提取到它自己的包中：[`@material-ui/styles`](/css-in-js/basics/) 。 这是一个不稳定的项目（alpha版本）。 希望我们将它作为Material-UI v4中核心组件的默认样式实现。

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

如果您最终在代码库中使用此样式解决方案，则需要*学习API*。 最好的起点是查看每个[插件](https://cssinjs.org/plugins/)提供的功能。 Material-UI 使用了[其中的几个](#plugins)。 如果需要，您可以随时使用[`JssProvider`](https://github.com/cssinjs/react-jss#custom-setup)帮助程序添加新插件。

如果您希望构建自己的`jss`**和**支持*rtl*的实例，请确保您还包含[jss-rtl](https://github.com/alitaheri/jss-rtl)的插件。 请查阅jss-rtl的[Readme](https://github.com/alitaheri/jss-rtl#simple-usage)去了解如何使用。

## Sheets 注册

在服务器上渲染时，您需要将所有渲染样式作为CSS字符串。 `SheetsRegistry`允许你手动聚合和字符串化它们。 了解更多[Server Rendering](/guides/server-rendering/)

## Sheets 管理器

Sheets 管理器使用[引用计数](https://en.wikipedia.org/wiki/Reference_counting)算法，以便每个（样式，主题）对只附加和分离样式表一次。 在重新渲染组件的实例时，此技术可提供重要的性能提升。

当只在客户端上呈现时，这不是您需要注意的事情。 但是，在服务器上进行渲染时。 你要了解更多[Server Rendering](/guides/server-rendering/)。

## Class names

您可能已经注意到我们的样式解决方案生成的类名称**不确定性**，所以你不能依赖它们保持不变。 以下CSS不起作用：

```css
.MuiAppBar-root-12 {
  opacity: 0.6
}
```

相反, 您必须使用组件的 `classes`属性来重写它们。 另一方面, 由于类名的非确定性性质, 我们 可以实现对开发和生产的优化。 它们在开发中易于调试, 在生产中尽可能短:

- 开发：`.MuiAppBar-root-12`
- 生产：`.jss12`

如果您不喜欢此默认行为, 您可以更改它。 JSS依赖于[类名生成器](http://cssinjs.org/js-api/#generate-your-own-class-names)的概念。

### 全局CSS

我们为Material-UI 需要提供类名称生成器的自定义实现: [`createGenerateClassName()`](#creategenerateclassname-options-class-name-generator)。 以及使用`dangerouslyUseGlobalCSS`选项使类名**确定性**的选项。 打开后, 类名将如下所:

- 开发：`.MuiAppBar-root-`
- 生产: `.MuiAppBar-root`

⚠️ ** 使用`dangerouslyUseGlobalCSS`时要格外小心. ** 我们提供此选项作为快速原型制作的孵化器。 依赖于它的代码在生产中运行有以下含义:

- 全局CSS本质上是很弱的 人们使用严格的方法, 如 [BEM](http://getbem.com/introduction/) 来解决问题。
- 很难跟踪`classes`API的更改。

⚠️独立使用`dangerouslyUseGlobalCSS`(不含Material-UI) 时, 应为样式表命名。 ` withStyles`具有以下名称选项:

```jsx
const Button = withStyles(styles, { name: 'button' })(ButtonBase)
```

## CSS 注入顺序

由Material-UI 注入的 CSS 对组件的样式具有最高的特异性, 因为`<link>`被注入到`<head>`的底部, 以确保组件始终正确呈现。

但是, 您可能还希望重写这些样式, 例如使用styled-components。 如果遇到 CSS 注入顺序问题, JSS[提供了一个机制](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-dom-insertion-point)来处理这种情况。 通过调整 HTML 头中 ` insertionPoint ` 的位置, 可以 [ 控制顺序 ](http://cssinjs.org/js-api/#attach-style-sheets-in-a-specific-order) 将 CSS 规则应用于组件。

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

react-jss 公开一个 ` JssProvider ` 组件, 以便为基础子组件配置 jss。 有不同的用例:

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

JSS使用插件的概念来扩展其核心，允许人们挑选他们需要的功能。 你仅为你正在使用的内容支付性能开销。 给定`withStyles`是我们的内部样式解决方案，默认情况下所有插件都不可用。 我们添加了以下列表：

- [jss-global](http://cssinjs.org/jss-global/)
- [jss-nested](http://cssinjs.org/jss-nested/)
- [jss-camel-case](http://cssinjs.org/jss-camel-case/)
- [jss-default-unit](http://cssinjs.org/jss-default-unit/)
- [jss-vendor-prefixer](http://cssinjs.org/jss-vendor-prefixer/)
- [jss-props-sort](http://cssinjs.org/jss-props-sort/)

它是[jss-preset-default](http://cssinjs.org/jss-preset-default/)的子集。 当然，你可以自由的添加新插件。 我们有一个[`jss-rtl`插件](/guides/right-to-left/#3--jss-rtl)的例子。

## API

### `withStyles(styles, [options]) => higher-order component`

将样式表与组件连接。 它不会修改传递给它的组件；相反，它返回一个具有`classes`属性的新组件。 这个`classes`对象包含DOM中注入的class名称。

一些可能有趣的实现细节：

- 它添加了一个`classes`属性，因此您可以从外部覆盖注入的类名。
- 它添加了一个`innerRef`属性，因此你可以从外部覆盖注入的类名。 ` innerRef ` 的用法与 ` ref ` 相同。
- 它将转发 *non React static* 属性, 以便 HOC 更 "透明"。 例如, 它可用于定义 ` getInitialProps()` 静态方法 (next.js)。

#### 参数

1. ` styles `(* Function | Object *): 生成样式或样式对象的函数。 它将链接到组件。 如果需要访问主题, 请使用函数签名。 它作为第一个参数提供。
2. `选项` (*Object* [optional]): 
    - ` options.withTheme ` (*Boolean* [optional]): 默认值为 `false`。 将 ` theme ` 对象作为属性提供给组件。
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
    - `options.dangerouslyUseGlobalCSS` (*Boolean* [optional]): 默认值为`false`。 使Material-UI 类名称具有确定性。
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

你认为[高阶组件是新的mixins吗](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)？ 请放心，我们不会这样做，但是因为`withStyles()`是一个更高阶的组件，所以只需要**少量几行代码**就可以扩展来匹配不同的模式。这些都是通用的React。 以下有几个例子：

### 渲染道具 api (+ 11 行)

术语[“render prop”](https://reactjs.org/docs/render-props.html)指的是使用其值为函数的prop来在React组件之间共享代码的简单技术。

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

您可以使用与`withStyles`相同的方式访问主题：

```js
const Styled = createStyled(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));
```

[@jedwards1211 ](https://github.com/jedwards1211)花时间将此模块移动到包中：[ material-ui-render-props-styles ](https://github.com/jcoreio/material-ui-render-props-styles)。 随意使用它。

### 样式组件 api (+ 15条线)

styled-components的API删除了组件和样式之间的映射。 使用组件作为低级样式构造可以更简单。

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

您可以使用与`withStyles`相同的方式访问主题：

```js
const MyButton = styled(Button)(theme => ({
  backgroundColor: theme.palette.background.paper,
}));
```