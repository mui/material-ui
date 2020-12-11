---
title: React Masonry component
components: Masonry
githubLabel: 'component: Masonry'
---

# Masonry

<p class="description">The Material Design Masonry layout grid.</p>

## How it works

The masonry system is implemented with the `Masonry` component:

## Columns

{{"demo": "pages/components/masonry/Columns.js", "bg": true}}

## Spacing

Spacing only affect on column spacing (left and right padding)

{{"demo": "pages/components/masonry/Spacing.js", "bg": true}}

## Limitations

Although visually the content is render left to right, in the DOM is rendered by columns (top to bottom column by column).
this might cause some concern on accessibility:

- Screen readers will be reading it in a probably not good order
- Tab order will follow the rendered on DOM, to prevent that you can have custom tabIndex
