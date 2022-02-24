import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { HTMLElementType } from '@mui/utils';
import appendOwnerState from '../utils/appendOwnerState';
import MenuUnstyledContext, { MenuUnstyledContextType } from './MenuUnstyledContext';
import { MenuUnstyledOwnerState, MenuUnstyledProps } from './MenuUnstyled.types';
import { getMenuUnstyledUtilityClass } from './menuUnstyledClasses';
import useMenu from './useMenu';
import composeClasses from '../composeClasses';
import PopperUnstyled from '../PopperUnstyled';

function getUtilityClasses(ownerState: MenuUnstyledOwnerState) {
  const { open } = ownerState;
  const slots = {
    root: ['root', open && 'expanded'],
    listbox: ['listbox', open && 'expanded'],
  };

  return composeClasses(slots, getMenuUnstyledUtilityClass, {});
}
/**
 *
 * Demos:
 *
 * - [Menus](https://mui.com/components/menus/)
 *
 * API:
 *
 * - [MenuUnstyled API](https://mui.com/api/menu-unstyled/)
 */
const MenuUnstyled = React.forwardRef(function MenuUnstyled(
  props: MenuUnstyledProps,
  forwardedRef: React.Ref<any>,
) {
  const {
    anchorEl,
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    onClose,
    open = false,
    ...other
  } = props;

  const { registerItem, unregisterItem, getListboxProps, getItemProps, getItemState } = useMenu({
    open,
    onClose,
  });

  const ownerState: MenuUnstyledOwnerState = {
    ...props,
    open,
  };

  const classes = getUtilityClasses(ownerState);

  const Popper = component ?? components.Root ?? PopperUnstyled;
  const popperProps = appendOwnerState(
    Popper,
    {
      ...other,
      anchorEl,
      open,
      ...componentsProps.root,
      className: clsx(classes.root, className, componentsProps.root?.className),
    },
    ownerState,
  );

  const Listbox = components.Listbox ?? 'ul';
  const listboxProps = appendOwnerState(
    Listbox,
    {
      ...componentsProps.listbox,
      ...getListboxProps(),
      className: clsx(classes.listbox, componentsProps.listbox?.className),
    },
    ownerState,
  );

  const contextValue: MenuUnstyledContextType = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
  };

  return (
    <Popper {...popperProps} ref={forwardedRef}>
      <Listbox {...listboxProps}>
        <MenuUnstyledContext.Provider value={contextValue}>{children}</MenuUnstyledContext.Provider>
      </Listbox>
    </Popper>
  );
});

MenuUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   */
  anchorEl: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  components: PropTypes.shape({
    Popper: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.shape({
    popper: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onClose: PropTypes.func,
  /**
   * Controls whether the menu is displayed.
   * @default false
   */
  open: PropTypes.bool,
} as any;

export default MenuUnstyled;
