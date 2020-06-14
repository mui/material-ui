# A propos du lab

<p class="description">Ce package contient des composants en incubation (en développement) qui ne sont pas encore prêts à être ajoutés au package principal.</p>

La principale différence entre le laboratoire et le noyau est la façon dont les composants sont versionnés. Le fait de disposer d'un paquet de laboratoire séparé nous permet de publier les modifications de rupture si nécessaire, tandis que le paquet de base suit une [politique plus lente](https://material-ui.com/versions/#release-frequency).

As developers use and test the components and report issues, the maintainers learn more about shortcomings of the components: missing features, accessibility issues, bugs, API design, etc. The older and more used a component is, the less likely it is that new issues will be found and subsequently need to introduce breaking changes.

For a component to be ready to move to the core, the following criteria are considered:

* It needs to be **used**. The Material-UI team uses Google Analytics stats among other metrics to evaluate the usage of each component. A lab component with low usage either means that it isn't fully working yet or that there is a low demand for it.
* It needs to match the **code quality** of the core components. It doesn't have to be perfect to be a part of the core, but the component should be reliable enough that developers can depend on it. 
    * Each component needs **type definitions**. It is not currently required that a lab component is typed, but it would need to be typed to move to the core.
    * Requires good **test coverage**. Some of the lab components don't currently have comprehensive tests.
* Can it be used as **leverage** to incentivize users to upgrade to the latest major release? The less fragmented the community is, the better.
* It needs to have a low probability of a **breaking change** in the short/medium future. For instance, if it needs a new feature that will likely require a breaking change, it may be preferable to delay its promotion to the core.

## Installation

Installez le package dans votre répertoire de projet avec:

```sh
// avec npm
npm install @material-ui/lab

// avec yarn
yarn add @material-ui/lab
```

Le laboratoire dépend des composants du package principal. Si vous n'utilisez pas encore Material-UI dans votre projet, vous pouvez l'installer avec:

```sh
// avec npm
npm install @material-ui/core

// avec yarn
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