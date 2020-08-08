import { createMuiTheme, makeStyles, ThemeProvider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    ...theme.typography.body2,
  },
}));
export const Component = () => {
  const classes = useStyles();
  return <Typography className={classes.root} />;
};
export const App = () => (
  <ThemeProvider theme={createMuiTheme()}>
    <Component />
  </ThemeProvider>
);
