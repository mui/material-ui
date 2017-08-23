// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import withWidth from 'material-ui/utils/withWidth';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 42,
    position: 'relative',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 54,
  },
  typography: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 5,
  },
});

function GridIntegration(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <Typography type="subheading" className={classes.typography}>
        Current width: {props.width}
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs hidden={{ xsUp: true }}>
          <Paper className={classes.paper}>xsUp</Paper>
        </Grid>
        <Grid item xs hidden={{ smUp: true }}>
          <Paper className={classes.paper}>smUp</Paper>
        </Grid>
        <Grid item xs hidden={{ mdUp: true }}>
          <Paper className={classes.paper}>mdUp</Paper>
        </Grid>
        <Grid item xs hidden={{ lgUp: true }}>
          <Paper className={classes.paper}>lgUp</Paper>
        </Grid>
        <Grid item xs hidden={{ xlUp: true }}>
          <Paper className={classes.paper}>xlUp</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

GridIntegration.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string,
};

export default compose(withStyles(styles), withWidth())(GridIntegration);
