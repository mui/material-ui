import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

// styled(Grid) should work with nested grids.
const StyledGrid = styled(Grid)({});

export default function StressNestedGrid2() {
  return (
    <Box sx={{ p: 3, width: 600 }}>
      <Grid container spacing={4}>
        <Grid xs={4}>
          <Paper>Item 1</Paper>
        </Grid>
        <StyledGrid container xs={4}>
          <StyledGrid xs={6}>
            <Paper>Item 2.1</Paper>
          </StyledGrid>
          <Grid xs={6}>
            <Paper>Item 2.2</Paper>
          </Grid>
        </StyledGrid>
        <StyledGrid xs={4}>
          <Paper>Item 3</Paper>
        </StyledGrid>
      </Grid>
    </Box>
  );
}
