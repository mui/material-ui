'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import Menu2SubmenuPopup, { Menu2SubmenuPopupProps } from '../Unstable_Menu2/Menu2SubmenuPopup';
import { useDefaultProps } from '../DefaultPropsProvider';

export interface Menu2SubmenuSlots extends NonNullable<Menu2SubmenuPopupProps['slots']> {}

export interface Menu2SubmenuSlotProps extends NonNullable<Menu2SubmenuPopupProps['slotProps']> {}

/**
 * The submenu counterpart of `Menu2`, with the same shape: a prop-only root,
 * the trigger passed as a prop, and the children forming the popup.
 * HTML attributes and event handlers are forwarded to the popup element.
 */
export interface Menu2SubmenuProps
  // `Pick` names each prop the submenu forwards, the same way `Menu2` does.
  // `orientation` is not picked: a submenu is always vertical.
  extends
    Pick<
      BaseMenu.SubmenuRoot.Props,
      | 'actionsRef'
      | 'closeParentOnEsc'
      | 'defaultOpen'
      | 'disabled'
      | 'highlightItemOnHover'
      | 'loopFocus'
      | 'onOpenChange'
      | 'onOpenChangeComplete'
      | 'open'
    >,
    Omit<Menu2SubmenuPopupProps, 'children' | 'slots' | 'slotProps'> {
  /**
   * The submenu items.
   */
  children?: React.ReactNode;
  /**
   * The `Menu2SubmenuTrigger` that opens the submenu, optionally wrapped in a `Tooltip`.
   *
   * The element is rendered as-is. Put trigger props on `Menu2SubmenuTrigger`.
   */
  trigger?: React.ReactElement | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2SubmenuSlots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2SubmenuSlotProps | undefined;
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 */
const Menu2Submenu = React.forwardRef(function Menu2Submenu(
  props: Menu2SubmenuProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const themedProps = useDefaultProps({
    props,
    name: 'MuiMenu2Submenu',
  });

  const {
    children,
    trigger,
    slots,
    slotProps,
    // Keep behavior on the renderless root and forward the rest to the popup.
    actionsRef,
    closeParentOnEsc,
    defaultOpen,
    disabled,
    highlightItemOnHover,
    loopFocus,
    onOpenChange,
    onOpenChangeComplete,
    open,
    ...popupProps
  } = themedProps;

  return (
    <BaseMenu.SubmenuRoot
      actionsRef={actionsRef}
      closeParentOnEsc={closeParentOnEsc}
      defaultOpen={defaultOpen}
      disabled={disabled}
      highlightItemOnHover={highlightItemOnHover}
      loopFocus={loopFocus}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
    >
      {trigger}
      <Menu2SubmenuPopup {...popupProps} ref={ref} slotProps={slotProps} slots={slots}>
        {children}
      </Menu2SubmenuPopup>
    </BaseMenu.SubmenuRoot>
  );
});

Menu2Submenu.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The submenu items.
   */
  children: PropTypes.node,
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    list: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popup: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    portal: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    positioner: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    list: PropTypes.elementType,
    paper: PropTypes.elementType,
    popup: PropTypes.elementType,
    portal: PropTypes.elementType,
    positioner: PropTypes.elementType,
  }),
  /**
   * The `Menu2SubmenuTrigger` that opens the submenu, optionally wrapped in a `Tooltip`.
   *
   * The element is rendered as-is. Put trigger props on `Menu2SubmenuTrigger`.
   */
  trigger: PropTypes.element,
} as any;

export default Menu2Submenu;
