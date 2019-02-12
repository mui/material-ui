# 默认主题

<p class="description">以下是theme（主题）对象在默认值情况下的样子。</p>

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideEditButton": true}}

主题通过为调色板、深色和浅色类型、排版、断点、阴影、过渡等提供默认值来实现其用途。

提示：你也可以在控制台操纵 theme 对象。 **我们在所有的页面上暴露了一个全局变量 `theme` **

请注意, 文档网站使用的是自定义主题。 因此，你在这里看到的演示可能和上面的值不同。

如果你想了解更多有关主题是如何组合的信息，请看看 [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/styles/createMuiTheme.js) 和 如何用`createMuiTheme` 导入主题