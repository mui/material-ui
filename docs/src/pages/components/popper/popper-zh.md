---
title: 弹出器 React 组件
components: Popper
---

# Popper 弹出提示

<p class="description">一个弹出窗口可以用来在另一个窗口的顶部显示某些内容。 这是react-popper的一个替代组件。</p>

`Popper` 组件的一些重要功能：

- Popper 使用第三方库[Popper.js](https://github.com/FezVrasta/popper.js) 来定位。
- 💄 It's an alternative API to react-popper. 它是为了简单性而设计。
- 📦 [10 kB gzipped](/size-snapshot) ([7 kB](https://bundlephobia.com/result?p=popper.js) from Popper.js).
- The children is [`Portal`](/components/portal/) to the body of the document to avoid rendering problems. You can disable this behavior with `disablePortal`.
- The scroll isn't blocked like with the [`Popover`](/components/popover/) component. The placement of the popper updates with the available area in the viewport.
- Clicking away does not hide the `Popper` component. If you need this behavior, you can use [`ClickAwayListener`](/components/click-away-listener/) - see the example in the [menu documentation section](/components/menus/#menulist-composition).
- The `anchorEl` is passed as the reference object to create a new `Popper.js` instance.

## 简单 Popper

{{"demo": "pages/components/popper/SimplePopper.js"}}

## 过渡动画

The open/close state of the popper can be animated with a render prop child and a transition component. This component should respect the following conditions:

- Be a direct child descendent of the popper.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the popper to unmount the child content when closed and fully transitioned.

弹出组件Popper已经内嵌支持 [react-transition-group](https://github.com/reactjs/react-transition-group)。

{{"demo": "pages/components/popper/TransitionsPopper.js"}}

或者，你可以使用 [react-spring](https://github.com/react-spring/react-spring)。

{{"demo": "pages/components/popper/SpringPopper.js"}}

## 特定位置的弹出窗口

{{"demo": "pages/components/popper/PositionedPopper.js", "bg": true}}

## 滑动背景

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideToolbar": true, "bg": true}}

## Faked reference object

The `anchorEl` property can be a reference to a fake DOM element. You just need to create an object shaped like the [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123).

Highlight part of the text to see the popper:

{{"demo": "pages/components/popper/FakedReferencePopper.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

在大多数情况下，一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 可以为你处理popper 的 state 。

{{"demo": "pages/components/popper/PopperPopupState.js"}}