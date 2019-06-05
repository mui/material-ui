# Häufige Fragen

<p class="description">Festgefahren bei einem bestimmten Problem? Sehen Sie sich zuerst einige dieser häufig vorkommenden Probleme in unseren FAQ an.</p>

If you still can't find what you're looking for, you can ask the community in [Spectrum](https://spectrum.chat/material-ui). Verwenden Sie für Fragen zur Vorgehensweise und zu anderen Problemen [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) anstelle von Github-Problemen. Es gibt ein StackOverflow-Tag namens `material-ui` welchen Sie verwenden können, um Ihre Fragen zu kennzeichnen.

## Warum werden meine Komponenten in Produktions-Builds nicht richtig gerendert?

Dies ist wahrscheinlich ein Problem, das aufgrund von Klassennamenskonflikten auftritt, wenn sich Ihr Code in einem Produktionspaket befindet. Damit die Material-UI funktioniert, muss der `Klassenname` die Werte aller Komponenten auf einer Seite von einer einzigen Instanz des [Klassennamensgenerators](/styles/advanced/#class-names) generiert werden.

Um dieses Problem zu beheben, müssen alle Komponenten auf der Seite so initialisiert werden, dass es immer nur **einen Klassennamensgenerator gibt**.

In einer Reihe von Szenarien könnten Sie versehentlich zwei Klassennamengeneratoren verwenden:

- Sie **bündeln**versehentlich zwei Versionen von Material-UI. Möglicherweise hat eine Abhängigkeit die Material-UI nicht korrekt als Peer-Abhängigkeit.
- Sie verwenden den `StylesProvider` für eine **Teilmenge** von deinem React Tree.
- Sie verwenden einen Bundler und der Code wird so aufgeteilt, dass mehrere Klassennamengenerator-Instanzen erstellt werden.

> Wenn Sie Webpack mit dem [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) verwenden, versuchen Sie, den [`RuntimeChunk` Einstellung unter `Optimierungen`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk) zu konfigurieren.

Im Allgemeinen ist es einfach, dieses Problem zu beheben, indem jede Material-UI-Anwendung mit [` StylesProvider`](/styles/api/#stylesprovider) Komponenten oben in ihren Komponentenbäumen verpackt wird **und verwenden einen einzigen Klassennamengenerator, der von ihnen genutzt wird **.

## Warum bewegen sich die fest positionierten Elemente, wenn ein Modal geöffnet wird?

Wir blockieren die Blättern, sobald eine Modalität geöffnet ist. Dies verhindert die Interaktion mit dem Hintergrund, wenn der Modal der einzige interaktive Inhalt sein sollte. Wenn Sie jedoch die Bildlaufleiste entfernen, können Sie Ihre **fest positionierten Elemente ** bewegen. In dieser Situation können Sie einen globalen `.mui-fixed` Klassennamen anwenden, damit Material-UI mit diesen Elementen umgehen kann.

## Wie kann ich den Ripple-Effekt global deaktivieren?

Der Ripple-Effekt kommt ausschließlich von der `BaseButton` Komponente. Sie können den Ripple-Effekt global deaktivieren, indem Sie in Ihrem Theme folgendes angeben:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 
    },
  },
});
```

## Wie kann ich Übergänge global deaktivieren?

Sie können Übergänge global deaktivieren, indem Sie in Ihrem Theme folgendes angeben:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // Jetzt haven wir überall `transition: none;`
    create: () => 'none',
  },
});
```

Manchmal wollen Sie dieses Verhalten bedingt ermöglichen, zum Beispiel während der Prüfung oder auf Low-End-Geräten, in diesen Fällen können Sie dynamisch den Wert des Themes ändern.

Sie können noch einen Schritt weiter gehen, indem Sie alle Übergänge, Animationen und den Welleneffekt deaktivieren:

```js
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  transitions: {
    // Jetzt haben wir überall 'transition: none'
    create: () => 'none',
  },
  overrides: {
    // Name der Komponente ⚛️
    CssBasline: {
      // Name der Regel
      '@global': {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
  props: {
    // Name der Komponente ⚛️
    MuiButtonBase: {
      // Die Eigenschaften, die angewandt werden sollen
      disableRipple: true, // Keine Welleneffekte in der ganzen Applikation!
    },
  },
});
```

## Muss ich JSS verwenden, um meine App zu stylen?

Es wird empfohlen:

- Es wird eingebaut geliefert, so dass keine zusätzlichen Paketgrößen anfallen.
- Es ist schnell & speichereffizient.
- Es verfügt über eine saubere, konsistente API.
- Es unterstützt eine Reihe von erweiterten Funktionen, entweder nativ oder durch Plugins.

