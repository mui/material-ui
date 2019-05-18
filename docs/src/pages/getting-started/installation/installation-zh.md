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

请注意，需要依赖 [react](https://www.npmjs.com/package/react) >= 16.8.0 版和 [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0 版。

## Roboto 字体

Material-UI 的设计与 [Roboto](https://fonts.google.com/specimen/Roboto) 字体相配。 So be sure to follow [these instructions]/components/typography/#general). 例如，使用 Google Web Fonts：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## 字体图标

为了使用字体`Icon` 组件, 你必须添加[Material icons](https://material.io/tools/icons/)字体. Here are [some instructions]/components/icons/#font-icons) on how to do so. 例如，使用 Google Web Fonts：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

如果要使用 JSX 嵌套 HTML 来渲染页面头部，可以使用：

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG 图标

In order to use prebuilt SVG Material icons, such as those found in the [icons demos](/components/icons/) you must first install the [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) package:

```sh
// with npm
npm install @material-ui/icons@next

// with yarn
yarn add @material-ui/icons@next
```

## CDN

您可以使用最少的前端基础架构开始使用Material-UI，这对于原型设计很有用 我们不鼓励在生产中使用这种方法, 客户端必须下载整个库, 而不管实际使用哪些组件, 影响性能和带宽利用率。

#### UMD 版本

我们提供两个通用模块定义 (UMD) 文件:

- 一个用于开发: https://unpkg.com/@material-ui/core@next/umd/material-ui.development.js
- 一个用于生产: https://unpkg.com/@material-ui/core@next/umd/material-ui.production.min.js

您可以按照[此CDN示例](https://github.com/mui-org/material-ui/tree/next/examples/cdn-next)快速开始。