# 安装

<p class="description">安装Material-UI, 这个世界上最受欢迎的React UI框架.</p>

Material-UI 可作为 [npm](https://www.npmjs.com/package/@material-ui/core) 包使用。

## npm

下载并保存到你的 `package.json` 依赖，运行

```sh
// 用npm安装
npm install @material-ui/core

// 用yarn安装
yarn add @material-ui/core
```

请注意 [react](https://www.npmjs.com/package/react) >= 16.3.0和[react-dom](https://www.npmjs.com/package/react-dom) >= 16.3.0 是对等依赖

## Roboto 字体

Material-UI的设计考虑了 [Roboto](https://fonts.google.com/specimen/Roboto)字体 因此，请务必遵循这些说明。 例如，通过Google Web Fonts引入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

或者，如果您使用JSX而不是HTML来呈现头部：

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## 字体图标

为了使用字体`Icon` 组件, 你必须添加[Material icons](https://material.io/tools/icons/)字体. Here are [some instructions](/style/icons/#font-icons) on how to do so. 例如，通过Google Web Fonts引入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

或者，如果您使用JSX而不是HTML来呈现头部：

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG 图标

为了使用预构建的SVG Material icons，例如在[组件演示](/demos/app-bar/)中找到的那些, 你必须先安装 [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons)包

```sh
npm install @material-ui/icons
```

## CDN

您可以使用最少的前端基础架构开始使用Material-UI，这对于原型设计很有用 We discourage using this approach in production though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilisation.

#### UMD 版本

我们提供两个通用模块定义 (UMD) 文件:

- 一个用于开发: https://unpkg.com/@material-ui/core/umd/material-ui.development.js
- 一个用于生产: https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js

您可以按照[此CDN示例](https://github.com/mui-org/material-ui/tree/master/examples/cdn)快速开始。