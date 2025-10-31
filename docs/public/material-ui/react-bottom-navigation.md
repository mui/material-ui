---
productId: material-ui
title: Bottom Navigation React component
components: BottomNavigation, BottomNavigationAction
githubLabel: 'scope: bottom navigation'
materialDesign: https://m2.material.io/components/bottom-navigation
githubSource: packages/mui-material/src/BottomNavigation
---

# Bottom Navigation

The Bottom Navigation bar allows movement between primary destinations in an app.

Bottom navigation bars display three to five destinations at the bottom of a screen. Each destination is represented by an icon and an optional text label. When a bottom navigation icon is tapped, the user is taken to the top-level navigation destination associated with that icon.

## Bottom navigation

When there are only **three** actions, display both icons and text labels at all times.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
}
```

## Bottom navigation with no label

If there are **four** or **five** actions, display inactive views as icons only.

```tsx
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}
```

## Fixed positioning

This demo keeps bottom navigation fixed to the bottom, no matter the amount of content on-screen.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

function refreshMessages(): MessageExample[] {
  const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)],
  );
}

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {messages.map(({ primary, secondary, person }, index) => (
          <ListItemButton key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItemButton>
        ))}
      </List>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

interface MessageExample {
  primary: string;
  secondary: string;
  person: string;
}

const messageExamples: readonly MessageExample[] = [
  {
    primary: 'Brunch this week?',
    secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: '/static/images/avatar/5.jpg',
  },
  {
    primary: 'Birthday Gift',
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    primary: 'Recipe to try',
    secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
    person: '/static/images/avatar/2.jpg',
  },
  {
    primary: 'Yes!',
    secondary: 'I have the tickets to the ReactConf for this year.',
    person: '/static/images/avatar/3.jpg',
  },
  {
    primary: "Doctor's Appointment",
    secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
    person: '/static/images/avatar/4.jpg',
  },
  {
    primary: 'Discussion',
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: '/static/images/avatar/5.jpg',
  },
  {
    primary: 'Summer BBQ',
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: '/static/images/avatar/1.jpg',
  },
];
```

## Third-party routing library

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server.
The `BottomNavigationAction` component provides the `component` prop to handle this use case.
Here is a [more detailed guide](/material-ui/integrations/routing/).

# BottomNavigation API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Bottom Navigation](https://mui.com/material-ui/react-bottom-navigation/)

## Import

```jsx
import BottomNavigation from '@mui/material/BottomNavigation';
// or
import { BottomNavigation } from '@mui/material';
```

## Props

| Name       | Type                                                        | Default | Required | Description                                                                             |
| ---------- | ----------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children   | `node`                                                      | -       | No       |                                                                                         |
| classes    | `object`                                                    | -       | No       | Override or extend the styles applied to the component.                                 |
| component  | `elementType`                                               | -       | No       |                                                                                         |
| onChange   | `function(event: React.SyntheticEvent, value: any) => void` | -       | No       |                                                                                         |
| showLabels | `bool`                                                      | `false` | No       |                                                                                         |
| sx         | `Array<func \| object \| bool> \| func \| object`           | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| value      | `any`                                                       | -       | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiBottomNavigation` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                         |
| ------------ | --------- | ----------------------------------- |
| -            | root      | Styles applied to the root element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/BottomNavigation/BottomNavigation.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/BottomNavigation/BottomNavigation.js)

# BottomNavigationAction API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Bottom Navigation](https://mui.com/material-ui/react-bottom-navigation/)

## Import

```jsx
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// or
import { BottomNavigationAction } from '@mui/material';
```

## Props

| Name      | Type                                                | Default | Required | Description                                                                             |
| --------- | --------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children  | `unsupportedProp`                                   | -       | No       |                                                                                         |
| classes   | `object`                                            | -       | No       | Override or extend the styles applied to the component.                                 |
| icon      | `node`                                              | -       | No       |                                                                                         |
| label     | `node`                                              | -       | No       |                                                                                         |
| showLabel | `bool`                                              | -       | No       |                                                                                         |
| slotProps | `{ label?: func \| object, root?: func \| object }` | `{}`    | No       |                                                                                         |
| slots     | `{ label?: elementType, root?: elementType }`       | `{}`    | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object`   | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| value     | `any`                                               | -       | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLButtonElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on BottomNavigationAction.

## Theme default props

You can use `MuiBottomNavigationAction` to change the default props of this component with the theme.

## Slots

| Name  | Default      | Class                              | Description                           |
| ----- | ------------ | ---------------------------------- | ------------------------------------- |
| root  | `ButtonBase` | `.MuiBottomNavigationAction-root`  | The component that renders the root.  |
| label | `span`       | `.MuiBottomNavigationAction-label` | The component that renders the label. |

## CSS

### Rule name

| Global class    | Rule name | Description                                                                      |
| --------------- | --------- | -------------------------------------------------------------------------------- |
| -               | iconOnly  | State class applied to the root element if `showLabel={false}` and not selected. |
| `.Mui-selected` | -         | State class applied to the root element if selected.                             |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/BottomNavigationAction/BottomNavigationAction.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/BottomNavigationAction/BottomNavigationAction.js)
