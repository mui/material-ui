// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ToggleButton, { ToggleButtonOption } from 'material-ui/ToggleButton';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing.unit * 4,
    'margin-top': theme.spacing.unit,
  },
});

function alterText(value, selected) {
  const div = document.getElementById('dummyDiv2');
  if (selected && div !== null) {
    switch (value) {
      case '1':
        div.style.textAlign = 'left';
        break;
      case '2':
        div.style.textAlign = 'center';
        break;
      case '3':
        div.style.textAlign = 'right';
        break;
      default:
        break;
    }
  } else if (div !== null) {
    div.style.textAlign = 'initial';
  }
}

function ExclusiveToggleButton(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <ToggleButton exclusive className="toggle">
        <ToggleButtonOption
          key="1"
          icon={<Icon className="material-icons">format_align_left</Icon>}
          value="1"
          onChange={alterText}
        />
        <ToggleButtonOption
          key="2"
          icon={<Icon className="material-icons">format_align_center</Icon>}
          value="2"
          onChange={alterText}
        />
        <ToggleButtonOption
          key="3"
          icon={<Icon className="material-icons">format_align_right</Icon>}
          value="3"
          onChange={alterText}
        />
      </ToggleButton>
      <Paper id="dummyDiv2" className={classes.paper} elevation={4}>
        <Typography type="headline" component="h3">
          This text is gonna move.
        </Typography>
      </Paper>
    </div>
  );
}

ExclusiveToggleButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExclusiveToggleButton);
