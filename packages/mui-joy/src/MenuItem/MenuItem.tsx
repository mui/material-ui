import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import useMenuItem from '@mui/base/useMenuItem';
import { StyledListItemButton } from '../ListItemButton/ListItemButton';
import { styled, useThemeProps } from '../styles';
import { useColorInversion } from '../styles/ColorInversion';
import { getMenuItemUtilityClass } from './menuItemClasses';
import { MenuItemOwnerState, ExtendMenuItem, MenuItemTypeMap } from './MenuItemProps';
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
const MenuItem = React.forwardRef(function MenuItem(inProps, ref) {
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
    color: colorProp = selected ? 'primary' : 'neutral',
    orientation = 'horizontal',
    variant = 'plain',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const { getRootProps, disabled, focusVisible } = useMenuItem({
    disabled: disabledProp,
    ref,
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
}) as ExtendMenuItem<MenuItemTypeMap>;

MenuItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default selected ? 'primary' : 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
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
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default MenuItem;
