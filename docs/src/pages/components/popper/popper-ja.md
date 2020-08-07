---
title: Popper React component
components: Popper
---

# Popper

<p class="description">Popperを使用すると、一部のコンテンツを別のコンテンツの上に表示できます。 これは、react-popperの代替です。 これは、react-popperの代替API です。 シンプルさを目指しています。</p>

`Popper` コンポーネントのいくつかの重要な機能：

- Popperは、サードパーティのライブラリ([Popper.js](https://github.com/FezVrasta/popper.js))を使用して、最適な配置を行います。
- これは、react-popperの代替API です。 シンプルさを目指しています。 シンプルさを目指しています。
- 📦 [10 kB gzipped](/size-snapshot) ([7 kB](https://bundlephobia.com/result?p=popper.js) from Popper.js).
- レンダリングの問題を回避するため、子はドキュメントの本文に対して [`Portal`](/components/portal/)となります。 `disablePortal`この動作を無効にできます。 `disablePortal`この動作を無効にできます。
- スクロールは、 [`Popover`](/components/popover/)コンポーネントのようにブロックされません。 ポッパーの配置は、ビューポートの利用可能な領域で更新されます。 ポッパーの配置は、ビューポートの利用可能な領域で更新されます。
- クリックしても `Popper` コンポーネントは非表示になりません。 クリックしても `Popper` コンポーネントは非表示になりません。 この動作が必要な場合は、 [`ClickAwayListener`](/components/click-away-listener/) 使用することができます - [メニュードキュメンテーションセクション](/components/menus/#menulist-composition)例を参照してください。
- `anchorEl` は、新しい `Popper.js` インスタンスを作成するための参照オブジェクトとして渡されます。

## シンプルポッパー

{{"demo": "pages/components/popper/SimplePopper.js"}}

## Transitions

The open/close state of the popper can be animated with a render prop child and a transition component. This component should respect the following conditions:

- Be a direct child descendent of the popper.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. Call the `onExited` callback prop when the exit transition is completed.

Popper has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/popper/TransitionsPopper.js"}}

Alternatively, you can use [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/popper/SpringPopper.js"}}

## 位置決めポッパー

{{"demo": "pages/components/popper/PositionedPopper.js", "bg": true}}

## Scroll playground

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideToolbar": true, "bg": true}}

## 偽の参照オブジェクト

`anchorEl` プロパティは、偽のDOM要素への参照することができます。 `anchorEl` プロパティは、偽のDOM要素への参照することができます。 [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123)のような形のオブジェクトを作成するだけです。

テキストの一部をハイライトして、ポップヒントを表示します。

{{"demo": "pages/components/popper/FakedReferencePopper.js"}}

## 補完プロジェクト

より高度な使用例では、以下を利用できます。

### PopupState helper

サードパーティ製のパッケージ [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) があり、ほとんどの場合、popperの状態を管理してくれます。

{{"demo": "pages/components/popper/PopperPopupState.js"}}