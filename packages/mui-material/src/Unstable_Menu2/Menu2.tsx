'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useForkRef from '@mui/utils/useForkRef';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import Menu2Popup, { Menu2PopupProps } from './Menu2Popup';
import { useDefaultProps } from '../DefaultPropsProvider';
import { menu2TriggerClasses } from './menu2Classes';
import { SlotProps, warnMenu2FragmentTrigger, warnMenu2TriggerRef } from './menu2Utils';

export interface Menu2Slots extends NonNullable<Menu2PopupProps['slots']> {}

export interface Menu2SlotProps extends NonNullable<Menu2PopupProps['slotProps']> {
  trigger?: SlotProps<Record<string, any>, Menu2Props> | undefined;
}

/**
 * Inherits the Base UI `Menu.Root` prop surface (open/close control, modality,
 * `actionsRef`, keyboard behavior) plus the popup's positioning and appearance
 * props, so one menu is one component. `Omit` (a mapped type) is used instead
 * of bare `extends` so the proptypes generator resolves the inherited members.
 * HTML attributes and event handlers are forwarded to the popup element.
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
  // The public ref targets the semantic popup. Use slotProps.paper.ref for Paper.
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
    // Only behavior props belong on the renderless root. All remaining props,
    // including DOM attributes and event handlers, belong on the popup.
    actionsRef,
    closeParentOnEsc,
    defaultOpen,
    defaultTriggerId,
    disabled,
    handle,
    highlightItemOnHover,
    loopFocus,
    modal,
    onOpenChange,
    onOpenChangeComplete,
    open,
    orientation,
    triggerId,
    ...popupProps
  } = themedProps;

  const popupSlots = slots;
  const { trigger: triggerSlotProps, ...popupSlotProps } = slotProps ?? {};
  const resolvedTriggerProps = resolveComponentProps(triggerSlotProps, themedProps);

  if (process.env.NODE_ENV !== 'production') {
    warnMenu2FragmentTrigger(trigger, 'Menu2', 'Button');
  }

  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
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
        {...resolvedTriggerProps}
        ref={handleTriggerRef}
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
    <BaseMenu.Root
      actionsRef={actionsRef}
      closeParentOnEsc={closeParentOnEsc}
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
      orientation={orientation}
      triggerId={triggerId}
    >
      {triggerNode}
      <Menu2Popup {...popupProps} ref={ref} slotProps={popupSlotProps} slots={popupSlots}>
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
