import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
});

function UploadInputs(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Input
        type="file"
        className={classes.input}
        inputProps={{
          accept: 'audio/*',
          'aria-label': 'File upload',
        }}
      />
      <Input
        type="file"
        className={classes.input}
        disabled
        inputProps={{
          accept: 'audio/*',
          'aria-label': 'File upload',
        }}
      />
    </React.Fragment>
  );
}

UploadInputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadInputs);
