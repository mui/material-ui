# 默认主题

<p class="description">以下是theme（主题）对象在默认值情况下的样子。</p>

## 探索

浏览文档主题对象：

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideHeader": true}}

> Tip: you can play with the documentation theme object in **your console**, as the `theme` variable is exposed on all the documentation pages. Please note that the documentation site is using a custom theme.

如果你想了解更多有关主题是如何组合的信息，请看看 [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js) 和 如何用`createMuiTheme` 导入主题

## @ material-ui / core / styles 对比 @ material-ui / styles

Material-UI 样式由 [@material-ui/styles](/styles/basics/) npm 软件包提供。 它是React的样式解决方案。 这个解决方案是 [孤立的](https://bundlephobia.com/result?p=@material-ui/styles)，它对默认的 Material-UI 样式主题没有理解。 为了**系统地**消除对React上下文注入主题的依赖 ，我们正在使用默认的Material-UI主题封装样式模块 (` makeStyles ` ，` withStyles `和`styled`) ：

- `@material-ui/core/styles/makeStyles` 封装了 `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/withStyles` 封装了 `@material-ui/styles/withStyles`.
- `@material-ui/core/styles/styled` 封装了 `@material-ui/styles/styled`.