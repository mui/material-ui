import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function GroupedButtons() {
  return (
    <div>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <ButtonGroup size="small" aria-label="Small outlined button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup color="primary" aria-label="Outlined primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <ButtonGroup variant="contained" size="small" aria-label="Small contained button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
    </div>
  );
}
