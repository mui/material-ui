// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import Layout from 'material-ui/Layout';
import Hidden from 'material-ui/Hidden';

const styleSheet = createStyleSheet('BreakpointUp', (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function BreakpointUp(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.root}>
      <Layout container gutter={24}>
        <Layout item xs>
          <Paper className={classes.paper} />
        </Layout>
        <Layout item xs>
          <Paper className={classes.paper} />
        </Layout>
        <Layout item xs>
          <Paper className={classes.paper} />
        </Layout>
        <Hidden smUp>
          <Layout item>
            <Paper className={classes.paper}>smUp</Paper>
          </Layout>
        </Hidden>
        <Hidden mdUp>
          <Layout item>
            <Paper className={classes.paper}>mdUp</Paper>
          </Layout>
        </Hidden>
        <Hidden lgUp>
          <Layout item>
            <Paper className={classes.paper}>lgUp</Paper>
          </Layout>
        </Hidden>
      </Layout>
    </div>
  );
}

BreakpointUp.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
