import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: purple[500],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: { useNextVariants: true },
});

function CustomizedInputs(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <FormControl className={classes.margin}>
        <InputLabel
          htmlFor="custom-css-standard-input"
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
        >
          Custom CSS
        </InputLabel>
        <Input
          id="custom-css-standard-input"
          classes={{
            underline: classes.cssUnderline,
          }}
        />
      </FormControl>
      <TextField
        className={classes.margin}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
        }}
        label="Custom CSS"
        variant="outlined"
        id="custom-css-outlined-input"
      />

      <MuiThemeProvider theme={theme}>
        <TextField
          className={classes.margin}
          label="MuiThemeProvider"
          id="mui-theme-provider-standard-input"
        />

        <TextField
          className={classes.margin}
          label="MuiThemeProvider"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
        />
      </MuiThemeProvider>
      <FormControl className={classes.margin}>
        <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
          Bootstrap
        </InputLabel>
        <InputBase
          id="bootstrap-input"
          defaultValue="react-bootstrap"
          classes={{
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput,
          }}
        />
      </FormControl>
      <InputBase className={classes.margin} defaultValue="Naked input" />
    </div>
  );
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputs);
