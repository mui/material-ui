# 支持的平台

<p class="description">了解更多Material-UI支持的从最新版到旧版的平台。</p>

## 浏览器

Material-UI支持所有主流浏览器和平台的最新稳定版本。 我们同样支持Internet Explorer 11。 和以前以往我们管理不兼容的浏览器不同，您不需要提供任何JavaScript polyfill。

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |


因为 Googlebot 使用了Web rendering service - WRS （网络渲染服务）对页面进行索引，所以Material-UI能提供对它的支持非常重要。 [WRS 定期更新它使用的渲染引擎](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html)。 在没有重大问题的情况下，您可以指望能够渲染Material-UI的组件。

## 服务器

因为Material-UI支持服务器端渲染，所以我们需要支持 [Node.js](https://github.com/nodejs/node)的最新稳定版本。 尽可能地支持[维护中的 LTS 版本](https://github.com/nodejs/Release#lts-schedule1) 。 我们建议使用 **node v10.x** 或更高版本。 然而，我们仍然支持 **node v8.x**。 对 **node v8.x** 的支持会在 Material-UI 第5版 中停止。

### CSS前缀

请注意，有些CSS功能 [需要额外的后处理步骤](https://github.com/cssinjs/jss/issues/279) 以添加 不同浏览器标准(vendor-specific) 的特定前缀。 通过使用 [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer)，这些前缀会自动被添加到客户端。

本文档中提供的CSS由 [`autoprefixer`](https://www.npmjs.com/package/autoprefixer)处理。 您可以通过[文档实现](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123)受到启发。 请注意，它对页面的性能会产生影响。 对于静态页面来说，这是一个必须要做的事情，但是在渲染动态页面的时候，是否采用该方法是权衡利弊之后的考虑。

## React

Material-UI支持最新版本的React，从16.8.0开始(带有hook的版本)。 我们同时提供了向后兼容的[版本](https://material-ui.com/versions/)。

## TypeScript

Material-UI requires a minimum version of TypeScript 3.2.