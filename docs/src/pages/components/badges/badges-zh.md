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

当 badgeContent 为零时，徽章组件将会自动隐藏。 您可以使用 `showZero` 属性覆盖它。

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Maximum value

您可以使用 `max` 属性来限制徽章内容的最大值。

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Dot badge

`dot` 属性会使得徽章渲染为一个小点。 这样的组件可以作为一个提示的工具，来说明有些值已经改变，但是不需要计数。

{{"demo": "pages/components/badges/DotBadge.js"}}

## 徽章组件的覆盖

您可以使用 `overlap` 这个属性，在封装的元素相对的一角来显示徽章组件。

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## 徽章组件的校准

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideToolbar": true}}
