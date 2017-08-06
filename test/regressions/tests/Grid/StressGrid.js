// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styleSheet = createStyleSheet(theme => ({
  root: {
    width: 400,
    backgroundColor: theme.palette.primary.A400,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
  },
}));

function StressGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} direction="column">
        <Grid container item spacing={8}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>xs=9</Paper>
          </Grid>
        </Grid>
        <Grid container item spacing={8} direction="row-reverse">
          <Grid item xs={3}>
            <Paper className={classes.paper}>first</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>last</Paper>
          </Grid>
        </Grid>
        <Grid container item spacing={8} justify="space-between">
          <Grid item xs={3}>
            <Paper className={classes.paper}>space</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>between</Paper>
          </Grid>
        </Grid>
        <Grid container item spacing={8} align="stretch" direction="column-reverse">
          <Grid item>
            <Paper className={classes.paper}>reverse</Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>column</Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

StressGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(StressGrid);
