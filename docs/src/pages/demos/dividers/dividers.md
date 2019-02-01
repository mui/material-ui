---
title: Divider React component
components: Divider
---

# Dividers

<p class="description">A divider is a thin line that groups content in lists and layouts.</p>

[Dividers](https://material.io/design/components/dividers.html) separate content into clear groups.

## List Dividers

The divider renders as a `<hr>` by default.
You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/demos/dividers/ListDividers.js"}}

## HTML5 Specification

We need to make sure the `Divider` is rendered as a `li` to match the HTML5 specification.
The examples below show two ways of achieving this.

## Inset Dividers

The `inset` property has now been deprecated. You should now use `variant="inset"`.

{{"demo": "pages/demos/dividers/InsetDividers.js"}}

## Subheader Dividers

{{"demo": "pages/demos/dividers/SubheaderDividers.js"}}

## Middle Dividers

{{"demo": "pages/demos/dividers/MiddleDividers.js"}}
