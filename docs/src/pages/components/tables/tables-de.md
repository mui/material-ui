---
title: Table React-Komponente
components: Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel
---

# Tabellen (Tables)

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

## Customized tables

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/tables/CustomizedTables.js"}}

## Benutzerdefinierte Tabellen-Seitennummerierung

Die Eigenschaft `Action` der Komponente `TablePagination` ermöglicht die Implementierung von benutzerdefinierten Aktionen.

{{"demo": "pages/components/tables/CustomPaginationActionsTable.js"}}

## Überspannende Tabellen

Ein einfaches Beispiel mit überspannenden Zeilen & Spalten.

{{"demo": "pages/components/tables/SpanningTable.js"}}

## Virtualisierte Tabelle

Im folgenden Beispiel zeigen wir wie Sie [react-virtualized](https://github.com/bvaughn/react-virtualized) mit der `Table<` Komponente nutzen können. Sie zeigt 200 Zeilen an und kann auch einfach mehr verwalten. Virtualization helps with performance issues.

{{"demo": "pages/components/tables/ReactVirtualizedTable.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### material-table

![stars](material-table) ![npm downloads](https://img.shields.io/npm/dm/material-table.svg)

[Material-Table](https://github.com/mbrn/material-table) ist ein einfache und leistungsfähige Daten Tabelle für React basierend auf Material-UI Table mit einigen zusätzlichen Funktionen. Sie unterstützen viele verschiedene Anwendungsfälle (editierbar, filtern, gruppieren, sortieren, auswählen, i18n, Baumdaten und mehr). Sie sollten es sich mal angucken.

{{"demo": "pages/components/tables/MaterialTableDemo.js"}}

### Sonstiges

- [Dx-React-Grid-Material-UI](https://devexpress. github. io/devextreme-reactive/react/grid/) Ein Datengitter für Material-UI mit Funktionen zum Blättern, Sortieren, Filtern, Gruppieren und Bearbeiten ([benutzerdefinierte Lizenz](https://js. devexpress. com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Responsive Datentabellen für Material-UI mit Filterung, Sortierung, Suche und mehr.