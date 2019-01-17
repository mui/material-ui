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

## Complex Interaction

On desktop, card content can expand.

{{"demo": "pages/demos/cards/RecipeReviewCard.js"}}

## Media

Example of a card using an image to reinforce the content.

{{"demo": "pages/demos/cards/MediaCard.js"}}

By default, we use the combination of a `<div>` element and a *background image* to display the media. It can be problematic in some situations. For instance, you might want to display a video or a responsive image. Use the `component` property for these use cases:

{{"demo": "pages/demos/cards/ImgMediaCard.js"}}

## UI Controls

Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

Here's an example of a media control card.

{{"demo": "pages/demos/cards/MediaControlCard.js"}}