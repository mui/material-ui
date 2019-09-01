# Tema predeterminado

<p class="description">Aquí es cómo se ve el objeto de tema con los valores predeterminados.</p>

## Explorar

Explora la documentación del objeto del tema:

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideHeader": true}}

> Tip: you can play with the documentation theme object in **your console**, as the `theme` variable is exposed on all the documentation pages. Please note that the documentation site is using a custom theme.

Si deseas obtener más información sobre cómo se monta el tema, echa un vistazo a [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js), y los imports que utiliza `createMuiTheme`.

## @material-ui/core/styles vs @material-ui/styles

Los estilos de Material-UI se basan en el paquete npm [@material-ui/styles](/styles/basics/). Es una solución de estilo para React. Esta solución está [aislada](https://bundlephobia.com/result?p=@material-ui/styles), no tiene relación con el tema predeterminado de Material-UI. Para eliminar la necesidad de inyectar un tema en el contexto de React ** sistemáticamente ** , estamos envolviendo los módulos de estilo (` makeStyles ` , ` withStyles ` y ` estilo ` ) con el tema predeterminado de Material-UI:

- `@material-ui/core/styles/makeStyles` wraps `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/withStyles` wraps `@material-ui/styles/withStyles`.
- `@material-ui/core/styles/styled` wraps `@material-ui/styles/styled`.