// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet(theme => ({
  root: theme.typography.button,
}));

function TypograpghyTheme(props) {
  return (
    <div className={props.classes.root}>
      {'This div looks like a button.'}
    </div>
  );
}

TypograpghyTheme.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TypograpghyTheme);
