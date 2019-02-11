# Installation

<p class="description">Installieren Sie Material-UI, das weltweit beliebteste React UI-Framework.</p>

Material-UI ist als [npm-Paket](https://www.npmjs.com/package/@material-ui/core) verfügbar.

## npm

Um die Abhängigkeit zu ihrer `package.json` hinzuzufügen, führen Sie folgenden Befehl aus:

```sh
// mit npm
npm install @material-ui/core

// mit yarn
yarn add @material-ui/core
```

Beachten Sie, dass [react](https://www.npmjs.com/package/react) >= 16.3.0 und [react-dom](https://www.npmjs.com/package/react-dom) >= 16.3.0 Abhängigkeiten in Ihrem Projekt sein müssen.

## Die Roboto Schrift

Material-UI wurde mit Blick auf die [Roboto](https://fonts.google.com/specimen/Roboto)-Schrift designed. Bitte folgen Sie daher [diesen Anweisungen](/style/typography/#general). Zum Beispiel über Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

Oder, falls sie JSX anstatt HTML benutzen, um den Head zu rendern:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Font Icons

In order to use the font `Icon` component you must first add the [Material icons](https://material.io/tools/icons/) font. Here are [some instructions](/style/icons/#font-icons) on how to do so. Zum Beispiel über Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

Oder, falls sie JSX anstatt HTML benutzen, um den Head zu rendern:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG Icons

In order to use prebuilt SVG Material icons, such as those found in the [component demos](/demos/app-bar/) you must first install the [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) package:

```sh
npm install @material-ui/icons
```

## CDN

You can start using Material-UI with minimal Front-end infrastructure, which is great for prototyping. We discourage using this approach in production though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilisation.

#### UMD releases

We are providing two Universal Module Definition (UMD) files:

- one for development: https://unpkg.com/@material-ui/core/umd/material-ui.development.js
- one for production: https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js

You can follow [this CDN example](https://github.com/mui-org/material-ui/tree/next/examples/cdn) to quickly get started.