Vielleicht fügen Sie jedoch einer App einige Material-UI-Komponenten hinzu, die bereits eine andere Styling-Lösung verwendet, oder Sie sind bereits mit einer anderen API vertraut und wollen keine neue lernen? In diesem Fall gehen Sie zum [Zusammenführen von Style Libraries](/guides/interoperability/) Abschnitt in dem wir zeigen, wie einfach es ist, Material-UI-Komponenten mit alternativen Stilbibliotheken umzustrukturieren.

## Wann verwende ich inline-style vs CSS?

Verwenden Sie als Faustregel Inline-Style nur für dynamische Stileigenschaften. Die CSS-Alternative bietet weitere Vorteile, z.B.:

- Auto-Präfixe
- Besseres debuggen
- Medien-Anfragen
- Keyframes

## Wie verwende ich den react-router?

Wir haben dokumentiert, wie Sie eine [Routing-Bibliothek von Drittanbietern](/components/buttons/#third-party-routing-library) mit der `ButtonBase` Komponente verwenden. Viele interaktive Komponenten verwenden dies intern: `Link`, `Button`, `MenuItem`, `<ListItem button />`, `Tab`, usw. Sie können dieselbe Lösung mit ihnen verwenden.

## Wie kann ich auf das DOM-Element zugreifen?

Alle Material-UI-Komponenten, die etwas im DOM darstellen sollen, leiten ihre an die zugrunde liegende DOM-Komponente weiter. Dies bedeutet, dass Sie die DOM-Elemente, indem Sie den ref lesen, der an die Komponenten der Material-UI angehängt ist:

```jsx
// oder eine Ref-Setter-Funktion
const ref = React.createRef ();
// Rendern
<0 />;
// Verwendung
const Element = ref.current;
```

Wenn Sie nicht sicher sind, ob die Material-UI-Komponente in Frage sein ref weiterleitet, können Sie die Dokumentation API überprüfen unter „Props“ zB die the [/api/button/#props](Button API) enthält

> Der ref wird an das Wurzelelement weitergeleitet.

was anzeigt, dass Sie mit einem ref auf das DOM-Element zugreifen können.

## I have several instances of styles on the page

If you are seeing a warning message in the console like the one below, you probably have several instances of `@material-ui/styles` initialized on the page.

> It looks like there are several instances of `@material-ui/styles` initialized in this application. This may cause theme propagation issues, broken class names and makes your application bigger without a good reason.

### Possible reasons

There are several common reasons for this to happen:

- You have another `@material-ui/styles` library somewhere in your dependencies.
- You have a monorepo structure for your project (e.g, lerna, yarn workspaces) and `@material-ui/styles` module is a dependency in more than one package (this one is more or less the same as the previous one).
- You have several applications that are using `@material-ui/styles` running on the same page (e.g., several entry points in webpack are loaded on the same page).

### Duplicated module in node_modules

If you think that the issue is in duplicated @material-ui/styles module somewhere in your dependencies, there are several ways to check this. You can use `npm ls @material-ui/styles`, `yarn list @material-ui/styles` or `find -L ./node_modules | grep /@material-ui/styles/package.json` commands in your application folder.

If none of these commands identified the duplication, try analyzing your bundle for multiple instances of @material-ui/styles. You can just check your bundle source, or use a tool like [source-map-explorer](https://github.com/danvk/source-map-explorer) or [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

If you identified that duplication is the issue that you are encountering there are several things you can try to solve it:

If you are using npm you can try running `npm dedupe`. This command searches the local dependencies and tries to simplify the structure by moving common dependencies further up the tree.

If you are using webpack, you can change the way it will [resolve](https://webpack.js.org/configuration/resolve/#resolve-modules) the @material-ui/styles module. You can overwrite the default order in which webpack will look for your dependencies and make your application node_modules more prioritized than default node module resolution order:

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Usage with Lerna

One possible fix to get @material-ui/styles to run in a Lerna monorepo across packages, is to [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) shared dependencies to the root of your monorepo file. Try running the bootstrap option with the --hoist flag.

```sh
lerna bootstrap --hoist
```

Alternatively, you can remove @material-ui/styles from your package.json file and hoist it manually to your top-level package.json file.

Example of a package.json file in a Lerna root folder

```json
{
  "name": "my-monorepo",
  "devDependencies": {
    "lerna": "latest"
  },
  "dependencies": {
    "@material-ui/styles": "^4.0.0"
  },
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "start": "lerna run start",
    "build": "lerna run build"
  }
}
```

### Running multiple applications on one page

If you have several applications running on one page, consider using one @material-ui/styles module for all of them. If you are using webpack, you can use [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) to create an explicit [vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), that will contain the @material-ui/styles module:

```diff
  module.exports = {
    entry: {
+     vendor: ["@material-ui/styles"],
      app1: "./src/app.1.js",
      app2: "./src/app.2.js",
    },
    plugins: [
+     new webpack.optimize.CommonsChunkPlugin({
+       name: "vendor",
+       minChunks: Infinity,
+     }),
    ]
  }
```

## My App doesn't render correctly on the server

Wenn dies nicht funktioniert, handelt es sich in 99% der Fälle um ein Konfigurationsproblem. Eine fehlende Eigenschaft, eine falsche Aufrufreihenfolge oder eine fehlende Komponente. We are very strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup, check out our [reference implementations](/guides/server-rendering/#reference-implementations), bit by bit.

### CSS funktioniert nur beim ersten Laden, dann fehlt es

Das CSS wird nur beim ersten Laden der Seite generiert. Auf dem Server fehlt dann das CSS bei aufeinanderfolgende Anfragen.

#### Zu ergreifende Maßnahmen

Wir setzen auf einen Cache, den Sheets-Manager, um das CSS nur einmal pro Komponententyp (wenn Sie zwei Schaltflächen verwenden, benötigen Sie nur einmal das CSS der Schaltfläche) zu injizieren. You need to create **a new `sheets` instance for each request**.

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

Der Klassennamenwert basiert auf dem Konzept des [Klassennamensgenerators](/styles/advanced/#class-names). Die gesamte Seite muss mit **einem einzigen Generator** gerendert werden. Dieser Generator muss sich auf dem Server und auf dem Client identisch verhalten. Zum Beispiel:

- Sie müssen für jede Anforderung einen neuen Klassennamengenerator bereitstellen. But you shouldn't share a `createGenerateClassName()` between different requests:

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

## Warum unterscheiden sich die Farben, die ich sehe, von denen, die ich hier sehe?

Die Dokumentationssite verwendet ein benutzerdefiniertes Theme. Daher unterscheidet sich die Farbpalette vom Standarddesign der Material-UI. Siehe [diese Seite](/customization/themes/), um Informationen zum Anpassen von Motiven zu erhalten.

## Material-UI ist großartig. Wie kann ich das Projekt unterstützen?

Es gibt viele Möglichkeiten, die Material-UI zu unterstützen:

- Verbessern Sie [die Dokumentation](https://github.com/mui-org/material-ui/tree/master/docs).
- Helfen Sie anderen, loszulegen.
- [Verbreiten Sie Material-Ui](https://twitter.com/MaterialUI).
- Beantworten Sie die Fragen auf [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) oder auf [Spectrum](https://spectrum.chat/material-ui).

Wenn Sie die Material-UI in einem kommerziellen Projekt verwenden und ihre weitere Entwicklung unterstützen möchten, indem Sie ein **Sponsor** werden, oder in einem Seiten- oder Hobbyprojekt und möchten ein Geldgeber werden, können Sie dies durch [OpenCollective](https://opencollective.com/material-ui) tun.

Alle erhaltenen Mittel werden transparent verwaltet, und die Sponsoren werden in der README-Datei und auf der Material-UI-Startseite anerkannt.

## Why does component X require a DOM node in a prop instead of a ref object?

Components like the [Portal](/api/portal/#props) or [Popper](/api/popper/#props) require a DOM node in the `container` or `anchorEl` prop respectively. It seems convenient to simply pass a ref object in those props and let Material-UI access the current value. This works in a simple scenario:

```jsx
function App() {
  const container = React.useRef(null);

  return (
    <div className="App">
      <Portal container={container}>
        <span>portaled children</span>
      </Portal>
      <div ref={container} />
    </div>
  );
}
```

where `Portal` would only mount the children into the container when `container.current` is available. Here is a naive implementation of Portal:

```jsx
function Portal({ children, container }) {
  const [node, setNode] = React.useState(null);

  React.useEffect(() => {
    setNode(container.current);
  }, [container]);

  if (node === null) {
    return null;
  }
  return ReactDOM.createPortal(children, node);
}
```

With this simple heuristic `Portal` might re-render after it mounts because refs are up-to-date before any effects run. However, just because a ref is up-to-date doesn't mean it points to a defined instance. If the ref is attached to a ref forwarding component it is not clear when the DOM node will be available. In the above example the `Portal` would run run an effect once but might not re-render because `ref.current` is still `null`. This is especially apparent for React.lazy components in Suspense. The above implementation could also not account for a change in the DOM node.

This is why we require a prop with the actual DOM node so that React can take care of determining when the `Portal` should re-render:

```jsx
function App() {
  const [container, setContainer] = React.useState(null);
  const handleRef = React.useCallback(instance => setContainer(instance), [setContainer])

  return (
    <div className="App">
      <Portal container={container}>
        <span>Portaled</span>
      </Portal>
      <div ref={handleRef} />
    </div>
  );
}
```