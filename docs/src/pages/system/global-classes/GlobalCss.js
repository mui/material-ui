import { withStyles } from '@material-ui/styles';
import spacings from './spacings';
import colors from './colors';
import elevations from './elevations';
import texts from './texts';
import {
  displays,
  overflows,
  textOverflows,
  visibilities,
  whiteSpaces,
} from './displays';

const GlobalCss = withStyles((theme) => {
  return {
    '@global': {
      ...spacings(theme),
      ...colors(theme),
      ...elevations(theme),
      ...texts(theme),
      ...displays,
      ...overflows,
      ...textOverflows,
      ...visibilities,
      ...whiteSpaces,
    },
  };
})(() => null);

export default GlobalCss;
