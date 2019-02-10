---
title: 面包屑导航React组件
components: Breadcrumbs, Link, Typography
---
# 面包屑导航

<p class="description">面包屑导航允许用户在一系列的值中进行选择。</p>

## 简单的面包屑导航

{{"demo": "pages/demos/breadcrumbs/SimpleBreadcrumbs.js"}}

## 自定义分隔符

在以下的示例中，我们使用了两个字符串分隔符和一个SVG图标。

{{"demo": "pages/demos/breadcrumbs/CustomSeparator.js"}}

## 带图标的面包屑导航

{{"demo": "pages/demos/breadcrumbs/IconBreadcrumbs.js"}}

## 可折叠的面包屑导航

{{"demo": "pages/demos/breadcrumbs/CollapsedBreadcrumbs.js"}}

## 自定义的面包屑导航

如果你一直在阅读 [重写文档页面](/customization/overrides/)，但是你不确定如何开始，以下的例子演示了如何改变面包屑导航的链接设计。

{{"demo": "pages/demos/breadcrumbs/CustomizedBreadcrumbs.js"}}

## 无障碍功能

请务必在 `面包屑导航`组件上加上`aria-label`的描述。

这个组件的可及性依赖于：

- 这组链接是由一个有序列表（`<ol>`元素）组建的。
- 用`aria-hidden`属性隐藏各个链接之间的分隔符，这样屏幕阅读器不会把它们朗读出来。
- 有一个标有 `aria-label` 的导航（nav）元素标记了面包屑导航的结构，并使其成为导航的标记，这样更容易定位。

## 与react-router的交互

{{"demo": "pages/demos/breadcrumbs/RouterBreadcrumbs.js"}}