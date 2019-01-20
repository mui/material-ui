---
title: React 分隔线组件
components: Divider
---
# 分隔线

<p class="description">分隔线是对列表和布局中的内容进行分组的细线。</p>

[分隔线](https://material.io/design/components/dividers.html) 可以清晰地将内容分组

## 列表分隔线

分隔线默认渲染为 `<hr>`。 您可以使用`ListItem`组件的`divider`属性保存渲染的DOM元素

{{"demo": "pages/demos/dividers/ListDividers.js"}}

## HTML5规范

我们需要确保将 `Divider` 渲染为 `li` 以匹配HTML5规范。 以下示例显示了实现此目的的两种方法。

## 内嵌分隔线

现在已弃用 `inset` 属性。你现在应该使用 `variant="inset"`

{{"demo": "pages/demos/dividers/InsetDividers.js"}}

## 副标题分隔符

{{"demo": "pages/demos/dividers/SubheaderDividers.js"}}

## 中间分隔线

{{"demo": "pages/demos/dividers/MiddleDividers.js"}}