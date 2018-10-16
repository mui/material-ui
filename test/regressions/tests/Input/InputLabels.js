import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20, // so transform doesn't let things get cut off
  },
};

function InputLabels(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <InputLabel shrink>First Name Shrunk</InputLabel>
      <InputLabel>First Name</InputLabel>
      <InputLabel focused>Required</InputLabel>
      <InputLabel focused required>
        Focused Required
      </InputLabel>
      <InputLabel required>Required</InputLabel>
      <InputLabel error>Error</InputLabel>
      <InputLabel required error>
        Required Error
      </InputLabel>
    </div>
  );
}

InputLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputLabels);
