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

## HTML5 Specification

We need to make sure the `Divider` is rendered as a `li` to match the HTML5 specification. The examples below show two ways of achieving this.

## 内嵌分隔线

The `inset` property has now been deprecated. You should now use `variant="inset"`

{{"demo": "pages/demos/dividers/InsetDividers.js"}}

## Subheader Dividers

{{"demo": "pages/demos/dividers/SubheaderDividers.js"}}

## Middle Dividers

{{"demo": "pages/demos/dividers/MiddleDividers.js"}}