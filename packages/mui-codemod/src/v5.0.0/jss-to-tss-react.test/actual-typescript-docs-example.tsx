import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  parent: {
    padding: 30,
    '&:hover $child': {
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
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div className={clsx(classes.parent, {[classes.smallParent]: isSmall})}>
      <div className={classes.child}>
        Background turns red when the mouse hovers over the parent
      </div>
    </div>
  );
}

export default App;
