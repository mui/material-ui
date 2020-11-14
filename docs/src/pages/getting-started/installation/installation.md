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

Please note that [react](https://www.npmjs.com/package/react) >= 16.8.0 and [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0 are peer dependencies.

## Roboto Font

Material-UI was designed with the [Roboto](https://fonts.google.com/specimen/Roboto)
font in mind. So be sure to follow [these instructions](/components/typography/#general).
For instance, via Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Font Icons

In order to use the font `Icon` component, you must first add the [Material icons](https://material.io/tools/icons/) font.
Here are [some instructions](/components/icons/#font-icons)
on how to do so.
For instance, via Google Web Fonts:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG Icons

In order to use prebuilt SVG Material icons, such as those found in the [icons demos](/components/icons/)
you must first install the [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) package:

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

## CDN

You can start using Material-UI with minimal Front-end infrastructure,
which is great for prototyping.

Two Universal Module Definition (**UMD**) files are provided:

- one for development: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- one for production: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

You can follow [this CDN example](https://github.com/mui-org/material-ui/tree/master/examples/cdn) to quickly get started.

⚠️ Using this approach in **production** is **discouraged** though -
the client has to download the entire library, regardless of which components are actually used,
affecting performance and bandwidth utilization.

⚠️ The UMD links are using the `latest` tag to point to the latest version of the library.
This pointer is **unstable**, it shifts as we release new versions.
You should consider pointing to a specific version, such as [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js).

## Design resources

<a href="https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>
<a href="https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>

A set of reusable components for design tools is available, designed to match the React components, and to help you craft great products:

- [Sketch](https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=related-projects-sketch): A large UI kit with over 600 handcrafted Material-UI symbols.
- [Figma](https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=related-projects-figma): A large UI kit with over 600 handcrafted Material-UI components.
- [Framer](https://packages.framer.com/package/material-ui/material-ui): A small free UI kit of Material-UI components.
