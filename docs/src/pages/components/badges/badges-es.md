---
title: Componente Badge
components: Badge
---

# Badge

<p class="description">El componente Badge genera un pequeño badge en la esquina superior derecha de su(s) hijo(s).</p>

## Emblemas Simples

Ejemplos de insignias que contienen texto, utilizando colores primarios y secundarios. La insignia se aplica a sus hijos.

{{"demo": "pages/demos/badges/SimpleBadge.js"}}

## Placas personalizadas

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/demos/badges/CustomizedBadge.js"}}

## Visibilidad de la placa

La visibilidad del badge puede ser controlada usando la propiedad `invisible`.

La insignia se oculta automáticamente con badgeContent es cero. Puede anular esto con la propiedad `showZero`.

{{"demo": "pages/demos/badges/BadgeVisibility.js"}}

## Valor Máximo

Puedes usar la propiedad `max` para limitar el valor máximo del contenido del badge.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Badge de punto

La propiedad `punto` cambia un badge a un pequeño punto. Esto se puede usar como una notificación de que algo ha cambiado sin contar.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Superposición de insignia

Puede usar la propiedad `overlap` para colocar la insignia relativa a la esquina del elemento envuelto.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Alineación de la insignia

Puede usar las propiedades `horizontalAlignment` y `verticalAlignment` para mover la insignia a cualquier esquina del elemento envuelto.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideHeader": true}}