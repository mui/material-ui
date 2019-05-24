# Server Rendering

<p class="description">The most common use case for server-side rendering is to handle the initial render when a user (or search engine crawler) first requests your app.</p>

When the server receives the request, it renders the required component(s) into an HTML string, and then sends it as a response to the client. From that point on, the client takes over rendering duties.

## Material-UI on the server

Material-UI was designed from the ground-up with the constraint of rendering on the server, but it's up to you to make sure it's correctly integrated. It's important to provide the page with the required CSS, otherwise the page will render with just the HTML then wait for the CSS to be injected by the client, causing it to flicker (FOUC). To inject the style down to the client, we need to:

1. Create a fresh, new [`ServerStyleSheets`](/styles/api/#serverstylesheets) instance on every request.
2. Render the React tree with the server-side collector.
3. Pull the CSS out.
4. Pass the CSS along to the client.

On the client side, the CSS will be injected a second time before removing the server-side injected CSS.

## Setting Up

In the following recipe, we are going to look at how to set up server-side rendering.

### The theme

We create a theme that will be shared between the client and the server.

`theme.js`

```js
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
```

### The server-side

The following is the outline for what our server-side is going to look like. We are going to set up an [Express middleware](http://expressjs.com/en/guide/using-middleware.html) using [app.use](http://expressjs.com/en/api.html) to handle all requests that come in to our server. If you're unfamiliar with Express or middleware, just know that our handleRender function will be called every time the server receives a request.

`server.js`

```js
import express from 'express';

// We are going to fill these out in the sections to follow.
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

### Handling the Request

The first thing that we need to do on every request is create a new `ServerStyleSheets`.

When rendering, we will wrap `App`, our root component, inside a [`StylesProvider`](/styles/api/#stylesprovider) and [`ThemeProvider`](/styles/api/#themeprovider) to make the style configuration and the `theme` available to all components in the component tree.

The key step in server-side rendering is to render the initial HTML of our component **before** we send it to the client side. To do this, we use [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html).

We then get the CSS from our `sheets` using `sheets.toString()`. We will see how this is passed along in our `renderFullPage` function.

```jsx
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './theme';

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
    ),
  );

  // Grab the CSS from our sheets.
  const css = sheets.toString();

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css));
}

const app = express();

app.use('/build', express.static('build'));

// This is fired every time the server-side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### Inject Initial Component HTML and CSS

The final step on the server-side is to inject our initial component HTML and CSS into a template to be rendered on the client side.

```js
function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My page</title>
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
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './theme';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

ReactDOM.hydrate(<Main />, document.querySelector('#root'));
```

## Reference implementations

We host different reference implementations which you can find in the [GitHub repository](https://github.com/mui-org/material-ui) under the [`/examples`](https://github.com/mui-org/material-ui/tree/master/examples) folder:

- [The reference implementation of this tutorial](https://github.com/mui-org/material-ui/tree/master/examples/ssr)
- [Gatsby](https://github.com/mui-org/material-ui/tree/master/examples/gatsby)
- [Next.js](https://github.com/mui-org/material-ui/tree/master/examples/nextjs)

## Troubleshooting

Check out our FAQ answer: [My App doesn't render correctly on the server](/getting-started/faq/#my-app-doesnt-render-correctly-on-the-server).