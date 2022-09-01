# Installation

<p class="description">Install Material UI, the world's most popular React UI framework.</p>

## Default installation

Run one of the following commands to add Material UI to your project:

### npm

```sh
npm install @mui/material @emotion/react @emotion/styled
```

### yarn

```sh
yarn add @mui/material @emotion/react @emotion/styled
```

## With styled-components

Material UI uses [Emotion](https://emotion.sh/) as its default styling engine.
If you want to use [styled-components](https://styled-components.com/) instead, run one of the following commands:

### npm

```sh
npm install @mui/material @mui/styled-engine-sc styled-components
```

### yarn

```sh
yarn add @mui/material @mui/styled-engine-sc styled-components
```

:::warning
Visit the [Styled engine guide](/material-ui/guides/styled-engine/) for more information about how to configure styled-components.
:::

## Peer dependencies

<!-- #react-peer-version -->

[`react`](https://www.npmjs.com/package/react) >= 17.0.0 and [`react-dom`](https://www.npmjs.com/package/react-dom) >= 17.0.0 are peer dependencies.

## Roboto font

Material UI was designed with the [Roboto](https://fonts.google.com/specimen/Roboto)
font in mind. So be sure to follow [these instructions](/material-ui/react-typography/#general).
For instance, via Google Web Fonts:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

## Font icons

To use the font `Icon` component, you must first add the [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) font.
Here are [some instructions](/material-ui/icons/#font-icons)
on how to do so.
For instance, via Google Web Fonts:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

## SVG icons

In order to use prebuilt SVG Material icons, such as those found in the [icons demos](/material-ui/icons/)
you must first install the [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) package:

<!-- #default-branch-switch -->

With **npm**:

```sh
npm install @mui/icons-material
```

With **yarn**:

```sh
yarn add @mui/icons-material
```

## CDN

You can start using Material UI with minimal Front-end infrastructure,
which is great for prototyping.

Two Universal Module Definition (**UMD**) files are provided:

- one for development: https://unpkg.com/@mui/material@latest/umd/material-ui.development.js
- one for production: https://unpkg.com/@mui/material@latest/umd/material-ui.production.min.js

You can follow [this CDN example](https://github.com/mui/material-ui/tree/master/examples/cdn) to quickly get started.

⚠️ Using this approach in **production** is **discouraged** though -
the client has to download the entire library, regardless of which components are actually used,
affecting performance and bandwidth utilization.

⚠️ The UMD links are using the `latest` tag to point to the latest version of the library.
This pointer is **unstable**, it shifts as we release new versions.
You should consider pointing to a specific version, such as [v5.0.0](https://unpkg.com/@mui/material@5.0.0/umd/material-ui.development.js).

## Design resources

<a href="https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>
<a href="https://mui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-adobe-xd.svg" alt="adobe-xd" /></a>
<a href="https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>

A set of reusable components for design tools is available, designed to match the React components and to help you craft great products:

- [Figma](https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma): A large UI kit with over 600 handcrafted Material UI components.
- [Adobe XD](https://mui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd): A large UI kit with over 600 handcrafted Material UI components.
- [Sketch](https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch): A large UI kit with over 600 handcrafted Material UI symbols.
- [UXPin](https://www.uxpin.com/merge/mui-library): A large UI kit of Material UI components. The design tool renders the components in a web runtime. It uses the same React implementation as your production environment.
