import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  debug: {
    '& *': { border: '1px dashed grey' },
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.debug}>
      <div className="m-4 p-4">
        <div className="px-10 py-4"></div>
      </div>
    </div>
  );
}
