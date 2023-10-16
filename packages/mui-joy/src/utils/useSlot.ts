'use client';
import * as React from 'react';
import { ClassValue } from 'clsx';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { appendOwnerState, resolveComponentProps, mergeSlotProps } from '@mui/base/utils';
import { ApplyColorInversion } from '../styles/types';

export type WithCommonProps<T> = T & {
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<any>;
};

type EventHandlers = Record<string, React.EventHandler<any>>;

type ExtractComponentProps<P> = P extends infer T | ((ownerState: any) => infer T) ? T : never;

/**
 * An internal function to create a Joy UI slot.
 *
 * This is an advanced version of Base UI `useSlotProps` because Joy UI allows leaf component to be customized via `component` prop
 * while Base UI does not need to support leaf component customization.
 *
 * @param {string} name: name of the slot
 * @param {object} parameters
 * @returns {[Slot, slotProps]} The slot's React component and the slot's props
 *
 * Note: the returned slot's props
 * - will never contain `component` prop.
 * - might contain `as` prop.
 */
export default function useSlot<
  T extends string,
  ElementType extends React.ElementType,
  SlotProps,
  OwnerState extends {},
  ExternalSlotProps extends { component?: React.ElementType; ref?: React.Ref<any> },
  ExternalForwardedProps extends {
    component?: React.ElementType;
    slots?: { [k in T]?: React.ElementType };
    slotProps?: {
      [k in T]?: ExternalSlotProps | ((ownerState: OwnerState) => ExternalSlotProps);
    };
  },
  AdditionalProps,
  SlotOwnerState extends {},
>(
  /**
   * The slot's name. All Joy UI components should have `root` slot.
   *
   * If the name is `root`, the logic behaves differently from other slots,
   * e.g. the `externalForwardedProps` are spread to `root` slot but not other slots.
   */
  name: T,
  parameters: (T extends 'root' // root slot must pass a `ref` as a parameter
    ? { ref: React.ForwardedRef<any> }
    : { ref?: React.ForwardedRef<any> }) & {
    /**
     * The slot's className
     */
    className: ClassValue | ClassValue[];
    /**
     * The slot's default styled-component
     */
    elementType: ElementType;
    /**
     * The component's ownerState
     */
    ownerState: OwnerState;
    /**
     * The `other` props from the consumer. It has to contain `component`, `slots`, and `slotProps`.
     * The function will use those props to calculate the final rendered element and the returned props.
     *
     * If the slot is not `root`, the rest of the `externalForwardedProps` are neglected.
     */
    externalForwardedProps: ExternalForwardedProps;
    getSlotProps?: (other: EventHandlers) => WithCommonProps<SlotProps>;
    additionalProps?: WithCommonProps<AdditionalProps>;

    // Joy UI specifics
    /**
     * For overriding the component's ownerState for the slot.
     * This is required for some components that need styling via `ownerState`.
     *
     * It is a function because `slotProps.{slot}` can be a function which has to be resolved first.
     */
    getSlotOwnerState?: (
      mergedProps: AdditionalProps &
        SlotProps &
        ExternalSlotProps &
        ExtractComponentProps<
          Exclude<Exclude<ExternalForwardedProps['slotProps'], undefined>[T], undefined>
        >,
    ) => SlotOwnerState;
    /**
     * props forward to `T` only if the `slotProps.*.component` is not provided.
     * e.g. Autocomplete's listbox uses Popper + StyledComponent
     */
    internalForwardedProps?: any;
  },
) {
  const {
    className,
    elementType: initialElementType,
    ownerState,
    externalForwardedProps,
    getSlotOwnerState,
    internalForwardedProps,
    ...useSlotPropsParams
  } = parameters;
  const {
    component: rootComponent,
    slots = { [name]: undefined },
    slotProps = { [name]: undefined },
    ...other
  } = externalForwardedProps;

  const elementType = slots[name] || initialElementType;

  // `slotProps[name]` can be a callback that receives the component's ownerState.
  // `resolvedComponentsProps` is always a plain object.
  const resolvedComponentsProps = resolveComponentProps(slotProps[name], ownerState);

  const {
    props: { component: slotComponent, ...mergedProps },
    internalRef,
  } = mergeSlotProps({
    className,
    ...useSlotPropsParams,
    externalForwardedProps: name === 'root' ? other : undefined,
    externalSlotProps: resolvedComponentsProps,
  });

  const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.ref);

  const slotOwnerState = getSlotOwnerState ? getSlotOwnerState(mergedProps as any) : {};
  const finalOwnerState = { ...ownerState, ...slotOwnerState } as any;

  const LeafComponent = (name === 'root' ? slotComponent || rootComponent : slotComponent) as
    | React.ElementType
    | undefined;

  const props = appendOwnerState(
    elementType,
    {
      ...(name === 'root' && !rootComponent && !slots[name] && internalForwardedProps),
      ...(name !== 'root' && !slots[name] && internalForwardedProps),
      ...mergedProps,
      ...(LeafComponent && {
        as: LeafComponent,
      }),
      ref,
    },
    finalOwnerState,
  );

  Object.keys(slotOwnerState).forEach((propName) => {
    delete props[propName];
  });

  return [elementType, props] as [
    ElementType,
    {
      className: string;
      ownerState: ApplyColorInversion<OwnerState & SlotOwnerState>;
    } & AdditionalProps &
      SlotProps &
      ExternalSlotProps &
      ExtractComponentProps<
        Exclude<Exclude<ExternalForwardedProps['slotProps'], undefined>[T], undefined>
      >,
  ];
}
