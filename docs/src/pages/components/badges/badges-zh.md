---
title: React Badge（徽章）组件
components: Badge
---

# Badges（徽章）

<p class="description">徽章会在其子项的右上角生成一个小徽章。</p>

## 简单的徽章

下面是一些含有文本的徽章的示例，他们使用了主要和次要颜色。 徽章会被应用于其子项组件上。

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## 最大值

您可以使用 `max` 属性来限制徽章内容的最大值。

{{"demo": "pages/components/badges/BadgeMax.js"}}

## 圆点徽章

`dot` 属性将徽章更改为圆形。您可以将此用于通知系统，来展示一些不计数的内容变化。

{{"demo": "pages/components/badges/DotBadge.js"}}

## 徽章的可见性

徽章的可见性是可以通过 `invisible` 属性来控制。

带有 badgeContent 属性的徽章会在计数为0的时候自动隐藏。您可以使用 `showZero` 属性强制显示。

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## 自定义徽章

以下是自定义组件的一个示例。您可以在[重写文档页面](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/badges/CustomizedBadges.js"}}