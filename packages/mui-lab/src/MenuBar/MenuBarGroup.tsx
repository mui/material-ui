'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@base-ui/react/menu';
import Box from '@mui/material/Box';
/**
 *
 * Demos:
 *
 * - [Menubar](https://mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [MenuBarGroup API](https://mui.com/material-ui/api/menu-bar-group/)
 */
function MenuBarGroup(props: React.ComponentProps<typeof Menu.Group>) {
  return <Menu.Group render={<Box sx={{ position: 'relative' }} />} {...props} />;
}

export default MenuBarGroup;

MenuBarGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
};
