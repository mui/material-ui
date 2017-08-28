// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ToggleButton, { ToggleButtonOption } from 'material-ui/ToggleButton';
import Icon from 'material-ui/Icon';

const styles = {
  root: {
    background: 'lightgrey',
    padding: 20,
  },
};

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
          color="primary"
        />
        <ToggleButtonOption
          key="3"
          icon={<Icon className="material-icons">whatshot</Icon>}
          value="3"
          color="contrast"
        />
        <ToggleButtonOption
          key="4"
          icon={<Icon className="material-icons">favorite</Icon>}
          value="4"
          color="accent"
        />
        <ToggleButtonOption
          key="5"
          icon={<Icon className="material-icons">grade</Icon>}
          value="5"
          disabled
        />
      </ToggleButton>
    </div>
  );
}

ToggleIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToggleIcon);
