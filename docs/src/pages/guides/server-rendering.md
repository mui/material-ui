# Server Rendering

The most common use case for server-side rendering is to handle the *initial render* when a user (or search engine crawler) first requests our app.
When the server receives the request, it renders the required component(s) into an HTML string, and then sends it as a response to the client.
From that point on, the client takes over rendering duties.

## Material-UI on the Server

Material-UI was designed from the ground-up with the constraint of rendering on the Server, but it's up to users to makes sure it's correctly integrated.
We must provide to the page the needed style.
It's important that we provide the page with the required CSS, otherwise the page will render with just the HTML then wait for the CSS to be injected by the client, causing it to flicker.
To inject the style down to the client, we need to:

1. Create a fresh, new `styleManager` and `theme` instance on every request.
2. Render the React tree with the server-side API and the instance.
3. Pull the CSS out of the `styleManager`.
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
import path from 'path';
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

The first thing that we need to do on every request is create a new `styleManager` and `theme` instance.

When rendering, we will wrap `<App />`, our root component,
inside a `<MuiThemeProvider>` to make the `styleManage` and the `theme` available to all components in the component tree.

The key step in server side rendering is to render the initial HTML of our component **before** we send it to the client side. To do this, we use [ReactDOMServer.renderToString()](https://facebook.github.io/react/docs/react-dom-server.html).

We then get the CSS from our `styleManager` using `styleManager.sheetsToString()`. We will see how this is passed along in our `renderFullPage` function.

```js
import { renderToString } from 'react-dom/server'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { green, red } from 'material-ui/styles/colors';

function createStyleManager() {
  return MuiThemeProvider.createDefaultContext({
    theme: createMuiTheme({
      palette: createPalette({
        primary: green,
        accent: red,
        type: 'light',
      }),
    }),
  });
}

function handleRender(req, res) {
  // Create a styleManager instance.
  const { styleManager, theme } = createStyleManager();

  // Render the component to a string.
  const html = renderToString(
    <MuiThemeProvider styleManager={styleManager} theme={theme}>
      <App />
    </MuiThemeProvider>
  )

  // Grab the CSS from our styleManager.
  const css = styleManager.sheetsToString()

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

The client side is straightforward. All we need to do is removing the server-side generated CSS.
Let's take a look at our client file:

`client.js`

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider,  createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { green, red } from 'material-ui/styles/colors';
import App from './App';

function createStyleManager() {
  return MuiThemeProvider.createDefaultContext({
    theme: createMuiTheme({
      palette: createPalette({
        primary: green,
        accent: red,
        type: 'light',
      }),
    }),
  });
}

class Main extends Component {
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

// Create a styleManager instance.
const { styleManager, theme } = createStyleManager();

render(
  <MuiThemeProvider styleManager={styleManager} theme={theme}>
    <Main />
  </MuiThemeProvider>,
  document.querySelector('#root'),
);
```
