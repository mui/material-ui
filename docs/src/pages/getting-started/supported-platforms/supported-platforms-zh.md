# 支持的平台

<p class="description">了解更多Material-UI支持的从最新版到旧版的平台。</p>

## 浏览器

Material-UI支持所有主流浏览器和平台的最新稳定版本。 我们同样支持Internet Explorer 11。 和以前以往我们管理不兼容的浏览器不同，您不需要提供任何JavaScript polyfill。

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |


因为 Googlebot 使用了Web rendering service - WRS （网络渲染服务）对页面进行索引，所以Material-UI能提供对它的支持非常重要。 [WRS regularly updates the rendering engine it uses](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html). 在没有重大问题的情况下，您可以指望能够渲染Material-UI的组件。

## 服务器

因为Material-UI支持服务器端渲染，所以我们需要支持 [Node.js](https://github.com/nodejs/node)的最新稳定版本。 尽可能地支持[维护中的 LTS 版本](https://github.com/nodejs/Release#lts-schedule1) 。 现在，我们支持 **node v8.x** 和较新的版本。

### CSS前缀

Be aware that some CSS features [require](https://github.com/cssinjs/jss/issues/279) an additional postprocessing step that adds vendor-specific prefixes. These prefixes are automatically added to the client thanks to [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer).

本文档中提供的CSS由 [`autoprefixer`](https://www.npmjs.com/package/autoprefixer)处理。 您可以通过[文档实现](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123)受到启发。 请注意，它对页面的性能会产生影响。 It's a must-do for static pages, but it needs to be put in balance with not doing anything when rendering dynamic pages.

## React

Material-UI支持最新版本的React，从16.8.0开始(带有hook的版本)。 我们同时提供了向后兼容的[版本](https://material-ui.com/versions/)。