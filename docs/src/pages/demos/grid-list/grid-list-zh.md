---
title: 网格列表 React 组件
components: GridList, GridListTile, GridListTileBar, ListSubheader, IconButton
---
# 网格列表

<p class="description">网格列表在有组织的网格中显示图像集合。</p>

[网格列表](https://material.io/design/components/image-lists.html)表示重复模式中的项目集合。 它们有助于提高对所持内容的视觉理解。

## 仅图像网格列表

可滚动图像` GridList `的简单示例。

{{"demo": "pages/demos/grid-list/ImageGridList.js", "hideEditButton": true}}

## 带有标题栏的网格列表

此示例演示如何使用` GridListTileBar `为每个` GridListTile `添加叠加层。 叠加层可以容纳` title `，` subtitle `和辅助操作 - 在本例中为` IconButton `。

{{"demo": "pages/demos/grid-list/TitlebarGridList.js", "hideEditButton": true}}

## Single line Grid list

This example demonstrates a horizontal scrollable single-line grid list of images. Horizontally scrolling grid lists are discouraged because the scrolling interferes with typical reading patterns, affecting comprehension. One notable exception is a horizontally-scrolling, single-line grid list of images, such as a gallery.

{{"demo": "pages/demos/grid-list/SingleLineGridList.js", "hideEditButton": true}}

## Advanced Grid list

This example demonstrates "featured" tiles, using the `rows` and `cols` props to adjust the size of the tile, and the `padding` prop to adjust the spacing. The tiles have a customized titlebar, positioned at the top and with a custom gradient `titleBackground`. The secondary action `IconButton` is positioned on the left.

{{"demo": "pages/demos/grid-list/AdvancedGridList.js", "hideEditButton": true}}