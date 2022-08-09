import * as React from 'react';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

export default function GridsDiff() {
  return (
    <Box sx={{ pt: 3 }}>
      <Box sx={{ border: '1px solid', borderColor: 'primary.main' }}>
        <Grid2
          container
          spacing={2}
          disableEqualOverflow
          sx={{ bgcolor: 'rgba(255 255 255 / 0.6)' }}
        >
          <Grid2
            height={100}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            xs
          >
            ver.2 <br />
            Top and left overflow
          </Grid2>
        </Grid2>
      </Box>
      <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
        The overflow represents the negative margin of the grid.
      </Typography>
    </Box>
  );
}
