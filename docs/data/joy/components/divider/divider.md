---
productId: joy-ui
title: React Divider component
components: Divider
githubLabel: 'component: divider'
---

# Divider

<p class="description">A divider is a thin line that groups content in lists and layouts.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

Dividers separate content into clear groups.

{{"demo": "DividerUsage.js", "hideToolbar": "true", "bg": "gradient"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Divider from '@mui/joy/Divider';

export default function MyApp() {
  return <Divider />;
}
```

### Rendered with content

Use the `Divider` to wrap elements that will be added to it.

{{"demo": "DividerText.js"}}

:::warning
When using the `Divider` component for visual decoration, such as in a heading, explicitly specify `role="presentation"` on it to make sure screen readers can announce its content:

```js
<Divider component="div" role="presentation">
  {/* any elements nested inside the role="presentation" preserve their semantics. */}
</Divider>
```

:::

### Vertical divider

Use the `orientation` prop to render a vertical divider.

{{"demo": "VerticalDividers.js"}}

#### Vertical with text

You can also render a vertical divider with content.

{{"demo": "VerticalDividerText.js"}}

### Child position

To control the position of the content, override the CSS variable `--Divider-childPosition` via `sx` prop.

```js
<Divider sx={{ '--Divider-childPosition': '20%' }}> {/* the value can be any CSS valid unit */}
```

{{"demo": "DividerChildPosition.js"}}

## Automatic adjustment

When the `Divider` is a direct child of either a [Card](/joy-ui/react-card/) or [ModalDialog](/joy-ui/react-modal/#modal-dialog), it will automatically adapt to their spacing and orientation.

### Card

Note how the `Divider`stretches by default from edge to edge of the `Card`.
It will also adapt to the `Card` orientation.

{{"demo": "DividerInCard.js"}}

### ModalDialog

The same edge to edge stretching happens with the `ModalDialog` as well.
To opt-out from the automatic adjustment, use `inset="none"` on the divider.

{{"demo": "DividerInModalDialog.js"}}

## Common examples

### Fullscreen overflow

Here is a CSS trick that lets you stretch the divider outside of its parent's boundary.

Use `box-shadow` with `100vmax` unit to fill the outer space and then remove the vertical overflow by using `clip-path: inset(0px -100vmax)`.

{{"demo": "FullscreenOverflowDivider.js"}}

:::info
The `var(--Divider-lineColor)` is defined by the Divider component so you can refer to it without hard-coding the value or accessing to the theme.
:::
