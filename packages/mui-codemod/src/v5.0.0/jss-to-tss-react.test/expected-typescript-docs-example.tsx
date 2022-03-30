import * as React from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles<void, "child">()((theme, _params, classes) => ({
  parent: {
    padding: 30,
    [`&:hover .${classes.child}`]: {
      backgroundColor: 'red',
    },
  },
  child: {
    backgroundColor: 'blue',
  },
}));

function App() {
  const { classes } = useStyles();

  return (
    <div className={classes.parent}>
      <div className={classes.children}>
        Background turns red when the mouse hovers over the parent
      </div>
    </div>
  );
}

export default App;
