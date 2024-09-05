import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

export default function GridsDiff() {
  return (
    <div>
      <Box
        sx={{
          pt: 3,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ border: '1px solid', borderColor: 'primary.main' }}>
          <Grid
            container
            spacing={2}
            sx={{ bgcolor: 'rgba(255 255 255 / 0.72)', width: 160 }}
          >
            <Grid
              item
              xs
              sx={{
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              ver.1 <br />
              Top and left
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ border: '1px solid', borderColor: 'primary.main' }}>
          <Grid2
            container
            spacing={2}
            sx={{ bgcolor: 'rgba(255 255 255 / 0.6)', width: 160 }}
          >
            <Grid2
              height={100}
              display="flex"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              size="grow"
            >
              ver.2 <br />
              All sides
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
        The overflow represents the negative margin of the grid.
      </Typography>
    </div>
  );
}
