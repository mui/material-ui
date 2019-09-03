import React from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
  typography: {
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

export default function TypographyTheme() {
  const classes = useStyles();

  const children = (
    <div>
      <Typography>body1</Typography>
      <Typography variant="subtitle1">subtitle</Typography>
      <Button>Button</Button>
    </div>
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className={classes.root}>
        {children}
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </div>
    </ThemeProvider>
  );
}
