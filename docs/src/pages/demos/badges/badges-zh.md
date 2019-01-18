---
title: React 徽章组件
components: Badge
---
# 徽章

<p class="description">徽章会在其子项的右上角生成一个小徽章。</p>

## 简单的徽章

包含文本的徽章示例，使用主要和次要颜色。 徽章会被应用于其子项组件上。

{{"demo": "pages/demos/badges/SimpleBadge.js"}}

## Maximum Value

You can use the `max` property to cap the value of the badge content.

{{"demo": "pages/demos/badges/BadgeMax.js"}}

## Dot Badge

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/demos/badges/DotBadge.js"}}

## 徽章的可视性

徽章的可视性是可以通过`invisible`属性来控制。

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/demos/badges/BadgeVisibility.js"}}

## 自定义徽章

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can change the badge position.

⚠️ While the material design specification encourages theming, this example is off the beaten path.

{{"demo": "pages/demos/badges/CustomizedBadge.js"}}