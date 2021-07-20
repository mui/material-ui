import {
  ClassNameMap,
  StaticStyles,
  Styles,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';
import { DefaultTheme } from '../defaultTheme';

export default function makeStyles<Theme = DefaultTheme, ClassKey extends string = string>(
  styles: StaticStyles<Theme, ClassKey>,
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>,
): (props?: any) => ClassNameMap<ClassKey>; // `makeStyles` where the passed `styles` do not have callbacks on properties
export default function makeStyles<
  Theme = DefaultTheme,
  Props extends object = {},
  ClassKey extends string = string,
>(
  styles: Styles<Theme, Props, ClassKey>,
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>,
): keyof Props extends never
  ? // `makeStyles` where the passed `styles` do not depend on props
    (props?: any) => ClassNameMap<ClassKey>
  : // `makeStyles` where the passed `styles` do depend on props
    (props: Props) => ClassNameMap<ClassKey>;
