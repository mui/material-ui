'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponent } from '../utils/PolymorphicComponent';
import {
  MenuItemOwnerState,
  MenuItemProps,
  MenuItemRootSlotProps,
  MenuItemTypeMap,
} from './MenuItem.types';
import { getMenuItemUtilityClass } from './menuItemClasses';
import { useMenuItem, useMenuItemContextStabilizer } from '../useMenuItem';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useSlotProps } from '../utils/useSlotProps';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { WithOptionalOwnerState } from '../utils';
import { ListContext } from '../useList';

function useUtilityClasses(ownerState: MenuItemOwnerState) {
  const { disabled, focusVisible } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible'],
  };

  return composeClasses(slots, useClassNamesOverride(getMenuItemUtilityClass));
}

const MenuItem = React.memo(
  React.forwardRef(function MenuItem<RootComponentType extends React.ElementType>(
    props: MenuItemProps<RootComponentType>,
    forwardedRef: React.ForwardedRef<Element>,
  ) {
    const {
      children,
      disabled: disabledProp = false,
      label,
      id,
      slotProps = {},
      slots = {},
      ...other
    } = props;

    const { getRootProps, disabled, focusVisible, highlighted } = useMenuItem({
      id,
      disabled: disabledProp,
      rootRef: forwardedRef,
      label,
    });

    const ownerState: MenuItemOwnerState = { ...props, disabled, focusVisible, highlighted };

    const classes = useUtilityClasses(ownerState);

    const Root = slots.root ?? 'li';
    const rootProps: WithOptionalOwnerState<MenuItemRootSlotProps> = useSlotProps({
      elementType: Root,
      getSlotProps: getRootProps,
      externalSlotProps: slotProps.root,
      externalForwardedProps: other,
      className: classes.root,
      ownerState,
    });

    return <Root {...rootProps}>{children}</Root>;
  }),
);

/**
 * An unstyled menu item to be used within a Menu.
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [MenuItem API](https://mui.com/base-ui/react-menu/components-api/#menu-item)
 */
const StableMenuItem = React.forwardRef(function StableMenuItem(
  props: MenuItemProps,
  ref: React.ForwardedRef<Element>,
) {
  const { contextValue, id } = useMenuItemContextStabilizer(props.id);

  return (
    <ListContext.Provider value={contextValue}>
      <MenuItem {...props} id={id} ref={ref} />
    </ListContext.Provider>
  );
}) as PolymorphicComponent<MenuItemTypeMap>;

StableMenuItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: PropTypes.node,
  className: PropTypes.string,
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
  onClick: PropTypes.func,
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

/**
 * An unstyled menu item to be used within a Menu.
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [MenuItem API](https://mui.com/base-ui/react-menu/components-api/#menu-item)
 */
export { StableMenuItem as MenuItem };
