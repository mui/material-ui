'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import HTMLElementType from '@mui/utils/HTMLElementType';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import useEventCallback from '@mui/utils/useEventCallback';
import Menu2SubmenuPopup, { Menu2SubmenuPopupProps } from '../Unstable_Menu2/Menu2SubmenuPopup';
import Menu2SubmenuClosingContext from '../Unstable_Menu2/Menu2SubmenuClosingContext';
import { useDefaultProps } from '../DefaultPropsProvider';

export interface Menu2SubmenuSlots extends NonNullable<Menu2SubmenuPopupProps['slots']> {}

export interface Menu2SubmenuSlotProps extends NonNullable<Menu2SubmenuPopupProps['slotProps']> {}

/**
 * The submenu counterpart of `Menu2`, with the same shape: a prop-only root,
 * the trigger passed as a prop, and the children forming the popup.
 * HTML attributes are forwarded to the positioned root. The accessible name,
 * description, and event handlers attach to the popup with `role="menu"`.
 * Use `slotProps.paper` for other attributes on the popup.
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

// With these close reasons the pointer is on another row, so focus does not return.
const pointerLeaveReasons = new Set<string>(['trigger-hover', 'sibling-open']);

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
    highlightItemOnHover,
    loopFocus,
    onOpenChange,
    onOpenChangeComplete,
    open,
    ...popupProps
  } = themedProps;

  // Keep the exit tint for focus return, but clear it when the pointer leaves.
  const [closing, setClosing] = React.useState(false);
  const [retainClosingTint, setRetainClosingTint] = React.useState(true);
  const handleOpenChange = useEventCallback<NonNullable<Menu2SubmenuProps['onOpenChange']>>(
    (nextOpen, details) => {
      onOpenChange?.(nextOpen, details);
      if (!details.isCanceled) {
        setRetainClosingTint(nextOpen || !pointerLeaveReasons.has(details.reason));
      }
    },
  );
  const handleClosingChange = useEventCallback((nextClosing: boolean) => {
    setClosing(nextClosing);
    if (closing && !nextClosing) {
      setRetainClosingTint(true);
    }
  });
  const closingContext = React.useMemo(
    () => ({ closing, retainClosingTint, onClosingChange: handleClosingChange }),
    [closing, retainClosingTint, handleClosingChange],
  );

  return (
    <BaseMenu.SubmenuRoot
      actionsRef={actionsRef}
      closeParentOnEsc={closeParentOnEsc}
      defaultOpen={defaultOpen}
      highlightItemOnHover={highlightItemOnHover}
      loopFocus={loopFocus}
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
    >
      <Menu2SubmenuClosingContext.Provider value={closingContext}>
        {trigger}
        <Menu2SubmenuPopup
          {...popupProps}
          ref={ref}
          ownerState={themedProps}
          slotProps={slotProps}
          slots={slots}
        >
          {children}
        </Menu2SubmenuPopup>
      </Menu2SubmenuClosingContext.Provider>
    </BaseMenu.SubmenuRoot>
  );
});

Menu2Submenu.propTypes /* remove-proptypes */ = {
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
   * By default, the popup is positioned against the submenu trigger.
   */
  anchor: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * The submenu items.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * CSS class applied to the root element, which positions the menu.
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
   * @default 'inline-end'
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
    list: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    list: PropTypes.elementType,
    paper: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType,
  }),
  /**
   * Whether to maintain the popup in the viewport after the anchor element was scrolled out of view.
   * @default false
   */
  sticky: PropTypes.bool,
  /**
   * Inline styles applied to the root element, which positions the menu.
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
   * The `Menu2SubmenuTrigger` that opens the submenu, optionally wrapped in a `Tooltip`.
   *
   * The element is rendered as-is. Put trigger props on `Menu2SubmenuTrigger`.
   */
  trigger: PropTypes.element,
} as any;

export default Menu2Submenu;
