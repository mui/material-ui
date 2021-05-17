# Über das Labor

<p class="description">Dieses Paket enthält die Inkubator-Komponenten, die noch nicht bereit sind, in den Kern aufgenommen zu werden.</p>

Der Hauptunterschied zwischen dem Labor und dem Kern besteht darin, wie die Komponenten versioniert werden. Ein separates Labor-Paket erlaubt es uns, wenn es notwendig ist, nicht rückwärtskompatible Änderungen zu veröffentlichen, ohne die [langsamere Veröffentlichungsfrequenz](https://material-ui.com/versions/#release-frequency) des Kernpakets einzuschränken.

As developers use and test the components and report issues, the maintainers learn more about shortcomings of the components: missing features, accessibility issues, bugs, API design, etc. The older and more used a component is, the less likely it is that new issues will be found and subsequently need to introduce breaking changes.

For a component to be ready to move to the core, the following criteria are considered:

- Folgendes sollte **verwendet werden**. Das Material-UI-Team verwendet neben anderen Metriken Google Analytics Statistiken, um die Nutzung der einzelnen Komponenten zu bewerten. Eine Laborkomponente mit geringem Verbrauch bedeutet entweder, dass sie noch nicht vollständig funktioniert oder dass eine geringe Nachfrage besteht.
- Sie muss der **Codequalität** der Kernkomponenten entsprechen. It doesn't have to be perfect to be a part of the core, but the component should be reliable enough that developers can depend on it.
  - Jede Komponente benötigt **Typdefinitionen**. It is not currently required that a lab component is typed, but it would need to be typed to move to the core.
  - Erfordert eine gute **Testabdeckung**. Some of the lab components don't currently have comprehensive tests.
- Kann es ein **ausschlaggebender Punkt** sein, um Benutzer zu einem Upgrade auf die neueste Hauptversion zu bewegen? The less fragmented the community is, the better.
- Es muss eine geringe Wahrscheinlichkeit für eine **einschneidende Änderung** in der kurzen/mittleren Zukunft bestehen. For instance, if it needs a new feature that will likely require a breaking change, it may be preferable to delay its promotion to the core.

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

In order to benefit from the [CSS overrides](/customization/theme-components/#global-style-overrides) and [default prop customization](/customization/theme-components/#default-props) with the theme, TypeScript users need to import the following types. Internally, it uses [module augmentation](/guides/typescript/#customization-of-theme) to extend the default theme structure with the extension components available in the lab.

```tsx
import '@material-ui/lab/themeAugmentation';

const theme = createTheme({
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});
```
