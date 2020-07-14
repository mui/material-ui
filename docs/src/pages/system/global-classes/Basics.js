import { withStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import spacings from './spacings';
import colors from './colors';

const GlobalCss = withStyles((theme) => {
  return {
    '@global': {
      ...spacings(theme),
      ...colors(theme),
    },
  };
})(() => null);

export default function App() {
  return (
    <div>
      <GlobalCss />
      <Button
        variant="contained"
        className="m-1 py-3 warning-light warning-dark--hover warning-contrastText--text"
      >
        Submit
      </Button>
    </div>
  );
}
