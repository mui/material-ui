---
title: Componente Badge
components: Badge
---

# Placas

<p class="description">El componente Badge genera un pequeño badge en la esquina superior derecha de su(s) hijo(s).</p>

## Emblemas Simples

Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Valor Máximo

Puedes usar la propiedad `max` para limitar el valor máximo del contenido del badge.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Badge de punto

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Visibilidad del Badge

La visibilidad del badge puede ser controlada usando la propiedad `invisible`.

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Customized badges

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}