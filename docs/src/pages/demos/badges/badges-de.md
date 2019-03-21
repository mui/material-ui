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

Wenn du die [Overrides Dokumentationsseite](/customization/overrides/) gelesen hast, aber dich noch nicht sicher genug fühlst, um direkt loszulegen, ist hier noch ein Beispiel, wie du die Position der Badges anpassen könntest.

⚠️ Auch wenn die Material-Design Spezifikation zur Verwendung von Themes ermutigt, liegen diese Beispiele außerhalb der üblichen Pfade.

{{"demo": "pages/demos/badges/CustomizedBadge.js"}}