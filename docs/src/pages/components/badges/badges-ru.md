---
title: React-компонент Значок
components: Badge
---

# Значки

<p class="description">Значок генерирует маленький значок в правом верхнем углу своего дочернего(их) элемента(ов).</p>

## Простые значки

Примеры значков, содержащих текст, с использованием первичных и вторичных цветов. Знак применяется к своим детям.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Максимальное значение

Вы можете использовать свойство `max` чтобы ограничить значение содержимого значка.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Точечный значок

Свойство `точка` превращает значок в маленькую точку. Это можно использовать как уведомление о том, что что-то изменилось без подсчета.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Видимость значка

Видимость значков можно контролировать с помощью свойства `invisible`.

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Кастомизированный значок

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}