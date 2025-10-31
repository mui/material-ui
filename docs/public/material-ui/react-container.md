---
productId: material-ui
title: React Container component
components: Container, PigmentContainer
githubLabel: 'component: Container'
githubSource: packages/mui-material/src/Container
---

# Container

The container centers your content horizontally. It's the most basic layout element.

While containers can be nested, most layouts do not require a nested container.

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

## Fluid

A fluid container width is bounded by the `maxWidth` prop value.

```tsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </React.Fragment>
  );
}
```

```jsx
<Container maxWidth="sm">
```

## Fixed

If you prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport, you can set the `fixed` prop.
The max-width matches the min-width of the current breakpoint.

```tsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function FixedContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </React.Fragment>
  );
}
```

```jsx
<Container fixed>
```

# Container API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Container](https://mui.com/material-ui/react-container/)

## Import

```jsx
import Container from '@mui/material/Container';
// or
import { Container } from '@mui/material';
```

## Props

| Name           | Type                                                      | Default | Required | Description                                                                             |
| -------------- | --------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| classes        | `object`                                                  | -       | No       | Override or extend the styles applied to the component.                                 |
| component      | `elementType`                                             | -       | No       |                                                                                         |
| disableGutters | `bool`                                                    | `false` | No       |                                                                                         |
| fixed          | `bool`                                                    | `false` | No       |                                                                                         |
| maxWidth       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| false \| string` | `'lg'`  | No       |                                                                                         |
| sx             | `Array<func \| object \| bool> \| func \| object`         | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiContainer` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name      | Description                                                    |
| ------------ | -------------- | -------------------------------------------------------------- |
| -            | disableGutters | Styles applied to the root element if `disableGutters={true}`. |
| -            | fixed          | Styles applied to the root element if `fixed={true}`.          |
| -            | maxWidthLg     | Styles applied to the root element if `maxWidth="lg"`.         |
| -            | maxWidthMd     | Styles applied to the root element if `maxWidth="md"`.         |
| -            | maxWidthSm     | Styles applied to the root element if `maxWidth="sm"`.         |
| -            | maxWidthXl     | Styles applied to the root element if `maxWidth="xl"`.         |
| -            | maxWidthXs     | Styles applied to the root element if `maxWidth="xs"`.         |
| -            | root           | Styles applied to the root element.                            |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Container/Container.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Container/Container.js)

# PigmentContainer API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Container](https://mui.com/material-ui/react-container/)

## Import

```jsx
import PigmentContainer from '@mui/material/PigmentContainer';
// or
import { PigmentContainer } from '@mui/material';
```

## Props

| Name           | Type                                              | Default | Required | Description                                                                             |
| -------------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| classes        | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| disableGutters | `bool`                                            | `false` | No       |                                                                                         |
| fixed          | `bool`                                            | `false` | No       |                                                                                         |
| maxWidth       | `'lg' \| 'md' \| 'sm' \| 'xl' \| 'xs' \| false`   | `'lg'`  | No       |                                                                                         |
| sx             | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/PigmentContainer/PigmentContainer.tsx](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/PigmentContainer/PigmentContainer.tsx)
