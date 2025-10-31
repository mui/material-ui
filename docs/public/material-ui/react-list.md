---
productId: material-ui
title: React List component
components: Collapse, Divider, List, ListItem, ListItemButton, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
githubLabel: 'scope: list'
materialDesign: https://m2.material.io/components/lists
githubSource: packages/mui-material/src/List
---

# Lists

Lists are continuous, vertical indexes of text or images.

Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.

## Introduction

Lists present information in a concise, easy-to-follow format through a continuous, vertical index of text or images.

Material UI Lists are implemented using a collection of related components:

- List: a wrapper for list items. Renders as a `<ul>` by default.
- List Item: a common list item. Renders as an `<li>` by default.
- List Item Button: an action element to be used inside a list item.
- List Item Icon: an icon to be used inside of a list item.
- List Item Avatar: an avatar to be used inside of a list item.
- List Item Text: a container inside a list item, used to display text content.
- List Divider: a separator between list items.
- List Subheader: a label for a nested list.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function BasicList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
```

The last item of the previous demo shows how you can render a link:

```jsx
<ListItemButton component="a" href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemButton>
```

You can find a [demo with React Router following this section](/material-ui/integrations/routing/#list) of the documentation.

## Basics

```jsx
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
```

## Nested List

```tsx
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
```

## Folder List

```tsx
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export default function FolderList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
  );
}
```

## Interactive

Below is an interactive demo that lets you explore the visual results of the different settings:

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

function generate(element: React.ReactElement<unknown>) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: (theme.vars || theme).palette.background.paper,
}));

export default function InteractiveList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={dense}
              onChange={(event) => setDense(event.target.checked)}
            />
          }
          label="Enable dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Enable secondary text"
        />
      </FormGroup>
      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Text only
          </Typography>
          <Demo>
            <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Icon with text
          </Typography>
          <Demo>
            <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text
          </Typography>
          <Demo>
            <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography>
          <Demo>
            <List dense={dense}>
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
```

## Selected ListItem

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItemButton>
      </List>
    </Box>
  );
}
```

## Align list items

When displaying three lines or more, the avatar is not aligned at the top.
You should set the `alignItems="flex-start"` prop to align the avatar at the top, following the Material Design guidelines:

```tsx
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function AlignItemsList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
```

## List Controls

### Checkbox

A checkbox can either be a primary action or a secondary action.

The checkbox is the primary action and the state indicator for the list item. The comment button is a secondary action and a separate target.

```tsx
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export default function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
```

The checkbox is the secondary action for the list item and a separate target.

```tsx
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

export default function CheckboxListSecondary() {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.includes(value)}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
```

### Switch

The switch is the secondary action and a separate target.

```tsx
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';

export default function SwitchListSecondary() {
  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Settings</ListSubheader>}
    >
      <ListItem>
        <ListItemIcon>
          <WifiIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
        <Switch
          edge="end"
          onChange={handleToggle('wifi')}
          checked={checked.includes('wifi')}
          inputProps={{
            'aria-labelledby': 'switch-list-label-wifi',
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <BluetoothIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
        <Switch
          edge="end"
          onChange={handleToggle('bluetooth')}
          checked={checked.includes('bluetooth')}
          inputProps={{
            'aria-labelledby': 'switch-list-label-bluetooth',
          }}
        />
      </ListItem>
    </List>
  );
}
```

## Sticky subheader

Upon scrolling, subheaders remain pinned to the top of the screen until pushed off screen by the next subheader.
This feature relies on CSS sticky positioning.

```tsx
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function PinnedSubheaderList() {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {[0, 1, 2, 3, 4].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}
```

## Inset List Item

The `inset` prop enables a list item that does not have a leading icon or avatar to align correctly with items that do.

```tsx
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';

export default function InsetList() {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Chelsea Otakan" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText inset primary="Eric Hoffman" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
```

## Gutterless list

When rendering a list within a component that defines its own gutters, `ListItem` gutters can be disabled with `disableGutters`.

```tsx
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

export default function GutterlessList() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[1, 2, 3].map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
    </List>
  );
}
```

## Virtualized List

In the following example, we demonstrate how to use [react-window](https://github.com/bvaughn/react-window) with the `List` component.
It renders 200 rows and can easily handle more.
Virtualization helps with performance issues.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { List, RowComponentProps } from 'react-window';

function renderRow(props: RowComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <List
        rowHeight={46}
        rowCount={200}
        style={{
          height: 400,
          width: 360,
        }}
        rowProps={{}}
        overscanCount={5}
        rowComponent={renderRow}
      />
    </Box>
  );
}
```

