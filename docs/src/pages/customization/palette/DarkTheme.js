import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));

function Demo() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Typography>{`${theme.palette.type} theme`}</Typography>
    </div>
  );
}

const lightTheme = createMuiTheme({
  palette: {
    // This is the default, so only included for comparison.
    type: 'light',
  },
});

const darkTheme = createMuiTheme({
  palette: {
    // Switching the dark mode on is a single property value change.
    type: 'dark',
  },
});

export default function DarkTheme() {
  return (
    <div style={{ width: '100%' }}>
      <ThemeProvider theme={darkTheme}>
        <Demo />
      </ThemeProvider>
      <ThemeProvider theme={lightTheme}>
        <Demo />
      </ThemeProvider>
    </div>
  );
}
