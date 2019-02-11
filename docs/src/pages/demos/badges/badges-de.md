---
title: Badge React-Komponente
components: Badge
---
# Badges

<p class="description">Badge generiert ein kleines Abzeichen an der oberen rechten Ecke seiner Kinder.</p>

## Einfache Badges

Beispiele für Badges, die Text enthalten, mit Primär- und Sekundärfarben. Das Abzeichen wird an seinen Kindern angebracht.

{{"demo": "pages/demos/badges/SimpleBadge.js"}}

## Maximalwert

Sie können die Eigenschaft `max` verwenden, um den Wert des Badge-Inhalts zu begrenzen.

{{"demo": "pages/demos/badges/BadgeMax.js"}}

## Punkt-Badge

Die Eigenschaft `dot` verwandelt ein Badge in einen kleinen Punkt. Dies kann als Benachrichtigung verwendet werden, dass sich etwas geändert hat, ohne eine Zählung vorzunehmen.

{{"demo": "pages/demos/badges/DotBadge.js"}}

## Badge Sichtbarkeit

Die Sichtbarkeit von Badges kann über die Eigenschaft `invisible` gesteuert werden.

Das Badge versteckt sich automatisch, wenn `badgeContent` null ist. Dies kann mit der Eigenschaft `showZero` überschrieben werden.

{{"demo": "pages/demos/badges/BadgeVisibility.js"}}

## Benutzerdefinierte Badges

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here is one example of how you can change the badge position.

⚠️ While the material design specification encourages theming, this example is off the beaten path.

{{"demo": "pages/demos/badges/CustomizedBadge.js"}}