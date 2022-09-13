import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import useMenuItem from '@mui/base/useMenuItem';
import { ListItemButtonRoot } from '../ListItemButton/ListItemButton';
import { styled, useThemeProps } from '../styles';
import { getMenuItemUtilityClass } from './menuItemClasses';
import {
  MenuItemProps,
  MenuItemOwnerState,
  ExtendMenuItem,
  MenuItemTypeMap,
} from './MenuItemProps';
import RowListContext from '../List/RowListContext';

const useUtilityClasses = (ownerState: MenuItemProps & { focusVisible: boolean }) => {
  const { focusVisible, disabled, selected } = ownerState;
  // Does not need to create state clases: focusVisible, disabled, and selected because ListItemButton already takes care of them.
  // Otherwise, there will be duplicated classes.
  const slots = {
    root: ['root', focusVisible && 'focusVisible', disabled && 'disabled', selected && 'selected'],
  };

  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, {});

  return composedClasses;
};

const MenuItemRoot = styled(ListItemButtonRoot, {
  name: 'JoyMenuItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuItemOwnerState }>({});

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
    color = selected ? 'primary' : 'neutral',
    variant = 'plain',
    ...other
  } = props;

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
    selected,
    row,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: MenuItemRoot,
    getSlotProps: getRootProps,
    externalSlotProps: {},
    additionalProps: {
      as: component,
    },
    externalForwardedProps: other,
    className: classes.root,
    ownerState,
  });

  return <MenuItemRoot {...rootProps}>{children}</MenuItemRoot>;
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
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['context', 'danger', 'info', 'neutral', 'primary', 'success', 'warning']),
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
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default MenuItem;
