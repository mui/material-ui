---
title: Composant React Badge
components: Badge
---

# Badges

<p class="description">Emblema gera um pequeno emblema para o canto superior direito do seu filho(s).</p>

## Badges simples

Exemples de badges contenant du texte, utilisant les couleurs primaires et secondaires. Le badge est appliqué aux enfants.

{{"demo": "pages/components/badges/SimpleBadge.js"}}

## Valeur maximale

Vous pouvez utiliser la propriété `max` pour limiter la valeur du contenu du badge.

{{"demo": "pages/components/badges/BadgeMax.js"}}

## Badge à points

La propriété `dot` change un badge en petit point. Il peut être utilisé comme une notification indiquant que quelque chose a changé sans donner un nombre.

{{"demo": "pages/components/badges/DotBadge.js"}}

## Visibilité du badge

La visibilité des badges peut être contrôlée à l'aide de la propriété `invisible`.

Le badge se cache automatiquement quand badgeContent est nul. Vous pouvez la remplacer avec la propriété `showZero`.

{{"demo": "pages/components/badges/BadgeVisibility.js"}}

## Badges custom

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/badges/CustomizedBadges.js"}}