import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles, ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
  },
  paper: {
    padding: theme.spacing(3),
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
  group: {
    marginTop: theme.spacing(3),
  },
}));

function Demo() {
  const classes = useStyles();
  const theme = useTheme();

  const item = (color, name, expanded = false, border = false) => (
    <Grid item xs={12} md={expanded ? 8 : 4} className={classes.color}>
      <div
        style={{
          backgroundColor: color,
          border: border ? `1px solid ${theme.palette.divider}` : undefined,
        }}
      />
      <div>
        <Typography variant="body2">{name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {color}
        </Typography>
      </div>
    </Grid>
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography gutterBottom>Typography</Typography>
        <Grid container spacing={2}>
          {item(theme.palette.text.primary, 'palette.text.primary')}
          {item(theme.palette.text.secondary, 'palette.text.secondary')}
          {item(theme.palette.text.disabled, 'palette.text.disabled')}
        </Grid>
        <Typography gutterBottom className={classes.group}>
          Buttons
        </Typography>
        <Grid container spacing={2}>
          {item(theme.palette.action.active, 'palette.action.active')}
          {item(theme.palette.action.hover, 'palette.action.hover')}
          {item(theme.palette.action.selected, 'palette.action.selected')}
        </Grid>
        <Grid container spacing={2}>
          {item(theme.palette.action.disabled, 'palette.action.disabled')}
          {item(theme.palette.action.disabledBackground, 'palette.action.disabledBackground', true)}
        </Grid>
        <Typography gutterBottom className={classes.group}>
          Background
        </Typography>
        <Grid container spacing={2}>
          {item(theme.palette.background.default, 'palette.background.default', false)}
          {item(theme.palette.background.paper, 'palette.background.paper', false, true)}
        </Grid>
        <Typography gutterBottom className={classes.group}>
          Divider
        </Typography>
        <Grid container spacing={2}>
          {item(theme.palette.divider, 'palette.divider')}
        </Grid>
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
