---
title: Composant React Fil d'Ariane
components: Breadcrumbs, Link, Typography
---

# Breadcrumbs (Fil d'Ariane)

<p class="description">Le fil d'Ariane permet aux utilisateurs d’effectuer des sélections dans une plage de valeurs.</p>

## Fil d'Ariane simple

{{"demo": "pages/components/breadcrumbs/SimpleBreadcrumbs.js"}}

## Active last breadcrumb

Keep the last breadcrumb interactive.

{{"demo": "pages/components/breadcrumbs/ActiveLastBreadcrumb.js"}}

## Custom separator

In the following examples, we are using two string separators, and an SVG icon.

{{"demo": "pages/components/breadcrumbs/CustomSeparator.js"}}

## Breadcrumbs with icons

{{"demo": "pages/components/breadcrumbs/IconBreadcrumbs.js"}}

## Collapsed breadcrumbs

{{"demo": "pages/components/breadcrumbs/CollapsedBreadcrumbs.js"}}

## Customized breadcrumbs

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/breadcrumbs/CustomizedBreadcrumbs.js"}}

## Intégration avec react-router

{{"demo": "pages/components/breadcrumbs/RouterBreadcrumbs.js", "bg": true}}

## Accessibilité

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#breadcrumb)

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

L'accessibilité de ce composant repose sur les points suivants :

- La liste des liens est structurée en utilisant une liste ordonnée (balise `<ol>`).
- Afin de prévenir la lecture des séparateurs par les lecteurs d'écran, ils sont cachés en utilisant l'attribut `aria-hidden`.
- Un élément HTML `nav` avec l'attribut `aria-label` identifie la structure comme étant un fil d'Ariane et en fait un repère de navigation facile à trouver.