'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { useDefaultProps } from '../DefaultPropsProvider';

/**
 * Inherits the full Base UI `Menu.SubmenuRoot` prop surface (open/close
 * control, hover-open with delays, `closeParentOnEsc`, keyboard behavior).
 * `Omit` (a mapped type) is used instead of bare `extends` so the proptypes
 * generator resolves the inherited members.
 */
export interface Menu2SubmenuRootProps extends Omit<BaseMenu.SubmenuRoot.Props, 'children'> {
  /**
   * The content of the submenu.
   */
  children?: React.ReactNode;
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [Menu2SubmenuRoot API](https://mui.com/material-ui/api/menu-preview-submenu-root/)
 */
function Menu2SubmenuRoot(props: Menu2SubmenuRootProps): React.JSX.Element {
  const themedProps = useDefaultProps({
    props,
    name: 'MuiMenu2SubmenuRoot',
  });

  return <BaseMenu.SubmenuRoot {...themedProps} />;
}

Menu2SubmenuRoot.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the submenu.
   */
  children: PropTypes.node,
} as any;

export default Menu2SubmenuRoot;
