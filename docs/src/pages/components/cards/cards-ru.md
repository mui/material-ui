---
title: Card компонент из React
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---

# Card (карточка)

<p class="description">Карточки содержат контент и действия, относящиеся к одной теме.</p>

[Карточки](https://material.io/design/components/cards.html) - это поверхности, которые отображают контент и действия относящиеся к одной теме / объекту.

They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.

## Простая Карточка

Несмотря на то, что на карточках можно располагать несколько действий, элементы управления и выпадающие меню, будьте сдержаны и помните, что карточки - это входные точки для более сложной и детальной информации.

{{"demo": "pages/components/cards/SimpleCard.js", "bg": true}}

## Сложное взаимодействие

В варианте для десктопа контент карточки может раздвигаться.

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## Медиа

Пример карточки, использующей изображение, дополняющее контент.

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

По умолчанию мы используем комбинацию `<div>` элемента и *background image* для отображения медиа. Это может быть проблематично в некоторых ситуациях. Например, вам может понадобиться отобразить видео или адаптивное изображение. Используйте свойство `component` для этих случаев:

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠️ When `component="img"`, CardMedia relies on `object-fit` for centering the image. It's not supported by IE 11.

## Элементы управления

Все доступные в пределах карточки дополнительные действия следует явно изображать с помощью иконок, текста и других элементов управления, обычно размещаемых в нижней части карточки.

Вот пример карточки с элементами управления мультимедиа.

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}