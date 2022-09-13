import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import {
  MenuItemUnstyledOwnerState,
  MenuItemUnstyledProps,
  MenuItemUnstyledTypeMap,
} from './MenuItemUnstyled.types';
import { getMenuItemUnstyledUtilityClass } from './menuItemUnstyledClasses';
import useMenuItem from '@mui/base/useMenuItem';
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
 * - [Unstyled Menu](https://mui.com/base/react-menu/)
 *
 * API:
 *
 * - [MenuItemUnstyled API](https://mui.com/base/api/menu-item-unstyled/)
 */
const MenuItemUnstyled = React.forwardRef(function MenuItemUnstyled<
  BaseComponentType extends React.ElementType = MenuItemUnstyledTypeMap['defaultComponent'],
>(props: MenuItemUnstyledProps<BaseComponentType>, ref: React.Ref<any>) {
  const {
    children,
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
    className: classes.root,
    ownerState,
  });

  return <Root {...rootProps}>{children}</Root>;
}) as OverridableComponent<MenuItemUnstyledTypeMap>;

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the MenuItem.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the MenuItem.
   * @default {}
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
