import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import { useMenuItem } from '@mui/base/MenuItemUnstyled';
import ListItemButton from '../ListItemButton';
import { styled, useThemeProps } from '../styles';
import { getMenuItemUtilityClass } from './menuItemClasses';
import { MenuItemProps, ExtendMenuItem, MenuItemTypeMap } from './MenuItemProps';

const useUtilityClasses = () => {
  const slots = { root: ['root'] };

  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, {});

  return composedClasses;
};

const MenuItemRoot = styled(ListItemButton, {
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuItemProps; component?: React.ElementType }>({});

const MenuItem = React.forwardRef(function MenuItem(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMenuItem',
  });

  const { children, className, disabled: disabledProp = false, selected, role, ...other } = props;

  const { getRootProps, disabled, focusVisible } = useMenuItem({
    disabled: disabledProp,
    ref,
  });

  const ownerState = {
    ...props,
    disabled,
    focusVisible,
  };

  const classes = useUtilityClasses();

  const rootProps = useSlotProps({
    elementType: MenuItemRoot,
    getSlotProps: getRootProps,
    externalSlotProps: {},
    externalForwardedProps: {
      ...other,
      ...((role === 'menuitemradio' || role === 'menuitemcheckbox') && {
        'aria-checked': selected ? 'true' : 'false',
      }),
    },
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
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['context', 'danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default MenuItem;
