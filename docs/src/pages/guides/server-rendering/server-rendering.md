# Server Rendering

The most common use case for server-side rendering is to handle the *initial render* when a user (or search engine crawler) first requests your app.
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

On the client side, the CSS will be injected a second time before removing the server side injected CSS.

## Setting Up

In the following recipe, we are going to look at how to set up server-side rendering.

### The Server Side

The following is the outline for what our server side is going to look like.
We are going to set up an [Express middleware](http://expressjs.com/en/guide/using-middleware.html) using [app.use](http://expressjs.com/en/api.html) to handle all requests that come in to our server.
If you're unfamiliar with Express or middleware, just know that our handleRender function will be called every time the server receives a request.

`server.js`

```js
import express from 'express';
import React from 'react';
import App from './App';

// We are going to fill these out in the sections to follow.
function handleRender(req, res) {
  /* ... */
}

function renderFullPage(html, preloadedState) {
  /* ... */
}

const app = express();

// This is fired every time the server side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### Handling the Request

The first thing that we need to do on every request is create a new `sheetsRegistry` and `theme` instance.

When rendering, we will wrap `App`, our root component,
inside a `JssProvider` and [`MuiThemeProvider`](/api/mui-theme-provider) to make the `sheetsRegistry` and the `theme` available to all components in the component tree.

The key step in server side rendering is to render the initial HTML of our component **before** we send it to the client side. To do this, we use [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html).

We then get the CSS from our `sheetsRegistry` using `sheetsRegistry.toString()`. We will see how this is passed along in our `renderFullPage` function.

```jsx
import { renderToString } from 'react-dom/server'
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

function handleRender(req, res) {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });

  const generateClassName = createGenerateClassName();

  // Render the component to a string.
  const html = renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
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

The final step on the server side is to inject our initial component HTML and CSS into a template to be rendered on the client side.

```js
function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Material-UI</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <style id="jss-server-side">${css}</style>
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
import { hydrate } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
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
    return <App {...this.props} />
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

hydrate(
  <MuiThemeProvider theme={theme}>
    <Main />
  </MuiThemeProvider>,
  document.querySelector('#root'),
);
```

## Troubleshooting

If it doesn't work, in 99% of cases it's a configuration issue.
A missing property, a wrong call order, or a missing component. We are very strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup, check out our [examples](https://github.com/mui-org/material-ui/tree/master/examples) (Next.js or Gatsby), bit by bit.

### React class name hydration mismatch

There is a class name mismatch between the client and the server.

#### Action to Take

The class names value relies on the concept of [class name generator](/customization/css-in-js#creategenerateclassname-options-class-name-generator).
The whole page needs to be rendered with **a single generator**.
This generator needs to behave identically on the server and on the client.

### CSS Works on only on first load

The CSS is only generated on the first load of the page.
It's missing on the server for consecutive requests.

#### Action to Take

We rely on a cache, the `sheetsManager`, to only inject the CSS once per component type.
You can learn more about [this concept in the documentation](/customization/css-in-js/#sheets-manager).
You need to provide **a new sheet manager cache for each request**.
