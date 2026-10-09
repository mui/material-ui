'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import HTMLElementType from '@mui/utils/HTMLElementType';
import clsx from 'clsx';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useForkRef from '@mui/utils/useForkRef';
import { useRtl } from '@mui/system/RtlProvider';
import { DirectionProvider } from '@base-ui/react/direction-provider';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import Menu2Popup, { Menu2PopupProps } from './Menu2Popup';
import { useDefaultProps } from '../DefaultPropsProvider';
import { menu2TriggerClasses } from './menu2Classes';
import { SlotProps, warnMenu2FragmentTrigger, warnMenu2TriggerRef } from './menu2Utils';

export interface Menu2Slots extends NonNullable<Menu2PopupProps['slots']> {}

// The trigger element owns its own props. The slot carries only what the
// merged trigger behavior needs: the native-button hint, plus the class name
// and the ref that the merge composes.
export interface Menu2TriggerSlotProps extends Pick<BaseMenu.Trigger.Props, 'nativeButton'> {
  className?: string | undefined;
  ref?: React.Ref<HTMLElement> | undefined;
}

export interface Menu2SlotProps extends NonNullable<Menu2PopupProps['slotProps']> {
  trigger?: SlotProps<Menu2TriggerSlotProps, Menu2Props> | undefined;
}

/**
 * Picks the Base UI `Menu.Root` props that it forwards (open/close control,
 * modality, `actionsRef`, keyboard behavior), the `Menu.Trigger` hover props,
 * plus the popup's positioning and appearance props, so one menu is one
 * component. `Pick` names each forwarded prop, so a prop that a later Base UI
 * version adds reaches neither the type nor the popup DOM until Menu2 supports
 * it. The mapped type also lets the proptypes generator resolve the members.
 * HTML attributes are forwarded to the stacking root. The accessible name,
 * description, and event handlers attach to the popup with `role="menu"`.
 * Use `slotProps.paper` for other attributes on the popup.
 */
export interface Menu2Props
  // Not picked: `handle` needs `Menu.createHandle`, which Menu2 does not
  // export, and `triggerId`, `defaultTriggerId`, `orientation` serve detached
  // triggers and a horizontal menu, which are outside the contract. The
  // trigger element owns its remaining props.
  extends
    Pick<
      BaseMenu.Root.Props,
      | 'actionsRef'
      | 'defaultOpen'
      | 'disabled'
      | 'highlightItemOnHover'
      | 'loopFocus'
      | 'modal'
      | 'onOpenChange'
      | 'onOpenChangeComplete'
      | 'open'
    >,
    Pick<BaseMenu.Trigger.Props, 'closeDelay' | 'delay' | 'openOnHover'>,
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
  // The public ref targets the stacking root. Use slotProps.positioner.ref for
  // the positioned element or slotProps.paper.ref for the surface.
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const themedProps = useDefaultProps({
    props,
    name: 'MuiMenu2',
  });
  const isRtl = useRtl();

  const {
    children,
    trigger,
    slots,
    slotProps,
    // Only behavior props belong on the renderless root and the trigger. All
    // remaining props, including DOM attributes and event handlers, belong on
    // the popup.
    actionsRef,
    closeDelay,
    defaultOpen,
    delay,
    disabled,
    highlightItemOnHover,
    loopFocus,
    modal,
    onOpenChange,
    onOpenChangeComplete,
    open,
    openOnHover,
    ...popupProps
  } = themedProps;

  const { trigger: triggerSlotProps, ...popupSlotProps } = slotProps ?? {};
  const resolvedTriggerProps = resolveComponentProps(triggerSlotProps, themedProps);

  if (process.env.NODE_ENV !== 'production') {
    warnMenu2FragmentTrigger(trigger, 'Menu2', 'Button');
  }

  const triggerRef = React.useRef<HTMLElement | null>(null);
  const handleTriggerRef = useForkRef(triggerRef, resolvedTriggerProps?.ref);
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && triggerRef.current == null) {
      warnMenu2TriggerRef(trigger, 'Menu2');
    }
  }, [trigger]);

  const triggerNode =
    trigger == null ? null : (
      // Base UI's `render` merges the trigger behavior into the element, so the
      // caller keeps whatever component they passed.
      <BaseMenu.Trigger
        render={trigger}
        openOnHover={openOnHover}
        delay={delay}
        closeDelay={closeDelay}
        {...resolvedTriggerProps}
        ref={handleTriggerRef}
        className={(state) =>
          clsx(
            menu2TriggerClasses.root,
            state.disabled && menu2TriggerClasses.disabled,
            state.open && menu2TriggerClasses.open,
            resolvedTriggerProps?.className,
          )
        }
      />
    );

  return (
    <DirectionProvider direction={isRtl ? 'rtl' : 'ltr'}>
      <BaseMenu.Root
        actionsRef={actionsRef}
        defaultOpen={defaultOpen}
        disabled={disabled}
        highlightItemOnHover={highlightItemOnHover}
        loopFocus={loopFocus}
        modal={modal}
        onOpenChange={onOpenChange}
        onOpenChangeComplete={onOpenChangeComplete}
        open={open}
      >
        {triggerNode}
        <Menu2Popup
          {...popupProps}
          ref={ref}
          ownerState={themedProps}
          slotProps={popupSlotProps}
          slots={slots}
        >
          {children}
        </Menu2Popup>
      </BaseMenu.Root>
    </DirectionProvider>
  );
});

