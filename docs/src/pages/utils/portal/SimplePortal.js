import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Portal from '@material-ui/core/Portal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  alert: {
    padding: theme.spacing.unit,
    margin: `${theme.spacing.unit}px 0`,
    border: '1px solid',
    borderColor: theme.palette.text.primary,
  },
});

function SimplePortal(props) {
  const [show, setShow] = useState(false);
  const container = useRef(null);
  const { classes } = props;

  return (
    <div>
      <Button onClick={() => setShow(!show)}>{show ? 'Unmount children' : 'Mount children'}</Button>

      <div className={classes.alert}>
        <Typography>It looks like I will render here.</Typography>
        {show ? (
          <Portal container={container.current}>
            <Typography>But I actually render here!</Typography>
          </Portal>
        ) : null}
      </div>
      <div className={classes.alert} ref={container} />
    </div>
  );
}

SimplePortal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePortal);
