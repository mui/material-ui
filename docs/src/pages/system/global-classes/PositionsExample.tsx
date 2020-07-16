import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: { width: '100%' },
});

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="position-relative p-4 mb-14">
        <div className="position-absolute p-4 top-4 left-0 bg-grey-700 text-common-white">
          position-absolute
        </div>
        <div className="position-absolute py-4 px-6 top-10 left-5 zIndex-tooltip bg-primary-light text-common-white">
          zIndex-tooltip
        </div>
      </div>
    </div>
  );
}
