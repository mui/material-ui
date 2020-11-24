---
title: React Image list（图像列表）组件
components: GridList, GridListTile, GridListTileBar
---

# Image list 图像列表

<p class="description">图像列表是在一个有组织的图像中显示一个图像集合。</p>

图像列表表示一个重复模式的项目集合。 它们有助于提高对所持内容的视觉理解。

## 基本的图像列表

这是一个可滚动图像的 ` ImageList（图像列表）` 的简单示例。

{{"demo": "pages/components/grid-list/ImageGridList.js", "hideEditButton": true}}

## 带有标题栏的图像列表

此示例演示如何使用 `GridListTileBar` 为每个 `GridListTile` 添加一个叠加层。 叠加层可以容纳 `title`， `subtitle` 和辅助操作—在本例中为 `IconButton`。

{{"demo": "pages/components/grid-list/TitlebarGridList.js", "hideEditButton": true}}

## 单行图像列表

此示例演示了可以在水平方向滚动的单行纯图像的图像列表。 我们其实不鼓励使用可水平滚动图像列表，因为这种滚动方式会干扰我们平时所习惯的阅读模式，从而影响用户的体验。 但也有一个例外情况，就是水平滚动的单行图像列表，例如图库。

{{"demo": "pages/components/grid-list/SingleLineGridList.js", "hideEditButton": true}}

## 高级图像列表

此示例演示了 “标志性的（featured）” 子项，它使用 `row` 和 `cols` 属性来调整项目的大小，并且使用 `gap`  属性来调整间距。 子项有一个位于顶部的自定义标题栏，并带有自定义渐变的 `titleBackground`。 而辅助操作的 `IconButton` 则位于左侧。

{{"demo": "pages/components/grid-list/AdvancedGridList.js", "hideEditButton": true, "defaultCodeOpen": false}}
