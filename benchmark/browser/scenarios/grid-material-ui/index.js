import * as React from 'react';
import Grid from '@mui/material/Grid';

export default function GridMaterialUI() {
  return (
    <Grid container spacing={2}>
      {new Array(1000).fill().map(() => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          test case
        </Grid>
      ))}
    </Grid>
  );
}
