---
title: Composant React Fil d'Ariane
components: Breadcrumbs, Link, Typography
---

# Breadcrumbs (Fil d'Ariane)

<p class="description">Le fil d'Ariane permet aux utilisateurs d’effectuer des sélections dans une plage de valeurs.</p>

## Fil d'Ariane simple

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Séparateur personnalisé

Dans les exemples qui suivent, nous utilisons deux chaînes de caractère et une icône SVG comme séparateurs.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Fil d'Ariane avec icônes

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Fil d'Ariane contracté

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Fil d'Ariane personnalisé

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Accessibilité

Assurez-vous d'ajouter l'attribut `aria-label` sur le composant `Breadcrumbs`.

L'accessibilité de ce composant repose sur les points suivants :

- La liste des liens est structurée en utilisant une liste ordonnée (balise `<ol>`).
- Afin de prévenir la lecture des séparateurs par les lecteurs d'écran, ils sont cachés en utilisant l'attribut `aria-hidden`.
- Un élément HTML `nav` avec l'attribut `aria-label` identifie la structure comme étant un fil d'Ariane et en fait un repère de navigation facile à trouver.

## Intégration avec react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js"}}