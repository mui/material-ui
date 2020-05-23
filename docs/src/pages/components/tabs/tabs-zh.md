---
title: React Tabs 选项卡组件
components: Tabs, Tab, TabScrollButton
---

# Tabs 选项卡

<p class="description">使用选项卡，你可以轻松地浏览和切换不同的视图。</p>

对于在同一层次，并且息息相关的内容组，使用[选项卡](https://material.io/design/components/tabs.html) 能够将它们分组并且在其之间切换。

## 简单的选项卡

一个没有多余装饰的简单例子

{{"demo": "pages/components/tabs/SimpleTabs.js", "bg": true}}

### 包装的标签

对于那些比较长的标签，它们会被自动包装成选项卡。 如果标签超出了选项卡的长度，它则会溢出，并且文本会隐藏。

{{"demo": "pages/components/tabs/TabsWrappedLabel.js", "bg": true}}

### 不可用的选项卡

选项卡的 `disabled` 属性能将其设置为不可用的状态。

{{"demo": "pages/components/tabs/DisabledTabs.js", "bg": true}}

## 固定的选项卡

固定的标签应与定量的选项卡一起使用，而将它们整齐放置则会有助于用户的肌肉记忆。

### 全宽

若是较小的视图，则应使用 `variant="fullWidth"` 属性。 在这个演示中你还可以借鉴用 [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) 来设置选项卡的过渡动画，并且在使用触摸设备时滑动标签。

{{"demo": "pages/components/tabs/FullWidthTabs.js", "bg": true}}

### 居中对齐

而对于较大的视图，则应使用 `centered` 此属性。

{{"demo": "pages/components/tabs/CenteredTabs.js", "bg": true}}

## 可滚动的选项卡

### 自动滚动按钮

左右滚动按钮将自动在桌面显示，并在移动设备上隐藏。 （基于视图宽度）

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js", "bg": true}}

### 强制滚动按钮

无论视图的宽度如何，都将显示左右滚动按钮。

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js", "bg": true}}

### 防止滚动按钮

永远不会显示左右滚动按钮。 所有的滚动比如通过用户代理的滚动机制来发起（例如，左右滑动，移动鼠标滑轮等等）。

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js", "bg": true}}

## 自定义的选项卡

以下是自定义组件的一个示例。 您可以在[重写文档页面](/customization/components/)中了解更多有关此内容的信息。

{{"demo": "pages/components/tabs/CustomizedTabs.js", "bg": true}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/tabs/).

## 垂直的选项卡

{{"demo": "pages/components/tabs/VerticalTabs.js", "bg": true}}

## 导航选项卡

默认情况下，选项卡会使用 `按钮` 组件，但您也可以提供自定义的标签或组件。 下面是一个实现导航选项卡的例子：

{{"demo": "pages/components/tabs/NavTabs.js", "bg": true}}

## 图标选项卡

选项卡的标签可以是所有的图标或者所有的文本。

{{"demo": "pages/components/tabs/IconTabs.js", "bg": true}}

{{"demo": "pages/components/tabs/IconLabelTabs.js", "bg": true}}

## 可访问性

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tabpanel)

The following steps are needed in order to provide necessary information for assistive technologies:

1. Label `Tabs` via `aria-label` or `aria-labelledby`.
2. `Tab`s need to be connected to their corresponding `[role="tabpanel"]` by setting the correct `id`, `aria-controls` and `aria-labelledby`.

An example for the current implementation can be found in the demos on this page. We've also published [an experimental API](#experimental-api) in `@material-ui/lab` that does not require extra work.

### Keyboard navigation

The components implement keyboard navigation using the "manual activation" behavior. If you want to switch to the "selection automatically follows focus" behavior you have pass `selectionFollowsFocus` to the `Tabs` component. The WAI-ARIA authoring practices have a detailed guide on [how to decide when to make selection automatically follow focus](https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus).

#### `selectionFollowsFocus` Demo

The following two demos only differ in their keyboard navigation behavior. Focus a tab and navigate with arrow keys to notice the difference.

{{"demo": "pages/components/tabs/AccessibleTabs.js", "bg": true}}

## Experimental API

`@material-ui/lab` offers utility components that inject props to implement accessible tabs following [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel).

{{"demo": "pages/components/tabs/LabTabs.js", "bg": true}}