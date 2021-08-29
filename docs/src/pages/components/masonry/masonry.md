---
title: React Masonry component
components: Masonry, MasonryItem
githubLabel: 'component: Masonry'
---

# Masonry

<p class="description">Masonry lays out contents of different sizes as blocks of the same width and variable height with configurable gaps.</p>

Masonry maintains a list of content blocks with a consistent width but variable height.
The contents are ordered by row.
If a row is already filled with the specified number of columns, the next item starts another row, and it is added to the shortest column.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

> Warning: This component has been developed with the use of CSS Grid Level 2. Unfortunately, Chrome only allows to render at most 1,000 rows for each grid.
> Hence, with the current design, a masonry component has a maximum height of 2,000px, and the items beyond this height will fail to be rendered.
> An [issue](https://github.com/mui-org/material-ui/issues/27934) has been created on GitHub to gather workarounds for this limitation. It is worth noting that this limitation does not exist on Firefox or Safari.

## Basic masonry

A simple example of a `<Masonry />`. `<Masonry />` is a container for one or more `<MasonryItem />`s. `<MasonryItem />` can receive any element including `<div />` and `<img />`. Also, it is important to note that each `<MasonryItem />` accepts only one element.

{{"demo": "pages/components/masonry/BasicMasonry.js", "bg": true}}

## Image masonry

This example demonstrates the use of `<Masonry />` for images. `<Masonry />` orders its children by row.
If you would like to order images by column, you can use `<ImageList variant="masonry" />`. More details on this component can be found in [Masonry Image List](/components/image-list/#masonry-image-list).

{{"demo": "pages/components/masonry/ImageMasonry.js", "bg": true}}

## Columns

This example demonstrates the use of the `columns` to configure the number of columns of a `<Masonry />`.

{{"demo": "pages/components/masonry/FixedColumns.js", "bg": true}}

`columns` accepts responsive values:

{{"demo": "pages/components/masonry/ResponsiveColumns.js", "bg": true}}

## Spacing

This example demonstrates the use of the `spacing` to configure the spacing between `<MasonryItem />`s.
It is important to note that `spacing` is a factor of the theme's spacing.

{{"demo": "pages/components/masonry/FixedSpacing.js", "bg": true}}

`spacing` accepts responsive values:

{{"demo": "pages/components/masonry/ResponsiveSpacing.js", "bg": true}}

## Column spanning

This example demonstrates the use of the `columnSpan` to configure the number of columns taken up by each `<MasonryItem />`.

{{"demo": "pages/components/masonry/DiffColSizeMasonry.js", "bg": true}}

However, you have to choose the value of `columnSpan` for each item carefully or fine-tune heights of items so that your masonry does not break.

{{"demo": "pages/components/masonry/DiffColSizeMasonryBroken.js", "bg": true}}

## Server-side rendering

This example demonstrates the use of the `defaultHeight` to configure a fixed height of each `<MasonryItem />`. This is used for server-side rendering.
By default, `height: 100%` will be set to the content of `<MasonryItem />`. If you change this, there can be unwanted gap between `<MasonryItem />` and the content that you pass to it.

{{"demo": "pages/components/masonry/SSRMasonry.js", "bg": true}}
