---
title: React Divider 分隔线组件
components: Divider
---

# Divider 分隔线

<p class="description">分隔线是对列表和布局中的内容进行分组的一条细线。</p>

[分隔线](https://material.io/design/components/dividers.html) 可以将内容分成清晰地小组。

## 列表分隔线

默认情况下，分隔符呈现为 `<hr>`。 您可以使用 `ListItem` 组件上的 `divider` 属性来保存渲染此DOM元素。

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## HTML5 规范

在列表中，你需要确保 `Divider` 被渲染成 `<li>` 以遵循 HTML5 规范。 下面的例子展示了两种方式实现方式。

## 内嵌分隔线

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## 副标题分隔符

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## 中段分隔线

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## 垂直分割线

你也可以通过 `orientation` 属性让分割线渲染成垂直状态。 注意其中使用了 `flexItem` 属性来适应 flex 容器

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}