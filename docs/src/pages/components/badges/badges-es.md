---
title: Componente Badge
components: Badge
---

# Badge

<p class="description">El componente Badge genera un pequeño badge en la esquina superior derecha de su(s) hijo(s).</p>

## Basic badges

Ejemplos de insignias que contienen texto, utilizando colores primarios y secundarios. La insignia se aplica a sus hijos.

{{"demo": "pages/demos/badges/SimpleBadge.js"}}

## Placas personalizadas

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/demos/badges/CustomizedBadge.js"}}

## Visibilidad de la placa

La visibilidad del badge puede ser controlada usando la propiedad `invisible`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/ShowZeroBadge.js"}}

## Maximum value

You can use the `max` property to cap the value of the badge content.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Dot badge

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Superposición de insignia

You can use the `overlap` property to place the badge relative to the corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeOverlap.js"}}

## Alineación de la insignia

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "pages/components/badges/BadgeAlignment.js", "hideHeader": true}}