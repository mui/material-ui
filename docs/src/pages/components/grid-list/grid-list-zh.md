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

## 单行网格列表

此示例演示了水平可滚动的单行网格图像列表。 不鼓励水平滚动网格列表，因为滚动会干扰典型的阅读模式，从而影响理解。 一个值得注意的例外是水平滚动的单行网格图像列表，例如图库。

{{"demo": "pages/demos/grid-list/SingleLineGridList.js", "hideEditButton": true}}

## 高级网格列表

此示例演示了“精选”磁贴，使用` rows `和` cols ` props 来调整磁贴的大小，并使用` padding ` prop 来调整间距。 磁贴有一个自定义标题栏，位于顶部，并带有自定义渐变` titleBackground `。 辅助操作` IconButton `位于左侧。

{{"demo": "pages/demos/grid-list/AdvancedGridList.js", "hideEditButton": true}}