import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const TextFieldMargins = props => {
  const classes = props.classes;

  return (
    <div className={classes.container}>
      <TextField
        label="None"
        id="margin-none"
        defaultValue="Default Value"
        className={classes.textField}
        helperText="Some important text"
      />
      <TextField
        label="Dense"
        id="margin-dense"
        defaultValue="Default Value"
        className={classes.textField}
        helperText="Some important text"
        margin="dense"
      />
      <TextField
        label="Normal"
        id="margin-normal"
        defaultValue="Default Value"
        className={classes.textField}
        helperText="Some important text"
        margin="normal"
      />
    </div>
  );
};

TextFieldMargins.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldMargins);
