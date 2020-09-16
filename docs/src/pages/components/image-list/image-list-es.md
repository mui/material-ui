---
title: Componente React para Lista cuadriculada
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://material.io/components/image-lists
githubLabel:
  component: ImageList
---

# Lista cuadriculada

<p class="description">Las listas cuadriculadas muestran una colección de imágenes organizadas en una cuadrícula.</p>

Las [Listas cuadriculadas](https://material.io/design/components/image-lists.html) representan una colección de ítems con un patrón repetitivo. Ayudan a mejorar la comprensión visual del contenido que tienen.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Lista cuadriculada sólo con imágenes

Standard image lists are best for items of equal importance. They have a uniform container size, ratio, and spacing.

{{"demo": "pages/components/image-list/StandardImageList.js"}}

## Lista cuadriculada con barras de título

Quilted image lists emphasize certain items over others in a collection. They create hierarchy using varied container sizes and ratios.

{{"demo": "pages/components/image-list/QuiltedImageList.js"}}

## Lista cuadriculada con una línea

Woven image lists use alternating container ratios to create a rhythmic layout. A woven image list is best for browsing peer content.

{{"demo": "pages/components/image-list/WovenImageList.js"}}

## Lista cuadriculada avanzada

Masonry image lists use dynamically sized container heights that reflect the aspect ratio of each image. This image list is best used for browsing uncropped peer content.

{{"demo": "pages/components/image-list/MasonryImageList.js"}}

## Image list with title bars

Este ejemplo demuestra el uso de una barra para cuadro de lista cuadriculada (`ImageListItemBar`) que agrega una capa sobrepuesta a cada cuadro en una lista cuadriculada (`ImageListItem`). La capa sobrepuesta puede acomodar un título (`title`), subtítulo (`subtitle`), y acción secundaria (en este ejemplo un `IconButton`).

{{"demo": "pages/components/image-list/TitlebarImageList.js"}}

### Title bar below image (standard)

The title bar can be placed below the image.

{{"demo": "pages/components/image-list/TitlebarBelowImageList.js"}}

### Title bar below image (masonry)

{{"demo": "pages/components/image-list/TitlebarBelowMasonryImageList.js"}}

## Custom image list

Este ejemplo muestra cuadros "destacados" usando los props filas (`rows`) y columnas (`cols`) para ajustar el tamaño del cuadro, y la prop relleno (`padding`) para ajustar el espaciado. La acción secundaria `IconButton` está ubicada a la izquierda. Los cuadros tienen una barra de título personalizada, ubicada en la parte superior y un fondo de titulo (`titleBackground`) con degradado personalizado.

{{"demo": "pages/components/image-list/CustomImageList.js", "defaultCodeOpen": false}}
