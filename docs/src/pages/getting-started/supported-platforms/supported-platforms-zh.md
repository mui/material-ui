# 支持的平台

<p class="description">了解更多从古老到新的支持Material-UI的平台</p>

## 浏览器

Material-UI支持最新的，稳定版的全部主流浏览器和平台。 我们同样支持Internet Explorer 11。 你不需要像以往我们管理不兼容的浏览器那样提供JavaScript polyfill。

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |

因为Googlebot使用了网络渲染服务（Web rendering service）（WRS）对页面进行所以，因此Material-UI对它的支持显得至关重要。 [WRS是基于Chrome 41的。](https://developers.google.com/search/docs/guides/rendering) You can expect Material-UI's components to render without major issues.

## 服务器

Because Material-UI supports server-side rendering, we need to support the latest, stable releases of [Node.js](https://github.com/nodejs/node). We try to support the [last active LTS version](https://github.com/nodejs/Release#lts-schedule1). Right now, we support **node v6.x** and newer versions.

### CSS prefixing

Be aware that some CSS features [require](https://github.com/cssinjs/jss/issues/279) an additional postprocessing step that adds vendor specific prefixes. These prefixes are automatically added on the client thanks to [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

The CSS served on this documentation is processed with [`autoprefixer`](https://www.npmjs.com/package/autoprefixer). You can use [the documentation implementation](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) as inspiration. Be aware that it has an implication with the performance of the page. It's a must do for static pages, but it needs to be put in balance with not doing anything when rendering dynamic pages.