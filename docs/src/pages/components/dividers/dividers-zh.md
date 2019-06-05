---
title: React Divider（分隔线）组件
components: Divider
---

# Dividers（分隔线）

<p class="description">分隔线是对列表和布局中的内容进行分组的一条细线。</p>

[分隔线](https://material.io/design/components/dividers.html) 可以将内容分成清晰地小组。

## 列表分隔线

分隔线默认渲染为 `<hr>`。您可以使用 `ListItem` 组件的 `divider` 属性来渲染 DOM 元素。

{{"demo": "pages/components/dividers/ListDividers.js"}}

## HTML5 规范

为了匹配HTML5规范，我们得确保将 `Divider` 渲染为 `li` 。而以下示例展示了两种实现此目标的方法。

## 内嵌分隔线

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## 副标题分隔符

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## 中段分隔线

{{"demo": "pages/components/dividers/MiddleDividers.js"}}