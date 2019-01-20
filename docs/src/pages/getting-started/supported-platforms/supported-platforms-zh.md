# 支持的平台

<p class="description">了解更多从古老到新的支持Material-UI的平台</p>

## 浏览器

Material-UI支持最新的，稳定版的全部主流浏览器和平台。 我们同样支持Internet Explorer 11。 你不需要像以往我们管理不兼容的浏览器那样提供JavaScript polyfill。

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |

因为Googlebot使用了网络渲染服务（Web rendering service）（WRS）对页面进行所以，因此Material-UI对它的支持显得至关重要。 [WRS是基于Chrome 41的。](https://developers.google.com/search/docs/guides/rendering) 您可以期望Material-UI的组件在没有重大问题的情况下呈现。

## 服务器

因为Material-UI支持服务器端渲染，所以我们需要支持 [Node.js](https://github.com/nodejs/node)的最新稳定版本。 我们试图支持 [最后一个活动LTS版本](https://github.com/nodejs/Release#lts-schedule1)。 现在，我们支持 **node v6.x** 和更新版本。

### CSS前缀

请注意，某些CSS功能 [需要](https://github.com/cssinjs/jss/issues/279) 个额外的后处理步骤 ，以添加供应商特定的前缀。 由于 [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer)这些前缀会自动添加到客户端上。

本文档中提供的CSS使用 [`autoprefixer`](https://www.npmjs.com/package/autoprefixer)。 您可以使用 [文档实现](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) 作为灵感。 请注意，它对页面的性能有影响。 这对于静态页面来说是必须的，但是在渲染动态页面时需要平衡而不做任何事情。