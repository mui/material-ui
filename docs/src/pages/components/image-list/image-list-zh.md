---
title: React 图像列表组件
components: ImageList, ImageListItem, ImageListItemBar
---

# Image list 图像列表

<p class="description">图像列表的功能是在一个有组织的一张图中展示一系列图像。</p>

图像列表表示重复模式的项目集合。 它们有助于提高对所持内容的视觉理解。

## 基本的图像列表

这是一个可滚动的图像的`网格列表`的简单示例。

{{"demo": "pages/components/image-list/ImageImageList.js", "hideEditButton": true}}

## 带有标题栏的网格列表

此示例演示如何使用 `ImageListItemBar` 为每个 `ImageListItem` 添加一个叠加层。 叠加层可以容纳 `title`， `subtitle` 和辅助操作—在本例中为 `IconButton`。

{{"demo": "pages/components/image-list/TitlebarImageList.js", "hideEditButton": true}}

## 单行网格列表

此示例演示了可以在水平方向滚动的单行纯图像网格列表。 我们其实不鼓励水平滚动网格列表，因为滚动会干扰我们所习惯的阅读模式，从而影响用户的体验。 但也有一个例外情况，就是水平滚动的单行网格图像列表，例如图库。

{{"demo": "pages/components/image-list/SingleLineImageList.js", "hideEditButton": true}}

## 高级图像列表

此示例演示“feated”项目。 使用 `row` 和 `cols` 属性来调整项目的大小, 并且使用 `gap`  属性来调整间距。 瓷砖有一个位于顶部的自定义标题栏，并带有自定义渐变的 `titleBackground`。 而辅助操作的 `IconButton` 则位于左侧。

{{"demo": "pages/components/image-list/AdvancedImageList.js", "hideEditButton": true, "defaultCodeOpen": false}}
