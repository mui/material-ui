---
title: React-компонент Значок
components: Badge
---

# Badge (значок)

<p class="description">Значок генерирует маленький значок в правом верхнем углу своего дочернего(их) элемента(ов).</p>

## Basic badges

Примеры значков, содержащих текст, с использованием первичных и вторичных цветов. Знак применяется к своим детям.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Настраиваемые значки

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## Видимость значка

Видимость значков можно контролировать с помощью свойства `invisible`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Maximum value

You can use the `max` property to cap the value of the badge content.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Dot badge

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Badge overlap

You can use the `overlap` property to place the badge relative to the corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Выравнивание значка

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideHeader": true}}