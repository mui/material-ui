// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ToggleButton, { ToggleButtonOption } from 'material-ui/ToggleButton';
import Icon from 'material-ui/Icon';

const styleSheet = createStyleSheet({
  root: {
    width: '100%',
  },
});

function ToggleIcon(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <ToggleButton toggleIcons>
        <ToggleButtonOption key="1" icon={<Icon className="material-icons">mood</Icon>} value="1" />
        <ToggleButtonOption
          key="2"
          icon={<Icon className="material-icons">mood_bad</Icon>}
          value="1"
        />
        <ToggleButtonOption
          key="3"
          icon={<Icon className="material-icons">whatshot</Icon>}
          value="3"
        />
      </ToggleButton>
    </div>
  );
}

ToggleIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ToggleIcon);
