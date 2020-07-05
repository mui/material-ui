import React from 'react';
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
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
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
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
})(Button);

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  additions: {
    MuiButton: {
      dashed: {
        padding: '5px 15px',
        border: '5px dashed red',
        '&$disabled': {
          border: `5px dashed red`,
        },
      },
      tertiery: {
        backgroundColor: 'yellow',
        padding: 20,
      },
    },
  },
  variants: {
    MuiButton: [
      {
        trigger: (props) => props.variant === 'red',
        styles: {
          color: 'red'
        }
      },
      {
        trigger: (props) => props.size === 'xxsmall',
        styles: {
          fontSize: '5px'
        }
      },
      {
        trigger: (props) => props.toggle,
        styles: {
          background: 'green'
        }
      },
      {
        trigger: (props) => props.toggle === 'red',
        styles: {
          backgroundColor: 'red'
        }
      }
    ],
  },
  variantsV2: {
    MuiButton: [
      {
        matcher: { variant: 'dashed', color: 'yellow' },
        styles: {
          padding: '5px 15px',
          border: '5px dashed yellow',
        }
      },
      {
        matcher: { size: 'xxlarge' },
        styles: {
          fontSize: '50px',
        }
      },
    ],
  }
});

export default function CustomizedButtons() {
  const classes = useStyles();

  return (
    <div>
      <ColorButton
        variant="contained"
        color="primary"
        className={classes.margin}
      >
        Custom CSS
      </ColorButton>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.margin}>
          Theme Provider
        </Button>
        <Button variant="dashed" color="primary" className={classes.margin}>
          Dashed Variant
        </Button>
        <Button variant="red" color="primary" className={classes.margin}>
          Red Variant
        </Button>
        <Button variant="dashed" color="yellow" size="xxlarge" className={classes.margin}>
          Yellow Variant
        </Button>
      </ThemeProvider>
      <BootstrapButton
        variant="contained"
        color="primary"
        disableRipple
        className={classes.margin}
      >
        Bootstrap
      </BootstrapButton>
    </div>
  );
}
