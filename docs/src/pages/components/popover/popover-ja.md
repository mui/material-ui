---
title: Popper React component
components: Grow, Popover
---

# Popover

<p class="description">Popoverを使用すると、一部のコンテンツを別のコンテンツの上に表示できます。</p>

`Popover` コンポーネントを使用する際の注意事項：

- コンポーネントは、 [`Modal`](/components/modal/) コンポーネントの上に構築されます。
- [`Popper`](/components/popper/) コンポーネントとは異なり、スクロールとクリックはブロックされます。

## Simple Popover

{{"demo": "pages/components/popover/SimplePopover.js" }}

## Anchor playground

ラジオボタンを使用して、 `anchorOrigin` および `transformOrigin` 位置を調整します。 `anchorReference` を `anchorPosition` または `anchorEl`設定することもできます。 `anchorPosition`の場合、コンポーネントは`anchorEl`の代わりに ポップオーバーの位置を調整する`anchorPosition` >propを参照してください。

{{"demo": "pages/components/popover/AnchorPlayground.js", "hideHeader": true}}

## マウスオーバー操作

This demonstrates how to use the `Popover` component to implement a popover behavior based on the mouse over event.

{{"demo": "pages/components/popover/MouseOverPopover.js"}}

## 補完プロジェクト

より高度な使用例では、以下を利用できます。

### PopupState helper

There is a 3rd party package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of popover state for you in most cases.

{{"demo": "pages/components/popover/PopoverPopupState.js"}}