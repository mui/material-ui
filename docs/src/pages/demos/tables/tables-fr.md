---
title: Composant React Tableau
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---
# Tableaux (Table)

<p class="description">Les tableaux de données affichent des ensembles de données. Ils peuvent être entièrement personnalisés.</p>

[Les tableaux de données](https://material.io/design/components/data-tables.html) affichent les informations de manière facile à analyser, afin que les utilisateurs puissent rechercher des modèles et des informations. Ils peuvent être intégrés au contenu principal, tel que les cartes.

Les tableaux de données peuvent inclure:

- Une visualisation correspondante
- Menu principal
- Outils pour interroger et manipuler des données

Lorsque des outils sont inclus, ils doivent être placés directement au-dessus ou au-dessous de la table.

## Structure

Une table de données contient en haut une ligne d’en-tête qui répertorie les noms de colonne, suivis de lignes pour les données.

Des cases à cocher doivent accompagner chaque ligne si l'utilisateur doit sélectionner ou manipuler des données.

Pour l'accessibilité, la première colonne est définie comme un élément `<th>` , avec un `scope` de `"row"`. Cela permet aux lecteurs d'écran d'identifier la valeur d'une cellule par son nom de ligne et de colonne.

## Tableau simple

Un exemple simple et sans fioritures.

{{"demo": "pages/demos/tables/SimpleTable.js"}}

## Tri & Sélection

Cet exemple illustre l'utilisation de `Checkbox` et des lignes cliquables pour la sélection, avec une `Toolbar` personnalisé. Il utilise le composant `TableSortLabel` pour aider à styliser les en-têtes de colonne.

La table a reçu une largeur fixe pour illustrer le défilement horizontal. Afin d'éviter le défilement des contrôles de pagination, le composant TablePagination est utilisé en dehors du tableau. (The ['Custom Table Pagination Action' example](#custom-table-pagination-action) below shows the pagination within the TableFooter.)

{{"demo": "pages/demos/tables/EnhancedTable.js"}}

## Tableaux Personnalisés

Si vous avez lu [la page de documentation sur la personnalisation](/customization/overrides/) mais que vous n'êtes pas prêt pour vous lancer, voici un exemple de la façon dont vous pouvez changer l'interface d'un `TableCell`.

⚠️ Bien que la spécification material encouragent la thématisation, cet exemple sort des sentiers battus.

{{"demo": "pages/demos/tables/CustomizedTable.js"}}

## Action de pagination de table personnalisée

La propriété `Action` du composant `TablePagination` permet l'implémentation d'actions personnalisées.

{{"demo": "pages/demos/tables/CustomPaginationActionsTable.js"}}

## Spanning Table

Un exemple simple avec des colonnes couvrant & lignes.

{{"demo": "pages/demos/tables/SpanningTable.js"}}

## Table virtualisée

Dans l'exemple suivant, nous montrons comment utiliser [react-virtualized](https://github.com/bvaughn/react-virtualized) avec le composant `Table`. Il affiches 200 lignes et peut facilement gérer plus.

{{"demo": "pages/demos/tables/ReactVirtualizedTable.js"}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des projects suivants:

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([custom license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Responsive data tables for Material-UI with filtering, sorting, search and more.
- [material-table](https://github.com/mbrn/material-table) DataTable based on table component with additional features like search, filtering, sorting and much more.
- [mui-virtualized-table](https://github.com/techniq/mui-virtualized-table) Virtualized Material-UI table.