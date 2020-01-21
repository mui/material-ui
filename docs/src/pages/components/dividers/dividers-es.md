---
title: Componente divisor de React
components: Divider
---

# Divider (divisor)

<p class="description">Un divisor es una línea delgada que agrupa el contenido en listas y diseños.</p>

[Los Divisores](https://material.io/design/components/dividers.html) separan contenido en grupos claros.

## Divisores de lista

The divider renders as an `<hr>` by default. You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## Especificación HTML5

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification. The examples below show two ways of achieving this.

## Separadores insertados

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Divisores de subencabezado

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Divisores de Mitad

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertical Dividers

You can also render a divider vertically using the `orientation` prop.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}