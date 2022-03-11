import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/base/composeClasses';
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
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiMenuItem',
  });

  const { children, className, component = 'li', disabled = false, ...other } = props;

  const { getRootProps, itemState, focusVisible } = useMenuItem({ component, disabled, ref });

  const ownerState = {
    ...props,
    component,
    focusVisible,
  };

  const classes = useUtilityClasses();

  if (itemState == null) {
    return null;
  }

  return (
    <MenuItemRoot
      component={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      disabled={disabled}
      {...other}
      {...getRootProps(other)}
    >
      {children}
    </MenuItemRoot>
  );
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
