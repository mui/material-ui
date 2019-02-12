---
title: Divider React component
components: Divider
---
# Разделитель

<p class="description">Разделитель - это тонкая линия, которая группирует содержимое (контент) в списки и макеты (слои).</p>

[Разелители](https://material.io/design/components/dividers.html) делят содержимое (контент) на явные (четкие) группы.

## Разделители списков

По умолчанию разделитель отображается как `<hr>`. Вместо этого Вы можете сформировать отображение этого DOM-элемента, используя свойство `divider` в компоненте `ListItem`.

{{"demo": "pages/demos/dividers/ListDividers.js"}}

## Спецификации HTML5

We need to make sure the `Divider` is rendered as a `li` to match the HTML5 specification. The examples below show two ways of achieving this.

## Inset Dividers

Свойство `inset` является устаревшим. Сейчас вам следует использовать `variant="inset"`.

{{"demo": "pages/demos/dividers/InsetDividers.js"}}

## Subheader Dividers

{{"demo": "pages/demos/dividers/SubheaderDividers.js"}}

## Middle Dividers

{{"demo": "pages/demos/dividers/MiddleDividers.js"}}