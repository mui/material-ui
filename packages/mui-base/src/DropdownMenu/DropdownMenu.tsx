import * as React from 'react';
import PropTypes from 'prop-types';
import { DropdownMenuProps } from './DropdownMenu.types';
import MenuContext from '../useMenu/MenuContext';
import useDropdownMenu from '../useDropdownMenu/useDropdownMenu';
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [DropdownMenu API](https://mui.com/base-ui/react-menu/components-api/#dropdown-menu)
 */
function DropdownMenu(props: DropdownMenuProps) {
  const { children, open, defaultOpen, onOpenChange } = props;

  const { contextValue } = useDropdownMenu({
    defaultOpen,
    onOpenChange,
    open,
  });

  return <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>;
}

DropdownMenu.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * If `true`, the menu is initially open.
   */
  defaultOpen: PropTypes.bool,
  /**
   * Callback fired when the component requests to be opened or closed.
   */
  onOpenChange: PropTypes.func,
  /**
   * Allows to control whether the menu is open.
   * This is a controlled counterpart of `defaultOpen`.
   */
  open: PropTypes.bool,
} as any;

export default DropdownMenu;
