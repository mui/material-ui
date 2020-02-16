---
title: 气泡卡片 React 组件
components: Grow, Popover
---

# Popover 弹出框

<p class="description">弹出框可用于在元素边缘显示某些内容。</p>

使用 `Popover` 组件时需要了解的事项：

- The component is built on top of the [`Modal`](/components/modal/) component.
- The scroll and click away are blocked unlike with the [`Popper`](/components/popper/) component.

## 简单的弹出窗口

{{"demo": "pages/components/popover/SimplePopover.js" }}

## 锚点播放场

使用单选按钮调整 `anchorOrigin` 和 `transformOrigin` 位置。 您还可以将 `anchorReference` 设置为 `anchorPosition` 或 `anchorEl`。 当它是 `anchorPosition`，该组件将代替 `anchorEl`， 指的是 `anchorPosition` 道具，其可以调整设置 的酥料饼的位置。

{{"demo": "pages/components/popover/AnchorPlayground.js", "hideHeader": true}}

## 鼠标悬停在互动上

This demonstrates how to use the `Popover` component to implement a popover behavior based on the mouse over event.

{{"demo": "pages/components/popover/MouseOverPopover.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

在大多数情况下，一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 可以为你处理popper 的 state 。

{{"demo": "pages/components/popover/PopoverPopupState.js"}}