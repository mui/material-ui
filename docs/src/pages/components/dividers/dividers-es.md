---
title: Componente divisor de React
components: Divider
---

# Divisores

<p class="description">Un divisor es una línea delgada que agrupa el contenido en listas y diseños.</p>

[Los Divisores](https://material.io/design/components/dividers.html) separan contenido en grupos claros.

## Divisores de lista

El divisor se procesa como un `<hr>` por defecto. Puede guardar la representación de este elemento DOM utilizando la propiedad `divider` en el componente `ListItem`.

{{"demo": "pages/components/dividers/ListDividers.js"}}

## Especificación HTML5

Debemos asegurarnos de que el `divider` se represente como `li` para que coincida con la especificación HTML5. Los siguientes ejemplos muestran dos maneras de lograr esto.

## Separadores insertados

{{"demo": "pages/components/dividers/InsetDividers.js"}}

## Divisores de subencabezado

{{"demo": "pages/components/dividers/SubheaderDividers.js"}}

## Divisores de Mitad

{{"demo": "pages/components/dividers/MiddleDividers.js"}}