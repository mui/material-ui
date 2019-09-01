# Тема по умолчанию

<p class="description">Вот как выглядит объект темы со значениями по умолчанию.</p>

## Обзор

Изучите документацию по объекту темы:

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideHeader": true}}

> Tip: you can play with the documentation theme object in **your console**, as the `theme` variable is exposed on all the documentation pages. Please note that the documentation site is using a custom theme.

Подробности о структуре темы изнутри можно посмотреть здесь [`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js), а также изучив зависимости, используемые `createMuiTheme`.

## Отличие @material-ui/core/styles от @material-ui/styles

Стили в Material-UI работают на основе npm пакета [@material-ui/styles](/styles/basics/). Это стили для React-приложения. Они [изолированы](https://bundlephobia.com/result?p=@material-ui/styles) от стандартной Material-UI темы. Чтобы избавится он необходимости **систематически** внедрять тему в контекст, мы прячем модули стилей (`makeStyles`, `withStyles` and `styled`) внутри стандартной темы Material-UI:

- `@material-ui/core/styles/makeStyles` содержит `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/withStyles` содержит `@material-ui/styles/withStyles`.
- `@material-ui/core/styles/styled` содержит `@material-ui/styles/styled`.