---
title: Image list React component
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://material.io/components/image-lists
githubLabel: component: ImageList
---

# Image list

<p class="description">Image lists display a collection of images in an organized grid.</p>

Image lists represent a collection of items in a repeated pattern. They help improve the visual comprehension of the content they hold.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Standard image list

Standard image lists are best for items of equal importance. They have a uniform container size, ratio, and padding.

{{"demo": "pages/components/image-list/StandardImageList.js", "hideEditButton": true}}

## Quilted image list

Quilted image lists emphasize certain items over others in a collection. They create hierarchy using varied container sizes and ratios.

{{"demo": "pages/components/image-list/QuiltedImageList.js", "hideEditButton": true}}

## Image list with title bars

This example demonstrates the use of the `ImageListItemBar` to add an overlay to each item.
The overlay can accommodate a `title`, `subtitle` and secondary action - in this example an `IconButton`.

{{"demo": "pages/components/image-list/TitlebarImageList.js", "hideEditButton": true}}

## Custom image list

In this example the items have a customized titlebar, positioned at the top and with a custom gradient `titleBackground`.
The secondary action `IconButton` is positioned on the left. The `spacing` prop is used to adjust the gap between items.

{{"demo": "pages/components/image-list/CustomImageList.js", "hideEditButton": true, "defaultCodeOpen": false}}
