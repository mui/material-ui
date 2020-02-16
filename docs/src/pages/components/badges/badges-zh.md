---
title: React Badge（徽章）组件
components: Badge
---

# Badge 徽章

<p class="description">徽章会在其子项的右上角生成一个小徽章。</p>

## Basic badges

这个示例是个包含了文本的徽章，同时使用了主色和副色。 徽章会对其子元素生效。

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## 自定义徽章

以下是自定义组件的一个示例。 您可以在[重写文档页面](/customization/components/)中了解更多有关此内容的信息。

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## 徽章组件的可见性

徽章组件的隐显可以通过 `invisible` 属性来设置。

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Maximum value

You can use the `max` property to cap the value of the badge content.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Dot badge

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## 徽章组件的覆盖

You can use the `overlap` property to place the badge relative to the corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## 徽章组件的校准

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideHeader": true}}