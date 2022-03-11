import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import {
  ColorPaletteProp,
  CssVarsProvider,
  useColorScheme,
  styled,
  experimental_sx as sx,
} from '@mui/joy/styles';
import NextLink from 'next/link';
import Collapse from '@mui/material/Collapse';
import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import ListDivider from '@mui/joy/ListDivider';
import Link from '@mui/joy/Link';
import Menu, { MenuUnstyledActions } from '@mui/joy/Menu';
import MenuList from '@mui/joy/MenuList';
import MenuItem from '@mui/joy/MenuItem';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BeachAccess from '@mui/icons-material/BeachAccess';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Star from '@mui/icons-material/StarBorder';
import Favorite from '@mui/icons-material/FavoriteBorder';
import DeleteForever from '@mui/icons-material/DeleteForever';
import CommentIcon from '@mui/icons-material/Comment';
import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Label from '@mui/icons-material/Label';
import People from '@mui/icons-material/People';
import Info from '@mui/icons-material/Info';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDownRounded';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const useMenuButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuActions = React.useRef<MenuUnstyledActions>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  const close = () => {
    setAnchorEl(null);
    buttonRef.current!.focus();
  };

  return {
    anchorEl,
    open: isOpen,
    menuButtonRef: buttonRef,
    menuActions,
    onClick: handleButtonClick,
    onKeyDown: handleButtonKeyDown,
    onClose: close,
  };
};

const FirstMenu = () => {
  const { anchorEl, open, menuButtonRef, menuActions, onClick, onKeyDown, onClose } =
    useMenuButton();

  return (
    <div>
      <Button
        onClick={onClick}
        onKeyDown={onKeyDown}
        ref={menuButtonRef}
        aria-controls={open ? 'simple-menu' : undefined}
        aria-expanded={open || undefined}
        aria-haspopup="menu"
        variant="outlined"
      >
        Simple menu
      </Button>
      <Menu
        actions={menuActions}
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        listboxId="simple-menu"
      >
        <Sheet
          variant="outlined"
          sx={{ borderRadius: 'sm', minWidth: 160, mt: 0.5, boxShadow: 'sm' }}
        >
          <MenuList id="simple-menu">
            <MenuItem onClick={onClose}>Menu item 1</MenuItem>
            <MenuItem onClick={onClose}>Menu item 2</MenuItem>
            <MenuItem onClick={onClose}>Menu item 3</MenuItem>
          </MenuList>
        </Sheet>
      </Menu>
    </div>
  );
};

const SecondMenu = () => {
  const { anchorEl, open, menuButtonRef, menuActions, onClick, onKeyDown, onClose } =
    useMenuButton();

  return (
    <div>
      <Button
        onClick={onClick}
        onKeyDown={onKeyDown}
        ref={menuButtonRef}
        aria-controls={open ? 'simple-menu' : undefined}
        aria-expanded={open || undefined}
        aria-haspopup="menu"
        variant="outlined"
      >
        Group menus
      </Button>
      <Menu
        actions={menuActions}
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        listboxId="simple-menu"
      >
        <Sheet
          variant="outlined"
          sx={{ borderRadius: 'sm', minWidth: 160, mt: 0.5, boxShadow: 'sm' }}
        >
          <MenuList id="simple-menu" sx={{ '--List-nestedInsetStart': '0px' }}>
            <ListItem nested>
              <ListItem component="div">
                <Typography level="body3">NAVIGATION</Typography>
              </ListItem>
              <List aria-label="Navigation">
                <MenuItem onClick={onClose}>Back</MenuItem>
                <MenuItem disabled onClick={onClose}>
                  Forward
                </MenuItem>
                <MenuItem onClick={onClose}>Refresh</MenuItem>
              </List>
            </ListItem>
            <ListItem nested>
              <ListItem component="div">
                <Typography level="body3">PAGE</Typography>
              </ListItem>
              <List aria-label="Page">
                <MenuItem onClick={onClose}>Save as</MenuItem>
                <MenuItem onClick={onClose}>Print</MenuItem>
              </List>
            </ListItem>
            <ListDivider />
            <MenuItem variant="outlined" color="danger" onClick={onClose}>
              <ListItemContent>Delete</ListItemContent>
              <DeleteForever />
            </MenuItem>
          </MenuList>
        </Sheet>
      </Menu>
    </div>
  );
};

const ThirdMenu = () => {
  const { anchorEl, open, menuButtonRef, menuActions, onClick, onKeyDown, onClose } =
    useMenuButton();

  return (
    <div>
      <Button
        onClick={onClick}
        onKeyDown={onKeyDown}
        ref={menuButtonRef}
        aria-controls={open ? 'simple-menu' : undefined}
        aria-expanded={open || undefined}
        aria-haspopup="menu"
        variant="outlined"
      >
        Link menu
      </Button>
      <Menu
        actions={menuActions}
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        listboxId="simple-menu"
      >
        <Sheet
          variant="outlined"
          sx={{ borderRadius: 'sm', minWidth: 160, mt: 0.5, boxShadow: 'sm' }}
        >
          <MenuList id="simple-menu">
            <ListItem>
              <MenuItem component={Link} href="#" onClick={onClose}>
                Menu item 1
              </MenuItem>
            </ListItem>
            <ListItem>
              <NextLink href="#" passHref>
                <MenuItem component="a" onClick={onClose}>
                  Menu item 2
                </MenuItem>
              </NextLink>
            </ListItem>
          </MenuList>
        </Sheet>
      </Menu>
    </div>
  );
};

export default function JoyTypography() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              neutral: {
                outlinedBorder: 'rgba(0, 0, 0, 0.12)',
              },
            },
          },
        },
      }}
    >
      <GlobalStyles
        styles={{ body: { margin: 0, backgroundColor: 'var(--joy-palette-background-level1)' } }}
      />
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3, pb: 4 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            alignItems: 'flex-start',
          }}
        >
          <FirstMenu />
          <SecondMenu />
          <ThirdMenu />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
