import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent } from '../utils/PolymorphicComponent';
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
const MenuItem = React.forwardRef(function MenuItem<RootComponentType extends React.ElementType>(
  props: MenuItemProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    children,
    disabled: disabledProp = false,
    label,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const { getRootProps, disabled, focusVisible, highlighted } = useMenuItem({
    disabled: disabledProp,
    rootRef: forwardedRef,
    label,
  });

  const ownerState: MenuItemOwnerState = { ...props, disabled, focusVisible, highlighted };

  const classes = useUtilityClasses(ownerState);

  const Root = slots.root ?? 'li';
  const rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    className: classes.root,
    ownerState,
  });

  return <Root {...rootProps}>{children}</Root>;
}) as PolymorphicComponent<MenuItemTypeMap>;

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
