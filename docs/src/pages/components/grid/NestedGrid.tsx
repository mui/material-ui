import * as React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default function NestedGrid() {
  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper sx={{ p: 1, textAlign: 'center', color: 'text.secondary' }}>
            item
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 1, textAlign: 'center', color: 'text.secondary' }}>
            item
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 1, textAlign: 'center', color: 'text.secondary' }}>
            item
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </Box>
  );
}
