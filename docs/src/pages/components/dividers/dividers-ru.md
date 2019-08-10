---
title: Разделитель, компонент React
components: Divider
---

# Разделитель

<p class="description">Разделитель - это тонкая линия, которая группирует содержимое (контент) в списки и макеты (слои).</p>

[Разелители](https://material.io/design/components/dividers.html) делят содержимое (контент) на явные (четкие) группы.

## Разделители списков

The divider renders as a `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js"}}

## Спецификации HTML5

We need to make sure the `Divider` is rendered as a `li` to match the HTML5 specification. The examples below show two ways of achieving this.

## Вкладыш

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## Подтитульные разделлители

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## Центральные разделители

{{"demo": "pages/components/dividers/MiddleDividers.js"}}