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

let CustomCheckbox = props => (
  <Checkbox defaultChecked className={props.classes.danger}>
    {'Danger'}
  </Checkbox>
);

CustomCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
};

CustomCheckbox = withStyles(styles)(CustomCheckbox);

const theme = createMuiTheme({
  status: {
    // My business variables
    danger: orange[500],
  },
});

function CustomStyles() {
  return (
    <MuiThemeProvider theme={theme}>
      <CustomCheckbox />
    </MuiThemeProvider>
  );
}

export default CustomStyles;
