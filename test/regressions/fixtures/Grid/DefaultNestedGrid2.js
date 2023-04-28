import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function StressNestedGrid2() {
  return (
    <Box
      sx={{
        width: 600,
        display: 'flex',
        bgcolor: 'secondary.main',
        '& .MuiPaper-root': {
          p: 2,
          textAlign: 'center',
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} sx={{ bgcolor: 'grey' }}>
          {/* Even though the grid container below is not a nested grid container, but it should produce correct grid items */}
          <Grid container spacing={3}>
            <Grid xs={6} sx={{ bgcolor: 'red' }}>
              <Paper>xs=12</Paper>
            </Grid>
            <Grid xs={6} sx={{ bgcolor: 'red' }}>
              <Paper>xs=12</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={6}>
          <Paper>xs=6</Paper>
        </Grid>
        <Grid xs={6}>
          <Paper>xs=6</Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
