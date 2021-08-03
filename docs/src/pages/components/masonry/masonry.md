---
title: React Masonry component
components: Masonry, MasonryItem
githubLabel: 'component: Masonry'
---

# Masonry

<p class="description">Masonry lays out contents of different sizes as blocks of the same width and variable height with configurable gaps.</p>

Masonry maintains a list of content blocks with a consistent width but variable height. The contents are ordered by row. If a row is already filled with the specified number of columns, the next item starts another row, and it is added to the shortest column.

{{"component": "modules/components/ComponentLinkHeader.js", "design": true}}

## Basic Masonry

`<Masonry />` is a container for one or more `<MasonryItem />`s. `<MasonryItem />` can receive any element including `<div />` and `<img />`. Also, it is important to note that each `<MasonryItem />` accepts only one element.

{{"demo": "pages/components/masonry/BasicMasonry.js", "bg": true}}

## Image Masonry

`<Masonry />` orders its children by row. If you would like to order images by column, you can use `<ImageList variant="masonry" />`, whose more details can be found in [Masonry Image List](https://next.material-ui.com/components/image-list/#masonry-image-list).

{{"demo": "pages/components/masonry/ImageMasonry.js", "bg": true}}

## Columns

By passing `columns` to `<Masonry />`, you can configure the number of columns of your masonry.

{{"demo": "pages/components/masonry/FixedColumns.js", "bg": true}}

`columns` accepts responsive values:

{{"demo": "pages/components/masonry/ResponsiveColumns.js", "bg": true}}

## Spacing

By passing `spacing` to `<Masonry />`, you can configure the spacing between `<MasonryItem />`s. It is important to note that `spacing` is a factor of the theme's spacing.

{{"demo": "pages/components/masonry/FixedSpacing.js", "bg": true}}

`spacing` accepts responsive values:

{{"demo": "pages/components/masonry/ResponsiveSpacing.js", "bg": true}}

## Column spanning

By passing `columnSpan` to `<MasonryItem />`, you can configure the number of columns taken up by each `<MasonryItem />`.

{{"demo": "pages/components/masonry/DiffColSizeMasonry.js", "bg": true}}

However, you have to choose the value of `columnSpan` for each item carefully or fine-tune heights of items so that your masonry does not break.

{{"demo": "pages/components/masonry/DiffColSizeMasonryBroken.js", "bg": true}}

## Server-side rendering

By passing `height` to `<MasonryItem />`. you can use server-side rendering. You should either set `height: 100%` or a fixed height equivalent to `height` to the content of `<MasonryItem />`. Otherwise, there will be unwanted gap between `<MasonryItem />` and the content that you pass to it.

{{"demo": "pages/components/masonry/SSRMasonry.js", "bg": true}}
