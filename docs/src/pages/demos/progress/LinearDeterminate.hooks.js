import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function LinearDeterminate(props) {
  const { classes } = props;
  const [completed, setCompleted] = React.useState(0);

  function progress() {
    if (completed === 100) {
      setCompleted(0);
    } else {
      const diff = Math.random() * 10;
      setCompleted(Math.min(completed + diff, 100));
    }
  }

  React.useEffect(() => {
    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={completed} />
      <br />
      <LinearProgress color="secondary" variant="determinate" value={completed} />
    </div>
  );
}

LinearDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearDeterminate);
