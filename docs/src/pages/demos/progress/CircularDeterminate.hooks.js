import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
}));

function CircularDeterminate() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  function progress() {
    setCompleted(completed >= 100 ? 0 : completed + 1);
  }

  React.useEffect(() => {
    const timer = setInterval(progress, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <CircularProgress className={classes.progress} variant="determinate" value={completed} />
      <CircularProgress
        className={classes.progress}
        variant="determinate"
        value={completed}
        color="secondary"
      />
    </div>
  );
}

export default CircularDeterminate;
