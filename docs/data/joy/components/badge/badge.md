---
product: joy-ui
title: React Badge component
githubLabel: 'component: badge'
unstyled: /base/react-badge/
---

# Badge

<p class="description">Badge generates a small badge to the top-right of its child(ren).</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

{{"demo": "BadgeUsage.js", "hideToolbar": true}}

## Basic

The default appearance of the `Badge` is a dot with a `primary` color.

{{"demo": "SimpleBadge.js"}}

## Content

Specify the `badgeContent` prop as a `number | string` to the `Badge` to display the content.

{{"demo": "ContentBadge.js"}}

The badge hides automatically when `badgeContent` is zero. You can override this with the `showZero` prop.

{{"demo": "NumberBadge.js"}}

## Visibility

The visibility of badges can be controlled using the `invisible` prop.

{{"demo": "BadgeVisibility.js"}}

:::info
If `showZero` is true, the badge will appear even though `invisible` is false.
:::

## Maximum value

You can use the `max` prop to cap the value of the badge content.

{{"demo": "BadgeMax.js"}}

## Inset

Use `badgeInset` prop to control the position of the badge. The value can be a string that match the [CSS inset](https://developer.mozilla.org/en-US/docs/Web/CSS/inset) syntax.

{{"demo": "BadgeInset.js"}}

## Position

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "BadgeAlignment.js", "hideToolbar": true}}

## Accessibility

You can't rely on the content of the badge to be announced correctly.
You should provide a full description, for instance, with `aria-label`:

{{"demo": "AccessibleBadges.js"}}
