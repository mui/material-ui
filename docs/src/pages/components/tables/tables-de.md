---
title: Table React-Komponente
components: Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Table (tabelle)

<p class="description">Tabellen zeigen Datensätze an. Sie können vollständig angepasst werden.</p>

[Tables](https://material.io/design/components/data-tables.html) display information in a way that’s easy to scan, so that users can look for patterns and insights. Sie können wie Karten in den Primär-Inhalt eingebettet werden.

Tabellen können beinhalten:

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

{{"demo": "pages/components/tables/SimpleTable.js", "bg": true}}

## Dichte Tabelle

Ein einfaches Beispiel für einen dichte Tabelle ohne Schnörkel.

{{"demo": "pages/components/tables/DenseTable.js", "bg": true}}

## Sortieren & Auswahl

Dieses Beispiel demonstriert die Nutzung von `Optionsfeld` und klickbaren Zeilen zur Auswahl mit einer benutzerdefinierten `Werkzeugleiste`. Es verwendet die `TableSortLabel` Komponente, um Spaltenüberschriften zu formatieren.

Der Tabelle wurde eine feste Breite zugewiesen, um das horizontale Scrollen zu veranschaulichen. Um zu verhindern, dass die Paginierungssteuerelemente einen Bildlauf ausführen, wird die TablePagination-Komponente außerhalb der Tabelle verwendet. (Das [‚Custom Tabelle Paginierung Aktion‘ Beispiel](#custom-table-pagination-action) unten zeigt die Paginierung im TableFooter.)

{{"demo": "pages/components/tables/EnhancedTable.js", "bg": true}}

## Benutzerdefinierte Tabellen

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

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

Die Eigenschaft `Action` der Komponente `TablePagination` ermöglicht die Implementierung von benutzerdefinierten Aktionen.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js", "bg": true}}

## Fixed header

An example of a table with scrollable rows and fixed column headers. It leverages the `stickyHeader` prop (⚠️ no IE 11 support).

{{"demo": "pages/components/tables/StickyHeadTable.js", "bg": true}}

## Überspannende Tabellen

Ein einfaches Beispiel mit überspannenden Zeilen & Spalten.

{{"demo": "pages/components/tables/SpanningTable.js", "bg": true}}

## Virtualisierte Tabelle

Im folgenden Beispiel zeigen wir wie Sie [react-virtualized](https://github.com/bvaughn/react-virtualized) mit der `Table<` Komponente nutzen können. Sie zeigt 200 Zeilen an und kann auch einfach mehr verwalten. Virtualisierung hilft bei Leistungsproblemen.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js", "bg": true}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### material-table

![stars](https://img.shields.io/github/stars/mbrn/material-table.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[Material-Table](https://github.com/mbrn/material-table) ist ein einfache und leistungsfähige Daten Tabelle für React basierend auf Material-UI Table mit einigen zusätzlichen Funktionen. Sie unterstützen viele verschiedene Anwendungsfälle (editierbar, filtern, gruppieren, sortieren, auswählen, i18n, Baumdaten und mehr). Sie sollten es sich mal angucken.

{{"demo": "pages/components/tables/MaterialTableDemo.js", "bg": true}}

### Sonstiges

- [dx-react-grid-material-ui](https://devexpress.github.io/devextreme-reactive/react/grid/): A data grid for Material-UI with paging, sorting, filtering, grouping and editing features ([paid license](https://js.devexpress.com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables): Responsive data tables for Material-UI with filtering, sorting, search and more.
- [tubular-react](https://github.com/unosquare/tubular-react): A Material-UI table with local or remote data-source. Featuring filtering, sorting, free-text search, export to CSV locally, and aggregations.

## Barrierefreiheit

(WAI tutorial: https://www.w3.org/WAI/tutorials/tables/)

### Caption

A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it’s about and decide if they want to read it.

{{"demo": "pages/components/tables/AcccessibleTable.js", "bg": true}}