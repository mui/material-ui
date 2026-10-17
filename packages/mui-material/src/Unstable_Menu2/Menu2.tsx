'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import HTMLElementType from '@mui/utils/HTMLElementType';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import { useRtl } from '@mui/system/RtlProvider';
import { DirectionProvider } from '@base-ui/react/direction-provider';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import Menu2Popup, { Menu2PopupProps } from './Menu2Popup';
import { useDefaultProps } from '../DefaultPropsProvider';
import Menu2Trigger from '../Unstable_Menu2Trigger';
import { SlotProps } from './menu2Utils';

export interface Menu2Slots extends NonNullable<Menu2PopupProps['slots']> {}

// The trigger element owns its own props. The slot carries only what the
// merged trigger behavior needs: the native-button hint, plus the class name
// and the ref that the merge composes.
export interface Menu2TriggerSlotProps extends Pick<BaseMenu.Trigger.Props, 'nativeButton'> {
  className?: string | undefined;
  ref?: React.Ref<HTMLElement> | undefined;
}

export interface Menu2SlotProps<Payload = unknown> extends NonNullable<
  Menu2PopupProps<Payload>['slotProps']
> {
  trigger?: SlotProps<Menu2TriggerSlotProps, Menu2Props<Payload>> | undefined;
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
export interface Menu2Props<Payload = unknown>
  // Horizontal menus are not supported. The trigger element owns its
  // remaining props.
  extends
    Pick<
      BaseMenu.Root.Props<Payload>,
      | 'actionsRef'
      | 'defaultOpen'
      | 'defaultTriggerId'
      | 'disabled'
      | 'handle'
      | 'highlightItemOnHover'
      | 'loopFocus'
      | 'modal'
      | 'open'
      | 'triggerId'
    >,
    Pick<BaseMenu.Trigger.Props, 'closeDelay' | 'delay' | 'openOnHover'>,
    Omit<Menu2PopupProps<Payload>, 'children' | 'slots' | 'slotProps'> {
  /**
   * The menu items, or a function that receives the active trigger's payload.
   */
  children?: BaseMenu.Root.Props<Payload>['children'] | undefined;
  /**
   * Event handler called when the menu is opened or closed.
   * @param {boolean} open The new open state.
   * @param {object} eventDetails The reason for the change and the native event.
   */
  onOpenChange?: BaseMenu.Root.Props['onOpenChange'] | undefined;
  /**
   * Event handler called after the opening or closing animation completes.
   * @param {boolean} open Whether the menu is open.
   */
  onOpenChangeComplete?: BaseMenu.Root.Props['onOpenChangeComplete'] | undefined;
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
  slotProps?: Menu2SlotProps<Payload> | undefined;
}

interface Menu2Component extends Pick<
  React.ForwardRefExoticComponent<Menu2Props & React.RefAttributes<HTMLDivElement>>,
  'propTypes' | 'displayName'
> {
  <Payload = unknown>(
    props: Menu2Props<Payload> & React.RefAttributes<HTMLDivElement>,
  ): React.JSX.Element;
}

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2 API](https://next.mui.com/material-ui/api/menu-2/)
 */
const Menu2 = React.forwardRef(function Menu2<Payload>(
  props: Menu2Props<Payload>,
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
    defaultTriggerId,
    delay,
    disabled,
    handle,
    highlightItemOnHover,
    loopFocus,
    modal,
    onOpenChange,
    onOpenChangeComplete,
    open,
    openOnHover,
    triggerId,
    ...popupProps
  } = themedProps;

  const { trigger: triggerSlotProps, ...popupSlotProps } = slotProps ?? {};
  const resolvedTriggerProps = resolveComponentProps(triggerSlotProps, themedProps);

  const triggerNode =
    trigger == null ? null : (
      <Menu2Trigger
        openOnHover={openOnHover}
        delay={delay}
        closeDelay={closeDelay}
        {...resolvedTriggerProps}
      >
        {trigger}
      </Menu2Trigger>
    );

  return (
    <DirectionProvider direction={isRtl ? 'rtl' : 'ltr'}>
      <BaseMenu.Root
        actionsRef={actionsRef}
        defaultOpen={defaultOpen}
        defaultTriggerId={defaultTriggerId}
        disabled={disabled}
        handle={handle}
        highlightItemOnHover={highlightItemOnHover}
        loopFocus={loopFocus}
        modal={modal}
        onOpenChange={onOpenChange}
        onOpenChangeComplete={onOpenChangeComplete}
        open={open}
        triggerId={triggerId}
      >
        {(state) => (
          <React.Fragment>
            {triggerNode}
            <Menu2Popup
              {...popupProps}
              ref={ref}
              ownerState={themedProps}
              slotProps={popupSlotProps}
              slots={slots}
            >
              {typeof children === 'function' ? children(state) : children}
            </Menu2Popup>
          </React.Fragment>
        )}
      </BaseMenu.Root>
    </DirectionProvider>
  );
}) as Menu2Component;

