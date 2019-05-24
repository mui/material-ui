# 安装

<p class="description">安装 Material-UI —— 世界上最受欢迎的 React UI 框架。</p>

Material-UI 可以通过 [npm 包](https://www.npmjs.com/package/@material-ui/core)来安装。

## npm

安装 Material-UI 并写入 `package.json` 依赖文件：

```sh
// 用npm安装
npm install @material-ui/core

// 用yarn安装
yarn add @material-ui/core
```

请注意，需要依赖 [react](https://www.npmjs.com/package/react) >= 16.8.0 版和 [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0 版。

## Roboto 字体

Material-UI 的设计与 [Roboto](https://fonts.google.com/specimen/Roboto) 字体相配。 因此，请按照[此说明](/components/typography/#general)载入字体。 例如，使用 Google Web Fonts：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## 字体图标

为了使用字体`Icon` 组件, 你必须添加[Material icons](https://material.io/tools/icons/)字体. 这是如何去做的 [一些说明](/components/icons/#font-icons) 例如，使用 Google Web Fonts：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

如果要使用 JSX 嵌套 HTML 来渲染页面头部，可以使用：

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG 图标

为了使用预先构建的 SVG Material 图标，例如这里的[演示图标](/components/icons/)，你必须先安装 [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons)包：

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

## CDN

您可以使用最少的前端基础架构开始使用Material-UI，这对于原型设计很有用

We are providing two Universal Module Definition (**UMD**) files:

- 一个用于开发: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- 一个用于生产: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

您可以按照[此CDN示例](https://github.com/mui-org/material-ui/tree/master/examples/cdn)快速开始。

⚠️ We **discourage** using this approach in **production** though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

⚠️ The UMD links are using the `latest` tag to point to the latest version of the library. This pointer is **unstable**, it shifts as we release new versions. You should consider pointing to a specific version like [v3.9.3](https://unpkg.com/@material-ui/core@3.9.3/umd/material-ui.development.js).