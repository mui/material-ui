import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  debug: {
    '& *': {
      border: '1px dashed grey',
    },
  },
});

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.debug}>
      <div className="d-inline mr-1 p-2">div.d-inline</div>
      <div className="d-inline print:d-none p-2">Hidden when printed</div>
    </div>
  );
}
