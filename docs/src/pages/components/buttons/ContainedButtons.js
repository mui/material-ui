import * as React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const theme = createMuiTheme({
  components: {
    MuiButton: {
      overrides: {
        disabled: {
          color: 'red'
        }
      }
    }
  }
})

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Button variant="contained">Primary</Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="contained" href="#contained-buttons">
          Link
        </Button>
        <Button variant="contained" disabled>
          Link
        </Button>
      </div>
    </ThemeProvider>
  );
}
