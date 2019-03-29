import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
});

function UnelevatedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="unelevated" className={classes.button}>
        Default
      </Button>
      <Button variant="unelevated" color="primary" className={classes.button}>
        Primary
      </Button>
      <Button variant="unelevated" color="secondary" className={classes.button}>
        Secondary
      </Button>
      <Button variant="unelevated" color="secondary" disabled className={classes.button}>
        Disabled
      </Button>
      <Button variant="unelevated" href="#unelevated-buttons" className={classes.button}>
        Link
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="unelevated-button-file"
        multiple
        type="file"
      />
      <label htmlFor="unelevated-button-file">
        <Button variant="unelevated" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </div>
  );
}

UnelevatedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UnelevatedButtons);
