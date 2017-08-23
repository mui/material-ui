// @flow weak

import * as React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary[500],
    },
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.accent.A400,
    },
  },
});

function MediaQuery(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <Typography type="subheading">
        {`Current width: ${props.width}`}
      </Typography>
    </div>
  );
}

MediaQuery.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(withStyles(styles), withWidth())(MediaQuery);
