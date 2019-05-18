---
title: React Card（卡片）组件
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---

# Cards（卡片）

<p class="description">卡片包含有关单个主题的内容和操作。</p>

[卡片](https://material.io/design/components/cards.html) 是显示单个主题下内容和操作的容器。

他们应该易用于查看相关内容且便于操作。诸如文本和图像的元素，应以能够清晰明确地表示层次结构的方式来展示。

## 简单的卡片

尽管卡片支持多操作、多UI控件和过长的菜单，但请克制使用，切记，卡片只是那些复杂且详细信息的入口。

{{"demo": "pages/components/cards/SimpleCard.js"}}

## 复杂交互

在桌面上, 卡片内容可以展开。

{{"demo": "pages/components/cards/RecipeReviewCard.js"}}

## 多媒体内容

下面是一个使用图像来增强内容的卡片示例。

{{"demo": "pages/components/cards/MediaCard.js"}}

默认情况下，我们使用混合 `<div>`元素和*背景图片*来显示多媒体元素。 在某些情况下可能会产生一些问题。 例如, 您可能希望显示一个视频或一张响应式的图片。 对于这些用例, 请使用 `component` 属性:

{{"demo": "pages/components/cards/ImgMediaCard.js"}}

> 当 `component="img"` 时，CardMedia依靠 `object-fit` 进行图像居中。而 IE11 不支持此功能。

## UI 控件

卡片中的补充操作可使用图标、文本和 UI 控件显式调用, 而它们通常被放在卡片的底部。

下面是一个媒体控制卡片的例子。

{{"demo": "pages/components/cards/MediaControlCard.js"}}