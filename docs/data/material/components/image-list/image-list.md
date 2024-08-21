---
productId: material-ui
title: Image List React component
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://m2.material.io/components/image-lists
githubLabel: 'component: image list'
githubSource: packages/mui-material/src/ImageList
---

# Image List

<p class="description">The Image List displays a collection of images in an organized grid.</p>

Image lists represent a collection of items in a repeated pattern. They help improve the visual comprehension of the content they hold.

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Standard image list

Standard image lists are best for items of equal importance. They have a uniform container size, ratio, and spacing.

{{"demo": "StandardImageList.js"}}

## Quilted image list

Quilted image lists emphasize certain items over others in a collection. They create hierarchy using varied container sizes and ratios.

{{"demo": "QuiltedImageList.js"}}

## Woven image list

Woven image lists use alternating container ratios to create a rhythmic layout. A woven image list is best for browsing peer content.

{{"demo": "WovenImageList.js"}}

## Masonry image list

Masonry image lists use dynamically sized container heights that reflect the aspect ratio of each image. This image list is best used for browsing uncropped peer content.

{{"demo": "MasonryImageList.js"}}

## Image list with title bars

This example demonstrates the use of the `ImageListItemBar` to add an overlay to each item.
The overlay can accommodate a `title`, `subtitle` and secondary action - in this example an `IconButton`.

{{"demo": "TitlebarImageList.js"}}

### Title bar below image (standard)

The title bar can be placed below the image.

{{"demo": "TitlebarBelowImageList.js"}}

### Title bar below image (masonry)

{{"demo": "TitlebarBelowMasonryImageList.js"}}

## Custom image list

In this example the items have a customized titlebar, positioned at the top and with a custom gradient `titleBackground`.
The secondary action `IconButton` is positioned on the left. The `gap` prop is used to adjust the gap between items.

{{"demo": "CustomImageList.js", "defaultCodeOpen": false}}
