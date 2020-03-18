---
title: React 选项卡组件
components: Tabs, Tab
---

# Tabs 选项卡

<p class="description">选项卡可以轻松浏览和切换不同的视图.</p>

[选项卡](https://material.io/design/components/tabs.html) 组织并允许在与层次结构级别相同的内容组之间进行导航。

## 简单选项卡

一个没有多余装饰的简单例子

{{"demo": "pages/components/tabs/SimpleTabs.js", "bg": true}}

### 包裹标签

Long labels will automatically wrap on tabs. If the label is too long for the tab, it will overflow and the text will not be visible.

{{"demo": "pages/components/tabs/TabsWrappedLabel.js", "bg": true}}

### 禁用的选项

可以通过设置 ` disabled ` 属性来禁用选项卡。

{{"demo": "pages/components/tabs/DisabledTabs.js", "bg": true}}

## 固定选项卡

固定标签应与有限数量的标签一起使用, 并且一致的放置将有助于肌肉记忆.

### 100%宽度

`variant="fullWidth"` 属性应该用于较小的视图。 此演示还使用[ react-swipeable-views ](https://github.com/oliviertassinari/react-swipeable-views)来设置 Tab 过渡动画，并允许在触摸设备上滑动标签。

{{"demo": "pages/components/tabs/FullWidthTabs.js", "bg": true}}

### 居中对齐

应将 `centered` 属性用于较大的视图.

{{"demo": "pages/components/tabs/CenteredTabs.js", "bg": true}}

## 可滚动的选项卡

### 自动滚动按钮

Left and right scroll buttons will automatically be presented on desktop and hidden on mobile. (based on viewport width)

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js", "bg": true}}

### 强制滚动按钮

无论视口宽度如何，都将显示左右滚动按钮。

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js", "bg": true}}

### 防止滚动按钮

Left and right scroll buttons will never be presented. All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift-mousewheel, etc.)

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js", "bg": true}}

## 自定义选项卡

以下是自定义组件的一个示例。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/tabs/CustomizedTabs.js", "bg": true}}

👑如果您还在寻找灵感，您可以看看 [MUI Treasury 特别定制的一些例子](https://mui-treasury.com/components/tabs)。

## 垂直选项卡

{{"demo": "pages/components/tabs/VerticalTabs.js", "bg": true}}

## 导航选项卡

By default tabs use a `button` element, but you can provide your own custom tag or component. Here's an example of implementing tabbed navigation:

{{"demo": "pages/components/tabs/NavTabs.js", "bg": true}}

## 图标选项卡

标签标签可以是所有图标或全文。

{{"demo": "pages/components/tabs/IconTabs.js", "bg": true}}

{{"demo": "pages/components/tabs/IconLabelTabs.js", "bg": true}}