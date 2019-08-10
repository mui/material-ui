---
title: React-компонент Значок
components: Badge
---

# Значки

<p class="description">Значок генерирует маленький значок в правом верхнем углу своего дочернего(их) элемента(ов).</p>

## Простые значки

Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Максимальное значение

Вы можете использовать свойство `max` чтобы ограничить значение содержимого значка.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Точечный значок

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Видимость значка

Видимость значков можно контролировать с помощью свойства `invisible`.

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Customized badges

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}