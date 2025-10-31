---
productId: material-ui
title: React Floating Action Button (FAB) component
components: Fab
githubLabel: 'component: Fab'
materialDesign: https://m2.material.io/components/buttons-floating-action-button
githubSource: packages/mui-material/src/Fab
---

# Floating Action Button

A Floating Action Button (FAB) performs the primary, or most common, action on a screen.

A floating action button appears in front of all screen content, typically as a circular shape with an icon in its center.
FABs come in two types: regular, and extended.

Only use a FAB if it is the most suitable way to present a screen's primary action.
Only one component is recommended per screen to represent the most common action.

## Basic FAB

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function FloatingActionButtons() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      <Fab variant="extended">
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
      <Fab disabled aria-label="like">
        <FavoriteIcon />
      </Fab>
    </Box>
  );
}
```

## Size

By default, the size is `large`. Use the `size` prop for smaller floating action buttons.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FloatingActionButtonSize() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab size="small" color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab size="medium" color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
}
```

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function FloatingActionButtonExtendedSize() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended" size="small" color="primary">
        <NavigationIcon sx={{ mr: 1 }} />
        Extended
      </Fab>
      <Fab variant="extended" size="medium" color="primary">
        <NavigationIcon sx={{ mr: 1 }} />
        Extended
      </Fab>
      <Fab variant="extended" color="primary">
        <NavigationIcon sx={{ mr: 1 }} />
        Extended
      </Fab>
    </Box>
  );
}
```

## Animation

The floating action button animates onto the screen as an expanding piece of material, by default.

A floating action button that spans multiple lateral screens (such as tabbed screens) should briefly disappear,
then reappear if its action changes.

The Zoom transition can be used to achieve this. Note that since both the exiting and entering
animations are triggered at the same time, we use `enterDelay` to allow the outgoing Floating Action Button's
animation to finish before the new one enters.

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function FloatingActionButtonZoom() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary' as const,
      sx: fabStyle as SxProps,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary' as const,
      sx: fabStyle as SxProps,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit' as const,
      sx: { ...fabStyle, ...fabGreenStyle } as SxProps,
      icon: <UpIcon />,
      label: 'Expand',
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: 500,
        position: 'relative',
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
}
```

# Fab API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Floating Action Button](https://mui.com/material-ui/react-floating-action-button/)

## Import

```jsx
import Fab from '@mui/material/Fab';
// or
import { Fab } from '@mui/material';
```

## Props

| Name               | Type                                                                                                          | Default      | Required | Description                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | ------------ | -------- | --------------------------------------------------------------------------------------- |
| children           | `node`                                                                                                        | -            | No       |                                                                                         |
| classes            | `object`                                                                                                      | -            | No       | Override or extend the styles applied to the component.                                 |
| color              | `'default' \| 'error' \| 'info' \| 'inherit' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| string` | `'default'`  | No       |                                                                                         |
| component          | `elementType`                                                                                                 | -            | No       |                                                                                         |
| disabled           | `bool`                                                                                                        | `false`      | No       |                                                                                         |
| disableFocusRipple | `bool`                                                                                                        | `false`      | No       |                                                                                         |
| disableRipple      | `bool`                                                                                                        | -            | No       |                                                                                         |
| href               | `string`                                                                                                      | -            | No       |                                                                                         |
| size               | `'small' \| 'medium' \| 'large' \| string`                                                                    | `'large'`    | No       |                                                                                         |
| sx                 | `Array<func \| object \| bool> \| func \| object`                                                             | -            | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| variant            | `'circular' \| 'extended' \| string`                                                                          | `'circular'` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLButtonElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on Fab.

## Theme default props

You can use `MuiFab` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class        | Rule name    | Description                                                                           |
| ------------------- | ------------ | ------------------------------------------------------------------------------------- |
| -                   | circular     | Styles applied to the root element if `variant="circular"`.                           |
| -                   | colorInherit | Styles applied to the root element if `color="inherit"`.                              |
| `.Mui-disabled`     | -            | State class applied to the root element if `disabled={true}`.                         |
| -                   | extended     | Styles applied to the root element if `variant="extended"`.                           |
| `.Mui-focusVisible` | -            | State class applied to the ButtonBase root element if the button is keyboard focused. |
| -                   | primary      | Styles applied to the root element if `color="primary"`.                              |
| -                   | root         | Styles applied to the root element.                                                   |
| -                   | secondary    | Styles applied to the root element if `color="secondary"`.                            |
| -                   | sizeMedium   | Styles applied to the root element if `size="medium"``.                               |
| -                   | sizeSmall    | Styles applied to the root element if `size="small"``.                                |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Fab/Fab.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Fab/Fab.js)
