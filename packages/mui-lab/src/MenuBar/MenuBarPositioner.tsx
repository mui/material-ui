'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@base-ui/react/menu';
/**
 *
 * Demos:
 *
 * - [Menubar](https://mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [MenuBarPositioner API](https://mui.com/material-ui/api/menu-bar-positioner/)
 */
function MenuBarPositioner(props: React.ComponentProps<typeof Menu.Positioner>) {
  return <Menu.Positioner {...props} />;
}

export default MenuBarPositioner;

MenuBarPositioner.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
};
