import { withStyles } from '@material-ui/styles';
import spacings from './spacings';
import colors from './colors';
import elevations from './elevations';
import typography from './typography';
import positions from './positions';
import displays from './displays';

const GlobalCss = withStyles((theme) => {
  return {
    '@global': {
      ...spacings(theme),
      ...colors(theme),
      ...elevations(theme),
      ...typography(theme),
      ...positions(theme),
      ...displays(theme),
    },
  };
})(() => null);

export default GlobalCss;
