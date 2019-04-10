# Server-Rendering

<p class="description">Der gebräuchlichste Anwendungsfall für das serverseitige Rendern ist das anfängliche Rendern, wenn ein Benutzer (oder Suchmaschinen-Crawler) Ihre App zum ersten Mal anfordert.</p>

Wenn der Server die Anforderung empfängt, stellt er die erforderlichen Komponenten in einem HTML-String dar und sendet sie als Antwort an den Client. Ab diesem Zeitpunkt übernimmt der Client die Rendering-Aufgaben.

## Material-UI auf dem Server

Die Material-UI wurde von Grund auf mit der Möglichkeit des Renderns auf dem Server entwickelt. Sie müssen jedoch sicherstellen, dass sie korrekt integriert ist. Es ist wichtig, die Seite mit dem erforderlichen CSS zu versehen, andernfalls wird die Seite nur mit HTM-Code gerendert und dann darauf gewartet, dass der Client das CSS einfügt was zu flackern führt (FOUC). Um den Stil in den Client zu injizieren, müssen wir:

1. Eine neue [`ServerStyleSheets`](/css-in-js/api/#serverstylesheets) Instanz bei jede Anfrage erstellen.
2. Den React-Baum mit dem serverseitigen Collector rendern.
3. Das CSS herausziehen.
4. Das CSS zum Client weiterleiten.

Auf der Clientseite wird das CSS ein zweites Mal eingefügt, bevor das serverseitige injizierte CSS entfernt wird.

## Installation

Im folgenden Rezept wird beschrieben, wie das serverseitige Rendering eingerichtet wird.

### Die Server-Seite

Im Folgenden wird beschrieben, wie unsere Serverseite aussehen wird. Wir werden eine[ Express-Middleware](http://expressjs.com/en/guide/using-middleware.html) mit [ app.use ](http://expressjs.com/en/api.html) einrichten, um alle Anfragen zu bearbeiten, die auf unserem Server eingehen. Wenn Sie mit Express oder Middleware nicht vertraut sind, sollten Sie wissen, dass unsere handleRender-Funktion jedes Mal aufgerufen wird, wenn der Server eine Anfrage erhält.

`server.js`

```js
import express from 'express';
import React from 'react';
import App from './App';

// Diese werden in den folgenden Abschnitten gefüllt.
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

Beim Rendern wickeln wir die `App`, unsere Wurzelkomponente, in einem [`StylesProvider`](/css-in-js/api/#stylesprovider) und [`ThemeProvider`](/css-in-js/api/#themeprovider) ein, um die Stilkonfiguration und das `Theme` für alle Komponenten im Komponentenbaum verfügbar zu machen.

Der wichtigste Schritt beim serverseitigen Rendern ist das Rendern des ursprünglichen HTM-Codes unserer Komponente **bevor** wir es an den Kunden senden. Dazu verwenden wir [ReactDOMServer.renderToString()](https://reactjs.org/docs/react-dom-server.html).

Wir erhalten dann das CSS aus unsere `Sheets` mit `sheets.toString()`. Wir werden sehen, wie dies in unserer ` enderFullPage`-Funktion weitergegeben wird.

```jsx
import ReactDOMServer from 'react-dom/server';
import { createMuiTheme } from '@material-ui/core/styles';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

// Erstellen des Theme Objekts.
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
  },
});

