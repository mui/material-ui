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
  | SlotPropsValue
  | ((ownerState: OwnerState) => SlotPropsValue)
  | undefined;

export function resolveSlotProps<SlotPropsValue, OwnerState>(
  slotProps: SlotProps<SlotPropsValue, OwnerState>,
  ownerState: OwnerState,
): SlotPropsValue | undefined {
  return typeof slotProps === 'function'
    ? (slotProps as (ownerState: OwnerState) => SlotPropsValue)(ownerState)
    : slotProps;
}

export interface MenuPreviewRootSlots {
  root?: React.ElementType | undefined;
}

export interface MenuPreviewRootSlotProps<OwnerState> {
  root?: SlotProps<Record<string, any>, OwnerState>;
}

export function getMenuPreviewRootRender<OwnerState>(
  RootSlot: React.ElementType,
  ownerState: OwnerState,
  props?: Record<string, any>,
) {
  if (isHostComponent(RootSlot)) {
    const hostProps = { ...(props ?? {}) };
    delete hostProps.as;
    delete hostProps.component;
    delete hostProps.ownerState;
    delete hostProps.sx;

    return React.createElement(RootSlot, hostProps);
  }

  return React.createElement(RootSlot, appendOwnerState(RootSlot, props ?? {}, ownerState));
}

export function isMenuPreviewRootNativeButton(
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
