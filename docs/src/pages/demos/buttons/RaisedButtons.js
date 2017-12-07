import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function RaisedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button raised className={classes.button}>
        Default
      </Button>
      <Button raised color="primary" className={classes.button}>
        Primary
      </Button>
      <Button raised color="accent" className={classes.button}>
        Accent
      </Button>
      <Button raised color="contrast" className={classes.button}>
        Contrast
      </Button>
      <Button raised color="accent" disabled className={classes.button}>
        Disabled
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button raised component="span" className={classes.button}>
          Upload
        </Button>
      </label>
      <Button raised dense className={classes.button}>
        Dense
      </Button>
    </div>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedButtons);
