import {
  DistributiveOmit,
  OverrideProps,
  OverridableComponent,
  OverridableTypeMap,
} from '@mui/types';
import React from 'react';

export interface ButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & {
    /**
     * A ref for imperative actions. It currently only supports `focusVisible()` action.
     */
    action?: React.Ref<{
      focusVisible(): void;
    }>;
    /**
     * The component used for the Root slot.
     * Either a string to use a HTML element or a component.
     * This is equivalent to `components.Root`. If both are provided, the `component` is used.
     */
    component?: D;
  };
  defaultComponent: D;
}

export interface ExtendButtonTypeMap<M extends OverridableTypeMap> {
  props: M['props'] &
    (M['props'] extends { classes?: Record<string, string> }
      ? DistributiveOmit<ButtonTypeMap['props'], 'classes'>
      : ButtonTypeMap['props']);
  defaultComponent: M['defaultComponent'];
}

export type ButtonProps<
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ButtonTypeMap<P, D>, D>;

export type ExtendButton<M extends OverridableTypeMap> = ((
  props: OverrideProps<ExtendButtonTypeMap<M>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendButtonTypeMap<M>>;
