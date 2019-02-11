# 安装

<p class="description">安装 Material-UI -- 这个世界上最受欢迎的 React UI 框架.</p>

Material-UI 可通过 [npm](https://www.npmjs.com/package/@material-ui/core) 包的形式进行安装。

## npm

将 Material-UI 下载并保存到你的 `package.json` 依赖文件里，请运行:

```sh
// 用npm安装
npm install @material-ui/core

// 用yarn安装
yarn add @material-ui/core
```

请注意 [react](https://www.npmjs.com/package/react) >= 16.3.0版和[ react-dom](https://www.npmjs.com/package/react-dom) >= 16.3.0版是同伴依赖。

## Roboto 字体

在设计 Material-UI 时我们使用了[Roboto](https://fonts.google.com/specimen/Roboto)字体。 因此，请务必遵循这些说明。 例如，通过 Google Web Fonts 引入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

或者，如果您使用 JSX 而不是 HTML 来渲染页头：

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
npm install @material-ui/icons
```

## CDN

您可以开始在最简版的前端架构中使用 Material-UI，而这对原型开发很有帮助。 我们不鼓励在生产环境中中使用这种方法 - 不管实际使用哪些组件, 客户端必须下载整个库, 这会影响到整体性能和流量使用率。

#### UMD 版本

我们提供了两个通用模块定义 (UMD) 文件:

- 一个用于开发: https://unpkg.com/@material-ui/core/umd/material-ui.development.js
- 一个用于生产: https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js

您可以按照[此CDN示例](https://github.com/mui-org/material-ui/tree/next/examples/cdn)快速开始。