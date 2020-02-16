---
title: Разделитель, компонент React
components: Divider
---

# Divider (разделитель)

<p class="description">Разделитель - это тонкая линия, которая группирует содержимое (контент) в списки и макеты (слои).</p>

[Разелители](https://material.io/design/components/dividers.html) делят содержимое (контент) на явные (четкие) группы.

## Разделители списков

The divider renders as an `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## Спецификации HTML5

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification. The examples below show two ways of achieving this.

## Вкладыш

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Подтитульные разделлители

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Центральные разделители

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertical Dividers

You can also render a divider vertically using the `orientation` prop. Note the use of the `flexItem` prop to accommodate for the flex container.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}