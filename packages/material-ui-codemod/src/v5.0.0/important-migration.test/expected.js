import { createTheme, ThemeProvider, Theme } from '@material-ui/core/styles';

import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
  root: {},
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={createTheme()}>
      <div className={classes.root} />
    </ThemeProvider>
  );
}
