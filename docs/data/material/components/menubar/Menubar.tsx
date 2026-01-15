import * as React from 'react';
import { Menu } from '@base-ui/react/menu';
import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader, { ListSubheaderProps } from '@mui/material/ListSubheader';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Divider, { DividerProps } from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export function Menubar(props: React.ComponentProps<typeof BaseMenubar>) {
  return (
    <BaseMenubar
      render={
        <Box
          sx={{
            display: 'flex',
            gap: '1px',
            p: 0.25,
            '&[aria-orientation="vertical"]': {
              flexDirection: 'column',
            },
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
            px: 2,
            color: 'text.secondary',
            fontWeight: 500,
            transition: 'none',
            textTransform: 'capitalize',
            letterSpacing: 0,
            fontSize: '0.875rem',
            '&[data-popup-open]': { bgcolor: 'action.focus' },
            '&.Mui-focusVisible': { bgcolor: 'action.focus' },
            '[aria-orientation="vertical"] &': {
              justifyContent: 'initial',
            },
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

interface MenuItemExtendedProps {
  icon?: React.ReactNode;
  secondary?: React.ReactNode;
  hint?: React.ReactNode;
}

export function MenuItem(
  props: React.ComponentProps<typeof Menu.Item> &
    Pick<ListItemButtonProps, 'sx'> &
    MenuItemExtendedProps,
) {
  const { sx, icon, hint, children, secondary, ...other } = props;
  return (
    <Menu.Item
      render={
        <ListItemButton
          dense
          sx={[{ gap: 1.5 }, ...(Array.isArray(sx) ? sx : [sx])]}
        />
      }
      {...other}
    >
      {icon && <ListItemIcon sx={{ minWidth: 'unset' }}>{icon}</ListItemIcon>}
      <ListItemText secondary={secondary}>{children}</ListItemText>
      {hint && (
        <Typography
          sx={{ flexShrink: 0, color: 'text.secondary', typography: 'body2' }}
        >
          {hint}
        </Typography>
      )}
    </Menu.Item>
  );
}

export function MenuSubmenuRoot(
  props: React.ComponentProps<typeof Menu.SubmenuRoot>,
) {
  return <Menu.SubmenuRoot {...props} />;
}

export function MenuSubmenuTrigger(
  props: React.ComponentProps<typeof Menu.SubmenuTrigger> &
    Pick<ListItemButtonProps, 'sx'> &
    Pick<MenuItemExtendedProps, 'icon' | 'hint'>,
) {
  const { sx, icon, hint, children, ...other } = props;
  return (
    <Menu.SubmenuTrigger render={<ListItemButton dense sx={sx} />} {...other}>
      {icon && <ListItemIcon sx={{ minWidth: 32 }}>{icon}</ListItemIcon>}
      <ListItemText>{children}</ListItemText>
      {hint && (
        <Typography
          sx={{ flexShrink: 0, color: 'text.secondary', typography: 'body2' }}
        >
          {hint}
        </Typography>
      )}
      <ChevronRightIcon fontSize="small" sx={{ mr: -1 }} />
    </Menu.SubmenuTrigger>
  );
}

export function MenuSeparator(
  props: React.ComponentProps<typeof Menu.Separator> & Pick<DividerProps, 'sx'>,
) {
  const { sx, ...other } = props;
  return (
    <Menu.Separator
      render={<Divider sx={[{ my: 0.5 }, ...(Array.isArray(sx) ? sx : [sx])]} />}
      {...other}
    />
  );
}

export function MenuCheckboxItem(
  props: React.ComponentProps<typeof Menu.CheckboxItem> &
    Pick<MenuItemExtendedProps, 'hint'>,
) {
  const { hint, children, ...other } = props;
  return (
    <Menu.CheckboxItem render={<ListItemButton dense />} {...other}>
      <ListItemIcon sx={{ minWidth: 32 }}>
        <Menu.CheckboxItemIndicator render={<CheckIcon fontSize="small" />} />
      </ListItemIcon>
      <ListItemText>{children}</ListItemText>
      {hint && (
        <Typography
          sx={{ flexShrink: 0, color: 'text.secondary', typography: 'body2' }}
        >
          {hint}
        </Typography>
      )}
    </Menu.CheckboxItem>
  );
}

export function MenuRadioGroup(props: React.ComponentProps<typeof Menu.RadioGroup>) {
  return <Menu.RadioGroup {...props} />;
}

export function MenuRadioItem(
  props: React.ComponentProps<typeof Menu.RadioItem> &
    Pick<MenuItemExtendedProps, 'hint'>,
) {
  const { hint, children, ...other } = props;
  return (
    <Menu.RadioItem render={<ListItemButton dense />} {...other}>
      <ListItemIcon sx={{ minWidth: 32, position: 'relative' }}>
        <RadioButtonUncheckedIcon fontSize="small" />
        <Menu.RadioItemIndicator
          render={
            <RadioButtonCheckedIcon
              fontSize="small"
              sx={{ position: 'absolute', left: 0 }}
            />
          }
        />
      </ListItemIcon>
      <ListItemText>{children}</ListItemText>
      {hint && (
        <Typography
          sx={{ flexShrink: 0, color: 'text.secondary', typography: 'body2' }}
        >
          {hint}
        </Typography>
      )}
    </Menu.RadioItem>
  );
}

export function MenuGroup(props: React.ComponentProps<typeof Menu.Group>) {
  return <Menu.Group render={<Box sx={{ position: 'relative' }} />} {...props} />;
}

export function MenuGroupLabel(
  props: React.ComponentProps<typeof Menu.GroupLabel> &
    Pick<ListSubheaderProps, 'sx'>,
) {
  const { sx, ...other } = props;
  return (
    <Menu.GroupLabel
      render={
        <ListSubheader
          component="div"
          sx={[
            (theme) => ({
              position: 'initial',
              py: 1,
              ...theme.typography.overline,
              lineHeight: '1.5',
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        />
      }
      {...other}
    />
  );
}
