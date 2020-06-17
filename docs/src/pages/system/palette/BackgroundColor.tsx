import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

export default function BackgroundColor() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
          primary.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="secondary.main" color="secondary.contrastText" p={2}>
          secondary.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="error.main" color="error.contrastText" p={2}>
          error.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="warning.main" color="warning.contrastText" p={2}>
          warning.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="info.main" color="info.contrastText" p={2}>
          info.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="success.main" color="success.contrastText" p={2}>
          success.main
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="text.primary" color="background.paper" p={2}>
          text.primary
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="text.secondary" color="background.paper" p={2}>
          text.secondary
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box bgcolor="text.disabled" color="background.paper" p={2}>
          text.disabled
        </Box>
      </Grid>
    </Grid>
  );
}
