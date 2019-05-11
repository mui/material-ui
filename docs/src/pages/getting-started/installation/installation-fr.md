# Installation

<p class="description">Installez Material-UI, le framework d'interface utilisateur React le plus populaire au monde.</p>

Material-UI est disponible sous forme de package [npm](https://www.npmjs.com/package/@material-ui/core).

## npm

Pour installer et enregistrer dans vos dépendances `package.json` , exécutez:

```sh
// avec npm
npm install @material-ui/core@next

// avec yarn
yarn add @material-ui/core@next
```

Veuillez noter que [react](https://www.npmjs.com/package/react) >= 16.8.0 et [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0 sont des dépendances.

## La police Roboto

Materiel-UI a été conçu avec la police [Roboto](https://fonts.google.com/specimen/Roboto) à l’esprit. So be sure to follow [these instructions]/components/typography/#general). Par exemple, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Polices d'icônes

Pour utiliser le composant de police `Icon`, vous devez d’abord ajouter la police d'icônes [Material](https://material.io/tools/icons/). Here are [some instructions]/components/icons/#font-icons) on how to do so. Par exemple, via Google Web Fonts:

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
// avec npm
npm install @material-ui/icons@next

// avec yarn
yarn add @material-ui/icons@next
```

## CDN

Vous pouvez commencer à utiliser Material-UI avec une infrastructure frontale minimale, idéale pour le prototypage. Nous déconseillons toutefois d'utiliser cette approche en production - le client doit télécharger la bibliothèque entière, quels que soient les composants réellement utilisés, qui affecte les performances et l'utilisation de la bande passante.

#### Versions UMD

Nous fournissons deux fichiers UMD (Universal Module Definition):

- un pour le développement: https://unpkg.com/@material-ui/core@next/umd/material-ui.development.js
- un pour la production: https://unpkg.com/@material-ui/core@next/umd/material-ui.production.min.js

Vous pouvez suivre [cet exemple de CDN](https://github.com/mui-org/material-ui/tree/next/examples/cdn-next) pour commencer rapidement.