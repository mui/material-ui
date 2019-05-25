# サポートされているプラットフォーム

<p class="description">Material-UIがサポートする古いプラットフォームからモダンなものまでについて学びます。</p>

## ブラウザ

Material-UIは主要なブラウザとプラットフォームの最新の安定版リリースをサポートしています。 Internet Explorer 11もサポートしています。 ブラウザのサポートされていない機能は内部的に独立して管理されているので、JavaScriptポリフィルを導入する必要はありません。

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |

Googlebotはページコンテンツのインデックス作成にweb rendering service (WRS) を使用するので、Material-UIがそれをサポートすることは重要です。 [WRS regularly updates the rendering engine it uses](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). 特に支障なくレンダリングできるMaterial-UIのコンポーネントを期待できます。

## サーバ

Material-UIはサーバサイドレンダリングをサポートしてるので、最新の安定版リリースの[Node.js](https://github.com/nodejs/node)をサポートする必要があります。 [LTS](https://github.com/nodejs/Release#lts-schedule1)のサポートも同様に試みています。 今のところ、**node v8.x**と最新のバージョンをサポートしています。

### CSSプレフィックス

一部のCSS機能では、ベンダープレフィックスを付加する追加の後処理手順が[必要](https://github.com/cssinjs/jss/issues/279)になります。 それらプレフィックスは[`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer)のおかげで自動的に付加されます。

ドキュメントで記述されているCSSは、[`autoprefixer`](https://www.npmjs.com/package/autoprefixer)で処理されます。 インスピレーションとして[ドキュメントの実装](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123)を用いることができます。 ページのパフォーマンスに影響することに注意してください。 これは静的ページには絶対に必要なことですが、動的ページをレンダリングするときに何もしないことと調整が必要です。