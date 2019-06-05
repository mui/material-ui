---
title: React-компонент Значок
components: Badge
---

# Значки

<p class="description">Значок генерирует маленький значок в правом верхнем углу своего дочернего(их) элемента(ов).</p>

## Простые значки

Примеры значков, содержащих текст, с использованием основного и дополнительного цветов. Значок применяется к дочерним элементам.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Максимальное значение

Вы можете использовать свойство `max` чтобы ограничить значение содержимого значка.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Точечный значок

Свойство `dot` превращает значок в маленькую точку. Это можно использовать как уведомление о том, что что-то изменилось без счетчика.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Видимость значка

Видимость значков можно контролировать с помощью свойства `invisible`.

Значок автоматически скрывается, если badgeContent равен нулю. Вы можете переопределить это с помощью свойства `showZero`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Customized badges

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}