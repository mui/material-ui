import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    width: '30%',
    margin: theme.spacing.unit,
  },
});

function Inputs(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Input
        type="file"
        className={classes.input}
        inputProps={{
          accept: 'audio/mpeg, audio/mp3',
          'aria-label': 'File upload',
        }}
      />
      <Input
        type="file"
        className={classes.input}
        disabled
        inputProps={{
          accept: 'audio/mpeg, audio/mp3',
          'aria-label': 'File upload',
        }}
      />
      <Input
        type="file"
        defaultValue="Error"
        className={classes.input}
        error
        inputProps={{
          accept: 'audio/mpeg, audio/mp3',
          'aria-label': 'File upload',
        }}
      />
    </div>
  );
}

Inputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);
