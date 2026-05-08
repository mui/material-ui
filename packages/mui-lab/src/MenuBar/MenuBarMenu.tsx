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
 * - [MenuBarMenu API](https://mui.com/material-ui/api/menu-bar-menu/)
 */
function MenuBarMenu(props: React.ComponentProps<typeof Menu.Root>) {
  return <Menu.Root {...props} />;
}

export default MenuBarMenu;

MenuBarMenu.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the popover.
   * This can be a regular React node or a render function that receives the `payload` of the active trigger.
   */
  children: PropTypes.node,
};
