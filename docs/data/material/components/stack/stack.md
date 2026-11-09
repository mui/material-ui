---
productId: material-ui
title: React Stack component
components: Stack, PigmentStack
githubLabel: 'component: Stack'
githubSource: packages/mui-material/src/Stack
---

# Stack

<p class="description">Stack is a container component for arranging elements vertically or horizontally.</p>

## Introduction

The Stack component manages the layout of its immediate children along the vertical or horizontal axis, with optional spacing and dividers between each child.

:::info
Stack is ideal for one-dimensional layouts, while Grid is preferable when you need both vertical _and_ horizontal arrangement.
:::

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basics

```jsx
import Stack from '@mui/material/Stack';
```

The Stack component acts as a generic container, wrapping around the elements to be arranged.

Use the `spacing` prop to control the space between children.
The spacing value can be any number, including decimals, or a string.
(The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.)

{{"component": "file://./demos/basic/index.ts", "bg": true}}

### Stack vs. Grid

`Stack` is concerned with one-dimensional layouts, while [Grid](/material-ui/react-grid/) handles two-dimensional layouts. The default direction is `column` which stacks children vertically.

## Direction

By default, Stack arranges items vertically in a column.
Use the `direction` prop to position items horizontally in a row:

{{"component": "file://./demos/direction/index.ts", "bg": true}}

## Dividers

Use the `divider` prop to insert an element between each child.
This works particularly well with the [Divider](/material-ui/react-divider/) component, as shown below:

{{"component": "file://./demos/divider/index.ts", "bg": true}}

## Responsive values

You can switch the `direction` or `spacing` values based on the active breakpoint.

{{"component": "file://./demos/responsive/index.ts", "bg": true}}

## Flexbox gap

Stack uses [flexbox `gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap) to space its children.
Spacing keeps working when the children wrap onto multiple lines, and the children's own margins are applied on top of it.

{{"component": "file://./demos/flexbox-gap/index.ts", "bg": true}}

## Interactive demo

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"component": "file://./demos/interactive/index.ts", "hideToolbar": true, "bg": true}}

## Customization

Use the [`sx` prop](/system/getting-started/the-sx-prop/) to quickly customize any Stack instance using a superset of CSS that has access to all the style functions and theme-aware properties exposed in the MUI System package.
Below is an example of how to apply center align items using this prop:

```jsx
<Stack sx={{ alignItems: 'center' }} />
```

## Limitations

### white-space: nowrap

The initial setting on flex items is `min-width: auto`.
This causes a positioning conflict when children use `white-space: nowrap;`.
You can reproduce the issue with:

```jsx
<Stack direction="row">
  <Typography noWrap>
```

In order for the item to stay within the container you need to set `min-width: 0`.

```jsx
<Stack direction="row" sx={{ minWidth: 0 }}>
  <Typography noWrap>
```

{{"component": "file://./demos/zero-width/index.ts", "bg": true}}

## Anatomy

The Stack component is composed of a single root `<div>` element:

```html
<div class="MuiStack-root">
  <!-- Stack contents -->
</div>
```
