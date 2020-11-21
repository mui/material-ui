---
components: CssBaseline, ScopedCssBaseline
---

# CSSベースライン

<p class="description">Material-UIはCssBaselineコンポーネントを提供することで、エレガントで一貫性のあるシンプルなベースラインを構築します。</p>

## Global reset

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

## Scoping on children

However, you might be progressively migrating a website to Material-UI, using a global reset might not be an option. It's possible to apply the baseline only to the children by using the `ScopedCssBaseline` component.

```jsx
import React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import MyApp from './MyApp';

export default function MyApp() {
  return (
    <ScopedCssBaseline>
      {/* The rest of your application */}
      <MyApp />
    </ScopedCssBaseline>
  );
}
```

⚠️ Make sure you import `ScopedCssBaseline` first to avoid box-sizing conflicts as in the above example.

## アプローチ

### ページ

`<html>` および `<body>` 要素は、ページ全体のデフォルトが改善されるように更新されています。 具体的には: 具体的には: 具体的には: 具体的には: 具体的には:

- すべてのブラウザの余白が削除されています。
- デフォルトのマテリアルデザインの背景色が適用されます。 デフォルトのマテリアルデザインの背景色が適用されます。 デフォルトのマテリアルデザインの背景色が適用されます。 デフォルトのマテリアルデザインの背景色が適用されます。 デフォルトのマテリアルデザインの背景色が適用されます。 標準のデバイスや、白背景に印刷されたデバイスの為に[`theme.palette.background.default`](/customization/default-theme/?expand-path=$.palette.background) が使われています。

### レイアウト

- `ボックスサイズ` は、 `<html>` 要素で `border-box`グローバルに設定されます。 `ボックスサイズ` は、 `<html>` 要素で `border-box`グローバルに設定されます。 すべての要素（ `*:: before` および `*:: after` を含む）は、このプロパティを継承するように宣言されています は、要素の宣言された幅がパディングまたは境界のために超過しないことを保証されます。 `ボックスサイズ` は、 `<html>` 要素で `border-box`グローバルに設定されます。 すべての要素（ `*:: before` および `*:: after` を含む）は、このプロパティを継承するように宣言されています は、要素の宣言された幅がパディングまたは境界のために超過しないことを保証されます。 `ボックスサイズ` は、 `<html>` 要素で `border-box`グローバルに設定されます。 すべての要素（ `*:: before` および `*:: after` を含む）は、このプロパティを継承するように宣言されています は、要素の宣言された幅がパディングまたは境界のために超過しないことを保証されます。 `ボックスサイズ` は、 `<html>` 要素で `border-box`グローバルに設定されます。 すべての要素（ `*:: before` および `*:: after` を含む）は、このプロパティを継承するように宣言されています は、要素の宣言された幅がパディングまたは境界のために超過しないことを保証されます。

### タイポグラフィ

- `<html>`には基本フォントサイズは宣言されていませんが、16pxが想定されています（ブラウザのデフォルト）。 `<html>`には基本フォントサイズは宣言されていませんが、16pxが想定されています（ブラウザのデフォルト）。 デフォルトのフォントサイズの`<html>`を変更した場合の影響については、ここをクリックしてください。[the theme documentation](/customization/typography/#typography-html-font-size) `<html>`には基本フォントサイズは宣言されていませんが、16pxが想定されています（ブラウザのデフォルト）。 デフォルトのフォントサイズの`<html>`を変更した場合の影響については、ここをクリックしてください。[the theme documentation](/customization/typography/#typography-html-font-size) `<html>`には基本フォントサイズは宣言されていませんが、16pxが想定されています（ブラウザのデフォルト）。 デフォルトのフォントサイズの`<html>`を変更した場合の影響については、ここをクリックしてください。[the theme documentation](/customization/typography/#typography-html-font-size) `<html>`には基本フォントサイズは宣言されていませんが、16pxが想定されています（ブラウザのデフォルト）。 デフォルトのフォントサイズの`<html>`を変更した場合の影響については、ここをクリックしてください。[the theme documentation](/customization/typography/#typography-html-font-size)
- `<body>` 要素に `theme.typography.body2` スタイルを設定します。
- Set the font-weight to `theme.typography.fontWeightBold` for the `<b>` and `<strong>` elements.
- Custom font-smoothing is enabled for better display of the Roboto font.

## カスタマイズ

Head to the [global customization](/customization/globals/#global-css) section of the documentation to change the output of these components.