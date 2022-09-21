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

## Automatic adjustment

When the `Divider` is a direct child of these components, it automatically adapts to the spacing and orientation of the components.

### [Card](/joy-ui/react-card/)

The `Divider` stretches from edge to edge of the `Card` by default. It also adapts to the orientation of the `Card` as well.

{{"demo": "DividerInCard.js"}}

### [ModalDialog](/joy-ui/react-modal/#dialog)

The `Divider` stretches from edge to edge of the `ModalDialog` by default. Use `inset="none"` on the divider to opt-out from the automatic adjustment.

{{"demo": "DividerInModalDialog.js"}}

## Common examples

### Fullscreen overflow

Here is a CSS trick that lets you stretch the divider outside of its parent's boundary.

Use `box-shadow` with `100vmax` unit to fill the outer space and then remove the vertical overflow by using `clip-path: inset(0px -100vmax)`.

{{"demo": "FullscreenOverflowDivider.js"}}

:::info
The `var(--Divider-lineColor)` is defined by the Divider component so you can refer to it without hard-coding the value or accessing to the theme.
:::
