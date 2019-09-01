---
title: Badge React-Komponente
components: Badge
---

# Badges

<p class="description">Badge generiert ein kleines Abzeichen an der oberen rechten Ecke seiner Kinder.</p>

## Einfache Badges

Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Customized badges

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## Badge visibility

The visibility of badges can be controlled using the `invisible` property.

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Maximum Value

You can use the `max` property to cap the value of the badge content.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Dot Badge

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Badge overlap

You can use the `overlap` property to place the badge relative to the corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Badge alignment

You can use the `horizontalAlignment` and `verticalAlignment` properties to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js"}}