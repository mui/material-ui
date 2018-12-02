import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function LinearBuffer(props) {
  const { classes } = props;
  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  function progress() {
    if (completed > 100) {
      setCompleted(0);
      setBuffer(10);
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      setCompleted(completed + diff);
      setBuffer(completed + diff + diff2);
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
      <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
      <br />
      <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer} />
    </div>
  );
}

LinearBuffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearBuffer);
