---
title: React 消息条组件
components: Snackbar, SnackbarContent
---

# Snackbar 消息条

<p class="description">消息条组件提供了关于应用流程的简短信息。 该组件也被称为 toast。</p>

[消息条](https://material.io/design/components/snackbars.html)将应用程序已执行或即将执行的进程通知用户。 它们会从屏幕底部短暂地出现。 它们不应中断用户体验，也不要求任何用户的操作来关闭。

消息条包含了一行直接与所执行操作相关的文本。 它们可能包含一些文本操作，但并不会展示图标。 您也可以用他们展示通知。

#### 频率

我们规定一次只能显示一个消息条。

## 简单的消息条

一个简单的消息条旨在重现谷歌 Keep 消息条的行为。

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## 自定义的消息条

你可以参考以下一些例子来自定义组件。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## 定位的消息条

在宽大的布局中，如果消息条始终放在屏幕底部的同一位置，那么可以左对齐或中间对齐，但在某些情况下，消息条的位置可能需要更加灵活。 通过指定 `anchorOrigin` 的属性，您可以控制消息条的位置。

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## 消息的长度

有些消息条会有不同的长度。

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## 过渡动画

### 连续的消息条

当需要显示多个消息条的时候，一次应该只显示一个。

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### 消息条（Snackbars）和悬浮按钮（FABs）

消息条应当显示在悬浮按钮的上方（这是在移动设备上）。

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 400}}

### 更改过渡动画

[Grow](/components/transitions/#grow) 是默认的过渡动画，但你可以使用不同的过渡动画。

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### 控制滑动的方向

你可以修改 [Slide](/components/transitions/#slide) 过渡的方向 。

{{"demo": "pages/components/snackbars/DirectionSnackbar.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### notistack

![评星](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm下载](https://img.shields.io/npm/dm/notistack.svg)

以下例子演示了如何使用 [notistack](https://github.com/iamhosseindhv/notistack)。 notistack 有一个 **imperative API** 可以轻松地显示一串消息条，且无需处理其打开/关闭状态。 您也可以把它们 **堆叠** 在一起（尽管 Material Design 规范不鼓励这样做）。

{{"demo": "pages/components/snackbars/IntegrationNotistack.js", "defaultCodeOpen": false}}

## 无障碍设计

(WAI-ARIA: https://www.w3.org/TR/wai-aria-1.1/#alert)

- 默认情况下，消息条不会自动隐藏。 但是，如果您决定使用 `autoHideDuration` 属性，我们建议给用户提供 [足够的时间](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) 来响应。