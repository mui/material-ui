import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
  label: {
    marginLeft: '2em',
  },
  notchedOutline: {
    paddingLeft: 'calc(2em + 8px) !important',
  },
});

const OutlinedInputAdornments = ({ classes }) => (
  <div className={classes.root}>
    <TextField
      className={classNames(classes.margin, classes.textField)}
      variant="outlined"
      label="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        classes: {
          notchedOutline: classes.notchedOutline,
        },
      }}
      InputLabelProps={{
        shrink: 'auto',
        classes: {
          root: classes.label,
        },
      }}
    />
  </div>
);

OutlinedInputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedInputAdornments);
