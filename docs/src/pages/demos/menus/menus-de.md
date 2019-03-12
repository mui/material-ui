---
title: Menu React component
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
---
# Menüs

<p class="description">Menüs zeigen eine Liste von Auswahlmöglichkeiten auf temporären Oberflächen an.</p>

Ein [Menü](https://material.io/design/components/menus.html) zeigt eine Liste mit Auswahlmöglichkeiten auf einer temporären Oberfläche. Sie werden angezeigt, wenn Benutzer mit einer Schaltfläche, einer Aktion oder einem anderen Steuerelement interagieren.

## Einfaches Menü

Standardmäßig werden einfache Menüs über dem Ankerelement geöffnet (diese Option kann über Eigenschaften geändert werden). Wenn Sie sich nahe an einem Bildschirmrand befinden, richten sich einfache Menüs vertikal neu aus, um sicherzustellen, dass alle Menüelemente vollständig sichtbar sind.

Durch die Auswahl einer Option wird die Option sofort übernommen und das Menü geschlossen.

**Begriffserklärung**: Im Gegensatz zu einfachen Menüs können einfache Dialogfelder zusätzliche Details in Bezug auf die für ein Listenelement verfügbaren Optionen enthalten oder Navigations- oder orthogonale Aktionen in Bezug auf die primäre Aufgabe bereitstellen. Obwohl sie den gleichen Inhalt anzeigen können, werden einfache Menüs gegenüber einfachen Dialogen bevorzugt, da einfache Menüs den aktuellen Kontext des Benutzers weniger stören.

{{"demo": "pages/demos/menus/SimpleMenu.js"}}

## Ausgewählte Menüs

Wenn die Option für eine Elementauswahl verwendet wird, versuchen einfache Menüs, das aktuell ausgewählte Menüelement an dem Ankerelement vertikal auszurichten. Das aktuell ausgewählte Menüelement wird mit der Eigenschaft `selected` (von [ListItem](/api/list-item/)) festgelegt.

{{"demo": "pages/demos/menus/SimpleListMenu.js"}}

## MenuList-Zusammensetzung

Die Komponente `Menü` verwendet intern die Komponente `Popover`. Möglicherweise möchten Sie jedoch eine andere Positionierungsstrategie verwenden oder den Bildlauf nicht blockieren. Um diese Anforderungen zu erfüllen, stellen wir eine `MenuList` Komponente bereit, die Sie zusammen mit `Popper` erstellen können.

Die Hauptaufgabe der `MenuList` Komponente besteht darin, den Fokus festzulegen.

{{"demo": "pages/demos/menus/MenuListComposition.js"}}

## Angepasstes MenuItem

Wenn du die [Overrides Dokumentationsseite](/customization/overrides/) gelesen hast, aber dich noch nicht sicher genug fühlst, um direkt loszulegen, ist hier noch ein Beispiel, wie du das `MenuItem` anpassen könntest.

⚠️ Auch wenn die Material-Design Spezifikation zur Verwendung von Themes ermutigt, liegen diese Beispiele außerhalb der üblichen Pfade.

{{"demo": "pages/demos/menus/ListItemComposition.js"}}

Das `MenuItem` ist ein Wrapper um ein `ListItem` mit einigen zusätzlichen Stilen. Sie können dieselben Listenkompositionsfunktionen mit der `MenuItem` Komponente verwenden:

## Maximale-Höhe Menüs

Wenn die Höhe eines Menüs die Anzeige aller Menüelemente verhindert, kann das Menü intern gescrollt werden.

{{"demo": "pages/demos/menus/LongMenu.js"}}

## Einschränkungen

Es gibt [einen FlexBox bug](https://bugs.chromium.org/p/chromium/issues/detail?id=327437), das verhindert, dass `text-overflow: ellipsis` in einem FlexBox Layout funktioniert. Sie können die Komponente `Typography` mit `noWrap` benutzen, um dieses Problem zu umgehen:

{{"demo": "pages/demos/menus/TypographyMenu.js"}}

## Übergang ändern

Verwenden Sie einen anderen Übergang.

{{"demo": "pages/demos/menus/FadeMenu.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### PopupState-Helfer

Es gibt ein Drittanbieter-Paket [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state), das sich in den meisten Fällen um Popper Status kümmern kann.

{{"demo": "pages/demos/menus/MenuPopupState.js"}}