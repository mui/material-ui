---
productId: material-ui
title: React Menu component
components: Menu, MenuItem, MenuList, ClickAwayListener, Popover, Popper
githubLabel: 'scope: menu'
materialDesign: https://m2.material.io/components/menus
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
githubSource: packages/mui-material/src/Menu
---

# Menu

Menus display a list of choices on temporary surfaces.

A menu displays a list of choices on a temporary surface. It appears when the user interacts with a button, or other control.

## Introduction

Menus are implemented using a collection of related components:

- Menu: The container/surface of the menu.
- Menu Item: An option for users to select from the menu.
- Menu List (optional): Alternative composable container for Menu Items—see [Composition with Menu List](#composition-with-menu-list) for details.

## Basic menu

A basic menu opens over the anchor element by default (this option can be [changed](#menu-positioning) via props). When close to a screen edge, a basic menu vertically realigns to make sure that all menu items are completely visible.

You should configure the component so that selecting an option immediately confirms it and closes the menu, as shown in the demo below.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
```

## Icon menu

In desktop viewport, padding is increased to give more space to the menu.

```tsx
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

export default function IconMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ⌘V
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
```

## Dense menu

For the menu that has long list and long text, you can use the `dense` prop to reduce the padding and text size.

```tsx
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';

export default function DenseMenu() {
  return (
    <Paper sx={{ width: 320 }}>
      <MenuList dense>
        <MenuItem>
          <ListItemText inset>Single</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>1.15</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>Double</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          Custom: 1.2
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>Add space before paragraph</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Add space after paragraph</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>Custom spacing...</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
```

## Selected menu

If used for item selection, when opened, simple menus places the initial focus on the selected menu item.
The currently selected menu item is set using the `selected` prop (from [ListItem](/material-ui/api/list-item/)).
To use a selected menu item without impacting the initial focus, set the `variant` prop to "menu".

```tsx
import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

export default function SimpleListMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="When device is locked"
            secondary={options[selectedIndex]}
          />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
```

## Positioned menu

Because the `Menu` component uses the `Popover` component to position itself, you can use the same [positioning props](/material-ui/react-popover/#anchor-playground) to position it.
For instance, you can display the menu on top of the anchor:

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
```

## Composition with Menu List

The Menu component uses the Popover component internally.
But you might want to use a different positioning strategy, or prefer not to block scrolling, for example.

The Menu List component lets you compose your own menu for these kinds of use cases—its primary purpose is to handle focus.
See the demo below for an example of composition that uses Menu List and replaces the Menu's default Popover with a Popper component instead:

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export default function MenuListComposition() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <Paper>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Dashboard
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
```

## Account menu

`Menu` content can be mixed with other components like `Avatar`.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
```

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles('dark', {
          color: 'inherit',
        }),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'demo-customized-button',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
```

The `MenuItem` is a wrapper around `ListItem` with some additional styles.
You can use the same list composition features with the `MenuItem` component:

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/?path=/docs/menu-introduction--docs).

## Max height menu

If the height of a menu prevents all menu items from being displayed, the menu can scroll internally.

```tsx
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
          list: {
            'aria-labelledby': 'long-button',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
```

## Limitations

There is [a flexbox bug](https://issues.chromium.org/issues/40344463) that prevents `text-overflow: ellipsis` from working in a flexbox layout.
You can use the `Typography` component with `noWrap` to workaround this issue:

```tsx
import * as React from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function TypographyMenu() {
  return (
    <Paper sx={{ width: 230 }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">A short message</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PriorityHighIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">A very long text that overflows</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            A very long text that overflows
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
```

## Change transition

Use a different transition.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="fade-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'fade-button',
          },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
```

## Context menu

Here is an example of a context menu. (Right click to open.)

```tsx
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export default function ContextMenu() {
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );

    // Prevent text selection lost after opening the context menu on Safari and Firefox
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      setTimeout(() => {
        selection.addRange(range);
      });
    }
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus,
        bibendum sit amet vulputate eget, porta semper ligula. Donec bibendum
        vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed dolor
        porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam quis
        vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis finibus
        massa. Nunc lobortis, massa ut rutrum ultrices, metus metus finibus ex, sit
        amet facilisis neque enim sed neque. Quisque accumsan metus vel maximus
        consequat. Suspendisse lacinia tellus a libero volutpat maximus.
      </Typography>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Copy</MenuItem>
        <MenuItem onClick={handleClose}>Print</MenuItem>
        <MenuItem onClick={handleClose}>Highlight</MenuItem>
        <MenuItem onClick={handleClose}>Email</MenuItem>
      </Menu>
    </div>
  );
}
```

## Grouped Menu

Display categories with the `ListSubheader` component.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const StyledListHeader = styled(ListSubheader)({
  backgroundImage: 'var(--Paper-overlay)',
});

export default function GroupedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'grouped-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="grouped-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
            sx: {
              py: 0,
            },
          },
        }}
      >
        <StyledListHeader>Category 1</StyledListHeader>
        <MenuItem onClick={handleClose}>Option 1</MenuItem>
        <MenuItem onClick={handleClose}>Option 2</MenuItem>
        <StyledListHeader>Category 2</StyledListHeader>
        <MenuItem onClick={handleClose}>Option 3</MenuItem>
        <MenuItem onClick={handleClose}>Option 4</MenuItem>
      </Menu>
    </div>
  );
}
```

## Supplementary projects

For more advanced use cases you might be able to take advantage of:

### material-ui-popup-state

![stars](https://img.shields.io/github/stars/jcoreio/material-ui-popup-state?style=social&label=Star)
![npm downloads](https://img.shields.io/npm/dm/material-ui-popup-state.svg)

The package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of menu state for you in most cases.

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Dashboard
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={popupState.close}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
```

# ClickAwayListener API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Click-Away Listener](https://mui.com/material-ui/react-click-away-listener/)
- [Menu](https://mui.com/material-ui/react-menu/)

## Import

```jsx
import ClickAwayListener from '@mui/material/ClickAwayListener';
// or
import { ClickAwayListener } from '@mui/material';
```

## Props

| Name             | Type                                                                                     | Default        | Required | Description |
| ---------------- | ---------------------------------------------------------------------------------------- | -------------- | -------- | ----------- |
| children         | `element`                                                                                | -              | Yes      |             |
| onClickAway      | `func`                                                                                   | -              | Yes      |             |
| disableReactTree | `bool`                                                                                   | `false`        | No       |             |
| mouseEvent       | `'onClick' \| 'onMouseDown' \| 'onMouseUp' \| 'onPointerDown' \| 'onPointerUp' \| false` | `'onClick'`    | No       |             |
| touchEvent       | `'onTouchEnd' \| 'onTouchStart' \| false`                                                | `'onTouchEnd'` | No       |             |

> **Note**: The `ref` is forwarded to the root element.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/ClickAwayListener/ClickAwayListener.tsx](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/ClickAwayListener/ClickAwayListener.tsx)

# Menu API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [App Bar](https://mui.com/material-ui/react-app-bar/)
- [Menu](https://mui.com/material-ui/react-menu/)

## Import

```jsx
import Menu from '@mui/material/Menu';
// or
import { Menu } from '@mui/material';
```

## Props

| Name                         | Type                                                                                                                               | Default          | Required | Description                                                                                                                                                                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open                         | `bool`                                                                                                                             | -                | Yes      |                                                                                                                                                                                                                                    |
| anchorEl                     | `HTML element \| func`                                                                                                             | -                | No       |                                                                                                                                                                                                                                    |
| autoFocus                    | `bool`                                                                                                                             | `true`           | No       |                                                                                                                                                                                                                                    |
| children                     | `node`                                                                                                                             | -                | No       |                                                                                                                                                                                                                                    |
| classes                      | `object`                                                                                                                           | -                | No       | Override or extend the styles applied to the component.                                                                                                                                                                            |
| disableAutoFocusItem         | `bool`                                                                                                                             | `false`          | No       |                                                                                                                                                                                                                                    |
| MenuListProps (deprecated)   | `object`                                                                                                                           | `{}`             | No       | ⚠️ use the `slotProps.list` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.       |
| onClose                      | `function(event: object, reason: string) => void`                                                                                  | -                | No       |                                                                                                                                                                                                                                    |
| PopoverClasses               | `object`                                                                                                                           | -                | No       |                                                                                                                                                                                                                                    |
| slotProps                    | `{ backdrop?: func \| object, list?: func \| object, paper?: func \| object, root?: func \| object, transition?: func \| object }` | `{}`             | No       |                                                                                                                                                                                                                                    |
| slots                        | `{ backdrop?: elementType, list?: elementType, paper?: elementType, root?: elementType, transition?: elementType }`                | `{}`             | No       |                                                                                                                                                                                                                                    |
| sx                           | `Array<func \| object \| bool> \| func \| object`                                                                                  | -                | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                            |
| transitionDuration           | `'auto' \| number \| { appear?: number, enter?: number, exit?: number }`                                                           | `'auto'`         | No       |                                                                                                                                                                                                                                    |
| TransitionProps (deprecated) | `object`                                                                                                                           | `{}`             | No       | ⚠️ use the `slotProps.transition` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| variant                      | `'menu' \| 'selectedMenu'`                                                                                                         | `'selectedMenu'` | No       |                                                                                                                                                                                                                                    |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Popover](https://mui.com/material-ui/api/popover/)).

## Inheritance

While not explicitly documented above, the props of the [Popover](https://mui.com/material-ui/api/popover/) component are also available on Menu.

## Slots

| Name       | Default        | Class            | Description                                 |
| ---------- | -------------- | ---------------- | ------------------------------------------- |
| root       | `Modal`        | `.MuiMenu-root`  | The component used for the popper.          |
| paper      | `PopoverPaper` | `.MuiMenu-paper` | The component used for the paper.           |
| list       | `MenuList`     | `.MuiMenu-list`  | The component used for the list.            |
| transition | `Grow`         | -                | The component used for the transition slot. |
| backdrop   | `Backdrop`     | -                | The component used for the backdrop slot.   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Menu/Menu.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Menu/Menu.js)

# MenuItem API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Menu](https://mui.com/material-ui/react-menu/)

## Import

```jsx
import MenuItem from '@mui/material/MenuItem';
// or
import { MenuItem } from '@mui/material';
```

## Props

| Name                  | Type                                              | Default | Required | Description                                                                             |
| --------------------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| autoFocus             | `bool`                                            | `false` | No       |                                                                                         |
| children              | `node`                                            | -       | No       |                                                                                         |
| classes               | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| component             | `elementType`                                     | -       | No       |                                                                                         |
| dense                 | `bool`                                            | `false` | No       |                                                                                         |
| disableGutters        | `bool`                                            | `false` | No       |                                                                                         |
| divider               | `bool`                                            | `false` | No       |                                                                                         |
| focusVisibleClassName | `string`                                          | -       | No       |                                                                                         |
| selected              | `bool`                                            | `false` | No       |                                                                                         |
| sx                    | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLLIElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on MenuItem.

## Theme default props

You can use `MuiMenuItem` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class        | Rule name | Description                                                                     |
| ------------------- | --------- | ------------------------------------------------------------------------------- |
| -                   | dense     | Styles applied to the root element if dense.                                    |
| `.Mui-disabled`     | -         | State class applied to the root element if `disabled={true}`.                   |
| -                   | divider   | Styles applied to the root element if `divider={true}`.                         |
| `.Mui-focusVisible` | -         | State class applied to the root element if keyboard focused.                    |
| -                   | gutters   | Styles applied to the inner `component` element unless `disableGutters={true}`. |
| -                   | root      | Styles applied to the root element.                                             |
| `.Mui-selected`     | -         | State class applied to the root element if `selected={true}`.                   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/MenuItem/MenuItem.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/MenuItem/MenuItem.js)

# MenuList API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Menu](https://mui.com/material-ui/react-menu/)

## Import

```jsx
import MenuList from '@mui/material/MenuList';
// or
import { MenuList } from '@mui/material';
```

## Props

| Name                   | Type                       | Default          | Required | Description |
| ---------------------- | -------------------------- | ---------------- | -------- | ----------- |
| autoFocus              | `bool`                     | `false`          | No       |             |
| autoFocusItem          | `bool`                     | `false`          | No       |             |
| children               | `node`                     | -                | No       |             |
| disabledItemsFocusable | `bool`                     | `false`          | No       |             |
| disableListWrap        | `bool`                     | `false`          | No       |             |
| variant                | `'menu' \| 'selectedMenu'` | `'selectedMenu'` | No       |             |

> **Note**: The `ref` is forwarded to the root element (HTMLUListElement).

> Any other props supplied will be provided to the root element ([List](https://mui.com/material-ui/api/list/)).

## Inheritance

While not explicitly documented above, the props of the [List](https://mui.com/material-ui/api/list/) component are also available on MenuList.

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

- [/packages/mui-material/src/MenuList/MenuList.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/MenuList/MenuList.js)

# Popover API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Menu](https://mui.com/material-ui/react-menu/)
- [Popover](https://mui.com/material-ui/react-popover/)

## Import

```jsx
import Popover from '@mui/material/Popover';
// or
import { Popover } from '@mui/material';
```

## Props

| Name         | Type                                                                                                         | Default | Required | Description |
| ------------ | ------------------------------------------------------------------------------------------------------------ | ------- | -------- | ----------- |
| open         | `bool`                                                                                                       | -       | Yes      |             |
| action       | `ref`                                                                                                        | -       | No       |             |
| anchorEl     | `HTML element \| func`                                                                                       | -       | No       |             |
| anchorOrigin | `{ horizontal: 'center' \| 'left' \| 'right' \| number, vertical: 'bottom' \| 'center' \| 'top' \| number }` | `{      |

vertical: 'top',
horizontal: 'left',
}`| No |  |
| anchorPosition |`{ left: number, top: number }`| - | No |  |
| anchorReference |`'anchorEl' \| 'anchorPosition' \| 'none'`|`'anchorEl'`| No |  |
| BackdropComponent (deprecated) |`elementType`|`styled(Backdrop, {
name: 'MuiModal',
slot: 'Backdrop',
overridesResolver: (props, styles) => {
return styles.backdrop;
},
})({
zIndex: -1,
})`| No | ⚠️ Use`slots.backdrop`instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| BackdropProps (deprecated) |`object`| - | No | ⚠️ Use`slotProps.backdrop`instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| children |`node`| - | No |  |
| classes |`object`| - | No | Override or extend the styles applied to the component. |
| container |`HTML element \| func`| - | No |  |
| disableScrollLock |`bool`|`false`| No |  |
| elevation |`integer`|`8`| No |  |
| marginThreshold |`number`|`16`| No |  |
| onClose |`func`| - | No |  |
| PaperProps (deprecated) |`{ component?: element type }`|`{}`| No | ⚠️ Use`slotProps.paper`instead. |
| slotProps |`{ backdrop?: func \| object, paper?: func \| object, root?: func \| object, transition?: func \| object }`|`{}`| No |  |
| slots |`{ backdrop?: elementType, paper?: elementType, root?: elementType, transition?: elementType }`|`{}`| No |  |
| sx |`Array<func \| object \| bool> \| func \| object`| - | No | The system prop that allows defining system overrides as well as additional CSS styles. |
| transformOrigin |`{ horizontal: 'center' \| 'left' \| 'right' \| number, vertical: 'bottom' \| 'center' \| 'top' \| number }`|`{
vertical: 'top',
horizontal: 'left',
}`| No |  |
| TransitionComponent (deprecated) |`elementType`|`Grow`| No | ⚠️ use the`slots.transition`prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| transitionDuration |`'auto' \| number \| { appear?: number, enter?: number, exit?: number }`|`'auto'`| No |  |
| TransitionProps (deprecated) |`object`|`{}`| No | ⚠️ use the`slotProps.transition` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Modal](https://mui.com/material-ui/api/modal/)).

## Inheritance

While not explicitly documented above, the props of the [Modal](https://mui.com/material-ui/api/modal/) component are also available on Popover.

## Slots

| Name       | Default    | Class               | Description                                 |
| ---------- | ---------- | ------------------- | ------------------------------------------- |
| root       | `Modal`    | `.MuiPopover-root`  | The component used for the root slot.       |
| paper      | `Paper`    | `.MuiPopover-paper` | The component used for the paper slot.      |
| transition | `Grow`     | -                   | The component used for the transition slot. |
| backdrop   | `Backdrop` | -                   | The component used for the backdrop slot.   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Popover/Popover.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Popover/Popover.js)

# Popper API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Autocomplete](https://mui.com/material-ui/react-autocomplete/)
- [Menu](https://mui.com/material-ui/react-menu/)
- [Popper](https://mui.com/material-ui/react-popper/)

## Import

```jsx
import Popper from '@mui/material/Popper';
// or
import { Popper } from '@mui/material';
```

## Props

| Name                         | Type                                                                                                                                                                                                                                                                                                    | Default    | Required | Description                                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open                         | `bool`                                                                                                                                                                                                                                                                                                  | -          | Yes      |                                                                                                                                                                                    |
| anchorEl                     | `HTML element \| object \| func`                                                                                                                                                                                                                                                                        | -          | No       |                                                                                                                                                                                    |
| children                     | `node \| func`                                                                                                                                                                                                                                                                                          | -          | No       |                                                                                                                                                                                    |
| component                    | `elementType`                                                                                                                                                                                                                                                                                           | -          | No       |                                                                                                                                                                                    |
| components (deprecated)      | `{ Root?: elementType }`                                                                                                                                                                                                                                                                                | `{}`       | No       | ⚠️ use the `slots` prop instead. This prop will be removed in a future major release. [How to migrate](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/).     |
| componentsProps (deprecated) | `{ root?: func \| object }`                                                                                                                                                                                                                                                                             | `{}`       | No       | ⚠️ use the `slotProps` prop instead. This prop will be removed in a future major release. [How to migrate](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/). |
| container                    | `HTML element \| func`                                                                                                                                                                                                                                                                                  | -          | No       |                                                                                                                                                                                    |
| disablePortal                | `bool`                                                                                                                                                                                                                                                                                                  | `false`    | No       |                                                                                                                                                                                    |
| keepMounted                  | `bool`                                                                                                                                                                                                                                                                                                  | `false`    | No       |                                                                                                                                                                                    |
| modifiers                    | `Array<{ data?: object, effect?: func, enabled?: bool, fn?: func, name?: any, options?: object, phase?: 'afterMain' \| 'afterRead' \| 'afterWrite' \| 'beforeMain' \| 'beforeRead' \| 'beforeWrite' \| 'main' \| 'read' \| 'write', requires?: Array<string>, requiresIfExists?: Array<string> }>`      | -          | No       |                                                                                                                                                                                    |
| placement                    | `'auto-end' \| 'auto-start' \| 'auto' \| 'bottom-end' \| 'bottom-start' \| 'bottom' \| 'left-end' \| 'left-start' \| 'left' \| 'right-end' \| 'right-start' \| 'right' \| 'top-end' \| 'top-start' \| 'top'`                                                                                            | `'bottom'` | No       |                                                                                                                                                                                    |
| popperOptions                | `{ modifiers?: array, onFirstUpdate?: func, placement?: 'auto-end' \| 'auto-start' \| 'auto' \| 'bottom-end' \| 'bottom-start' \| 'bottom' \| 'left-end' \| 'left-start' \| 'left' \| 'right-end' \| 'right-start' \| 'right' \| 'top-end' \| 'top-start' \| 'top', strategy?: 'absolute' \| 'fixed' }` | `{}`       | No       |                                                                                                                                                                                    |
| popperRef                    | `ref`                                                                                                                                                                                                                                                                                                   | -          | No       |                                                                                                                                                                                    |
| slotProps                    | `{ root?: func \| object }`                                                                                                                                                                                                                                                                             | `{}`       | No       |                                                                                                                                                                                    |
| slots                        | `{ root?: elementType }`                                                                                                                                                                                                                                                                                | `{}`       | No       |                                                                                                                                                                                    |
| sx                           | `Array<func \| object \| bool> \| func \| object`                                                                                                                                                                                                                                                       | -          | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                            |
| transition                   | `bool`                                                                                                                                                                                                                                                                                                  | `false`    | No       |                                                                                                                                                                                    |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## CSS

### Rule name

| Global class | Rule name | Description                             |
| ------------ | --------- | --------------------------------------- |
| -            | root      | Class name applied to the root element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Popper/Popper.tsx](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Popper/Popper.tsx)
