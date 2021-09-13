---
title: Сеть изображений, компонент React
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://material.io/components/image-lists
githubLabel: 'component: ImageList'
---

# Сеть изображений

<p class="description">Сеть изображений суть коллекция изображений на упорядоченной сетке.</p>

[Сеть изображений](https://material.io/design/components/image-lists.html) являются коллекцией элементов в повторяющемся шаблоне. Они помогают улучшить визуальное восприятие своего содержания.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Простая сеть изображений

Standard image lists are best for items of equal importance. They have a uniform container size, ratio, and spacing.

{{"demo": "pages/components/image-list/StandardImageList.js"}}

## Сеть изображений с заголовками

Quilted image lists emphasize certain items over others in a collection. They create hierarchy using varied container sizes and ratios.

{{"demo": "pages/components/image-list/QuiltedImageList.js"}}

## Сеть изображений в одну строку

Woven image lists use alternating container ratios to create a rhythmic layout. A woven image list is best for browsing peer content.

{{"demo": "pages/components/image-list/WovenImageList.js"}}

## Более сложный пример

Masonry image lists use dynamically sized container heights that reflect the aspect ratio of each image. This image list is best used for browsing uncropped peer content.

{{"demo": "pages/components/image-list/MasonryImageList.js"}}

## Image list with title bars

Этот пример демонстрирует использование `Полосы заголовка сети изображений`, которую следует добавить в каждый `Заголовок сети изображений`. Мы можем указать `заголовок`, `подзаголовок` и дополнительное действие - в этом примере `кнопка-иконка`.

{{"demo": "pages/components/image-list/TitlebarImageList.js"}}

### Title bar below image (standard)

The title bar can be placed below the image.

{{"demo": "pages/components/image-list/TitlebarBelowImageList.js"}}

### Title bar below image (masonry)

{{"demo": "pages/components/image-list/TitlebarBelowMasonryImageList.js"}}

## Custom image list

На плитках можно видеть пользовательскую полосу расположенную вверху с даным значением градиента в свойстве `titleBackground`. Дополнительное действие в `Кнопке-иконке` распложенно по левую сторону. На плитках можно видеть пользовательскую полосу расположенную вверху с даным значением градиента в свойстве `titleBackground`.

{{"demo": "pages/components/image-list/CustomImageList.js", "defaultCodeOpen": false}}
