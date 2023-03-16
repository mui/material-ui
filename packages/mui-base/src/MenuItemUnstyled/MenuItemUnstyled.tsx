import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import {
  MenuItemUnstyledOwnerState,
  MenuItemUnstyledProps,
  MenuItemUnstyledTypeMap,
} from './MenuItemUnstyled.types';
import { getMenuItemUnstyledUtilityClass } from './menuItemUnstyledClasses';
import useMenuItem from '../useMenuItem';
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
 * - [MenuItemUnstyled API](https://mui.com/base/react-menu/components-api/#menu-item-unstyled)
 */
const MenuItemUnstyled = React.forwardRef(function MenuItemUnstyled<
  BaseComponentType extends React.ElementType = MenuItemUnstyledTypeMap['defaultComponent'],
>(props: MenuItemUnstyledProps<BaseComponentType>, ref: React.Ref<any>) {
  const {
    children,
    disabled: disabledProp = false,
    component,
    label,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const { getRootProps, disabled, focusVisible, highlighted } = useMenuItem({
    disabled: disabledProp,
    ref,
    label,
  });

  const ownerState: MenuItemUnstyledOwnerState = { ...props, disabled, focusVisible, highlighted };

  const classes = getUtilityClasses(ownerState);

  const Root = component ?? slots.root ?? 'li';
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
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
   * If `true`, the menu item will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label: PropTypes.string,
  /**
   * The props used for each slot inside the MenuItem.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the MenuItem.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
} as any;

export default MenuItemUnstyled;
