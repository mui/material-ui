---
title: React Grid List 网格列表组件
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://material.io/components/image-lists
githubLabel:
  component: ImageList
---

# Grid List 网格列表

<p class="description">网格列表在一个系统的网格中展示了一系列的图像。</p>

[网格列表](https://material.io/design/components/image-lists.html)展示了一个在重复的模式中的子集。 它们有助于提高对所持内容的视觉理解。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 仅有图像的网格列表

Standard image lists are best for items of equal importance. They have a uniform container size, ratio, and spacing.

{{"demo": "pages/components/image-list/StandardImageList.js"}}

## 带有标题栏的网格列表

Quilted image lists emphasize certain items over others in a collection. They create hierarchy using varied container sizes and ratios.

{{"demo": "pages/components/image-list/QuiltedImageList.js"}}

## 单行网格列表

Woven image lists use alternating container ratios to create a rhythmic layout. A woven image list is best for browsing peer content.

{{"demo": "pages/components/image-list/WovenImageList.js"}}

## 高级网格列表

Masonry image lists use dynamically sized container heights that reflect the aspect ratio of each image. This image list is best used for browsing uncropped peer content.

{{"demo": "pages/components/image-list/MasonryImageList.js"}}

## Image list with title bars

此示例演示如何使用 `ImageListItemBar` 为每个 `ImageListItem` 添加一个叠加层。 叠加层可以容纳 `title`， `subtitle` 和辅助操作—在本例中为 `IconButton`。

{{"demo": "pages/components/image-list/TitlebarImageList.js"}}

### Title bar below image (standard)

The title bar can be placed below the image.

{{"demo": "pages/components/image-list/TitlebarBelowImageList.js"}}

### Title bar below image (masonry)

{{"demo": "pages/components/image-list/TitlebarBelowMasonryImageList.js"}}

## Custom image list

瓷砖有一个位于顶部的自定义标题栏，并带有自定义渐变的 `titleBackground`。 而辅助操作的 `IconButton` 则位于左侧。 The `gap` prop is used to adjust the gap between items.

{{"demo": "pages/components/image-list/CustomImageList.js", "defaultCodeOpen": false}}
