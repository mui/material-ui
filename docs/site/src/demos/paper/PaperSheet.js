// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import Paper from 'material-ui/Paper';

const styleSheet = createStyleSheet('PaperSheet', (theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 5,
    paddingBottom: 5,
  }),
}));

export default function PaperSheet(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <Paper className={classes.root} zDepth={4}>
        <h3>This is a sheet of paper.</h3>
        <p>
          Paper can be used to build surface or other elements for your application.
        </p>
      </Paper>
    </div>
  );
}

PaperSheet.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
