import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
  },
  container: {
    marginBottom: theme.spacing(2),
  },
}));

function GroupedButtons() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item container className={classes.container}>
        <Grid item xs={12} md={4} align="center">
          <ButtonGroup size="small" aria-label="Small outlined button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={4} align="center">
          <ButtonGroup color="primary" aria-label="Outlined primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={4} align="center">
          <ButtonGroup
            color="secondary"
            size="large"
            aria-label="Large outlined secondary button group"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={12} md={4} align="center">
          <ButtonGroup variant="contained" size="small" aria-label="Small contained button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={4} align="center">
          <ButtonGroup
            variant="contained"
            color="primary"
            fullWidth
            aria-label="Full-width contained primary button group"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={4} align="center">
          <ButtonGroup
            variant="contained"
            color="secondary"
            size="large"
            aria-label="Large contained secondary button group"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GroupedButtons;
