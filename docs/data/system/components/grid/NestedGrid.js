import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Grid';
import styled from '@mui/system/styled';

export default function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={3} lg={4}>
          Email subscribe
        </Grid>
        <Grid container xs={12} sm={12} md={9} lg={8}>
          <Grid xs={6} lg={3}>
            <p>Link 1.1</p>
            <p>Link 1.2</p>
            <p>Link 1.3</p>
          </Grid>
          <Grid xs={6} lg={3}>
            <p>Link 2.1</p>
            <p>Link 2.2</p>
            <p>Link 2.3</p>
          </Grid>
          <Grid xs={6} lg={3}>
            <p>Link 3.1</p>
            <p>Link 3.2</p>
            <p>Link 3.3</p>
          </Grid>
          <Grid xs={6} lg={3}>
            <p>Link 4.1</p>
            <p>Link 4.2</p>
            <p>Link 4.3</p>
          </Grid>
        </Grid>
        <Grid xs={12}>Copyright</Grid>
      </Grid>
    </Box>
  );
}
