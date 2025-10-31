---
productId: material-ui
title: React Stack component
components: Stack, PigmentStack
githubLabel: 'component: Stack'
githubSource: packages/mui-material/src/Stack
---

# Stack

Stack is a container component for arranging elements vertically or horizontally.

## Introduction

The Stack component manages the layout of its immediate children along the vertical or horizontal axis, with optional spacing and dividers between each child.

:::info
Stack is ideal for one-dimensional layouts, while Grid is preferable when you need both vertical _and_ horizontal arrangement.
:::

## Basics

```jsx
import Stack from '@mui/material/Stack';
```

The Stack component acts as a generic container, wrapping around the elements to be arranged.

Use the `spacing` prop to control the space between children.
The spacing value can be any number, including decimals, or a string.
(The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.)

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function BasicStack() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </Box>
  );
}
```

### Stack vs. Grid

`Stack` is concerned with one-dimensional layouts, while [Grid](/material-ui/react-grid/) handles two-dimensional layouts. The default direction is `column` which stacks children vertically.

## Direction

By default, Stack arranges items vertically in a column.
Use the `direction` prop to position items horizontally in a row:

```tsx
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function DirectionStack() {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </div>
  );
}
```

## Dividers

Use the `divider` prop to insert an element between each child.
This works particularly well with the [Divider](/material-ui/react-divider/) component, as shown below:

```tsx
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function DividerStack() {
  return (
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </div>
  );
}
```

## Responsive values

You can switch the `direction` or `spacing` values based on the active breakpoint.

```tsx
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ResponsiveStack() {
  return (
    <div>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </div>
  );
}
```

## Flexbox gap

To use [flexbox `gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) for the spacing implementation, set the `useFlexGap` prop to true.

