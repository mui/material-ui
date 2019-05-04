---
title: React 消息条(Snackbar) 组件
components: Snackbar, SnackbarContent
---
# 消息条(Snackbar)

<p class="description">消息条(Snackbar)通过一条消息来提供有关应用进程的简短信息-通常在屏幕底部</p>

[消息条(Snackbar)](https://material.io/design/components/snackbars.html) 通知用户应用程序已执行或将执行的进程。 它们会从屏幕底部短暂出现。 它们不应中断用户体验, 也不要求用户的操作来关闭。

消息条(Snackbar)包含与执行的操作直接相关的单行文本。 它们可能包含文本操作, 但没有图标。您可以使用它们来显示通知。

#### 频率

一次只能显示一个消息条(Snackbar)。

## 基本消息条（Snackbar)

一个旨在重现Google Keep消息条行为的基本消息条(Snackbar)。

{{"demo": "pages/demos/snackbars/SimpleSnackbar.js"}}

## 自定义的消息条(Snackbar)

如果您有阅读[重写样式文档页面](/customization/overrides/) 但你还不是很自信能够完全掌握， 以下是如何更改一个消息条(Snackbar)的主要颜色的示例

⚠️虽然 Material design 规范鼓励样式化，但这些例子是不合适的。

{{"demo": "pages/demos/snackbars/CustomizedSnackbars.js"}}

## 定位消息条(Snackbar)

在很多情况下消息条(Snackbar)的位置需要更灵活些。

{{"demo": "pages/demos/snackbars/PositionedSnackbar.js"}}

## 消息长度

不同消息长度的消息条(Snackbar)。

{{"demo": "pages/demos/snackbars/LongTextSnackbar.js"}}

## 过渡动画

### 连续的消息条(Snackbar)

When multiple snackbar updates are necessary, they should appear one at a time.

{{"demo": "pages/demos/snackbars/ConsecutiveSnackbars.js"}}

### Snackbars and floating action buttons (FABs)

Snackbars should appear above FABs (on mobile).

{{"demo": "pages/demos/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 500}}

### 更改过渡动画

[Grow](/utils/transitions/#grow) is the default transition but you can use a different one.

{{"demo": "pages/demos/snackbars/TransitionsSnackbar.js"}}

### Control Slide direction

You can change the direction of the [Slide](/utils/transitions/#slide) transition.

{{"demo": "pages/demos/snackbars/DirectionSnackbar.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### notistack

![stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

在下面的示例中, 我们演示如何使用 [notistack](https://github.com/iamhosseindhv/notistack)。 notistack可以很容易地显示零食栏（因此您不必处理它们的打开/关闭状态）。 It also enables you to stack them on top of one another (but discouraged by the specification).

{{"demo": "pages/demos/snackbars/IntegrationNotistack.js"}}