Menu2.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * How to align the popup relative to the specified side.
   * @default 'start'
   */
  align: PropTypes.oneOf(['center', 'end', 'start']),
  /**
   * Additional offset along the alignment axis in pixels.
   * @default 0
   */
  alignOffset: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /**
   * An element to position the popup against.
   *
   * By default, the popup is positioned against the trigger.
   */
  anchor: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * The menu items.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * CSS class applied to the root element, which contains the menu and its backdrops.
   */
  className: PropTypes.string,
  /**
   * Determines how to handle collisions when positioning the popup.
   */
  collisionAvoidance: PropTypes.oneOfType([
    PropTypes.shape({
      align: PropTypes.oneOf(['flip', 'none', 'shift']),
      fallbackAxisSide: PropTypes.oneOf(['end', 'none', 'start']),
      side: PropTypes.oneOf(['flip', 'none']),
    }),
    PropTypes.shape({
      align: PropTypes.oneOf(['none', 'shift']),
      fallbackAxisSide: PropTypes.oneOf(['end', 'none', 'start']),
      side: PropTypes.oneOf(['none', 'shift']),
    }),
  ]),
  /**
   * An element or a rectangle that delimits the area that the popup is confined to.
   * @default 'clipping-ancestors'
   */
  collisionBoundary: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['clipping-ancestors']),
    HTMLElementType,
    PropTypes.arrayOf(HTMLElementType),
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ]),
  /**
   * Additional space to maintain from the edge of the collision boundary.
   * @default 5
   */
  collisionPadding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number,
    }),
  ]),
  /**
   * The container element to portal the popup into.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * Whether to disable the popup from tracking layout shifts of its positioning anchor.
   * @default false
   */
  disableAnchorTracking: PropTypes.bool,
  /**
   * The elevation of the menu surface.
   * @default 8
   */
  elevation: PropTypes.number,
  /**
   * Determines the element to focus when the menu is closed.
   */
  finalFocus: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: HTMLElementType,
    }),
    PropTypes.bool,
  ]),
  /**
   * Whether to keep the portal mounted in the DOM while the popup is hidden.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Determines which CSS `position` property to use.
   * @default 'absolute'
   */
  positionMethod: PropTypes.oneOf(['absolute', 'fixed']),
  /**
   * Which side of the anchor element to align the popup against.
   * @default 'bottom'
   */
  side: PropTypes.oneOf(['bottom', 'inline-end', 'inline-start', 'left', 'right', 'top']),
  /**
   * Distance between the anchor and the popup in pixels.
   * @default 0
   */
  sideOffset: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    list: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    positioner: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    trigger: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        className: PropTypes.string,
        nativeButton: PropTypes.bool,
      }),
    ]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    list: PropTypes.elementType,
    paper: PropTypes.elementType,
    positioner: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType,
  }),
  /**
   * Whether to maintain the popup in the viewport after the anchor element was scrolled out of view.
   * @default false
   */
  sticky: PropTypes.bool,
  /**
   * Inline styles applied to the root element, which contains the menu and its backdrops.
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   * Applied to the root element. Use `slotProps.paper.sx` for the menu surface.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The transition duration in milliseconds, or separate enter and exit durations.
   * Set to 'auto' for height-dependent Grow timing, or 0 to disable the transition.
   * Ignored when slots.transition is null.
   * @default 'auto'
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
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
