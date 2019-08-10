---
title: React Divider（分隔线）组件
components: Divider
---

# Dividers（分隔线）

<p class="description">分隔线是对列表和布局中的内容进行分组的一条细线。</p>

[分隔线](https://material.io/design/components/dividers.html) 可以将内容分成清晰地小组。

## 列表分隔线

The divider renders as a `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js"}}

## HTML5 规范

我们需要保证`Divider`被渲染为`li`以便遵循HTML5规范 The examples below show two ways of achieving this.

## 内嵌分隔线

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## 副标题分隔符

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## 中段分隔线

{{"demo": "pages/components/dividers/MiddleDividers.js"}}