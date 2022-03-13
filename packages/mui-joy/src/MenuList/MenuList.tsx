import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { useMenu, MenuUnstyledContext, MenuUnstyledContextType } from '@mui/base/MenuUnstyled';
import { styled, useThemeProps } from '../styles';
import List from '../List';
import { MenuListProps, MenuListTypeMap } from './MenuListProps';
import { getMenuListUtilityClass } from './menuListClasses';
import { useMenuPopup } from '../MenuPopup/MenuPopupContext';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenuListUtilityClass, {});
};

const MenuListRoot = styled(List, {
  name: 'MuiMenuList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuListProps; component?: React.ElementType }>(({ ownerState, theme }) => ({
  ...(ownerState.size === 'sm' && {
    '--List-padding': '0.25rem',
    '--List-divider-gap': '0.25rem',
  }),
  ...(ownerState.size === 'md' && {
    '--List-padding': '0.25rem',
    '--List-divider-gap': '0.25rem',
  }),
  ...(ownerState.size === 'lg' && {
    '--List-padding': '0.5rem',
    '--List-divider-gap': '0.5rem',
  }),
  '--List-radius': theme.vars.radius.sm,
  '--List-gap': '0px',
}));

const MenuList = React.forwardRef(function MenuList(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiMenuList',
  });
  const { open, onClose } = useMenuPopup();

  const {
    id,
    actions,
    children,
    className,
    component,
    size = 'md',
    onBlur,
    onKeyDown,
    ...other
  } = props;

  const { registerItem, unregisterItem, getListboxProps, getItemProps, getItemState } = useMenu({
    open,
    onClose,
    listboxRef: ref,
    listboxId: id,
  });

  const classes = useUtilityClasses();

  const contextValue = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
    open,
  } as MenuUnstyledContextType;

  const ownerState = {
    size,
    ...props,
  };

  const handlers: Record<string, React.EventHandler<any>> = {};
  if (onBlur) {
    handlers.onBlur = onBlur;
  }
  if (onKeyDown) {
    handlers.onKeyDown = onKeyDown;
  }

  return (
    <MenuListRoot
      component={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...getListboxProps(handlers)}
      {...other}
    >
      <MenuUnstyledContext.Provider value={contextValue}>{children}</MenuUnstyledContext.Provider>
    </MenuListRoot>
  );
}) as OverridableComponent<MenuListTypeMap>;

MenuList.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The size of the component (affect other nested list* components).
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
} as any;

export default MenuList;
