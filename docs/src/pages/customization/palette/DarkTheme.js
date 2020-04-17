import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
  },
  group: {
    marginTop: theme.spacing(3),
  },
  color: {
    display: 'flex',
    alignItems: 'center',
    '& div:first-of-type': {
      width: theme.spacing(6),
      height: theme.spacing(6),
      flexShrink: 0,
      marginRight: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

function Demo() {
  const classes = useStyles();
  const theme = useTheme();

  const item = (color, name, expanded = false, border = false) => (
    <Grid item xs={12} sm={6} md={expanded ? 8 : 4} className={classes.color}>
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
      <Typography gutterBottom>Typography</Typography>
      <Grid container spacing={1}>
        {item(theme.palette.text.primary, 'palette.text.primary')}
        {item(theme.palette.text.secondary, 'palette.text.secondary')}
        {item(theme.palette.text.disabled, 'palette.text.disabled')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Buttons
      </Typography>
      <Grid container spacing={1}>
        {item(theme.palette.action.active, 'palette.action.active')}
        {item(theme.palette.action.hover, 'palette.action.hover')}
        {item(theme.palette.action.selected, 'palette.action.selected')}
        {item(theme.palette.action.disabled, 'palette.action.disabled')}
        {item(theme.palette.action.disabledBackground, 'palette.action.disabledBackground', true)}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Background
      </Typography>
      <Grid container spacing={1}>
        {item(theme.palette.background.default, 'palette.background.default', false, true)}
        {item(theme.palette.background.paper, 'palette.background.paper')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Divider
      </Typography>
      <Grid container spacing={1}>
        {item(theme.palette.divider, 'palette.divider')}
      </Grid>
    </div>
  );
}

const lightTheme = createMuiTheme();
const darkTheme = createMuiTheme({
  palette: {
    // Switching the dark mode on is a single property value change.
    type: 'dark',
  },
});

export default function DarkTheme() {
  // Note that if you intend to use two or more themes at the same time on your site,
  // you need to wrap them with a single ThemeProvider at the root (not like in this example).
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
