---
title: React Divider（分隔线）组件
components: Divider
---

# Divider 分隔线

<p class="description">分隔线是对列表和布局中的内容进行分组的一条细线。</p>

[分隔线](https://material.io/design/components/dividers.html)可以将内容分割成比较明确的组。

## 列表分隔线

默认情况下，分割线会渲染成一个 `<hr>`。 使用 `ListItem` 组件中的 `divider` 属性，您可以直接渲染此分割线的 DOM 元素。

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## HTML5 规范

在一个列表中，请确保您将 `Divider` 渲染成一个 `<li>` 元素，这样才能遵循 HTML5 规范。 下面的例子展示了两种实现方式。

## 内凹分隔线

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## 副标题分隔符

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## 中段分隔线

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## 垂直分隔线

您也可以使用 `orientation` 属性将分割线渲染成垂直形状。 请注意这其中使用了 `flexItem` 属性来适应 flex 容器。

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}