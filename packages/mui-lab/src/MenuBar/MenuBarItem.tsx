'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@base-ui/react/menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { MenuBarItemProps } from './MenuBar.types';
/**
 *
 * Demos:
 *
 * - [Menubar](https://mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [MenuBarItem API](https://mui.com/material-ui/api/menu-bar-item/)
 */
const MenuBarItem = React.forwardRef<HTMLDivElement, MenuBarItemProps>(
  function MenuBarItem(props, ref) {
    const { sx, icon, hint, children, secondary, ...other } = props;
    return (
      <Menu.Item
        ref={ref}
        render={<ListItemButton dense sx={[{ gap: 1.5 }, ...(Array.isArray(sx) ? sx : [sx])]} />}
        {...other}
      >
        {icon && <ListItemIcon sx={{ minWidth: 'unset' }}>{icon}</ListItemIcon>}
        <ListItemText secondary={secondary}>{children}</ListItemText>
        {hint && (
          <Typography sx={{ flexShrink: 0, color: 'text.secondary', typography: 'body2' }}>
            {hint}
          </Typography>
        )}
      </Menu.Item>
    );
  },
);

export default MenuBarItem;

MenuBarItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
  hint: PropTypes.node,
  icon: PropTypes.node,
  secondary: PropTypes.node,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};
