'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import Menu2SubmenuPopup, { Menu2SubmenuPopupProps } from '../Unstable_Menu2/Menu2SubmenuPopup';
import { useDefaultProps } from '../DefaultPropsProvider';
import { SlotProps } from '../Unstable_Menu2/menu2Utils';
import { menu2SubmenuTriggerClasses } from '../Unstable_Menu2/menu2Classes';

export interface Menu2SubmenuSlots extends NonNullable<Menu2SubmenuPopupProps['slots']> {}

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
   * The element that opens the submenu, for example a `Menu2Item`.
   *
   * The trigger behavior merges into this element, the same as the root menu.
   * A submenu trigger is a menu item, so pass an item rather than a button.
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

  const popupSlots = slots;
  const { trigger: triggerSlotProps, ...popupSlotProps } = slotProps ?? {};
  const resolvedTriggerProps = resolveComponentProps(triggerSlotProps, themedProps);

  const triggerNode =
    trigger == null ? null : (
      <BaseMenu.SubmenuTrigger
        render={trigger}
        // A submenu trigger must never close the menu. The caller usually passes
        // a `Menu2Item`, which closes on click by default. `SubmenuTrigger` does
        // not declare this prop; Base UI forwards it to the rendered element.
        {...({ closeOnClick: false } as Record<string, unknown>)}
        {...resolvedTriggerProps}
        className={(state) =>
          clsx(
            menu2SubmenuTriggerClasses.root,
            state.open && menu2SubmenuTriggerClasses.open,
            resolvedTriggerProps?.className,
          )
        }
      />
    );

  return (
    <BaseMenu.SubmenuRoot {...rootProps}>
      {triggerNode}
      <Menu2SubmenuPopup
        ref={ref}
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
    trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
   * The element that opens the submenu, for example a `Menu2Item`.
   *
   * The trigger behavior merges into this element, the same as the root menu.
   * A submenu trigger is a menu item, so pass an item rather than a button.
   */
  trigger: PropTypes.element,
} as any;

export default Menu2Submenu;
