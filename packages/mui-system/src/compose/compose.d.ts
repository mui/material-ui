import { StyleFunction } from '../style';

/**
 * given a list of StyleFunction return the intersection of the props each individual
 * StyleFunction requires.
 *
 * If `firstFn` requires { color: string } and `secondFn` requires { spacing: number }
 * their composed function requires { color: string, spacing: number }
 */
type ComposedArg<T> = T extends Array<(arg: infer P) => any> ? P : never;
type ComposedOwnerState<T> = ComposedArg<T>;

export type ComposedStyleFunction<T extends Array<StyleFunction<any>>> = StyleFunction<
  ComposedOwnerState<T>
> & { filterProps: string[] };

export default function compose<T extends Array<StyleFunction<any>>>(
  ...args: T
): ComposedStyleFunction<T>;
