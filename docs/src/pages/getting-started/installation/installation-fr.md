# Installation

<p class="description">Installez Material-UI, le framework d'interface utilisateur React le plus populaire au monde.</p>

Material-UI est disponible sous forme de package [npm](https://www.npmjs.com/package/@material-ui/core).

## npm

Pour installer et enregistrer dans votre `package.json` dépendances, exécutez:

```sh
// avec npm
npm install @material-ui/core

// avec yarn
yarn add @material-ui/core
```

Veuillez noter que [react](https://www.npmjs.com/package/react) >= 16.3.0 et [react-dom](https://www.npmjs.com/package/react-dom) >= 16.3.0 sont des dépendances.

## La police Roboto

Matériel-UI a été conçu avec la police [Roboto](https://fonts.google.com/specimen/Roboto) à l’esprit. Veillez donc à suivre [ces instructions](/style/typography/#general) . Par exemple, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

Sinon, si vous utilisez JSX sur HTML pour rendre la tête:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Icônes de polices

Pour utiliser le composant de police `Icon`, vous devez d’abord ajouter la police d'icônes [Material](https://material.io/tools/icons/). Voici [quelques instructions](/style/icons/#font-icons) sur la façon de le faire. Par exemple, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

Sinon, si vous utilisez JSX sur HTML pour rendre la tête:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Icônes SVG

In order to use prebuilt SVG Material icons, such as those found in the [component demos](/demos/app-bar/) you must first install the [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) package:

```sh
npm install @material-ui/icons
```

## CDN

You can start using Material-UI with minimal Front-end infrastructure, which is great for prototyping. We discourage using this approach in production though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilisation.

#### Versions UMD

Nous fournissons deux fichiers UMD (Universal Module Definition):

- one for development: https://unpkg.com/@material-ui/core/umd/material-ui.development.js
- one for production: https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js

Vous pouvez suivre [cet exemple CDN](https://github.com/mui-org/material-ui/tree/master/examples/cdn) pour commencer rapidement.