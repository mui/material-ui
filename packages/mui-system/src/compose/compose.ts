import merge from '../merge';
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

function compose<T extends Array<StyleFunction<any>>>(...styles: T): any {
  const handlers: Record<string, any> = styles.reduce((acc, style: any) => {
    style.filterProps.forEach((prop: string) => {
      acc[prop] = style;
    });

    return acc;
  }, {} as Record<string, any>);

  // false positive
  // eslint-disable-next-line react/function-component-definition
  const fn = (props: any) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge(acc, handlers[prop](props));
      }

      return acc;
    }, {});
  };

  fn.propTypes =
    process.env.NODE_ENV !== 'production'
      ? styles.reduce((acc, style: any) => Object.assign(acc, style.propTypes), {})
      : {};

  fn.filterProps = styles.reduce((acc: string[], style: any) => acc.concat(style.filterProps), [] as string[]);

  return fn;
}

export default compose;
