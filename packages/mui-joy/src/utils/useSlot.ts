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
 */
export default function useSlot<
  T extends string,
  ElementType extends React.ElementType,
  SlotProps,
  OwnerState extends {},
  ExternalSlotProps extends { component?: React.ElementType },
  ExternalForwardedProps extends {
    component?: React.ElementType;
    components?: Partial<Record<T, React.ElementType>>;
    componentsProps?: Partial<
      Record<
        T,
        | WithCommonProps<ExternalSlotProps>
        | ((ownerState: OwnerState) => WithCommonProps<ExternalSlotProps>)
      >
    >;
  },
  AdditionalProps,
  SlotOwnerState extends {},
  InternalForwardedProps,
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
    /**
     * For setting default leaf component of a nested styled-component and any default props.
     */
    internalForwardedProps?: InternalForwardedProps;
  },
) {
  const {
    className,
    elementType,
    ownerState,
    externalForwardedProps,
    getSlotOwnerState,
    internalForwardedProps,
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
    useForkRef(
      resolvedComponentsProps?.ref,
      name === 'root' ? (parameters as unknown as { ref: any }).ref : undefined,
    ),
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
      ...internalForwardedProps,
      ...(mergedProps as { className: string } & SlotProps &
        ExternalSlotProps &
        AdditionalProps &
        (T extends 'root' ? ExternalForwardedProps : {})),
      as: LeafComponent || (internalForwardedProps as { as?: React.ElementType })?.as,
      ref,
    },
    finalOwnerState as OwnerState & SlotOwnerState,
  );

  return [components[name] || elementType, props] as [ElementType, typeof props];
}
