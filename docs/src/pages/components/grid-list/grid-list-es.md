---
title: Componente React para Lista cuadriculada
components: GridList, GridListTile, GridListTileBar, ListSubheader, IconButton
---

# Lista cuadriculada

<p class="description">Las listas cuadriculadas muestran una colección de imágenes organizadas en una cuadrícula.</p>

Las [Listas cuadriculadas](https://material.io/design/components/image-lists.html) representan una colección de ítems con un patrón repetitivo. Ayudan a mejorar la comprensión visual del contenido que tienen.

## Lista cuadriculada sólo con imágenes

Un ejemplo simple de una lista cuadriculada (`GridList`) con imágenes desplazables.

{{"demo": "pages/components/grid-list/ImageGridList.js", "hideEditButton": true}}

## Lista cuadriculada con barras de título

Este ejemplo demuestra el uso de una barra para cuadro de lista cuadriculada (`GridListTileBar`) que agrega una capa sobrepuesta a cada cuadro en una lista cuadriculada (`GridListTile`). La capa sobrepuesta puede acomodar un título (`title`), subtítulo (`subtitle`), y acción secundaria (en este ejemplo un `IconButton`).

{{"demo": "pages/components/grid-list/TitlebarGridList.js", "hideEditButton": true}}

## Lista cuadriculada con una línea

Este ejemplo muestra una lista cuadrícula con una sola línea desplazable horizontalmente. Se desaconseja usar listas cuadriculadas con desplazamiento horizontal ya que estas interfieren con los patrones típicos de lectura, afectando la comprensión. Una excepción notable es una lista cuadriculada que desplaza imágenes horizontalmente en una sola línea, como una galería.

{{"demo": "pages/components/grid-list/SingleLineGridList.js", "hideEditButton": true}}

## Lista cuadriculada avanzada

Este ejemplo muestra cuadros "destacados" usando los props filas (`rows`) y columnas (`cols`) para ajustar el tamaño del cuadro, y la prop relleno (`padding`) para ajustar el espaciado. Los cuadros tienen una barra de título personalizada, ubicada en la parte superior y un fondo de titulo (`titleBackground`) con degradado personalizado. La acción secundaria `IconButton` está ubicada a la izquierda.

{{"demo": "pages/components/grid-list/AdvancedGridList.js", "hideEditButton": true, "defaultCodeOpen": false}}