The use of [react-window](https://github.com/bvaughn/react-window) when possible is encouraged.
If this library doesn't cover your use case, you should consider using alternatives like [react-virtuoso](https://github.com/petyosi/react-virtuoso).

## Customization

Here are some examples of customizing the component.
You can learn more about this in the
[overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';

const data = [
  { icon: <People />, label: 'Authentication' },
  { icon: <Dns />, label: 'Database' },
  { icon: <PermMedia />, label: 'Storage' },
  { icon: <Public />, label: 'Hosting' },
];

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function CustomizedList() {
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="#customized-list">
              <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Firebash"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon>
                  <Home color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Project Overview"
                  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                />
              </ListItemButton>
              <Tooltip title="Project Settings">
                <IconButton
                  size="large"
                  sx={{
                    '& svg': {
                      color: 'rgba(255,255,255,0.8)',
                      transition: '0.2s',
                      transform: 'translateX(0) rotate(0)',
                    },
                    '&:hover, &:focus': {
                      bgcolor: 'unset',
                      '& svg:first-of-type': {
                        transform: 'translateX(-4px) rotate(-20deg)',
                      },
                      '& svg:last-of-type': {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      height: '80%',
                      display: 'block',
                      left: 0,
                      width: '1px',
                      bgcolor: 'divider',
                    },
                  }}
                >
                  <Settings />
                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
            <Box
              sx={[
                open
                  ? {
                      bgcolor: 'rgba(71, 98, 130, 0.2)',
                    }
                  : {
                      bgcolor: null,
                    },
                open
                  ? {
                      pb: 2,
                    }
                  : {
                      pb: 0,
                    },
              ]}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={[
                  {
                    px: 3,
                    pt: 2.5,
                  },
                  open
                    ? {
                        pb: 0,
                      }
                    : {
                        pb: 2.5,
                      },
                  open
                    ? {
                        '&:hover, &:focus': {
                          '& svg': {
                            opacity: 1,
                          },
                        },
                      }
                    : {
                        '&:hover, &:focus': {
                          '& svg': {
                            opacity: 0,
                          },
                        },
                      },
                ]}
              >
                <ListItemText
                  primary="Build"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px',
                  }}
                  secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: '16px',
                    color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={[
                    {
                      mr: -1,
                      opacity: 0,
                      transition: '0.2s',
                    },
                    open
                      ? {
                          transform: 'rotate(-180deg)',
                        }
                      : {
                          transform: 'rotate(0)',
                        },
                  ]}
                />
              </ListItemButton>
              {open &&
                data.map((item) => (
                  <ListItemButton
                    key={item.label}
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
```

# Collapse API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Card](https://mui.com/material-ui/react-card/)
- [Lists](https://mui.com/material-ui/react-list/)
- [Transitions](https://mui.com/material-ui/transitions/)

## Import

```jsx
import Collapse from '@mui/material/Collapse';
// or
import { Collapse } from '@mui/material';
```

## Props

| Name           | Type                                                                     | Default             | Required | Description                                                                             |
| -------------- | ------------------------------------------------------------------------ | ------------------- | -------- | --------------------------------------------------------------------------------------- |
| addEndListener | `func`                                                                   | -                   | No       |                                                                                         |
| children       | `node`                                                                   | -                   | No       |                                                                                         |
| classes        | `object`                                                                 | -                   | No       | Override or extend the styles applied to the component.                                 |
| collapsedSize  | `number \| string`                                                       | `'0px'`             | No       |                                                                                         |
| component      | `element type`                                                           | -                   | No       |                                                                                         |
| easing         | `{ enter?: string, exit?: string } \| string`                            | -                   | No       |                                                                                         |
| in             | `bool`                                                                   | -                   | No       |                                                                                         |
| orientation    | `'horizontal' \| 'vertical'`                                             | `'vertical'`        | No       |                                                                                         |
| sx             | `Array<func \| object \| bool> \| func \| object`                        | -                   | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| timeout        | `'auto' \| number \| { appear?: number, enter?: number, exit?: number }` | `duration.standard` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## Inheritance

While not explicitly documented above, the props of the [Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props) component are also available on Collapse. A subset of components support [react-transition-group](https://reactcommunity.org/react-transition-group/transition/) out of the box.

## Theme default props

You can use `MuiCollapse` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name    | Description                                                                                  |
| ------------ | ------------ | -------------------------------------------------------------------------------------------- |
| -            | entered      | Styles applied to the root element when the transition has entered.                          |
| -            | hidden       | Styles applied to the root element when the transition has exited and `collapsedSize` = 0px. |
| -            | horizontal   | State class applied to the root element if `orientation="horizontal"`.                       |
| -            | root         | Styles applied to the root element.                                                          |
| -            | wrapper      | Styles applied to the outer wrapper element.                                                 |
| -            | wrapperInner | Styles applied to the inner wrapper element.                                                 |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Collapse/Collapse.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Collapse/Collapse.js)

# Divider API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Divider](https://mui.com/material-ui/react-divider/)
- [Lists](https://mui.com/material-ui/react-list/)

## Import

```jsx
import Divider from '@mui/material/Divider';
// or
import { Divider } from '@mui/material';
```

## Props

| Name               | Type                                              | Default        | Required | Description                                                                                                                                                             |
| ------------------ | ------------------------------------------------- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| absolute           | `bool`                                            | `false`        | No       |                                                                                                                                                                         |
| children           | `node`                                            | -              | No       |                                                                                                                                                                         |
| classes            | `object`                                          | -              | No       | Override or extend the styles applied to the component.                                                                                                                 |
| component          | `elementType`                                     | -              | No       |                                                                                                                                                                         |
| flexItem           | `bool`                                            | `false`        | No       |                                                                                                                                                                         |
| light (deprecated) | `bool`                                            | `false`        | No       | ⚠️ Use (or any opacity or color) instead. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| orientation        | `'horizontal' \| 'vertical'`                      | `'horizontal'` | No       |                                                                                                                                                                         |
| sx                 | `Array<func \| object \| bool> \| func \| object` | -              | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                 |
| textAlign          | `'center' \| 'left' \| 'right'`                   | `'center'`     | No       |                                                                                                                                                                         |
| variant            | `'fullWidth' \| 'inset' \| 'middle' \| string`    | `'fullWidth'`  | No       |                                                                                                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLHRElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiDivider` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name            | Description                                                                           |
| ------------ | -------------------- | ------------------------------------------------------------------------------------- |
| -            | absolute             | Styles applied to the root element if `absolute={true}`.                              |
| -            | flexItem             | Styles applied to the root element if `flexItem={true}`.                              |
| -            | fullWidth            | Styles applied to the root element if `variant="fullWidth"`.                          |
| -            | inset                | Styles applied to the root element if `variant="inset"`.                              |
| -            | light                | Styles applied to the root element if `light={true}`.                                 |
| -            | middle               | Styles applied to the root element if `variant="middle"`.                             |
| -            | root                 | Styles applied to the root element.                                                   |
| -            | textAlignLeft        | Styles applied to the root element if `textAlign="left" orientation="horizontal"`.    |
| -            | textAlignRight       | Styles applied to the root element if `textAlign="right" orientation="horizontal"`.   |
| -            | vertical             | Styles applied to the root element if `orientation="vertical"`.                       |
| -            | withChildren         | Styles applied to the root element if divider have text.                              |
| -            | withChildrenVertical | Styles applied to the root element if divider have text and `orientation="vertical"`. |
| -            | wrapper              | Styles applied to the span children element if `orientation="horizontal"`.            |
| -            | wrapperVertical      | Styles applied to the span children element if `orientation="vertical"`.              |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Divider/Divider.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Divider/Divider.js)

# List API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Lists](https://mui.com/material-ui/react-list/)
- [Transfer List](https://mui.com/material-ui/react-transfer-list/)

## Import

```jsx
import List from '@mui/material/List';
// or
import { List } from '@mui/material';
```

## Props

| Name           | Type                                              | Default | Required | Description                                                                             |
| -------------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children       | `node`                                            | -       | No       |                                                                                         |
| classes        | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| component      | `elementType`                                     | -       | No       |                                                                                         |
| dense          | `bool`                                            | `false` | No       |                                                                                         |
| disablePadding | `bool`                                            | `false` | No       |                                                                                         |
| subheader      | `node`                                            | -       | No       |                                                                                         |
| sx             | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLUListElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiList` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                                                        |
| ------------ | --------- | ------------------------------------------------------------------ |
| -            | dense     | Styles applied to the root element if dense.                       |
| -            | padding   | Styles applied to the root element unless `disablePadding={true}`. |
| -            | root      | Styles applied to the root element.                                |
| -            | subheader | Styles applied to the root element if a `subheader` is provided.   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/List/List.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/List/List.js)

# ListItem API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Lists](https://mui.com/material-ui/react-list/)
- [Transfer List](https://mui.com/material-ui/react-transfer-list/)

## Import

```jsx
import ListItem from '@mui/material/ListItem';
// or
import { ListItem } from '@mui/material';
```

## Props

| Name                            | Type                                              | Default    | Required | Description                                                                                                                                                                                                                             |
| ------------------------------- | ------------------------------------------------- | ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alignItems                      | `'center' \| 'flex-start'`                        | `'center'` | No       |                                                                                                                                                                                                                                         |
| children                        | `node`                                            | -          | No       |                                                                                                                                                                                                                                         |
| classes                         | `object`                                          | -          | No       | Override or extend the styles applied to the component.                                                                                                                                                                                 |
| component                       | `elementType`                                     | -          | No       |                                                                                                                                                                                                                                         |
| components (deprecated)         | `{ Root?: elementType }`                          | `{}`       | No       | ⚠️ Use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.                     |
| componentsProps (deprecated)    | `{ root?: object }`                               | `{}`       | No       | ⚠️ Use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.                 |
| ContainerComponent (deprecated) | `element type`                                    | `'li'`     | No       | ⚠️ Use the `component` or `slots.root` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| ContainerProps (deprecated)     | `object`                                          | `{}`       | No       | ⚠️ Use the `slotProps.root` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.            |
| dense                           | `bool`                                            | `false`    | No       |                                                                                                                                                                                                                                         |
| disableGutters                  | `bool`                                            | `false`    | No       |                                                                                                                                                                                                                                         |
| disablePadding                  | `bool`                                            | `false`    | No       |                                                                                                                                                                                                                                         |
| divider                         | `bool`                                            | `false`    | No       |                                                                                                                                                                                                                                         |
| secondaryAction                 | `node`                                            | -          | No       |                                                                                                                                                                                                                                         |
| slotProps                       | `{ root?: object }`                               | `{}`       | No       |                                                                                                                                                                                                                                         |
| slots                           | `{ root?: elementType }`                          | `{}`       | No       |                                                                                                                                                                                                                                         |
| sx                              | `Array<func \| object \| bool> \| func \| object` | -          | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                                 |

> **Note**: The `ref` is forwarded to the root element (HTMLLIElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiListItem` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name           | Description                                                                                 |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------- |
| -            | alignItemsFlexStart | Styles applied to the component element if `alignItems="flex-start"`.                       |
| -            | container           | Styles applied to the container element if `children` includes `ListItemSecondaryAction`.   |
| -            | dense               | Styles applied to the component element if dense.                                           |
| -            | divider             | Styles applied to the inner `component` element if `divider={true}`.                        |
| -            | gutters             | Styles applied to the inner `component` element unless `disableGutters={true}`.             |
| -            | padding             | Styles applied to the root element unless `disablePadding={true}`.                          |
| -            | root                | Styles applied to the (normally root) `component` element. May be wrapped by a `container`. |
| -            | secondaryAction     | Styles applied to the component element if `children` includes `ListItemSecondaryAction`.   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/ListItem/ListItem.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/ListItem/ListItem.js)

# ListItemAvatar API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Lists](https://mui.com/material-ui/react-list/)

## Import

```jsx
import ListItemAvatar from '@mui/material/ListItemAvatar';
// or
import { ListItemAvatar } from '@mui/material';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiListItemAvatar` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name           | Description                                                                                   |
| ------------ | ------------------- | --------------------------------------------------------------------------------------------- |
| -            | alignItemsFlexStart | Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. |
| -            | root                | Styles applied to the root element.                                                           |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/ListItemAvatar/ListItemAvatar.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/ListItemAvatar/ListItemAvatar.js)

# ListItemButton API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Lists](https://mui.com/material-ui/react-list/)

## Import

```jsx
import ListItemButton from '@mui/material/ListItemButton';
// or
import { ListItemButton } from '@mui/material';
```

## Props

| Name                  | Type                                              | Default    | Required | Description                                                                             |
| --------------------- | ------------------------------------------------- | ---------- | -------- | --------------------------------------------------------------------------------------- |
| alignItems            | `'center' \| 'flex-start'`                        | `'center'` | No       |                                                                                         |
| autoFocus             | `bool`                                            | `false`    | No       |                                                                                         |
| children              | `node`                                            | -          | No       |                                                                                         |
| classes               | `object`                                          | -          | No       | Override or extend the styles applied to the component.                                 |
| component             | `elementType`                                     | -          | No       |                                                                                         |
| dense                 | `bool`                                            | `false`    | No       |                                                                                         |
| disabled              | `bool`                                            | `false`    | No       |                                                                                         |
| disableGutters        | `bool`                                            | `false`    | No       |                                                                                         |
| divider               | `bool`                                            | `false`    | No       |                                                                                         |
| focusVisibleClassName | `string`                                          | -          | No       |                                                                                         |
| selected              | `bool`                                            | `false`    | No       |                                                                                         |
| sx                    | `Array<func \| object \| bool> \| func \| object` | -          | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on ListItemButton.

## Theme default props

You can use `MuiListItemButton` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class        | Rule name           | Description                                                                     |
| ------------------- | ------------------- | ------------------------------------------------------------------------------- |
| -                   | alignItemsFlexStart | Styles applied to the component element if `alignItems="flex-start"`.           |
| -                   | dense               | Styles applied to the component element if dense.                               |
| `.Mui-disabled`     | -                   | State class applied to the inner `component` element if `disabled={true}`.      |
| -                   | divider             | Styles applied to the inner `component` element if `divider={true}`.            |
| `.Mui-focusVisible` | -                   | State class applied to the `component`'s `focusVisibleClassName` prop.          |
| -                   | gutters             | Styles applied to the inner `component` element unless `disableGutters={true}`. |
| -                   | root                | Styles applied to the root element.                                             |
| `.Mui-selected`     | -                   | State class applied to the root element if `selected={true}`.                   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/ListItemButton/ListItemButton.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/ListItemButton/ListItemButton.js)

# ListItemIcon API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Lists](https://mui.com/material-ui/react-list/)

## Import

```jsx
import ListItemIcon from '@mui/material/ListItemIcon';
// or
import { ListItemIcon } from '@mui/material';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiListItemIcon` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name           | Description                                                                                   |
| ------------ | ------------------- | --------------------------------------------------------------------------------------------- |
| -            | alignItemsFlexStart | Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. |
| -            | root                | Styles applied to the root element.                                                           |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/ListItemIcon/ListItemIcon.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/ListItemIcon/ListItemIcon.js)

# ListItemSecondaryAction API

> ⚠️ **Warning**: This component is deprecated. Consider using an alternative component.

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Lists](https://mui.com/material-ui/react-list/)

## Import

```jsx
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
// or
import { ListItemSecondaryAction } from '@mui/material';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiListItemSecondaryAction` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name      | Description                                                                                |
| ------------ | -------------- | ------------------------------------------------------------------------------------------ |
| -            | disableGutters | Styles applied to the root element when the parent `ListItem` has `disableGutters={true}`. |
| -            | root           | Styles applied to the root element.                                                        |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/ListItemSecondaryAction/ListItemSecondaryAction.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/ListItemSecondaryAction/ListItemSecondaryAction.js)

