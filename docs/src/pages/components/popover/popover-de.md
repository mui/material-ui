---
title: React Popover component
components: Grow, Popover
---

# Popover

<p class="description">Ein Popover kann verwendet werden, um einige Inhalte übereinander anzuzeigen.</p>

Wissenswertes zur Verwendung der Komponente `Popover`:

- Die Komponente ist auf der [`Modal`](/components/modal/) Komponente aufgebaut.
- Das Scrollen und das Wegklicken sind im Gegensatz zur Komponente [`Popper`](/components/popper/) blockiert.

## Einfaches Popover

{{"demo": "pages/components/popover/SimplePopover.js" }}

## Anker Spielplatz

Verwenden Sie die Optionsfelder, um die Positionen des `AnkerOrigin` und des `TransformationOrigin` anzupassen. Sie können auch die `anchorReference` auf `anchorPosition` oder `anchorEl` setzen. Wenn `anchorPosition` ausgewählt ist, wird die Komponente, anstatt an `anchorEl`, am `anchorPosition` prop gerendert.

{{"demo": "pages/components/popover/AnchorPlayground.js", "hideToolbar": true}}

## Maus Interaktionen

This demonstrates how to use the `Popover` component to implement a popover behavior based on the mouse over event.

{{"demo": "pages/components/popover/MouseOverPopover.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### PopupState-Helfer

Es gibt ein Drittanbieter-Paket [`Material-Ui-Popup-Status`](https://github.com/jcoreio/material-ui-popup-state), das sich in den meisten Fällen um Popover Status kümmern kann.

{{"demo": "pages/components/popover/PopoverPopupState.js"}}