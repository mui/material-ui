---
title: Grid List React Komponente
components: GridList, GridListTile, GridListTileBar, ListSubheader, IconButton
---

# Rasterliste (Grid List)

<p class="description">Rasterlisten zeigen eine Sammlung von Bildern in einem organisierten Raster an.</p>

[Rasterlisten](https://material.io/design/components/image-lists.html) repräsentieren eine Sammlung von Elementen in einem sich wiederholenden Muster. Sie verbessern das visuelle Verständnis der Inhalte, die sie enthalten.

## Nur-Bild Raster Liste

Ein einfaches Beispiel für ein scrollbare `RasterList` mit Bildern.

{{"demo": "pages/components/grid-list/ImageGridList.js", "hideEditButton": true}}

## Rasterliste mit Titelleisten

In diesem Beispiel wird die Verwendung der `GridListTileBar` veranschaulicht, um jeweils eine Überlagerung zu jedem `GridListTile`hinzuzufügen. Die Überlagerung kann einen `title`, `subtitle` und eine sekundäre Aktion aufnehmen - in diesem Beispiel ein `IconButton`.

{{"demo": "pages/components/grid-list/TitlebarGridList.js", "hideEditButton": true}}

## Einzeilige Rasterliste

Dieses Beispiel zeigt eine horizontale, durchlaufbare, einzeilige Rasterliste von Bildern. Horizontales Scrollen von Rasterlisten wird empfohlen, da das Scrollen typische Lesemuster stört und das Verständnis beeinträchtigt. Eine Ausnahme ist eine horizontal scrollende, einzeilige Rasterliste von Bildern, z.

{{"demo": "pages/components/grid-list/SingleLineGridList.js", "hideEditButton": true}}

## Erweiterte Rasterliste

In diesem Beispiel werden "vorgestellte" Fliesen dargestellt, wobei die Eigenschaften `rows` und `cols` die Größe der Kacheln festlegen und der Abstand durch die `padding` Eigenschaft einstellen wird. Die Kacheln haben eine angepasste Titleleiste, an der Spitze positioniert ist und einem benutzerdefinierten Gradienten `titleBackground` hat. Die sekundäre Aktion `IconButton` befindet sich links.

{{"demo": "pages/components/grid-list/AdvancedGridList.js", "hideEditButton": true, "defaultCodeOpen": false}}