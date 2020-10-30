# サポートされているプラットフォーム

<p class="description">Material-UIがサポートする古いプラットフォームからモダンなものまでについて学びます。</p>

## ブラウザ

Material-UIは主要なブラウザとプラットフォームの最新の安定版リリースをサポートしています。 Internet Explorer 11もサポートしています。 JavaScriptポリフィルは、サポートされていないブラウザー機能を内部で個別に管理するため、提供する必要はありません。 JavaScriptポリフィルは、サポートされていないブラウザー機能を内部で個別に管理するため、提供する必要はありません。

<!-- #stable-snapshot -->

| Edge  | Firefox | Chrome | Safari (macOS) | Safari (iOS) |
|:----- |:------- |:------ |:-------------- |:------------ |
| >= 85 | >= 78   | >= 84  | >= 13          | >= 12.2      |

<!-- #default-branch-switch -->

An extensive list can be found in our [.browserlistrc](https://github.com/mui-org/material-ui/blob/next/.browserslistrc#L12-L27) (check the `stable` entry). If you need to support IE 11, check out our [legacy bundle](/guides/minimizing-bundle-size/#legacy-bundle).

Googlebotはページコンテンツのインデックス作成にweb rendering service (WRS) を使用するので、Material-UIがそれをサポートすることは重要です。 [WRSは、使用するレンダリングエンジンを定期的に更新します](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html)。 特に支障なくレンダリングできるMaterial-UIのコンポーネントを期待できます。 [WRSは、使用するレンダリングエンジンを定期的に更新します](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html)。 特に支障なくレンダリングできるMaterial-UIのコンポーネントを期待できます。 [WRSは、使用するレンダリングエンジンを定期的に更新します](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html)。 特に支障なくレンダリングできるMaterial-UIのコンポーネントを期待できます。

## サーバ

<!-- #stable-snapshot -->

We support [Node.js](https://github.com/nodejs/node) starting with version 10 for server-side rendering. Where possible, the [LTS versions that are in maintenance](https://github.com/nodejs/Release#release-schedule) are supported.

### CSSプレフィックス

Be aware that some CSS features [require](https://github.com/cssinjs/jss/issues/279) an additional postprocessing step that adds vendor-specific prefixes. These prefixes are automatically added to the client thanks to [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

ドキュメントで記述されているCSSは、[`autoprefixer`](https://www.npmjs.com/package/autoprefixer)で処理されます。 インスピレーションとして[ドキュメントの実装](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123)を用いることができます。 ページのパフォーマンスに影響することに注意してください。 It's a must-do for static pages, but it needs to be put in balance with not doing anything when rendering dynamic pages. インスピレーションとして[ドキュメントの実装](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123)を用いることができます。 ページのパフォーマンスに影響することに注意してください。 It's a must-do for static pages, but it needs to be put in balance with not doing anything when rendering dynamic pages. ページのパフォーマンスに影響することに注意してください。 It's a must-do for static pages, but it needs to be put in balance with not doing anything when rendering dynamic pages.

## React

Material-UIは、^16.8. 0(フックのついた方) 以降のReactの最新バージョンをサポートします。 Have a look at the older [versions](https://material-ui.com/versions/) for backward compatibility. Material-UIは、^16.8. 0(フックのついた方) 以降のReactの最新バージョンをサポートします。 Have a look at the older [versions](https://material-ui.com/versions/) for backward compatibility.

## TypeScript

Material-UI requires a minimum version of TypeScript 3.2.
