# 使い方

<p class="description">Material-UIとReactを今すぐ始めましょう。</p>

Material-UIコンポーネントは独立して機能します。 **They are self-supporting**, and will only inject the styles they need to display. それらは[normalize.css](https://github.com/necolas/normalize.css/)のようなグローバルのスタイルシートには依存しません。

ドキュメントに示されているように、任意のコンポーネントを使用できます。 どのようにインポートされるか確認する為にそれぞれのコンポーネントの[デモページ](/components/buttons/)を参照してください。

## 今すぐ始める

これがすぐ始める為の簡単な例です、**文字通り必要とする全てです**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

そうです。これは本当に始めるのに必要な全てです。この編集可能なデモで確認できるように:

{{"demo": "pages/getting-started/usage/Usage.js", "hideHeader": true}}

## グローバル

知っておく必要のあるいくつかの重要なことで、Material-UIの使い易さは改善されます。

### Responsive meta tag

Material-UIは最初にモバイルで開発されました。最初にモバイル端末用のコードを記述し、次にCSSメディアクエリを使用して必要に応じてコンポーネントを拡張するという方法を用いています。 すべてのデバイスで適切なレンダリングとタッチズームを確実なものにするには、responsive viewport metaタグを`<head>`に追加します。

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
/>
```

### CssBaseline

Material-UIはオプションで[CssBaseline](/components/css-baseline/)コンポーネントを提供しています。 It fixes some inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.

## バージョン管理されたドキュメント

このドキュメントは常に最新の安定版のMaterial-UIを反映しています。 古いバージョンのドキュメントは、[別のページ ](/versions/)にあります。

## 次のステップ

これで基本的なセットアップがわかったので、次の項目について詳しく学びましょう。

- [Material Designフォントとタイポグラフィ](/components/typography/)を導入する方法
- [テーマのカスタマイズ](/customization/themes/)を活用する方法
- コンポーネントの見た目を[上書き](/customization/components/)する方法