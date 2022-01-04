import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MenuItemUnstyledProps from './MenuItemUnstyledProps';
import { appendOwnerState } from '../utils';
import { getMenuItemUnstyledUtilityClass } from './menuItemUnstyledClasses';
import useMenuItem from './useMenuItem';
import composeClasses from '../composeClasses';

export interface MenuItemState {
  disabled: boolean;
  highlighted: boolean;
}

function getUtilityClasses(ownerState: MenuItemState) {
  const { disabled, highlighted } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', highlighted && 'highlighted'],
  };

  return composeClasses(slots, getMenuItemUnstyledUtilityClass, {});
}
/**
 *
 * Demos:
 *
 * - [Menus](https://mui.com/components/menus/)
 *
 * API:
 *
 * - [MenuItemUnstyled API](https://mui.com/api/menu-item-unstyled/)
 */
const MenuItemUnstyled = React.forwardRef(function MenuItemUnstyled(
  props: MenuItemUnstyledProps,
  ref: React.Ref<any>,
) {
  const {
    onClick,
    children,
    className,
    disabled = false,
    component,
    components = {},
    componentsProps = {},
    ...other
  } = props;

  const menuItem = useMenuItem({
    disabled,
    onClick,
    ref,
  });

  if (menuItem == null || menuItem.itemState == null) {
    return null;
  }

  const { getRootProps, itemState } = menuItem;

  const ownerState: MenuItemState = { ...props, ...itemState };

  const classes = getUtilityClasses(ownerState);

  const Root = component ?? components.Root ?? 'li';
  const rootProps = appendOwnerState(
    Root,
    {
      ...other,
      ...componentsProps.root,
      ...getRootProps(other),
      className: clsx(classes.root, className, componentsProps.root?.className),
    },
    ownerState,
  );

  return <Root {...rootProps}>{children}</Root>;
});

MenuItemUnstyled.propTypes /* remove-proptypes */ = {
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
  componentsProps: PropTypes.object,
  /**
   * If `true`, the menu item will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
} as any;

export default MenuItemUnstyled;
