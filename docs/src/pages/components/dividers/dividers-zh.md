---
title: React Divider（分隔线）组件
components: Divider
---

# Divider (分隔线)

<p class="description">分隔线是对列表和布局中的内容进行分组的一条细线。</p>

[分隔线](https://material.io/design/components/dividers.html) 可以将内容分成清晰地小组。

## 列表分隔线

默认情况下，分隔符呈现为 `<hr>`。 您可以使用 `ListItem` 组件上的 `divider` 属性来保存渲染此DOM元素。

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## HTML5 规范

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification. 该示例演示了实现此目的的两种方法。

## 内嵌分隔线

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## 副标题分隔符

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## 中段分隔线

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertical Dividers

You can also render a divider vertically using the `orientation` prop.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}