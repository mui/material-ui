---
product: material-ui
title: React Breadcrumbs（面包屑导航）组件
components: Breadcrumbs, Link, Typography
githubLabel: 'component: breadcrumbs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
---

# Breadcrumbs 面包屑导航

<p class="description">Breadcrumbs consist of a list of links that help a user visualize a page's location within the hierarchical structure of a website, and allow navigation up to any of its "ancestors".</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 简单的面包屑导航

{{"demo": "BasicBreadcrumbs.js"}}

## 激活最后一个面包屑导航

保持最后一个面包屑导航交互。

{{"demo": "ActiveLastBreadcrumb.js"}}

## 自定义分隔符

In the following examples, we are using two string separators and an SVG icon.

{{"demo": "CustomSeparator.js"}}

## 带图标的面包屑导航

{{"demo": "IconBreadcrumbs.js"}}

## 可折叠的面包屑导航

{{"demo": "CollapsedBreadcrumbs.js"}}

## 自定义的面包屑导航

以下是自定义组件的一个示例。 You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedBreadcrumbs.js"}}

## 与 react-router 的交互

{{"demo": "RouterBreadcrumbs.js", "bg": true}}

## 无障碍设计

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

请务必在`面包屑导航`组件上加上 `aria-label` 的描述。

这个组件的可访问性依赖于：

- 这组链接是由一个有序列表（`<ol>`元素）组建的。
- 用 `aria-hidden` 属性隐藏各个链接之间的分隔符，这样屏幕阅读器不会把它们朗读出来。
- 有一个标有 `aria-label` 的 nav（导航）元素标记了面包屑导航的结构，并使其成为导航的标记，这样更容易定位。
