import * as React from 'react';
import { ConsistentWith, PropsOf, Omit } from '.';
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
  & Omit<PropsOf<C>, keyof (InnerProps<M> & StyledComponentProps<M['classKey']>)>
);

// prettier-ignore
export type DefaultProps<M extends OverridableTypeMap> =
  & BaseProps<M>
  & Omit<PropsOf<M['defaultComponent']>, keyof BaseProps<M>>;

export type InnerProps<M extends OverridableTypeMap> = M extends { innerProps: any }
  ? M['innerProps']
  : {};

// prettier-ignore
export type BaseProps<M extends OverridableTypeMap> =
  & M['outerProps']
  & Partial<InnerProps<M>>
  & StyledComponentProps<M['classKey']>;

export interface OverridableTypeMap {
  outerProps: {};
  innerProps?: {};
  defaultComponent: AnyReactType;
  classKey: string;
}

export type AnyReactType<P = any> = keyof JSX.IntrinsicElements | React.ComponentType<P>;

export type Simplify<T> = { [K in keyof T]: T[K] };

export type SimplifiedPropsOf<C> = Simplify<PropsOf<C>>;
