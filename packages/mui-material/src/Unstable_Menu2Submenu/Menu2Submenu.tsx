'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import Menu2SubmenuPopup, { Menu2SubmenuPopupProps } from '../Unstable_Menu2SubmenuPopup';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';
import { useDefaultProps } from '../DefaultPropsProvider';
import { SlotProps } from '../Unstable_Menu2/menu2Utils';

export interface Menu2SubmenuSlots extends NonNullable<Menu2SubmenuPopupProps['slots']> {
  /**
   * The component that renders the trigger, when `trigger` is not an element.
   * @default Menu2SubmenuTrigger
   */
  trigger?: React.ElementType | undefined;
}

export interface Menu2SubmenuSlotProps extends NonNullable<Menu2SubmenuPopupProps['slotProps']> {
  trigger?: SlotProps<Record<string, any>, Menu2SubmenuProps> | undefined;
}

/**
 * The submenu counterpart of `Menu2`, with the same shape: a prop-only root,
 * the trigger passed as a prop, and the children forming the popup.
 */
export interface Menu2SubmenuProps
  extends
    Omit<BaseMenu.SubmenuRoot.Props, 'children'>,
    Omit<Menu2SubmenuPopupProps, 'children' | 'slots' | 'slotProps'> {
  /**
   * The submenu items.
   */
  children?: React.ReactNode;
  /**
   * The content of the item that opens the submenu.
   *
   * Unlike the root menu, this is the label rather than the element: a submenu
   * trigger is always a menu item, so passing one would nest an item inside an
   * item. Swap the component through `slots.trigger` instead.
   */
  trigger?: React.ReactNode;
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
function Menu2Submenu(props: Menu2SubmenuProps): React.JSX.Element {
  const themedProps = useDefaultProps({
    props,
    name: 'MuiMenu2Submenu',
  });

  const {
    children,
    trigger,
    slots,
    slotProps,
    // The popup surface, hoisted onto the root.
    align,
    alignOffset,
    anchor,
    arrowPadding,
    classes,
    className,
    collisionAvoidance,
    collisionBoundary,
    collisionPadding,
    container,
    disableAnchorTracking,
    elevation,
    finalFocus,
    keepMounted,
    positionMethod,
    side,
    sideOffset,
    sticky,
    style,
    sx,
    ...rootProps
  } = themedProps;

  const { trigger: triggerSlot, ...popupSlots } = slots ?? {};
  const { trigger: triggerSlotProps, ...popupSlotProps } = slotProps ?? {};
  const resolvedTriggerProps = resolveComponentProps(triggerSlotProps, themedProps);

  const triggerNode =
    trigger == null ? null : (
      <Menu2SubmenuTrigger
        slots={triggerSlot ? { root: triggerSlot } : undefined}
        {...resolvedTriggerProps}
      >
        {trigger}
      </Menu2SubmenuTrigger>
    );

  return (
    <BaseMenu.SubmenuRoot {...rootProps}>
      {triggerNode}
      <Menu2SubmenuPopup
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        arrowPadding={arrowPadding}
        classes={classes}
        className={className}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        container={container}
        disableAnchorTracking={disableAnchorTracking}
        elevation={elevation}
        finalFocus={finalFocus}
        keepMounted={keepMounted}
        positionMethod={positionMethod}
        side={side}
        sideOffset={sideOffset}
        slotProps={popupSlotProps}
        slots={popupSlots}
        sticky={sticky}
        style={style}
        sx={sx}
      >
        {children}
      </Menu2SubmenuPopup>
    </BaseMenu.SubmenuRoot>
  );
}

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
  slotProps: PropTypes.object,
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.object,
  /**
   * The item that opens the submenu.
   */
  trigger: PropTypes.node,
} as any;

export default Menu2Submenu;
