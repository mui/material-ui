---
title: Menü React-Komponente
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---

# Menüs

<p class="description">Menüs zeigen eine Liste von Auswahlmöglichkeiten auf temporären Oberflächen an.</p>

A [Menu](https://material.io/design/components/menus.html) displays a list of choices on a temporary surface. It appears when the user interacts with a button, or other control.

## Einfaches Menü

Standardmäßig werden einfache Menüs über dem Ankerelement geöffnet (diese Option kann über Eigenschaften geändert werden). Wenn Sie sich nahe an einem Bildschirmrand befinden, richten sich einfache Menüs vertikal neu aus, um sicherzustellen, dass alle Menüelemente vollständig sichtbar sind.

Durch die Auswahl einer Option wird die Option sofort übernommen und das Menü geschlossen.

**Begriffserklärung**: Im Gegensatz zu einfachen Menüs können einfache Dialogfelder zusätzliche Details in Bezug auf die für ein Listenelement verfügbaren Optionen enthalten oder Navigations- oder orthogonale Aktionen in Bezug auf die primäre Aufgabe bereitstellen. Obwohl sie den gleichen Inhalt anzeigen können, werden einfache Menüs gegenüber einfachen Dialogen bevorzugt, da einfache Menüs den aktuellen Kontext des Benutzers weniger stören.

{{"demo": "pages/components/menus/SimpleMenu.js"}}

## Ausgewählte Menüs

Bei der Elementauswahl versuchen einfache Menüs beim Öffnen, das aktuell ausgewählte Menüelement mit dem Ankerelement vertikal auszurichten, und der ursprüngliche Fokus wird auf das ausgewählte Menüelement gesetzt. Das aktuell ausgewählte Menüelement wird mit der Eigenschaft `selected` (von [ListItem](/api/list-item/)) festgelegt. Um ein ausgewähltes Menüelement zu verwenden, ohne den anfänglichen Fokus oder die vertikale Positionierung des Menüs zu beeinflussen, setzen Sie die Eigenschaft `variant` auf `menu`.

{{"demo": "pages/components/menus/SimpleListMenu.js"}}

## MenuList-Zusammensetzung

Die Komponente `Menü` verwendet intern die Komponente `Popover`. Möglicherweise möchten Sie jedoch eine andere Positionierungsstrategie verwenden oder den Bildlauf nicht blockieren. Um diese Anforderungen zu erfüllen, stellen wir eine `MenuList` Komponente bereit, die Sie zusammen mit `Popper` erstellen können.

Die Hauptaufgabe der `MenuList` Komponente besteht darin, den Fokus festzulegen.

{{"demo": "pages/components/menus/MenuListComposition.js", "bg": true}}

## Menüs anpassen

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/menus/CustomizedMenus.js"}}

The `MenuItem` is a wrapper around `ListItem` with some additional styles. You can use the same list composition features with the `MenuItem` component:

## Maximale-Höhe Menüs

Wenn die Höhe eines Menüs die Anzeige aller Menüelemente verhindert, kann das Menü intern gescrollt werden.

{{"demo": "pages/components/menus/LongMenu.js"}}

## Einschränkungen

Es gibt [einen FlexBox bug](https://bugs.chromium.org/p/chromium/issues/detail?id=327437), das verhindert, dass `text-overflow: ellipsis` in einem FlexBox Layout funktioniert. Sie können die Komponente `Typography` mit `noWrap` benutzen, um dieses Problem zu umgehen:

{{"demo": "pages/components/menus/TypographyMenu.js", "bg": true}}

## Übergang ändern

Verwenden Sie einen anderen Übergang.

{{"demo": "pages/components/menus/FadeMenu.js"}}

## Context menu

Here is an example of a context menu. (Right click to open.)

{{"demo": "pages/components/menus/ContextMenu.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### PopupState-Helfer

Es gibt ein Drittanbieter-Paket [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state), das sich in den meisten Fällen um Popper Status kümmern kann.

{{"demo": "pages/components/menus/MenuPopupState.js"}}