import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  paper: {
    padding: theme.spacing(3),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  color: {
    display: 'flex',
    alignItems: 'center',
    '& div:first-of-type': {
      width: theme.spacing(6),
      height: theme.spacing(6),
      marginRight: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
    },
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: theme.spacing(3),
  },
}));

function Demo() {
  const classes = useStyles();
  const theme = useTheme();

  const item = (color, name) => (
    <div className={classes.color}>
      <div style={{ backgroundColor: color }} />
      <div>
        <Typography variant="body2">{name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {color}
        </Typography>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center" gutterBottom>{`${
          theme.palette.type
        } theme`}</Typography>
        <div className={classes.container}>
          {item(theme.palette.text.primary, 'palette.text.primary')}
          {item(theme.palette.text.secondary, 'palette.text.secondary')}
          {item(theme.palette.text.disabled, 'palette.text.disabled')}
          {item(theme.palette.text.hint, 'palette.text.hint')}
          {item(theme.palette.action.active, 'palette.action.active')}
          {item(theme.palette.action.hover, 'palette.action.hover')}
          {item(theme.palette.action.selected, 'palette.action.selected')}
          {item(theme.palette.action.disabled, 'palette.action.disabled')}
          {item(theme.palette.action.disabledBackground, 'palette.action.disabledBackground')}
          {item(theme.palette.divider, 'palette.divider')}
        </div>
      </Paper>
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
