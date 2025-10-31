---
productId: material-ui
title: Backdrop React Component
components: Backdrop
githubLabel: 'scope: backdrop'
githubSource: packages/mui-material/src/Backdrop
---

# Backdrop

The Backdrop component narrows the user's focus to a particular element on the screen.

The Backdrop signals a state change within the application and can be used for creating loaders, dialogs, and more.
In its simplest form, the Backdrop component will add a dimmed layer over your application.

## Example

The demo below shows a basic Backdrop with a Circular Progress component in the foreground to indicate a loading state.
After clicking **Show Backdrop**, you can click anywhere on the page to close it.

```tsx
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Show backdrop</Button>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
```

# Backdrop API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Backdrop](https://mui.com/material-ui/react-backdrop/)

## Import

```jsx
import Backdrop from '@mui/material/Backdrop';
// or
import { Backdrop } from '@mui/material';
```

## Props

| Name                             | Type                                                           | Default | Required | Description                                                                                                                                                                                                             |
| -------------------------------- | -------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open                             | `bool`                                                         | -       | Yes      |                                                                                                                                                                                                                         |
| children                         | `node`                                                         | -       | No       |                                                                                                                                                                                                                         |
| classes                          | `object`                                                       | -       | No       | Override or extend the styles applied to the component.                                                                                                                                                                 |
| component                        | `elementType`                                                  | -       | No       |                                                                                                                                                                                                                         |
| components (deprecated)          | `{ Root?: elementType }`                                       | `{}`    | No       | ⚠️ Use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |
| componentsProps (deprecated)     | `{ root?: object }`                                            | `{}`    | No       | ⚠️ Use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| invisible                        | `bool`                                                         | `false` | No       |                                                                                                                                                                                                                         |
| slotProps                        | `{ root?: func \| object, transition?: func \| object }`       | `{}`    | No       |                                                                                                                                                                                                                         |
| slots                            | `{ root?: elementType, transition?: elementType }`             | `{}`    | No       |                                                                                                                                                                                                                         |
| sx                               | `Array<func \| object \| bool> \| func \| object`              | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                 |
| TransitionComponent (deprecated) | `elementType`                                                  | `Fade`  | No       | ⚠️ Use `slots.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.   |
| transitionDuration               | `number \| { appear?: number, enter?: number, exit?: number }` | -       | No       |                                                                                                                                                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Fade](https://mui.com/material-ui/api/fade/)).

## Inheritance

While not explicitly documented above, the props of the [Fade](https://mui.com/material-ui/api/fade/) component are also available on Backdrop.

## Theme default props

You can use `MuiBackdrop` to change the default props of this component with the theme.

## Slots

| Name                                                                                                                                            | Default | Class               | Description                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------- | ------------------------------------------ |
| root                                                                                                                                            | `'div'` | `.MuiBackdrop-root` | The component that renders the root.       |
| transition                                                                                                                                      | `Fade`  | -                   | The component that renders the transition. |
| [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |

## CSS

### Rule name

| Global class | Rule name | Description                                               |
| ------------ | --------- | --------------------------------------------------------- |
| -            | invisible | Styles applied to the root element if `invisible={true}`. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Backdrop/Backdrop.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Backdrop/Backdrop.js)
