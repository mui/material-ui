import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

function ShrinkAuto(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <TextField
        className={classes.margin}
        variant="outlined"
        label="Search..."
        labelOffset={32}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.margin}
        variant="filled"
        label="Search..."
        labelOffset={32}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" align="center">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </React.Fragment>
  );
}

ShrinkAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShrinkAuto);
