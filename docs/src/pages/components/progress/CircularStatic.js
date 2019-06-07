import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function CircularStatic() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted(prevCompleted => (prevCompleted >= 100 ? 0 : prevCompleted + 10));
    }

    const timer = setInterval(progress, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <CircularProgress className={classes.progress} variant="static" value={5} />
      <CircularProgress className={classes.progress} variant="static" value={25} />
      <CircularProgress className={classes.progress} variant="static" value={50} />
      <CircularProgress className={classes.progress} variant="static" value={75} />
      <CircularProgress className={classes.progress} variant="static" value={100} />
      <CircularProgress className={classes.progress} variant="static" value={completed} />
    </div>
  );
}
