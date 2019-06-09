---
title: Snackbar React-Komponente
components: Snackbar, SnackbarContent
---

# Snackbars

<p class="description">Snackbars liefern kurze Nachrichten zu App-Prozessen - normalerweise am unteren Bildschirmrand.</p>

[Snackbars](https://material.io/design/components/snackbars.html) informieren Benutzer über einen Prozess, den eine App ausgeführt hat oder ausführen wird. Sie erscheinen vorübergehend am unteren Rand des Bildschirms. Sie sollten die Benutzererfahrung nicht unterbrechen und erfordern keine Benutzereingaben, um verschwinden zu können.

Snackbars enthalten eine einzelne Textzeile, die sich direkt auf die ausgeführte Operation bezieht. Sie können eine Textaktion enthalten, jedoch keine Symbole. Sie können sie verwenden, um Benachrichtigungen anzuzeigen.

#### Häufigkeit

Es kann immer nur eine Snackbar angezeigt werden.

## Einfache Snackbars

Eine einfache Snackbar, die das Verhalten der Snackbar von Google Keep reproduzieren soll.

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## Benutzerdefinierte Snackbars

Hier einige Beispiele zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## Positionierte Snackbars

Es kann Situationen geben, in denen die Anordnung der Snackbar flexibler sein muss.

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## Nachrichtenlänge

Einige Snackbars mit unterschiedlicher Nachrichtenlänge.

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## Übergänge

### Aufeinanderfolgende Snackbars

Wenn mehrere Snackbar-Aktualisierungen erforderlich sind, sollten diese einzeln und nacheinander angezeigt werden.

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### Snackbars und schwebende Aktionsschaltflächen (FABs)

Snackbars sollten (auf dem Handy) über FABs angezeigt werden.

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 500}}

### Übergang ändern

[Grow](/components/transitions/#grow) ist der Standardübergang, Sie können jedoch einen anderen verwenden.

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### Schieberegler Richtung

Sie können die Richtung des [Gleiten](/components/transitions/#slide) Übergangs ändern.

{{"demo": "pages/components/snackbars/DirectionSnackbar.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### notistack

![stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

Im folgenden Beispiel demonstrieren wir, wie man [notistack](https://github.com/iamhosseindhv/notistack) benutzt. Notistack macht es einfach, Snackbars anzuzeigen (damit Sie sich nicht mit dem Öffnen / Schließen-Status befassen müssen). Außerdem können Sie sie übereinander stapeln (wird jedoch von der Spezifikation nicht empfohlen).

{{"demo": "pages/components/snackbars/IntegrationNotistack.js"}}