import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItemUnstyledOwnerState, MenuItemUnstyledProps } from './MenuItemUnstyled.types';
import { getMenuItemUnstyledUtilityClass } from './menuItemUnstyledClasses';
import useMenuItem from './useMenuItem';
import composeClasses from '../composeClasses';
import useSlotProps from '../utils/useSlotProps';

function getUtilityClasses(ownerState: MenuItemUnstyledOwnerState) {
  const { disabled, focusVisible } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible'],
  };

  return composeClasses(slots, getMenuItemUnstyledUtilityClass, {});
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base/react-menu/)
 *
 * API:
 *
 * - [MenuItemUnstyled API](https://mui.com/base/api/menu-item-unstyled/)
 */
const MenuItemUnstyled = React.forwardRef(function MenuItemUnstyled(
  props: MenuItemUnstyledProps & React.ComponentPropsWithoutRef<'li'>,
  ref: React.Ref<any>,
) {
  const {
    children,
    className,
    disabled: disabledProp = false,
    component,
    components = {},
    componentsProps = {},
    label,
    ...other
  } = props;

  const { getRootProps, disabled, focusVisible } = useMenuItem({
    disabled: disabledProp,
    ref,
    label,
  });

  const ownerState: MenuItemUnstyledOwnerState = { ...props, disabled, focusVisible };

  const classes = getUtilityClasses(ownerState);

  const Root = component ?? components.Root ?? 'li';
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    className: [classes.root, className],
    ownerState,
  });

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
  componentsProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * If `true`, the menu item will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label: PropTypes.string,
} as any;

export default MenuItemUnstyled;
