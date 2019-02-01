import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
}));

function CircularStatic() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  function progress() {
    setCompleted(prevCompleted => (prevCompleted >= 100 ? 0 : prevCompleted + 10));
  }

  React.useEffect(() => {
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

export default CircularStatic;
