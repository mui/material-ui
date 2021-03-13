import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

export default function CSSGrid() {
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom component="div">
        Material-UI Grid:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=3
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=3
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=3
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=3
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=8
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=4
          </Paper>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" gutterBottom component="div">
        CSS Grid Layout:
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        <div style={{ gridColumnEnd: 'span 3' }}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=3
          </Paper>
        </div>
        <div style={{ gridColumnEnd: 'span 3' }}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=3
          </Paper>
        </div>
        <div style={{ gridColumnEnd: 'span 3' }}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=3
          </Paper>
        </div>
        <div style={{ gridColumnEnd: 'span 3' }}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=3
          </Paper>
        </div>
        <div style={{ gridColumnEnd: 'span 8' }}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=8
          </Paper>
        </div>
        <div style={{ gridColumnEnd: 'span 4' }}>
          <Paper
            sx={{
              p: 1,
              textAlign: 'center',
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            xs=4
          </Paper>
        </div>
      </Box>
    </div>
  );
}
