import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  debug: {
    '& > *': { border: '1px dashed grey' },
  },
});

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.debug}>
      {Array.from(Array(24).keys()).map((val) => (
        <div className={`m-2 p-1 elevation-${val}`} key={val}>
          Elevation {val}
        </div>
      ))}
    </div>
  );
}
