# デフォルトのテーマ

<p class="description">これがテーマオブジェクトでデフォルト値がどのように見えるかです。</p>

## 調べる

ドキュメンテーションのテーマオブジェクトを調べる。

{{"demo": "pages/customization/default-theme/DefaultTheme.js", "hideEditButton": true}}

> ヒント：あなたのコンソールでドキュメントのテーマオブジェクトで遊ぶことができます。 すべてのドキュメントページで可変なドキュメントのテーマを公開します。 ドキュメントサイトはカスタムテーマを使用していることに注意してください。

テーマについてもっと知りたい場合は、[`material-ui/style/createMuiTheme.js`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createMuiTheme.js)又は `createMuiTheme`に関連するものをインポートして使って下さい。

## @material-ui/core/styles と @material-ui/styles

Material-UIスタイルはnpmパッケージの[@material-ui/styles](/styles/basics/) で提供されます。 これはReactのスタイリングソリューションです。 [isolated](https://bundlephobia.com/result?p=@material-ui/styles)はMaterial-UIのデフォルトテーマです。 To remove the need for injecting a theme in the React's context **systematically**, we are wrapping the style modules (`makeStyles`, `withStyles` and `styled`) with the default Material-UI theme:

- `@material-ui/core/styles/makeStyles` wraps `@material-ui/styles/makeStyles`.
- `@material-ui/core/styles/withStyles` wraps `@material-ui/styles/withStyles`.
- `@material-ui/core/styles/styled` wraps `@material-ui/styles/styled`.