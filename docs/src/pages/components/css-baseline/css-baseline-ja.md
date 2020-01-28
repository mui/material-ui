---
components: CssBaseline
---

# CSSベースライン

<p class="description">Material-UIはCssBaselineコンポーネントを提供することで、エレガントで一貫性のあるシンプルなベースラインを構築します。</p>

貴方はもしかしたら、HTMLの要素と属性のスタイル正規化のコレクションである [normalize.css](https://github.com/necolas/normalize.css)精通しているかもしれません。

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
}
```

## アプローチ

### ページ

`<html>` および `<body>` 要素は、ページ全体のデフォルトが改善されるように更新されています。 具体的には:

- すべてのブラウザの余白が削除されています。
- デフォルトのマテリアルデザインの背景色が適用されます。 It's using [`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) for standard devices and a white background for print devices.

### レイアウト

- `ボックスサイズ` は、 `<html>` 要素で `border-box`グローバルに設定されます。 すべての要素（ `*:: before` および `*:: after` を含む）は、このプロパティを継承するように宣言されています は、要素の宣言された幅がパディングまたは境界のために超過しないことを保証されます。

### タイポグラフィ

- `<html>`には基本フォントサイズは宣言されていませんが、16pxが想定されています（ブラウザのデフォルト）。 デフォルトのフォントサイズの`<html>`を変更した場合の影響については、ここをクリックしてください。[the theme documentation](/customization/typography/#typography-html-font-size)
- `<body>` 要素に `theme.typography.body2` スタイルを設定します。
- `<b>` および `<strong>` 要素のfont-weightを「bolder」に設定します。 Bolderは、親要素よりも重いフォントの重みです（使用可能なフォントの重みの中で）。
- Robotoフォントを見やすくするために、フォントのアンチエイリアスが有効になります。