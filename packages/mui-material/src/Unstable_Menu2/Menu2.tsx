'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { useDefaultProps } from '../DefaultPropsProvider';

/**
 * Inherits the full Base UI `Menu.Root` prop surface (open/close control,
 * modality, hover-open with delays, `actionsRef`, keyboard behavior).
 * `Omit` (a mapped type) is used instead of bare `extends` so the proptypes
 * generator resolves the inherited members.
 */
export interface Menu2Props extends Omit<BaseMenu.Root.Props, 'children'> {
  /**
   * The content of the menu.
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
 * - [Menu2 API](https://mui.com/material-ui/api/menu-preview/)
 */
function Menu2(props: Menu2Props): React.JSX.Element {
  const themedProps = useDefaultProps({
    props,
    name: 'MuiMenu2',
  });

  return <BaseMenu.Root {...themedProps} />;
}

Menu2.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the menu.
   */
  children: PropTypes.node,
} as any;

export default Menu2;
