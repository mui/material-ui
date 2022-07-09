import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import { useMenu, MenuUnstyledContext, MenuUnstyledContextType } from '@mui/base/MenuUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import List from '../List';
import Sheet from '../Sheet';
import { styled, useThemeProps } from '../styles';
import { MenuTypeMap, MenuProps } from './MenuProps';
import { getMenuUtilityClass } from './menuClasses';
import MenuButtonContext from '../MenuButton/MenuButtonContext';

const useUtilityClasses = (ownerState: MenuProps) => {
  const { open } = ownerState;
  const slots = {
    root: ['root', open && 'expanded'],
    listbox: ['listbox', open && 'expanded'],
  };

  return composeClasses(slots, getMenuUtilityClass, {});
};

const MenuRoot = styled(PopperUnstyled, {
  name: 'MuiMenu',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  boxShadow: theme.vars.shadow.sm,
  borderRadius: theme.vars.radius.sm,
  paddingBlock: theme.spacing(0.75),
  zIndex: 1,
}));

const MenuListbox = styled(List, {
  name: 'MuiMenu',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})({});

const Menu = React.forwardRef(function Menu(inProps, ref) {
  const props = useThemeProps<typeof inProps>({
    props: inProps,
    name: 'MuiMenu',
  });
  const menuButton = React.useContext(MenuButtonContext);

  const {
    actions: actionsProp,
    anchorEl: anchorElProp,
    children,
    componentsProps = {},
    disablePortal = true,
    keepMounted = false,
    listboxId: listboxIdProp,
    onClose: onCloseProp,
    open: openProp,
    modifiers = [],
    variant = 'outlined',
    ...other
  } = props;

  const actions = useForkRef(actionsProp, menuButton?.actions);
  const listboxId = listboxIdProp ?? menuButton?.menuId;
  const anchorEl = anchorElProp ?? menuButton?.anchorEl;
  const open = openProp ?? menuButton?.open ?? false;
  const onClose = () => {
    onCloseProp?.();
    menuButton?.onClose();
  };

  const {
    registerItem,
    unregisterItem,
    getListboxProps,
    getItemProps,
    getItemState,
    highlightFirstItem,
    highlightLastItem,
  } = useMenu({
    open,
    onClose,
    listboxId,
  });

  React.useImperativeHandle(
    actions,
    () => ({
      highlightFirstItem,
      highlightLastItem,
    }),
    [highlightFirstItem, highlightLastItem],
  );

  const ownerState = {
    ...props,
    disablePortal,
    variant,
    modifiers,
    open,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: MenuRoot,
    externalForwardedProps: other,
    externalSlotProps: componentsProps.root,
    additionalProps: {
      anchorEl,
      open,
      disablePortal,
      keepMounted,
      role: undefined,
      ref,
      component: Sheet,
      variant,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
        ...modifiers,
      ],
    },
    className: classes.root,
    ownerState,
  });

  const listboxProps = useSlotProps({
    elementType: MenuListbox,
    getSlotProps: getListboxProps,
    externalSlotProps: componentsProps.listbox,
    ownerState,
    className: classes.listbox,
  });

  const contextValue: MenuUnstyledContextType = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
    getListboxProps,
    open,
  };

  return (
    <MenuRoot {...rootProps}>
      <MenuListbox {...listboxProps}>
        <MenuUnstyledContext.Provider value={contextValue}>{children}</MenuUnstyledContext.Provider>
      </MenuListbox>
    </MenuRoot>
  );
}) as OverridableComponent<MenuTypeMap>;

Menu.propTypes /* remove-proptypes */ = {
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
} as any;

export default Menu;
