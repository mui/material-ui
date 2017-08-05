// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ToggleButton, { ToggleButtonOption } from 'material-ui/ToggleButton';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('ExclusiveToggleButton', {
  root: {
    width: '100%',
  },
  paper: {
    padding: 30,
  },
});

function ExclusiveToggleButton(props) {
  const classes = props.classes;

  function alignRight() {
    document.getElementById('dummyDiv2').style.textAlign = 'right';
  }

  function alignCenter() {
    document.getElementById('dummyDiv2').style.textAlign = 'center';
  }

  function alignLeft() {
    document.getElementById('dummyDiv2').style.textAlign = 'left';
  }

  function alignReset() {
    document.getElementById('dummyDiv2').style.textAlign = 'initial';
  }

  return (
    <div className={classes.root}>
      <ToggleButton exclusive className="toggle">
        <ToggleButtonOption
          icon={<Icon className="material-icons">format_align_left</Icon>}
          value="1"
          onSelect={alignLeft}
          onDeselect={alignReset}
        />
        <ToggleButtonOption
          icon={<Icon className="material-icons">format_align_center</Icon>}
          value="2"
          onSelect={alignCenter}
          onDeselect={alignReset}
        />
        <ToggleButtonOption
          icon={<Icon className="material-icons">format_align_right</Icon>}
          value="3"
          onSelect={alignRight}
          onDeselect={alignReset}
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

export default withStyles(styleSheet)(ExclusiveToggleButton);
