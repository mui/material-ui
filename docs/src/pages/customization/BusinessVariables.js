// @flow weak

import Checkbox from 'material-ui/Checkbox';
import { createMuiTheme, createStyleSheet, MuiThemeProvider, withStyles } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';
import PropTypes from 'prop-types';
import React from 'react';

const styleSheet = createStyleSheet('BusinessCheckbox', theme => ({
  danger: {
    color: theme.status.danger,
  },
}));

let BusinessCheckbox = props =>
  <Checkbox defaultChecked className={props.classes.danger}>
    {'Danger'}
  </Checkbox>;

BusinessCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

BusinessCheckbox = withStyles(styleSheet)(BusinessCheckbox);

const theme = createMuiTheme({
  status: {
    // My business variables
    danger: orange[500],
  },
});

function BusinessVariables() {
  return (
    <MuiThemeProvider theme={theme}>
      <BusinessCheckbox />
    </MuiThemeProvider>
  );
}

export default BusinessVariables;
