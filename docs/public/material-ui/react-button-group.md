---
productId: material-ui
title: React Button Group component
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
githubSource: packages/mui-material/src/ButtonGroup
---

# Button Group

The ButtonGroup component can be used to group related buttons.

## Basic button group

The buttons can be grouped by wrapping them with the `ButtonGroup` component.
They need to be immediate children.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtonGroup() {
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  );
}
```

## Button variants

All the standard button variants are supported.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export default function VariantButtonGroup() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="text" aria-label="Basic button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Box>
  );
}
```

## Sizes and colors

The `size` and `color` props can be used to control the appearance of the button group.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
];

export default function GroupSizesColors() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="small" aria-label="Small button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup color="secondary" aria-label="Medium-sized button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup size="large" aria-label="Large button group">
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
```

## Vertical group

The button group can be displayed vertically using the `orientation` prop.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
];

export default function GroupOrientation() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup orientation="vertical" aria-label="Vertical button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="contained"
      >
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
```

## Split button

`ButtonGroup` can also be used to create a split button. The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
```

## Disabled elevation

You can remove the elevation with the `disableElevation` prop.

```tsx
import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export default function DisableElevation() {
  return (
    <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled button group"
    >
      <Button>One</Button>
      <Button>Two</Button>
    </ButtonGroup>
  );
}
```

## Loading

Use the `loading` prop from `Button` to set buttons in a loading state and disable interactions.

```tsx
import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

