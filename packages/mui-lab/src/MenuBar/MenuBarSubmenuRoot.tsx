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
 * - [MenuBarSubmenuRoot API](https://mui.com/material-ui/api/menu-bar-submenu-root/)
 */
function MenuBarSubmenuRoot(props: React.ComponentProps<typeof Menu.SubmenuRoot>) {
  return <Menu.SubmenuRoot {...props} />;
}

export default MenuBarSubmenuRoot;

MenuBarSubmenuRoot.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
};
