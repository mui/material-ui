---
product: material-ui
title: React Stack component
components: Stack
githubLabel: 'component: Stack'
---

# Stack

<p class="description">The Stack component manages layout of immediate children along the vertical or horizontal axis with optional spacing and/or dividers between each child.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Usage

`Stack` is concerned with one-dimensional layouts, while [Grid](/material-ui/react-grid/) handles two-dimensional layouts. The default direction is `column` which stacks children vertically.

{{"demo": "BasicStack.js", "bg": true}}

To control space between children, use the `spacing` prop.
The spacing value can be any number, including decimals and any string.
The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.

## Direction

By default, `Stack` arranges items vertically in a `column`.
However, the `direction` prop can be used to position items horizontally in a `row` as well.

{{"demo": "DirectionStack.js", "bg": true}}

## Dividers

Use the `divider` prop to insert an element between each child. This works particularly well with the [Divider](/material-ui/react-divider/) component.

{{"demo": "DividerStack.js", "bg": true}}

## Responsive values

You can switch the `direction` or `spacing` values based on the active breakpoint.

{{"demo": "ResponsiveStack.js", "bg": true}}

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "InteractiveStack.js", "hideToolbar": true, "bg": true}}

## System props

As a CSS utility component, the `Stack` supports all [`system`](/system/properties/) properties. You can use them as props directly on the component.
For instance, a margin-top:

```jsx
<Stack mt={2}>
```

## Flexbox gap

To use [flexbox `gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) for the spacing implementation, set `useFlexGap` prop to true.

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
