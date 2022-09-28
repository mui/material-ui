import * as React from 'react';
import { ClassValue } from 'clsx';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import {
  appendOwnerState,
  resolveComponentProps,
  unstable_mergeSlotProps as mergeSlotProps,
} from '@mui/base/utils';

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
 * This is an advanced version of MUI Base `useSlotProps` because Joy UI allows leaf component to be customized via `component` prop
 * while MUI Base does not need to support leaf component customization.
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
  ExternalSlotProps extends { component?: React.ElementType },
  ExternalForwardedProps extends {
    component?: React.ElementType;
    components?: { [k in T]?: React.ElementType };
    componentsProps?: {
      [k in T]?:
        | WithCommonProps<ExternalSlotProps>
        | ((ownerState: OwnerState) => WithCommonProps<ExternalSlotProps>);
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
  parameters: (T extends 'root' ? { ref: React.ForwardedRef<any> } : {}) & {
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
     * The `other` props from the consumer. It has to contain `component`, `components`, and `componentsProps`.
     * The function will use those props to calculate the final leaf component and the returned props.
     *
     * If the slot is not `root`, the rest of the `externalForwardedProps` are neglect.
     */
    externalForwardedProps: ExternalForwardedProps;
    getSlotProps?: (other: EventHandlers) => WithCommonProps<SlotProps>;
    additionalProps?: WithCommonProps<AdditionalProps>;

    // Joy UI specifics
    /**
     * For overriding the component's ownerState for the slot.
     * This is required for some components that need styling via `ownerState`.
     *
     * It is a function because `componentsProps.{slot}` can be a function which has to be resolved first.
     */
    getSlotOwnerState?: (
      mergedProps: SlotProps &
        ExternalSlotProps &
        ExtractComponentProps<
          Exclude<Exclude<ExternalForwardedProps['componentsProps'], undefined>[T], undefined>
        >,
    ) => SlotOwnerState;
  },
) {
  const {
    className,
    elementType,
    ownerState,
    externalForwardedProps,
    getSlotOwnerState,
    ...useSlotPropsParams
  } = parameters;
  const {
    component: rootComponent,
    components = { [name]: undefined },
    componentsProps = { [name]: undefined },
    ...other
  } = externalForwardedProps;

  // `componentsProps[name]` can be a callback that receives the component's ownerState.
  // `resolvedComponentsProps` is always a plain object.
  const resolvedComponentsProps = resolveComponentProps(componentsProps[name], ownerState);

  const {
    props: { component: slotComponent, ...mergedProps },
    internalRef,
  } = mergeSlotProps({
    className,
    ...useSlotPropsParams,
    externalForwardedProps: name === 'root' ? other : undefined,
    externalSlotProps: resolvedComponentsProps,
  });

  const ref = useForkRef(
    internalRef,
    // @ts-ignore `ref` is required for the 'root' slot
    useForkRef(resolvedComponentsProps?.ref, name === 'root' ? parameters.ref : undefined),
  ) as ((instance: any | null) => void) | null;

  const finalOwnerState = getSlotOwnerState
    ? { ...ownerState, ...getSlotOwnerState(mergedProps as any) }
    : ownerState;

  const LeafComponent = (name === 'root' ? slotComponent || rootComponent : slotComponent) as
    | React.ElementType
    | undefined;

  const props = appendOwnerState(
    elementType,
    {
      ...(mergedProps as { className: string } & SlotProps &
        ExternalSlotProps &
        AdditionalProps &
        (T extends 'root' ? ExternalForwardedProps : {})),
      ...(LeafComponent && {
        as: LeafComponent,
      }),
      ref,
    },
    finalOwnerState as OwnerState & SlotOwnerState,
  );

  return [components[name] || elementType, props] as [ElementType, typeof props];
}