# ListItemText API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Lists](https://mui.com/material-ui/react-list/)

## Import

```jsx
import ListItemText from '@mui/material/ListItemText';
// or
import { ListItemText } from '@mui/material';
```

## Props

| Name                                  | Type                                                                              | Default | Required | Description                                                                                                                                                                                                              |
| ------------------------------------- | --------------------------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| children                              | `node`                                                                            | -       | No       |                                                                                                                                                                                                                          |
| classes                               | `object`                                                                          | -       | No       | Override or extend the styles applied to the component.                                                                                                                                                                  |
| disableTypography                     | `bool`                                                                            | `false` | No       |                                                                                                                                                                                                                          |
| inset                                 | `bool`                                                                            | `false` | No       |                                                                                                                                                                                                                          |
| primary                               | `node`                                                                            | -       | No       |                                                                                                                                                                                                                          |
| primaryTypographyProps (deprecated)   | `object`                                                                          | -       | No       | ⚠️ Use `slotProps.primary` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.   |
| secondary                             | `node`                                                                            | -       | No       |                                                                                                                                                                                                                          |
| secondaryTypographyProps (deprecated) | `object`                                                                          | -       | No       | ⚠️ Use `slotProps.secondary` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| slotProps                             | `{ primary?: func \| object, root?: func \| object, secondary?: func \| object }` | `{}`    | No       |                                                                                                                                                                                                                          |
| slots                                 | `{ primary?: elementType, root?: elementType, secondary?: elementType }`          | `{}`    | No       |                                                                                                                                                                                                                          |
| sx                                    | `Array<func \| object \| bool> \| func \| object`                                 | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                  |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiListItemText` to change the default props of this component with the theme.

## Slots

| Name      | Default      | Class                        | Description                                    |
| --------- | ------------ | ---------------------------- | ---------------------------------------------- |
| root      | `'div'`      | `.MuiListItemText-root`      | The component that renders the root slot.      |
| primary   | `Typography` | `.MuiListItemText-primary`   | The component that renders the primary slot.   |
| secondary | `Typography` | `.MuiListItemText-secondary` | The component that renders the secondary slot. |

## CSS

### Rule name

| Global class | Rule name | Description                                                                  |
| ------------ | --------- | ---------------------------------------------------------------------------- |
| -            | dense     | Styles applied to the Typography component if dense.                         |
| -            | inset     | Styles applied to the root element if `inset={true}`.                        |
| -            | multiline | Styles applied to the Typography component if primary and secondary are set. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/ListItemText/ListItemText.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/ListItemText/ListItemText.js)

# ListSubheader API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Lists](https://mui.com/material-ui/react-list/)

## Import

```jsx
import ListSubheader from '@mui/material/ListSubheader';
// or
import { ListSubheader } from '@mui/material';
```

## Props

| Name           | Type                                              | Default     | Required | Description                                                                             |
| -------------- | ------------------------------------------------- | ----------- | -------- | --------------------------------------------------------------------------------------- |
| children       | `node`                                            | -           | No       |                                                                                         |
| classes        | `object`                                          | -           | No       | Override or extend the styles applied to the component.                                 |
| color          | `'default' \| 'inherit' \| 'primary'`             | `'default'` | No       |                                                                                         |
| component      | `elementType`                                     | -           | No       |                                                                                         |
| disableGutters | `bool`                                            | `false`     | No       |                                                                                         |
| disableSticky  | `bool`                                            | `false`     | No       |                                                                                         |
| inset          | `bool`                                            | `false`     | No       |                                                                                         |
| sx             | `Array<func \| object \| bool> \| func \| object` | -           | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLLIElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiListSubheader` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name    | Description                                                                     |
| ------------ | ------------ | ------------------------------------------------------------------------------- |
| -            | colorInherit | Styles applied to the root element if `color="inherit"`.                        |
| -            | colorPrimary | Styles applied to the root element if `color="primary"`.                        |
| -            | gutters      | Styles applied to the inner `component` element unless `disableGutters={true}`. |
| -            | inset        | Styles applied to the root element if `inset={true}`.                           |
| -            | root         | Styles applied to the root element.                                             |
| -            | sticky       | Styles applied to the root element unless `disableSticky={true}`.               |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/ListSubheader/ListSubheader.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/ListSubheader/ListSubheader.js)
