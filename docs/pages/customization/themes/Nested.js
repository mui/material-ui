import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';

const styles = theme => ({
  root: {
    color: theme.status.color,
    '&$checked': {
      color: theme.status.color,
    },
  },
  checked: {},
});

let NestedCheckbox = props => (
  <Checkbox
    defaultChecked
    classes={{
      root: props.classes.root,
      checked: props.classes.checked,
    }}
  />
);

NestedCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

NestedCheckbox = withStyles(styles)(NestedCheckbox);

const theme1 = createMuiTheme({
  status: {
    color: orange[500],
  },
});

const theme2 = createMuiTheme({
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
      <NestedCheckbox />
      <MuiThemeProvider theme={theme2}>
        <NestedCheckbox />
      </MuiThemeProvider>
      <MuiThemeProvider theme={theme3}>
        <NestedCheckbox />
      </MuiThemeProvider>
    </MuiThemeProvider>
  );
}

export default Nested;
