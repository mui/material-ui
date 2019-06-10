import {
  ClassKeyOfStyles,
  ClassNameMap,
  PropsOfStyles,
  Styles,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';
import { IsAny } from '@material-ui/types';

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

/**
 * @internal
 *
 * If a style callback is given with `theme => stylesOfTheme` then typescript
 * infers `Props` to `any`.
 * If a static object is given with { ...members } then typescript infers `Props`
 * to `{}`.
 *
 * So we require no props in `useStyles` if `Props` in `makeStyles(styles)` is
 * inferred to either `any` or `{}`
 */
export type StylesRequireProps<S> = Or<
  IsAny<PropsOfStyles<S>>,
  IsEmptyInterface<PropsOfStyles<S>>
> extends true
  ? false
  : true;

/**
 * @internal
 *
 * `Props` are `any` either by explicit annotation or if there are no callbacks
 * from which the typechecker could infer a type so it falls back to `any`.
 * See the test cases for examples and implications of explicit `any` annotation
 */
export type StylesHook<S extends Styles<any, any>> = StylesRequireProps<S> extends false
  ? (props?: any) => ClassNameMap<ClassKeyOfStyles<S>>
  : (props: PropsOfStyles<S>) => ClassNameMap<ClassKeyOfStyles<S>>;

export default function makeStyles<
  Theme = unknown,
  Props extends {} = {},
  ClassKey extends string = string
>(
  styles: Styles<Theme, Props, ClassKey>,
  options?: WithStylesOptions<Theme>,
): StylesHook<Styles<Theme, Props, ClassKey>>;
