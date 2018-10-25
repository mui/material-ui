---
title: 分割线组件
components: Divider
---
# 分割线

<p class="description">分割线用于分组列表和版面的内容</p>

[分割线](https://material.io/design/components/dividers.html) 可以清晰地将内容分组

## 列表分割线

分割线默认渲染为 `<hr>`。 您可以使用`ListItem`组件的`divider`属性保存渲染的DOM元素

{{"demo": "pages/demos/dividers/ListDividers.js"}}

## 内嵌分割线

下面的例子展示了`inset`属性 我们需要保证`Divider`被渲染为`li`以便遵循HTML5规范 这个例子展示了两种实现这个需求的方法

{{"demo": "pages/demos/dividers/InsetDividers.js"}}