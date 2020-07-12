import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    brand: {
      main: 'purple'
    }
  }
})

export default function TypographyTheme() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        {"This div's text looks like that of a button."}
      </div>
      <Typography color="brand">Brand</Typography>
    </ThemeProvider>
  );
}
