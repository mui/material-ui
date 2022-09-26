import * as React from 'react';
import { ClassValue } from 'clsx';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { appendOwnerState, mergeSlotProps, resolveComponentProps } from '@mui/base/utils';

export type WithCommonProps<T> = T & {
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<any>;
};

type EventHandlers = Record<string, React.EventHandler<any>>;

type ExtractComponentProps<P> = P extends infer T | ((ownerState: any) => infer T) ? T : never;

export default function useSlot<
  T extends string,
  ElementType extends React.ElementType,
  SlotProps,
  OwnerState,
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
  ExtraOwnerState,
  AdditionalProps,
>(
  name: T,
  parameters: (T extends 'root' ? { ref: React.ForwardedRef<any> } : {}) & {
    className: ClassValue | ClassValue[];
    elementType: ElementType;
    ownerState: OwnerState;
    externalForwardedProps: ExternalForwardedProps;
    getSlotProps?: (other: EventHandlers) => WithCommonProps<SlotProps>;
    externalOwnerState?: (
      mergedProps: SlotProps &
        ExternalSlotProps &
        ExtractComponentProps<
          Exclude<Exclude<ExternalForwardedProps['componentsProps'], undefined>[T], undefined>
        >,
    ) => ExtraOwnerState;
    additionalProps?: WithCommonProps<AdditionalProps>;
    internalForwardedProps?: any;
  },
) {
  const {
    className,
    elementType,
    getSlotProps,
    ownerState,
    externalForwardedProps,
    externalOwnerState,
    additionalProps,
    internalForwardedProps,
  } = parameters;
  const {
    component: rootComponent,
    components = { [name]: undefined },
    componentsProps = { [name]: undefined },
    ...other
  } = externalForwardedProps;
  const resolvedComponentsProps = resolveComponentProps(componentsProps[name], ownerState);

  const {
    props: { component: slotComponent, ...mergedProps },
    internalRef,
  } = mergeSlotProps({
    className,
    getSlotProps,
    additionalProps,
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

  const finalOwnerState = externalOwnerState
    ? { ...ownerState, ...externalOwnerState(mergedProps as any) }
    : ownerState;

  const props = appendOwnerState(
    elementType,
    {
      ...internalForwardedProps,
      ...(mergedProps as T extends 'root'
        ? SlotProps & ExternalSlotProps & AdditionalProps & ExternalForwardedProps
        : SlotProps & ExternalSlotProps & AdditionalProps),
      as: ((name === 'root' ? rootComponent || slotComponent : slotComponent) ||
        internalForwardedProps?.as) as React.ElementType | undefined,
      ref,
    },
    finalOwnerState,
  );

  return [components[name] || elementType, props] as [ElementType, typeof props];
}
