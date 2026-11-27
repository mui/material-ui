import * as React from 'react';
import clsx from 'clsx';
import appendOwnerState from '@mui/utils/appendOwnerState';
import isHostComponent from '@mui/utils/isHostComponent';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import useForkRef from '@mui/utils/useForkRef';
import { mergeProps } from '@base-ui/react/merge-props';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import type { SxProps } from '@mui/system';
import type { Theme } from '../styles';
import type { MuiKeyboardEvent } from '../ButtonBase/useButtonBase';
import type { SlotComponentProps, WithDataAttributes } from '../utils/types';
import Menu2RenderRoot from '../internal/Menu2RenderRoot';

// One log per component for each warning, so a bad trigger does not spam the
// console on every render.
const warnedFragmentTrigger = new Set<string>();
const warnedTriggerRef = new Set<string>();

// Base UI marks each popup of a menu tree, submenus included, with the root id.
export function isOutsideMenuTree(element: Element | null, popup: Element | null | undefined) {
  if (!element || element === element.ownerDocument.body) {
    return false;
  }
  const rootOwnerId = popup?.getAttribute('data-rootownerid');
  return !(
    popup?.contains(element) ||
    (rootOwnerId != null &&
      element.closest('[data-rootownerid]')?.getAttribute('data-rootownerid') === rootOwnerId)
  );
}

export function resetMenu2WarningFlags() {
  warnedFragmentTrigger.clear();
  warnedTriggerRef.clear();
}

export function warnMenu2FragmentTrigger(
  trigger: unknown,
  componentName: string,
  triggerExample: string,
  propName = 'trigger',
) {
  // A fragment is an element, so the type does not catch it. Base UI cannot
  // merge the trigger behavior into a fragment, and the trigger renders as
  // bare content instead.
  if (
    !React.isValidElement(trigger) ||
    trigger.type !== React.Fragment ||
    warnedFragmentTrigger.has(componentName)
  ) {
    return;
  }

  warnedFragmentTrigger.add(componentName);
  console.error(
    `MUI: The \`${propName}\` prop of \`${componentName}\` cannot be a fragment. ` +
      `Pass a single element, for example a \`${triggerExample}\`.`,
  );
}

export function warnMenu2TriggerRef(trigger: unknown, componentName: string, propName = 'trigger') {
  // A wrapper that does not forward the ref also swallows the trigger behavior,
  // and nothing else reports it.
  if (
    trigger == null ||
    (React.isValidElement(trigger) && trigger.type === React.Fragment) ||
    warnedTriggerRef.has(componentName)
  ) {
    return;
  }

  warnedTriggerRef.add(componentName);
  console.error(
    `MUI: The element rendered by the \`${propName}\` prop of \`${componentName}\` did not receive a ref. ` +
      'A component used as the trigger must forward its props and its ref to ' +
      'the element that it renders, the way Tooltip does. Without them the ' +
      'menu behavior does not reach the element.',
  );
}

// Base UI owns Enter and Space activation for non-native elements. A ButtonBase
// element would emulate a second click, and `defaultMuiPrevented` turns that off.
export function suppressButtonBaseKeyboardActivation(props?: {
  onKeyDown?: React.KeyboardEventHandler<HTMLElement> | undefined;
  onKeyUp?: React.KeyboardEventHandler<HTMLElement> | undefined;
}) {
  const externalOnKeyDown = props?.onKeyDown;
  const externalOnKeyUp = props?.onKeyUp;

  return {
    onKeyDown: (event: MuiKeyboardEvent) => {
      externalOnKeyDown?.(event);
      event.defaultMuiPrevented = true;
    },
    onKeyUp: (event: MuiKeyboardEvent) => {
      externalOnKeyUp?.(event);
      event.defaultMuiPrevented = true;
    },
  };
}

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

export type Menu2SlotRender<State> =
  React.ReactElement | ComponentRenderFn<Omit<HTMLProps, 'color'>, State>;

// Split `render` from the slot props. Slots take `render` instead of `component`.
export function resolveMenu2SlotRender<OwnerState>(slotProps: unknown, ownerState: OwnerState) {
  const {
    render,
    component: ignoredComponent,
    ...props
  }: Record<string, any> = resolveComponentProps(slotProps as any, ownerState) ?? {};
  return { render: render as Menu2SlotRender<any> | undefined, props };
}

export type SlotProps<SlotPropsValue, OwnerState> =
  | WithDataAttributes<SlotPropsValue>
  | ((ownerState: OwnerState) => WithDataAttributes<SlotPropsValue>)
  | undefined;

export interface Menu2RootSlots {
  root?: React.ElementType | undefined;
}

interface Menu2RootVisualProps {
  sx?: SxProps<Theme> | undefined;
}

export interface Menu2RootSlotProps<OwnerState, RootComponent extends React.ElementType = 'div'> {
  root?: SlotComponentProps<RootComponent, Menu2RootVisualProps, OwnerState> | undefined;
}

export function getMenu2RootRender<OwnerState>(
  RootSlot: React.ElementType,
  ownerState: OwnerState,
  props?: Record<string, any>,
) {
  const rootProps = { ...(props ?? {}) };

  if (isHostComponent(RootSlot)) {
    delete rootProps.as;
    delete rootProps.component;
    delete rootProps.ownerState;
    delete rootProps.sx;

    return React.createElement(RootSlot, rootProps);
  }

  return React.createElement(RootSlot, appendOwnerState(RootSlot, rootProps, ownerState));
}

interface Menu2SlotRenderRootProps {
  baseProps: HTMLProps;
  state: object;
  slot: React.ElementType;
  ownerState: object;
  slotProps: Record<string, any>;
  render: Menu2SlotRender<any>;
  renderKey: 'as' | 'component';
}

function Menu2SlotRenderRoot(props: Menu2SlotRenderRootProps) {
  const { baseProps, state, slot, ownerState, slotProps, render, renderKey } = props;
  const ref = useForkRef(baseProps.ref, slotProps.ref);
  return getMenu2RootRender(slot, ownerState, {
    ...mergeProps(baseProps, slotProps),
    ref,
    [renderKey]: Menu2RenderRoot,
    internalRender: render,
    internalRenderState: state,
  });
}

// Base UI gives the part state only to a render function, so `render` goes through one.
// `renderKey` is the slot prop that sets the rendered element.
export function getMenu2SlotRender(
  slot: React.ElementType,
  ownerState: object,
  slotProps: Record<string, any>,
  render: Menu2SlotRender<any> | undefined,
  renderKey: 'as' | 'component' = 'as',
) {
  if (!render) {
    return getMenu2RootRender(slot, ownerState, slotProps);
  }
  return function renderSlot(baseProps: HTMLProps, state: object) {
    return React.createElement(Menu2SlotRenderRoot, {
      baseProps,
      state,
      slot,
      ownerState,
      slotProps,
      render,
      renderKey,
    });
  };
}
