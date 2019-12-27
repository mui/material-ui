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
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## 字体图标

为了使用字体`图标` 组件，你必须添加 [Material icons](https://material.io/tools/icons/) 字体. 这是如何去做的 [一些说明](/components/icons/#font-icons) 例如，使用 Google Web Fonts：

```html
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

提供两个通用模块定义（** UMD ** ）的文件：

- 一个用于开发: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- 一个用于生产: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

您可以按照[此CDN示例](https://github.com/mui-org/material-ui/tree/master/examples/cdn)快速开始。

⚠️在**生产环境**使用这种方式是**不推荐**的，因为客户端必须下载整个库，而不管实际上只使用哪些组件，这样的话会影响性能和带宽利用率。

⚠️ UMD 链接使用 `latest` 标签指向最新版本的库。 这个指向是**不稳定的**，它随着我们发布的新版本而改变。 您应该考虑指向一个具体的版本，如 [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js)。