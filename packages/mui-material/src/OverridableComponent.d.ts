import * as React from 'react';
import { Merge } from '@mui/types';
import { StyledComponentProps } from './styles';

/**
 * A component whose root component can be controlled via a `component` prop.
 *
 * Adjusts valid props based on the type of `component`.
 */
export interface OverridableComponent<M extends OverridableTypeMap> {
  // If you make any changes to this interface, please make sure to update the
  // `OverridableComponent` type in `mui-types/index.d.ts` as well.
  // Also, there are types in MUI Base that have a similar shape to this interface
  // (e.g. SelectUnstyledType, OptionUnstyledType, etc.).
  <C extends React.ElementType>(
    props: C extends ''
      ? { component: keyof JSX.IntrinsicElements }
      : C extends React.ComponentClass<infer P>
      ? Merge<P, BaseProps<M> & { component: C; ref?: React.Ref<InstanceType<C>> }>
      : C extends React.ComponentType<infer P>
      ? Merge<P, BaseProps<M> & { component: C }>
      : C extends keyof JSX.IntrinsicElements
      ? Merge<JSX.IntrinsicElements[C], BaseProps<M> & { component: C }>
      : never,
  ): JSX.Element;
  (props: DefaultComponentProps<M>): JSX.Element;
}

/**
 * Props of the component if `component={Component}` is used.
 */
// prettier-ignore
export type OverrideProps<
  M extends OverridableTypeMap,
  C extends React.ElementType
> = (
  & BaseProps<M>
  & Omit<React.ComponentProps<C>, keyof BaseProps<M>>
);

/**
 * Props if `component={Component}` is NOT used.
 */
// prettier-ignore
export type DefaultComponentProps<M extends OverridableTypeMap> = (
  & BaseProps<M>
  & Omit<React.ComponentProps<M['defaultComponent']>, keyof BaseProps<M>>
);

/**
 * Props defined on the component (+ common material-ui props).
 */
// prettier-ignore
export type BaseProps<M extends OverridableTypeMap> =
  & M['props']
  & CommonProps;

/**
 * Props that are valid for material-ui components.
 */
// each component declares it's classes in a separate interface for proper JSDoc.
export interface CommonProps extends StyledComponentProps<never> {
  className?: string;
  style?: React.CSSProperties;
}

export interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
}
