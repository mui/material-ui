import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function CircularDeterminate(props) {
  const { classes } = props;
  const [completed, setCompleted] = React.useState(0);

  function progress() {
    setCompleted(completed >= 100 ? 0 : completed + 1);
  }

  React.useEffect(() => {
    const timer = setInterval(progress, 20);
    return () => {
      clearInterval(timer);
    };
  });

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

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularDeterminate);
