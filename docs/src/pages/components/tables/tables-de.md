---
title: Table React-Komponente
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Tabellen (Tables)

<p class="description">Data tables display sets of data. They can be fully customized.</p>

[Daten-Tabellen](https://material.io/design/components/data-tables.html) zeigen Informationen an, sodass sie einfach zu lesen sind und Nutzern das Anzeigen von Mustern und Ansichten ermöglicht. Sie können wie Karten in den Primär-Inhalt eingebettet werden.

Daten-Tabellen können enthalten:

- Eine entsprechende Visualisierung
- Navigation
- Werkzeuge um Daten abzufragen und zu manipulieren

Wenn Sie Werkzeuge einbinden, sollten diese direkt über oder unter der Tabelle platziert werden.

## Struktur

Eine Daten-Tabelle enthält oben eine Kopfzeile, welche die Spaltennamen auflistet, gefolgt von den Zeilen für Daten.

Jede Zeile sollte ein Optionsfeld begleiten, falls die Nutzer die Daten auswählen oder ändern müssen.

Für die Zugänglichkeit, ist die erste Spalte ein `<th>` Element, welches ein `scope` von `"row"` hat. Dies ermöglicht es Lesern, mithilfe von Zeilen- und Spaltenname den Inhalt einer Zelle zu ermitteln.

## Einfache Tabelle

Ein einfaches Beispiel ohne Verzierungen.

{{"demo": "pages/components/tables/SimpleTable.js"}}

## Dichte Tabelle

Ein einfaches Beispiel für einen dichte Tabelle ohne Schnörkel.

{{"demo": "pages/components/tables/DenseTable.js"}}

## Sortieren & Auswahl

Dieses Beispiel demonstriert die Nutzung von `Optionsfeld` und klickbaren Zeilen zur Auswahl mit einer benutzerdefinierten `Werkzeugleiste`. Es verwendet die `TableSortLabel` Komponente, um Spaltenüberschriften zu formatieren.

Der Tabelle wurde eine feste Breite zugewiesen, um das horizontale Scrollen zu veranschaulichen. Um zu verhindern, dass die Paginierungssteuerelemente einen Bildlauf ausführen, wird die TablePagination-Komponente außerhalb der Tabelle verwendet. (Das [‚Custom Tabelle Paginierung Aktion‘ Beispiel](#custom-table-pagination-action) unten zeigt die Paginierung im TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js"}}

## Benutzerdefinierte Tabellen

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js"}}

## Benutzerdefinierte Tabellen-Seitennummerierung

Die Eigenschaft `Action` der Komponente `TablePagination` ermöglicht die Implementierung von benutzerdefinierten Aktionen.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js"}}

## Fixed header

An example of a table with scrollable rows and fixed column headers. It leverages the `stickyHeader` prop (⚠️ no IE 11 support).

{{"demo": "pages/components/tables/StickyHeadTable.js"}}

## Spanning Table

A simple example with spanning rows & columns.

{{"demo": "pages/components/tables/SpanningTable.js"}}

## Virtualized Table

In the following example, we demonstrate how to use [react-virtualized](https://github.com/bvaughn/react-virtualized) with the `Table` component. Sie zeigt 200 Zeilen an und kann auch einfach mehr verwalten. Virtualisierung hilft bei Leistungsproblemen.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### material-table

![stars](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[material-table](https://github.com/mbrn/material-table) is a simple and powerful Datatable for React based on Material-UI Table with some additional features. They support many different use cases (editable, filtering, grouping, sorting, selection, i18n, tree data and more). You should check it out.

{{"demo": "pages/components/tables/MaterialTableDemo.js"}}

### Sonstiges

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/): A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([paid license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables): Responsive data tables for Material-UI with filtering, sorting, search and more.
- [tubular-react](https://github.com/unosquare/tubular-react): A Material-UI table with local or remote data-source. Featuring filtering, sorting, free-text search, export to CSV locally, and aggregations.

## Barrierefreiheit

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it’s about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js"}}