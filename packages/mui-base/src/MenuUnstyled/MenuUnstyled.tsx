import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
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
    popper: ['popper', open && 'expanded'],
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

  const menuRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(menuRef, forwardedRef);

  const { registerItem, unregisterItem, getRootProps, getItemProps, getItemState } = useMenu({
    listboxRef: handleRef,
    open,
    onClose,
  });

  const ownerState: MenuUnstyledOwnerState = {
    ...props,
    open,
  };

  const classes = getUtilityClasses(ownerState);

  const Root = component ?? components.Root ?? 'ul';
  const rootProps = appendOwnerState(
    Root,
    {
      ...other,
      ...componentsProps.root,
      ...getRootProps(),
      className: clsx(classes.root, className, componentsProps.root?.className),
    },
    ownerState,
  );

  const Popper = components.Popper ?? PopperUnstyled;
  const popperProps = appendOwnerState(
    Popper,
    {
      anchorEl,
      open,
      ...componentsProps.popper,
      className: clsx(classes.popper, componentsProps.popper?.className),
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
    <Popper {...popperProps}>
      <Root {...rootProps}>
        <MenuUnstyledContext.Provider value={contextValue}>{children}</MenuUnstyledContext.Provider>
      </Root>
    </Popper>
  );
});

MenuUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
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
    Root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object,
  }),
} as any;

export default MenuUnstyled;
