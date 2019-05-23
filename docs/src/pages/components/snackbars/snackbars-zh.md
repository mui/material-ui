---
title: React Snackbar（消息条）组件
components: Snackbar, SnackbarContent
---

# Snackbar（消息条）

<p class="description">Snackbar（消息条）通过一条消息来提供有关应用进程的简要信息 — 它通常位于屏幕的底部。</p>

[消息条](https://material.io/design/components/snackbars.html) 将应用程序已执行或即将执行的进程通知用户。 它们会从屏幕底部短暂地出现。 它们不应中断用户体验，也不要求任何用户的操作来关闭。

消息条包含与执行的操作直接相关的单行文本。它们可能包含文本操作，但没有图标。您可以使用它们来显示通知的内容。

#### 频率

我们规定一次只能显示一个消息条。

## 简单的消息条

一个简单的消息条旨在重现谷歌 Keep 消息条的行为。

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## 自定义的消息条

以下是自定义组件的一些示例。您可以在[重写文档页面](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## 定位的消息条

有一些情况会需要消息条的位置更灵活些。

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## 消息的长度

有些消息条会有不同的长度。

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## 过渡动画

### 连续的消息条

当需要显示多个消息条的时候，一次应该只显示一个。

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### Snackbars（消息条）和 FABs（悬浮按钮）

消息条应当显示在悬浮按钮的上方（这是在移动设备上）。

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 500}}

### 更改过渡动画

[Grow](/components/transitions/#grow)是默认的过渡动画但你可以使用不同的过渡动画。

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### 控制滑动的方向

你可以修改 [Slide](/components/transitions/#slide) 过渡的方向 。

{{"demo": "pages/components/snackbars/DirectionSnackbar.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### notistack

![评星](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm下载](https://img.shields.io/npm/dm/notistack.svg)

在下面的示例中, 我们演示如何使用 [notistack](https://github.com/iamhosseindhv/notistack)。 notistack 可以很容易地显示消息条（因此您不必处理它们的打开/关闭状态）。 它还使您能够将它们堆叠在彼此之上 (但规范不鼓励这样做)。

{{"demo": "pages/components/snackbars/IntegrationNotistack.js"}}