---
title: Composant React Badge
components: Badge
---
# Badges

<p class="description">Emblema gera um pequeno emblema para o canto superior direito do seu filho(s).</p>

## Badges simples

Exemples de badges contenant du texte, utilisant des couleurs primaires et secondaires. Le badge est appliqué à ses enfants.

{{"demo": "pages/demos/badges/SimpleBadge.js"}}

## Valeur maximale

Vous pouvez utiliser la propriété `max` pour limiter la valeur du contenu du badge.

{{"demo": "pages/demos/badges/BadgeMax.js"}}

## Badge à points

La propriété `point` change un badge en un petit point. Cela peut être utilisé comme une notification que quelque chose a changé sans donner de compte.

{{"demo": "pages/demos/badges/DotBadge.js"}}

## Visibilité du badge

La visibilité des badges peut être contrôlée à l'aide de la propriété `invisible`.

Le badge se cache automatiquement avec badgeContent est zéro. Vous pouvez remplacer cela avec la propriété `showZero`.

{{"demo": "pages/demos/badges/BadgeVisibility.js"}}

## Badge personnalisé

Si vous avez lu le [overrides page de documentation](/customization/overrides/) mais vous n'êtes pas sûr de vous lancer, ici est un exemple de la façon dont vous pouvez changer la position de badge.

⚠️ Bien que la spécification material encouragent la thématisation, cet exemple sort des sentiers battus.

{{"demo": "pages/demos/badges/CustomizedBadge.js"}}