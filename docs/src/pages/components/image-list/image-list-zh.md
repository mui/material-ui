---
title: React Image list（图像列表）组件
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://material.io/components/image-lists
githubLabel: 'component: ImageList'
---

# Image list 图像列表

<p class="description">图像列表在一个系统的栅格中展示了一系列的图像。</p>

图像列表表示重复模式的项目集合。 它们有助于提高对所持内容的视觉理解。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 标准的图像列表

标准的图像列表最适合用于同等重要的项目。 它们具有统一的容器尺寸、比例和间距。

{{"demo": "pages/components/image-list/StandardImageList.js"}}

## 拼接图像列表

拼接图像列表强调集合中的某些项目而不是之外的其他项目。 它们使用不同的容器尺寸和比例来创建层次结构。

{{"demo": "pages/components/image-list/QuiltedImageList.js"}}

## 交织图像列表

交织图像列表使用交替的容器比率来创建一个有节奏的布局。 当需要浏览同行内容时，最好采用交织图像列表的方式。

{{"demo": "pages/components/image-list/WovenImageList.js"}}

## 堆砌图像列表

堆砌图像列表使用动态调整大小的容器高度，以反映每个图像的纵横比。 该图像列表最适合用于浏览未被裁剪的同行内容。

{{"demo": "pages/components/image-list/MasonryImageList.js"}}

## 带标题栏的图像列表

此示例演示如何使用 `ImageListItemBar` 来为每个子块添加一个叠加层。 叠加层可以容纳 `title`， `subtitle` 和辅助操作—在本例中为 `IconButton`。

{{"demo": "pages/components/image-list/TitlebarImageList.js"}}

### 位于图像下方的标题栏（标准）

标题栏可以放置在图像下方。

{{"demo": "pages/components/image-list/TitlebarBelowImageList.js"}}

### 位于图像下方的标题栏（堆砌）

{{"demo": "pages/components/image-list/TitlebarBelowMasonryImageList.js"}}

## 自定义图像列表

在这个例子中，项目有一个自定义的标题栏，位于顶部，并有一个自定义渐变的 `titleBackground`。 而辅助操作的 `IconButton` 则位于左侧。 `gap` 属性用于调整项目之间的间隙。

{{"demo": "pages/components/image-list/CustomImageList.js", "defaultCodeOpen": false}}
