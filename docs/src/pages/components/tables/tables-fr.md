---
title: Composant React Table
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Table (Tableaux)

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

{{"demo": "pages/components/tables/SimpleTable.js"}}

## Tableau dense

Un exemple simple de tableau dense sans fioritures.

{{"demo": "pages/components/tables/DenseTable.js"}}

## Tri & Sélection

Cet exemple illustre l'utilisation de `Checkbox` et des lignes cliquables pour la sélection, avec une `Toolbar` personnalisée. Il utilise le composant `TableSortLabel` pour aider à styliser les en-têtes de colonne.

La table a reçu une largeur fixe pour illustrer le défilement horizontal. Afin d'éviter le défilement des contrôles de pagination, le composant TablePagination est utilisé en dehors du tableau. (L'exemple ['Action de pagination de table personnalisée' ](#custom-table-pagination-action) ci-dessous montre la pagination dans TableFooter.)

{{"demo": "pages/demos/tables/EnhancedTable.js"}}

## Tableaux Personnalisés

Voici un exemple de personnalisation du composant. Vous pouvez en apprendre plus à ce sujet sur la [page de documentation à propos personnalisation](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTable.js"}}

## Action de pagination de table personnalisée

La propriété `Action` du composant `TablePagination` permet l'implémentation d'actions personnalisées.

{{"démo": "pages/components/tables/CustomPaginationActionsTable.js"}}

## Spanning Table

Un exemple simple avec des colonnes couvrant & lignes.

{{"demo": "pages/components/tables/SpanningTable.js"}}

## Table virtualisée

Dans l'exemple suivant, nous montrons comment utiliser [react-virtualized](https://github.com/bvaughn/react-virtualized) avec le composant `Table`. Il affiche 200 lignes et peut facilement gérer plus. La virtualisation aide à résoudre les problèmes de performances.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js"}}

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des avantages suivants:

### material-table

![stars](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) est une table de données simple et puissante pour React basé sur les tables Material-UI avec quelques fonctionnalités supplémentaires. Ils prennent en charge de nombreux cas d'utilisation différents (éditable, filtrage, regroupement, tri, sélection, i18n, données arborescentes, etc.). Vous devriez y jeter un coup d'oeil.

{{"demo": "pages/components/tables/MaterialTableDemo.js"}}

### Autres

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([custom license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Responsive data tables for Material-UI with filtering, sorting, search and more.