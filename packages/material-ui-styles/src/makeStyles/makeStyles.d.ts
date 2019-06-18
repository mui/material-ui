import {
  ClassKeyOfStyles,
  ClassNameMap,
  PropsOfStyles,
  Styles,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';
import { Omit, IsAny, Or, IsEmptyInterface } from '@material-ui/types';

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
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>,
): StylesHook<Styles<Theme, Props, ClassKey>>;
