---
title: Composant React Table
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Table (Tableaux)

<p class="description">Tables display sets of data. They can be fully customized.</p>

[Tables](https://material.io/design/components/data-tables.html) display information in a way that’s easy to scan, so that users can look for patterns and insights. Ils peuvent être intégrés au contenu principal, tel que les cartes.

Tables can include:

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

{{"demo": "pages/components/tables/SimpleTable.js", "bg": true}}

## Tableau dense

Un exemple simple de tableau dense sans fioritures.

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Tri & Sélection

Cet exemple illustre l'utilisation de `Checkbox` et des lignes cliquables pour la sélection, avec une `Toolbar` personnalisée. Il utilise le composant `TableSortLabel` pour aider à styliser les en-têtes de colonne.

La table a reçu une largeur fixe pour illustrer le défilement horizontal. Afin d'éviter le défilement des contrôles de pagination, le composant TablePagination est utilisé en dehors du tableau. (L'exemple ['Action de pagination de table personnalisée' ](#custom-table-pagination-action) ci-dessous montre la pagination dans TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Tableaux Personnalisés

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js", "bg": true}}

### Custom pagination options

It's possible to customise the options shown in the "Rows per page" select using the `rowsPerPageOptions` prop. You should either provide an array of:

- **numbers**, each number will be used for the option's label and value.
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50]} />
    ```

- **objects**, the `value` and `label` keys will be used respectively for the value and label of the option (useful for language strings such as 'All').
    
    ```jsx
    <TablePagination rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]} />
    ```

### Custom pagination actions

La propriété `Action` du composant `TablePagination` permet l'implémentation d'actions personnalisées.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js", "bg": true}}

## Fixed header

An example of a table with scrollable rows and fixed column headers. It leverages the `stickyHeader` prop (⚠️ no IE 11 support).

{{"demo": "pages/components/tables/StickyHeadTable.js", "bg": true}}

## Spanning Table

Un exemple simple avec des colonnes couvrant & lignes.

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## Table virtualisée

Dans l'exemple suivant, nous montrons comment utiliser [react-virtualized](https://github.com/bvaughn/react-virtualized) avec le composant `Table`. Il affiche 200 lignes et peut facilement gérer plus. La virtualisation aide à résoudre les problèmes de performances.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des projects suivants:

### material-table

![stars](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) est une table de données simple et puissante pour React basé sur les tables Material-UI avec quelques fonctionnalités supplémentaires. Ils prennent en charge de nombreux cas d'utilisation différents (éditable, filtrage, regroupement, tri, sélection, i18n, données arborescentes, etc.). Vous devriez y jeter un coup d'oeil.

{{"demo": "pages/components/tables/MaterialTableDemo.js", "bg": true}}

### Autres

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/): A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([paid license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables): Responsive data tables for Material-UI with filtering, sorting, search and more.
- [tubular-react](https://github.com/unosquare/tubular-react): A Material-UI table with local or remote data-source. Featuring filtering, sorting, free-text search, export to CSV locally, and aggregations.

## Accessibilité

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it’s about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}