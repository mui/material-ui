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

Finally, you need to provide an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to the `useMediaQuery` with the previously guessed characteristics. Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate matchMedia is recommended.

{{"demo": "pages/components/use-media-query/SimpleMediaQuery.js", "defaultCodeOpen": true}}

⚠️ You can't use `'print'` per browsers limitation, e.g. [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=774398).

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

{{"demo": "pages/components/use-media-query/ThemeHelper.js", "defaultCodeOpen": false}}

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

## テスト

You need an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) in your test environment.

たとえば、 [jsdomはまだサポートしていません](https://github.com/jsdom/jsdom/blob/master/test/web-platform-tests/to-upstream/html/browsers/the-window-object/window-properties-dont-upstream.html)。 ポリフィルしたほうがいいですよ。 Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it is recommended. ポリフィルしたほうがいいですよ。 Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate it is recommended.

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

## サーバーサイドレンダリング

> ⚠️サーバー側のレンダリングとクライアント側のメディアクエリは基本的に対立しています。 トレードオフに注意してください。 サポートは部分的にのみ可能です。

Try relying on client-side CSS media queries first. たとえば、

- [`<Box display>`](/system/display/#hiding-elements)
- [`themes.breakpoints.up(x)`](/customization/breakpoints/#css-media-queries)
- or [`<Hidden implementation="css">`](/components/hidden/#css)

If none of the above alternatives are an option, you can proceed reading this section of the documentation.

First, you need to guess the characteristics of the client request, from the server. You have the choice between using:

- **User agent**. Parse the user agent string of the client to extract information. Using [ua-parser-js](https://github.com/faisalman/ua-parser-js) to parse the user agent is recommended.
- **Client hints**. Read the hints the client is sending to the server. Be aware that this feature is [not supported everywhere](https://caniuse.com/#search=client%20hint).

Finally, you need to provide an implementation of [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to the `useMediaQuery` with the previously guessed characteristics. Using [css-mediaquery](https://github.com/ericf/css-mediaquery) to emulate matchMedia is recommended.

For instance on the server-side:

```js
width: deviceType === 'mobile' ?
      import ReactDOMServer from 'react-dom/server';
import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@material-ui/core/styles';

function handleRender(req, res) {
  const deviceType = parser(req.headers['user-agent']).device.type || 'desktop';
  const ssrMatchMedia = query => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser. '0px' : '1024px',
    }),
  });

  const html = ReactDOMServer.renderToString(
    <ThemeProvider
      theme={{
        props: {
          // Change the default options of useMediaQuery
          MuiUseMediaQuery: { ssrMatchMedia },
        },
      }}
    >
      <App />
    </ThemeProvider>,
  );

  // …
}
```

{{"demo": "pages/components/use-media-query/ServerSide.js", "defaultCodeOpen": false}}

Make sure you provide the same custom match media implementation to the client-side to guarantee a hydration match.

## `withWidth（）`からの移行

`withWidth()`上位コンポーネントは、ページの画面幅を挿入します。 `useWidth` フックで同じ動作を再現できます： `withWidth()`上位コンポーネントは、ページの画面幅を挿入します。 `useWidth` フックで同じ動作を再現できます：

{{"demo": "pages/components/use-media-query/UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### 引数

1. `query` （*String* | *Function*）：処理するメディアクエリを表す文字列、または文字列を返す（コンテキスト内の）テーマを受け入れるコールバック関数。
2. `オプション` (*オプジェクト* [任意]): 
  - `options.noSsr` (*ブール値* [任意]): デフォルト値 `false`. サーバー側のレンダリング調整を実行するには、2回レンダリングする必要があります。 1回目は何もない状態で、2回目は子要素と一緒です。 このダブルパスレンダリングサイクルには欠点があります。 遅いです。 サーバ側でレンダリングを`実行しない`場合は、このフラグを`true`に設定します。
  - `options.matchMedia` (*Function* [optional]) You can provide your own implementation of *matchMedia*. This can be used for handling an iframe content window.
  - `options.noSsr` (*ブール値* [任意]): デフォルト値 `false`. サーバー側のレンダリング調整を実行するには、2回レンダリングする必要があります。 1回目は何もない状態で、2回目は子要素と一緒です。 このダブルパスレンダリングサイクルには欠点があります。 遅いです。 サーバ側でレンダリングを`実行しない`場合は、このフラグを`true`に設定します。
  - `options.ssrMatchMedia` (*Function* [optional]) You can provide your own implementation of *matchMedia* in a [server-side rendering context](#server-side-rendering).

Note: You can change the default options using the [`default props`](/customization/globals/#default-props) feature of the theme with the `MuiUseMediaQuery` key.

#### 戻り値

`matches`：ドキュメントが現在メディアクエリと一致する場合は`true` 、一致しない場合は`false`になります。

#### 例

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
```