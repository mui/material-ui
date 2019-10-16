import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function GroupedButtons() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <ButtonGroup
              size="small"
              aria-label="small outlined button group"
              orientation="vertical"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} md={4}>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
              orientation="vertical"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} md={4}>
            <ButtonGroup
              color="secondary"
              size="large"
              aria-label="large outlined secondary button group"
              orientation="vertical"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <ButtonGroup
              variant="contained"
              size="small"
              aria-label="small contained button group"
              orientation="vertical"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} md={4}>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="full-width contained primary button group"
              orientation="vertical"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} md={4}>
            <ButtonGroup
              variant="contained"
              color="secondary"
              size="large"
              aria-label="large contained secondary button group"
              orientation="vertical"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <ButtonGroup
              variant="text"
              size="small"
              aria-label="small contained button group"
              orientation="vertical"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} md={4}>
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="full-width contained primary button group"
              orientation="vertical"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} md={4}>
            <ButtonGroup
              variant="text"
              color="secondary"
              size="large"
              aria-label="large contained secondary button group"
              orientation="vertical"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <ButtonGroup fullWidth aria-label="full width outlined button group" orientation="vertical">
          <Button>Full</Button>
          <Button>width</Button>
          <Button>Group</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
