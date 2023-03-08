---
product: material-ui
title: React Divider component
components: Divider
githubLabel: 'component: divider'
materialDesign: https://m2.material.io/components/dividers
---

# Divider

<p class="description">A divider is a thin line that groups content in lists and layouts.</p>

Dividers separate content into clear groups.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## List dividers

The divider renders as an `<hr>` by default.
You can save rendering this DOM element by using the `divider` prop on the `ListItem` component.

{{"demo": "ListDividers.js", "bg": true}}

## HTML5 specification

In a list, you should ensure the `Divider` is rendered as an `<li>` to match the HTML5 specification.
The examples below show two ways of achieving this.

## Inset dividers

{{"demo": "InsetDividers.js", "bg": true}}

## Subheader dividers

{{"demo": "SubheaderDividers.js", "bg": true}}

## Middle divider

{{"demo": "MiddleDividers.js", "bg": true}}

## Dividers with text

You can also render a divider with content.

{{"demo": "DividerText.js"}}

:::warning
When using the `Divider` component for visual decoration, such as in a heading, explicitly specify `role="presentation"` to the divider to make sure screen readers can announce its content:

```js
<Divider component="div" role="presentation">
  {/* any elements nested inside the role="presentation" preserve their semantics. */}
  <Typography variant="h2">My Heading</Typography>
</Divider>
```

:::

## Vertical divider

You can also render a divider vertically using the `orientation` prop.

{{"demo": "VerticalDividers.js", "bg": true}}

:::info
Note the use of the `flexItem` prop to accommodate for the flex container.
:::

### Vertical with variant middle

You can also render a vertical divider with `variant="middle"`.

{{"demo": "VerticalDividerMiddle.js", "bg": true}}

### Vertical with text

You can also render a vertical divider with content.

{{"demo": "VerticalDividerText.js"}}
