# Серверная отрисовка

<p class="description">Наиболее распространенный вариант использования для серверной отрисовки - это использовать начальную отрисовку, когда пользователь (или поисковой движок) впервые запрашивает ваше приложение.</p>

Когда сервер получает запрос, он отрисовывает необходимые компоненты в HTML строк, а затем отправляет ее как ответ клиенту. С этого момента клиент берет на себя обязанности по отрисовке.

## Material-UI на сервере

Material-UI was designed from the ground-up with the constraint of rendering on the Server, but it's up to you to make sure it's correctly integrated. Важно предоставить странице необходимый CSS, иначе страница будет отрисована только с помощью HTML, а тем будет ожидать CSS, который добавится клиентом, вызывая мерцание. Чтобы добавить стили на клиент, вам необходимо:

1. Создавать новые объекты `sheetsRegistry` и `theme` на каждый запрос.
2. Отрисовать React дерево с серверным API и сущностью.
3. Затянуть CSS из `sheetsRegistry`.
4. Передать CSS клиенту.

На стороне клиента CSS будет добавлен второй раз перед удалением добавленного сервером CSS.

## Настройка

В следующем рецепте мы рассмотрим, как настроить серверную отрисовку.

### Сторона сервера

Ниже приведено описание того, как наша сторона сервера будет выглядеть. Мы настраиваем [Express middleware](http://expressjs.com/en/guide/using-middleware.html), используя [app.use](http://expressjs.com/en/api.html), чтобы обработать все запросы, которые приходят на наш сервер. Если вы не знакомы с Express или middleware, просто знайте, что наша функция handleRender будет вызвана каждый раз, когда сервер получает запрос.

`server.js`

```js
import express from 'express';
import React from 'react';
import App from './App';

// Мы заполним их в следующих разделах.
function renderFullPage(html, css) {
  /* ... */
}

function handleRender(req, res) {
  /* ... */
}

const app = express();

// Isso é acionado toda vez que o servidor recebe uma solicitação.
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### Обработка запроса

Первая вещь, которую нам нужно сделать на каждый запрос, - это создать новые сущности `sheetsRegistry` и `theme`.

При отрисовке мы обернем `App`, наш корневой компонент, внутри `JssProvider` и [`MuiThemeProvider`](/api/mui-theme-provider/), чтобы создать `sheetsRegistry` и `theme`, доступные всем компонентам в дереве компонентов.

The key step in server-side rendering is to render the initial HTML of our component **before** we send it to the client side. To do this, we use [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html).

We then get the CSS from our `sheetsRegistry` using `sheetsRegistry.toString()`. We will see how this is passed along in our `renderFullPage` function.

```jsx
import ReactDOMServer from 'react-dom/server'
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

function handleRender(req, res) {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <App />
      </MuiThemeProvider>
    </JssProvider>
  )

  // Pegue o CSS do nosso sheetsRegistry.
  const css = sheetsRegistry.toString()

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css))
}
```

### Inject Initial Component HTML and CSS

The final step on the server-side is to inject our initial component HTML and CSS into a template to be rendered on the client side.

```js
function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Material-UI</title>
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}
```

### The Client Side

The client side is straightforward. All we need to do is remove the server-side generated CSS. Let's take a look at our client file:

`client.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import App from './App';

class Main extends React.Component {
  // Remova o CSS injetado no lado do servidor.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />
  }
}

// Crie uma instância do tema.
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light',
  },
});

// Create a new class name generator.
const generateClassName = createGenerateClassName();

ReactDOM.hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  </JssProvider>,
  document.querySelector('#root'),
);
```

## Reference implementations

We host different reference implementations which you can find in the [GitHub repository](https://github.com/mui-org/material-ui) under the [`/examples`](https://github.com/mui-org/material-ui/tree/next/examples) folder:

- [The reference implementation of this tutorial](https://github.com/mui-org/material-ui/tree/next/examples/ssr)
- [Gatsby](https://github.com/mui-org/material-ui/tree/next/examples/gatsby-next)
- [Next.js](https://github.com/mui-org/material-ui/tree/next/examples/nextjs-next)

## Troubleshooting

If it doesn't work, in 99% of cases it's a configuration issue. A missing property, a wrong call order, or a missing component. We are very strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup, check out our [reference implementations](#reference-implementations), bit by bit.

### CSS works only on first load then is missing

The CSS is only generated on the first load of the page. Then, the CSS is missing on the server for consecutive requests.

#### Action to Take

We rely on a cache, the sheets manager, to only inject the CSS once per component type (if you use two buttons, you only need the CSS of the button one time). You need to provide **a new `sheetsManager` for each request**.

You can learn more about [the sheets manager concept in the documentation](/customization/css-in-js/#sheets-manager).

*example of fix:*

```diff
-// Create a sheetsManager instance.
-const sheetsManager = new Map();

function handleRender(req, res) {

+ // Create a sheetsManager instance.
+ const sheetsManager = new Map();

  //…

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
```

### React class name hydration mismatch

There is a class name mismatch between the client and the server. It might work for the first request. Another symptom is that the styling changes between initial page load and the downloading of the client scripts.

#### Action to Take

The class names value relies on the concept of [class name generator](/customization/css-in-js/#creategenerateclassname-options-class-name-generator). The whole page needs to be rendered with **a single generator**. This generator needs to behave identically on the server and on the client. For instance:

- You need to provide a new class name generator for each request. But you might share a `createGenerateClassName()` between different requests:

*example of fix:*

```diff
-// Create a new class name generator.
-const generateClassName = createGenerateClassName();

function handleRender(req, res) {

+ // Create a new class name generator.
+ const generateClassName = createGenerateClassName();

  //…

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
```

- You need to verify that your client and server are running the **exactly the same version** of Material-UI. It is possible that a mismatch of even minor versions can cause styling problems. To check version numbers, run `npm list @material-ui/core` in the environment where you build your application and also in your deployment environment.
    
    You can also ensure the same version in different environments by specifying a specific MUI version in the dependencies of your package.json.

*example of fix (package.json):*

```diff
  "dependencies": {
    ...

-   "@material-ui/core": "^1.4.2",
+   "@material-ui/core": "1.4.3",
    ...
  },
```

- You need to make sure that the server and the client share the same `process.env.NODE_ENV` value.
- The react-jss dependency version should match the ^8.0.0 semantic versioning.