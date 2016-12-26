// @flow weak

import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { createStyleSheet } from 'jss-theme-reactor';
import Layout from 'material-ui/Layout';

const styleSheet = createStyleSheet('SimpleLayout', () => ({
  root: {
    width: 400,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
  },
}));

export default function SimpleLayout(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.root}>
      <Layout container xsGutter={24}>
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

SimpleLayout.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
