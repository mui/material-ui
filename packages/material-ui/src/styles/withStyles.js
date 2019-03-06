import { withStyles as withStylesWithoutDefault } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

function withStyles(stylesOrCreator, options) {
  return withStylesWithoutDefault(stylesOrCreator, {
    defaultTheme,
    ...options,
  });
}

export default withStyles;
