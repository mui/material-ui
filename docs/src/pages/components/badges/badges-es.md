---
title: Componente Badge
components: Badge
---

# Badge

<p class="description">El componente Badge genera un pequeño badge en la esquina superior derecha de su(s) hijo(s).</p>

## Badges básicos

Ejemplos de insignias que contienen texto, utilizando colores primarios y secundarios. La insignia se aplica a sus hijos.

{{"demo": "pages/demos/badges/SimpleBadge.js"}}

## Placas personalizadas

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/demos/badges/CustomizedBadge.js"}}

## Visibilidad del Badge

La visibilidad del badge puede ser controlada usando la propiedad `invisible`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

El badge automáticamente se oculta con `badgeContent` igual a cero. Usted puede sobrescribir esto con la propiedad `showZero`.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Valor máximo

Usted puede usar la propiedad `max` para establecer el valor máximo que puede contener el Badge.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Badge de punto

La propiedad `dot` cambia el badge a un pequeño punto. Esto puede ser usado para mostrar una notificación sin mostrar el valor.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Superposición del Badge

Usted puede usar la propiedad `overlap` para establecer el Badge relativo a la esquina del elemento envuelto.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Alineación del Badge

Usted puede usar la propiedad `anchorOrigin` para mover el Badge a cualquier esquina del elemento envuelto.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideHeader": true}}