export default function LoadingButtonGroup() {
  return (
    <ButtonGroup variant="outlined" aria-label="Loading button group">
      <Button>Submit</Button>
      <Button>Fetch data</Button>
      <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
        Save
      </Button>
    </ButtonGroup>
  );
}
```

# Button API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Button Group](https://mui.com/material-ui/react-button-group/)
- [Button](https://mui.com/material-ui/react-button/)

## Import

```jsx
import Button from '@mui/material/Button';
// or
import { Button } from '@mui/material';
```

## Props

| Name               | Type                                                                                             | Default                                          | Required | Description                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------ | -------- | --------------------------------------------------------------------------------------- |
| children           | `node`                                                                                           | -                                                | No       |                                                                                         |
| classes            | `object`                                                                                         | -                                                | No       | Override or extend the styles applied to the component.                                 |
| color              | `'inherit' \| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'info' \| 'warning' \| string` | `'primary'`                                      | No       |                                                                                         |
| component          | `elementType`                                                                                    | -                                                | No       |                                                                                         |
| disabled           | `bool`                                                                                           | `false`                                          | No       |                                                                                         |
| disableElevation   | `bool`                                                                                           | `false`                                          | No       |                                                                                         |
| disableFocusRipple | `bool`                                                                                           | `false`                                          | No       |                                                                                         |
| disableRipple      | `bool`                                                                                           | `false`                                          | No       |                                                                                         |
| endIcon            | `node`                                                                                           | -                                                | No       |                                                                                         |
| fullWidth          | `bool`                                                                                           | `false`                                          | No       |                                                                                         |
| href               | `string`                                                                                         | -                                                | No       |                                                                                         |
| loading            | `bool`                                                                                           | `null`                                           | No       |                                                                                         |
| loadingIndicator   | `node`                                                                                           | `<CircularProgress color="inherit" size={16} />` | No       |                                                                                         |
| loadingPosition    | `'center' \| 'end' \| 'start'`                                                                   | `'center'`                                       | No       |                                                                                         |
| size               | `'small' \| 'medium' \| 'large' \| string`                                                       | `'medium'`                                       | No       |                                                                                         |
| startIcon          | `node`                                                                                           | -                                                | No       |                                                                                         |
| sx                 | `Array<func \| object \| bool> \| func \| object`                                                | -                                                | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| variant            | `'contained' \| 'outlined' \| 'text' \| string`                                                  | `'text'`                                         | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLButtonElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on Button.

## Theme default props

You can use `MuiButton` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class        | Rule name              | Description                                                                           |
| ------------------- | ---------------------- | ------------------------------------------------------------------------------------- |
| -                   | colorError             | Styles applied to the root element if `color="error"`.                                |
| -                   | colorInfo              | Styles applied to the root element if `color="info"`.                                 |
| -                   | colorInherit           | Styles applied to the root element if `color="inherit"`.                              |
| -                   | colorPrimary           | Styles applied to the root element if `color="primary"`.                              |
| -                   | colorSecondary         | Styles applied to the root element if `color="secondary"`.                            |
| -                   | colorSuccess           | Styles applied to the root element if `color="success"`.                              |
| -                   | colorWarning           | Styles applied to the root element if `color="warning"`.                              |
| -                   | contained              | Styles applied to the root element if `variant="contained"`.                          |
| -                   | containedError         | Styles applied to the root element if `variant="contained"` and `color="error"`.      |
| -                   | containedInfo          | Styles applied to the root element if `variant="contained"` and `color="info"`.       |
| -                   | containedInherit       | Styles applied to the root element if `variant="contained"` and `color="inherit"`.    |
| -                   | containedPrimary       | Styles applied to the root element if `variant="contained"` and `color="primary"`.    |
| -                   | containedSecondary     | Styles applied to the root element if `variant="contained"` and `color="secondary"`.  |
| -                   | containedSizeLarge     | Styles applied to the root element if `size="large"` and `variant="contained"`.       |
| -                   | containedSizeMedium    | Styles applied to the root element if `size="medium"` and `variant="contained"`.      |
| -                   | containedSizeSmall     | Styles applied to the root element if `size="small"` and `variant="contained"`.       |
| -                   | containedSuccess       | Styles applied to the root element if `variant="contained"` and `color="success"`.    |
| -                   | containedWarning       | Styles applied to the root element if `variant="contained"` and `color="warning"`.    |
| `.Mui-disabled`     | -                      | State class applied to the root element if `disabled={true}`.                         |
| -                   | disableElevation       | Styles applied to the root element if `disableElevation={true}`.                      |
| -                   | endIcon                | Styles applied to the endIcon element if supplied.                                    |
| `.Mui-focusVisible` | -                      | State class applied to the ButtonBase root element if the button is keyboard focused. |
| -                   | fullWidth              | Styles applied to the root element if `fullWidth={true}`.                             |
| -                   | icon                   | Styles applied to the icon element if supplied                                        |
| -                   | iconSizeLarge          | Styles applied to the icon element if supplied and `size="large"`.                    |
| -                   | iconSizeMedium         | Styles applied to the icon element if supplied and `size="medium"`.                   |
| -                   | iconSizeSmall          | Styles applied to the icon element if supplied and `size="small"`.                    |
| -                   | loading                | Styles applied to the root element if `loading={true}`.                               |
| -                   | loadingIconPlaceholder | Styles applied to the loadingIconPlaceholder element.                                 |
| -                   | loadingIndicator       | Styles applied to the loadingIndicator element.                                       |
| -                   | loadingPositionCenter  | Styles applied to the root element if `loadingPosition="center"`.                     |
| -                   | loadingPositionEnd     | Styles applied to the root element if `loadingPosition="end"`.                        |
| -                   | loadingPositionStart   | Styles applied to the root element if `loadingPosition="start"`.                      |
| -                   | loadingWrapper         | Styles applied to the loadingWrapper element.                                         |
| -                   | outlined               | Styles applied to the root element if `variant="outlined"`.                           |
| -                   | outlinedError          | Styles applied to the root element if `variant="outlined"` and `color="error"`.       |
| -                   | outlinedInfo           | Styles applied to the root element if `variant="outlined"` and `color="info"`.        |
| -                   | outlinedInherit        | Styles applied to the root element if `variant="outlined"` and `color="inherit"`.     |
| -                   | outlinedPrimary        | Styles applied to the root element if `variant="outlined"` and `color="primary"`.     |
| -                   | outlinedSecondary      | Styles applied to the root element if `variant="outlined"` and `color="secondary"`.   |
| -                   | outlinedSizeLarge      | Styles applied to the root element if `size="large"` and `variant="outlined"`.        |
| -                   | outlinedSizeMedium     | Styles applied to the root element if `size="medium"` and `variant="outlined"`.       |
| -                   | outlinedSizeSmall      | Styles applied to the root element if `size="small"` and `variant="outlined"`.        |
| -                   | outlinedSuccess        | Styles applied to the root element if `variant="outlined"` and `color="success"`.     |
| -                   | outlinedWarning        | Styles applied to the root element if `variant="outlined"` and `color="warning"`.     |
| -                   | root                   | Styles applied to the root element.                                                   |
| -                   | sizeLarge              | Styles applied to the root element if `size="large"`.                                 |
| -                   | sizeMedium             | Styles applied to the root element if `size="medium"`.                                |
| -                   | sizeSmall              | Styles applied to the root element if `size="small"`.                                 |
| -                   | startIcon              | Styles applied to the startIcon element if supplied.                                  |
| -                   | text                   | Styles applied to the root element if `variant="text"`.                               |
| -                   | textError              | Styles applied to the root element if `variant="text"` and `color="error"`.           |
| -                   | textInfo               | Styles applied to the root element if `variant="text"` and `color="info"`.            |
| -                   | textInherit            | Styles applied to the root element if `variant="text"` and `color="inherit"`.         |
| -                   | textPrimary            | Styles applied to the root element if `variant="text"` and `color="primary"`.         |
| -                   | textSecondary          | Styles applied to the root element if `variant="text"` and `color="secondary"`.       |
| -                   | textSizeLarge          | Styles applied to the root element if `size="large"` and `variant="text"`.            |
| -                   | textSizeMedium         | Styles applied to the root element if `size="medium"` and `variant="text"`.           |
| -                   | textSizeSmall          | Styles applied to the root element if `size="small"` and `variant="text"`.            |
| -                   | textSuccess            | Styles applied to the root element if `variant="text"` and `color="success"`.         |
| -                   | textWarning            | Styles applied to the root element if `variant="text"` and `color="warning"`.         |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Button/Button.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Button/Button.js)

# ButtonGroup API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Button Group](https://mui.com/material-ui/react-button-group/)

## Import

```jsx
import ButtonGroup from '@mui/material/ButtonGroup';
// or
import { ButtonGroup } from '@mui/material';
```

## Props

| Name               | Type                                                                                             | Default        | Required | Description                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------ | -------------- | -------- | --------------------------------------------------------------------------------------- |
| children           | `node`                                                                                           | -              | No       |                                                                                         |
| classes            | `object`                                                                                         | -              | No       | Override or extend the styles applied to the component.                                 |
| color              | `'inherit' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| string` | `'primary'`    | No       |                                                                                         |
| component          | `elementType`                                                                                    | -              | No       |                                                                                         |
| disabled           | `bool`                                                                                           | `false`        | No       |                                                                                         |
| disableElevation   | `bool`                                                                                           | `false`        | No       |                                                                                         |
| disableFocusRipple | `bool`                                                                                           | `false`        | No       |                                                                                         |
| disableRipple      | `bool`                                                                                           | `false`        | No       |                                                                                         |
| fullWidth          | `bool`                                                                                           | `false`        | No       |                                                                                         |
| orientation        | `'horizontal' \| 'vertical'`                                                                     | `'horizontal'` | No       |                                                                                         |
| size               | `'small' \| 'medium' \| 'large' \| string`                                                       | `'medium'`     | No       |                                                                                         |
| sx                 | `Array<func \| object \| bool> \| func \| object`                                                | -              | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| variant            | `'contained' \| 'outlined' \| 'text' \| string`                                                  | `'outlined'`   | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiButtonGroup` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class    | Rule name                  | Description                                                                             |
| --------------- | -------------------------- | --------------------------------------------------------------------------------------- |
| -               | colorPrimary               | Styles applied to the root element if `color="primary"`                                 |
| -               | colorSecondary             | Styles applied to the root element if `color="secondary"`                               |
| -               | contained                  | Styles applied to the root element if `variant="contained"`.                            |
| `.Mui-disabled` | -                          | State class applied to the child elements if `disabled={true}`.                         |
| -               | disableElevation           | Styles applied to the root element if `disableElevation={true}`.                        |
| -               | firstButton                | Styles applied to the first button in the button group.                                 |
| -               | fullWidth                  | Styles applied to the root element if `fullWidth={true}`.                               |
| -               | grouped                    | Styles applied to the children.                                                         |
| -               | groupedContained           | Styles applied to the children if `variant="contained"`.                                |
| -               | groupedContainedHorizontal | Styles applied to the children if `variant="contained"` and `orientation="horizontal"`. |
| -               | groupedContainedPrimary    | Styles applied to the children if `variant="contained"` and `color="primary"`.          |
| -               | groupedContainedSecondary  | Styles applied to the children if `variant="contained"` and `color="secondary"`.        |
| -               | groupedContainedVertical   | Styles applied to the children if `variant="contained"` and `orientation="vertical"`.   |
| -               | groupedHorizontal          | Styles applied to the children if `orientation="horizontal"`.                           |
| -               | groupedOutlined            | Styles applied to the children if `variant="outlined"`.                                 |
| -               | groupedOutlinedHorizontal  | Styles applied to the children if `variant="outlined"` and `orientation="horizontal"`.  |
| -               | groupedOutlinedPrimary     | Styles applied to the children if `variant="outlined"` and `color="primary"`.           |
| -               | groupedOutlinedSecondary   | Styles applied to the children if `variant="outlined"` and `color="secondary"`.         |
| -               | groupedOutlinedVertical    | Styles applied to the children if `variant="outlined"` and `orientation="vertical"`.    |
| -               | groupedText                | Styles applied to the children if `variant="text"`.                                     |
| -               | groupedTextHorizontal      | Styles applied to the children if `variant="text"` and `orientation="horizontal"`.      |
| -               | groupedTextPrimary         | Styles applied to the children if `variant="text"` and `color="primary"`.               |
| -               | groupedTextSecondary       | Styles applied to the children if `variant="text"` and `color="secondary"`.             |
| -               | groupedTextVertical        | Styles applied to the children if `variant="text"` and `orientation="vertical"`.        |
| -               | groupedVertical            | Styles applied to the children if `orientation="vertical"`.                             |
| -               | horizontal                 | Styles applied to the root element if `orientation="horizontal"`.                       |
| -               | lastButton                 | Styles applied to the last button in the button group.                                  |
| -               | middleButton               | Styles applied to buttons in the middle of the button group.                            |
| -               | outlined                   | Styles applied to the root element if `variant="outlined"`.                             |
| -               | root                       | Styles applied to the root element.                                                     |
| -               | text                       | Styles applied to the root element if `variant="text"`.                                 |
| -               | vertical                   | Styles applied to the root element if `orientation="vertical"`.                         |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/ButtonGroup/ButtonGroup.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/ButtonGroup/ButtonGroup.js)
