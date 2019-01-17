import * as React from 'react';
import { Omit } from '.';
import { StyledComponentProps } from './styles';

export interface OverridableComponent<M extends OverridableTypeMap> {
  <C extends React.ReactType>(props: { component: C } & OverrideProps<M, C>): JSX.Element;
  (props: DefaultProps<M>): JSX.Element;
}

// prettier-ignore
export type OverrideProps<
  M extends OverridableTypeMap,
  C extends React.ReactType
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
  defaultComponent: React.ReactType;
  classKey: string;
}

export type Simplify<T> = { [K in keyof T]: T[K] };

export type SimplifiedPropsOf<C extends React.ReactType> = Simplify<React.ComponentProps<C>>;
