import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@base-ui/react/menu';
import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export function Menubar(props) {
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

export function MenuRoot(props) {
  return <Menu.Root {...props} />;
}

export function MenuTrigger(props) {
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

export function MenuPortal(props) {
  return <Menu.Portal {...props} />;
}

export function MenuPositioner(props) {
  return <Menu.Positioner {...props} />;
}

function MenuPopup(props) {
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

MenuPopup.propTypes = {
  children: PropTypes.node,
};

export { MenuPopup };

function MenuItem(props) {
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

MenuItem.propTypes = {
  children: PropTypes.node,
  hint: PropTypes.node,
  icon: PropTypes.node,
  secondary: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export { MenuItem };

export function MenuSubmenuRoot(props) {
  return <Menu.SubmenuRoot {...props} />;
}

function MenuSubmenuTrigger(props) {
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

MenuSubmenuTrigger.propTypes = {
  children: PropTypes.node,
  hint: PropTypes.node,
  icon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export { MenuSubmenuTrigger };

function MenuSeparator(props) {
  const { sx, ...other } = props;
  return (
    <Menu.Separator
      render={<Divider sx={[{ my: 0.5 }, ...(Array.isArray(sx) ? sx : [sx])]} />}
      {...other}
    />
  );
}

MenuSeparator.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export { MenuSeparator };

function MenuCheckboxItem(props) {
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

MenuCheckboxItem.propTypes = {
  children: PropTypes.node,
  hint: PropTypes.node,
};

export { MenuCheckboxItem };

export function MenuRadioGroup(props) {
  return <Menu.RadioGroup {...props} />;
}

function MenuRadioItem(props) {
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

MenuRadioItem.propTypes = {
  children: PropTypes.node,
  hint: PropTypes.node,
};

export { MenuRadioItem };

export function MenuGroup(props) {
  return <Menu.Group render={<Box sx={{ position: 'relative' }} />} {...props} />;
}

function MenuGroupLabel(props) {
  const { sx, ...other } = props;
  return (
    <Menu.GroupLabel
      render={
        <ListSubheader
          component="div"
          sx={[
            { position: 'initial', lineHeight: 'unset', py: 1 },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        />
      }
      {...other}
    />
  );
}

MenuGroupLabel.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export { MenuGroupLabel };
