---
title: Popper React component
components: Popper
---

# Popper

<p class="description">A Popper can be used to display some content on top of another. It's an alternative to react-popper.</p>

`Popper` コンポーネントのいくつかの重要な機能：

- 🕷 Popper relies on the 3rd party library ([Popper.js](https://github.com/FezVrasta/popper.js)) for perfect positioning.
- 💄 It's an alternative API to react-popper. It aims for simplicity.
- 📦 [10 kB gzipped](/size-snapshot) (7 kB from Popper.js).
- The children is [`Portal`](/components/portal/) to the body of the document to avoid rendering problems. You can disable this behavior with `disablePortal`.
- The scroll isn't blocked like with the [`Popover`](/components/popover/) component. The placement of the popper updates with the available area in the viewport.
- クリックしても `Popper` コンポーネントは非表示になりません。 この動作が必要な場合は、 [`ClickAwayListener`](/components/click-away-listener/) 使用することができます - [メニュードキュメンテーションセクション](/components/menus/#menulist-composition)例を参照してください。
- `anchorEl` は、新しい `Popper.js` インスタンスを作成するための参照オブジェクトとして渡されます。

## シンプルポッパー

{{"demo":"pages/components/popper/SimplePopper.js"}}

## ミニマリストポッパー

このコンポーネントは、追加の依存関係なしで使用できます。

{{"demo":"pages/components/popper/MinimalPopper.js"}}

## Scroll playground

{{"demo":"pages/components/popper/ScrollPlayground.js","hideHeader":true}}

## 位置決めポッパー

{{"demo":"pages/components/popper/PositionedPopper.js"}}

## 移行なしPopper

{{"demo":"pages/components/popper/NoTransitionPopper.js"}}

## 偽の参照オブジェクト

`anchorEl` プロパティは、偽のDOM要素への参照することができます。 You just need to create an object shaped like the [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123).

Highlight part of the text to see the popper:

{{"demo":"pages/components/popper/FakedReferencePopper.js"}}

## Complementary projects

より高度なユースケースのためにあなたは利用することができるかもしれません：

### PopupState helper

There is a 3rd party package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of popper state for you in most cases.

{{"demo":"pages/components/popper/PopperPopupState.js"}}