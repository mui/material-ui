import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function TextButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="text" className={classes.button}>
        Default
      </Button>
      <Button variant="text" color="primary" className={classes.button}>
        Primary
      </Button>
      <Button variant="text" color="secondary" className={classes.button}>
        Secondary
      </Button>
      <Button variant="text" disabled className={classes.button}>
        Disabled
      </Button>
      <Button variant="text" href="#text-buttons" className={classes.button}>
        Link
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="flat-button-file"
        multiple
        type="file"
      />
      <label htmlFor="flat-button-file">
        <Button variant="text" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </div>
  );
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextButtons);
