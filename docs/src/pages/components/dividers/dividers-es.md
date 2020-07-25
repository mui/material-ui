---
title: Componente divisor de React
components: Divider
---

# Divider (divisor)

<p class="description">Un divisor es una línea delgada que agrupa el contenido en listas y diseños.</p>

[Los Divisores](https://material.io/design/components/dividers.html) separan contenido en grupos claros.

## Divisores de lista

You can save rendering this DOM element by using the `divider` property on the `ListItem` component. El divisor renderiza un `<hr>` por defecto.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## Especificación HTML5

En una lista, debe asegurarse de que el `Divider` se representa como una `<li>` para que coincida con la especificación de HTML5. El ejemplo debajo muestra dos maneras de lograr esto.

## Separadores insertados

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Divisores de subencabezado

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Divisores de Mitad

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Divisores Verticales

Puede también renderizar un divisor vertical usando la propiedad `orientation`. Tenga en cuenta el uso del accesorio `flexItem` para acomodar al contenedor flex.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}