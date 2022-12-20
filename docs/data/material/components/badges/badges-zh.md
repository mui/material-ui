---
product: material-ui
title: React Badge（徽章）组件
components: Badge
githubLabel: 'component: badge'
unstyled: /base/react-badge/
---

# Badge 徽章

<p class="description">徽章组件会在其子项（们）的右上角生成一个小徽章。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 简单的徽章

这个示例是个包含了文本的徽章，同时使用了主色和副色。 徽章会对其子元素生效。

{{"demo": "SimpleBadge.js"}}

## 自定义徽章

Use `color` prop to apply theme palette to component.

{{"demo": "ColorBadge.js"}}

## 徽章组件的可见性

以下是自定义组件的一个示例。 You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedBadges.js"}}

## 徽章组件的可见性

徽章组件的隐显可以通过 `invisible` 属性来设置。

{{"demo": "BadgeVisibility.js"}}

The badge hides automatically when `badgeContent` is zero. 您可以使用 `showZero` 属性覆盖它。

{{"demo": "ShowZeroBadge.js"}}

## 最大值

您可以使用 `max` 属性来限制徽章组件内容的最大值。

{{"demo": "BadgeMax.js"}}

## 圆点徽章

`dot` 属性会使得徽章渲染为一个小点。 这样的话，可以在不给出具体计数的情况下，组件能够提示一下变化。

{{"demo": "DotBadge.js"}}

## 徽章组件的 overlap 属性

你可以使用 `anchorOrigin` 属性移把徽章组件移动到封装的元素的任何角落。

{{"demo": "BadgeOverlap.js"}}

## 徽章组件的校准

你可以使用 `anchorOrigin` 属性移把徽章组件移动到封装的元素的任何角落。

{{"demo": "BadgeAlignment.js", "hideToolbar": true}}

## Accessibility

You can't rely on the content of the badge to be announced correctly. You should provide a full description, for instance, with `aria-label`:

{{"demo": "AccessibleBadges.js"}}
