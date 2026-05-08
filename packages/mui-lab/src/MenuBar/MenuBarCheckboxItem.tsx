'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@base-ui/react/menu';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { MenuBarCheckboxItemProps } from './MenuBar.types';

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
 * - [MenuBarCheckboxItem API](https://mui.com/material-ui/api/menu-bar-checkbox-item/)
 */
const MenuBarCheckboxItem = React.forwardRef<HTMLDivElement, MenuBarCheckboxItemProps>(
  function MenuBarCheckboxItem(props, ref) {
    const { hint, children, ...other } = props;
    return (
      <Menu.CheckboxItem ref={ref} render={<ListItemButton dense />} {...other}>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <Menu.CheckboxItemIndicator render={<CheckIcon fontSize="small" />} />
        </ListItemIcon>
        <ListItemText>{children}</ListItemText>
        {hint && <StyledHint>{hint}</StyledHint>}
      </Menu.CheckboxItem>
    );
  },
);

export default MenuBarCheckboxItem;

MenuBarCheckboxItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
  hint: PropTypes.node,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};
