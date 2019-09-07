# Thèmes par défaut

<p class="description">Voici à quoi ressemble l'objet de thème avec les valeurs par défaut.</p>

## Explorer

Voici la documentation de l’objet de thème:

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideHeader": true}}

> Tip: you can play with the documentation theme object in **your console**, as the `theme` variable is exposed on all the documentation pages. Please note that the documentation site is using a custom theme.

If you want to learn more about how the theme is assembled, take a look at [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js), and the related imports which `createMuiTheme` uses.

## @material-ui/core/styles vs @material-ui/styles

Les styles de Material-UI proviennent du paquet npm [@material-ui/styles](/styles/basics/). C'est une solution de design pour React. Cette solution est [indépendante](https://bundlephobia.com/result?p=@material-ui/styles) , elle ne dépend pas du thème par défaut de Material-UI. To remove the need for injecting a theme in the React's context **systematically**, we are wrapping the style modules (`makeStyles`, `withStyles` and `styled`) with the default Material-UI theme:

- `@material-ui/core/styles/makeStyles` encapsule `@material-ui/styles/makeStyles` .
- `@material-ui/core/styles/withStyles` encapsule `@material-ui/styles/withStyles`.
- `@material-ui/core/styles/styled` encapsule `@material-ui/styles/styled`.