---
title: React 徽章组件
components: Badge
---

# Badges（徽章）

<p class="description">徽章会在其子项的右上角生成一个小徽章。</p>

## 简单的徽章

Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## 最大值

您可以使用 `max` 属性来限制徽章内容的最大值。

{{"demo": "pages/components/badges/BadgeMax.js"}}

## 圆点徽章

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## 徽章的可见性

徽章的可见性是可以通过 `invisible` 属性来控制。

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## 自定义徽章

以下是自定义组件的一个示例。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/badges/CustomizedBadges.js"}}