---
title: 弹出器 React 组件
components: Popper
---
# Popper

<p class="description">Popper 可以用来在其他元素之上显示一些内容。它是 react-popper 的替代品。</p>

`Popper` 组件的一些重要功能：

- 
- 
- 
- 子级元素是使用 [`Portal`](/utils/portal/) 组件，以避免在文档中出现问题。 您可以使用 `disablePortal` 禁用此行为。
- 和 [`Popver`](/utils/popover/) 不同，滚动和单击不会被阻止。 Popper组件会随着可视窗口中的可使用区域更新其位置。
- 将 `anchorEl` 作为引用对象传递以创建新的 `Popper.js` 实例。

## 简单波普尔

{{"demo": "pages/utils/popper/SimplePopper.js" }}

## 滚动游乐场

{{"demo": "pages/utils/popper/ScrollPlayground.js"}}

## 定位波普尔

{{"demo": "pages/utils/popper/PositionedPopper.js"}}

## 没有过渡波普尔

{{"demo": "pages/utils/popper/NoTransitionPopper.js"}}

## 伪造的参考对象

`anchorEl` 属性可以是对伪DOM元素的引用。 您只需要创建一个形状类似于 [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123)。

突出显示部分文本以查看popper：

{{"demo": "pages/utils/popper/FakedReferencePopper.js"}}

## Render Props

这是一个 [渲染道具](https://reactjs.org/docs/render-props.html) 演示， 跟踪单个popper的本地状态。

{{"demo": "pages/utils/popper/RenderPropsPopper.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

在大多数情况下，有一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 可以为你处理popper 状态。

{{"demo": "pages/utils/popper/PopperPopupState.js"}}