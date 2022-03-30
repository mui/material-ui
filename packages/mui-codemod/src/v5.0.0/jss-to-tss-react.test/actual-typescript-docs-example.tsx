import * as React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  parent: {
    padding: 30,
    '&:hover $child': {
      backgroundColor: 'red',
    },
  },
  child: {
    backgroundColor: 'blue',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.parent}>
      <div className={classes.children}>
        Background turns red when the mouse hovers over the parent
      </div>
    </div>
  );
}

export default App;
