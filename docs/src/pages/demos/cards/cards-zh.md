---
title: React 卡片组件
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---
# 卡片

<p class="description">卡片包含有关单个主题的内容和操作。</p>

[卡片](https://material.io/design/components/cards.html) 是显示一个主题下内容和操作的容器。

他们应该易用于查看相关内容且便于操作。诸如文本和图像的元素，应以能够清晰明确地表示层次结构的方式来展示。

## 简单卡片

尽管卡片支持多操作、多UI控件和过长的菜单，但请克制使用，切记，卡片只是那些复杂且详细信息的入口。

{{"demo": "pages/demos/cards/SimpleCard.js"}}

## 复杂交互

在桌面上, 卡片内容可以展开。

{{"demo": "pages/demos/cards/RecipeReviewCard.js"}}

## 多媒体内容

下面是一个使用图像来增强内容的卡片示例。

{{"demo": "pages/demos/cards/MediaCard.js"}}

默认情况下，我们使用给`<div>` 元素加一个 *背景图片* 的方式来显示多媒体元素。 但在某些情况下，可能会产生一些不可预知的问题。 例如, 您可能希望显示一个视频或一张响应式的图片。 对于这些用例, 请使用 `component` 属性:

{{"demo": "pages/demos/cards/ImgMediaCard.js"}}

## UI控件

卡片中的补充操作可使用图标、文本和 UI 控件显式调用, 通常放在一个卡片的底部。

下面是一个媒体控制卡片的例子。

{{"demo": "pages/demos/cards/MediaControlCard.js"}}