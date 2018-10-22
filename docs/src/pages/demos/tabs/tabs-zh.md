---
title: React 选项卡组件
components: Tabs, Tab
---
# 选项卡

<p class="description">选项卡可以轻松浏览和切换不同的视图.</p>

[选项卡](https://material.io/design/components/tabs.html) 组织并允许在与层次结构级别相同的内容组之间进行导航。

## 简单选项卡

一个简单例子

{{"demo": "pages/demos/tabs/SimpleTabs.js"}}

### 包裹标签

长标签将自动换行标签。 如果标签的标签太长，它将溢出并且文本将不可见。

{{"demo": "pages/demos/tabs/TabsWrappedLabel.js"}}

### 禁用的选项

可以通过设置 ` disabled ` 属性来禁用选项卡。

{{"demo": "pages/demos/tabs/DisabledTabs.js"}}

## 固定选项卡

固定标签应与有限数量的标签一起使用, 并且一致的放置将有助于肌肉记忆.

### 100%宽度

` fullWidth </ code>属性应该用于较小的视图。
此演示还使用<a href="https://github.com/oliviertassinari/react-swipeable-views"> react-swipeable-views </a>来设置 Tab 过渡动画，并允许在触摸设备上滑动标签。</p>

<p>{{"demo": "pages/demos/tabs/FullWidthTabs.js"}}</p>

<h3>居中对齐</h3>

<p>应将 <code>centered` 属性用于较大的视图.

{{"demo": "pages/demos/tabs/CenteredTabs.js"}}

## 可滚动的选项卡

### 自动滚动按钮

左右滚动按钮将自动显示在桌面上并隐藏在移动设备上。（基于视口宽度）

{{"demo": "pages/demos/tabs/ScrollableTabsButtonAuto.js"}}

### 强制滚动按钮

无论视口宽度如何，都将显示左右滚动按钮。

{{"demo": "pages/demos/tabs/ScrollableTabsButtonForce.js"}}

### 防止滚动按钮

永远不会出现左右滚动按钮。 必须通过用户代理滚动机制（例如左/右滑动，移位 - 鼠标滚轮等）启动所有滚动

{{"demo": "pages/demos/tabs/ScrollableTabsButtonPrevent.js"}}

## 图标选项卡

标签标签可以是所有图标或全文。

{{"demo": "pages/demos/tabs/IconTabs.js"}} {{"demo": "pages/demos/tabs/IconLabelTabs.js"}}

## 导航选项卡

默认情况下，选项卡使用 button </ code>元素，但您可以提供自己的自定义标记或组件。 以下是实现选项卡式导航的示例：</p>

<p>{{"demo": "pages/demos/tabs/NavTabs.js"}}</p>

<h2>定制选项卡</h2>

<p>如果您已阅读<a href="/customization/overrides/">覆盖文档页面</a>
但是不自信地跳进来，这里是一个如何改变 Tabs 主色的例子。 以下演示与<a href="https://ant.design/components/tabs/"> Ant Design UI </a>相匹配</p>

<p>{{"demo": "pages/demos/tabs/CustomizedTabs.js"}}</p>