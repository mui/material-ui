# 安装

<p class="description">安装Material-UI, 这个世界上最受欢迎的React UI框架.</p>

Material-UI 可作为 [npm](https://www.npmjs.com/package/@material-ui/core) 包使用。

## npm

下载并保存到你的 `package.json` 依赖，运行

```sh
// with npm
npm install @material-ui/core

// with yarn
yarn add @material-ui/core
```

请注意 [react](https://www.npmjs.com/package/react) >= 16.3.0和[react-dom](https://www.npmjs.com/package/react-dom) >= 16.3.0 是对等依赖

## Roboto 字体

Material-UI的设计考虑了 [Roboto](https://fonts.google.com/specimen/Roboto)字体 因此，请务必遵循这些说明。 例如，通过Google Web Fonts引入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
```

Alternatively, if you are using JSX over HTML to render the head:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## 字体图标

In order to use the font `Icon` component you must first add the [Material icons](https://material.io/tools/icons/) font. Here are [some instructions](/style/icons/#font-icons) on how to do so. 例如，通过Google Web Fonts引入：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

Alternatively, if you are using JSX over HTML to render the head:

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVG 图标

In order to use prebuilt SVG Material icons, such as those found in the [component demos](/demos/app-bar/) you must first install the [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) package:

```sh
npm install @material-ui/icons
```

## CDN

You can start using Material-UI with minimal Front-end infrastructure, which is great for prototyping. We discourage using this approach in production though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilisation.

#### UMD 版本

We are providing two Universal Module Definition (UMD) files:

- 一个用于开发: https://unpkg.com/@material-ui/core/umd/material-ui.development.js
- 一个用于生产: https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js

You can follow [this CDN example](https://github.com/mui-org/material-ui/tree/master/examples/cdn) to quickly get started.