# 默认主题

<p class="description">以下是theme（主题）对象在默认值情况下的样子。</p>

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideEditButton": true}}

主题通过为调色板、深色和浅色类型、排版、断点、阴影、过渡等提供默认值来实现其用途。

Tip: you can play with the theme object in your console too. **We expose a global `theme` variable on all the pages**.

Please take note that the documentation site is using a custom theme. As a result, the demos you see here might disagree with the values above.

If you want to learn more about how the theme is assembled, take a look at [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js), and the related imports which `createMuiTheme` uses.