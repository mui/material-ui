# Häufige Fragen

<p class="description">Festgefahren bei einem bestimmten Problem? Sehen Sie sich zuerst einige dieser häufig vorkommenden Probleme in unseren FAQ an.</p>

Wenn Sie immer noch nicht finden, wonach Sie suchen, können Sie die Community auf [Spectrum](https://spectrum.chat/material-ui) fragen. Verwenden Sie für Fragen zur Vorgehensweise und zu anderen Problemen [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) anstelle von Github-Problemen. Es gibt ein StackOverflow-Tag namens `material-ui` welchen Sie verwenden können, um Ihre Fragen zu kennzeichnen.

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
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
  overrides: {
    // Name of the component ⚛️
    MuiCssBaseline: {
      // Name of the rule
      '@global': {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application!
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

## Ich habe mehrere Instanzen von Stilen auf der Seite

Wenn in der Konsole eine Warnmeldung wie die folgende angezeigt wird, haben Sie wahrscheinlich mehrere Instanzen von `@material-ui/styles` auf der Seite initialisiert.

> It looks like there are several instances of `@material-ui/styles` initialized in this application. This may cause theme propagation issues, broken class names and makes your application bigger without a good reason.

### Mögliche Gründe

Dafür gibt es mehrere häufige Gründe:

- Sie haben eine andere `@material-ui/styles` Bibliothek irgendwo in Ihren Abhängigkeiten.
- Sie haben eine Monorepo-Struktur für Ihr Projekt (z. B. Lerna, yarn workspaces) und das `@material-ui/styles` Modul ist eine Abhängigkeit in mehr als einem Paket (dieses ist mehr oder weniger dasselbe wie das vorherige).
- Sie haben mehrere Anwendungen, die `@material-ui/styles` verwenden, und auf derselben Seite ausgeführt werden (z. B. werden mehrere Einstiegspunkte im Webpack auf derselben Seite geladen).

### Dupliziertes Modul in node_modules

Wenn Sie der Meinung sind, dass sich das Problem irgendwo in Ihren Abhängigkeiten durch duplizierte @material-ui/styles-Module befindet, gibt es verschiedene Möglichkeiten, dies zu überprüfen. Sie können die `npm ls @material-ui/styles`, `yarn list @material-ui/styles` oder `find -L ./node_modules | grep /@material-ui/styles/package.json` Befehle in Ihrem Anwendungsordner ausführen.

Wenn keiner dieser Befehle die Duplizierung identifiziert, analysieren Sie Ihr Bundle auf mehrere Instanzen von @material-ui/styles. Sie können einfach Ihre Bundle-Quelle überprüfen oder ein Tool wie [source-map-explorer verwenden](https://github.com/danvk/source-map-explorer) oder [Webpack-Bundle-Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).

Wenn Sie festgestellt haben, dass Duplizierung das Problem ist, können sie mehrere Dinge ausprobieren, um dies zu lösen:

Wenn Sie npm verwenden, können Sie versuchen, `npm dedupe` auszuführen. Dieser Befehl durchsucht die lokalen Abhängigkeiten und versucht, die Struktur zu vereinfachen, indem allgemeine Abhängigkeiten weiter nach oben verschoben werden.

Wenn Sie das Webpack verwenden, können Sie die Art und Weise ändern, in der das @material-ui/styles Modul [aufgelöst wird](https://webpack.js.org/configuration/resolve/#resolve-modules). Sie können die Standardreihenfolge überschreiben, in der Webpack nach Abhängigkeiten sucht, und die Priorität Ihrer "node_modules" in Ihrer Anwendung gegenüber der Standardreihenfolge für die Auflösung von Knotenmodulen erhöhen:

```diff
  resolve: {
+   alias: {
+     "@material-ui/styles": path.resolve(appFolder, "node_modules", "@material-ui/styles"),
+   }
  }
```

### Verwendung mit Lerna

Ein möglicher Fix, um @material-ui/styles in einem Lerna-Monorepo oberhalb der Pakete laufen zu lassen, ist es [hoist](https://github.com/lerna/lerna/blob/master/doc/hoist.md) auszuführen, um geteilte Abhängigkeiten zum Stammverzeichnis Ihrer Monorepo-Datei hinzuzufügen. Versuchen Sie, die Bootstrap-Option mit dem Flag --hoist auszuführen.

```sh
lerna bootstrap --hoist
```

Alternativ können Sie @material-ui/styles aus Ihrer package.json-Datei entfernen und manuell in Ihre package.json-Datei an der obersten Ebene einfügen.

Beispiel für eine package.json-Datei in einem Lerna-Stammverzeichnis

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

### Mehrere Anwendungen auf einer Seite ausführen

Wenn Sie mehrere Anwendungen auf einer Seite ausführen, sollten Sie ein @material-ui/styles-Modul für alle verwenden. Wenn Sie Webpack verwenden, können Sie das [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) verwenden. So erstellen Sie einen expliziten [vendor chunk](https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk), das das Modul @ material-ui/styles enthält:

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

## Meine App wird auf dem Server nicht richtig dargestellt

Wenn dies nicht funktioniert, handelt es sich in 99% der Fälle um ein Konfigurationsproblem. Eine fehlende Eigenschaft, eine falsche Aufrufreihenfolge oder eine fehlende Komponente. Bei der Konfiguration sind wir sehr streng. Um herauszufinden, was falsch ist, können Sie am besten Ihr Projekt mit einem bereits funktionierenden Setup vergleichen. Schauen Sie sich unsere [Referenzimplementierungen](/guides/server-rendering/#reference-implementations) an, Stück für Stück.

### CSS funktioniert nur beim ersten Laden, dann fehlt es

Das CSS wird nur beim ersten Laden der Seite generiert. Auf dem Server fehlt dann das CSS bei aufeinanderfolgende Anfragen.

#### Zu ergreifende Maßnahmen

Wir setzen auf einen Cache, den Sheets-Manager, um das CSS nur einmal pro Komponententyp (wenn Sie zwei Schaltflächen verwenden, benötigen Sie nur einmal das CSS der Schaltfläche) zu injizieren. Sie müssen **eine neue ` sheets `Instanze für jede Anfrage** erstellen.

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

- Sie müssen für jede Anforderung einen neuen Klassennamengenerator bereitstellen. Sie sollten jedoch nicht eine `createGenerateClassName()` Funktion zwischen verschiedenen Anfragen teilen:

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

## Warum erfordert Komponente X einen DOM-Knoten in einer Eigenschaft anstelle eines Ref-Objekts?

Komponenten wie das [Portal](/api/portal/#props) oder [Popper](/api/popper/#props) erfordern jeweils einen DOM-Knoten in der `container` oder `anchorEl` Eigenschaft. Es erscheint zweckmäßig, in diesen Eigenschaften einfach ein ref-Objekt zu übergeben und Material-UI auf den aktuellen Wert zugreifen zu lassen. Dies funktioniert in einem einfachen Szenario:

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

wo `Portal` die Kinder nur dann in den Container einhängen würde, wenn `container.current` verfügbar ist. Hier ist eine naive Implementierung von Portal:

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

Mit diesem einfaches heuristischen `Portal` wird es nach dem Einhängen möglicherweise erneut gerendert, da die Refs vor der Ausführung von Effekten auf dem neuesten Stand sind. Nur weil ein Ref aktuell ist, bedeutet das nicht, dass er auf eine definierte Instanz verweist. Wenn der ref an eine ref-Weiterleitungskomponente angehängt ist, ist nicht klar, wann der DOM-Knoten verfügbar ist. Im obigen Beispiel würde das `Portal` einen Effekt einmal ausführen, aber möglicherweise nicht erneut rendern, da `ref.current` ist immer noch `null` ist. Dies ist insbesondere für React.lazy-Komponenten in Suspense wichtig. Die obige Implementierung könnte auch keine Änderung im DOM-Knoten berücksichtigen.

Aus diesem Grund benötigen wir eine Eigenschaft mit dem eigentlichen DOM-Knoten, damit React ermitteln kann, wann das `Portal` neu gerendert werden soll:

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