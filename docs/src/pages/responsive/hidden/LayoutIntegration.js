// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import Layout from 'material-ui/Layout';
import withWidth from 'material-ui/utils/withWidth';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('LayoutIntegration', (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
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
}));

function LayoutIntegration(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.root}>
      <Typography type="subheading" className={classes.typography}>
        Current width: {props.width}
      </Typography>
      <Layout container gutter={24}>
        <Layout item xs hidden={{ xsUp: true }}>
          <Paper className={classes.paper}>xsUp</Paper>
        </Layout>
        <Layout item xs hidden={{ smUp: true }}>
          <Paper className={classes.paper}>smUp</Paper>
        </Layout>
        <Layout item xs hidden={{ mdUp: true }}>
          <Paper className={classes.paper}>mdUp</Paper>
        </Layout>
        <Layout item xs hidden={{ lgUp: true }}>
          <Paper className={classes.paper}>lgUp</Paper>
        </Layout>
        <Layout item xs hidden={{ xlUp: true }}>
          <Paper className={classes.paper}>xlUp</Paper>
        </Layout>
      </Layout>
    </div>
  );
}

LayoutIntegration.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default withWidth()(LayoutIntegration);
