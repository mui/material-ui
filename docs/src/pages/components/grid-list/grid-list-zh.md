---
title: React Grid List（网格列表）组件
components: GridList, GridListTile, GridListTileBar, ListSubheader, IconButton
---

# Grid List 网格列表

<p class="description">网格列表在一个系统的网格中展示了一系列的图像。</p>

[网格列表](https://material.io/design/components/image-lists.html)展示了一个在重复的模式中的子集。 它们有助于提高对所持内容的视觉理解。

## 仅有图像的网格列表

这是一个可滚动的图像的`网格列表`的简单示例。

{{"demo": "pages/components/grid-list/ImageGridList.js", "hideEditButton": true}}

## 带有标题栏的网格列表

此示例演示如何使用 `GridListTileBar` 为每个 `GridListTile` 添加一个叠加层。 叠加层可以容纳 `title`， `subtitle` 和辅助操作—在本例中为 `IconButton`。

{{"demo": "pages/components/grid-list/TitlebarGridList.js", "hideEditButton": true}}

## 单行网格列表

此示例演示了可以在水平方向滚动的单行纯图像网格列表。 我们其实不鼓励水平滚动网格列表，因为滚动会干扰典型的阅读模式，从而影响用户的理解。 一个值得注意的例外是水平滚动的单行网格图像列表，例如图库。

{{"demo": "pages/components/grid-list/SingleLineGridList.js", "hideEditButton": true}}

## 高级网格列表

此示例演示了“精选的”瓷砖效果 ，使用 `rows` 和 `cols` props 来调整磁贴的大小，并使用 `padding` 属性来调整间距。 瓷砖有一个位于顶部的自定义标题栏，并带有自定义渐变的 `titleBackground `。 而辅助操作的 `IconButton` 则位于左侧。

{{"demo": "pages/components/grid-list/AdvancedGridList.js", "hideEditButton": true, "defaultCodeOpen": false}}