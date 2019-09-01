---
title: React-компонент Значок
components: Badge
---

# Значки

<p class="description">Значок генерирует маленький значок в правом верхнем углу своего дочернего(их) элемента(ов).</p>

## Простые значки

Примеры значков, содержащих текст, с использованием первичных и вторичных цветов. Знак применяется к своим детям.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Настраиваемые значки

Вот несколько примеров настройки компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## Видимость значка

The visibility of badges can be controlled using the `invisible` property.

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Максимальное значение

You can use the `max` property to cap the value of the badge content.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Dot Badge

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Badge overlap

You can use the `overlap` property to place the badge relative to the corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Выравнивание значка

You can use the `horizontalAlignment` and `verticalAlignment` properties to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js"}}