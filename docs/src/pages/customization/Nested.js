// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { createMuiTheme, createStyleSheet, MuiThemeProvider, withStyles } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';
import green from 'material-ui/colors/green';

const styleSheet = createStyleSheet('NestedCheckbox', theme => ({
  danger: {
    color: theme.status.color,
  },
}));

let NestedCheckbox = props =>
  <Checkbox defaultChecked className={props.classes.danger}>
    {'Danger'}
  </Checkbox>;

NestedCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

NestedCheckbox = withStyles(styleSheet)(NestedCheckbox);

const theme1 = createMuiTheme({
  status: {
    color: orange[500],
  },
});

const theme2 = outerTheme => ({
  ...outerTheme,
  status: {
    color: green[500],
  },
});

function Nested() {
  return (
    <MuiThemeProvider theme={theme1}>
      <MuiThemeProvider theme={theme2}>
        <NestedCheckbox />
      </MuiThemeProvider>
    </MuiThemeProvider>
  );
}

export default Nested;
