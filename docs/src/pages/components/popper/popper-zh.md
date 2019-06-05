---
title: 弹出器 React 组件
components: Popper
---

# 弹出提示 (Popper)

<p class="description">Popper 可以用来在其他元素之上显示一些内容。它是 react-popper 的替代品。</p>

`Popper` 组件的一些重要功能：

- 
- 
- 
- 子级元素是使用 [`Portal`](/components/portal/) 组件，以避免在文档中出现问题。 您可以使用 `disablePortal` 禁用此行为。
- 和 [`Popver`](/components/popover/) 不同，滚动和单击不会被阻止。 Popper组件会随着可视窗口中的可使用区域更新其位置。
- Clicking away does not hide the `Popper` component. If you need this behavior, you can use [`ClickAwayListener`](/components/click-away-listener/) - see the example in the [menu documentation section](/components/menus/#menulist-composition).
- The `anchorEl` is passed as the reference object to create a new `Popper.js` instance.

## 简单 Popper

{{"demo": "pages/components/popper/SimplePopper.js" }}

## 最小化的 Popper

你可以使用该组件而不需要任何附加依赖。

{{"demo": "pages/components/popper/MinimalPopper.js" }}

## Scroll playground

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideHeader": true}}

## Positioned Popper

{{"demo": "pages/components/popper/PositionedPopper.js"}}

## 没有过渡效果的 Popper

{{"demo": "pages/components/popper/NoTransitionPopper.js"}}

## Faked reference object

The `anchorEl` property can be a reference to a fake DOM element. You just need to create an object shaped like the [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123).

Highlight part of the text to see the popper:

{{"demo": "pages/components/popper/FakedReferencePopper.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

在大多数情况下，一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 可以为你处理popper 的 state 。

{{"demo": "pages/components/popper/PopperPopupState.js"}}