import { Theme as DefaultTheme } from './createMuiTheme';
import { Styles, WithStylesOptions } from '@material-ui/styles/withStyles';
import { StylesHook } from '@material-ui/styles/makeStyles';
import { Omit } from '@material-ui/types';

export default function makeStyles<
  Theme = DefaultTheme,
  Props extends {} = {},
  ClassKey extends string = string
>(
  styles: Styles<Theme, Props, ClassKey>,
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>,
): StylesHook<Styles<Theme, Props, ClassKey>>;
