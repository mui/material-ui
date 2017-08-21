// @flow weak

import * as React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';
import green from 'material-ui/colors/green';
import pink from 'material-ui/colors/pink';

const styles = theme => ({
  danger: {
    color: theme.status.color,
  },
});

let NestedCheckbox = props =>
  <Checkbox defaultChecked className={props.classes.danger}>
    {'Danger'}
  </Checkbox>;

NestedCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

NestedCheckbox = withStyles(styles)(NestedCheckbox);

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

const theme3 = outerTheme => ({
  ...outerTheme,
  status: {
    color: pink[500],
  },
});

function Nested() {
  return (
    <MuiThemeProvider theme={theme1}>
      <div>
        <NestedCheckbox />
        <MuiThemeProvider theme={theme2}>
          <NestedCheckbox />
        </MuiThemeProvider>
        <MuiThemeProvider theme={theme3}>
          <NestedCheckbox />
        </MuiThemeProvider>
      </div>
    </MuiThemeProvider>
  );
}

export default Nested;
