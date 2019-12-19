import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme, useTheme, rgbToHex } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 600,
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
  }),
);

export default function Intentions() {
  const classes = useStyles();
  const theme = useTheme();

  const item = (color: string, name: string) => (
    <Grid item xs={6} sm={4} className={classes.color}>
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
      <Grid container spacing={1}>
        {item(theme.palette.primary.light, 'light')}
        {item(theme.palette.primary.main, 'main')}
        {item(theme.palette.primary.dark, 'dark')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Secondary
      </Typography>
      <Grid container spacing={1}>
        {item(theme.palette.secondary.light, 'light')}
        {item(theme.palette.secondary.main, 'main')}
        {item(theme.palette.secondary.dark, 'dark')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Error
      </Typography>
      <Grid container spacing={1}>
        {item(theme.palette.error.light, 'light')}
        {item(theme.palette.error.main, 'main')}
        {item(theme.palette.error.dark, 'dark')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Warning
      </Typography>
      <Grid container spacing={1}>
        {item(theme.palette.warning.light, 'light')}
        {item(theme.palette.warning.main, 'main')}
        {item(theme.palette.warning.dark, 'dark')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Info
      </Typography>
      <Grid container spacing={1}>
        {item(theme.palette.info.light, 'light')}
        {item(theme.palette.info.main, 'main')}
        {item(theme.palette.info.dark, 'dark')}
      </Grid>
      <Typography gutterBottom className={classes.group}>
        Success
      </Typography>
      <Grid container spacing={1}>
        {item(theme.palette.success.light, 'light')}
        {item(theme.palette.success.main, 'main')}
        {item(theme.palette.success.dark, 'dark')}
      </Grid>
    </div>
  );
}
