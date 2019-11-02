import * as React from 'react';

// disable automatic export
export {};

/**
 * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
 * `U`, their value types do not conflict.
 *
 * @internal
 */
export type ConsistentWith<DecorationTargetProps, InjectedProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P]
};

/**
 * a function that takes {component} and returns a component that passes along
 * all the props to {component} except the {InjectedProps} and will accept
 * additional {AdditionalProps}
 */
export type PropInjector<InjectedProps, AdditionalProps = {}> = <
  C extends React.ComponentType<ConsistentWith<React.ComponentProps<C>, InjectedProps>>
>(
  component: C,
) => React.ComponentType<
  Omit<JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>, keyof InjectedProps> &
    AdditionalProps
>;

/**
 * Remove properties `K` from `T`.
 *
 * @internal
 */
export type Omit<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

/**
 * Like `T & U`, but using the value types from `U` where their properties overlap.
 *
 * @internal
 */
export type Overwrite<T, U> = Omit<T, keyof U> & U;

/**
 * Returns true if T is any, otherwise false
 */
// https://stackoverflow.com/a/49928360/3406963 without generic branch types
export type IsAny<T> = 0 extends (1 & T) ? true : false;

/**
 * Returns an empty object type if T is any, otherwise returns T
 */
export type CoerceEmptyInterface<T> = IsAny<T> extends true ? {} : T;

export type Or<A, B, C = false> = A extends true
  ? true
  : B extends true
  ? true
  : C extends true
  ? true
  : false;

export type And<A, B, C = true> = A extends true
  ? B extends true
    ? C extends true
      ? true
      : false
    : false
  : false;

/**
 * @internal
 *
 * check if a type is `{}`
 *
 * 1. false if the given type has any members
 * 2. false if the type is `object` which is the only other type with no members
 *  {} is a top type so e.g. `string extends {}` but not `string extends object`
 * 3. false if the given type is `unknown`
 */
export type IsEmptyInterface<T> = And<
  keyof T extends never ? true : false,
  string extends T ? true : false,
  unknown extends T ? false : true
>;
