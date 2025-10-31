---
productId: material-ui
title: No SSR React component
components: NoSsr
---

# No SSR

The No-SSR component defers the rendering of children components from the server to the client.

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

## Introduction

No-SSR is a utility component that prevents its children from being rendered on the server, deferring their rendering to the client instead.
This can be useful in a variety of situations, including:

- To create an escape hatch for broken dependencies that don't support server-side rendering (SSR)
- To improve the time to first paint by only rendering above the fold
- To reduce the rendering time on the server
- To turn on service degradation when the server load is too heavy
- To improve the Time to Interactive (TTI) by only rendering what's important (using the `defer` prop)

The demo below illustrates how this component works:

```tsx
import * as React from 'react';
import NoSsr from '@mui/material/NoSsr';
import Box from '@mui/material/Box';

export default function SimpleNoSsr() {
  return (
    <div>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        Server and Client
      </Box>
      <NoSsr>
        <Box
          sx={{ p: 2, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}
        >
          Client only
        </Box>
      </NoSsr>
    </div>
  );
}
```

## Basics

### Import

```jsx
import NoSsr from '@mui/material/NoSsr';
```

## Customization

### Delay client-side rendering

You can also use No-SSR to delay the rendering of specific components on the client-side—for example, to let the rest of the application load before an especially complex or data-heavy component.

The following demo shows how to use the `defer` prop to prioritize rendering the rest of the app outside of what is nested within No-SSR:

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';

function LargeTree(): any {
  return Array.from(new Array(5000)).map((_, index) => <span key={index}>.</span>);
}

export default function FrameDeferring() {
  const [state, setState] = React.useState({
    open: false,
    defer: false,
  });

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          setState({
            open: !state.open,
            defer: false,
          })
        }
      >
        {'Render NoSsr defer="false"'}
      </button>
      <br />
      <button
        type="button"
        onClick={() =>
          setState({
            open: !state.open,
            defer: true,
          })
        }
      >
        {'Render NoSsr defer="true"'}
      </button>
      <br />
      <br />
      <Box sx={{ width: 300, display: 'flex', flexWrap: 'wrap' }}>
        {state.open ? (
          <React.Fragment>
            <div>Outside NoSsr</div>
            <NoSsr defer={state.defer}>
              .....Inside NoSsr
              <LargeTree />
            </NoSsr>
          </React.Fragment>
        ) : null}
      </Box>
    </div>
  );
}
```

:::warning
When using No-SSR in this way, React applies [two commits](https://react.dev/learn/render-and-commit) instead of one.
:::

# NoSsr API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [No SSR](https://mui.com/material-ui/react-no-ssr/)

## Import

```jsx
import NoSsr from '@mui/material/NoSsr';
// or
import { NoSsr } from '@mui/material';
```

## Props

| Name     | Type   | Default | Required | Description |
| -------- | ------ | ------- | -------- | ----------- |
| children | `node` | -       | No       |             |
| defer    | `bool` | `false` | No       |             |
| fallback | `node` | `null`  | No       |             |

> **Note**: The `ref` is forwarded to the root element.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/NoSsr/NoSsr.tsx](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/NoSsr/NoSsr.tsx)
