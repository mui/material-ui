import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
    },
    item: {
      padding: theme.spacing(1),
    },
  }),
);

export default function GroupedButtons() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item container>
        <Grid item xs={12} md={6} lg={4} align="center" className={classes.item}>
          <ButtonGroup size="small" aria-label="Small outlined button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={6} lg={4} align="center" className={classes.item}>
          <ButtonGroup color="primary" aria-label="Outlined primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={6} lg={4} align="center" className={classes.item}>
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
        <Grid item xs={12} md={6} lg={4} align="center" className={classes.item}>
          <ButtonGroup variant="contained" size="small" aria-label="Small contained button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={6} lg={4} align="center" className={classes.item}>
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
        <Grid item xs={12} md={6} lg={4} align="center" className={classes.item}>
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
