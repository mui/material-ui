import * as React from 'react';
import clsx from 'clsx';
import appendOwnerState from '@mui/utils/appendOwnerState';
import isHostComponent from '@mui/utils/isHostComponent';

export type StateClassName<State> = string | ((state: State) => string | undefined) | undefined;

export function resolveStateClassName<State>(
  className: StateClassName<State>,
  state: State,
): string | undefined {
  return typeof className === 'function' ? className(state) : className;
}

export function mergeStateClassName<State>(
  className: StateClassName<State>,
  getClassName: (state: State) => string | undefined,
) {
  return (state: State) => clsx(getClassName(state), resolveStateClassName(className, state));
}

export type SlotProps<SlotPropsValue, OwnerState> =
  SlotPropsValue | ((ownerState: OwnerState) => SlotPropsValue) | undefined;

export interface Menu2RootSlots {
  root?: React.ElementType | undefined;
}

export interface Menu2RootSlotProps<OwnerState> {
  root?: SlotProps<Record<string, any>, OwnerState>;
}

export function getMenu2RootRender<OwnerState>(
  RootSlot: React.ElementType,
  ownerState: OwnerState,
  props?: Record<string, any>,
  defaultRootSlot?: React.ElementType,
) {
  const rootProps = { ...(props ?? {}) };

  // These props are internal to `ButtonBase`. Only the default root reaches it,
  // so a custom slot would spread them onto the DOM and React would warn.
  if (defaultRootSlot != null && RootSlot !== defaultRootSlot) {
    delete rootProps.disableRipple;
    delete rootProps.suppressKeyboardActivation;
  }

  if (isHostComponent(RootSlot)) {
    delete rootProps.as;
    delete rootProps.component;
    delete rootProps.ownerState;
    delete rootProps.suppressKeyboardActivation;
    delete rootProps.sx;

    return React.createElement(RootSlot, rootProps);
  }

  return React.createElement(RootSlot, appendOwnerState(RootSlot, rootProps, ownerState));
}

export function isMenu2RootNativeButton(
  RootSlot: React.ElementType,
  component: React.ElementType | undefined,
  defaultNativeButton = false,
) {
  if (isHostComponent(RootSlot)) {
    return RootSlot === 'button';
  }

  if (component != null) {
    return component === 'button';
  }

  return defaultNativeButton;
}
