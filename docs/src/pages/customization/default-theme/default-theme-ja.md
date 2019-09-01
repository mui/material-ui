# デフォルトのテーマ

<p class="description">これがテーマオブジェクトでデフォルト値がどのように見えるかです。</p>

## 調べる

ドキュメンテーションのテーマオブジェクトを調べる。

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideHeader": true}}

> Tip: you can play with the documentation theme object in **your console**, as the `theme` variable is exposed on all the documentation pages. Please note that the documentation site is using a custom theme.

テーマについてもっと知りたい場合は、[`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js)又は `createMuiTheme`に関連するものをインポートして使って下さい。

## @material-ui/core/styles と @material-ui/styles

Material-UIスタイルはnpmパッケージの[@material-ui/styles](/styles/basics/) で提供されます。 これはReactのスタイリングソリューションです。 [isolated](https://bundlephobia.com/result?p=@material-ui/styles)はMaterial-UIのデフォルトテーマです。 Reactのコンテキストにテーマを体系的に</strong>注入する必要性をなくすために, スタイルモジュール(`makeStyles`、`withStyles`、`styled`) をデフォルトのMaterial-UIテーマでラップしています。

- `@material-ui/core/styles/makeStyles` wraps `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/withStyles` wraps `@material-ui/styles/withStyles`.
- `@material-ui/core/styles/styled` wraps `@material-ui/styles/styled`.