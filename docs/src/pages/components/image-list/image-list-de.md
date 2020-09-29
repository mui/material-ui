---
title: Grid List React Komponente
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://material.io/components/image-lists
githubLabel: 'component: ImageList'
---

# Rasterliste (Grid List)

<p class="description">Rasterlisten zeigen eine Sammlung von Bildern in einem organisierten Raster an.</p>

[Rasterlisten](https://material.io/design/components/image-lists.html) repräsentieren eine Sammlung von Elementen in einem sich wiederholenden Muster. Sie verbessern das visuelle Verständnis der Inhalte, die sie enthalten.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Nur-Bild Raster Liste

Standard image lists are best for items of equal importance. They have a uniform container size, ratio, and spacing.

{{"demo": "pages/components/image-list/StandardImageList.js"}}

## Rasterliste mit Titelleisten

Quilted image lists emphasize certain items over others in a collection. They create hierarchy using varied container sizes and ratios.

{{"demo": "pages/components/image-list/QuiltedImageList.js"}}

## Einzeilige Rasterliste

Woven image lists use alternating container ratios to create a rhythmic layout. A woven image list is best for browsing peer content.

{{"demo": "pages/components/image-list/WovenImageList.js"}}

## Erweiterte Rasterliste

Masonry image lists use dynamically sized container heights that reflect the aspect ratio of each image. This image list is best used for browsing uncropped peer content.

{{"demo": "pages/components/image-list/MasonryImageList.js"}}

## Image list with title bars

In diesem Beispiel wird die Verwendung der `ImageListItemBar` veranschaulicht, um jeweils eine Überlagerung zu jedem `ImageListItem`hinzuzufügen. Die Überlagerung kann einen `title`, `subtitle` und eine sekundäre Aktion aufnehmen - in diesem Beispiel ein `IconButton`.

{{"demo": "pages/components/image-list/TitlebarImageList.js"}}

### Title bar below image (standard)

The title bar can be placed below the image.

{{"demo": "pages/components/image-list/TitlebarBelowImageList.js"}}

### Title bar below image (masonry)

{{"demo": "pages/components/image-list/TitlebarBelowMasonryImageList.js"}}

## Custom image list

Die Kacheln haben eine angepasste Titleleiste, an der Spitze positioniert ist und einem benutzerdefinierten Gradienten `titleBackground` hat. Die sekundäre Aktion `IconButton` befindet sich links. Die Kacheln haben eine angepasste Titleleiste, an der Spitze positioniert ist und einem benutzerdefinierten Gradienten `titleBackground` hat.

{{"demo": "pages/components/image-list/CustomImageList.js", "defaultCodeOpen": false}}
