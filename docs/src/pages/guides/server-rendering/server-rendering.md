# Server Rendering

<p class="description">The most common use case for server-side rendering is to handle the initial render when a user (or search engine crawler) first requests your app.</p>

When the server receives the request, it renders the required component(s) into an HTML string, and then sends it as a response to the client.
From that point on, the client takes over rendering duties.

## Material-UI on the Server

Material-UI was designed from the ground-up with the constraint of rendering on the Server, but it's up to you to make sure it's correctly integrated.
It's important to provide the page with the required CSS, otherwise the page will render with just the HTML then wait for the CSS to be injected by the client, causing it to flicker.
To inject the style down to the client, we need to:

1. Create a fresh, new `sheetsRegistry` and `theme` instance on every request.
2. Render the React tree with the server-side API and the instance.
3. Pull the CSS out of the `sheetsRegistry`.
4. Pass the CSS along to the client.

On the client side, the CSS will be injected a second time before removing the server-side injected CSS.

## Setting Up

In the following recipe, we are going to look at how to set up server-side rendering.

### The Server Side

The following is the outline for what our server-side is going to look like.
We are going to set up an [Express middleware](http://expressjs.com/en/guide/using-middleware.html) using [app.use](http://expressjs.com/en/api.html) to handle all requests that come in to our server.
If you're unfamiliar with Express or middleware, just know that our handleRender function will be called every time the server receives a request.

`server.js`

```js
import express from 'express';
import React from 'react';
import App from './App';

// We are going to fill these out in the sections to follow.
function renderFullPage(html, css) {
  /* ... */
}

function handleRender(req, res) {
  /* ... */
}

const app = express();

// This is fired every time the server-side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### Handling the Request

The first thing that we need to do on every request is create a new `sheetsRegistry` and `theme` instance.

When rendering, we will wrap `App`, our root component,
inside a `JssProvider` and [`MuiThemeProvider`](/api/mui-theme-provider/) to make the `sheetsRegistry` and the `theme` available to all components in the component tree.

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

  // Grab the CSS from our sheetsRegistry.
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

The client side is straightforward. All we need to do is remove the server-side generated CSS.
Let's take a look at our client file:

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
  // Remove the server-side injected CSS.
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

We host different reference implementations which you can find in the [GitHub repository](https://github.com/mui-org/material-ui) under the [`/examples`](https://github.com/mui-org/material-ui/tree/master/examples) folder:
- [The reference implementation of this tutorial](https://github.com/mui-org/material-ui/tree/master/examples/ssr)
- [Next.js](https://github.com/mui-org/material-ui/tree/master/examples/nextjs)
- [Gatsby](https://github.com/mui-org/material-ui/tree/master/examples/gatsby)

## Troubleshooting

If it doesn't work, in 99% of cases it's a configuration issue.
A missing property, a wrong call order, or a missing component. We are very strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup, check out our [reference implementations](#reference-implementations), bit by bit.

### CSS works only on first load then is missing

The CSS is only generated on the first load of the page.
Then, the CSS is missing on the server for consecutive requests.

#### Action to Take

We rely on a cache, the sheets manager, to only inject the CSS once per component type
(if you use two buttons, you only need the CSS of the button one time).
You need to provide **a new `sheetsManager` for each request**.

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

There is a class name mismatch between the client and the server. It might work for the first request.
Another symptom is that the styling changes between initial page load and the downloading of the client scripts.

#### Action to Take

The class names value relies on the concept of [class name generator](/customization/css-in-js/#creategenerateclassname-options-class-name-generator).
The whole page needs to be rendered with **a single generator**.
This generator needs to behave identically on the server and on the client. For instance:

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

- You need to verify that your client and server are running the **exactly the same version** of Material-UI.
It is possible that a mismatch of even minor versions can cause styling problems.
To check version numbers, run `npm list @material-ui/core` in the environment where you build your application and also in your deployment environment.

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
