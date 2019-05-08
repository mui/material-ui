---
title: Grid List React component
components: GridList, GridListTile, GridListTileBar, ListSubheader, IconButton
---
# Grid List (Lista de grade)

<p class="description">As listas de grade exibem uma coleção de imagens em uma grade organizada.</p>

[Grid lists](https://material.io/design/components/image-lists.html) represent a collection of items in a repeated pattern. They help improve the visual comprehension of the content they hold.

## Lista de grade apenas de imagem

A simple example of a scrollable image `GridList`.

{{"demo": "pages/demos/grid-list/ImageGridList.js", "hideEditButton": true}}

## Lista de grade com barras de título

This example demonstrates the use of the `GridListTileBar` to add an overlay to each `GridListTile`. The overlay can accommodate a `title`, `subtitle` and secondary action - in this example an `IconButton`.

{{"demo": "pages/demos/grid-list/TitlebarGridList.js", "hideEditButton": true}}

## Lista de grade de linha única

This example demonstrates a horizontal scrollable single-line grid list of images. Horizontally scrolling grid lists are discouraged because the scrolling interferes with typical reading patterns, affecting comprehension. One notable exception is a horizontally-scrolling, single-line grid list of images, such as a gallery.

{{"demo": "pages/demos/grid-list/SingleLineGridList.js", "hideEditButton": true}}

## Lista de grade avançada

This example demonstrates "featured" tiles, using the `rows` and `cols` props to adjust the size of the tile, and the `padding` prop to adjust the spacing. The tiles have a customized titlebar, positioned at the top and with a custom gradient `titleBackground`. The secondary action `IconButton` is positioned on the left.

{{"demo": "pages/demos/grid-list/AdvancedGridList.js", "hideEditButton": true}}