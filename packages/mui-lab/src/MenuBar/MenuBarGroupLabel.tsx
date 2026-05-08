'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@base-ui/react/menu';
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import { MenuBarGroupLabelProps } from './MenuBar.types';

const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  position: 'initial',
  paddingBlock: theme.spacing(1),
  backgroundColor: 'transparent',
  ...theme.typography.overline,
  lineHeight: '1.5',
}));
/**
 *
 * Demos:
 *
 * - [Menubar](https://mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [MenuBarGroupLabel API](https://mui.com/material-ui/api/menu-bar-group-label/)
 */
const MenuBarGroupLabel = React.forwardRef<
  HTMLDivElement,
  MenuBarGroupLabelProps
>(function MenuBarGroupLabel(props, ref) {
  const { sx, ...other } = props;
  return (
    <Menu.GroupLabel
      ref={ref}
      render={<StyledSubheader sx={sx} component="div" />}
      {...other}
    />
  );
});

export default MenuBarGroupLabel;

MenuBarGroupLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};
