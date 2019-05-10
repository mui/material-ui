---
title: 气泡卡片 React 组件
components: Grow, Popover
---
# 弹出框 (Popover)

<p class="description">弹出框可用于在元素边缘显示某些内容。</p>

使用 `Popover` 组件时需要了解的事项：

- 该组件构建在 [`Modal`](/utils/modal/) 组件之上。
- 与 [`Popper`](/utils/popper/) 组件不同，滚动和单击将被阻止。

## 简单的弹出窗口

{{"demo": "pages/utils/popover/SimplePopover.js" }}

## 锚操场

使用单选按钮调整 `anchorOrigin` 和 `transformOrigin` 位置。 您还可以将 `anchorReference` 设置为 `anchorPosition` 或 `anchorEl`。 当它是 `anchorPosition`，该组件将代替 `anchorEl`， 指的是 `anchorPosition` 道具，其可以调整设置 的酥料饼的位置。

{{"demo": "pages/utils/popover/AnchorPlayground.js", "hideHeader": true}}

## 鼠标悬停在互动上

我们演示了如何使用 `Popover` 组件来实现基于鼠标悬停事件的弹出行为。

{{"demo": "pages/utils/popover/MouseOverPopover.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

在大多数情况下，一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 可以为你处理popper 的 state 。

{{"demo": "pages/utils/popover/PopoverPopupState.js"}}