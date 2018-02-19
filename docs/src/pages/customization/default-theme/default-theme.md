# Default Theme

Here's what the theme object looks like with the default values:

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideEditButton": true}}

The theme normalizes implementation by providing default values for palette, dark and light types, typography, breakpoints, shadows, transitions, etc.

Tip: you can play with the theme object in your console too.
**We expose a global `theme` variable on all the pages**.

If you want to learn more about how the theme is assembled, take a look at [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/v1-beta/src/styles/createMuiTheme.js),
and the related imports which `createMuiTheme` uses.
