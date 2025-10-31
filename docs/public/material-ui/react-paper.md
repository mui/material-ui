---
productId: material-ui
title: React Paper component
components: Paper
githubLabel: 'scope: paper'
materialDesign: https://m2.material.io/design/environment/elevation.html
githubSource: packages/mui-material/src/Paper
---

# Paper

The Paper component is a container for displaying content on an elevated surface.

## Introduction

In Material Design, surface components and shadow styles are heavily influenced by their real-world physical counterparts.

Material UI implements this concept with the Paper component, a container-like surface that features the [`elevation`](#elevation) prop for pulling box-shadow values from the theme.

:::success
The Paper component is ideally suited for designs that follow [Material Design's elevation system](https://m2.material.io/design/environment/elevation.html#elevation-in-material-design), which is meant to replicate how light casts shadows in the physical world.

If you just need a generic container, you may prefer to use the [Box](/material-ui/react-box/) or [Container](/material-ui/react-container/) components.
:::

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={0} />
      <Paper />
      <Paper elevation={3} />
    </Box>
  );
}
```

## Component

```jsx
import Paper from '@mui/material/Paper';
```

## Customization

### Elevation

Use the `elevation` prop to establish hierarchy through the use of shadows.
The Paper component's default elevation level is `1`.
The prop accepts values from `0` to `24`.
The higher the number, the further away the Paper appears to be from its background.

In dark mode, increasing the elevation also makes the background color lighter.
This is done by applying a semi-transparent gradient with the `background-image` CSS property.

:::warning
The aforementioned dark mode behavior can lead to confusion when overriding the Paper component, because changing the `background-color` property won't affect the lighter shading.
To override it, you must either use a new background value, or customize the values for both `background-color` and `background-image`.
:::

```tsx
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function Elevation() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {[lightTheme, darkTheme].map((theme, index) => (
          <Grid key={index} size={6}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  display: 'grid',
                  gridTemplateColumns: { md: '1fr 1fr' },
                  gap: 2,
                }}
              >
                {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
                  <Item key={elevation} elevation={elevation}>
                    {`elevation=${elevation}`}
                  </Item>
                ))}
              </Box>
            </ThemeProvider>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
```

### Variants

Set the `variant` prop to `"outlined"` for a flat, outlined Paper with no shadows:

```tsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

export default function Variants() {
  return (
    <Stack direction="row" spacing={2}>
      <DemoPaper variant="elevation">default variant</DemoPaper>
      <DemoPaper variant="outlined">outlined variant</DemoPaper>
    </Stack>
  );
}
```

### Corners

The Paper component features rounded corners by default.
Add the `square` prop for square corners:

```tsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

export default function SquareCorners() {
  return (
    <Stack direction="row" spacing={2}>
      <DemoPaper square={false}>rounded corners</DemoPaper>
      <DemoPaper square>square corners</DemoPaper>
    </Stack>
  );
}
```

## Anatomy

The Paper component is composed of a single root `<div>` that wraps around its contents:

```html
<div class="MuiPaper-root">
  <!-- Paper contents -->
</div>
```

# Paper API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Card](https://mui.com/material-ui/react-card/)
- [Paper](https://mui.com/material-ui/react-paper/)

## Import

```jsx
import Paper from '@mui/material/Paper';
// or
import { Paper } from '@mui/material';
```

## Props

| Name      | Type                                              | Default       | Required | Description                                                                             |
| --------- | ------------------------------------------------- | ------------- | -------- | --------------------------------------------------------------------------------------- |
| children  | `node`                                            | -             | No       |                                                                                         |
| classes   | `object`                                          | -             | No       | Override or extend the styles applied to the component.                                 |
| component | `elementType`                                     | -             | No       |                                                                                         |
| elevation | `integer`                                         | `1`           | No       |                                                                                         |
| square    | `bool`                                            | `false`       | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object` | -             | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| variant   | `'elevation' \| 'outlined' \| string`             | `'elevation'` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiPaper` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name   | Description                                                  |
| ------------ | ----------- | ------------------------------------------------------------ |
| -            | elevation   | Styles applied to the root element if `variant="elevation"`. |
| -            | elevation0  | Styles applied to the root element if `elevation={0}`.       |
| -            | elevation1  | Styles applied to the root element if `elevation={1}`.       |
| -            | elevation10 | Styles applied to the root element if `elevation={10}`.      |
| -            | elevation11 | Styles applied to the root element if `elevation={11}`.      |
| -            | elevation12 | Styles applied to the root element if `elevation={12}`.      |
| -            | elevation13 | Styles applied to the root element if `elevation={13}`.      |
| -            | elevation14 | Styles applied to the root element if `elevation={14}`.      |
| -            | elevation15 | Styles applied to the root element if `elevation={15}`.      |
| -            | elevation16 | Styles applied to the root element if `elevation={16}`.      |
| -            | elevation17 | Styles applied to the root element if `elevation={17}`.      |
| -            | elevation18 | Styles applied to the root element if `elevation={18}`.      |
| -            | elevation19 | Styles applied to the root element if `elevation={19}`.      |
| -            | elevation2  | Styles applied to the root element if `elevation={2}`.       |
| -            | elevation20 | Styles applied to the root element if `elevation={20}`.      |
| -            | elevation21 | Styles applied to the root element if `elevation={21}`.      |
| -            | elevation22 | Styles applied to the root element if `elevation={22}`.      |
| -            | elevation23 | Styles applied to the root element if `elevation={23}`.      |
| -            | elevation24 | Styles applied to the root element if `elevation={24}`.      |
| -            | elevation3  | Styles applied to the root element if `elevation={3}`.       |
| -            | elevation4  | Styles applied to the root element if `elevation={4}`.       |
| -            | elevation5  | Styles applied to the root element if `elevation={5}`.       |
| -            | elevation6  | Styles applied to the root element if `elevation={6}`.       |
| -            | elevation7  | Styles applied to the root element if `elevation={7}`.       |
| -            | elevation8  | Styles applied to the root element if `elevation={8}`.       |
| -            | elevation9  | Styles applied to the root element if `elevation={9}`.       |
| -            | outlined    | Styles applied to the root element if `variant="outlined"`.  |
| -            | root        | Styles applied to the root element.                          |
| -            | rounded     | Styles applied to the root element unless `square={true}`.   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Paper/Paper.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Paper/Paper.js)
