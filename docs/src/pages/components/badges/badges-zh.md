---
title: React Badge（徽章）组件
components: Badge
---

# Badges（徽章）

<p class="description">徽章会在其子项的右上角生成一个小徽章。</p>

## 简单的徽章

这个示例是个包含了文本的徽章，同时使用了主色和副色。 徽章会对其子元素生效。

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## 自定义徽章

以下是自定义组件的一些例子。 您可以在[样式重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## 徽章的可见性

徽章组件的显示与隐藏可以通过`invisible`属性来设置

当badgeContent为零时，徽章自动隐藏。 您可以使用 `showZero` 属性覆盖它。

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## 最大值

您可以使用 `max` 属性来限制徽章内容的最大值。

{{"demo": "pages/components/badges/BadgeMax.js"}}

## 圆点徽章

`dot` 属性会使得徽章渲染为一个小点。 这可以用作提示某些内容发生了变化，如通知，或其它不需要计数的提示场景。

{{"demo": "pages/components/badges/DotBadge.js"}}

## 徽章重叠

您可以使用 `overlap` 属性将徽章放置于包装元素相对的角。

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## 徽章对齐

您可以使用 `horizontalAlignment` 和 `verticalAlignment` 属性将徽章移动到包装元素的任何角落。

{{"demo": "pages/components/badges/BadgeAlignment.js"}}