# Default Theme

<p class="description">Here's what the theme object looks like with the default values.</p>

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideEditButton": true}}

The theme normalizes implementation by providing default values for palette, dark and light types, typography, breakpoints, shadows, transitions, etc.

Tip: you can play with the theme object in your console too. **We expose a global `theme` variable on all the pages**.

Please take note that the documentation site is using a custom theme. As a result, the demos you see here might disagree with the values above.

If you want to learn more about how the theme is assembled, take a look at [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js), and the related imports which `createMuiTheme` uses.