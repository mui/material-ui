---
product: base
title: 无样式的 React 徽章
components: BadgeUnstyled
githubLabel: 'component: badge'
packageName: '@mui/base'
---

# 无样式的徽章

<p class="description">徽章组件会在其子项（们）的右上角生成一个小徽章。</p>

```js
import BadgeUnstyled from '@mui/base/BadgeUnstyled';
```

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 基本用法

{{"demo": "UnstyledBadge.js", "defaultCodeOpen": false}}

## 徽章的可见性

徽章组件的隐显可以通过 `invisible` 属性来设置。 如果徽章不可见，那么它会被应用 `MuiBadge-invisible` 类。 It is up to the developer to provide styles that actually hide the badge.

{{"demo": "BadgeVisibility.js"}}

The badge hides automatically when `badgeContent` is zero. You can override this with the `showZero` prop.

{{"demo": "ShowZeroBadge.js"}}

## 最大值

您可以使用 `max` 属性来限制徽章内容的最大值。 默认被设置为 99。

请注意， `badgeContent` 应该是一个数字（或是一个可被转换为数字的值）才能工作。

{{"demo": "BadgeMax.js"}}

## 无障碍设计

如果徽章的内容无法被正确的读取。 那您应该提供一个完整的描述，例如， 使用 `aria-label`：

{{"demo": "AccessibleBadges.js", "defaultCodeOpen": false}}
