import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    borderRadius: 4,
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

function CustomizedInputs(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <Button
        variant="raised"
        color="primary"
        className={classes.margin}
        classes={{
          root: classes.cssRoot,
        }}
      >
        Custom CSS
      </Button>
      <MuiThemeProvider theme={theme}>
        <Button variant="raised" color="primary" className={classes.margin}>
          MuiThemeProvider
        </Button>
      </MuiThemeProvider>
      <Button
        variant="raised"
        color="primary"
        className={classes.margin}
        disableRipple
        classes={{
          root: classes.bootstrapRoot,
        }}
      >
        Bootstrap
      </Button>
    </div>
  );
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputs);
