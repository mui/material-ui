import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {
  root: {
    display: 'flex',
  },
};

const theme = createMuiTheme({
  typography: {
    // Use the system font over Roboto.
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    fontWeightMedium: 500,
    body1: {
      fontWeight: 500,
    },
    subheading: {
      fontSize: 12,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});

function TypographyTheme(props) {
  const { classes } = props;

  const children = (
    <div>
      <Typography>body1</Typography>
      <Typography variant="subheading">subheading</Typography>
      <Button>Button</Button>
    </div>
  );

  return (
    <div className={classes.root}>
      {children}
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </div>
  );
}

TypographyTheme.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TypographyTheme);
