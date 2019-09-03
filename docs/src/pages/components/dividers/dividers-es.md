---
title: Componente divisor de React
components: Divider
---

# Divisores

<p class="description">Un divisor es una línea delgada que agrupa el contenido en listas y diseños.</p>

[Los Divisores](https://material.io/design/components/dividers.html) separan contenido en grupos claros.

## Divisores de lista

The divider renders as a `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js"}}

## Especificación HTML5

We need to make sure the `Divider` is rendered as a `li` to match the HTML5 specification. The examples below show two ways of achieving this.

## Separadores insertados

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## Divisores de subencabezado

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## Divisores de Mitad

{{"demo": "pages/components/dividers/MiddleDividers.js"}}