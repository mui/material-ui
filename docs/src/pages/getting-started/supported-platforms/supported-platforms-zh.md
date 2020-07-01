# 支持的平台

<p class="description">了解更多Material-UI支持的从最新版到旧版的平台。</p>

## 浏览器

Material-UI 支持所有主流浏览器和平台的最新稳定版本。 我们也支持 Internet Explorer 11。 您不需要提供任何 JavaScript polyfill， 鉴于它在内部管理了不支持的浏览器的功能并且将其隔离。

| IE | Edge  | Firefox | Chrome | Safari | Googlebot |
|:-- |:----- |:------- |:------ |:------ |:--------- |
| 11 | >= 14 | >= 52   | >= 49  | >= 10  | ✅         |


因为 Googlebot 使用了Web rendering service - WRS （网络渲染服务）对页面进行索引，所以Material-UI能提供对它的支持非常重要。 [WRS 定期更新它使用的渲染引擎](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html)。 您可以依赖 Material-UI 组件的渲染，并不会出现重大的问题。

## 服务器

因为 Material-UI 支持服务器端渲染，所以它需要支持 [Node.js](https://github.com/nodejs/node)的最新稳定版本。 我们还会尽可能的支持 [维护中的 LTS 版本](https://github.com/nodejs/Release#lts-schedule1) 。 我们建议使用 **node v10.x** 或更高版本。 然而，我们仍然支持 **node v8.x**。 对 **node v8.x** 的支持会在 Material-UI 第 5 版中停止。

### CSS 前缀

请注意，有些 CSS 功能 [需要额外的后处理步骤](https://github.com/cssinjs/jss/issues/279)，来添加不同浏览器标准(vendor-specific) 的特定前缀。 多亏了使用 [`jss-plugin-vendor-prefixer`](https://www.npmjs.com/package/jss-plugin-vendor-prefixer)，这些前缀会自动被添加到客户端。

本文档中提供的CSS由 [`autoprefixer`](https://www.npmjs.com/package/autoprefixer) 处理。 您可以使用 [文档实现](https://github.com/mui-org/material-ui/blob/47aa5aeaec1d4ac2c08fd0e84277d6b91e497557/pages/_document.js#L123) 作为灵感。 请注意，它对页面的性能会产生影响。 对于静态页面来说，这是一个必须要做的事情，但是在渲染动态的页面时，是否采用该方法是权衡利弊之后的考虑。

## React

Material-UI 支持最新版本的 React，从 16.8.0 开始（带有 hook 的版本）。 我们同时提供了向后兼容的 [版本](https://material-ui.com/versions/)。

## TypeScript

Material-UI 需要的最低 TypeScript 的版本为 3.2。