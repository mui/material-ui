---
title: React Badge（徽章）组件
components: Badge
---

# Badges（徽章）

<p class="description">徽章会在其子项的右上角生成一个小徽章。</p>

## 简单的徽章

这个示例是个包含了文本的徽章，同时使用了主色和副色。 徽章会对其子元素生效。

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## 最大值

您可以使用 `max` 属性来限制徽章内容的最大值。

{{"demo": "pages/components/badges/BadgeMax.js"}}

## 圆点徽章

`dot` 属性会使得徽章渲染为一个小点。 这可以用作通知，或在没有计数的情况下，提示某些内容发生了变化。

{{"demo": "pages/components/badges/DotBadge.js"}}

## 徽章的可见性

徽章的可见性是可以通过 `invisible` 属性来控制。

带badgeContent的徽章自动隐藏为零尺寸。 您可以使用 `showZero` 属性覆盖它。

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## 自定义徽章

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}