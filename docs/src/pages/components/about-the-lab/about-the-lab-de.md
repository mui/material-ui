# Über das Labor

<p class="description">Dieses Paket enthält die Inkubator-Komponenten, die noch nicht bereit sind, in den Kern aufgenommen zu werden.</p>

Der Hauptunterschied zwischen dem Labor und dem Kern besteht darin, wie die Komponenten versioniert werden. Ein separates Labor-Paket erlaubt es uns, wenn es notwendig ist, nicht rückwärtskompatible Änderungen zu veröffentlichen, ohne die [langsamere Veröffentlichungsfrequenz](https://material-ui.com/versions/#release-frequency) des Kernpakets einzuschränken.

Während Entwickler die Komponenten verwenden, testen und Probleme melden, erfahren die Betreuer (Maintainer) mehr über Mängel der Komponenten: fehlende Features, Barrierefreiheit, Fehler, API-Design usw. Je älter und mehr verwendet eine Komponente ist, desto weniger wahrscheinlich ist es, dass neue Probleme gefunden werden und in der Folge, große Änderungen eingeführt werden müssen.

Damit eine Komponente zum Kern (Core) übergehen kann, werden folgende Kriterien berücksichtigt:

* Es muss **verwendet werden**. Das Material-UI-Team verwendet neben anderen Metriken Google Analytics Statistiken, um die Nutzung der einzelnen Komponenten zu bewerten. Eine Laborkomponente mit geringem Verbrauch bedeutet entweder, dass sie noch nicht vollständig funktioniert oder dass eine geringe Nachfrage besteht.
* Es muss mit der **Code-Qualität** der Kernkomponenten übereinstimmen. Es muss nicht perfekt sein, um ein Teil des Kerns zu sein, aber die Komponente sollte so zuverlässig sein, dass die Entwickler darauf aufbauen können. 
    * Jede Komponente benötigt **Typdefinitionen**. Es ist derzeit nicht erforderlich, dass eine Test-Kompontente angegeben wird, aber sie muss angegeben werden, um in den Kern (Core) zu wechseln.
    * Erfordert eine gute **Testabdeckung**. Einige der Test-Komponenten haben derzeit keine umfassenden Tests.
* Kann es ein **ausschlaggebender Punkt** sein, um Benutzer zu einem Upgrade auf die neueste Hauptversion zu bewegen? Je weniger zersplittert die Gemeinschaft ist, desto besser.
* Es muss eine geringe Wahrscheinlichkeit für eine **einschneidende Änderung** in der kurzen/mittleren Zukunft bestehen. Zum Beispiel, wenn es eine neue Funktion benötigt, die wahrscheinlich eine einschneidende Änderung erfordert, ist es vielleicht besser, seine Aufnahme in den Kern zu verschieben.

## Installation

Installieren Sie das Paket innerhalb des Projektordners mit:

```sh
// mit npm
npm install @material-ui/lab

// mit yarn
yarn add @material-ui/lab
```

Das Labor hat eine Peer-Abhängigkeit von den Kernkomponenten. Wenn Sie in Ihrem Projekt noch keine Material-UI verwenden, können Sie es mit folgendem installieren:

```sh
// mit npm
npm install @material-ui/core

// mit yarn
yarn add @material-ui/core
```

## TypeScript

In order to benefit from the [CSS overrides](/customization/globals/#css) and [default prop customization](/customization/globals/#default-props) with the theme, TypeScript users need to import the following types. Internally, it uses [module augmentation](/guides/typescript/#customization-of-theme) to extend the default theme structure with the extension components available in the lab.

```tsx
import type '@material-ui/lab/themeAugmentation';

const theme = createTheme({
  overrides: {
    MuiTimeline: {
      root: {
        backgroundColor: 'red',
      },
    },
  },
});
```