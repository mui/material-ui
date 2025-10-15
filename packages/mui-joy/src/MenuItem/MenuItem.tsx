'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import capitalize from '@mui/utils/capitalize';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { useMenuItem, useMenuItemContextStabilizer } from '@mui/base/useMenuItem';
import { ListContext } from '@mui/base/useList';
import { StyledListItemButton } from '../ListItemButton/ListItemButton';
import { styled, useThemeProps } from '../styles';
import { useVariantColor } from '../styles/variantColorInheritance';
import { getMenuItemUtilityClass } from './menuItemClasses';
import {
  MenuItemOwnerState,
  ExtendMenuItem,
  MenuItemTypeMap,
  MenuItemProps,
} from './MenuItemProps';
import RowListContext from '../List/RowListContext';
import ListItemButtonOrientationContext from '../ListItemButton/ListItemButtonOrientationContext';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState: MenuItemOwnerState) => {
  const { focusVisible, disabled, selected, color, variant } = ownerState;
  const slots = {
    root: [
      'root',
      focusVisible && 'focusVisible',
      disabled && 'disabled',
      selected && 'selected',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, {});

  return composedClasses;
};

const MenuItemRoot = styled(StyledListItemButton, {
  name: 'JoyMenuItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuItemOwnerState }>({});

const InnerMenuItem = React.forwardRef(function InnerMenuItem(
  inProps: MenuItemProps,
  ref: React.ForwardedRef<Element>,
) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoyMenuItem',
  });

  const row = React.useContext(RowListContext);

  const {
    children,
    disabled: disabledProp = false,
    component = 'li',
    selected = false,
    color: colorProp = 'neutral',
    orientation = 'horizontal',
    variant: variantProp = 'plain',
    slots = {},
    slotProps = {},
    id,
    ...other
  } = props;
  const { variant = variantProp, color = colorProp } = useVariantColor(
    inProps.variant,
    inProps.color,
  );

  const { getRootProps, disabled, focusVisible } = useMenuItem({
    id,
    disabled: disabledProp,
    rootRef: ref,
  });

  const ownerState = {
    ...props,
    component,
    color,
    disabled,
    focusVisible,
    orientation,
    selected,
    row,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    elementType: MenuItemRoot,
    getSlotProps: getRootProps,
    externalForwardedProps,
    className: classes.root,
    ownerState,
  });

  return (
    <ListItemButtonOrientationContext.Provider value={orientation}>
      <SlotRoot {...rootProps}>{children}</SlotRoot>
    </ListItemButtonOrientationContext.Provider>
  );
});

InnerMenuItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  id: PropTypes.string,
  /**
   * The content direction flow.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

const MenuItem = React.memo(InnerMenuItem);
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/joy-ui/react-menu/)
 *
 * API:
 *
 * - [MenuItem API](https://mui.com/joy-ui/api/menu-item/)
 * - inherits [ListItemButton API](https://mui.com/joy-ui/api/list-item-button/)
 */
const StableMenuItem = React.forwardRef(function StableMenuItem(
  props: MenuItemProps,
  ref: React.ForwardedRef<Element>,
) {
  // This wrapper component is used as a performance optimization.
  // `useMenuItemContextStabilizer` ensures that the context value
  // is stable across renders, so that the actual MenuItem re-renders
  // only when it needs to.
  const { contextValue, id } = useMenuItemContextStabilizer(props.id);

  return (
    <ListContext.Provider value={contextValue}>
      <MenuItem {...props} id={id} ref={ref} />
    </ListContext.Provider>
  );
}) as ExtendMenuItem<MenuItemTypeMap>;

StableMenuItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  id: PropTypes.string,
} as any;

export default StableMenuItem;
