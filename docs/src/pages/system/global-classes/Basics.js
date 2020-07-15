import { withStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import spacings from './spacings';
import colors from './colors';
import elevations from './elevations';

const GlobalCss = withStyles((theme) => {
  return {
    '@global': {
      ...spacings(theme),
      ...colors(theme),
      ...elevations(theme),
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
      {Array.from(Array(24).keys()).map((val) => (
        <Button className={`m-2 p-1 elevation-${val}`} key={val}>
          Elevation {val}
        </Button>
      ))}
    </div>
  );
}
