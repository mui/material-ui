---
title: Divider React component
components: Divider
---

# Divider

<p class="description">A divider is a thin line that groups content in lists and layouts.</p>

[Dividers](https://material.io/design/components/dividers.html) separate content into clear groups.

## List Dividers

The divider renders as an `<hr>` by default.
You can save rendering this DOM element by using the `divider` property on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## HTML5 Specification

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification.
The examples below show two ways of achieving this.

## Inset Dividers

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Subheader Dividers

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Middle Dividers

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Vertical Dividers

You can also render a divider vertically using the `orientation` prop.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}
