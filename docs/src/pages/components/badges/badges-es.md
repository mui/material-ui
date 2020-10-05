---
title: React Badge component
components: Badge
---

# Badge

<p class="description">El componente Badge genera un pequeño badge en la esquina superior derecha de su(s) hijo(s).</p>

## Badges básicos

Ejemplos de insignias que contienen texto, utilizando colores primarios y secundarios. La insignia se aplica a sus hijos.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Placas personalizadas

La siguiente tabla muestra un ejemplo de personalización del componente. Puedes aprender más sobre esto en la [sección Personalizando Componentes de la documentación](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}

## Visibilidad del Badge

La visibilidad del badge puede ser controlada usando la propiedad `invisible`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

El badge se oculta automáticamente con `badgeContent` igual a cero. Puede anular esto con la propiedad `showZero`.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Valor máximo

Puedes usar la propiedad `max` para limitar el valor máximo del contenido del badge.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Badge de punto

La propiedad `dot` cambia el badge a un pequeño punto. Esto se puede usar como una notificación de que algo ha cambiado sin contar.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Superposición del Badge

Puede usar la propiedad `overlap` para colocar la insignia relativa a la esquina del elemento envuelto.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Alineación del Badge

Puede usar la propiedad `overlap` para colocar la insignia relativa a la esquina del elemento envuelto.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideToolbar": true}}