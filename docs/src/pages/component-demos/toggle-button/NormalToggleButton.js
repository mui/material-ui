/**
 * Created by zabieru on 6/23/2017.
 */
// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ToggleButton from 'material-ui/ToggleButton';
import {Option} from 'material-ui/ToggleButton'
import Icon from 'material-ui/Icon'
import {MenuItem} from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


const styleSheet = createStyleSheet('NormalToggleButton', {
  root: {
    width: '100%',
  },
  paper: {
    padding: 30,
  }
});

function NormalToggleButton(props) {
  const classes = props.classes;

  function changeColor(value){
    var div = document.getElementById('dummyDiv').style;
    if (value == 4){
      div.background = '#F44336';
    } else if(value == 5){
      div.background = '#2196F3';
    } else if(value == 6){
      div.background = '#009688';
    }
  };

  function colorReset() {
    document.getElementById('dummyDiv').style.background = 'white';
  };

  function changeText(value) {
    var text = document.getElementById('dummyText').style;
    if (value == 1){
      text.fontWeight = 800;
    } else if(value == 2){
      text.fontStyle = 'italic';
    } else if(value == 3){
      text.textDecoration = 'underline';
    }
  };

  function resetText(value) {
    var text = document.getElementById('dummyText').style;
    if (value == 1){
      text.fontWeight = 'normal';
    } else if(value == 2){
      text.fontStyle = 'normal';
    } else if(value == 3){
      text.textDecoration = 'none';
    }
  };

  return (
    <div className={classes.root}>
      <ToggleButton>
        <Option
          icon={<Icon className="material-icons">format_bold</Icon>}
          value={1}
          onSelect={changeText}
          onDeselect={resetText}
        />
        <Option
          icon={<Icon className="material-icons">format_italic</Icon>}
          value={2}
          onSelect={changeText}
          onDeselect={resetText}
        />
        <Option
          icon={<Icon className="material-icons">format_underline</Icon>}
          value={3}
          onSelect={changeText}
          onDeselect={resetText}
        />
        <Option
          icon={<Icon className="material-icons">format_color_fill</Icon>}
          onSelect={changeColor}
          onDeselect={colorReset}
        >
          <MenuItem value={4} >Red</MenuItem>
          <MenuItem value={5} >Blue</MenuItem>
          <MenuItem value={6} >Green</MenuItem>
        </Option>
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
