# Standardtheme

<p class="description">So sieht das Designobjekt mit den Standardwerten aus.</p>

## Entdecke

Erkunden Sie das Dokumentationsdesignobjekt:

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideEditButton": true}}

> Tipp: Sie können mit dem Theme der Dokumentation in ** Ihrer Konsole **spielen. Wir stellen eine ` Theme ` Variable auf allen Dokumentationsseiten zur Verfügung. Bitte beachten Sie, dass die Dokumentationsseite ein benutzerdefiniertes Theme verwendet.

Wenn Sie mehr darüber erfahren möchten, wie das Theme zusammengestellt wird, werfen Sie einen Blick auf [` material-ui / style / createMuiTheme.js `](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/styles/createMuiTheme.js), und die zugehörigen Importe, die ` createMuiTheme ` verwendet.

## @material-ui/core/styles vs @material-ui/styles

Material-UI-Stile werden von dem npm paket [ @ material-ui/styles ](/css-in-js/basics/)unterstützt. Es ist eine Styling-Lösung für React. Diese Lösung ist [ isoliert ](https://bundlephobia.com/result?p=@material-ui/styles) und hat keine Kenntnis des Standard-Designs der Material-UI. To remove the need for injecting a theme in the React's context **systematically**, we are wrapping the style modules (`makeStyles`, `withStyles` and `styled`) with the default Material-UI theme:

- `@material-ui/core/styles/makeStyles` wraps `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/withStyles` wraps `@material-ui/styles/withStyles`.
- `@material-ui/core/styles/styled` wraps `@material-ui/styles/styled`.