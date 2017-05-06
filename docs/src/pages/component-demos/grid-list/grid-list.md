---
components: GridList, GridListTile, GridListTileBar, ListSubheader, IconButton
---

# Grid List

[Grid lists](https://www.google.com/design/spec/components/grid-lists.html)
are an alternative to standard list views.
A grid list consists of a repeated pattern of cells arrayed in a vertical and horizontal layout.

Grid lists are best used on similar data types.
They help improve the visual comprehension of the content they contain.

## Image-only Grid list

A simple example of a scrollable image `GridList`.

{{demo='pages/component-demos/grid-list/ImageGridList.js'}}

## Grid list with titlebars

This example demonstrates the use of the `GridListTileBar` to add an overlay to each `GridListTile`.
The overlay can accommodate a `title`, `subtitle` and secondary action - in this example an `IconButton`.

{{demo='pages/component-demos/grid-list/TitlebarGridList.js'}}

## Advanced Grid list

This example demonstrates "featured" tiles, using the `rows` and `cols` props to adjust the size of the tile, and the `padding` prop to adjust the spacing.
The tiles have a customised titlebar, positioned at the top and with a custom gradient `titleBackground`.
The secondary action `IconButton` is positioned on the left.

{{demo='pages/component-demos/grid-list/AdvancedGridList.js'}}

## Single line Grid list

This example demonstrates a horizontal scrollable single-line grid list of images.
Horizontally scrolling grid lists are discouraged because the scrolling interferes with typical reading patterns, affecting comprehension.
One notable exception is a horizontally-scrolling, single-line grid list of images, such as a gallery.

{{demo='pages/component-demos/grid-list/SingleLineGridList.js'}}
