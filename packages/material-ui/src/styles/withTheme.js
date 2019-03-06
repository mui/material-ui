import { withThemeCreator } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

const withTheme = withThemeCreator({
  defaultTheme,
});

export default withTheme;
