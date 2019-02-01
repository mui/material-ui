---
title: React 徽章组件
components: Badge
---
# Badges

<p class="description">徽章会在其子项的右上角生成一个小徽章。</p>

## 简单的徽章

包含文本的徽章示例，使用主要和次要颜色。 徽章会被应用于其子项组件上。

{{"demo": "pages/demos/badges/SimpleBadge.js"}}

## 最大价值

您可以使用 `max` 属性来限制徽章内容的值。

{{"demo": "pages/demos/badges/BadgeMax.js"}}

## 圆点徽章

`dot` 属性将徽章更改为小点。这可以用作通知，在没有计数的情况下，某些内容已发生变化。

{{"demo": "pages/demos/badges/DotBadge.js"}}

## 徽章的可视性

徽章的可视性是可以通过`invisible`属性来控制。

带有badgeContent的徽章自动隐藏为零。您可以使用 `showZero` 属性覆盖它。

{{"demo": "pages/demos/badges/BadgeVisibility.js"}}

## 自定义徽章

如果您一直在阅读 [覆盖文档页面](/customization/overrides/) 但是您没有自信地跳入， 这里是一个如何更改徽章位置的示例。

⚠️虽然材料设计规范鼓励主题，但这个例子是不合适的。

{{"demo": "pages/demos/badges/CustomizedBadge.js"}}