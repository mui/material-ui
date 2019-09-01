# サポートされているプラットフォーム

<p class="description">Material-UIがサポートする古いプラットフォームからモダンなものまでについて学びます。</p>

## ブラウザ

Material-UIは主要なブラウザとプラットフォームの最新の安定版リリースをサポートしています。 Internet Explorer 11もサポートしています。 JavaScriptポリフィルは、サポートされていないブラウザー機能を内部で個別に管理するため、提供する必要はありません。

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |


Googlebotはページコンテンツのインデックス作成にweb rendering service (WRS) を使用するので、Material-UIがそれをサポートすることは重要です。 [WRSは、使用するレンダリングエンジンを定期的に更新します](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html)。 特に支障なくレンダリングできるMaterial-UIのコンポーネントを期待できます。

## サーバ

Material-UIはサーバ側レンダリングをサポートしているため、[Nodeの最新の安定したリリースをサポートする必要があります。js](https://github.com/nodejs/node)。 Where possible, the [LTS versions that are in maintenance](https://github.com/nodejs/Release#lts-schedule1) are supported. 現時点では、**ノードv8.x**以降のバージョンをサポートしています。

### CSSプレフィックス

一部のCSS機能では、ベンダープレフィックスを付加する追加の後処理手順が[必要](https://github.com/cssinjs/jss/issues/279)になります。 それらプレフィックスは[`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer)のおかげで自動的に付加されます。

ドキュメントで記述されているCSSは、[`autoprefixer`](https://www.npmjs.com/package/autoprefixer)で処理されます。 インスピレーションとして[ドキュメントの実装](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123)を用いることができます。 ページのパフォーマンスに影響することに注意してください。 これは静的ページには絶対に必要なことですが、動的ページをレンダリングするときに何もしないことと調整が必要です。

## React

Material-UIは、^16.8. 0(フックのついた方) 以降のReactの最新バージョンをサポートします。 Have a look at the older [versions](/versions/) for backward compatibility.