# インストール

<p class="description">世界で最も人気のあるReact UIフレームワークMaterial-UIをインストールします。</p>

Material-UIは[ npmパッケージ](https://www.npmjs.com/package/@material-ui/core) として入手可能です。

## npm

インストールして`package.json` のdependenciesに保存します。次を実行してください。

```sh
// with npm
npm install @material-ui/core@next

// with yarn
yarn add @material-ui/core@next
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
npm install @material-ui/icons@next

// with yarn
yarn add @material-ui/icons@next
```

## CDN

プロトタイピングには最適な最小限のフロントエンド構造でMaterial-UIを使い始めることができます。 ただし、この方法をプロダクションで使用することはお勧めしません。どのコンポーネントが実際に使用されているかに関係なく、クライアントはライブラリ全てをダウンロードする必要があるので、パフォーマンスと帯域利用に影響します。

#### UMDリリース

私たちは２つのUniversal Module Definition (UMD) ファイルを提供します。

- 開発用: https://unpkg.com/@material-ui/core@next/umd/material-ui.development.js
- 本番用: https://unpkg.com/@material-ui/core@next/umd/material-ui.production.min.js

[CDN example](https://github.com/mui-org/material-ui/tree/next/examples/cdn-next)に従うことで、すぐに開発を始めることができます。