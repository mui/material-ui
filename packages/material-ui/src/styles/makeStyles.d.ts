import { Theme as DefaultTheme } from './createMuiTheme';
import { Styles, WithStylesOptions } from '@material-ui/styles/withStyles';
import { StylesHook } from '@material-ui/styles/makeStyles';

export default function makeStyles<
  Theme = DefaultTheme,
  Props extends {} = {},
  ClassKey extends string = string
>(
  styles: Styles<Theme, Props, ClassKey>,
  options?: WithStylesOptions<Theme>,
): StylesHook<Styles<Theme, Props, ClassKey>>;
