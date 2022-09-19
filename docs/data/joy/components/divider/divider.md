---
product: joy-ui
title: React Divider component
githubLabel: 'component: divider'
---

# Divider

<p class="description">A divider is a thin line that groups content in lists and layouts.</p>

## Introduction

Dividers separate content into clear groups.

{{"demo": "DividerUsage.js"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Dividers with text

You can also render a divider with content.

{{"demo": "DividerText.js"}}

:::info
**Accessibility tips**: When using the `Divider` component for visual decoration, such as in a heading, explicitly specify `role="presentation"` to the divider to make sure screen readers can announce its content:

```js
<Divider component="div" role="presentation">
  {/* any elements nested inside the role="presentation" preserve their semantics. */}
  <Typography variant="h2">My Heading</Typography>
</Divider>
```

:::

### Vertical divider

You can also render a divider vertically using the `orientation` prop.

{{"demo": "VerticalDividers.js", "bg": true}}

### Vertical with text

You can also render a vertical divider with content.

{{"demo": "VerticalDividerText.js"}}

### Child position

To control the position of the content, override the CSS variable `--Divider-childPosition` via `sx` prop.

```js
<Divider sx={{ '--Divider-childPosition': '20%' }}> {/* the value can be any CSS valid unit */}
```

{{"demo": "DividerChildPosition.js"}}
