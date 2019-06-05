# Server-Rendering

<p class="description">Der gebräuchlichste Anwendungsfall für das serverseitige Rendern ist das anfängliche Rendern, wenn ein Benutzer (oder Suchmaschinen-Crawler) Ihre App zum ersten Mal anfordert.</p>

Wenn der Server die Anforderung empfängt, stellt er die erforderlichen Komponenten in einem HTML-String dar und sendet sie als Antwort an den Client. Ab diesem Zeitpunkt übernimmt der Client die Rendering-Aufgaben.

## Material-UI auf dem Server

Die Material-UI wurde von Grund auf mit der Möglichkeit des Renderns auf dem Server entwickelt. Sie müssen jedoch sicherstellen, dass sie korrekt integriert ist. Es ist wichtig, die Seite mit dem erforderlichen CSS zu versehen, andernfalls wird die Seite nur mit HTM-Code gerendert und dann darauf gewartet, dass der Client das CSS einfügt was zu flackern führt (FOUC). Um den Stil in den Client zu injizieren, müssen wir:

1. Eine neue [`ServerStyleSheets`](/styles/api/#serverstylesheets) Instanz bei jede Anfrage erstellen.
2. Den React-Baum mit dem serverseitigen Collector rendern.
3. Das CSS herausziehen.
4. Das CSS zum Client weiterleiten.

Auf der Clientseite wird das CSS ein zweites Mal eingefügt, bevor das serverseitige injizierte CSS entfernt wird.

## Installation

Im folgenden Rezept wird beschrieben, wie das serverseitige Rendering eingerichtet wird.

### Das Theme

Wir erstellen ein Theme, das vom Client und vom Server gemeinsam genutzt wird.

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

Im Folgenden wird beschrieben, wie unsere Serverseite aussehen wird. Wir werden eine[ Express-Middleware](http://expressjs.com/en/guide/using-middleware.html) mit [ app.use ](http://expressjs.com/en/api.html) einrichten, um alle Anfragen zu bearbeiten, die auf unserem Server eingehen. Wenn Sie mit Express oder Middleware nicht vertraut sind, sollten Sie wissen, dass unsere handleRender-Funktion jedes Mal aufgerufen wird, wenn der Server eine Anfrage erhält.

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

Beim Rendern wickeln wir die `App`, unsere Wurzelkomponente, in einem [`StylesProvider`](/styles/api/#stylesprovider) und [`ThemeProvider`](/styles/api/#themeprovider) ein, um die Stilkonfiguration und das `Theme` für alle Komponenten im Komponentenbaum verfügbar zu machen.

Der wichtigste Schritt beim serverseitigen Rendern ist das Rendern des ursprünglichen HTM-Codes unserer Komponente **bevor** wir es an den Kunden senden. Dazu verwenden wir [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html).

Wir erhalten dann das CSS aus unsere `Sheets` mit `sheets.toString()`. Wir werden sehen, wie dies in unserer ` enderFullPage`-Funktion weitergegeben wird.

```jsx
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import App from './App';
import theme from './theme';

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  // Rendern Sie die Komponente in einen String.
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
    ),
  );

  // Entnahme des CSS aus dem Sheet.
  const css = sheets.toString();

  // Zurücksenden der gerenderten Seite an den Client.
  res.send(renderFullPage(html, css));
}

const app = express();

app.use('/build', express.static('build'));

// Dies wird jedes Mal ausgelöst, wenn der Server eine Anfrage erhält.
app.use(handleRender);

const port = 3000;
app.listen(port);
```

### Injizieren der ursprüngliche HTML Komponente und CSS

Der letzte Schritt auf der Serverseite ist das Einfügen unserer ursprünglichen HTML Komponente und CSS in eine Vorlage, die auf der Clientseite gerendert werden soll.

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

Die Client-Seite ist unkompliziert. Wir müssen nur das serverseitig erzeugte CSS entfernen. Werfen wir einen Blick auf unsere Client Datei:

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

## Referenzimplementierungen

Wir bieten verschiedene Referenzimplementierungen an, die Sie im [GitHub-Repository](https://github.com/mui-org/material-ui) finden können unter dem [`/examples`](https://github.com/mui-org/material-ui/tree/master/examples) Ordner:

- [Die Referenzimplementierung dieses Tutorials](https://github.com/mui-org/material-ui/tree/master/examples/ssr)
- [Gatsby](https://github.com/mui-org/material-ui/tree/master/examples/gatsby)
- [Next.js](https://github.com/mui-org/material-ui/tree/master/examples/nextjs)

## Problemlösungen

Check out our FAQ answer: [My App doesn't render correctly on the server](/getting-started/faq/#my-app-doesnt-render-correctly-on-the-server).