function handleRender(req, res) {
  const sheets = new ServerStyleSheets();

  // Rednern des Komponenten als String.
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
```

### Injizieren der ursprüngliche HTML Komponente und CSS

Der letzte Schritt auf der Serverseite ist das Einfügen unserer ursprünglichen HTML Komponente und CSS in eine Vorlage, die auf der Clientseite gerendert werden soll.

```js
function renderFullPage(html, css) {
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

### Die Client-Seite

Die Client-Seite ist unkompliziert. Wir müssen nur das serverseitig erzeugte CSS entfernen. Werfen wir einen Blick auf unsere Client Datei:

`client.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import App from './App';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return <App />;
}

// Ein Theme Objekt wird erstellt.
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
  },
});

ReactDOM.hydrate(
  <ThemeProvider theme={theme}>
    <Main />
  </ThemeProvider>,
  document.querySelector('#root'),
);
```

## Referenzimplementierungen

Wir bieten verschiedene Referenzimplementierungen an, die Sie im [GitHub-Repository](https://github.com/mui-org/material-ui) finden können unter dem [`/examples`](https://github.com/mui-org/material-ui/tree/next/examples) Ordner:

- [Die Referenzimplementierung dieses Tutorials](https://github.com/mui-org/material-ui/tree/next/examples/ssr-next)
- [Gatsby](https://github.com/mui-org/material-ui/tree/next/examples/gatsby-next)
- [Next.js](https://github.com/mui-org/material-ui/tree/next/examples/nextjs-next)

## Problemlösungen

Wenn dies nicht funktioniert, handelt es sich in 99% der Fälle um ein Konfigurationsproblem. Eine fehlende Eigenschaft, eine falsche Aufrufreihenfolge oder eine fehlende Komponente. Bei der Konfiguration sind wir sehr streng. Um herauszufinden, was falsch ist, können Sie am besten Ihr Projekt mit einem bereits funktionierenden Setup vergleichen. Schauen Sie sich unsere [Referenzimplementierungen](#reference-implementations) an, Stück für Stück.

### CSS funktioniert nur beim ersten Laden, dann fehlt es

Das CSS wird nur beim ersten Laden der Seite generiert. Auf dem Server fehlt dann das CSS bei aufeinanderfolgende Anfragen.

#### Zu ergreifende Maßnahmen

Wir setzen auf einen Cache, den Sheets-Manager, um das CSS nur einmal pro Komponententyp (wenn Sie zwei Schaltflächen verwenden, benötigen Sie nur einmal das CSS der Schaltfläche) zu injizieren. Sie müssen **für jede Anfrage ein neues `sheet`** erstellen.

*beispiel für fix:*

```diff
- // Eine Sheet Instanz erstellen.
-const sheets = new ServerStyleSheets();

function handleRender(req, res) {

+ // Eine Sheet Instanz erstellen.
+ const sheets = new ServerStyleSheets();

  //…

  // Rendern des Komponenten als String.
  const html = ReactDOMServer.renderToString(
```

### React Klassenname Hydratation Nichtübereinstimmung

Es gibt eine Nichtübereinstimmung der Klassennamen zwischen Client und Server. Es könnte für die erste Anfrage funktionieren. Ein anderes Symptom ist, dass sich das Styling zwischen dem Laden der ersten Seite und dem Herunterladen der Clientskripte ändert.

#### Zu ergreifende Maßnahmen

Der Klassennamenwert basiert auf dem Konzept des [Klassennamensgenerators](/css-in-js/advanced/#class-names). Die gesamte Seite muss mit **einem einzigen Generator** gerendert werden. Dieser Generator muss sich auf dem Server und auf dem Client identisch verhalten. Zum Beispiel:

- Sie müssen für jede Anforderung einen neuen Klassennamengenerator bereitstellen. Sie können jedoch einen `createGenerateClassName()` Funktion zwischen verschiedenen Anfragen teilen:

*beispiel für fix:*

```diff
- // Erstellen Sie einen neuen Klassennamengenerator.
-const generateClassName = createGenerateClassName();

function handleRender(req, res) {

+ // Erstellt einen neuen Klassennamengenerator.
+ const generateClassName = createGenerateClassName();

  //…

  // Render der Komponente als String.
  const html = ReactDOMServer.renderToString(
```

- Sie müssen sicherstellen, dass auf Ihrem Client und Server die **exakt dieselbe Version** von Material-UI ausführen. Es kann vorkommen, dass eine Nichtübereinstimmung von selbst kleinerer Versionen zu Stilproblemen führen kann. Um die Versionsnummern zu überprüfen, führen Sie `npm list@material-ui/core` in der Umgebung aus, in der Sie Ihre Anwendung erstellen, und in Ihrer Implementierungsumgebung.
    
    Sie können die gleiche Version in verschiedenen Umgebungen festlegen, indem Sie in den Abhängigkeiten Ihrer package.json eine bestimmte MUI-Version angeben.

*beispiel für fix (package.json):*

```diff
  "dependencies": {
    ...

-   "@material-ui/core": "^4.0.0",
+   "@material-ui/core": "4.0.0",
    ...
  },
```

- Sie müssen sicherstellen, dass Server und Client denselben `process.env.NODE_ENV verwenden` Wert haben.