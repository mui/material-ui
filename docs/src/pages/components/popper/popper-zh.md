---
title: 弹出器 React 组件
components: Popper
---

# Popper 弹出提示

<p class="description">一个气泡卡片可以用来在另一个窗口的顶部显示某些内容。 这是 react-popper 的一个替代组件。</p>

以下是 `Popper` 组件的一些重要功能：

- 🕷 Popper 依赖第三方库 ([Popper.js](https://github.com/FezVrasta/popper.js)) 来定位。
- 💄 这是 react-popper 的一个替代性组件。 它旨在简化。
- 📦 [10 kB gzipped](/size-snapshot) ([7 kB](https://bundlephobia.com/result?p=popper.js) 来自 Popper.js).
- 子组件以 [`Portal`](/components/portal/) 形式呈现在 DOM 中，以避免渲染问题。 您可以使用 `disablePortal` 禁用此行为。
- 不同于 [`Popover`](/components/popover/) 组件，滚动行为是可被允许的。 The placement of the popper updates with the available area in the viewport.
- 点击不会隐藏 `Popper` 组件。 如果你确实需要这一行为，则可以使用 [`ClickAwayListener`](/components/click-away-listener/) - 见 [menu documentation section](/components/menus/#menulist-composition) 中的样例。
- ` anchorEl ` 作为创建新 `Poper.js` 实例的参考对象所传递。

## 简单 Popper

{{"demo": "pages/components/popper/SimplePopper.js"}}

## 过渡动画

气泡卡片的 打开/关闭 可以使用一个过渡组件进行动画化处理。 此组件应遵守以下条件：

- 成为气泡卡片的直接子组件。
- 在进入过渡开始时调用 prop 中的 `onEnter` 回调。
- 在退出过渡完成后调用 prop 中的 `onExited` 回调。 这两个回调允许气泡卡片在关闭并完全过渡 (when closed and fully transitioned) 时卸载子内容。

弹出组件Popper已经内嵌支持 [react-transition-group](https://github.com/reactjs/react-transition-group)。

{{"demo": "pages/components/popper/TransitionsPopper.js"}}

或者，你可以使用 [react-spring](https://github.com/react-spring/react-spring)。

{{"demo": "pages/components/popper/SpringPopper.js"}}

## 特定位置的弹出窗口

{{"demo": "pages/components/popper/PositionedPopper.js", "bg": true}}

## 滑动测试

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideToolbar": true, "bg": true}}

## 占位的参考对象

The `anchorEl` property can be a reference to a fake DOM element. 您只需要创建一个类似于 [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123) 的对象。

选中部分文本以看到气泡卡片：

{{"demo": "pages/components/popper/FakedReferencePopper.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

在大多数情况下，一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 可以为你处理 popper 的 state 。

{{"demo": "pages/components/popper/PopperPopupState.js"}}