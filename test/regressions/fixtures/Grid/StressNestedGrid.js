import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function StressNestedGrid() {
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>xs=6</Paper>
        </Grid>
        <Grid item container direction="column-reverse" xs={6} spacing={3}>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid item container spacing={2} xs={6}>
            <Grid item container spacing={1} xs={6}>
              <Grid item xs={7}>
                <Paper>xs=7</Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper>xs=5</Paper>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Paper>xs=6</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={6} spacing={3}>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
        </Grid>
        <Grid item container xs={6} spacing={3}>
          <Grid item xs={8}>
            <Paper>xs=8</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>xs=4</Paper>
          </Grid>
        </Grid>
        <Grid item container xs={6} spacing={2}>
          <Grid item xs={4}>
            <Paper>xs=4</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>xs=4</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>xs=4</Paper>
          </Grid>
        </Grid>
        <Grid item container xs={6} spacing={5}>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
