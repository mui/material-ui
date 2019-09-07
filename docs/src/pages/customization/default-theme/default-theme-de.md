# Standardtheme

<p class="description">So sieht das Designobjekt mit den Standardwerten aus.</p>

## Entdecke

Erkunden Sie das Dokumentationsdesignobjekt:

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideHeader": true}}

> Tip: you can play with the documentation theme object in **your console**, as the `theme` variable is exposed on all the documentation pages. Please note that the documentation site is using a custom theme.

Wenn Sie mehr darüber erfahren möchten, wie das Theme zusammengestellt wird, werfen Sie einen Blick auf [` material-ui / style / createMuiTheme.js `](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js), und die zugehörigen Importe, die ` createMuiTheme ` verwendet.

## @material-ui/core/styles vs @material-ui/styles

Material-UI-Stile werden von dem npm paket [ @ material-ui/styles ](/styles/basics/)unterstützt. Es ist eine Styling-Lösung für React. Diese Lösung ist [ isoliert ](https://bundlephobia.com/result?p=@material-ui/styles) und hat keine Kenntnis des Standard-Designs der Material-UI. Um die Notwendigkeit, ein Theme **systematisch** in den React-Kontext einzufügen, nicht mehr zu benötigen, wickeln wir die Stilmodule(`makeStyles`, `withStyles` und `styled`) mit dem Standard-Material-UI-Design:

- `@material-ui/core/styles/makeStyles` wickelt `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/withStyles` wickelt `@material-ui/styles/withStyles`.
- `@material-ui/core/styles/styled` wickelt `@material-ui/styles/styled`.