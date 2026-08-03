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
   * The element that opens the menu.
   *
   * An element is rendered as-is with the trigger behavior merged into it, so
   * it keeps whatever component you passed. Anything else renders inside the
   * default trigger. Omit it and drive the menu with `open` and `anchor`
   * instead, which is the classic controlled pattern.
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
function Menu2(props: Menu2Props): React.JSX.Element {
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

  let triggerNode: React.ReactNode = null;
  if (trigger != null) {
    triggerNode = React.isValidElement(trigger) ? (
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
}

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
  slotProps: PropTypes.object,
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.object,
  /**
   * The element that opens the menu.
   */
  trigger: PropTypes.node,
} as any;

export default Menu2;
