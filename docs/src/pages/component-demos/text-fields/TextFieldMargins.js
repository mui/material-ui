// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styleSheet = createStyleSheet(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
}));

const TextFieldMargins = props => {
  const classes = props.classes;

  return (
    <div className={classes.container}>
      <TextField
        label="None"
        defaultValue="Default Value"
        className={classes.textField}
        helperText="Some important text"
      />
      <TextField
        label="Dense"
        defaultValue="Default Value"
        className={classes.textField}
        helperText="Some important text"
        margin="dense"
      />
      <TextField
        label="Normal"
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

export default withStyles(styleSheet)(TextFieldMargins);
