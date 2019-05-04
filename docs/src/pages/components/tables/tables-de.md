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

{{"demo": "pages/demos/tables/SimpleTable.js"}}

## Dichte Tabelle

Ein einfaches Beispiel für einen dichte Tabelle ohne Schnörkel.

{{"demo": "pages/demos/tables/DenseTable.js"}}

## Sortieren & Auswahl

Dieses Beispiel demonstriert die Nutzung von `Optionsfeld` und klickbaren Zeilen zur Auswahl mit einer benutzerdefinierten `Werkzeugleiste`. Es verwendet die `TableSortLabel` Komponente, um Spaltenüberschriften zu formatieren.

Der Tabelle wurde eine feste Breite zugewiesen, um das horizontale Scrollen zu veranschaulichen. Um zu verhindern, dass die Paginierungssteuerelemente einen Bildlauf ausführen, wird die TablePagination-Komponente außerhalb der Tabelle verwendet. (Das [‚Custom Tabelle Paginierung Aktion‘ Beispiel](#custom-table-pagination-action) unten zeigt die Paginierung im TableFooter.)

{{"demo": "pages/demos/tables/EnhancedTable.js"}}

## Benutzerdefinierte Tabellen

Wenn du die [Überschreibungs Dokumentationsseite](/customization/overrides/) gelesen hast, aber dich noch nicht sicher genug fühlst, um direkt loszulegen, ist hier noch ein Beispiel, wie du das Design der `Zellen` anpassen könntest.

⚠️ Auch wenn die Material-Design Spezifikation zur Verwendung von Themes ermutigt, liegen diese Beispiele außerhalb der üblichen Pfade.

{{"demo": "pages/demos/tables/CustomizedTable.js"}}

## Benutzerdefinierte Tabellen-Seitennummerierung

Die Eigenschaft `Action` der Komponente `TablePagination` ermöglicht die Implementierung von benutzerdefinierten Aktionen.

{{"demo": "pages/demos/tables/CustomPaginationActionsTable.js"}}

## Überspannende Tabellen

Ein einfaches Beispiel mit überspannenden Zeilen & Spalten.

{{"demo": "pages/demos/tables/SpanningTable.js"}}

## Virtualisierte Tabelle

Im folgenden Beispiel zeigen wir wie Sie [react-virtualized](https://github.com/bvaughn/react-virtualized) mit der `Table<` Komponente nutzen können. Sie zeigt 200 Zeilen an und kann auch einfach mehr verwalten. Virtualisierung hilft bei Leistungsproblemen.

{{"demo": "pages/demos/tables/ReactVirtualizedTable.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

- [Dx-React-Grid-Material-UI](https://devexpress. github. io/devextreme-reactive/react/grid/) Ein Datengitter für Material-UI mit Funktionen zum Blättern, Sortieren, Filtern, Gruppieren und Bearbeiten ([benutzerdefinierte Lizenz](https://js. devexpress. com/licensing/)).
- [mui-datatables](https://github.com/gregnb/mui-datatables) Responsive Datentabellen für Material-UI mit Filterung, Sortierung, Suche und mehr.
- [Material-Tabelle](https://github.com/mbrn/material-table) Auf Tabellenkomponenten basierende DataTable mit zusätzlichen Funktionen wie Suchen, Filtern, Sortieren und vieles mehr.
- [mui-virtualized-table](https://github.com/techniq/mui-virtualized-table) Virtualized Material-UI-Tabelle.
- [mui-tables](https://parkerself.gitbook.io/mui-table/) Anpassbare Tabelle zum Verwalten komplexer Daten. Enthält eine Zusammenfassungszeile, Deduplizierung & sowie Zusammenführen, Suchen usw.