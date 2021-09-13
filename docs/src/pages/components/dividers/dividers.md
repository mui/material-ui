---
title: React Divider component
components: Divider
githubLabel: 'component: Divider'
materialDesign: https://material.io/components/dividers
---

# Divider

<p class="description">A divider is a thin line that groups content in lists and layouts.</p>

Dividers separate content into clear groups.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## List dividers

The divider renders as an `<hr>` by default.
You can save rendering this DOM element by using the `divider` prop on the `ListItem` component.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## HTML5 specification

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification.
The examples below show two ways of achieving this.

## Inset dividers

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Subheader dividers

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Middle divider

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Dividers with text

You can also render a divider with content.

{{"demo": "pages/components/dividers/DividerText.js"}}

## Vertical divider

You can also render a divider vertically using the `orientation` prop.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}

> Note the use of the `flexItem` prop to accommodate for the flex container.

### Vertical with variant middle

You can also render a vertical divider with `variant="middle"`.

{{"demo": "pages/components/dividers/VerticalDividerMiddle.js", "bg": true}}

### Vertical with text

You can also render a vertical divider with content.

{{"demo": "pages/components/dividers/VerticalDividerText.js"}}
