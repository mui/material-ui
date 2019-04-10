# Häufige Fragen

<p class="description">Festgefahren bei einem bestimmten Problem? Sehen Sie sich zuerst einige dieser häufig vorkommenden Probleme in unseren FAQ an.</p>

Wenn Sie immer noch nicht finden, wonach Sie suchen, können Sie die Community auf [gitter](https://gitter.im/mui-org/material-ui) fragen. Verwenden Sie für Fragen zur Vorgehensweise und zu anderen Problemen [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) anstelle von Github-Problemen. Es gibt ein StackOverflow-Tag namens `material-ui` welchen Sie verwenden können, um Ihre Fragen zu kennzeichnen.

## Warum werden meine Komponenten in Produktions-Builds nicht richtig gerendert?

Dies ist wahrscheinlich ein Problem, das aufgrund von Klassennamenskonflikten auftritt, wenn sich Ihr Code in einem Produktionspaket befindet. Damit die Material-UI funktioniert, muss der `Klassenname` die Werte aller Komponenten auf einer Seite von einer einzigen Instanz des [Klassennamensgenerators](/css-in-js/advanced/#class-names) generiert werden.

Um dieses Problem zu beheben, müssen alle Komponenten auf der Seite so initialisiert werden, dass es immer nur **einen Klassennamensgenerator gibt**.

In einer Reihe von Szenarien könnten Sie versehentlich zwei Klassennamengeneratoren verwenden:

- Sie **bündeln**versehentlich zwei Versionen von Material-UI. Möglicherweise hat eine Abhängigkeit die Material-UI nicht korrekt als Peer-Abhängigkeit.
- Sie verwenden den `StylesProvider` für eine **Teilmenge** von deinem React Tree.
- Sie verwenden einen Bundler und der Code wird so aufgeteilt, dass mehrere Klassennamengenerator-Instanzen erstellt werden.

> Wenn Sie Webpack mit dem [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) verwenden, versuchen Sie, den [`RuntimeChunk` Einstellung unter `Optimierungen`](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk) zu konfigurieren.

Im Allgemeinen ist es einfach, dieses Problem zu beheben, indem jede Material-UI-Anwendung mit [` StylesProvider`](/css-in-js/api/#stylesprovider) Komponenten oben in ihren Komponentenbäumen verpackt wird **und verwenden einen einzigen Klassennamengenerator, der von ihnen genutzt wird **.

⚠️ Wenn Sie es eilig haben, bieten wir eine Option als schnelle Notlösung, um die Klassennamen **deterministisch** zu machen: [`gefährliche UseGlobalCSS `](/css-in-js/advanced/#deterministic-class-names).

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

## Wie kann ich Animationen global deaktivieren?

Sie können Animationen global deaktivieren, indem Sie in Ihrem Theme folgendes angeben:

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

## Muss ich JSS verwenden, um meine App zu stylen?

Es ist sehr zu empfehlen:

- Es wird eingebaut geliefert, so dass keine zusätzlichen Paketgrößen anfallen.
- Es ist schnell & speichereffizient.
- Es verfügt über eine saubere, konsistente [API](https://cssinjs.org/json-api/).
- Es unterstützt eine Reihe von erweiterten Funktionen, entweder nativ oder durch [ Plugins](https://cssinjs.org/plugins/).

Vielleicht fügen Sie jedoch einer App einige Material-UI-Komponenten hinzu, die bereits eine andere Styling-Lösung verwendet, oder Sie sind bereits mit einer anderen API vertraut und wollen keine neue lernen? In diesem Fall gehen Sie zum [Zusammenführen von Style Libraries](/guides/interoperability/) Abschnitt in dem wir zeigen, wie einfach es ist, Material-UI-Komponenten mit alternativen Stilbibliotheken umzustrukturieren.

## Wann sollte ich Inline-Styles und wann Klassen verwenden?

Verwenden Sie als Faustregel Inline-Style nur für dynamische Stileigenschaften. Die CSS-Alternative bietet weitere Vorteile, z.B.:

- Auto-Präfixe
- Besseres debuggen
- Medien-Anfragen
- Keyframes

## Wie verwende ich den react-router?

Wir haben dokumentiert, wie Sie eine [Routing-Bibliothek von Drittanbietern](/demos/buttons/#third-party-routing-library) mit der `ButtonBase` Komponente verwenden. Viele unserer interaktiven Komponenten verwenden es intern: `Button`, `Menüelement`, ` <1 /> `, `Tab`, usw. Sie können dieselbe Lösung mit ihnen verwenden.

## Wie kombiniere ich die `withStyles()` und `withTheme` HOCs?

Es gibt verschiedene Möglichkeiten:

**`withTheme` Option:**

```js
export default withStyles(styles, { withTheme: true })(Modal);
```

**`compose ()` Helferfunktion:**

```js
import { compose } from 'recompose';

export default compose(
  withTheme,
  withStyles(styles)
)(Modal);
```

**rohe Funktionsverkettung:**

```js
export default withTheme(withStyles(styles)(Modal));
```

## Wie kann ich auf das DOM-Element zugreifen?

Wickeln Sie die Komponente mit dem [`RootRef`](/api/root-ref/) Helfer ein.

## Warum unterscheiden sich die Farben, die ich sehe, von denen, die ich hier sehe?

Die Dokumentationssite verwendet ein benutzerdefiniertes Theme. Daher unterscheidet sich die Farbpalette vom Standarddesign der Material-UI. Siehe [diese Seite](/customization/themes/), um Informationen zum Anpassen von Motiven zu erhalten.

## Material-UI ist großartig. Wie kann ich das Projekt unterstützen?

Es gibt viele Möglichkeiten, die Material-UI zu unterstützen:

- Verbessern Sie [die Dokumentation](https://github.com/mui-org/material-ui/tree/next/docs).
- Helfen Sie anderen, loszulegen.
- [Verbreiten Sie Material-Ui](https://twitter.com/MaterialUI).
- Beantworten Sie die Fragen auf [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) oder auf [Spectrum](https://spectrum.chat/material-ui).

Wenn Sie die Material-UI in einem kommerziellen Projekt verwenden und ihre weitere Entwicklung unterstützen möchten, indem Sie ein **Sponsor** werden, oder in einem Seiten- oder Hobbyprojekt und möchten ein Geldgeber werden, können Sie dies durch [OpenCollective](https://opencollective.com/material-ui) tun.

Alle erhaltenen Mittel werden transparent verwaltet, und die Sponsoren werden in der README-Datei und auf der Material-UI-Startseite anerkannt.