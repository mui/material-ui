// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Icon from 'material-ui/Icon';

const styleSheet = createStyleSheet('Icons', {
  icons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '70%',
  },
});

function Icons(props) {
  const classes = props.classes;
  return (
    <div className={classes.icons}>
      <Icon>add_circle</Icon>
      <Icon accent>add_circle</Icon>
      <Icon action>add_circle</Icon>
      <Icon contrast>add_circle</Icon>
      <Icon disabled>add_circle</Icon>
      <Icon error>add_circle</Icon>
      <Icon primary>add_circle</Icon>
    </div>
  );
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Icons);
