import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { HTMLElementType, refType } from '@mui/utils';
import appendOwnerState from '../utils/appendOwnerState';
import MenuUnstyledContext, { MenuUnstyledContextType } from './MenuUnstyledContext';
import {
  MenuUnstyledListboxSlotProps,
  MenuUnstyledOwnerState,
  MenuUnstyledProps,
  MenuUnstyledRootSlotProps,
} from './MenuUnstyled.types';
import { getMenuUnstyledUtilityClass } from './menuUnstyledClasses';
import useMenu from './useMenu';
import composeClasses from '../composeClasses';
import PopperUnstyled from '../PopperUnstyled';
import { WithOptionalOwnerState } from '../utils';

function getUtilityClasses(ownerState: MenuUnstyledOwnerState) {
  const { open } = ownerState;
  const slots = {
    root: ['root', open && 'expanded'],
    listbox: ['listbox', open && 'expanded'],
  };

  return composeClasses(slots, getMenuUnstyledUtilityClass, {});
}
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base/react-menu/)
 *
 * API:
 *
 * - [MenuUnstyled API](https://mui.com/base/api/menu-unstyled/)
 */
const MenuUnstyled = React.forwardRef(function MenuUnstyled(
  props: MenuUnstyledProps & React.HTMLAttributes<HTMLElement>,
  forwardedRef: React.Ref<any>,
) {
  const {
    actions,
    anchorEl,
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    keepMounted = false,
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
    listboxRef: componentsProps.listbox?.ref,
    listboxId: componentsProps.listbox?.id,
  });

  React.useImperativeHandle(
    actions,
    () => ({
      highlightFirstItem,
      highlightLastItem,
    }),
    [highlightFirstItem, highlightLastItem],
  );

  const ownerState: MenuUnstyledOwnerState = {
    ...props,
    open,
  };

  const classes = getUtilityClasses(ownerState);

  const Popper = component ?? components.Root ?? PopperUnstyled;
  const popperProps: MenuUnstyledRootSlotProps = appendOwnerState(
    Popper,
    {
      ...other,
      anchorEl,
      open,
      keepMounted,
      role: undefined,
      ...componentsProps.root,
      className: clsx(classes.root, className, componentsProps.root?.className),
    },
    ownerState,
  ) as MenuUnstyledRootSlotProps;

  const Listbox = components.Listbox ?? 'ul';
  const listboxProps: WithOptionalOwnerState<MenuUnstyledListboxSlotProps> = appendOwnerState(
    Listbox,
    {
      ...componentsProps.listbox,
      ...getListboxProps(),
      className: clsx(classes.listbox, componentsProps.listbox?.className),
    },
    ownerState,
  );

  const contextValue: MenuUnstyledContextType = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
    open,
  };

  return (
    <Popper {...popperProps} ref={forwardedRef}>
      <Listbox {...listboxProps}>
        <MenuUnstyledContext.Provider value={contextValue}>{children}</MenuUnstyledContext.Provider>
      </Listbox>
    </Popper>
  );
});

MenuUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref with imperative actions.
   * It allows to select the first or last menu item.
   */
  actions: refType,
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   */
  anchorEl: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.shape({
    listbox: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * Always keep the menu in the DOM.
   * This prop can be useful in SEO situation or when you want to maximize the responsiveness of the Menu.
   *
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onClose: PropTypes.func,
  /**
   * Controls whether the menu is displayed.
   * @default false
   */
  open: PropTypes.bool,
} as any;

export default MenuUnstyled;
