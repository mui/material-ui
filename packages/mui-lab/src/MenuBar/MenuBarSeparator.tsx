'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@base-ui/react/menu';
import Divider from '@mui/material/Divider';
import { MenuBarSeparatorProps } from './MenuBar.types';
/**
 *
 * Demos:
 *
 * - [Menubar](https://mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [MenuBarSeparator API](https://mui.com/material-ui/api/menu-bar-separator/)
 */
const MenuBarSeparator = React.forwardRef<HTMLDivElement, MenuBarSeparatorProps>(
  function MenuBarSeparator(props, ref) {
    const { sx, ...other } = props;
    return (
      <Menu.Separator
        ref={ref}
        render={<Divider sx={[{ my: 0.5 }, ...(Array.isArray(sx) ? sx : [sx])]} />}
        {...other}
      />
    );
  },
);

export default MenuBarSeparator;

MenuBarSeparator.propTypes /* remove-proptypes */ = {
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
