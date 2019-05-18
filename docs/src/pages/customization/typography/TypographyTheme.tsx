import React from 'react';
import { createMuiTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
    },
  }),
);

const theme = createMuiTheme({
  typography: {
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
    fontWeightMedium: 500,
    body1: {
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 12,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});

function TypographyTheme() {
  const classes = useStyles();

  const children = (
    <div>
      <Typography>body1</Typography>
      <Typography variant="subtitle1">subtitle</Typography>
      <Button>Button</Button>
    </div>
  );

  return (
    <div className={classes.root}>
      {children}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
}

export default TypographyTheme;
