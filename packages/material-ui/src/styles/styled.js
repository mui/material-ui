import { styled as styledWithoutDefault } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

function styled(stylesOrCreator, options = {}) {
  return styledWithoutDefault(stylesOrCreator, {
    defaultTheme,
    ...options,
  });
}

export default styled;
