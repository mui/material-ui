import * as React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default function AutoGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            xs
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            xs
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            xs
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            xs
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            xs=6
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            xs
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
