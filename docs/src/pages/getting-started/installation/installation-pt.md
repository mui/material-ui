# Instalação

<p class="description">Install MUI, the world's most popular React UI framework.</p>

MUI is available as an [npm package](https://www.npmjs.com/package/@mui/material).

## npm

Para instalar e salvar em suas dependências do `package.json`, execute:

```sh
// with npm
npm install @mui/material @emotion/react @emotion/styled

// with yarn
yarn add @mui/material @emotion/react @emotion/styled
```

<!-- #react-peer-version -->

Note que o pacote possui 2 dependências obrigatórias: [react](https://www.npmjs.com/package/react) >= 17.0.0 e [react-dom](https://www.npmjs.com/package/react-dom) >= 17.0.0.

Ou se você quiser utilizar `styled-components` como um motor de estilização:

```sh
// with npm
npm install @mui/material @mui/styled-engine-sc styled-components

// with yarn
yarn add @mui/material @mui/styled-engine-sc styled-components
```

> 💡 Take a look at the [Styled Engine guide](/guides/styled-engine/) for more information about how to configure `styled-components` as the style engine.

## Roboto font

MUI was designed with the [Roboto](https://fonts.google.com/specimen/Roboto) font in mind. So be sure to follow [these instructions](/components/typography/#general). Como alternativa, carregue através do Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Font icons

To use the font `Icon` component, you must first add the [Material icons](https://fonts.google.com/icons) font. Here are [some instructions](/components/icons/#font-icons) on how to do so. Como alternativa, carregue através do Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG icons

In order to use prebuilt SVG Material icons, such as those found in the [icons demos](/components/icons/) you must first install the [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) package:

<!-- #default-branch-switch -->

```sh
// with npm
npm install @mui/icons-material

// with yarn
yarn add @mui/icons-material
```

## CDN

You can start using MUI with minimal Front-end infrastructure, which is great for prototyping.

Two Universal Module Definition (**UMD**) files are provided:

- one for development: https://unpkg.com/@mui/material@latest/umd/material-ui.development.js
- one for production: https://unpkg.com/@mui/material@latest/umd/material-ui.production.min.js

You can follow [this CDN example](https://github.com/mui-org/material-ui/tree/master/examples/cdn) to quickly get started.

⚠️ Using this approach in **production** is **discouraged** though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

⚠️ The UMD links are using the `latest` tag to point to the latest version of the library. This pointer is **unstable**, it shifts as we release new versions. You should consider pointing to a specific version, such as [v5.0.0](https://unpkg.com/@mui/material@5.0.0/umd/material-ui.development.js).

## Recursos de design

<a href="https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="Figma" /></a>
<a href="https://material-ui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-adobe-xd.svg" alt="Adobe XD" /></a>
<a href="https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="Sketch" /></a>

A set of reusable components for design tools is available, designed to match the React components and to help you craft great products:

- [Figma](https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma): A large UI kit with over 600 handcrafted MUI components.
- [Adobe XD](https://material-ui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd): A large UI kit with over 600 handcrafted MUI components.
- [Sketch](https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch): A large UI kit with over 600 handcrafted MUI symbols.
- [Framer](https://packages.framer.com/package/material-ui/material-ui): A small free UI kit of MUI components.
