---
title: Badge React-Komponente
components: Badge
---

# Badges

<p class="description">Badge generiert ein kleines Abzeichen an der oberen rechten Ecke seiner Kinder.</p>

## Einfache Badges

Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Maximalwert

Sie können die Eigenschaft `max` verwenden, um den Wert des Badge-Inhalts zu begrenzen.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Punkt-Badge

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Badge Sichtbarkeit

Die Sichtbarkeit von Badges kann über die Eigenschaft `invisible` gesteuert werden.

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Benutzerdefinierte Badges

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}