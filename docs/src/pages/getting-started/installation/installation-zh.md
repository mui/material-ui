# 安装

<p class="description">安装 MUI —— 世界上最受欢迎的 React UI 框架。</p>

MUI 可以通过 [npm package](https://www.npmjs.com/package/@mui/material) 来安装。

## npm

若想安装并写入您的 `package.json` 依赖包，请运行以下命令：

```sh
// 使用 npm 安装
npm install @mui/material @emotion/react @emotion/styled

// 使用 yarn 安装
yarn add @mui/material @emotion/react @emotion/styled
```

<!-- #react-peer-version -->

请注意，安装依赖于 [react](https://www.npmjs.com/package/react) 的 17.0.0 及以上版本，和 [react-dom](https://www.npmjs.com/package/react-dom) >= 17.0.0 及以上版本。

或者你想使用 `styled-components` 来作为样式引擎：

```sh
// 使用 npm 安装
npm install @mui/material @mui/styled-engine-sc styled-components

// 使用 yarn 安装
yarn add @mui/material @mui/styled-engine-sc styled-components
```

> 💡参考 [Styled Engine 指南](/guides/styled-engine/) 来了解更多配置 `styled-components` 作为样式引擎的更多信息。

## Roboto 字体

MUI 是使用 [Roboto](https://fonts.google.com/specimen/Roboto) 字体来设计的。 因此请务必遵循 [这些说明](/components/typography/#general) 来引入字体。 例如，通过 Google Web Fonts 引入：

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

## 字体图标

To use the font `Icon` component, you must first add the [Material icons](https://fonts.google.com/icons) font. Here are [some instructions](/components/icons/#font-icons) on how to do so. 例如，通过 Google Web Fonts 引入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG 图标

In order to use prebuilt SVG Material icons, such as those found in the [icons demos](/components/icons/) you must first install the [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) package:

<!-- #default-branch-switch -->

```sh
// 使用 npm 安装
npm install @mui/icons-material

// 使用 yarn 安装
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

## 设计资源

<a href="https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>
<a href="https://material-ui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-adobe-xd.svg" alt="adobe-xd" /></a>
<a href="https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>

A set of reusable components for design tools is available, designed to match the React components and to help you craft great products:

- [Figma](https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma): A large UI kit with over 600 handcrafted MUI components.
- [Adobe XD](https://material-ui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd): A large UI kit with over 600 handcrafted MUI components.
- [Sketch](https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch): A large UI kit with over 600 handcrafted MUI symbols.
- [UXPin](https://github.com/uxpin-merge/material-ui-5-merge): A large UI kit of MUI components. The design tool renders the components in a web runtime. It uses the same React implementation as your production environment.
