import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    display: 'block',
    margin: theme.spacing(2),
  },
});

function SimpleNoSsr(props) {
  const { classes } = props;

  return (
    <div>
      <Button className={classes.button} variant="contained" color="primary">
        Server & Client
      </Button>
      <NoSsr>
        <Button className={classes.button} variant="contained" color="secondary">
          Client only
        </Button>
      </NoSsr>
    </div>
  );
}

SimpleNoSsr.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleNoSsr);
