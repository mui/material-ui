---
productId: material-ui
title: React Divider component
components: Divider
githubLabel: 'component: divider'
materialDesign: https://m2.material.io/components/dividers
---

# Divider

<p class="description">A divider is a thin line that separates content in containers such as lists, cards, and others.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Introduction

The Divider component, by default, renders as a `<hr>`.

{{"demo": "IntroDivider.js", "bg": true}}

## Basics

```jsx
import Divider from '@mui/material/Divider';
```

### Variants

The Divider component supports three variants: `fullWidth` (default), `inset`, and `middle`.

{{"demo": "DividerVariants.js", "bg": true}}

### Orientation

Use the `orientation` prop to change the Divider from displaying horizontally to vertically.

{{"demo": "VerticalDividers.js", "bg": true}}

:::success
Use the handy `flexItem` prop in case the Divider is being used inside of a flex container.
:::

### With children

Use the `textAlign` prop to align elements that are wrapped by the Divider.

{{"demo": "DividerText.js"}}

## Common examples

### Use with a List

When using the Divider to separate List Item, use the `component` prop to render it as `<li>`.
That ensures that the list element is a valid HTML element

{{"demo": "ListDividers.js", "bg": true}}

:::success
Use the handy `light` prop to make the Divider slightly lighter.
:::

### Icon grouping

The demo below shows how to combine the props `variant="middle"` and `orientation="vertical"`.

{{"demo": "VerticalDividerMiddle.js", "bg": true}}

## Accessibility

Due to its implicit role of `separator`, the Divider, which is a `<hr>` element, will be announced by screen readers as a "Horziontal Splitter" (or vertical, if you're using the `orientation` prop).

If you're using it as a purely stylistic element, we recommend setting `aria-hidden="true"` which will make screen readers bypass it.

```js
<Divider aria-hidden="true" />
```

And, in case you're using the Divider to wrap other elements, such as text or chips, we recommend changing its rendered element to a plain `<div>` and setting `role="presentation"`.
That will also ensure it's not announced by screen readers as well as preserve the semantics of the elements inside it.

```js
<Divider component="div" role="presentation">
  <Typograph>Text element</Typography>
</Divider>
```

## Anatomy

The Divider component is composed of a root `<hr>`.

```html
<hr class="MuiDivider-root">
  <!-- Divider children goes here -->
</hr>
```

## Experimental APIs

### Material 3 version

The default Material UI Divider component follows the [Material Design 2](https://m2.material.io/) specs.
To get the Material Design 3 ([Material You](https://m3.material.io/)) version, use the new experimental `@mui/material-next` package:

```js
import Divider from '@mui/material-next/Divider';
```

{{"demo": "DividerMaterialYouPlayground.js", "hideToolbar": true, "bg": "playground"}}
