import * as React from 'react';
import { Omit } from '@material-ui/types';
import { StyledComponentProps } from './styles';

/**
 * a component whose root component can be controled via a `component` prop
 *
 * Adjusts valid props based on the type of `component`
 */
export interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends React.ElementType>(props: { component: C } & OverrideProps<M, C>): JSX.Element;
  (props: DefaultComponentProps<M>): JSX.Element;
}

/**
 * props of the component if `component={Component}` is used
 */
// prettier-ignore
export type OverrideProps<
  M extends OverridableTypeMap,
  C extends React.ElementType
> = (
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<C>, keyof CommonProps<M>>
);

/**
 * props if `component={Component}` is NOT used
 */
// prettier-ignore
export type DefaultComponentProps<M extends OverridableTypeMap> =
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<M['defaultComponent']>, keyof BaseProps<M>>;

/**
 * props defined on the component (+ common material-ui props)
 */
// prettier-ignore
export type BaseProps<M extends OverridableTypeMap> =
  & M['props']
  & CommonProps<M>;

/**
 * props that are valid for material-ui components
 */
export interface CommonProps<M extends OverridableTypeMap>
  extends StyledComponentProps<M['classKey']> {
  className?: string;
  style?: React.CSSProperties;
}

export interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
  classKey: string;
}

export type Simplify<T> = T extends any ? { [K in keyof T]: T[K] } : never;

export type SimplifiedPropsOf<C extends React.ElementType> = Simplify<React.ComponentProps<C>>;
