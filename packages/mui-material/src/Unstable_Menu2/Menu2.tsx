'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import Menu2Popup, { Menu2PopupProps } from './Menu2Popup';
import { useDefaultProps } from '../DefaultPropsProvider';
import { menu2TriggerClasses } from './menu2Classes';
import { SlotProps } from './menu2Utils';

export interface Menu2Slots extends NonNullable<Menu2PopupProps['slots']> {}

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
   * The element that opens the menu, for example a `Button`.
   *
   * The trigger behavior merges into this element, so it keeps the component
   * that you passed. Omit it and drive the menu with `open` and `anchor`
   * instead, which is the classic controlled pattern.
   */
  trigger?: React.ReactElement | undefined;
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

  const popupSlots = slots;
  const { trigger: triggerSlotProps, ...popupSlotProps } = slotProps ?? {};
  const resolvedTriggerProps = resolveComponentProps(triggerSlotProps, themedProps);

  if (process.env.NODE_ENV !== 'production' && trigger != null) {
    // A fragment is an element, so the type does not catch it. Base UI cannot
    // merge the trigger behavior into a fragment, and the trigger renders as
    // bare content instead.
    if ((trigger as React.ReactElement).type === React.Fragment) {
      console.error(
        'MUI: The `trigger` prop of `Menu2` cannot be a fragment. ' +
          'Pass a single element, for example a `Button`.',
      );
    }
  }

  // A wrapper that does not forward the ref also swallows the trigger
  // behavior, and nothing else reports it. An unset ref proves the element
  // never received what Base UI merged into it.
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && trigger != null && triggerRef.current == null) {
      console.error(
        'MUI: The `trigger` element of `Menu2` did not receive a ref. ' +
          'A component used as the trigger must forward its props and its ref to ' +
          'the element that it renders, the way Tooltip does. Without them the ' +
          'menu behavior does not reach the element.',
      );
    }
  }, [trigger]);

  const triggerNode =
    trigger == null ? null : (
      // Base UI's `render` merges the trigger behavior into the element, so the
      // caller keeps whatever component they passed.
      <BaseMenu.Trigger
        ref={triggerRef}
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
    );

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
  }),
  /**
   * The element that opens the menu, for example a `Button`.
   *
   * The trigger behavior merges into this element, so it keeps the component
   * that you passed. Omit it and drive the menu with `open` and `anchor`
   * instead, which is the classic controlled pattern.
   */
  trigger: PropTypes.element,
} as any;

export default Menu2;
