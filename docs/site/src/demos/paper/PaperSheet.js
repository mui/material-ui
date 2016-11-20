// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Paper from 'material-ui/Paper';
import Text from 'material-ui/Text';

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
      <Paper className={classes.root} zDepth={4}>
        <Text type="headline" component="h3">
          This is a sheet of paper.
        </Text>
        <Text type="body1" component="p">
          Paper can be used to build surface or other elements for your application.
        </Text>
      </Paper>
    </div>
  );
}

PaperSheet.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
