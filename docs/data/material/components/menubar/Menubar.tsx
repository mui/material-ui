import * as React from 'react';
import { Menu } from '@base-ui/react/menu';
import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';

export function Menubar(props: React.ComponentProps<typeof BaseMenubar>) {
  return (
    <BaseMenubar
      render={
        <Box
          sx={{
            display: 'flex',
            gap: '1px',
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            p: 0.25,
          }}
        />
      }
      {...props}
    />
  );
}

export function MenuRoot(props: React.ComponentProps<typeof Menu.Root>) {
  return <Menu.Root {...props} />;
}

export function MenuTrigger(props: React.ComponentProps<typeof Menu.Trigger>) {
  return (
    <Menu.Trigger
      render={
        <Button
          size="small"
          color="inherit"
          disableRipple
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            '&[data-popup-open]': { bgcolor: 'action.selected' },
            '&.Mui-focusVisible': { bgcolor: 'action.selected' },
          }}
        />
      }
      {...props}
    />
  );
}

export function MenuPortal(props: React.ComponentProps<typeof Menu.Portal>) {
  return <Menu.Portal {...props} />;
}

export function MenuPositioner(props: React.ComponentProps<typeof Menu.Positioner>) {
  return <Menu.Positioner {...props} />;
}

export function MenuPopup(props: React.ComponentProps<typeof Menu.Popup>) {
  return (
    <Menu.Popup
      render={(renderProps) => (
        <Paper
          elevation={8}
          sx={{
            minWidth: 160,
            py: 0.5,
            transformOrigin: 'var(--transform-origin)',
            '&[data-starting-style], &[data-ending-style]': {
              opacity: 0,
              transform: 'scale(0.95)',
            },
          }}
        >
          <List
            component="div"
            disablePadding
            sx={{ outline: 'none' }}
            {...renderProps}
          >
            {props.children}
          </List>
        </Paper>
      )}
      {...props}
    />
  );
}

export function MenuItem(props: React.ComponentProps<typeof Menu.Item>) {
  return <Menu.Item render={<ListItemButton dense />} {...props} />;
}

export function MenuSubmenuRoot(
  props: React.ComponentProps<typeof Menu.SubmenuRoot>,
) {
  return <Menu.SubmenuRoot {...props} />;
}

export function MenuSubmenuTrigger(
  props: React.ComponentProps<typeof Menu.SubmenuTrigger>,
) {
  return (
    <Menu.SubmenuTrigger render={<ListItemButton dense />} {...props}>
      {props.children}
      <ChevronRightIcon fontSize="small" />
    </Menu.SubmenuTrigger>
  );
}

export function MenuSeparator(props: React.ComponentProps<typeof Menu.Separator>) {
  return <Menu.Separator render={<Divider />} {...props} />;
}
