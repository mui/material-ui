---
title: Componente Badge
components: Badge
---

# Placas

<p class="description">El componente Badge genera un pequeño badge en la esquina superior derecha de su(s) hijo(s).</p>

## Emblemas Simples

Ejemplos de badges que contienen texto, usando los colores primarios y secundarios de la paleta de colores.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Valor Máximo

Puedes usar la propiedad `max` para limitar el valor máximo del contenido del badge.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Badge de punto

La propiedad `dot` cambia el aspecto del badge a un punto pequeño y puede ser usado como notificación de que algo a cambiado sin mostrar más información.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Visibilidad del Badge

La visibilidad del badge puede ser controlada usando la propiedad `invisible`.

El badge se auto oculta usando la propiedad `badgeContent={0}`. Puedes sobreescribir este comportamiento usando la propiedad `showZero`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Customized badges

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}