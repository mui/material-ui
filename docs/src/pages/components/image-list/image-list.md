---
title: Image list React component
components: ImageList, ImageListItem, ImageListItemBar
---

# Image list

<p class="description">Image lists display a collection of images in an organized image.</p>

Image lists represent a collection of items in a repeated pattern. They help improve the visual comprehension of the content they hold.

## Basic image list

A simple example of a scrollable image `ImageList`.

{{"demo": "pages/components/image-list/BasicImageList.js", "hideEditButton": true}}

## Image list with titlebars

This example demonstrates the use of the `ImageListItemBar` to add an overlay to each `ImageListItem`.
The overlay can accommodate a `title`, `subtitle` and secondary action - in this example an `IconButton`.

{{"demo": "pages/components/image-list/TitlebarImageList.js", "hideEditButton": true}}

## Single line image list

This example demonstrates a horizontal scrollable single-line image list of images.
Horizontally scrolling image lists are discouraged because the scrolling interferes with typical reading patterns, affecting comprehension.
One notable exception is a horizontally-scrolling, single-line image list of images, such as a gallery.

{{"demo": "pages/components/image-list/SingleLineImageList.js", "hideEditButton": true}}

## Advanced image list

This example demonstrates "featured" items, using the `rows` and `cols` props to adjust the size of the item, and the `gap` prop to adjust the spacing.
The items have a customized titlebar, positioned at the top, and with a custom gradient `titleBackground`.
The secondary action `IconButton` is positioned on the left.

{{"demo": "pages/components/image-list/AdvancedImageList.js", "hideEditButton": true, "defaultCodeOpen": false}}
