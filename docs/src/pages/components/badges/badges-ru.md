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

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

Значок автоматически скрывается, когда свойство badgeContent равно нулю. Вы можете переопределить это с помощью пропа `showZero`.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Максимальное значение

Вы можете использовать проп `max`, чтобы ограничить значение значка.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Значок-точка

Проп `dot` превращает значок в маленькую точку. Это можно использовать как уведомление о том, что что-то изменилось без количества.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Наложение значка

Вы можете использовать проп `overlap` для размещения значка относительно краев элемента.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Выравнивание значка

Вы можете использовать проп `anchorOrigin` для перемещения значка в любой угол элемента.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideHeader": true}}