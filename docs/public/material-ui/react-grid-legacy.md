---
productId: material-ui
title: React GridLegacy component
components: GridLegacy
githubLabel: 'component: Grid'
materialDesign: https://m2.material.io/design/layout/understanding-layout.html
githubSource: packages/mui-material/src/GridLegacy
---

# GridLegacy

The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.

The [grid](https://m2.material.io/design/layout/responsive-layout-grid.html) creates visual consistency between layouts while allowing flexibility across a wide variety of designs.
Material Design's responsive UI is based on a 12-column grid layout.

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

:::warning
The `GridLegacy` component shouldn't be confused with a data grid; it is closer to a layout grid. For a data grid head to [the `DataGrid` component](/x/react-data-grid/).
:::

:::warning
The `GridLegacy` component has been deprecated.
Please use [Grid](/material-ui/react-grid/) instead.
See the [Grid upgrade guide](/material-ui/migration/upgrade-to-grid-v2/) for more details.
:::

## How it works

The grid system is implemented with the `GridLegacy` component:

- It uses [CSS's Flexible Box module](https://www.w3.org/TR/css-flexbox-1/) for high flexibility.
- There are two types of layout: _containers_ and _items_.
- Item widths are set in percentages, so they're always fluid and sized relative to their parent element.
- Items have padding to create the spacing between individual items.
- There are five grid breakpoints: xs, sm, md, lg, and xl.
- Integer values can be given to each breakpoint, indicating how many of the 12 available columns are occupied by the component when the viewport width satisfies the [breakpoint constraints](/material-ui/customization/breakpoints/#default-breakpoints).

If you are **new to or unfamiliar with flexbox**, we encourage you to read this [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) guide.

## Fluid grids

Fluid grids use columns that scale and resize content. A fluid grid's layout can use breakpoints to determine if the layout needs to change dramatically.

### Basic grid

Column widths are integer values between 1 and 12; they apply at any breakpoint and indicate how many columns are occupied by the component.

A value passed to any given breakpoint also applies to all wider breakpoints (if they have no values explicitly defined).
For example, `xs={12}` sizes a component to occupy the full width of its parent container, regardless of the viewport size.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/GridLegacy';

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

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
```

### Grid with multiple breakpoints

Components may have multiple widths defined, causing the layout to change at the defined breakpoint. Width values given to larger breakpoints override those given to smaller breakpoints.

For example, `xs={12} sm={6}` sizes a component to occupy half of the viewport width (6 columns) when viewport width is [600 or more pixels](/material-ui/customization/breakpoints/#default-breakpoints). For smaller viewports, the component fills all 12 available columns.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/GridLegacy';

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

export default function FullWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={6} md={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
```

## Spacing

To control space between children, use the `spacing` prop.
The spacing value can be any positive number, including decimals and any string.
The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.

```tsx
import * as React from 'react';
import Grid from '@mui/material/GridLegacy';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import { HighlightedCode } from '@mui/docs/HighlightedCode';

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={spacing} sx={{ justifyContent: 'center' }}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper
                sx={(theme) => ({
                  height: 140,
                  width: 100,
                  backgroundColor: '#fff',
                  ...theme.applyStyles('dark', {
                    backgroundColor: '#1A2027',
                  }),
                })}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container>
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">spacing</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="spacing"
                  value={spacing.toString()}
                  onChange={handleChange}
                  row
                >
                  {[0, 0.5, 1, 2, 3, 4, 8, 12].map((value) => (
                    <FormControlLabel
                      key={value}
                      value={value.toString()}
                      control={<Radio />}
                      label={value.toString()}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        <HighlightedCode code={jsx} language="jsx" />
      </Grid>
    </Grid>
  );
}
```

### Row & column spacing

The `rowSpacing` and `columnSpacing` props allow for specifying the row and column gaps independently.
It's similar to the `row-gap` and `column-gap` properties of [CSS Grid](/system/grid/#row-gap-amp-column-gap).

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/GridLegacy';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

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

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>1</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>2</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
```

## Responsive values

You can switch the props' value based on the active breakpoint.
For instance, we can implement the ["recommended"](https://m2.material.io/design/layout/responsive-layout-grid.html) responsive layout grid of Material Design.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/GridLegacy';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
```

Responsive values is supported by:

- `columns`
- `columnSpacing`
- `direction`
- `rowSpacing`
- `spacing`
- all the [other props](#system-props) of MUI System

:::warning
When using a responsive `columns` prop, each grid item needs its corresponding breakpoint.
For instance, this is not working. The grid item misses the value for `md`:

```jsx
<Grid container columns={{ xs: 4, md: 12 }}>
  <Grid item xs={2} />
</Grid>
```

:::

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

```tsx
import * as React from 'react';
import Grid, { GridLegacyDirection } from '@mui/material/GridLegacy';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import { HighlightedCode } from '@mui/docs/HighlightedCode';

type GridItemsAlignment =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'stretch'
  | 'baseline';

type GridJustification =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export default function InteractiveGrid() {
  const [direction, setDirection] = React.useState<GridLegacyDirection>('row');
  const [justifyContent, setJustifyContent] =
    React.useState<GridJustification>('center');
  const [alignItems, setAlignItems] = React.useState<GridItemsAlignment>('center');

  const jsx = `
<Grid
  container
  direction="${direction}"
  sx={{
    justifyContent: "${justifyContent}",
    alignItems: "${alignItems}",
  }}
>
`;

  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          direction={direction}
          sx={{ alignItems, justifyContent, height: 300, pb: 2 }}
        >
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper
                sx={(theme) => ({
                  p: 2,
                  backgroundColor: '#fff',
                  height: '100%',
                  color: 'text.secondary',
                  pt: `${(value + 1) * 10}px`,
                  pb: `${(value + 1) * 10}px`,
                  ...theme.applyStyles('dark', {
                    backgroundColor: '#1A2027',
                  }),
                })}
              >
                {`Cell ${value + 1}`}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">direction</FormLabel>
                <RadioGroup
                  row
                  name="direction"
                  aria-label="direction"
                  value={direction}
                  onChange={(event) => {
                    setDirection(
                      (event.target as HTMLInputElement)
                        .value as GridLegacyDirection,
                    );
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
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">justifyContent</FormLabel>
                <RadioGroup
                  row
                  name="justifyContent"
                  aria-label="justifyContent"
                  value={justifyContent}
                  onChange={(event) => {
                    setJustifyContent(
                      (event.target as HTMLInputElement).value as GridJustification,
                    );
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
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">alignItems</FormLabel>
                <RadioGroup
                  row
                  name="alignItems"
                  aria-label="align items"
                  value={alignItems}
                  onChange={(event) => {
                    setAlignItems(
                      (event.target as HTMLInputElement).value as GridItemsAlignment,
                    );
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
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <HighlightedCode code={jsx} language="jsx" />
      </Grid>
    </Grid>
  );
}
```

## Auto-layout

The Auto-layout makes the _items_ equitably share the available space.
That also means you can set the width of one _item_ and the others will automatically resize around it.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/GridLegacy';

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

export default function AutoGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
```

### Variable width content

Set one of the size breakpoint props to `"auto"` instead of `true` / a `number` to size
a column based on the natural width of its content.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/GridLegacy';

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

export default function VariableWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs="auto">
          <Item>variable width content</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=6</Item>
        </Grid>
        <Grid item xs>
          <Item>xs</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
```

## Complex Grid

The following demo doesn't follow the Material Design guidelines, but illustrates how the grid can be used to build complex layouts.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/GridLegacy';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <Paper
      sx={(theme) => ({
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: '#fff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      })}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="/static/images/grid/complex.jpg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
```

## Nested Grid

The `container` and `item` props are two independent booleans; they can be combined to allow a Grid component to be both a flex container and child.

:::info
A flex **container** is the box generated by an element with a computed display of `flex` or `inline-flex`. In-flow children of a flex container are called flex **items** and are laid out using the flex layout model.
:::

https://www.w3.org/TR/css-flexbox-1/#box-model

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/GridLegacy';

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

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Item</Item>
      </Grid>
    </React.Fragment>
  );
}

export default function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </Box>
  );
}
```

⚠️ Defining an explicit width to a Grid element that is flex container, flex item, and has spacing at the same time leads to unexpected behavior, avoid doing it:

```jsx
<Grid spacing={1} container item xs={12}>
```

If you need to do such, remove one of the props.

## Columns

You can change the default number of columns (12) with the `columns` prop.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/GridLegacy';

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

export default function ColumnsGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
```

## Limitations

### Negative margin

The spacing between items is implemented with a negative margin. This might lead to unexpected behaviors. For instance, to apply a background color, you need to apply `display: flex;` to the parent.

### white-space: nowrap

The initial setting on flex items is `min-width: auto`.
This causes a positioning conflict when children use `white-space: nowrap;`.
You can reproduce the issue with:

```jsx
<Grid item xs>
  <Typography noWrap>
```

In order for the item to stay within the container you need to set `min-width: 0`.
In practice, you can set the `zeroMinWidth` prop:

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/GridLegacy';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: (theme.vars ?? theme).palette.text.primary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function AutoGridNoWrap() {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <StyledPaper sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>
      <StyledPaper sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>
      <StyledPaper sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
}
```

### direction: column | column-reverse

The `xs`, `sm`, `md`, `lg`, and `xl` props are **not supported** within `direction="column"` and `direction="column-reverse"` containers.

They define the number of grids the component will use for a given breakpoint. They are intended to control **width** using `flex-basis` in `row` containers but they will impact height in `column` containers.
If used, these props may have undesirable effects on the height of the `GridLegacy` item elements.

## CSS Grid Layout

The `GridLegacy` component is using CSS flexbox internally.
But as seen below, you can easily use [MUI System](/system/grid/) and CSS Grid to layout your pages.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

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

export default function CSSGrid() {
  return (
    <Box sx={{ width: 1 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
        <Box sx={{ gridColumn: 'span 8' }}>
          <Item>xs=8</Item>
        </Box>
        <Box sx={{ gridColumn: 'span 4' }}>
          <Item>xs=4</Item>
        </Box>
        <Box sx={{ gridColumn: 'span 4' }}>
          <Item>xs=4</Item>
        </Box>
        <Box sx={{ gridColumn: 'span 8' }}>
          <Item>xs=8</Item>
        </Box>
      </Box>
    </Box>
  );
}
```

## System props

:::info
System props are deprecated and will be removed in the next major release. Please use the `sx` prop instead.

```diff
- <Grid item p={2} />
+ <Grid item sx={{ p: 2 }} />
```

:::

# GridLegacy API

> ⚠️ **Warning**: This component is deprecated. Consider using an alternative component.

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [GridLegacy](https://mui.com/material-ui/react-grid-legacy/)

## Import

```jsx
import GridLegacy from '@mui/material/GridLegacy';
// or
import { GridLegacy } from '@mui/material';
```

## Props

| Name          | Type                                                                                                                                | Default  | Required | Description                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | --------------------------------------------------------------------------------------- |
| children      | `node`                                                                                                                              | -        | No       |                                                                                         |
| classes       | `object`                                                                                                                            | -        | No       | Override or extend the styles applied to the component.                                 |
| columns       | `Array<number> \| number \| object`                                                                                                 | `12`     | No       |                                                                                         |
| columnSpacing | `Array<number \| string> \| number \| object \| string`                                                                             | -        | No       |                                                                                         |
| component     | `elementType`                                                                                                                       | -        | No       |                                                                                         |
| container     | `bool`                                                                                                                              | `false`  | No       |                                                                                         |
| direction     | `'column-reverse' \| 'column' \| 'row-reverse' \| 'row' \| Array<'column-reverse' \| 'column' \| 'row-reverse' \| 'row'> \| object` | `'row'`  | No       |                                                                                         |
| item          | `bool`                                                                                                                              | `false`  | No       |                                                                                         |
| lg            | `'auto' \| number \| bool`                                                                                                          | `false`  | No       |                                                                                         |
| md            | `'auto' \| number \| bool`                                                                                                          | `false`  | No       |                                                                                         |
| rowSpacing    | `Array<number \| string> \| number \| object \| string`                                                                             | -        | No       |                                                                                         |
| sm            | `'auto' \| number \| bool`                                                                                                          | `false`  | No       |                                                                                         |
| spacing       | `Array<number \| string> \| number \| object \| string`                                                                             | `0`      | No       |                                                                                         |
| sx            | `Array<func \| object \| bool> \| func \| object`                                                                                   | -        | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| wrap          | `'nowrap' \| 'wrap-reverse' \| 'wrap'`                                                                                              | `'wrap'` | No       |                                                                                         |
| xl            | `'auto' \| number \| bool`                                                                                                          | `false`  | No       |                                                                                         |
| xs            | `'auto' \| number \| bool`                                                                                                          | `false`  | No       |                                                                                         |
| zeroMinWidth  | `bool`                                                                                                                              | `false`  | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiGridLegacy` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name                   | Description                                                         |
| ------------ | --------------------------- | ------------------------------------------------------------------- |
| -            | container                   | Styles applied to the root element if `container={true}`.           |
| -            | direction-xs-column         | Styles applied to the root element if `direction="column"`.         |
| -            | direction-xs-column-reverse | Styles applied to the root element if `direction="column-reverse"`. |
| -            | direction-xs-row-reverse    | Styles applied to the root element if `direction="row-reverse"`.    |
| -            | grid-xs-1                   |                                                                     |
| -            | grid-xs-10                  |                                                                     |
| -            | grid-xs-11                  |                                                                     |
| -            | grid-xs-12                  |                                                                     |
| -            | grid-xs-2                   |                                                                     |
| -            | grid-xs-3                   |                                                                     |
| -            | grid-xs-4                   |                                                                     |
| -            | grid-xs-5                   |                                                                     |
| -            | grid-xs-6                   |                                                                     |
| -            | grid-xs-7                   |                                                                     |
| -            | grid-xs-8                   |                                                                     |
| -            | grid-xs-9                   |                                                                     |
| -            | grid-xs-auto                |                                                                     |
| -            | grid-xs-true                |                                                                     |
| -            | item                        | Styles applied to the root element if `item={true}`.                |
| -            | root                        | Styles applied to the root element.                                 |
| -            | spacing-xs-1                |                                                                     |
| -            | spacing-xs-10               |                                                                     |
| -            | spacing-xs-2                |                                                                     |
| -            | spacing-xs-3                |                                                                     |
| -            | spacing-xs-4                |                                                                     |
| -            | spacing-xs-5                |                                                                     |
| -            | spacing-xs-6                |                                                                     |
| -            | spacing-xs-7                |                                                                     |
| -            | spacing-xs-8                |                                                                     |
| -            | spacing-xs-9                |                                                                     |
| -            | wrap-xs-nowrap              | Styles applied to the root element if `wrap="nowrap"`.              |
| -            | wrap-xs-wrap-reverse        | Styles applied to the root element if `wrap="reverse"`.             |
| -            | zeroMinWidth                | Styles applied to the root element if `zeroMinWidth={true}`.        |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/GridLegacy/GridLegacy.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/GridLegacy/GridLegacy.js)
