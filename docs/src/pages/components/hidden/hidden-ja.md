---
title: Hidden React component
components: Hidden
---

# Hidden

<p class="description">非表示のユーティリティを使用して、コンポーネントの表示/非表示の値などをすばやくすばやく切り替えることができます。</p>

**明示的に非表示にしない限り**、すべての要素が表示されます。 Materialized UIの [responsive breakpoints](/customization/breakpoints/) との統合を容易にするには、次の手順に従います。 このコンポーネントを使用して任意のコンテンツを非表示にできます。 また、[`Grid`](/components/grid/)コンポーネントと組み合わせて使用することもできます。

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

{{"demo": "pages/components/hidden/BreakpointUp.js"}}

## ブレイクポイント

Using any breakpoint `down` property, the given *children* will be hidden *at or below* the breakpoint.

{{"demo": "pages/components/hidden/BreakpointDown.js"}}

## Breakpoint only

Using the breakpoint `only` property, the given *children* will be hidden *at* the specified breakpoint(s).

The `only` property can be used in two ways:

- list a single breakpoint
- list an array of breakpoints

{{"demo": "pages/components/hidden/BreakpointOnly.js"}}

## Integration with Grid

It is quite common to alter `Grid` at different responsive breakpoints, and in many cases, you want to hide some of those elements.

{{"demo": "pages/components/hidden/GridIntegration.js"}}