It removes the [known limitations](#limitations) of the default implementation that uses CSS nested selector. However, CSS flexbox gap is not fully supported in some browsers.

We recommend checking the [support percentage](https://caniuse.com/?search=flex%20gap) before using it.

```tsx
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  flexGrow: 1,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function FlexboxGapStack() {
  return (
    <Box sx={{ width: 200 }}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: 'wrap' }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Long content</Item>
      </Stack>
    </Box>
  );
}
```

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

```tsx
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Stack, { StackProps } from '@mui/material/Stack';
import { HighlightedCode } from '@mui/docs/HighlightedCode';

export default function InteractiveStack() {
  const [direction, setDirection] = React.useState<StackProps['direction']>('row');
  const [justifyContent, setJustifyContent] = React.useState('center');
  const [alignItems, setAlignItems] = React.useState('center');
  const [spacing, setSpacing] = React.useState(2);

  const jsx = `
<Stack
  direction="${direction}"
  spacing={${spacing}}
  sx={{
    justifyContent: "${justifyContent}",
    alignItems: "${alignItems}",
  }}
>
`;

  return (
    <Stack sx={{ flexGrow: 1 }}>
      <Stack
        direction={direction}
        spacing={spacing}
        sx={{ justifyContent, alignItems, height: 240 }}
      >
        {[0, 1, 2].map((value) => (
          <Paper
            key={value}
            sx={(theme) => ({
              p: 2,
              pt: value + 1,
              pb: value + 1,
              color: 'text.secondary',
              typography: 'body2',
              backgroundColor: '#fff',
              ...theme.applyStyles('dark', {
                backgroundColor: '#1A2027',
              }),
            })}
          >
            {`Item ${value + 1}`}
          </Paper>
        ))}
      </Stack>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">direction</FormLabel>
              <RadioGroup
                row
                name="direction"
                aria-label="direction"
                value={direction}
                onChange={(event) => {
                  setDirection(event.target.value as StackProps['direction']);
                }}
              >
                <FormControlLabel value="row" control={<Radio />} label="row" />
                <FormControlLabel
                  value="row-reverse"
                  control={<Radio />}
                  label="row-reverse"
                />
                <FormControlLabel
                  value="column"
                  control={<Radio />}
                  label="column"
                />
                <FormControlLabel
                  value="column-reverse"
                  control={<Radio />}
                  label="column-reverse"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">alignItems</FormLabel>
              <RadioGroup
                row
                name="alignItems"
                aria-label="align items"
                value={alignItems}
                onChange={(event) => {
                  setAlignItems(event.target.value);
                }}
              >
                <FormControlLabel
                  value="flex-start"
                  control={<Radio />}
                  label="flex-start"
                />
                <FormControlLabel
                  value="center"
                  control={<Radio />}
                  label="center"
                />
                <FormControlLabel
                  value="flex-end"
                  control={<Radio />}
                  label="flex-end"
                />
                <FormControlLabel
                  value="stretch"
                  control={<Radio />}
                  label="stretch"
                />
                <FormControlLabel
                  value="baseline"
                  control={<Radio />}
                  label="baseline"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">justifyContent</FormLabel>
              <RadioGroup
                row
                name="justifyContent"
                aria-label="justifyContent"
                value={justifyContent}
                onChange={(event) => {
                  setJustifyContent(event.target.value);
                }}
              >
                <FormControlLabel
                  value="flex-start"
                  control={<Radio />}
                  label="flex-start"
                />
                <FormControlLabel
                  value="center"
                  control={<Radio />}
                  label="center"
                />
                <FormControlLabel
                  value="flex-end"
                  control={<Radio />}
                  label="flex-end"
                />
                <FormControlLabel
                  value="space-between"
                  control={<Radio />}
                  label="space-between"
                />
                <FormControlLabel
                  value="space-around"
                  control={<Radio />}
                  label="space-around"
                />
                <FormControlLabel
                  value="space-evenly"
                  control={<Radio />}
                  label="space-evenly"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">spacing</FormLabel>
              <RadioGroup
                row
                name="spacing"
                aria-label="spacing"
                value={spacing.toString()}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSpacing(Number((event.target as HTMLInputElement).value));
                }}
              >
                {[0, 0.5, 1, 2, 3, 4, 8, 12].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <HighlightedCode code={jsx} language="jsx" />
    </Stack>
  );
}
```

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

```tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  maxWidth: 400,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;

export default function ZeroWidthStack() {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
          <Avatar>W</Avatar>
          <Typography noWrap>{message}</Typography>
        </Stack>
      </Item>
      <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
          <Stack>
            <Avatar>W</Avatar>
          </Stack>
          <Stack sx={{ minWidth: 0 }}>
            <Typography noWrap>{message}</Typography>
          </Stack>
        </Stack>
      </Item>
    </Box>
  );
}
```

## Anatomy

The Stack component is composed of a single root `<div>` element:

```html
<div class="MuiStack-root">
  <!-- Stack contents -->
</div>
```

# PigmentStack API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Stack](https://mui.com/material-ui/react-stack/)

## Import

```jsx
import PigmentStack from '@mui/material/PigmentStack';
// or
import { PigmentStack } from '@mui/material';
```

## Props

| Name      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                             | Default    | Required | Description                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | -------- | --------------------------------------------------------------------------------------- |
| children  | `node`                                                                                                                                                                                                                                                                                                                                                                                                                                           | -          | No       |                                                                                         |
| direction | `'column-reverse' \| 'column' \| 'row-reverse' \| 'row' \| Array<'column-reverse' \| 'column' \| 'row-reverse' \| 'row'> \| { lg?: 'column-reverse' \| 'column' \| 'row-reverse' \| 'row', md?: 'column-reverse' \| 'column' \| 'row-reverse' \| 'row', sm?: 'column-reverse' \| 'column' \| 'row-reverse' \| 'row', xl?: 'column-reverse' \| 'column' \| 'row-reverse' \| 'row', xs?: 'column-reverse' \| 'column' \| 'row-reverse' \| 'row' }` | `'column'` | No       |                                                                                         |
| divider   | `node`                                                                                                                                                                                                                                                                                                                                                                                                                                           | -          | No       |                                                                                         |
| spacing   | `Array<number \| string> \| number \| { lg?: number \| string, md?: number \| string, sm?: number \| string, xl?: number \| string, xs?: number \| string } \| string`                                                                                                                                                                                                                                                                           | `0`        | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object`                                                                                                                                                                                                                                                                                                                                                                                                | -          | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/PigmentStack/PigmentStack.tsx](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/PigmentStack/PigmentStack.tsx)

# Stack API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Stack](https://mui.com/material-ui/react-stack/)

## Import

```jsx
import Stack from '@mui/material/Stack';
// or
import { Stack } from '@mui/material';
```

## Props

| Name       | Type                                                                                                                                | Default    | Required | Description                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | --------------------------------------------------------------------------------------- |
| children   | `node`                                                                                                                              | -          | No       |                                                                                         |
| component  | `elementType`                                                                                                                       | -          | No       |                                                                                         |
| direction  | `'column-reverse' \| 'column' \| 'row-reverse' \| 'row' \| Array<'column-reverse' \| 'column' \| 'row-reverse' \| 'row'> \| object` | `'column'` | No       |                                                                                         |
| divider    | `node`                                                                                                                              | -          | No       |                                                                                         |
| spacing    | `Array<number \| string> \| number \| object \| string`                                                                             | `0`        | No       |                                                                                         |
| sx         | `Array<func \| object \| bool> \| func \| object`                                                                                   | -          | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| useFlexGap | `bool`                                                                                                                              | `false`    | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiStack` to change the default props of this component with the theme.

> **Note**: As a CSS utility, the `Stack` component also supports all system properties. You can use them as props directly on the component.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Stack/Stack.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Stack/Stack.js)
