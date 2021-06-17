---
title: React Hidden component
components: Hidden
---

# Hidden

<p class="description">hiddenユーティリティを使用して、コンポーネントの可視性値などを迅速に切り替えます。</p>

**明示的に非表示にしない限り**、すべての要素が表示されます。 Material-UIの [responsive breakpoints](/customization/breakpoints/) との統合を容易にするために、このコンポーネントを使用して任意のコンテンツを非表示にできます。 また、[`Grid`](/components/grid/)コンポーネントと組み合わせて使用することもできます。

## 仕組み

Hiddenは、`xsUp`または`mdDown` などのブレークポイントの範囲、 `{['sm','md','xl']}`などのブレークポイントで機能します。 範囲と個々のブレークポイントを同時に使用して、非常にカスタマイズされた動作を実現できます。 範囲には、指定したブレークポイントが含まれます。

```js
innerWidth  |xs      sm       md       lg       xl
            |--------|--------|--------|--------|-------->
width       |   xs   |   sm   |   md   |   lg   |   xl

smUp        |   show | hide
mdDown      |                     hide | show

```

## 実装

### js

デフォルトでは、`js`実装が使用され、画面サイズを監視する [`withWidth()`](/customization/breakpoints/#withwidth)高次コンポーネントの使用に基づいて、応答的にコンテンツが非表示にされます これには、ブレークポイントに到達しない限りコンテンツをまったくレンダリングしないという利点があります。

### css

サーバ側レンダリングを使用している場合、ブラウザで画面上のコンテンツを再フローしないようにするには、`implementation="css"`と設定します。

## ブレイクポイント

ブレークポイントの `up`プロパティを使用すると、指定した*children*がブレークポイントの位置またはその上*at or above*になります。

{{"demo": "pages/components/hidden/BreakpointUp.js", "bg": true}}

## ブレイクポイント

ブレークポイントの`down`プロパティを使用すると、指定した*children*がブレークポイントの位置またはその上*at or below*になります。

{{"demo": "pages/components/hidden/BreakpointDown.js", "bg": true}}

## Breakpoint only

ブレークポイントの `only`プロパティを使用すると、指定した*children*がブレークポイントの位置またはその上*at*>になります。

`only` プロパティは、次の2つの方法で使用できます。

- 単一のブレークポイントをリストする
- ブレークポイントの配列をリストします

{{"demo": "pages/components/hidden/BreakpointOnly.js", "bg": true}}

## グリッドとの統合

さまざまな応答ブレークポイントで`Grid` を変更することはよくあり、多くの場合、これらの要素の一部を非表示にする必要があります。

{{"demo": "pages/components/hidden/GridIntegration.js", "bg": true}}