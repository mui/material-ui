import * as React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementType, refType } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import MenuUnstyledContext from './MenuUnstyledContext';
import {
  MenuUnstyledOwnerState,
  MenuUnstyledProps,
  MenuUnstyledRootSlotProps,
  MenuUnstyledTypeMap,
} from './MenuUnstyled.types';
import { getMenuUnstyledUtilityClass } from './menuUnstyledClasses';
import useMenu from '../useMenu';
import composeClasses from '../composeClasses';
import PopperUnstyled from '../PopperUnstyled';
import useSlotProps from '../utils/useSlotProps';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { WithOptionalOwnerState } from '../utils';

function useUtilityClasses(ownerState: MenuUnstyledOwnerState) {
  const { open } = ownerState;
  const slots = {
    root: ['root', open && 'expanded'],
    listbox: ['listbox', open && 'expanded'],
  };

  return composeClasses(slots, useClassNamesOverride(getMenuUnstyledUtilityClass));
}
/**
 *
 * Demos:
 *
 * - [Unstyled Menu](https://mui.com/base/react-menu/)
 *
 * API:
 *
 * - [MenuUnstyled API](https://mui.com/base/react-menu/components-api/#menu-unstyled)
 */
const MenuUnstyled = React.forwardRef(function MenuUnstyled<
  BaseComponentType extends React.ElementType = MenuUnstyledTypeMap['defaultComponent'],
>(props: MenuUnstyledProps<BaseComponentType>, forwardedRef: React.Ref<any>) {
  const {
    actions,
    anchorEl,
    children,
    component,
    keepMounted = false,
    listboxId,
    onClose,
    open = false,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const { contextValue, getListboxProps, highlightFirstItem, highlightLastItem } = useMenu({
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

  const ownerState: MenuUnstyledOwnerState = {
    ...props,
    open,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = component ?? slots.root ?? PopperUnstyled;
  const rootProps: WithOptionalOwnerState<MenuUnstyledRootSlotProps> = useSlotProps({
    elementType: Root,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      anchorEl,
      open,
      keepMounted,
      role: undefined,
      ref: forwardedRef,
    },
    className: classes.root,
    ownerState,
  });

  const Listbox = slots.listbox ?? 'ul';
  const listboxProps = useSlotProps({
    elementType: Listbox,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    ownerState,
    className: classes.listbox,
  });

  return (
    <Root {...rootProps}>
      <Listbox {...listboxProps}>
        <MenuUnstyledContext.Provider value={contextValue}>{children}</MenuUnstyledContext.Provider>
      </Listbox>
    </Root>
  );
}) as OverridableComponent<MenuUnstyledTypeMap>;

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Always keep the menu in the DOM.
   * This prop can be useful in SEO situation or when you want to maximize the responsiveness of the Menu.
   *
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * @ignore
   */
  listboxId: PropTypes.string,
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onClose: PropTypes.func,
  /**
   * Controls whether the menu is displayed.
   * @default false
   */
  open: PropTypes.bool,
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps: PropTypes.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Menu.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
} as any;

export default MenuUnstyled;
