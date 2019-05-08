---
title: Snackbar React-Komponente
components: Snackbar, SnackbarContent
---
# Snackbars

<p class="description">Snackbars liefern kurze Nachrichten zu App-Prozessen - normalerweise am unteren Bildschirmrand</p>

[Snackbars](https://material.io/design/components/snackbars.html) informieren Benutzer über einen Prozess, den eine App ausgeführt hat oder ausführen wird. Sie erscheinen vorübergehend am unteren Rand des Bildschirms. Sie sollten die Benutzererfahrung nicht unterbrechen und erfordern keine Benutzereingaben, um verschwinden zu können.

Snackbars enthalten eine einzelne Textzeile, die sich direkt auf die ausgeführte Operation bezieht. Sie können eine Textaktion enthalten, jedoch keine Symbole. Sie können sie verwenden, um Benachrichtigungen anzuzeigen.

#### Häufigkeit

Es kann immer nur eine Snackbar angezeigt werden.

## Einfach

Eine einfache Snackbar, die das Verhalten der Snackbar von Google Keep reproduzieren soll.

{{"demo": "pages/demos/snackbars/SimpleSnackbar.js"}}

## Benutzerdefinierte Snackbars

Wenn du die [Überschreibungs Dokumentationsseite](/customization/overrides/) gelesen hast, aber dich noch nicht sicher genug fühlst, um direkt loszulegen, ist hier noch ein Beispiel, wie du das Design der Snackbar anpassen könntest.

⚠️ Auch wenn die material design Spezifikation zur Verwendung von Themes ermutigt, liegen diese Beispiele außerhalb der üblichen Pfade.

{{"demo": "pages/demos/snackbars/CustomizedSnackbars.js"}}

## Positioniert

Es kann Situationen geben, in denen die Anordnung der Snackbar flexibler sein muss.

{{"demo": "pages/demos/snackbars/PositionedSnackbar.js"}}

## Nachrichtenlänge

Einige Snackbars mit unterschiedlicher Nachrichtenlänge.

{{"demo": "pages/demos/snackbars/LongTextSnackbar.js"}}

## Übergänge

### Aufeinanderfolgende Snackbars

When multiple snackbar updates are necessary, they should appear one at a time.

{{"demo": "pages/demos/snackbars/ConsecutiveSnackbars.js"}}

### Snackbars and floating action buttons (FABs)

Snackbars should appear above FABs (on mobile).

{{"demo": "pages/demos/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 500}}

### Übergang ändern

[Grow](/utils/transitions/#grow) is the default transition but you can use a different one.

{{"demo": "pages/demos/snackbars/TransitionsSnackbar.js"}}

### Control Slide direction

You can change the direction of the [Slide](/utils/transitions/#slide) transition.

{{"demo": "pages/demos/snackbars/DirectionSnackbar.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### notistack

![stars](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm downloads](https://img.shields.io/npm/dm/notistack.svg)

Im folgenden Beispiel demonstrieren wir, wie man [notistack](https://github.com/iamhosseindhv/notistack) benutzt. Notistack macht es einfach, Snackbars anzuzeigen (damit Sie sich nicht mit dem Öffnen / Schließen-Status befassen müssen). It also enables you to stack them on top of one another (but discouraged by the specification).

{{"demo": "pages/demos/snackbars/IntegrationNotistack.js"}}