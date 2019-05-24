# インストール

<p class="description">世界で最も人気のあるReact UIフレームワークMaterial-UIをインストールします。</p>

Material-UIは[ npmパッケージ](https://www.npmjs.com/package/@material-ui/core) として入手可能です。

## npm

インストールして`package.json` のdependenciesに保存します。次を実行してください。

```sh
// npmの場合
npm install @material-ui/core

// yarnの場合
yarn add @material-ui/core
```

[react](https://www.npmjs.com/package/react) >= 16.8.0 and [react-dom](https://www.npmjs.com/package/react-dom) >= 16.8.0がpeer dependenciesであることに注意してください。

## Robotoフォント

Material-UIは[Roboto](https://fonts.google.com/specimen/Roboto)フォントを考慮して設計されています。 その為、必ず[以下の手順](/components/typography/#general) に従ってください。 たとえば、Google Web Fontsを用いて、

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
```

## フォントアイコン

フォント`アイコン`を使うには、最初に[Material icons](https://material.io/tools/icons/)を追加します。 こちらは、その時の[手続き](/components/icons/#font-icons)です。 たとえば、Google Web Fontsを用いて、

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

あるいは、headタグをレンダリングするJSXを用いている場合は、

```jsx
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

## SVGアイコン

In order to use prebuilt SVG Material icons, such as those found in the [icons demos](/components/icons/) you must first install the [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) package:

```sh
// with npm
npm install @material-ui/icons

// with yarn
yarn add @material-ui/icons
```

## CDN

プロトタイピングには最適な最小限のフロントエンド構造でMaterial-UIを使い始めることができます。

We are providing two Universal Module Definition (**UMD**) files:

- 開発用: https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js
- 本番用: https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js

[CDN example](https://github.com/mui-org/material-ui/tree/master/examples/cdn)に従うことで、すぐに開発を始めることができます。

⚠️ We **discourage** using this approach in **production** though - the client has to download the entire library, regardless of which components are actually used, affecting performance and bandwidth utilization.

⚠️ The UMD links are using the `latest` tag to point to the latest version of the library. This pointer is **unstable**, it shifts as we release new versions. You should consider pointing to a specific version like [v3.9.3](https://unpkg.com/@material-ui/core@3.9.3/umd/material-ui.development.js).