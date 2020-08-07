# Server-Rendering

<p class="description">Der gebräuchlichste Anwendungsfall für das serverseitige Rendern ist das anfängliche Rendern, wenn ein Benutzer (oder Suchmaschinen-Crawler) Ihre App zum ersten Mal anfordert.</p>

Wenn der Server die Anforderung empfängt, stellt er die erforderlichen Komponenten in einem HTML-String dar und sendet sie als Antwort an den Client. Ab diesem Zeitpunkt übernimmt der Client die Rendering-Aufgaben.

## Material-UI auf dem Server

Die Client-Seite ist unkompliziert. Wir müssen nur das serverseitig erzeugte CSS entfernen. Let's take a look at the client file:

1. Eine neue [`ServerStyleSheets`](/styles/api/#serverstylesheets) Instanz bei jede Anfrage erstellen.
2. Den React-Baum mit dem serverseitigen Collector rendern.
3. Das CSS herausziehen.
4. Das CSS zum Client weiterleiten.

Auf der Clientseite wird das CSS ein zweites Mal eingefügt, bevor das serverseitige injizierte CSS entfernt wird.

## Installation

Im folgenden Rezept wird beschrieben, wie das serverseitige Rendering eingerichtet wird.

### Das Theme

Create a theme that will be shared between the client and the server:

`theme.js`

```js
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Erstellen Sie eine Theme-Instanz.
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

### Die Server-Seite

The following is the outline for what the server-side is going to look like. We are going to set up an [Express middleware](https://expressjs.com/en/guide/using-middleware.html) using [app.use](https://expressjs.com/en/api.html) to handle all requests that come in to the server. If you're unfamiliar with Express or middleware, just know that the handleRender function will be called every time the server receives a request.

`server.js`

```js
import express from 'express';

// Diese werden wir in den folgenden Abschnitten ausfüllen.
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

### Verarbeiten der Anfrage

Als Erstes müssen wir bei jeder Anfrage ein neues `ServerStyleSheets` erstellen.

When rendering, we will wrap `App`, the root component, inside a [`StylesProvider`](/styles/api/#stylesprovider) and [`ThemeProvider`](/styles/api/#themeprovider) to make the style configuration and the `theme` available to all components in the component tree.

The key step in server-side rendering is to render the initial HTML of the component **before** we send it to the client side. Dazu verwenden wir [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html).

We then get the CSS from the `sheets` using `sheets.toString()`. We will see how this is passed along in the `renderFullPage` function.

```jsx
res.send(renderFullPage(html, css));
}

const app = express();

app.use('/build', express.static('build'));

// Dies wird jedes Mal ausgelöst, wenn der Server eine Anfrage erhält.
  const css = sheets.toString();

  // Zurücksenden der gerenderten Seite an den Client.
  import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
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

  // Grab the CSS from the sheets.
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### Injizieren der ursprüngliche HTML Komponente und CSS

The final step on the server-side is to inject the initial component HTML and CSS into a template to be rendered on the client side.

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

### Die Client-Seite

Die Client-Seite ist unkompliziert. Wir müssen nur das serverseitig erzeugte CSS entfernen. Let's take a look at the client file:

`client.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
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

## Referenzimplementierungen

Wir bieten verschiedene Referenzimplementierungen an, die Sie im [GitHub-Repository](https://github.com/mui-org/material-ui) finden können unter dem [`/examples`](https://github.com/mui-org/material-ui/tree/master/examples) Ordner:

- [Die Referenzimplementierung dieses Tutorials](https://github.com/mui-org/material-ui/tree/master/examples/ssr)
- [Gatsby](https://github.com/mui-org/material-ui/tree/master/examples/gatsby)
- [Next.js](https://github.com/mui-org/material-ui/tree/master/examples/nextjs)

## Problemlösungen

Check out the FAQ answer: [My App doesn't render correctly on the server](/getting-started/faq/#my-app-doesnt-render-correctly-on-the-server).