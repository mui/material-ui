---
components: CssBaseline
---

# CSSベースライン

<p class="description">Material-UIはCssBaselineコンポーネントを提供することで、エレガントで一貫性のあるシンプルなベースラインを構築します。</p>

貴方はもしかしたら、HTMLの要素と属性のスタイル正規化のコレクションである [normalize.css](https://github.com/necolas/normalize.css)精通しているかもしれません。

```jsx
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* The rest of your application */}
    </React.Fragment>
  );
```

## アプローチ

### ページ

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:

- すべてのブラウザの余白が削除されています。
- デフォルトのマテリアルデザインの背景色が適用されます。 標準のデバイスや、白背景に印刷されたデバイスの為に[`theme.palette.background.default`](/customization/default-theme/?expend-path=$.palette.background) が使われています。

### レイアウト

- `box-sizing` is set globally on the `<html>` element to `border-box`. Every element—including `*::before` and `*::after` are declared to inherit this property, which ensures that the declared width of the element is never exceeded due to padding or border.

### タイポグラフィ

- No base font-size is declared on the `<html>`, but 16px is assumed (the browser default). You can learn more about the implications of changing the `<html>` default font size in [the theme documentation](/customization/typography/#typography-html-font-size) page.
- Set the `theme.typography.body2` style on the `<body>` element.
- Set the font-weight to "bolder" for the `<b>` and `<strong>` elements. Bolder is one font weight heavier than the parent element (among the available weights of the font).
- Font antialiasing is enabled for better display of the Roboto font.