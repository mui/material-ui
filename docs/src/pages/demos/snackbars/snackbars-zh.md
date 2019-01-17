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

## Customized Snackbars

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here are examples of how you can change the look of a Snackbar.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/snackbars/CustomizedSnackbars.js"}}

## 定位消息条(Snackbar)

There may be circumstances when the placement of the snackbar needs to be more flexible.

{{"demo": "pages/demos/snackbars/PositionedSnackbar.js"}}

## Message Length

Some snackbars with varying message length.

{{"demo": "pages/demos/snackbars/LongTextSnackbar.js"}}

## 过渡动画

### Consecutive Snackbars

Per [Google's guidelines](https://material.io/design/components/snackbars.html#snackbars-toasts-usage), when a second snackbar is triggered while the first is displayed, the first should start the contraction motion downwards before the second one animates upwards.

{{"demo": "pages/demos/snackbars/ConsecutiveSnackbars.js"}}

### Don't block the floating action button

Move the floating action button vertically to accommodate the snackbar height.

{{"demo": "pages/demos/snackbars/FabIntegrationSnackbar.js"}}

### Control Direction

Change the direction of the transition. Slide is the default transition.

{{"demo": "pages/demos/snackbars/DirectionSnackbar.js"}}

### 更改过渡动画

Use a different transition all together.

{{"demo": "pages/demos/snackbars/FadeSnackbar.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### notistack

![stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

In the following example, we demonstrate how to use [notistack](https://github.com/iamhosseindhv/notistack). notistack makes it easy to display snackbars (so you don't have to deal with open/close state of them). It also enables you to stack them on top of one another.

{{"demo": "pages/demos/snackbars/IntegrationNotistack.js"}}