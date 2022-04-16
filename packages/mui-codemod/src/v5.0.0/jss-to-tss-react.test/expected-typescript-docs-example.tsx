import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles<void, "child">()((theme, _params, classes) => ({
  parent: {
    padding: 30,
    [`&:hover .${classes.child}`]: {
      backgroundColor: 'red',
    },
  },
  smallParent: {
    padding: 15
  },
  child: {
    backgroundColor: 'blue',
  },
}));

function App() {
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div className={cx(classes.parent, {[classes.smallParent]: isSmall})}>
      <div className={classes.child}>
        Background turns red when the mouse hovers over the parent
      </div>
    </div>
  );
}

export default App;
