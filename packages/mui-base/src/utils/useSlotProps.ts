import * as React from 'react';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import appendOwnerState, { AppendOwnerStateReturnType } from './appendOwnerState';
import mergeSlotProps, { MergeSlotPropsParameters, WithCommonProps } from './mergeSlotProps';
import resolveComponentProps from './resolveComponentProps';

export type UseSlotPropsParameters<
  ElementType extends React.ElementType,
  SlotProps,
  ExternalForwardedProps,
  ExternalSlotProps,
  AdditionalProps,
  OwnerState,
> = Omit<
  MergeSlotPropsParameters<SlotProps, ExternalForwardedProps, ExternalSlotProps, AdditionalProps>,
  'externalSlotProps'
> & {
  /**
   * The type of the component used in the slot.
   */
  elementType: ElementType;
  /**
   * The `componentsProps.*` of the unstyled component.
   */
  externalSlotProps:
    | ExternalSlotProps
    | ((ownerState: OwnerState) => ExternalSlotProps)
    | undefined;
  /**
   * The ownerState of the unstyled component.
   */
  ownerState: OwnerState;
};

export type UseSlotPropsResult<
  ElementType extends React.ElementType,
  SlotProps,
  ExternalForwardedProps,
  ExternalSlotProps,
  AdditionalProps,
  OwnerState,
> = AppendOwnerStateReturnType<
  ElementType,
  Omit<SlotProps & ExternalSlotProps & ExternalForwardedProps & AdditionalProps, 'ref'> & {
    className?: string | undefined;
    ref: (instance: any | null) => void;
  },
  OwnerState
>;

/**
 * Builds the props to be passed into the slot of an unstyled component.
 * It merges the internal props of the component with the ones supplied by the user, allowing to customize the behavior.
 * If the slot component is not a host component, it also merges in the `ownerState`.
 *
 * @param parameters.getSlotProps - A function that returns the props to be passed to the slot component.
 */
export default function useSlotProps<
  ElementType extends React.ElementType,
  SlotProps,
  ExternalForwardedProps,
  ExternalSlotProps,
  AdditionalProps,
  OwnerState,
>(
  parameters: UseSlotPropsParameters<
    ElementType,
    SlotProps,
    ExternalForwardedProps,
    WithCommonProps<ExternalSlotProps>,
    WithCommonProps<AdditionalProps>,
    OwnerState
  >,
) {
  const { elementType, externalSlotProps, ownerState, ...rest } = parameters;
  const resolvedComponentsProps = resolveComponentProps(externalSlotProps, ownerState);
  const merged = mergeSlotProps({
    ...rest,
    externalSlotProps: resolvedComponentsProps,
  });

  const props = appendOwnerState(
    elementType,
    {
      ...merged.props,
      ref: useForkRef(
        merged.internalRef,
        useForkRef(resolvedComponentsProps?.ref, parameters.additionalProps?.ref),
      ),
    },
    ownerState,
  );

  return props;
}
