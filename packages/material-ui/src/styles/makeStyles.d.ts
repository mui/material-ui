import { ClassNameMap, Styles, WithStylesOptions } from '@material-ui/styles/withStyles';
import { DistributiveOmit } from '@material-ui/types';
import { Theme as DefaultTheme } from './createMuiTheme';

export default function makeStyles<
  Theme = DefaultTheme,
  Props extends object = {},
  ClassKey extends string = string
>(
  styles: Styles<Theme, Props, ClassKey>,
  options?: DistributiveOmit<WithStylesOptions<Theme>, 'withTheme'>
): keyof Props extends never
  ? // `makeStyles` where the passed `styles` do not depend on props
    (props?: any) => ClassNameMap<ClassKey>
  : // `makeStyles` where the passed `styles` do depend on props
    (props: Props) => ClassNameMap<ClassKey>;
