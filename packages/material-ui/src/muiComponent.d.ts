import * as React from 'react';
import { ConsistentWith, Omit } from './';
import { StyledComponentProps } from './styles';

/**
 * A more restricted version of React.ReactType.
 */
type ReactType<P = any> = keyof JSX.IntrinsicElements | React.ComponentType<P>;

/**
 * Extract the props type of any ReactType.
 */
export type PropsOf<C extends ReactType> = (
  C extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[C] :
  C extends React.ComponentType<infer P> ? P :
  never
);

export interface TypeMap {
  outerProps: {};
  innerProps?: {};
  defaultRoot: ReactType;
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
  & Omit<PropsOf<M['defaultRoot']>, keyof BaseMuiProps<M>>;

// prettier-ignore
export type OverrideMuiProps<
  M extends TypeMap,
  C extends ReactType
> = (
  & BaseMuiProps<M>
  & { component: C }
  & Omit<PropsOf<C>, keyof (InnerProps<M> & UniversalPassthruProps)>
);

export interface MuiComponent<M extends TypeMap> {
  <C extends ReactType>(props: OverrideMuiProps<M, C>): JSX.Element;
  <C extends never>(props: DefaultMuiProps<M>): JSX.Element;
}
