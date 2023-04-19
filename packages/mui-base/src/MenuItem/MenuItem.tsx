import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { MenuItemOwnerState, MenuItemProps, MenuItemTypeMap } from './MenuItem.types';
import { getMenuItemUtilityClass } from './menuItemClasses';
import useMenuItem from '../useMenuItem';
import composeClasses from '../composeClasses';
import useSlotProps from '../utils/useSlotProps';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

function useUtilityClasses(ownerState: MenuItemOwnerState) {
  const { disabled, focusVisible } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible'],
  };

  return composeClasses(slots, useClassNamesOverride(getMenuItemUtilityClass));
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base/react-menu/)
 *
 * API:
 *
 * - [MenuItem API](https://mui.com/base/react-menu/components-api/#menu-item)
 */
const MenuItem = React.forwardRef(function MenuItem<
  BaseComponentType extends React.ElementType = MenuItemTypeMap['defaultComponent'],
>(props: MenuItemProps<BaseComponentType>, ref: React.Ref<any>) {
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

  const ownerState: MenuItemOwnerState = { ...props, disabled, focusVisible, highlighted };

  const classes = useUtilityClasses(ownerState);

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
}) as OverridableComponent<MenuItemTypeMap>;

MenuItem.propTypes /* remove-proptypes */ = {
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
   * @ignore
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

export default MenuItem;
