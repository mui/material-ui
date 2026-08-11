'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import Menu2Popup, { Menu2PopupProps } from './Menu2Popup';
import Menu2Trigger from './Menu2Trigger';
import { useDefaultProps } from '../DefaultPropsProvider';
import { menu2TriggerClasses } from './menu2Classes';
import { SlotProps } from './menu2Utils';

export interface Menu2Slots extends NonNullable<Menu2PopupProps['slots']> {
  /**
   * The component that renders the trigger, when `trigger` is not an element.
   * @default Menu2Trigger
   */
  trigger?: React.ElementType | undefined;
}

export interface Menu2SlotProps extends NonNullable<Menu2PopupProps['slotProps']> {
  trigger?: SlotProps<Record<string, any>, Menu2Props> | undefined;
}

/**
 * Inherits the Base UI `Menu.Root` prop surface (open/close control, modality,
 * `actionsRef`, keyboard behavior) plus the popup's positioning and appearance
 * props, so one menu is one component. `Omit` (a mapped type) is used instead
 * of bare `extends` so the proptypes generator resolves the inherited members.
 */
export interface Menu2Props
  extends
    Omit<BaseMenu.Root.Props, 'children'>,
    Omit<Menu2PopupProps, 'children' | 'slots' | 'slotProps'> {
  /**
   * The menu items.
   */
  children?: React.ReactNode;
  /**
   * The content that opens the menu.
   *
   * A single element becomes the trigger itself: the trigger behavior merges
   * into it, so it keeps whatever component you passed. Any other node, such as
   * text, a fragment, or several nodes, renders inside the default trigger.
   * Omit it and drive the menu with `open` and `anchor` instead, which is the
   * classic controlled pattern.
   */
  trigger?: React.ReactNode;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2Slots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2SlotProps | undefined;
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 */
const Menu2 = React.forwardRef(function Menu2(
  props: Menu2Props,
  // The popup surface is the element callers reach for, the way the classic
  // Menu's ref lands on its Paper.
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const themedProps = useDefaultProps({
    props,
    name: 'MuiMenu2',
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

  // A fragment is a valid element but cannot take the trigger's props or ref,
  // so it counts as content and goes inside the default trigger.
  const triggerIsElement = React.isValidElement(trigger) && trigger.type !== React.Fragment;

  let triggerNode: React.ReactNode = null;
  if (trigger != null) {
    triggerNode = triggerIsElement ? (
      // Base UI's `render` merges the trigger behavior into the element, so the
      // caller keeps whatever component they passed.
      <BaseMenu.Trigger
        render={trigger}
        {...resolvedTriggerProps}
        className={(state) =>
          clsx(
            menu2TriggerClasses.root,
            state.open && menu2TriggerClasses.open,
            resolvedTriggerProps?.className,
          )
        }
      />
    ) : (
      <Menu2Trigger
        slots={triggerSlot ? { root: triggerSlot } : undefined}
        {...resolvedTriggerProps}
      >
        {trigger}
      </Menu2Trigger>
    );
  }

  return (
    <BaseMenu.Root {...rootProps}>
      {triggerNode}
      <Menu2Popup
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
      </Menu2Popup>
    </BaseMenu.Root>
  );
});

Menu2.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The menu items.
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
    backdrop: PropTypes.elementType,
    list: PropTypes.elementType,
    paper: PropTypes.elementType,
    popup: PropTypes.elementType,
    portal: PropTypes.elementType,
    positioner: PropTypes.elementType,
    trigger: PropTypes.elementType,
  }),
  /**
   * The content that opens the menu.
   *
   * A single element becomes the trigger itself: the trigger behavior merges
   * into it, so it keeps whatever component you passed. Any other node, such as
   * text, a fragment, or several nodes, renders inside the default trigger.
   * Omit it and drive the menu with `open` and `anchor` instead, which is the
   * classic controlled pattern.
   */
  trigger: PropTypes.node,
} as any;

export default Menu2;
