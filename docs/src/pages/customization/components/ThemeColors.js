import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 10,
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    brand: {
      main: deepPurple[500],
      contrastText: deepPurple[50],
      dark: deepPurple[900],
    },
    sell: {
      main: deepOrange[500],
      contrastText: deepOrange[50],
      dark: deepOrange[900],
    },
  },
});

export default function TypographyTheme() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Typography color="brand">Brand color</Typography>
        <Typography color="sell">Sell color</Typography>
        <Button color="brand">Brand color</Button>
        <Button color="sell">Sell color</Button>
        <Button color="brand" variant="outlined">Brand color</Button>
        <Button color="sell" variant="outlined">Sell color</Button>
        <Button color="brand" variant="contained">Brand color</Button>
        <Button color="sell" variant="contained">Sell color</Button>
      </div>
    </ThemeProvider>
  );
}
