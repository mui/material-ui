// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('PaperSheet', (theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
}));

export default function PaperSheet(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography type="body1" component="p">
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
    </div>
  );
}

PaperSheet.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
