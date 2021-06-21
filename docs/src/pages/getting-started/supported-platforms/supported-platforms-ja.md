# サポートされているプラットフォーム

<p class="description">モダンなものから古いものまで、Material-UIがサポートするプラットフォームについて学びましょう。</p>

## ブラウザ

Material-UIは主要なブラウザとプラットフォームの最新の安定版リリースをサポートしています。 Internet Explorer 11もサポートしています。 ブラウザのサポートされていない機能は内部的に独立して管理されているので、JavaScriptポリフィルを導入する必要はありません。

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |


Googlebotはページコンテンツのインデックス作成にweb rendering service (WRS) を使用するので、Material-UIがそれをサポートすることは重要です。 [WRSは、使用するレンダリングエンジンを定期的に更新します](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html)。 特に支障なくレンダリングできるMaterial-UIのコンポーネントを期待できます。

## サーバ

Material-UIはサーバサイドレンダリングをサポートしてるので、最新の安定版リリースの[Node.js](https://github.com/nodejs/node)をサポートする必要があります。 可能な限り、 [メンテナンス中のLTS バージョン](https://github.com/nodejs/Release#lts-schedule1) はサポートされます。 **node v10.x** またはそれ以降を使用することをお勧めします。 しかし、 **node v8.x** はまだサポートされています。 **node v8.x** のサポートは Material-UI Version 5 で停止されます。

### CSSプレフィックス

一部のCSS機能では、ベンダープレフィックスを追加するための後処理が[必要](https://github.com/cssinjs/jss/issues/279)になることに注意してください。 これらのプレフィックスは [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer) のおかげで自動的にクライアントに追加されます。

ドキュメントで記述されているCSSは、[`autoprefixer`](https://www.npmjs.com/package/autoprefixer)で処理されます。 インスピレーションとして[ドキュメントの実装](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123)を用いることができます。 ページのパフォーマンスに影響することに注意してください。 これは静的ページには必須ですが、動的ページをレンダリングする時には、何もしない事のバランスを取る必要があります。

## React

Material-UIは、^16.8. 0(フックのついた方) 以降のReactの最新バージョンをサポートします。 下位互換性については、古い [バージョン](https://material-ui.com/versions/) を参照してください。

## TypeScript

Material-UI requires a minimum version of TypeScript 3.2.