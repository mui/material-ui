// @flow weak

import React from 'react';
import Paper from 'material-ui/Paper';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Grid from 'material-ui/Grid';

const styleSheet = createStyleSheet('SimpleGrid', () => ({
  root: {
    width: 400,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
  },
}));

export default function SimpleGrid(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.root}>
      <Grid container gutter={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

SimpleGrid.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
