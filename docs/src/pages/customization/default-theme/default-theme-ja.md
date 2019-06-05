# Default Theme

<p class="description">Here's what the theme object looks like with the default values.</p>

## Explore

Explore the documentation theme object:

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideEditButton": true}}

> Tip: you can play with the documentation theme object in **your console**. We expose a documentation `theme` variable on all the documentation pages. Please note that the documentation site is using a custom theme.

If you want to learn more about how the theme is assembled, take a look at [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/styles/createMuiTheme.js), and the related imports which `createMuiTheme` uses.

## @material-ui/core/styles vs @material-ui/styles

Material-UI styles are powered by the [@material-ui/styles](/styles/basics/) npm package. It's a styling solution for React. This solution is [isolated](https://bundlephobia.com/result?p=@material-ui/styles), it has has no knowledge of the default Material-UI theme. To remove the need for injecting a theme in the React's context **systematically**, we are wrapping the style modules (`makeStyles`, `withStyles` and `styled`) with the default Material-UI theme:

- `@material-ui/core/styles/makeStyles` wraps `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/withStyles` wraps `@material-ui/styles/withStyles`.
- `@material-ui/core/styles/styled` wraps `@material-ui/styles/styled`.