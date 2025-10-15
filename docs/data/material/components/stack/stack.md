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

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Basics

```jsx
import Stack from '@mui/material/Stack';
```

The Stack component acts as a generic container, wrapping around the elements to be arranged.

Use the `spacing` prop to control the space between children.
The spacing value can be any number, including decimals, or a string.
(The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.)

{{"demo": "BasicStack.js", "bg": true}}

### Stack vs. Grid

`Stack` is concerned with one-dimensional layouts, while [Grid](/material-ui/react-grid/) handles two-dimensional layouts. The default direction is `column` which stacks children vertically.

## Direction

By default, Stack arranges items vertically in a column.
Use the `direction` prop to position items horizontally in a row:

{{"demo": "DirectionStack.js", "bg": true}}

## Dividers

Use the `divider` prop to insert an element between each child.
This works particularly well with the [Divider](/material-ui/react-divider/) component, as shown below:

{{"demo": "DividerStack.js", "bg": true}}

## Responsive values

You can switch the `direction` or `spacing` values based on the active breakpoint.

{{"demo": "ResponsiveStack.js", "bg": true}}

## Flexbox gap

To use [flexbox `gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) for the spacing implementation, set the `useFlexGap` prop to true.

It removes the [known limitations](#limitations) of the default implementation that uses CSS nested selector. However, CSS flexbox gap is not fully supported in some browsers.

We recommend checking the [support percentage](https://caniuse.com/?search=flex%20gap) before using it.

{{"demo": "FlexboxGapStack.js", "bg": true}}

To set the prop to all stack instances, create a theme with default props:

```js
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack>…</Stack> {/* uses flexbox gap by default */}
    </ThemeProvider>
  );
}
```

## Interactive demo

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "InteractiveStack.js", "hideToolbar": true, "bg": true}}

## System props

:::info
System props are deprecated and will be removed in the next major release. Please use the `sx` prop instead.

```diff
- <Stack mt={2} />
+ <Stack sx={{ mt: 2 }} />
```

:::

## Limitations

### Margin on the children

Customizing the margin on the children is not supported by default.

For instance, the top-margin on the `Button` component below will be ignored.

```jsx
<Stack>
  <Button sx={{ marginTop: '30px' }}>...</Button>
</Stack>
```

:::success
To overcome this limitation, set [`useFlexGap`](#flexbox-gap) prop to true to switch to CSS flexbox gap implementation.

You can learn more about this limitation by visiting this [RFC](https://github.com/mui/material-ui/issues/33754).
:::

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

{{"demo": "ZeroWidthStack.js", "bg": true}}

## Anatomy

The Stack component is composed of a single root `<div>` element:

```html
<div class="MuiStack-root">
  <!-- Stack contents -->
</div>
```
