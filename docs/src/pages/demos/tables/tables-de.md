---
title: Table React component
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---
# Tabellen

<p class="description">Daten-Tabellen zeigen Listen von Daten an. Diese können vollständig benutzerdefiniert gestaltet werden.</p>

[Daten-Tabellen](https://material.io/design/components/data-tables.html) zeigen Informationen an, sodass sie einfach zu lesen sind und Nutzern das Anzeigen von Mustern und Ansichten ermöglicht. Sie können wie Karten in den Primär-Inhalt eingebettet werden.

Daten-Tabellen können enthalten:

- Eine entsprechende Visualisierung
- Navigation
- Werkzeuge um Daten abzufragen und zu manipulieren

Wenn Sie Werkzeuge einbinden, sollten diese direkt über oder unter der Tabelle platziert werden.

## Struktur

Eine Daten-Tabelle enthält oben eine Kopfzeile, welche die Spaltennamen auflistet, gefolgt von den Zeilen für Daten.

Jede Zeile sollte ein Optionsfeld begleiten, falls die Nutzer die Daten auswählen oder ändern müssen.

For accessibility, the first column is set to be a `<th>` element, with a `scope` of `"row"`. Dies ermöglicht es Lesern, mithilfe von Zeilen- und Spaltenname den Inhalt einer Zelle zu ermitteln.

## Einfache Tabelle

Ein einfaches Beispiel ohne Verzierungen.

{{"demo": "pages/demos/tables/SimpleTable.js"}}

## Sortieren & Auswahl

Dieses Beispiel demonstriert die Nutzung von `Optionsfeld` und klickbaren Zeilen zur Auswahl mit einer benutzerdefinierten `Werkzeugleiste`. It uses the `TableSortLabel` component to help style column headings.

The Table has been given a fixed width to demonstrate horizontal scrolling. In order to prevent the pagination controls from scrolling, the TablePagination component is used outside of the Table. (The ['Custom Table Pagination Action' example](#custom-table-pagination-action) below shows the pagination within the TableFooter.)

{{"demo": "pages/demos/tables/EnhancedTable.js"}}

## Benutzerdefinierte Tabellen

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here are examples of how you can change the look of a `TableCell`.

⚠️ While the material design specification encourages theming, this example is off the beaten path.

{{"demo": "pages/demos/tables/CustomizedTable.js"}}

## Benutzerdefinierte Tabellen-Seitennummerierung

The `Action` property of the `TablePagination` component allows the implementation of custom actions.

{{"demo": "pages/demos/tables/CustomPaginationActionsTable.js"}}

## Überspannende Tabellen

Ein einfaches Beispiel mit überspannenden Zeilen & Spalten.

{{"demo": "pages/demos/tables/SpanningTable.js"}}

## Virtualisierte Tabelle

Im folgenden Beispiel zeigen wir wie Sie [react-virtualized](https://github.com/bvaughn/react-virtualized) mit der `Table<` Komponente nutzen können. Sie zeigt 200 Zeilen an und kann auch einfach mehr verwalten.

{{"demo": "pages/demos/tables/ReactVirtualizedTable.js"}}

## Complementary projects

For more advanced use cases you might be able to take advantage of:

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/) A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([custom license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Responsive data tables for Material-UI with filtering, sorting, search and more.
- [material-table](https://github.com/mbrn/material-table) DataTable based on table component with additional features like search, filtering, sorting and much more.
- [mui-virtualized-table](https://github.com/techniq/mui-virtualized-table) Virtualized Material-UI table.