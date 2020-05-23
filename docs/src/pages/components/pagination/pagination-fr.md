---
title: Pagination React component
components: Pagination, PaginationItem
---

# Pagination

<p class="description">Le composant Pagination permet à l'utilisateur de sélectionner une page spécifique à partir d'une plage de pages.</p>

## Pagination de base

{{"demo": "pages/components/pagination/BasicPagination.js"}}

## Pagination délimitée

{{"demo": "pages/components/pagination/PaginationOutlined.js"}}

## Pagination arrondie

{{"demo": "pages/components/pagination/PaginationRounded.js"}}

## Taille de la pagination

{{"demo": "pages/components/pagination/PaginationSize.js"}}

## Boutons

Vous pouvez, au choix, activer les boutons de la première et de la dernière page, ou désactiver les boutons de la page précédente et de la page suivante.

{{"demo": "pages/components/pagination/PaginationButtons.js"}}

## Plages de pagination

Vous pouvez spécifier le nombre de chiffres à afficher de chaque côté de la page actuelle avec la propriété `siblingRange`, et à côté du numéro de la page de début et de fin avec la propriété `boundaryRange`.

{{"demo": "pages/components/pagination/PaginationRanges.js"}}

## Pagination contrôlée

{{"demo": "pages/components/pagination/PaginationControlled.js"}}

## Intégration du routeur

{{"demo": "pages/components/pagination/PaginationLink.js"}}

## `usePagination`

Pour les cas d'utilisation de personnalisation avancée, nous exposons un hook `usePagination()`. Il accepte presque les mêmes options que le composant de Pagination moins tous les propriétés liés au rendu de JSX. Le composant de Pagination utilise ce hook en interne.

```jsx
import { usePagination } from '@material-ui/lab/Pagination';
```

{{"demo": "pages/components/pagination/UsePagination.js"}}

## Table pagination

The `Pagination` component was designed to paginate a list of arbitrary items when infinite loading isn't used. It's preferred in contexts where SEO is important, for instance, a blog.

For the pagination of a large set of tabular data, you should use the `TablePagination` component.

{{"demo": "pages/components/pagination/TablePagination.js"}}

You can learn more about this use case in the [table section](/components/tables/#custom-pagination-options) of the documentation.

## Accessibilité

### ARIA

Le nœud racine a un rôle de "navigation" et l'aria-label "pagination navigation" par défaut. Les éléments de page portent une étiquette "aria-label" qui identifie l'objet de l'élément ("aller à la première page", "aller à la page précédente", "aller à la page 1", etc.). Vous pouvez les remplacer en utilisant la propriété `getItemAriaLabel`.

### Clavier

Les éléments de pagination sont dans l'ordre des tabulations, avec un indice de tabulation de "0".
