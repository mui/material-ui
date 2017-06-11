// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Icon from 'material-ui/Icon';

const styleSheet = createStyleSheet('Icons', {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '70%',
  },
});

function Icons(props) {
  return (
    <div className={props.classes.root}>
      <Icon>add_circle</Icon>
      <Icon color="accent">add_circle</Icon>
      <Icon color="action">add_circle</Icon>
      <Icon color="contrast">add_circle</Icon>
      <Icon color="disabled">add_circle</Icon>
      <Icon color="error">add_circle</Icon>
      <Icon color="primary">add_circle</Icon>
    </div>
  );
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Icons);
