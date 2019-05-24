# Installation

<p class="description">Installez Material-UI, le framework d'interface utilisateur React le plus populaire au monde.</p>

Material-UI est disponible sous forme de package [npm](https://www.npmjs.com/package/@material-ui/core).

## npm

Pour installer et enregistrer dans vos dépendances `package.json` , exécutez:

```sh
// avec npm
npm install @material-ui/core

// avec yarn
yarn add @material-ui/core
```

Veuillez noter que [react](https://www.npmjs.com/package/react) >= 16.8.0 et [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0 sont des dépendances.

## La police Roboto

Materiel-UI a été conçu avec la police [Roboto](https://fonts.google.com/specimen/Roboto) à l’esprit. Veillez donc à suivre [ces instructions](/components/typography/#general) . Par exemple, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Polices d'icônes

Pour utiliser le composant de police `Icon`, vous devez d’abord ajouter la police d'icônes [Material](https://material.io/tools/icons/). Voici [quelques instructions](/components/icons/#font-icons) sur la façon de le faire. Par exemple, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

Sinon, si vous utilisez JSX à la place du HTML pour générer le header:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## Icônes SVG

In order to use prebuilt SVG Material icons, such as those found in the [icons demos](/components/icons/) you must first install the [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) package:

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

## CDN

Vous pouvez commencer à utiliser Material-UI avec une infrastructure frontale minimale, idéale pour le prototypage.

We are providing two Universal Module Definition (**UMD**) files:

- un pour le développement: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- un pour la production: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

Vous pouvez suivre [cet exemple CDN](https://github.com/mui-org/material-ui/tree/master/examples/cdn) pour commencer rapidement.

⚠️ We **discourage** using this approach in **production** though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

⚠️ The UMD links are using the `latest` tag to point to the latest version of the library. This pointer is **unstable**, it shifts as we release new versions. You should consider pointing to a specific version like [v3.9.3](https://unpkg.com/@material-ui/core@3.9.3/umd/material-ui.development.js).