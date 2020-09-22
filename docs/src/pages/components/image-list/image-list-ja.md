---
title: Grid List React component
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://material.io/components/image-lists
githubLabel:
  component: ImageList
---

# Grid List

<p class="description">グリッドリストは、整理されたグリッドで画像のコレクションを表示します。</p>

[グリッドリスト](https://material.io/design/components/image-lists.html) は、繰り返しパターンの項目の集まりを表します。 それらは、保持するコンテンツの視覚的理解を改善するのに役立ちます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 画像のみのGrid list

Standard image lists are best for items of equal importance. They have a uniform container size, ratio, and spacing.

{{"demo": "pages/components/image-list/StandardImageList.js"}}

## タイトルバー付きのGrid list

Quilted image lists emphasize certain items over others in a collection. They create hierarchy using varied container sizes and ratios.

{{"demo": "pages/components/image-list/QuiltedImageList.js"}}

## Single line Grid list 単一行グリッドリスト

Woven image lists use alternating container ratios to create a rhythmic layout. A woven image list is best for browsing peer content.

{{"demo": "pages/components/image-list/WovenImageList.js"}}

## 高度なグリッドリスト

Masonry image lists use dynamically sized container heights that reflect the aspect ratio of each image. This image list is best used for browsing uncropped peer content.

{{"demo": "pages/components/image-list/MasonryImageList.js"}}

## Image list with title bars

この例は、 `ImageListItemBar` を使用して、各 `ImageListItem`オーバーレイを追加する方法を示しています。 オーバーレイには、 `title`, `subtitle` および副次的アクション例えば`IconButton`を含めることができます。

{{"demo": "pages/components/image-list/TitlebarImageList.js"}}

### Title bar below image (standard)

The title bar can be placed below the image.

{{"demo": "pages/components/image-list/TitlebarBelowImageList.js"}}

### Title bar below image (masonry)

{{"demo": "pages/components/image-list/TitlebarBelowMasonryImageList.js"}}

## Custom image list

この例では、`rows` and `cols` プロップを使用してタイルのサイズを調整し、 `padding`プロップを使用して間隔を調整する方法を示します。 セカンダリアクション `IconButton` は左側に配置されます。 タイルには、上部にカスタムのタイトルバーがあり、カスタムのグラデーション`titleBackground`があります。

{{"demo": "pages/components/image-list/CustomImageList.js", "defaultCodeOpen": false}}
