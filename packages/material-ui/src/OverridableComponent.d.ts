import * as React from 'react';
import { Omit } from '.';
import { StyledComponentProps } from './styles';

export interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends AnyReactType>(props: { component: C } & OverrideProps<M, C>): JSX.Element;
  (props: DefaultProps<M>): JSX.Element;
}

// prettier-ignore
export type OverrideProps<
  M extends OverridableTypeMap,
  C extends AnyReactType
> = (
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<C>, keyof UniversalProps<M>>
);

// prettier-ignore
export type DefaultProps<M extends OverridableTypeMap> =
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<M['defaultComponent']>, keyof BaseProps<M>>;

// prettier-ignore
export type BaseProps<M extends OverridableTypeMap> =
  & M['props']
  & UniversalProps<M>;

export interface UniversalProps<M extends OverridableTypeMap>
  extends StyledComponentProps<M['classKey']> {
  className?: string;
  style?: React.CSSProperties;
}

export interface OverridableTypeMap {
  props: {};
  defaultComponent: AnyReactType;
  classKey: string;
}

export type AnyReactType<P = any> = keyof JSX.IntrinsicElements | React.ComponentType<P>;

export type Simplify<T> = { [K in keyof T]: T[K] };

export type SimplifiedPropsOf<C extends React.ReactType> = Simplify<React.ComponentProps<C>>;
