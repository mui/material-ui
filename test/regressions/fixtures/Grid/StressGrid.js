import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function StressGrid() {
  return (
    <Box
      sx={{
        width: 400,
        display: 'flex',
        bgcolor: 'secondary.main',
        '& .MuiPaper-root': {
          p: 2,
          textAlign: 'center',
        },
      }}
    >
      <Grid container spacing={3} direction="column">
        <Grid container item spacing={1}>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper>xs=9</Paper>
          </Grid>
        </Grid>
        <Grid container item spacing={1} direction="row-reverse">
          <Grid item xs={3}>
            <Paper>first</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>last</Paper>
          </Grid>
        </Grid>
        <Grid container item spacing={1} justifyContent="space-between">
          <Grid item xs={3}>
            <Paper>space</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>between</Paper>
          </Grid>
        </Grid>
        <Grid container item spacing={1} alignItems="stretch" direction="column-reverse">
          <Grid item>
            <Paper>reverse</Paper>
          </Grid>
          <Grid item>
            <Paper>column</Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
