// @flow weak

import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { createStyleSheet } from 'jss-theme-reactor';
import Layout from 'material-ui/Layout';

const styleSheet = createStyleSheet('CenteredLayout', (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredLayout(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.root}>
      <Layout container gutter={24}>
        <Layout item xs={12}>
          <Paper className={classes.paper}>
            xs=12
          </Paper>
        </Layout>
        <Layout item xs={6}>
          <Paper className={classes.paper}>
            xs=6
          </Paper>
        </Layout>
        <Layout item xs={6}>
          <Paper className={classes.paper}>
            xs=6
          </Paper>
        </Layout>
        <Layout item xs={3}>
          <Paper className={classes.paper}>
            xs=3
          </Paper>
        </Layout>
        <Layout item xs={3}>
          <Paper className={classes.paper}>
            xs=3
          </Paper>
        </Layout>
        <Layout item xs={3}>
          <Paper className={classes.paper}>
            xs=3
          </Paper>
        </Layout>
        <Layout item xs={3}>
          <Paper className={classes.paper}>
            xs=3
          </Paper>
        </Layout>
      </Layout>
    </div>
  );
}

CenteredLayout.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
