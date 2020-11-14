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
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Polices d'icônes

Voici [quelques instructions](/components/icons/#font-icons) sur la façon de le faire. In order to use the font `Icon` component, you must first add the [Material icons](https://material.io/tools/icons/) font. Par exemple, via Google Web Fonts:

```html
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

Two Universal Module Definition (**UMD**) files are provided:

- un pour le développement: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- un pour la production: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

Vous pouvez suivre [cet exemple CDN](https://github.com/mui-org/material-ui/tree/master/examples/cdn) pour commencer rapidement.

⚠️ Using this approach in **production** is **discouraged** though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

⚠️ The UMD links are using the `latest` tag to point to the latest version of the library. This pointer is **unstable**, it shifts as we release new versions. You should consider pointing to a specific version, such as [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js).

## Design resources

<a href="https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>
<a href="https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>

A set of reusable components for design tools is available, designed to match the React components, and to help you craft great products:

- <strong x-id="1">Sketch</strong>: [Sketch for Material-UI](https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=related-projects-sketch) — A large UI kit with over 600 handcrafted Material-UI's symbols 💎.
- <strong x-id="1">Figma</strong>: [Figma for Material-UI](https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=related-projects-sketch) — A large UI kit with over 600 handcrafted Material-UI's components 🎨.
- <strong x-id="1">Framer</strong>: [Framer for Material-UI](https://packages.framer.com/package/material-ui/material-ui) — A small MIT UI kit preview of handcrafted Material-UI's component.