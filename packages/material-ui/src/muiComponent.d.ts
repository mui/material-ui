import * as React from 'react';
import { AnyReactType, ConsistentWith, PropsOf, Omit } from './';
import { StyledComponentProps } from './styles';

export interface TypeMap {
  outerProps: {};
  innerProps?: {};
  defaultComponent: AnyReactType;
  classKey: string;
}

export interface UniversalPassthruProps {
  className: string;
  style?: React.CSSProperties;
}

export type InnerProps<M extends TypeMap> = undefined extends M['innerProps'] ? {} : M['innerProps'];

// prettier-ignore
export type BaseMuiProps<M extends TypeMap> =
  & M['outerProps']
  & StyledComponentProps<M['classKey']>
  & Partial<InnerProps<M> & UniversalPassthruProps>;

// prettier-ignore
export type DefaultMuiProps<M extends TypeMap> =
  & BaseMuiProps<M>
  & Omit<PropsOf<M['defaultComponent']>, keyof BaseMuiProps<M>>;

// prettier-ignore
export type OverrideMuiProps<
  M extends TypeMap,
  C extends AnyReactType
> = (
  & BaseMuiProps<M>
  & Omit<PropsOf<C>, keyof (InnerProps<M> & UniversalPassthruProps)>
);

export interface MuiComponent<M extends TypeMap> {
  <C extends AnyReactType>(props: { component: C } & OverrideMuiProps<M, C>): JSX.Element;
  <C extends never>(props: DefaultMuiProps<M>): JSX.Element;
}
