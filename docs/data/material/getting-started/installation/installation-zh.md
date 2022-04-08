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

MUI is using [emotion](https://emotion.sh/docs/introduction) as a styling engine by default. 或者你想使用 `styled-components` 来作为样式引擎：

```sh
// 使用 npm 安装
npm install @mui/material @mui/styled-engine-sc styled-components

// 使用 yarn 安装
yarn add @mui/material @mui/styled-engine-sc styled-components
```

> 💡 参考 [Styled Engine 指南](/material-ui/guides/styled-engine/) 来了解更多配置 `styled-components` 作为样式引擎的更多信息。

## Roboto 字体

MUI 是使用 [Roboto](https://fonts.google.com/specimen/Roboto) 字体来设计的。 因此请务必遵循 [这些说明](/material-ui/react-typography/#general) 来引入字体。 例如，通过 Google Web Fonts 引入：

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

## 字体图标

To use the font `Icon` component, you must first add the [Material icons](https://fonts.google.com/icons) font. 我们提供了安装字体的[一些说明](/material-ui/icons/#font-icons)。 这是如何去做的 [一些说明](/material-ui/icons/#font-icons) 例如，通过 Google Web Fonts 引入： For instance, via Google Web Fonts: For instance, via Google Web Fonts:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

## SVG 图标

MUI is using [emotion](https://emotion.sh/docs/introduction) as a styling engine by default. 或者你想使用 `styled-components` 来作为样式引擎：

<!-- #default-branch-switch -->

```sh
// 使用 npm 安装
npm install @mui/icons-material

// 使用 yarn 安装
yarn add @mui/icons-material
```

## CDN

如果您已经开始将 Material UI 融入一些最基本的前端基础架构，您的原型开发就如虎添翼。

我们提供了两个通用模块定义（**UMD**）的文件：

- 您可以在开发环境调试：https://unpkg.com/@mui/material@latest/umd/material-ui.development.js
- 也可放心地在生产环境使用: https://unpkg.com/@mui/material@latest/umd/material-ui.production.min.js

您可以按照[此 CDN 示例](https://github.com/mui/material-ui/tree/master/examples/cdn)快速开始。

尽管我们**不赞成**在**生产环境**中使用这种方式 —— 无论实际使用哪些组件，客户端必须下载整个库，而这将会影响到整体性能和带宽利用率。

⚠️ UMD 链接使用 `latest` 标签指向最新版本的库。 这个指向是**不稳定的**，它随着我们发布的新版本而改变。 您应该考虑使用一个具体的版本，如 [v5.0.0](https://unpkg.com/@mui/material@5.0.0/umd/material-ui.development.js)。

## 设计资源

<a href="https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma" style="margin-left: 8px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-figma.svg" alt="figma" /></a>
<a href="https://mui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-adobe-xd.svg" alt="adobe-xd" /></a>
<a href="https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch" style="margin-left: 32px; margin-top: 8px; display: inline-block;"><img src="/static/images/download-sketch.svg" alt="sketch" /></a>

A set of reusable components for design tools is available, designed to match the React components and to help you craft great products:

- [Figma](https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma): A large UI kit with over 600 handcrafted MUI components.
- [Adobe XD](https://mui.com/store/items/adobe-xd-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-adobe-xd): A large UI kit with over 600 handcrafted MUI components.
- [Sketch](https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch): A large UI kit with over 600 handcrafted MUI symbols.
- [UXPin](https://github.com/uxpin-merge/material-ui-5-merge): A large UI kit of MUI components. The design tool renders the components in a web runtime. It uses the same React implementation as your production environment. The design tool renders the components in a web runtime. It uses the same React implementation as your production environment.
