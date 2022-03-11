import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { useMenu, MenuUnstyledContext, MenuUnstyledContextType } from '@mui/base/MenuUnstyled';
import { styled, useThemeProps } from '../styles';
import { MenuTypeMap } from './MenuProps';
import { getMenuUtilityClass } from './menuClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMenuUtilityClass, {});
};

const MenuRoot = styled(PopperUnstyled)({
  zIndex: 1,
});

const Menu = React.forwardRef(function Menu(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiMenu',
  });

  const {
    actions,
    anchorEl,
    children,
    className,
    component,
    listboxRef,
    listboxId,
    onClose,
    open = false,
    ...other
  } = props;

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
    listboxRef,
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

  const classes = useUtilityClasses();

  const contextValue = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
    getListboxProps,
    open,
  } as MenuUnstyledContextType;

  return (
    <MenuRoot
      ref={ref}
      anchorEl={anchorEl}
      keepMounted
      open={open}
      role={undefined}
      className={clsx(classes.root, className)}
      {...other}
    >
      <MenuUnstyledContext.Provider value={contextValue}>{children}</MenuUnstyledContext.Provider>
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
