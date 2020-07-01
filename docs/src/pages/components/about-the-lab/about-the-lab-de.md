# Über das Labor

<p class="description">Dieses Paket enthält die Inkubator-Komponenten, die noch nicht bereit sind, in den Kern aufgenommen zu werden.</p>

Der Hauptunterschied zwischen dem Labor und dem Kern besteht darin, wie die Komponenten versioniert werden. Mit einem separaten Laborpaket können wir bei Bedarf wichtige Änderungen freigeben, während das Kernpaket folgen die [Release Regeln](https://material-ui.com/versions/#release-frequency).

As developers use and test the components and report issues, the maintainers learn more about shortcomings of the components: missing features, accessibility issues, bugs, API design, etc. The older and more used a component is, the less likely it is that new issues will be found and subsequently need to introduce breaking changes.

For a component to be ready to move to the core, the following criteria are considered:

* Es muss **verwendet werden**. Das Material-UI-Team verwendet neben anderen Metriken Google Analytics Statistiken, um die Nutzung der einzelnen Komponenten zu bewerten. Eine Laborkomponente mit geringem Verbrauch bedeutet entweder, dass sie noch nicht vollständig funktioniert oder dass eine geringe Nachfrage besteht.
* It needs to match the **code quality** of the core components. It doesn't have to be perfect to be a part of the core, but the component should be reliable enough that developers can depend on it. 
    * Each component needs **type definitions**. It is not currently required that a lab component is typed, but it would need to be typed to move to the core.
    * Requires good **test coverage**. Some of the lab components don't currently have comprehensive tests.
* Can it be used as **leverage** to incentivize users to upgrade to the latest major release? The less fragmented the community is, the better.
* It needs to have a low probability of a **breaking change** in the short/medium future. For instance, if it needs a new feature that will likely require a breaking change, it may be preferable to delay its promotion to the core.

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

const theme = createMuiTheme({
  overrides: {
    MuiTimeline: {
      root: {
        backgroundColor: 'red',
      },
    },
  },
});
```