import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, rgbToHex } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
      marginRight: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function Intentions() {
  const classes = useStyles();
  const theme = useTheme();

  const item = (color, name) => (
    <Grid item xs={12} sm={6} md={4} className={classes.color}>
      <div style={{ backgroundColor: color }} />
      <div>
        <Typography variant="body2">{name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {rgbToHex(color)}
        </Typography>
      </div>
    </Grid>
  );

  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.group}>
        Primary
      </Typography>
      <Grid container spacing={2}>
        {item(theme.palette.primary.light, 'palette.primary.light')}
        {item(theme.palette.primary.main, 'palette.primary.main')}
        {item(theme.palette.primary.dark, 'palette.primary.dark')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Secondary
      </Typography>
      <Grid container spacing={2}>
        {item(theme.palette.secondary.light, 'palette.secondary.light')}
        {item(theme.palette.secondary.main, 'palette.secondary.main')}
        {item(theme.palette.secondary.dark, 'palette.secondary.dark')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Error
      </Typography>
      <Grid container spacing={2}>
        {item(theme.palette.error.light, 'palette.error.light')}
        {item(theme.palette.error.main, 'palette.error.main')}
        {item(theme.palette.error.dark, 'palette.error.dark')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Warning
      </Typography>
      <Grid container spacing={2}>
        {item(theme.palette.warning.light, 'palette.warning.light')}
        {item(theme.palette.warning.main, 'palette.warning.main')}
        {item(theme.palette.warning.dark, 'palette.warning.dark')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Info
      </Typography>
      <Grid container spacing={2}>
        {item(theme.palette.info.light, 'palette.info.light')}
        {item(theme.palette.info.main, 'palette.info.main')}
        {item(theme.palette.info.dark, 'palette.info.dark')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Success
      </Typography>
      <Grid container spacing={2}>
        {item(theme.palette.success.light, 'palette.success.light')}
        {item(theme.palette.success.main, 'palette.success.main')}
        {item(theme.palette.success.dark, 'palette.success.dark')}
      </Grid>
    </div>
  );
}
