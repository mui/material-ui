import { ClassNameMap, Styles, WithStylesOptions } from '@material-ui/styles/withStyles';
import { Omit } from '@material-ui/types';
import { DefaultTheme } from '../defaultTheme';

export type MakeStylesHook<
  Props extends {} = {},
  ClassKey extends string = string
> = keyof Props extends never
  ? (props?: { classes?: Partial<ClassNameMap<ClassKey>> }) => ClassNameMap<ClassKey>
  : (props: Props & { classes?: Partial<ClassNameMap<ClassKey>> }) => ClassNameMap<ClassKey>;

/**
 * `makeStyles` where the passed `styles` do depend on props
 */
export default function makeStyles<
  Theme = DefaultTheme,
  Props extends {} = {},
  ClassKey extends string = string
>(
  styles: Styles<Theme, Props, ClassKey>,
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>
): MakeStylesHook<Props, ClassKey>;

/**
 * `makeStyles` where the passed `styles` do not depend on props
 */
export default function makeStyles<Theme = DefaultTheme, ClassKey extends string = string>(
  styles: Styles<Theme, {}, ClassKey>,
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>
): MakeStylesHook<{}, ClassKey>;
