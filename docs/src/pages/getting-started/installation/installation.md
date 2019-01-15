# Installation

<p class="description">Install Material-UI, the world's most popular React UI framework.</p>

Material-UI is available as an [npm package](https://www.npmjs.com/package/@material-ui/core).

## npm

To install and save in your `package.json` dependencies, run:

```sh
// with npm
npm install @material-ui/core

// with yarn
yarn add @material-ui/core
```

Please note that [react](https://www.npmjs.com/package/react) >= 16.3.0 and [react-dom](https://www.npmjs.com/package/react-dom) >= 16.3.0 are peer dependencies.

## Roboto Font

Material-UI was designed with the [Roboto](https://fonts.google.com/specimen/Roboto)
font in mind. So be sure to follow [these instructions](/style/typography/#general).
For instance, via Google Web Fonts:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

Alternatively, if you are using JSX over HTML to render the head:
```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## Font Icons

In order to use the font `Icon` component you must first add the [Material icons](https://material.io/tools/icons/) font.
Here are [some instructions](/style/icons/#font-icons)
on how to do so.
For instance, via Google Web Fonts:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

Alternatively, if you are using JSX over HTML to render the head:
```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG Icons

In order to use prebuilt SVG Material icons, such as those found in the [component demos](/demos/app-bar/)
you must first install the [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) package:

```sh
npm install @material-ui/icons
```

## CDN

You can start using Material-UI with minimal Front-end infrastructure,
which is great for prototyping. We discourage using this approach in production though -
the client has to download the entire library, regardless of which components are actually used,
affecting performance and bandwidth utilisation.

#### UMD releases

We are providing two Universal Module Definition (UMD) files:

- one for development: https://unpkg.com/@material-ui/core/umd/material-ui.development.js
- one for production: https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js

You can follow [this CDN example](https://github.com/mui-org/material-ui/tree/master/examples/cdn) to quickly get started.
