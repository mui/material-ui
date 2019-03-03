---
title: Разделитель, компонент React
components: Divider
---
# Разделитель

<p class="description">Разделитель - это тонкая линия, которая группирует содержимое (контент) в списки и макеты (слои).</p>

[Разелители](https://material.io/design/components/dividers.html) делят содержимое (контент) на явные (четкие) группы.

## Разделители списков

По умолчанию разделитель отображается как `<hr>`. Вместо этого Вы можете сформировать отображение этого DOM-элемента, используя свойство `divider` в компоненте `ListItem`.

{{"demo": "pages/demos/dividers/ListDividers.js"}}

## Спецификации HTML5

Для соблюдения спецификации HTML5 нужно, чтобы `Разделитель` отрисовывался как `li`.

## Вкладыш

Свойство `inset` является устаревшим. Сейчас вам следует использовать `variant="inset"`.

{{"demo": "pages/demos/dividers/InsetDividers.js"}}

## Подтитульные разделлители

{{"demo": "pages/demos/dividers/SubheaderDividers.js"}}

## Центральные разделители

{{"demo": "pages/demos/dividers/MiddleDividers.js"}}