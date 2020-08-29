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

## Basic image list

A simple example of a scrollable image `ImageList`.

{{"demo": "pages/components/image-list/BasicImageList.js", "hideEditButton": true}}

## Image list with titlebars

This example demonstrates the use of the `ImageListItemBar` to add an overlay to each `ImageListItem`.
The overlay can accommodate a `title`, `subtitle` and secondary action - in this example an `IconButton`.

{{"demo": "pages/components/image-list/TitlebarImageList.js", "hideEditButton": true}}

## Advanced image list

This example demonstrates "featured" items, using the `rows` and `cols` props to adjust the size of the item, and the `padding` prop to adjust the spacing.
The items have a customized titlebar, positioned at the top and with a custom gradient `titleBackground`.
The secondary action `IconButton` is positioned on the left.

{{"demo": "pages/components/image-list/AdvancedImageList.js", "hideEditButton": true, "defaultCodeOpen": false}}
