// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';

const styles = theme => ({
  danger: {
    color: theme.status.danger,
  },
});

let BusinessCheckbox = props =>
  <Checkbox defaultChecked className={props.classes.danger}>
    {'Danger'}
  </Checkbox>;

BusinessCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

BusinessCheckbox = withStyles(styles)(BusinessCheckbox);

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
