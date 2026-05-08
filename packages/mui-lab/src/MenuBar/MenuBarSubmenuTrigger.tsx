'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@base-ui/react/menu';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MenuBarSubmenuTriggerProps } from './MenuBar.types';

const StyledHint = styled(Typography)(({ theme }) => ({
  flexShrink: 0,
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.body2,
}));
/**
 *
 * Demos:
 *
 * - [Menubar](https://mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [MenuBarSubmenuTrigger API](https://mui.com/material-ui/api/menu-bar-submenu-trigger/)
 */
const MenuBarSubmenuTrigger = React.forwardRef<HTMLDivElement, MenuBarSubmenuTriggerProps>(
  function MenuBarSubmenuTrigger(props, ref) {
    const { sx, icon, hint, children, ...other } = props;
    return (
      <Menu.SubmenuTrigger ref={ref} render={<ListItemButton dense sx={sx} />} {...other}>
        {icon && <ListItemIcon sx={{ minWidth: 32 }}>{icon}</ListItemIcon>}
        <ListItemText>{children}</ListItemText>
        {hint && <StyledHint>{hint}</StyledHint>}
        <ChevronRightIcon fontSize="small" sx={{ mr: -1 }} />
      </Menu.SubmenuTrigger>
    );
  },
);

export default MenuBarSubmenuTrigger;

MenuBarSubmenuTrigger.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
  hint: PropTypes.node,
  icon: PropTypes.node,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};
