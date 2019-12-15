---
title: React-компонент Значок
components: Badge
---

# Badge (значок)

<p class="description">Значок генерирует маленький значок в правом верхнем углу своего дочернего(их) элемента(ов).</p>

## Простые значки

Примеры значков, содержащих текст, с использованием первичных и вторичных цветов. Знак применяется к своим детям.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Настраиваемые значки

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## Видимость значка

Видимость значков можно контролировать с помощью свойства `invisible`.

Значок автоматически скрывается, когда свойство badgeContent равно нулю. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Максимальное значение

Вы можете использовать свойство `max` чтобы ограничить значение содержимого значка.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Точечный значок

Свойство `точка` превращает значок в маленькую точку. Это можно использовать как уведомление о том, что что-то изменилось без подсчета.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Badge overlap

You can use the `overlap` property to place the badge relative to the corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Выравнивание значка

You can use the `horizontalAlignment` and `verticalAlignment` properties to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideHeader": true}}