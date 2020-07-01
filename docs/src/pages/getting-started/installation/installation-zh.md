# 安装

<p class="description">安装 Material-UI —— 世界上最受欢迎的 React UI 框架。</p>

Material-UI 可以通过 [npm 包](https://www.npmjs.com/package/@material-ui/core) 来安装。

## npm

若想安装并写入您的 `package.json` 依赖包，请运行以下命令：

```sh
// 用npm安装
npm install @material-ui/core

// 用yarn安装
yarn add @material-ui/core
```

请注意，安装依赖于 [react](https://www.npmjs.com/package/react) 的 16.8.0 及以上版本，和 [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0 及以上版本。

## Roboto 字体

在设计 Material-UI 时我们使用了[Roboto](https://fonts.google.com/specimen/Roboto)字体。 因此，我们推荐您遵循[此说明](/components/typography/#general)来载入字体。 例如，通过 Google Web Fonts 引入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

## Font Icons 字体图标

若您想使用 `Icon` 组件，前提条件是安装了 [Material icons](https://material.io/tools/icons/) 的字体。 我们提供了安装字体的[一些说明](/components/icons/#font-icons)。 例如，通过 Google Web Fonts 引入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG 图标

在 [icons 示例](/components/icons/)中， 您可以发现一些由我们提供的 SVG Material icons。若您想使用这个图标，您必须安装 [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) 这个包：

```sh
// 通过 npm
npm install @material-ui/icons

// 通过 yarn
yarn add @material-ui/icons
```

## CDN

如果您已经开始将 Material-UI 融入一些最基本的前端基础架构，您的原型开发就如虎添翼。

我们提供了两个通用模块定义（**UMD**）的文件：

- 您可以在开发环境调试：https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- 也可放心地在生产环境使用: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

通过[此 CDN 示例](https://github.com/mui-org/material-ui/tree/master/examples/cdn)，您可以快速上手。

尽管我们**不赞成**在**生产环境**中使用这种方式 —— 无论实际使用哪些组件，客户端必须下载整个库，而这将会影响到整体性能和带宽利用率。

⚠️带有 `latest` 标签的 UMD 会指向我们最新版本的库。 这个指向是**不稳定的**，它会随着我们发布的新版本而改变。 您应该考虑使用一个具体的版本，如 [v4.4.0](https://unpkg.com/@material-ui/core@4.4.0/umd/material-ui.development.js)。