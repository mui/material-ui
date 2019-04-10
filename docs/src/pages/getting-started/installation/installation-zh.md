# 安装

<p class="description">安装 Material-UI —— 世界上最受欢迎的 React UI 框架。</p>

Material-UI 可以通过 [npm 包](https://www.npmjs.com/package/@material-ui/core)来安装。

## npm

安装 Material-UI 并写入 `package.json` 依赖文件：

```sh
// 使用 npm
npm install @material-ui/core@next

// 使用 yarn
yarn add @material-ui/core@next
```

请注意，需要依赖 [react](https://www.npmjs.com/package/react) >= 16.3.0 版和 [react-dom](https://www.npmjs.com/package/react-dom) >= 16.3.0 版。

## Roboto 字体

Material-UI 的设计与 [Roboto](https://fonts.google.com/specimen/Roboto) 字体相配。 因此，请按照[此说明](/style/typography/#general)载入字体。 例如，使用 Google Web Fonts：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

如果要使用 JSX 嵌套 HTML 来渲染页面头部，可以使用：

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## 字体图标

为了使用字体`Icon` 组件, 首先您必须添加[Material icons](https://material.io/tools/icons/)字体. 这是如何添加的[一些说明](/style/icons/#font-icons)。 例如，通过 Google Web Fonts 引入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

或者，如果您使用 JSX 而不是 HTML 来渲染页头：

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG 图标

如果您想使用实现建立好的 SVG Material icons，例如在[组件演示](/demos/app-bar/)中运用的那些, 您必须先安装 [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons)包：

```sh
// with npm
npm install @material-ui/icons@next

// with yarn
yarn add @material-ui/icons@next
```

## CDN

您可以开始在最简版的前端架构中使用 Material-UI，而这对原型开发很有帮助。 我们不鼓励在生产环境中中使用这种方法 - 不管实际使用哪些组件, 客户端必须下载整个库, 这会影响到整体性能和流量使用率。

#### UMD 版本

我们提供了两个通用模块定义 (UMD) 文件:

- 一个用于开发: https://unpkg.com/@material-ui/core@next/umd/material-ui.development.js
- 一个用于生产: https://unpkg.com/@material-ui/core@next/umd/material-ui.production.min.js

您可以按照[此CDN示例](https://github.com/mui-org/material-ui/tree/next/examples/cdn-next)快速开始。