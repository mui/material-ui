import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 10,
    }
  },
}));

const theme = createMuiTheme({
  palette: {
    brand: {
      main: deepPurple[500],
    },
    sell: {
      main: deepOrange[500],
    }
  }
});

export default function TypographyTheme() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
      <Typography color="brand">Brand color</Typography>
      <Typography color="sell">Sell color</Typography>
      </div>
    </ThemeProvider>
  );
}