Menu2.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref to imperative actions.
   * - `unmount`: Ends the closing phase of the menu after an externally controlled closing animation finishes.
   *   Call `preventUnmountOnClose()` in `onOpenChange` first, otherwise the menu completes closing on its own.
   *   Whether it leaves the DOM is decided by `keepMounted` on the portal.
   * - `close`: Closes the menu imperatively when called.
   */
  actionsRef: PropTypes.shape({
    current: PropTypes.shape({
      close: PropTypes.func.isRequired,
      unmount: PropTypes.func.isRequired,
    }),
  }),
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
   * The menu items, or a function that receives the active trigger's payload.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * CSS class applied to the root element, which contains the menu and its backdrops.
   */
  className: PropTypes.string,
  /**
   * How long to wait before closing the menu that was opened on hover.
   * Specified in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay: PropTypes.number,
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
   * Whether the menu is initially open.
   *
   * To render a controlled menu, use the `open` prop instead.
   * @default false
   */
  defaultOpen: PropTypes.bool,
  /**
   * ID of the trigger that the menu is associated with.
   * This is useful in conjunction with the `defaultOpen` prop to create an initially open menu.
   */
  defaultTriggerId: PropTypes.string,
  /**
   * How long to wait before the menu may be opened on hover. Specified in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */
  delay: PropTypes.number,
  /**
   * Whether to disable the popup from tracking layout shifts of its positioning anchor.
   * @default false
   */
  disableAnchorTracking: PropTypes.bool,
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: PropTypes.bool,
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
   * A handle to associate the menu with a trigger.
   * If specified, allows external triggers to control the menu's open state.
   */
  handle: PropTypes /* @typescript-to-proptypes-ignore */.object,
  /**
   * Whether moving the pointer over items should highlight them.
   * Disabling this prop allows CSS `:hover` to be differentiated from the `:focus` (`data-highlighted`) state.
   * @default true
   */
  highlightItemOnHover: PropTypes.bool,
  /**
   * Whether to keep the portal mounted in the DOM while the popup is hidden.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Whether to loop keyboard focus back to the first item
   * when the end of the list is reached while using the arrow keys.
   * @default true
   */
  loopFocus: PropTypes.bool,
  /**
   * Determines if the menu enters a modal state when open.
   * - `true`: user interaction is limited to the menu: document page scroll is locked and pointer interactions on outside elements are disabled.
   * - `false`: user interaction with the rest of the document is allowed.
   *
   * On touch devices, a `true` modal blocks outside taps but leaves the page scrollable unless the popup spans nearly the full viewport width, matching native iOS behavior.
   *
   * Nested menus ignore this prop, and menus opened by hover are never modal.
   * @default true
   */
  modal: PropTypes.bool,
  /**
   * Event handler called when the menu is opened or closed.
   * @param {boolean} open The new open state.
   * @param {object} eventDetails The reason for the change and the native event.
   */
  onOpenChange: PropTypes.func,
  /**
   * Event handler called after the opening or closing animation completes.
   * @param {boolean} open Whether the menu is open.
   */
  onOpenChangeComplete: PropTypes.func,
  /**
   * Whether the menu is currently open.
   */
  open: PropTypes.bool,
  /**
   * Whether the menu should also open when the trigger is hovered.
   */
  openOnHover: PropTypes.bool,
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
  /**
   * ID of the trigger that the menu is associated with.
   * This is useful in conjunction with the `open` prop to create a controlled menu.
   * There's no need to specify this prop when the menu is uncontrolled (that is, when the `open` prop is not set).
   */
  triggerId: PropTypes.string,
} as any;

export default Menu2;
