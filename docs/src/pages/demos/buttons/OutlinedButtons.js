import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function doSomething(event) {
  // eslint-disable-next-line no-console
  console.log(event.currentTarget.getAttribute('data-something'));
}

function OutlinedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="outlined" className={classes.button}>
        Default
      </Button>
      <Button color="primary" variant="outlined" className={classes.button}>
        Primary
      </Button>
      <Button color="secondary" variant="outlined" className={classes.button}>
        Secondary
      </Button>
      <Button variant="outlined" disabled className={classes.button}>
        Disabled
      </Button>
      <Button variant="outlined" href="#flat-buttons" className={classes.button}>
        Link
      </Button>
      <Button variant="outlined" disabled href="/" className={classes.button}>
        Link disabled
      </Button>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={doSomething}
        data-something="here I am"
      >
        Does something
      </Button>
    </div>
  );
}

OutlinedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedButtons);
