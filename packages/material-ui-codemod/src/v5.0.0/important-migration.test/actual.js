import { createTheme, MuiThemeProvider, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {},
});

function App() {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={createTheme()}>
      <div className={classes.root} />
    </MuiThemeProvider>
  );
}
