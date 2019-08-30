---
title: Media queries in React for responsive design
---

# useMediaQuery

<p class="description">これは、ReactのCSSメディアクエリフックです。 CSSメディアクエリへの一致をリッスンします。 クエリが一致するかどうかに基づいてコンポーネントをレンダリングできます。</p>

主な機能の一部：

- ⚛️慣用的なReact APIがあります。
- 🚀定期的に値をポーリングするのではなく、文書を監視して、メディア・クエリーが変更されたときにそれを検出します。
- [1 kB gzipped](/size-snapshot).
- serverサーバー側のレンダリングをサポートします。

## 単純なメディアクエリ

フックの最初の引数にメディアクエリを提供する必要があります。 メディアクエリ文字列は、有効なCSSメディアクエリ（例： `'print'`によって指定できます。

{{"demo": "pages/components/use-media-query/SimpleMediaQuery.js", "defaultCodeOpen": true}}

## Material-UIのブレークポイントヘルパーの使用

Material-UIの [ブレークポイントヘルパー](/customization/breakpoints/) を次のように使用できます。

```jsx
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

{{"demo": "pages/components/use-media-query/ThemeHelper.js"}}

または、コールバック関数を使用して、最初の引数としてテーマを受け入れることもできます。

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

既定の**テーマのサポートはありません**。親テーマプロバイダに挿入する必要があります。

## JavaScriptシンタックスを使用する

JavaScriptオブジェクトからメディアクエリ文字列を生成するには、 [json2mq](https://github.com/akiran/json2mq) を使えます。

{{"demo": "pages/components/use-media-query/JavaScriptMedia.js", "defaultCodeOpen": true}}

## サーバーサイドレンダリング

サーバー上で [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) の実装が必要です。 [css-mediaquery](https://github.com/ericf/css-mediaquery)を使用してエミュレートすることをお勧めします。

{{"demo": "pages/components/use-media-query/ServerSide.js"}}

⚠️サーバー側のレンダリングとクライアント側のメディアクエリは基本的に対立しています。 トレードオフに注意してください。 サポートは部分的にのみ可能です。

Try relying on client-side CSS media queries first. たとえば、

- [`<Box display>`](/system/display/#hiding-elements)
- [`<Hidden implementation="css">`](/components/hidden/#css)
- または [`themes.breakpoints.up（x）`](/customization/breakpoints/#css-media-queries)

## テスト

サーバー側の場合と同様に、テスト環境では [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) 実装が必要です。

たとえば、 [jsdomはまだサポートしていません](https://github.com/jsdom/jsdom/blob/master/test/web-platform-tests/to-upstream/html/browsers/the-window-object/window-properties-dont-upstream.html)。 ポリフィルしたほうがいいですよ。 [css-mediaquery](https://github.com/ericf/css-mediaquery)を使用してエミュレートすることをお勧めします。

```js
import mediaQuery from 'css-mediaquery';

function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}

describe('MyTests', () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
});
```

## `withWidth（）`からの移行

`withWidth()`上位コンポーネントは、ページの画面幅を挿入します。 `useWidth` フックで同じ動作を再現できます：

{{"demo": "pages/components/use-media-query/UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### 引数

1. `query` （*String* | *Function*）：処理するメディアクエリを表す文字列、または文字列を返す（コンテキスト内の）テーマを受け入れるコールバック関数。
2. `オプション` (*オプジェクト* [任意]): 
  - `options.defaultMatches` （*Boolean* [optional]）： `window.matchMedia（）` はサーバーで使用できないため、 最初のマウント時にデフォルトの一致を返します。 既定値は`false`です。
  - `options.noSsr` (*ブール値* [任意]): デフォルト値 `false`. サーバー側のレンダリング調整を実行するには、2回レンダリングする必要があります。 1回目は何もない状態で、2回目は子要素と一緒です。 このダブルパスレンダリングサイクルには欠点があります。 遅いです。 サーバ側でレンダリングを`実行しない`場合は、このフラグを`true`に設定します。
  - `options.ssrMatchMedia` （*機能* [optional]）あなたが近似するヒューリスティックを使用する場合があります クライアントブラウザの画面を表示します。 For instance, you could be using the user-agent or the client-hint https://caniuse.com/#search=client%20hint. テーマで [`custom props`](/customization/globals/#default-props) を使用してグローバルポニーフィルを提供できます。 [サーバー側レンダリングの例](#server-side-rendering)確認してください。

#### 戻り値

`matches`：ドキュメントが現在メディアクエリと一致する場合は`true` 、一致しない場合は`false`になります。

#### 例

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('print');

  return <span>{`@media (min-width:600px) matches: ${matches}`}</span>;
}
```