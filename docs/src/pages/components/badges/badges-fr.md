---
title: Composant React Badge
components: Badge
---

# Badges

<p class="description">Emblema gera um pequeno emblema para o canto superior direito do seu filho(s).</p>

## Badges simples

Exemples de badges contenant du texte, utilisant des couleurs primaires et secondaires. Le badge est appliqué à ses enfants.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Valeur maximale

Vous pouvez utiliser la propriété `max` pour limiter la valeur du contenu du badge.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Badge à points

La propriété `point` change un badge en un petit point. Cela peut être utilisé comme une notification que quelque chose a changé sans donner de compte.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Visibilité du badge

La visibilité des badges peut être contrôlée à l'aide de la propriété `invisible`.

Le badge se cache automatiquement avec badgeContent est zéro. Vous pouvez remplacer cela avec la propriété `showZero`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Customized badges

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}