// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ToggleButton, { ToggleButtonOption } from 'material-ui/ToggleButton';
import Icon from 'material-ui/Icon';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing.unit * 4,
    'margin-top': theme.spacing.unit,
  },
}));

function alterText(value, selected) {
  const text = document.getElementById('dummyText').style;
  if (selected) {
    if (value === 1) {
      text.fontWeight = 800;
    } else if (value === 2) {
      text.fontStyle = 'italic';
    } else if (value === 3) {
      text.textDecoration = 'underline';
    }
  } else if (value === 1) {
    text.fontWeight = 'normal';
  } else if (value === 2) {
    text.fontStyle = 'normal';
  } else if (value === 3) {
    text.textDecoration = 'none';
  }
}

function alterColor(value, selected) {
  const div = document.getElementById('dummyDiv').style;
  if (selected) {
    if (value === 4) {
      div.background = '#F44336';
    } else if (value === 5) {
      div.background = '#2196F3';
    } else if (value === 6) {
      div.background = '#009688';
    }
  } else {
    div.background = 'white';
  }
}

function NormalToggleButton(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <ToggleButton>
        <ToggleButtonOption
          key="1"
          icon={<Icon className="material-icons">format_bold</Icon>}
          value={1}
          onChange={alterText}
        />
        <ToggleButtonOption
          key="2"
          icon={<Icon className="material-icons">format_italic</Icon>}
          value={2}
          onChange={alterText}
        />
        <ToggleButtonOption
          key="3"
          icon={<Icon className="material-icons">format_underline</Icon>}
          value={3}
          onChange={alterText}
        />
        <ToggleButtonOption
          key="4"
          icon={<Icon className="material-icons">format_color_fill</Icon>}
          onChange={alterColor}
        >
          <MenuItem key="1" value={4}>
            Red
          </MenuItem>
          <MenuItem key="2" value={5}>
            Blue
          </MenuItem>
          <MenuItem key="3cl" value={6}>
            Green
          </MenuItem>
        </ToggleButtonOption>
      </ToggleButton>
      <Paper id="dummyDiv" className={classes.paper} elevation={4}>
        <Typography id="dummyText" type="headline" component="h3">
          Text to be edited.
        </Typography>
      </Paper>
    </div>
  );
}

NormalToggleButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(NormalToggleButton);
