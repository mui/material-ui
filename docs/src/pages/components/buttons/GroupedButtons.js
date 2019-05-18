import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    // justifyContent: 'space-evenly',
  },
  container: {
    marginBottom: theme.spacing(2),
  },
  group: {
    display: 'inline-flex',
    borderRadius: theme.shape.borderRadius,
  },
  containedGroup: {
    display: 'inline-flex',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
  },
}));

function GroupedButtons() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item container className={classes.container}>
        <Grid item xs="12" md="4" align="center">
          <div className={classes.group}>
            <Button grouped variant="outlined">
              One
            </Button>
            <Button grouped variant="outlined">
              Two
            </Button>
            <Button grouped variant="outlined">
              Three
            </Button>
          </div>
        </Grid>
        <Grid item xs="12" md="4" align="center">
          <div className={classes.group}>
            <Button grouped variant="outlined" color="primary">
              One
            </Button>
            <Button grouped variant="outlined" color="primary">
              Two
            </Button>
            <Button grouped variant="outlined" color="primary">
              Three
            </Button>
          </div>
        </Grid>
        <Grid item xs="12" md="4" align="center">
          <div className={classes.group}>
            <Button grouped variant="outlined" color="secondary">
              One
            </Button>
            <Button grouped variant="outlined" color="secondary">
              Two
            </Button>
            <Button grouped variant="outlined" color="secondary">
              Three
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs="12" md="4" align="center">
          <div className={classes.containedGroup}>
            <Button grouped variant="contained">
              One
            </Button>
            <Button grouped variant="contained">
              Two
            </Button>
            <Button grouped variant="contained">
              Three
            </Button>
          </div>
        </Grid>
        <Grid item xs="12" md="4" align="center">
          <div className={classes.containedGroup}>
            <Button grouped variant="contained" color="primary">
              One
            </Button>
            <Button grouped variant="contained" color="primary">
              Two
            </Button>
            <Button grouped variant="contained" color="primary">
              Three
            </Button>
          </div>
        </Grid>
        <Grid item xs="12" md="4" align="center">
          <div className={classes.containedGroup}>
            <Button grouped variant="contained" color="secondary">
              One
            </Button>
            <Button grouped variant="contained" color="secondary">
              Two
            </Button>
            <Button grouped variant="contained" color="secondary">
              Three
            </Button>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GroupedButtons;
