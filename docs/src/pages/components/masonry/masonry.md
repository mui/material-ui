---
title: React Masonry component
components: Masonry, MasonryItem
githubLabel: 'component: Masonry'
---

# Masonry

<p class="description">Masonry lays out contents of different sizes as blocks of the same width and variable height with configurable gaps.</p>

Masonry maintains a list of content blocks with a consistent width but variable height. The contents are ordered by row. If a row is already filled with the specified number of columns, the next item starts another row, and it is added to the shortest column.

{{"component": "modules/components/ComponentLinkHeader.js", "design": true}}

## Masonry

{{"demo": "pages/components/masonry/ImageMasonry.js", "bg": true}}

> `<MasonryItem />` can receive not only `<img />` elements but also `<div />` elements as shown in the following demo:

{{"demo": "pages/components/masonry/BasicMasonry.js", "bg": true}}

> You can configure the number of columns taken up by each `<MasonryItem />` as shown in the following demo:

{{"demo": "pages/components/masonry/DiffColSizeMasonry.js", "bg": true}}

> In order to use server-side rendering, you can pass the height of the content of `<MasonryItem />` as shown in the following demo:

{{"demo": "pages/components/masonry/SSRMasonry.js", "bg": true}}
