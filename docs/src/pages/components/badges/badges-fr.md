---
title: Composant React Badge
components: Badge
---

# Badges

<p class="description">Emblema gera um pequeno emblema para o canto superior direito do seu filho(s).</p>

## Badges simples

Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Valeur maximale

Vous pouvez utiliser la propriété `max` pour limiter la valeur du contenu du badge.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Badge à points

The `dot` property changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Visibilité du badge

La visibilité des badges peut être contrôlée à l'aide de la propriété `invisible`.

The badge auto hides with badgeContent is zero. You can override this with the `showZero` property.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Customized badges

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}